const express = require("express");

const {
  createContactLead,
  getContactLeads,
  getContactLeadById,
  updateContactLeadStatus,
  deleteContactLead,
} = require("../controllers/contactLeadController");

const router = express.Router();

// ==========================================
// CREATE
// POST /api/contact-leads
// ==========================================

router.post(
  "/",
  createContactLead
);

// ==========================================
// GET ALL
// GET /api/contact-leads
// ==========================================

router.get(
  "/",
  getContactLeads
);

// ==========================================
// GET SINGLE
// GET /api/contact-leads/:id
// ==========================================

router.get(
  "/:id",
  getContactLeadById
);

// ==========================================
// UPDATE STATUS
// PATCH /api/contact-leads/:id/status
// ==========================================

router.patch(
  "/:id/status",
  updateContactLeadStatus
);

// ==========================================
// DELETE
// DELETE /api/contact-leads/:id
// ==========================================

router.delete(
  "/:id",
  deleteContactLead
);

module.exports = router;