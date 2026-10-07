import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base="https://www.ocl.it.com";
  return ["/","/legal/privacy","/legal/terms","/legal/refund","/legal/code-of-conduct","/legal/ads","/legal/medical-disclaimer"].map(path=>({url:base+path,lastModified:new Date()}));
}
