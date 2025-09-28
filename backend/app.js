const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/')
const connectDB = require('./config')
dotenv.config();
const app = express()
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server Running at port ${PORT}`));