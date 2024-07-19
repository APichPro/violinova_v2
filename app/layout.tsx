import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ConvexClerkProvider from "@/providers/ConvexClerkProvider";
import { SynthProvider } from "@/providers/SynthProvider";
import IsFetchingProvider from "@/providers/IsFetchingProvider";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ThemesProvider } from "@/providers/ThemesProvider";
import Image from "next/image";

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

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <ConvexClerkProvider>
      <html lang={locale} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <ThemesProvider>
            <IsFetchingProvider>
              <SynthProvider>
                <body className={manrope.className}>{children}</body>
                <Image
                  fill
                  className="opacity-15 -z-10"
                  src="/images/bg.png"
                  objectFit="contain"
                  objectPosition="center"
                  alt="background"
                />
              </SynthProvider>
            </IsFetchingProvider>
          </ThemesProvider>
        </NextIntlClientProvider>
      </html>
    </ConvexClerkProvider>
  );
}
