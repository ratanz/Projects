const express = require("express")
const isLoggedIn = require("../middlewares/isLoggedIn")
const router = express.Router()

router.get("/" , function (req, res){
    let error = req.flash("error")
    res.render("index", {error})
})

router.get("/shop", isLoggedIn, function (req, res){
    res.render("shop")
})

router.get("/logout", function (req, res){
    res.clearCookie("token")
    res.redirect("/")
})

module.exports = router

