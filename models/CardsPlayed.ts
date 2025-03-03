import { Schema, model, models, Document, Model } from "mongoose";

type AvailableCards =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K"
  | "A";

interface BlackJackGame extends Document {
  ownHand: AvailableCards[];
  dealerHand: AvailableCards[];
  betPlaced: number;
  // Maybe include other cards dealt if wanting to implement card counting strategies
}

interface BlackJackSession extends Document {
  startingBudget: number;
  games: {
    budgetPriorToPlaying: number;
    game: BlackJackGame;
    budgetAfterPlaying: number;
  }[];
  user: string;
}

const BlackjackSessionSchema = new Schema<BlackJackSession>({
  games: {},
  startingBudget: {},
  user: {},
});

const BlackJackSessionModel =
  (models.blackjackSession as Model<BlackJackSession>) ??
  model<BlackJackSession>(
    "blackjackSession",
    BlackjackSessionSchema,
    "blackjackSessions"
  );

export default BlackJackSessionModel;
