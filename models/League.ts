import { Schema, model, models, Document, Model } from "mongoose";

export interface ILeagues extends Document {
  ownerUsername: string;
  leagueName: string;
  season: string;
  confirmedMembers: string[];
  usersWhoHaveRequestedToJoin: string[];
  invitedUsers: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const LeagueSchema = new Schema<ILeagues>(
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
  { timestamps: true, collection: "leagues" }
);

const League =
  (models.League as Model<ILeagues>) ||
  model<ILeagues>("League", LeagueSchema, "leagues");

export default League;
