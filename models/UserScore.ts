import { Schema, model, models, Document, Model } from "mongoose";

export interface UserScore {
  username: string;
  season: string;
  difference: number;
  createdAt?: Date;
}

export interface UserScoreDocument extends Document, UserScore {}

const UserScoreSchema = new Schema<UserScoreDocument>(
  {
    username: String,
    season: String,
    difference: Number,
    createdAt: Date,
  },
  { timestamps: true, collection: "user-scores" }
);

const UserScore =
  (models.WeeklyScore as Model<UserScoreDocument>) ||
  model<UserScoreDocument>("UserScore", UserScoreSchema, "user-scores");

export default UserScore;
