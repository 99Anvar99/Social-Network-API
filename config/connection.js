const mongoose = require("mongoose");

// Get the MongoDB URI from environment variables or use a default local URI
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/social-network";

// Connect to the MongoDB database
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Enable debugging of MongoDB queries
mongoose.set("debug", true);

// Get the database connection object
const db = mongoose.connection;

// Event handlers for database connection
db.on("error", (error) => {
  console.error("MongoDB Connection Error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Export the database connection
module.exports = db;