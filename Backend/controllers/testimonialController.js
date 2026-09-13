const mongoose = require("mongoose");
const Testimonial = require("../models/Testimonial");

// =====================================================
// CREATE TESTIMONIAL
// =====================================================

const createTestimonial = async (req, res) => {
  try {
    const {
      name,
      designation,
      rating,
      description,
    } = req.body;

    if (
      !name ||
      !designation ||
      rating === undefined ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const numericRating = Number(rating);

    if (
      Number.isNaN(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5.",
      });
    }

    const cleanName = name.trim();
    const cleanDesignation = designation.trim();
    const cleanDescription = description.trim();

    if (
      !cleanName ||
      !cleanDesignation ||
      !cleanDescription
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const testimonial = await Testimonial.create({
      name: cleanName,
      designation: cleanDesignation,
      rating: numericRating,
      description: cleanDescription,

      // New reviews ALWAYS unpublished
      status: "unpublished",
    });

    return res.status(201).json({
      success: true,
      message:
        "Review submitted successfully and is awaiting approval.",
      testimonial,
    });
  } catch (error) {
    console.error(
      "CREATE TESTIMONIAL ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to submit testimonial.",
    });
  }
};

// =====================================================
// ADMIN - GET ALL TESTIMONIALS
// =====================================================

const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find()
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: testimonials.length,
      testimonials,
    });
  } catch (error) {
    console.error(
      "GET ALL TESTIMONIALS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch testimonials.",
    });
  }
};

// =====================================================
// PUBLIC - GET PUBLISHED ONLY
// =====================================================

const getPublishedTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({
      status: "published",
    })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: testimonials.length,
      testimonials,
    });
  } catch (error) {
    console.error(
      "GET PUBLISHED TESTIMONIALS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch published testimonials.",
    });
  }
};

// =====================================================
// PUBLISH / UNPUBLISH
// =====================================================

const updateTestimonialStatus = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid testimonial ID.",
      });
    }

    if (
      !["published", "unpublished"].includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Status must be published or unpublished.",
      });
    }

    const testimonial =
      await Testimonial.findByIdAndUpdate(
        id,
        { status },
        {
          returnDocument: "after",
          runValidators: true,
        }
      );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        status === "published"
          ? "Testimonial published successfully."
          : "Testimonial unpublished successfully.",
      testimonial,
    });
  } catch (error) {
    console.error(
      "UPDATE TESTIMONIAL STATUS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update testimonial status.",
    });
  }
};

// =====================================================
// DELETE
// =====================================================

const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid testimonial ID.",
      });
    }

    const testimonial =
      await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully.",
      deletedId: id,
    });
  } catch (error) {
    console.error(
      "DELETE TESTIMONIAL ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete testimonial.",
    });
  }
};

module.exports = {
  createTestimonial,
  getAllTestimonials,
  getPublishedTestimonials,
  updateTestimonialStatus,
  deleteTestimonial,
};