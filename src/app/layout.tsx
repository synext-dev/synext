import type { Metadata } from "next";
import { Poppins, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "Synext — Formation professionnelle B2B",
  description:
    "Plateforme de mise en relation formateurs / organismes et marketplace de formations professionnelles.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="fr">
      <body
        className={`${poppins.variable} ${plusJakartaSans.variable} ${playfairDisplay.variable} antialiased`}
      >
        <SessionProvider session={session}>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
