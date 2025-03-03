import blackJackSessionModel from "@/models/CardsPlayed";
import React from "react";

async function getUserName() {
  try {
    const a = await blackJackSessionModel.find().lean();
    a.forEach((x) => x.games);

    console.log(a);
    return a.length ? a[0].user : "hello";
  } catch (error) {
    console.error(error);
    return "Error";
  }
}

const TeamPage = async () => {
  return <h1>{await getUserName()}</h1>;
};

export default TeamPage;
