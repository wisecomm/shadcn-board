import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toast/toaster";
import { AsideSection } from "@/components/common";

/** 폰트 */
import { FONT_NOTOSANSKR } from "../../public/assets/fonts";

/** 스타일 */
import "../../public/styles/globals.css";
import "../../public/styles/main.scss";

export const metadata: Metadata = {
  title: "Shade Board App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="ko">
      <body className={FONT_NOTOSANSKR.className}>
        <div className="page">
          <AsideSection />
          <div className="page__main">{children}</div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
