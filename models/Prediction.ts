import { Schema, model, models, Document, Model } from "mongoose";

export interface Prediction {
  username: string;
  season: string;
  leagueTable: string[];
  topGoalScorer: string;
  topAssister: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface PredictionDocument extends Document, Prediction {}

const PredictionSchema = new Schema<PredictionDocument>(
  {
    username: String,
    season: String,
    leagueTable: [String],
    topGoalScorer: String,
    topAssister: String,
    createdAt: Date,
    updatedAt: Date,
  },
  { timestamps: true, collection: "predictions" }
);

const Prediction =
  (models.Prediction as Model<PredictionDocument>) ||
  model<PredictionDocument>("Prediction", PredictionSchema, "predictions");

export default Prediction;
