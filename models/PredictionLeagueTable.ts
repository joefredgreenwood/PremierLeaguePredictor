import { Schema, model, models, Model, Document } from "mongoose";

interface PredictionLeagueTable {
  ownerUsername: string;
  leagueName: string;
  season: string;
  confirmedMembers: string[];
  usersWhoHaveRequestedToJoin: string[];
  invitedUsers: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type PredictionLeagueTableDocument = PredictionLeagueTable & Document;

const PredictionLeagueTableSchema = new Schema<PredictionLeagueTableDocument>(
  {
    ownerUsername: { type: String, required: true },
    leagueName: { type: String, required: true },
    season: { type: String, required: true },
    confirmedMembers: { type: [String], default: [] },
    usersWhoHaveRequestedToJoin: { type: [String], default: [] },
    invitedUsers: { type: [String], default: [] },
  },
  { timestamps: true, collection: "prediction-league-tables" }
);

const PredictionLeagueTableModel =
  (models.PredictionLeagueTable as Model<PredictionLeagueTableDocument>) ||
  model<PredictionLeagueTableDocument>(
    "PredictionLeagueTable",
    PredictionLeagueTableSchema
  );

export default PredictionLeagueTableModel;
