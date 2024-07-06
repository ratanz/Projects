const express = require("express")
const isLoggedIn = require("../middlewares/isLoggedIn")
const productModel = require("../models/product-model")
const userModel = require("../models/user-model")
const router = express.Router()

router.get("/", function (req, res) {
    let error = req.flash("error")
    res.render("index", { error, loggedin: false })
})

router.get("/shop", isLoggedIn, async function (req, res) {
    let products = await productModel.find()
    let success = req.flash("success")
    res.render("shop", { products, success })
})

router.get("/addtocart/:productid", isLoggedIn, async function (req, res) {
    let user = await userModel.findOne({ email: req.user.email })
    user.cart.push(req.params.id)
    await user.save()
    req.flash("success", "Product added to cart")
    res.redirect("/shop")
})

router.get("/logout", function (req, res) {
    res.clearCookie("token")
    res.redirect("/")
})

module.exports = router

