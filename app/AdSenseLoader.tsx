"use client";

import Script from "next/script";

type Props = { clientId?: string };

export default function AdSenseLoader({ clientId }: Props) {
  // Explicit opt-in prevents ad code from loading before approval and consent/CMP setup.
  const enabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";
  if (!enabled || !clientId || !/^ca-pub-\d+$/.test(clientId.trim())) return null;

  return (
    <Script
      id="google-adsense"
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId.trim()}`}
      crossOrigin="anonymous"
    />
  );
}
