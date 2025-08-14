import type { Metadata } from "next";
import localFont from "next/font/local";
import "./styles/global.scss";
import LenisProvider from "./components/LenisProvider";
import Header from "./components/layout/header/header";
import Footer from "./components/layout/footer/footer";
import { ViewTransitions } from "next-view-transitions";
import CirclesAnimation from "./components/elements/circles-animation/circles-animation";
import { LockedVHProvider } from "@/app/components/ui/LockedVHProvider/LockedVHProvider";

const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Noar",
  description: "Noar description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <head>
          <title>Noar</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </head>
        <body className={`${satoshi.variable}`}>
          <LenisProvider>
            <LockedVHProvider />
            <Header />
            {children}
            <Footer />
            <CirclesAnimation />
          </LenisProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
