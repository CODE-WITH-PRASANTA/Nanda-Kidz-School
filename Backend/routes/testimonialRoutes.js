const express = require("express");

const {
  createTestimonial,
  getAllTestimonials,
  getPublishedTestimonials,
  updateTestimonialStatus,
  deleteTestimonial,
} = require("../controllers/testimonialController");

const router = express.Router();

// Public - submit review
router.post("/", createTestimonial);

// Public - published reviews only
router.get(
  "/published",
  getPublishedTestimonials
);

// Admin - all reviews
router.get(
  "/admin",
  getAllTestimonials
);

// Admin - publish/unpublish
router.patch(
  "/:id/status",
  updateTestimonialStatus
);

// Admin - delete
router.delete(
  "/:id",
  deleteTestimonial
);

module.exports = router;