import Loading from "@/app/loading";
import blackJackSessionModel from "@/models/CardsPlayed";
import React, { Suspense } from "react";

async function getUserName() {
  try {
    const blackJackSessions = await blackJackSessionModel.find().lean();
    console.log(blackJackSessions);
    return blackJackSessions.length ? blackJackSessions[0].user : "hello";
  } catch (error) {
    console.error(error);
    return "Error";
  }
}

async function getUserNameSlowWrapper() {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  return <h1>{getUserName()}</h1>;
}

const TeamPage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 4000));

  const username = getUserNameSlowWrapper();

  return (
    <div>
      <h1>Fast Loading Part</h1>
      <Suspense fallback={<Loading />}>{username} </Suspense>
    </div>
  );
};

export default TeamPage;
