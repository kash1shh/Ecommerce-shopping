const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/shopping");

const ownerSchema = mongoose.Schema({
    fullname: {
        type: String,
        minlength: 3,
        trim: true
    },
    email: String,
    password: String,
    cart: {
        type: Array,
        default: []
    },
    isadmin: Boolean,
    products: {
        type: Array,
        default: []
    },
    picture: String,
    gstin: String
});

module.exporst = mongoose.model("owner", ownerSchema);