import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "About page",
  description: "The about page for the next app",
  keywords: "about, website, stuff, other stuff",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h1>This is the about layout</h1>
      {children}
    </div>
  );
}
