import { Schema, model, models, Document, Model } from "mongoose";

export interface IWeeklyScore extends Document {
  username: string;
  season: string;
  score: number;
  createdAt?: Date;
}

const WeeklyScoreSchema = new Schema<IWeeklyScore>(
  {
    username: String,
    season: String,
    score: String,
    createdAt: Date,
  },
  { timestamps: true, collection: "weekly-scores" }
);

const WeeklyScore =
  (models.WeeklyScore as Model<IWeeklyScore>) ||
  model<IWeeklyScore>("WeeklyScore", WeeklyScoreSchema, "weekly-scores");

export default WeeklyScore;
