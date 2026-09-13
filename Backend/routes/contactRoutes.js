const express = require("express");

const {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

const router = express.Router();

// Create contact
router.post("/", createContact);

// Get all contacts
router.get("/", getContacts);

// Get one contact
router.get("/:id", getContactById);

// Update contact
router.put("/:id", updateContact);

// Delete contact
router.delete("/:id", deleteContact);

module.exports = router;