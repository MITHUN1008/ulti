import { Suspense } from "react";
import type { Metadata } from "next";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";

import "./globals.css";

import { Modals } from "@/components/provider/Modal";
import Toast from "@/components/theme/Toast";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import NetworkStatus from "@/components/provider/NetworkStatus";
import { ConvexClientProvider } from "@/components/provider/ConvexClientProvider";
import Loading from "@/components/Loading";

export const metadata: Metadata = {
  title: "Canva Clone",
  description: "Let Build Canva Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en" suppressHydrationWarning>
        {/* sans-serif */}
        <body className="font-serif">
          <ThemeProvider
            attribute="class"
            storageKey="canva"
            defaultTheme="light"
          >
            <Suspense fallback={<Loading />}>
              <NetworkStatus />
              <Toast />
              <ConvexClientProvider>{children}</ConvexClientProvider>
              <Modals />
            </Suspense>
          </ThemeProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
