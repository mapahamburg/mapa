import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: [
          "/feed",
          "/profil",
          "/karte",
          "/gespeichert",
          "/veranstaltungen",
          "/treffen",
          "/einstellungen",
          "/hosts",
          "/host",
          "/kreise",
          "/benachrichtigungen",
          "/admin",
          "/onboarding",
          "/preview-feed",
          "/start",
          "/api/",
        ],
      },
    ],
    sitemap: "https://mapa.hamburg/sitemap.xml",
  };
}
