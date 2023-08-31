const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const reviewController = require("../controllers/review");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/form", ensureAuth, reviewController.getForm);
router.get("/profile", ensureAuth, reviewController.getProfile);
router.get("/recommends", ensureAuth, reviewController.getRecommends);
router.get("/feed", ensureAuth, reviewController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
