import { Schema, model, models, Document, Model } from "mongoose";

export interface PredictionLeagueTable {
  ownerUsername: string;
  leagueName: string;
  season: string;
  confirmedMembers: string[];
  usersWhoHaveRequestedToJoin: string[];
  invitedUsers: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PredictionLeagueTableDocument
  extends Document,
    PredictionLeagueTable {}

const PredictionLeagueTableSchema = new Schema<PredictionLeagueTableDocument>(
  {
    ownerUsername: String,
    leagueName: String,
    season: String,
    confirmedMembers: [String],
    usersWhoHaveRequestedToJoin: [String],
    invitedUsers: [String],
    createdAt: Date,
    updatedAt: Date,
  },
  { timestamps: true, collection: "prediction-league-tables" }
);

const PredictionLeagueTable =
  (models.PredictionLeagueTableDocument as Model<PredictionLeagueTableDocument>) ||
  model<PredictionLeagueTableDocument>(
    "PredictionLeagueTableDocument",
    PredictionLeagueTableSchema,
    "prediction-league-tables"
  );

export default PredictionLeagueTable;
