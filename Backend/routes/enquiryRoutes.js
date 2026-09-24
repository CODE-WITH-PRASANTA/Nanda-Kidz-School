const express = require("express");

const router = express.Router();

const {
  createEnquiry,
  getEnquiries,
  deleteEnquiry,
  updateEnquiryStatus,
} = require("../controllers/enquiryController");


/* =========================================================
   CREATE ENQUIRY
   POST /api/enquiries
========================================================= */

router.post("/", createEnquiry);


/* =========================================================
   GET ALL ENQUIRIES
   GET /api/enquiries
========================================================= */

router.get("/", getEnquiries);


/* =========================================================
   UPDATE ENQUIRY STATUS
   PATCH /api/enquiries/:id
========================================================= */

router.patch("/:id", updateEnquiryStatus);


/* =========================================================
   DELETE ENQUIRY
   DELETE /api/enquiries/:id
========================================================= */

router.delete("/:id", deleteEnquiry);


module.exports = router;