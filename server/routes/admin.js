const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { isAdmin, isAuth } = require('../middleware/isAuth');

router.get("/analytics", isAdmin, adminController.analytics);

module.exports = router;
