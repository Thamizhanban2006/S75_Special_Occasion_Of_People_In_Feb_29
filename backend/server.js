const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = 3000;
const uri = process.env.uri


app.use(cors());
app.use(express.json());


mongoose.connect(uri)
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.log("Error:", err));


const UserSchema = new mongoose.Schema({ 
    name: String, 
    age: Number, 
    specialOccasion: String 
});
const User = mongoose.model("User", UserSchema);



app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});








app.post("/users", async (req, res) => {
    const { name, age, specialOccasion } = req.body;
    if (!name || age === undefined || !specialOccasion) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const newUser = new User({ name, age, specialOccasion });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.put("/users/:id", async (req, res) => {
    const { name, age, specialOccasion } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, age, specialOccasion },
            { new: true } 
        );
        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.delete("/users/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
