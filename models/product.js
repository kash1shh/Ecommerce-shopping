const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/shopping");

const productSchema = mongoose.Schema({
    image: String,
    name: String,
    password: String,
    discount: {
        type: Number,
        default: 0
    },
    bgcolor: String,
    price: Number,
    panelcolor: String,
    textcolor: String
});

module.exporst = mongoose.model("product", productSchema);