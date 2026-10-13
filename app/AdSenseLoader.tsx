"use client";

import Script from "next/script";

type Props = { clientId?: string };

export default function AdSenseLoader({ clientId }: Props) {
  // Do not load Google ad code before the publisher account provides a valid client ID.
  if (!clientId || !/^ca-pub-\d+$/.test(clientId.trim())) return null;

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
