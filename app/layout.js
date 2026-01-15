import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const SITE_URL = "https://raihanhossen.site";
const PROFILE_IMAGE_URL = `${SITE_URL}/assets/images/raihan-profile.jpg`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Md. Raihan Hossen | Web Developer & Software Engineer",
    template: "%s | Md. Raihan Hossen",
  },
  description:
    "Portfolio of software engineer and full-stack web developer Md. Raihan Hossen (Raihan), showcasing projects, skills, achievements, and contact details.",
  keywords: [
    "Md. Raihan Hossen",
    "Md Raihan Hossen",
    "Raihan Hossen",
    "Raihan",
    "Raihan developer",
    "Raihan web developer",
    "Raihan dev",
    "Raihan web dev",
    "software engineer",
    "full-stack developer",
    "web developer portfolio",
  ],
  authors: [{ name: "Md. Raihan Hossen" }],
  creator: "Md. Raihan Hossen",
  publisher: "Md. Raihan Hossen",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Md. Raihan Hossen | Web Developer & Software Engineer",
    description:
      "Explore the portfolio of Md. Raihan Hossen (Raihan) – software engineer and full-stack web developer – including projects, skills, achievements, and ways to get in touch.",
    type: "website",
    url: SITE_URL,
    images: [
      {
        url: PROFILE_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Md. Raihan Hossen – Software Engineer & Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Md. Raihan Hossen | Web Developer & Software Engineer",
    description:
      "Software engineer and full-stack web developer portfolio of Md. Raihan Hossen (Raihan).",
    images: [PROFILE_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#raihan`,
    name: "Md. Raihan Hossen",
    alternateName: ["Raihan Hossen", "Raihan"],
    jobTitle: "Software Engineer & Web Developer",
    url: SITE_URL,
    image: PROFILE_IMAGE_URL,
    sameAs: ["https://github.com/mdraihan27"],
    description:
      "Software engineer and full-stack web developer specializing in scalable, high-performance web applications.",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          suppressHydrationWarning
        >
          {JSON.stringify(personJsonLd)}
        </script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
