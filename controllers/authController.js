const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async function(req, res){
    try{
        let {email, fullname, password} = req.body;

        let user = await userModel.findOne({email: email});
        if(user) return res.status(401).send("Account already exists");

        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(password, salt, async function(err, hash){
                if(err) return res.send(err.message);
                else {
                    let user = await userModel.create({
                    email,
                    password: hash,
                    fullname
                    });
                    let token = generateToken(user);
                    res.cookie("token", token);
                    res.send("User created successfully");
                    // req.flash('success', 'User created successfully');
                    // res.redirect('/');
                }
            })
        });
       
    }
    catch (err) {
        res.send(err.message);
    }
    
};

module.exports.loginUser = async function(req, res){
    let {email, password} = req.body;
    
    if (!email || !password) {
        return res.status(400).send("Email and Password are required");
    }
    let user = await userModel.findOne({email: email});
    if (!user) {
        return res.send("Email or Password incorrect");
    }

    bcrypt.compare(password, user.password, function(err, result){
        if(result){
            let token = generateToken(user);
            res.cookie("token", token);
            res.send("You can login");
            res.redirect("/shop");
        }
        else{
            res.send("Email or Password incorrect");
        }
    });
    // try {
    //     const { email, password } = req.body;
    //     const user = await userModel.findOne({ email });

    //     if (!user) {
    //         req.flash('error', 'Invalid email or password.');
    //         return res.redirect('/');
    //     }

    //     const isMatch = await bcrypt.compare(password, user.password);
    //     if (!isMatch) {
    //         req.flash('error', 'Invalid email or password.');
    //         return res.redirect('/');
    //     }

    //     const token = generateToken(user);
    //     res.cookie("token", token, { httpOnly: true });

    //     req.flash('success', 'Login successful.');
    //     res.redirect('/shop');
    // } catch (error) {
    //     console.error('Login error:', error);
    //     console.log(error.message);
    //     req.flash('error', 'Something went wrong.');
    //     res.redirect('/');
    // }
};

module.exports.logout = function (req, res) {
    res.cookies("token", "");
    res.flash('success', 'Logged out successfully');
    res.redirect("/");
};


