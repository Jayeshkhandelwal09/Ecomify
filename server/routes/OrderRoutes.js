const express = require("express");
const { placeOrder, getUserOrders, getOrderDetails, cancelOrder } = require("../controllers/OrderController");

const router = express.Router();

router.post("/place", placeOrder); 
router.get("/:userId", getUserOrders);
router.get("/details/:orderId", getOrderDetails); 
router.put("/cancel/:orderId", cancelOrder); 

module.exports = router;
