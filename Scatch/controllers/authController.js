const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require("../utils/generateToken")

module.exports.registerUser = async function (req, res) {
    try {
        let { email, password, fullname } = req.body

        let user = await userModel.findOne({ email: email })
        if (user) return res.status(400).send("User already exists, please log in.")

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.status(500).send(err.message)
                else {
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname
                    });

                    let token = generateToken(user)
                    res.cookie("token", token)
                    res.redirect("/shop")
                }
            });
        });
    }
    catch (err) {
        res.status(500).send("Server error");
    }
}

module.exports.loginUser = async function (req, res) {
    try {
        let { email, password } = req.body

        let user = await userModel.findOne({ email: email })    
        if (!user) return res.status(400).send("User does not exist, please register.")

        bcrypt.compare(password, user.password, function (err, result) {
            if (err) return res.status(500).send(err.message)

            if (result) {
                let token = generateToken(user)
                res.cookie("token", token)
                res.redirect("/shop")
            }
            else {
                res.status(400).send("Email or password is incorrect.")
            }
        });
    }
    catch (err) {
        res.status(500).send("Server error");
    }
}

module.exports.logout = function (req, res) {
    res.clearCookie("token")
    res.redirect("/")
}