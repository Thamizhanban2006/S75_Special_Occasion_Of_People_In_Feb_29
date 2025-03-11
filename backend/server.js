const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = 3000;
const uri = process.env.uri;


app.use(cors());
app.use(express.json()); 


mongoose.connect(uri)
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.log("Error:", err));

  
app.get("/ping", (req, res) => {
  res.send("pong");
});

// Define an API Route to Fetch Data
const EntitySchema = new mongoose.Schema({ name: String });
const Entity = mongoose.model("Entity", EntitySchema);

app.get("/entities", async (req, res) => {
  try {
    const entities = await Entity.find();
    res.json(entities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
