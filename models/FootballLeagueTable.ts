import { Schema, model, models, Document, Model } from "mongoose";

export interface FootballLeagueTable {
  leagueName: string;
  season: string;
  league: string[];
  gamesPlayed: number;
}

export interface FootballLeagueTableDocument
  extends Document,
    FootballLeagueTable {}

const FootballLeagueTableSchema = new Schema<FootballLeagueTable>(
  {
    leagueName: { type: String, required: true },
    season: { type: String, required: true },
    league: [{ type: String }],
    gamesPlayed: { type: Number, default: 0 },
  },
  { timestamps: true, collection: "football-league-tables" }
);

const FootballLeagueTableModel =
  models.FootballLeagueTable ||
  model<FootballLeagueTable>("FootballLeagueTable", FootballLeagueTableSchema);

export default FootballLeagueTableModel;
