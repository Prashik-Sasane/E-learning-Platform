const express = require("express");
const router = express.Router();
const { getRecommendations } = require("../controller/recommendationController");

router.post("/", getRecommendations);

module.exports = router;