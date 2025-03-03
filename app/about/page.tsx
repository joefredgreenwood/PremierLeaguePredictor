import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const AboutPage = async () => {
  const session = await getServerSession(authOptions);
  console.log({ session });

  if (!session) {
    console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;!");
    redirect("/login");
  }
  return <h1>About Page</h1>;
};

export default AboutPage;
