const Order = require("../models/Order");

// ==========================================
// GENERATE UNIQUE ORDER ID
// ==========================================

const generateOrderId = async () => {
  let orderId;
  let exists = true;

  while (exists) {
    const randomNumber = Math.floor(
      100000 + Math.random() * 900000
    );

    orderId = `ORD-${randomNumber}`;

    exists = await Order.exists({
      orderId,
    });
  }

  return orderId;
};

// ==========================================
// CREATE ORDER
// ==========================================

const createOrder = async (req, res) => {
  try {
    const {
      productId,
      productTitle,
      price,
      studentName,
      age,
      size,
      phone,
      address,
    } = req.body;

    if (
      productId === undefined ||
      !productTitle ||
      !price ||
      !studentName ||
      age === undefined ||
      !size ||
      !phone ||
      !address
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message:
          "Phone number must contain exactly 10 digits.",
      });
    }

    const numericAge = Number(age);

    if (
      Number.isNaN(numericAge) ||
      numericAge < 1 ||
      numericAge > 12
    ) {
      return res.status(400).json({
        success: false,
        message: "Age must be between 1 and 12.",
      });
    }

    const orderId = await generateOrderId();

    const order = await Order.create({
      orderId,
      productId,
      productTitle,
      price,
      studentName,
      age: numericAge,
      size,
      phone,
      address,
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully.",
      order,
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create order.",
      error: error.message,
    });
  }
};

// ==========================================
// GET ALL ORDERS
// ==========================================

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({
        createdAt: -1,
      })
      .lean();

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("GET ORDERS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders.",
      error: error.message,
    });
  }
};

// ==========================================
// GET SINGLE ORDER
// ==========================================

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(
      req.params.id
    ).lean();

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(
      "GET SINGLE ORDER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch order.",
      error: error.message,
    });
  }
};

// ==========================================
// UPDATE ORDER
// ==========================================

const updateOrder = async (req, res) => {
  try {
    const {
      studentName,
      age,
      size,
      phone,
      address,
      status,
    } = req.body;

    if (
      !studentName ||
      age === undefined ||
      !size ||
      !phone ||
      !address ||
      !status
    ) {
      return res.status(400).json({
        success: false,
        message: "All editable fields are required.",
      });
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message:
          "Phone number must contain exactly 10 digits.",
      });
    }

    const numericAge = Number(age);

    if (
      Number.isNaN(numericAge) ||
      numericAge < 1 ||
      numericAge > 12
    ) {
      return res.status(400).json({
        success: false,
        message: "Age must be between 1 and 12.",
      });
    }

    const allowedStatuses = [
      "Pending",
      "Processing",
      "Completed",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status.",
      });
    }

    const updatedOrder =
      await Order.findByIdAndUpdate(
        req.params.id,
        {
          studentName,
          age: numericAge,
          size,
          phone,
          address,
          status,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order updated successfully.",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("UPDATE ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update order.",
      error: error.message,
    });
  }
};

// ==========================================
// DELETE ORDER
// ==========================================

const deleteOrder = async (req, res) => {
  try {
    const deletedOrder =
      await Order.findByIdAndDelete(
        req.params.id
      );

    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully.",
      deletedOrder,
    });
  } catch (error) {
    console.error("DELETE ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete order.",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};