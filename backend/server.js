const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = 3000;
const uri = process.env.uri;

let users = [{id: 1, name: "Thamizh"}]


app.use(cors());
app.use(express.json()); 


mongoose.connect(uri)
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.log("Error:", err));

  
  // const express = require("express");
  // const router = express.Router();
  
  
  // let items = [{ id: 1, name: "Shankar" }];
  
  
app.post("/items", (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
  
    const newItem = { id: users.length + 1, name };
    users.push(newItem);
    res.status(201).json(newItem);
  });
  
  app.get("/items", (req, res) => {
    res.json(users);
  });
  
  
  // module.exports = router;
// Define an API Route to Fetch Data
// const EntitySchema = new mongoose.Schema({ name: String });
// const Entity = mongoose.model("Entity", EntitySchema);

// app.get("/entities", async (req, res) => {
//   try {
//     const entities = await Entity.find();
//     res.json(entities);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
