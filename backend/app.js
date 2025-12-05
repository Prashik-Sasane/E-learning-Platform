const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const surveyRoutes = require("./routes/surveyRoutes");
const problemRoutes = require("./routes/Problem");
const doubtRoutes = require("./routes/gemini"); // Gemini route
const exploreRoutes = require("./routes/exploreRoutes");


const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Connect DB
connectDB();

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/survey", surveyRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/doubts", doubtRoutes);
app.use("/api/explore", exploreRoutes);
app.get("/", (req, res) => {
  res.send("Backend is running successfully with Gemini AI!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
