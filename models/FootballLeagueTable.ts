import { Schema, model, models, Document, Model } from "mongoose";

export interface FootballLeagueTable {
  leagueName: string;
  season: string;
  league: string[];
  gamesPlayed: number;
  createdAt?: Date;
}

export interface FootballLeagueTableDocument
  extends Document,
    FootballLeagueTable {}

const FootballLeagueTableSchema = new Schema<FootballLeagueTableDocument>(
  {
    leagueName: String,
    season: String,
    league: [String],
    createdAt: Date,
    gamesPlayed: Number,
  },
  { timestamps: true, collection: "football-league-tables" }
);

const FootballLeagueTableModel =
  (models.League as Model<FootballLeagueTableDocument>) ||
  model<FootballLeagueTableDocument>(
    "FootballLeagueTable",
    FootballLeagueTableSchema,
    "football-league-tables"
  );

export default FootballLeagueTableModel;
