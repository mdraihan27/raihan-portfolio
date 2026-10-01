/**
 * =========================================================================
 * MASTER THEME COLOR CONFIGURATION
 * =========================================================================
 * Change PRIMARY_COLOR below to any hex color code.
 * The entire website (3D coin textures, rims, lighting, glows, grid, text,
 * buttons, borders, and shadows) will automatically update everywhere!
 *
 * Preset Ideas:
 *   Gold Coin:      "#FFD700"
 *   Coral Orange:   "#FA5F55"
 *   Electric Blue:  "#3B82F6"
 *   Emerald Green:  "#10B981"
 *   Vibrant Purple: "#8B5CF6"
 *   Amber Gold:     "#F59E0B"
 *   Rose Pink:      "#F43F5E"
 *   Cyan / Teal:    "#06B6D4"
 * =========================================================================
 */
export const PRIMARY_COLOR = "#FFD700";

function hexToRgb(hex) {
  let c = hex.replace("#", "").trim();
  if (c.length === 3) {
    c = c.split("").map((x) => x + x).join("");
  }
  const num = parseInt(c, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const h = Math.max(0, Math.min(255, Math.round(x))).toString(16);
        return h.length === 1 ? "0" + h : h;
      })
      .join("")
  );
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h, s, l };
}

function hslToRgb(h, s, l) {
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      let val = t;
      if (val < 0) val += 1;
      if (val > 1) val -= 1;
      if (val < 1 / 6) return p + (q - p) * 6 * val;
      if (val < 1 / 2) return q;
      if (val < 2 / 3) return p + (q - p) * (2 / 3 - val) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

export function createThemePalette(hex = PRIMARY_COLOR) {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);

  // In yellow/gold hue spectrum (38° to 68°), shift shadow hues warmer into rich honey amber (prevents greenish/muddy darkening)
  const isGoldHue = h >= 38 / 360 && h <= 68 / 360;
  const shadowHueShift = isGoldHue ? 0.022 : 0;
  const darkH = (h - shadowHueShift + 1) % 1;
  const deepH = (h - shadowHueShift * 1.5 + 1) % 1;

  const hoverColor = hslToRgb(h, Math.min(1, s * 1.0), isGoldHue ? 0.56 : Math.min(0.85, l + 0.08));
  const lightColor = hslToRgb(h, Math.min(1, s * 0.95), isGoldHue ? 0.63 : Math.min(0.92, l + 0.18));
  const highlightColor = hslToRgb(h, Math.min(1, s * 0.88), isGoldHue ? 0.76 : Math.min(0.96, l + 0.32));
  const darkColor = hslToRgb(darkH, Math.min(1, Math.max(0.85, s)), isGoldHue ? 0.45 : Math.max(0.18, l * 0.72));
  const deepDarkColor = hslToRgb(deepH, Math.min(1, Math.max(0.9, s)), isGoldHue ? 0.38 : Math.max(0.1, l * 0.48));

  return {
    primary: hex,
    rgb: `${r}, ${g}, ${b}`,
    rgba: (alpha) => `rgba(${r}, ${g}, ${b}, ${alpha})`,
    hover: rgbToHex(hoverColor.r, hoverColor.g, hoverColor.b),
    light: rgbToHex(lightColor.r, lightColor.g, lightColor.b),
    highlight: rgbToHex(highlightColor.r, highlightColor.g, highlightColor.b),
    dark: rgbToHex(darkColor.r, darkColor.g, darkColor.b),
    deepDark: rgbToHex(deepDarkColor.r, deepDarkColor.g, deepDarkColor.b),
    isGold: isGoldHue,
  };
}

export const THEME = createThemePalette(PRIMARY_COLOR);
export default THEME;
