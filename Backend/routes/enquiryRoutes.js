const express = require("express");
const router = express.Router();
const {
  createEnquiry,
  getEnquiries,
} = require("../controllers/enquiryController");

// POST /api/enquiries - Submit new enquiry
router.post("/", createEnquiry);

// GET /api/enquiries - View all enquiries (for admin panels)
router.get("/", getEnquiries);

module.exports = router;