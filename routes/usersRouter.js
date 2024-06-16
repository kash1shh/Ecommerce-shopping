const express = require('express');
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedIn");
const {registerUser, loginUser, logout} = require("../controllers/authController");

router.get("/", function(req, res){
    res.send("User route working");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", isLoggedin, logout);

module.exports = router;