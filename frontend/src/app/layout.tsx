"use client";

import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import { usePathname } from "next/navigation";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isPortal =
    pathname?.startsWith("/student") ||
    pathname?.startsWith("/employer") ||
    pathname?.startsWith("/faculty") ||
    pathname?.startsWith("/institution") ||
    pathname?.startsWith("/assessment") ||
    pathname?.startsWith("/demo");

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={[
          jakarta.className,
          "bg-[#fafafa] text-slate-900 antialiased",
          isPortal ? "h-screen overflow-hidden" : "min-h-screen overflow-x-hidden",
        ].join(" ")}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}