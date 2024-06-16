const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedIn");
const productModel = require("../models/product");

router.get("/", function(req,res){
    let error = req.flash("error");
    res.render("index", {error});
});

router.get("/shop", isLoggedin, async function(req,res){
    try{
        let product = await productModel.find();
        res.render("shop", {product});
    }
    catch(err){
        console.error("Error fetching products", err);
        req.flash("error", "Something went wrong while fetching products.");
        res.redirect("/");
    }
});

module.exports = router;
