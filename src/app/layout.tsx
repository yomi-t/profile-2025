import type { Metadata } from "next";
import "./globals.css";
import { M_PLUS_Rounded_1c } from "next/font/google";

const mPlusRounded1c = M_PLUS_Rounded_1c({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "自己紹介サイト",
  description: "伊藤汰海の自己紹介サイトです。みんな見てね！",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${mPlusRounded1c.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
