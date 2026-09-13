const express = require("express");

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const router = express.Router();

// CREATE
router.post("/", createOrder);

// READ ALL
router.get("/", getOrders);

// READ SINGLE
router.get("/:id", getOrderById);

// UPDATE
router.put("/:id", updateOrder);

// DELETE
router.delete("/:id", deleteOrder);

module.exports = router;