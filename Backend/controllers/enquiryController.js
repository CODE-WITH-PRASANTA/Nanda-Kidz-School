const mongoose = require("mongoose");
const Enquiry = require("../models/enquiryModel");


/* =========================================================
   CREATE ENQUIRY
   POST /api/enquiries
========================================================= */

const createEnquiry = async (req, res) => {
  try {
    const {
      name,
      address,
      age,
      message,
    } = req.body;


    /* =========================
       VALIDATION
    ========================= */

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


    /* =========================
       CREATE ENQUIRY
    ========================= */

    const newEnquiry = await Enquiry.create({
      name: name.trim(),
      address: address.trim(),
      age: age.trim(),
      message: message
        ? message.trim()
        : "",
      status: "New",
    });


    return res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully.",
      data: newEnquiry,
    });

  } catch (error) {

    console.error(
      "Create Enquiry Error:",
      error
    );

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

    const enquiries = await Enquiry
      .find()
      .sort({
        createdAt: -1,
      });


    return res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });

  } catch (error) {

    console.error(
      "Get Enquiries Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch enquiries.",
      error: error.message,
    });
  }
};



/* =========================================================
   UPDATE ENQUIRY STATUS
   PATCH /api/enquiries/:id
========================================================= */

const updateEnquiryStatus = async (req, res) => {
  try {

    const { id } = req.params;
    const { status } = req.body;


    console.log(
      "Update Status Request:",
      id,
      status
    );


    /* =========================
       VALIDATE ID
    ========================= */

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry ID.",
      });
    }


    /* =========================
       VALIDATE STATUS
    ========================= */

    const allowedStatuses = [
      "New",
      "Contacted",
      "Follow Up",
      "Closed",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry status.",
      });
    }


    /* =========================
       UPDATE
    ========================= */

    const updatedEnquiry =
      await Enquiry.findByIdAndUpdate(
        id,
        {
          status: status,
        },
        {
          new: true,
          runValidators: true,
        }
      );


    /* =========================
       NOT FOUND
    ========================= */

    if (!updatedEnquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
    }


    /* =========================
       SUCCESS
    ========================= */

    console.log(
      `Enquiry ${id} status updated to ${status}`
    );


    return res.status(200).json({
      success: true,
      message: "Enquiry status updated successfully.",
      data: updatedEnquiry,
    });

  } catch (error) {

    console.error(
      "Update Enquiry Status Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update enquiry status.",
      error: error.message,
    });
  }
};



/* =========================================================
   DELETE ENQUIRY
   DELETE /api/enquiries/:id
========================================================= */

const deleteEnquiry = async (req, res) => {
  try {

    const { id } = req.params;


    /* =========================
       VALIDATE ID
    ========================= */

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry ID.",
      });
    }


    /* =========================
       DELETE
    ========================= */

    const deletedEnquiry =
      await Enquiry.findByIdAndDelete(id);


    if (!deletedEnquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
    }


    return res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully.",
      data: {
        id: id,
      },
    });

  } catch (error) {

    console.error(
      "Delete Enquiry Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete enquiry.",
      error: error.message,
    });
  }
};



/* =========================================================
   EXPORT
========================================================= */

module.exports = {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
};