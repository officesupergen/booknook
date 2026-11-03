import express from "express";
import cors from "cors";
import "dotenv/config"
import { MongoClient } from 'mongodb';
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());


const client = new MongoClient(process.env.MONGODB_URI)
export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}
let dbClient = await connectToMongoDB();

const myDB = dbClient.db("booknook");
const addColl = myDB.collection("addbooks");


app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Add a new book to the collection

app.post("/addbooks", async (req, res) => {
  try {
    const bookData = req.body;  
    const result = await addColl.insertOne(bookData);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all books from the collection
app.get("/addbooks", async (req, res) => {
  try {
    const books = await addColl.find({}).toArray();
    res.status(200).json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});