import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OCL Health | Pharmacy, Wellness & Health Education",
  description: "A professional health and pharmacy platform for trusted health education, product information, wellness content and pharmacy support.",
  metadataBase: new URL("https://ocl.it.com"),
  openGraph: {
    title: "OCL Health",
    description: "Trusted pharmacy, wellness and health education.",
    url: "https://ocl.it.com",
    siteName: "OCL Health",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
