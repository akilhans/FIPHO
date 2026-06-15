import { BRAND } from "@/lib/brand";

export default async function sitemap() {
  const baseUrl = BRAND.domain;

  const paths = [
    "",
    "/about",
    "/requirements",
    "/past-fipho",
    "/future-fipho",
    "/fipho-sponsors",
    "/gallery",
    "/contact",
    "/news",
    "/preparatory-problems",
    "/uzbekistan",
    "/organizing-committee",
    "/scientific-committee",
    "/programme-schedule",
    "/press",
    "/results",
    "/rules",
  ];

  return paths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}
