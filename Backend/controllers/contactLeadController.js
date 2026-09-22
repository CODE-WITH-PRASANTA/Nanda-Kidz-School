const ContactLead = require("../models/ContactLead");

// =====================================================
// CREATE CONTACT LEAD
// =====================================================

const createContactLead = async (req, res) => {
  try {
    console.log("=================================");
    console.log("CONTACT LEAD API HIT");
    console.log("REQUEST BODY:");
    console.log(req.body);
    console.log("=================================");

    const {
      name,
      surname,
      email,
      phone,
      childAge,
      city,
      subject,
      message,
      source,
    } = req.body;

    // ==========================================
    // REQUIRED VALIDATION
    // ==========================================

    // Only these fields are common/required
    // for both Home Contact and Parent Enquiry.

    if (
      !name ||
      !email ||
      !phone ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email, phone and message are required.",
      });
    }

    // ==========================================
    // CREATE CONTACT LEAD
    // ==========================================

    const contactLead =
      await ContactLead.create({
        name: name.trim(),

        surname:
          surname?.trim() || "",

        email:
          email.trim().toLowerCase(),

        phone:
          phone.trim(),

        childAge:
          childAge?.trim() || "",

        city:
          city?.trim() || "",

        subject:
          subject?.trim() || "",

        message:
          message.trim(),

        source:
          source === "Parent Enquiry"
            ? "Parent Enquiry"
            : "Home Contact",

        // New lead automatically
        status: "New",
      });

    // ==========================================
    // SUCCESS LOG
    // ==========================================

    console.log("CONTACT LEAD SAVED:");
    console.log(contactLead);
    console.log("=================================");

    return res.status(201).json({
      success: true,
      message:
        "Contact enquiry submitted successfully.",
      data: contactLead,
    });

  } catch (error) {

    // ==========================================
    // ERROR
    // ==========================================

    console.error(
      "================================="
    );

    console.error(
      "CREATE CONTACT LEAD ERROR:"
    );

    console.error(error);

    console.error(
      "================================="
    );

    return res.status(500).json({
      success: false,
      message:
        "Server error while submitting enquiry.",
      error: error.message,
    });
  }
};


// =====================================================
// GET ALL CONTACT LEADS
// =====================================================

const getContactLeads = async (req, res) => {
  try {

    const leads =
      await ContactLead.find()
        .sort({
          createdAt: -1,
        });

    return res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });

  } catch (error) {

    console.error(
      "Get Contact Leads Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch contact leads.",
      error: error.message,
    });
  }
};


// =====================================================
// GET SINGLE CONTACT LEAD
// =====================================================

const getContactLeadById = async (
  req,
  res
) => {
  try {

    const lead =
      await ContactLead.findById(
        req.params.id
      );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message:
          "Contact lead not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: lead,
    });

  } catch (error) {

    console.error(
      "Get Single Contact Lead Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch contact lead.",
      error: error.message,
    });
  }
};


// =====================================================
// UPDATE STATUS
// =====================================================

const updateContactLeadStatus = async (
  req,
  res
) => {
  try {

    const { status } = req.body;

    const allowedStatuses = [
      "New",
      "Contacted",
      "Interested",
      "Not Interested",
      "Converted",
    ];

    if (
      !allowedStatuses.includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid status.",
      });
    }

    const lead =
      await ContactLead.findByIdAndUpdate(
        req.params.id,
        {
          status,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message:
          "Contact lead not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Status updated successfully.",
      data: lead,
    });

  } catch (error) {

    console.error(
      "Update Status Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update contact lead status.",
      error: error.message,
    });
  }
};


// =====================================================
// DELETE CONTACT LEAD
// =====================================================

const deleteContactLead = async (
  req,
  res
) => {
  try {

    const lead =
      await ContactLead.findByIdAndDelete(
        req.params.id
      );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message:
          "Contact lead not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Contact lead deleted successfully.",
    });

  } catch (error) {

    console.error(
      "Delete Contact Lead Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete contact lead.",
      error: error.message,
    });
  }
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
  createContactLead,
  getContactLeads,
  getContactLeadById,
  updateContactLeadStatus,
  deleteContactLead,
};