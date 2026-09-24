const Enquiry = require("../models/enquiryModel");

/* =========================================================
   CREATE ENQUIRY
   POST /api/enquiries
========================================================= */
const createEnquiry = async (req, res) => {
  try {
    const { name, address, age, message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Child's name is required.",
      });
    }

    if (!address || !address.trim()) {
      return res.status(400).json({
        success: false,
        message: "Address is required.",
      });
    }

    if (!age) {
      return res.status(400).json({
        success: false,
        message: "Child's age is required.",
      });
    }

    const newEnquiry = await Enquiry.create({
      name: name.trim(),
      address: address.trim(),
      age: age.trim(),
      message: message ? message.trim() : "",
    });

    return res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully.",
      data: newEnquiry,
    });
  } catch (error) {
    console.error("Create Enquiry Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to submit enquiry.",
      error: error.message,
    });
  }
};

/* =========================================================
   GET ALL ENQUIRIES
   GET /api/enquiries
========================================================= */
const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    console.error("Get Enquiries Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch enquiries.",
      error: error.message,
    });
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
};