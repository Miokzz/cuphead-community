import type { Metadata } from "next";
import "./globals.css";
import { CommunityProvider } from "@/components/CommunityProvider";
import { SiteEffects } from "@/components/SiteEffects";

export const metadata: Metadata = {
  title: "Cup Club — Inkside Community",
  description: "A modern Cuphead fan-community experience inspired by 1930s animation culture."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <CommunityProvider>
          <SiteEffects />
          {children}
        </CommunityProvider>
      </body>
    </html>
  );
}
