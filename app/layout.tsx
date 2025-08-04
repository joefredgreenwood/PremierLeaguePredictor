import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "../components/Header";
import MongoConnectionPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import SessionProvider from "../components/SessionProvider";
import { Toaster } from "sonner";
import Footer from "@/components/footer";
import { fetchUserRequests } from "@/services/leagueStandings/fetchUsersLeagueStatus";
import { LeagueRequests } from "@/services/leagueStandings/types/types";

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

  let requests: LeagueRequests | undefined;
  if (session?.user?.email) {
    requests = await fetchUserRequests(session?.user?.email);
  }

  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-poppins w-full min-h-screen flex flex-col`}
      >
        <SessionProvider session={session}>
          <Header requests={requests} />
          <main className="flex-1 p-4">
            {children}
            <Toaster />
          </main>
        </SessionProvider>
        <Footer />
      </body>
    </html>
  );
}
