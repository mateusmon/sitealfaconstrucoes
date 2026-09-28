import type { MetadataRoute } from "next";
import { news, site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/projetos", "/noticias", "/contato", "/politica-de-privacidade"];
  return [
    ...staticRoutes.map((route) => ({ url: `${site.url}${route}`, lastModified: new Date() })),
    ...news.map((item) => ({ url: `${site.url}/noticias/${item.slug}`, lastModified: new Date(item.date) })),
  ];
}
