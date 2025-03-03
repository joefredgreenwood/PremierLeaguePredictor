import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import MongoConnectionPromise from "@/lib/mongodb";
// import { dbConnect } from "@/lib/mongodb";

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
  // await dbConnect();

  return (
    <html lang="en">
      <body className={`${poppins.variable} font-poppins`}>
        {/* Add the header to everything as it is used within the layout */}
        <Header></Header>
        {children}
      </body>
    </html>
  );
}
