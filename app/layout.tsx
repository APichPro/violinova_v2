import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ConvexClerkProvider from "@/providers/ConvexClerkProvider";
import { SynthProvider } from "@/providers/SynthProvider";
import IsFetchingProvider from "@/providers/IsFetchingProvider";

import { ThemesProvider } from "@/providers/ThemesProvider";
import Image from "next/image";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";

const manrope = Manrope({ subsets: ["latin"] });

const APP_NAME = "Violinova";
const APP_DEFAULT_TITLE = "Violinova";
const APP_TITLE_TEMPLATE = "%s - Violinova";
const APP_DESCRIPTION = "Violinova : Violin learning app";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export function generateStaticParams() {
  return ["en", "fr"].map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="relative">
        <ConvexClerkProvider>
          <ThemesProvider>
            <IsFetchingProvider>
              <SynthProvider>
                <NextIntlClientProvider locale={locale} messages={messages}>
                  {children}
                </NextIntlClientProvider>
                <Image
                  fill
                  className="opacity-15 -z-10"
                  src="/images/bg.png"
                  style={{ objectFit: "contain", objectPosition: "center" }}
                  alt="background"
                />
              </SynthProvider>
            </IsFetchingProvider>
          </ThemesProvider>
        </ConvexClerkProvider>
      </body>
    </html>
  );
}
