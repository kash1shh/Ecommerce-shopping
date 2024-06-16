const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    image: Buffer,
    name: String,
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