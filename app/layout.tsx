import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import MongoConnectionPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

await MongoConnectionPromise;

export const metadata: Metadata = {
  title: "Next App home page",
  description: "Home page for next application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={`${poppins.variable} font-poppins`}>
        <SessionProvider session={session}>
          {/* Add the header to everything as it is used within the layout */}
          <Header />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
