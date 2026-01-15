const SITE_URL = "https://raihanhossen.site";

export default function sitemap() {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    // Favicon and app icon assets so crawlers see your branding files
    {
      url: `${SITE_URL}/favicon.ico`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/favicon-32x32.png`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/favicon-16x16.png`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/apple-touch-icon.png`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/android-chrome-192x192.png`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/android-chrome-512x512.png`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
