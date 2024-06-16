const express = require('express');
const router = express.Router();
const upload = require("../config/multer");
const productModel = require("../models/product");

router.post("/create", upload.single("image"), async function(req, res){
    
    try {
    let {name,
    discount,
    bgcolor,
    price,
    panelcolor,
    textcolor } = req.body;

    let product = await productModel.create({
        image: req.file.buffer, 
        name,
        discount,
        bgcolor,
        price,
        panelcolor,
        textcolor
    });
    req.flash("success", "Products created successfully");
     res.redirect("/owners/admin");}
    catch(err) {
        res.send(err.message);
        res.redirect("/owners/admin");
    }
});

module.exports = router; 