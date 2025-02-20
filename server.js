const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const itemsRoutes = require("./routes"); // Import routes

dotenv.config();
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json()); // Needed to parse JSON requests
app.use("/api", itemsRoutes); // Prefix routes with `/api`

// Database connection
const uri = process.env.uri;
mongoose
  .connect(uri)
  .then(() => console.log("Database has been connected successfully!"))
  .catch((err) => console.log("Error", err));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
