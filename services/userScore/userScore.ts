import Prediction, { PredictionDocument } from "@/models/Prediction";
import UserScore, {
  UserScore as UserScoreInterface,
  UserScoreDocument,
} from "@/models/UserScore";
import { getDifferenceBetweenLeagueTable } from "../leagueComparisonLogic/getDifferenceBetweenTeams";
import { currentSeason } from "@/constants/CurrentSeason";
import { PredictionLeagueTableDocument } from "@/models/PredictionLeagueTable";

export async function fetchScores({
  users,
  onlyFetchLatest,
  season,
}: {
  users?: string[];
  onlyFetchLatest: false;
  season: string;
}): Promise<
  {
    username: string;
    records: UserScoreDocument[];
  }[]
>;
export async function fetchScores({
  users,
  onlyFetchLatest,
  season,
}: {
  users?: string[];
  onlyFetchLatest: true;
  season: string;
}): Promise<
  {
    username: string;
    records: UserScoreDocument;
  }[]
>;

export async function fetchScores({
  users,
  onlyFetchLatest,
  season,
}: {
  users?: string[];
  onlyFetchLatest: boolean;
  season: string;
}): Promise<
  {
    username: string;
    records: UserScoreDocument | UserScoreDocument[];
  }[]
> {
  const scores = await UserScore.aggregate<{
    username: string;
    records: UserScoreDocument | UserScoreDocument[];
  }>([
    {
      $match: {
        // If users are provided add them to the match query
        ...(users ? { username: { $in: users } } : {}),
        season,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $group: {
        _id: "$username",
        // Return either the latest or all records
        value: {
          ...(onlyFetchLatest
            ? {
                $first: "$$ROOT",
              }
            : {
                $addToSet: "$$ROOT",
              }),
        },
      },
    },
    {
      $project: {
        username: "$_id",
        records: "$value",
        _id: 0,
      },
    },
  ]);

  return scores;
}

export function generateUserScoreForSingleUser(
  actualLeagueTable: string[],
  prediction: PredictionDocument,
  season: string
): UserScoreInterface {
  const difference = getDifferenceBetweenLeagueTable(
    actualLeagueTable,
    prediction.leagueTable
  );

  return {
    username: prediction.username,
    season: season,
    difference: difference,
  };
}

export async function updateScoreForAllUsers(currentLeagueTable: string[]) {
  const allCurrentPredictions = await Prediction.find({
    season: currentSeason,
  });

  const bulkInsert = allCurrentPredictions.map((prediction) =>
    generateUserScoreForSingleUser(
      currentLeagueTable,
      prediction,
      currentSeason
    )
  );

  await UserScore.insertMany(bulkInsert);
}
