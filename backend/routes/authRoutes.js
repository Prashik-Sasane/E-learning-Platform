const express = require('express');
const { registerUser } = require('../controller/userController'); // destructure if exported as object

const router = express.Router();

router.post("/register", registerUser);

module.exports = router;