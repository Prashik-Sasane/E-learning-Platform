const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes')
const {connectDB} = require('./config/db')
const surveyRoutes = require('./routes/surveyRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes')
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/survey" , surveyRoutes);

app.use("/api/recommendations", recommendationRoutes);
const PORT = process.env.PORT;

app.listen(PORT, ()=> console.log(`Server Running at port ${PORT}`));