import { MongoClient } from "mongodb";
import dotenv from dotenv;

dotenv.config();
const mClient = new MongoClient(process.env.DATABASE_URL);

try {
    await mClient.connect();
    console.log("MongoDB sucessfull connected");
} catch (err) {
    console.log(err.message)
}

const db = mClient.db();
export default db;