import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

// Connect to the Database once, this is exported as it needs to be called from somewhere to
// ensure it exists
const MongoConnectionPromise = mongoose.connect(uri, {
  dbName: "BlackJack-Application",
});

export default MongoConnectionPromise;
