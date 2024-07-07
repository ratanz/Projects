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

router.get("/cart", isLoggedIn, async function (req, res) {
    let user = await userModel.findOne({ email: req.user.email })
    .populate("cart")
    
    // Calculate total bill with discounts
    const bill = user.cart.reduce((total, item) => {
        const itemPrice = Number(item.price) - Number(item.discount || 0);
        return total + itemPrice;
    }, 0);

    res.render("cart", { user, bill })
})

router.get("/addtocart/:productid", isLoggedIn, async function (req, res) {
    try {
        let user = await userModel.findOne({ email: req.user.email })
        let product = await productModel.findById(req.params.productid)
        
        if (!product) {
            req.flash("error", "Product not found")
            return res.redirect("/shop")
        }
        
        user.cart.push(product._id)
        await user.save()
        
        req.flash("success", "Product added to cart")
        res.redirect("/shop")
    } catch (error) {
        console.error("Error adding to cart:", error)
        req.flash("error", "Failed to add product to cart")
        res.redirect("/shop")
    }
})

router.get("/remove-from-cart/:productId", isLoggedIn, async function (req, res) {
    try {
        const productId = req.params.productId;
        const user = await userModel.findOne({ email: req.user.email });
        
        // Remove the product from the cart
        user.cart = user.cart.filter(item => item.toString() !== productId);
        await user.save();
        
        req.flash("success", "Product removed from cart");
        res.redirect("/cart");
    } catch (error) {
        console.error("Error removing product from cart:", error);
        req.flash("error", "Failed to remove product from cart");
        res.redirect("/cart");
    }
})

router.get("/logout", function (req, res) {
    res.clearCookie("token")
    res.redirect("/")
})

module.exports = router

