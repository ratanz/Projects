const express = require("express")
const isLoggedIn = require("../middlewares/isLoggedIn")
const productModel = require("../models/product-model")
const router = express.Router()

router.get("/", function (req, res) {
    let error = req.flash("error")
    res.render("index", { error, loggedin : false })
})

router.get("/shop", isLoggedIn, async function (req, res) {
    let products = await productModel.find()
    res.render("shop", { products })
})

router.get("/addtocart/:id", isLoggedIn, async function (req, res) {
    let product = await productModel.findById(req.params.id)
    res.render("addtocart", { product })
})

router.get("/logout", function (req, res) {
    res.clearCookie("token")
    res.redirect("/")
})

module.exports = router

