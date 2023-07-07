const express = require("express");
const { registerUser, loginUser, otherwallets } = require("../controllers/userController");
const { body } = require("express-validator");
const authentication = require("../middlewere/authenticate");

const router = express.Router();

const createEmailChain = () => body("email", "Please enter a valid email").isEmail()
const createUserNameChain = () => body("username", "Please enter a valid username").isAlphanumeric()
const createPasswordChain = () => body("password", "Please enter a password in between 8 to 16 characters").isLength({ min: 8, max: 16 })

router.route("/register").post(createEmailChain(), createPasswordChain(), createUserNameChain(), registerUser);

router.route("/login").post(createEmailChain(), createPasswordChain(), loginUser);

router.route("/addwallet").post(authentication, otherwallets)

module.exports = router;