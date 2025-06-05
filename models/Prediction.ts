import { Schema, model, models, Document, Model } from "mongoose";

export interface IPredictions extends Document {
  username: string;
  season: string;
  table: string[];
  topGoalScorer: string;
  topAssister: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const PredictionSchema = new Schema<IPredictions>(
  {
    username: String,
    season: String,
    table: [String],
    topGoalScorer: String,
    topAssister: String,
    createdAt: Date,
    updatedAt: Date,
  },
  { timestamps: true, collection: "predictions" }
);

const Prediction =
  (models.Prediction as Model<IPredictions>) ||
  model<IPredictions>("Prediction", PredictionSchema, "predictions");

export default Prediction;
