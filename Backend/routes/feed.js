const express = require("express");
const router = express.Router();

const feedController = require("../controllers/feed");
router.post("/get-feed-data", feedController.getFeed);

module.exports = router;
