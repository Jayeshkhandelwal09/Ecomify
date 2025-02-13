const express = require("express");
const { addToCart, removeFromCart, getCart } = require("../controllers/CartController");

const router = express.Router();

router.post("/add", addToCart); 
router.delete("/remove/:id/:userId", removeFromCart); 
router.get("/:userId", getCart); 

module.exports = router;
