const Contact = require("../models/Contact");

// ==========================================
// CREATE CONTACT
// ==========================================
const createContact = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
    } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required.",
      });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
      status: "New",
    });

    return res.status(201).json({
      success: true,
      message: "Contact enquiry submitted successfully.",
      data: contact,
    });
  } catch (error) {
    console.error("Create contact error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while submitting contact form.",
    });
  }
};

// ==========================================
// GET ALL CONTACTS
// ==========================================
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    console.error("Get contacts error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching contacts.",
    });
  }
};

// ==========================================
// GET SINGLE CONTACT
// ==========================================
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error("Get contact error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// ==========================================
// UPDATE CONTACT
// ==========================================
const updateContact = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
      status,
    } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        phone,
        subject,
        message,
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact updated successfully.",
      data: contact,
    });
  } catch (error) {
    console.error("Update contact error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while updating contact.",
    });
  }
};

// ==========================================
// DELETE CONTACT
// ==========================================
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(
      req.params.id
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact deleted successfully.",
    });
  } catch (error) {
    console.error("Delete contact error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while deleting contact.",
    });
  }
};

module.exports = {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
};