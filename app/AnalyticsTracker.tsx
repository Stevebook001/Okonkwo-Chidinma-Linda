"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const PUBLIC_HOSTS = new Set([
  "ocl.it.com",
  "www.ocl.it.com",
  "blogs.ocl.it.com",
  "shop.ocl.it.com",
  "developers.ocl.it.com",
  "docs.ocl.it.com",
  "status.ocl.it.com",
  "support.ocl.it.com",
]);

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!PUBLIC_HOSTS.has(window.location.hostname.toLowerCase())) return;
    if (!pathname || pathname.startsWith("/api/") || pathname.startsWith("/auth/")) return;

    let referrerHost: string | null = null;
    try {
      referrerHost = document.referrer ? new URL(document.referrer).hostname : null;
    } catch {
      referrerHost = null;
    }

    // Store only the path and referring hostname; never send query strings or form data.
    void fetch("/api/analytics", {
      method: "POST",
      credentials: "omit",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventName: "page_view", pagePath: pathname, referrerHost }),
    }).catch(() => {
      // Analytics must never interrupt content or navigation.
    });
  }, [pathname]);

  return null;
}
