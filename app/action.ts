"use server";

import { currentSeason } from "@/constants/CurrentSeason";
import Prediction from "@/models/Prediction";

export default async function addNewPrediction({
  username,
  table,
}: {
  username: string;
  table: string[];
}) {
  await Prediction.updateOne(
    {
      username,
      // Potentially move out to a config value
      season: currentSeason,
    },
    {
      $set: {
        table,
        topAssister: "Saka",
        topGoalScorer: "Salah",
      },
    },
    {
      upsert: true,
    }
  );
  return table;
}
