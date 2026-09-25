const fs = require("fs");
const path = require("path");
const Admission = require("../models/Admission");

// ======================================================
// DELETE FILE
// ======================================================

const deleteFile = (relativePath) => {
  try {
    if (!relativePath) return;

    const cleanPath = relativePath.replace(/^\/+/, "");

    const absolutePath = path.join(
      __dirname,
      "..",
      cleanPath
    );

    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }
  } catch (error) {
    console.error(
      "OLD FILE DELETE ERROR:",
      error.message
    );
  }
};

// ======================================================
// GET PROCESSED FILES
// ======================================================

const getDocumentsFromRequest = (req) => {
  const documents = {};

  for (const file of req.processedFiles || []) {
    documents[file.fieldname] = {
      originalName: file.originalName || "",
      fileName: file.filename || "",
      url: file.path || file.url || "",
      mimeType: file.mimetype || "",
      size: file.size || 0,
    };
  }

  return documents;
};

// ======================================================
// ADMISSION FIELDS
// ======================================================

const admissionFields = [
  "studentName",
  "dob",
  "gender",
  "bloodGroup",
  "aadhaar",
  "nationality",
  "religion",
  "caste",
  "specialNeeds",

  "fatherName",
  "motherName",
  "email",
  "mobile",
  "altMobile",
  "occupation",
  "address",
  "city",
  "state",
  "pincode",
  "parentStatus",
  "annualIncome",

  "transportRequired",
  "pickupLocation",
  "dropLocation",
  "routeBus",
  "pickupTime",
  "dropTime",

  "admissionClass",
  "session",
  "medium",
  "admissionDate",
  "previousSchool",
  "lastClassCompleted",
];

// ======================================================
// BUILD PAYLOAD
// ======================================================

const buildPayload = (body) => {
  const payload = {};

  admissionFields.forEach((field) => {
    if (body[field] !== undefined) {
      payload[field] = body[field];
    }
  });

  return payload;
};

// ======================================================
// CREATE ADMISSION
// ======================================================

const createAdmission = async (req, res) => {
  try {
    const payload = buildPayload(req.body);

    const documents =
      getDocumentsFromRequest(req);

    payload.documents = {
      birthCertificate:
        documents.birthCertificate || null,

      aadhaarCard:
        documents.aadhaarCard || null,

      addressProof:
        documents.addressProof || null,

      passportPhoto:
        documents.passportPhoto || null,

      previousTc:
        documents.previousTc || null,
    };

    const requiredFields = [
      "studentName",
      "dob",
      "gender",
      "fatherName",
      "motherName",
      "email",
      "mobile",
      "address",
      "city",
      "state",
      "pincode",
      "admissionClass",
      "session",
      "admissionDate",
    ];

    const missingFields =
      requiredFields.filter(
        (field) =>
          !String(payload[field] || "").trim()
      );

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(
          ", "
        )}`,
      });
    }

    const admission =
      await Admission.create(payload);

    return res.status(201).json({
      success: true,
      message:
        "Admission created successfully.",
      data: admission,
    });
  } catch (error) {
    console.error(
      "CREATE ADMISSION ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to create admission.",
      error: error.message,
    });
  }
};

// ======================================================
// GET ALL ADMISSIONS
// ======================================================

const getAdmissions = async (req, res) => {
  try {
    const admissions =
      await Admission.find()
        .sort({
          createdAt: -1,
        })
        .lean();

    return res.json({
      success: true,
      data: admissions,
    });
  } catch (error) {
    console.error(
      "GET ADMISSIONS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch admissions.",
      error: error.message,
    });
  }
};

// ======================================================
// GET SINGLE ADMISSION
// ======================================================

const getAdmission = async (req, res) => {
  try {
    const admission =
      await Admission.findById(
        req.params.id
      ).lean();

    if (!admission) {
      return res.status(404).json({
        success: false,
        message:
          "Admission not found.",
      });
    }

    return res.json({
      success: true,
      data: admission,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        "Invalid admission ID.",
      error: error.message,
    });
  }
};

// ======================================================
// UPDATE ADMISSION
// ======================================================

const updateAdmission = async (
  req,
  res
) => {
  try {
    const admission =
      await Admission.findById(
        req.params.id
      );

    if (!admission) {
      return res.status(404).json({
        success: false,
        message:
          "Admission not found.",
      });
    }

    const payload =
      buildPayload(req.body);

    const newDocuments =
      getDocumentsFromRequest(req);

    // Update normal fields
    Object.assign(
      admission,
      payload
    );

    const documentFields = [
      "birthCertificate",
      "aadhaarCard",
      "addressProof",
      "passportPhoto",
      "previousTc",
    ];

    // Update only newly uploaded files
    for (
      const field of documentFields
    ) {
      if (newDocuments[field]) {
        const oldDocument =
          admission.documents?.[field];

        admission.documents[field] =
          newDocuments[field];

        // Delete old file
        if (oldDocument?.url) {
          deleteFile(
            oldDocument.url
          );
        }
      }
    }

    await admission.save();

    return res.json({
      success: true,
      message:
        "Admission updated successfully.",
      data: admission,
    });
  } catch (error) {
    console.error(
      "UPDATE ADMISSION ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update admission.",
      error: error.message,
    });
  }
};

// ======================================================
// UPDATE STATUS
// ======================================================

const updateAdmissionStatus =
  async (req, res) => {
    try {
      const { status } =
        req.body;

      if (
        !["Active", "Inactive"].includes(
          status
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Status must be Active or Inactive.",
        });
      }

      const admission =
        await Admission.findByIdAndUpdate(
          req.params.id,
          {
            status,
          },
          {
            new: true,
          }
        );

      if (!admission) {
        return res.status(404).json({
          success: false,
          message:
            "Admission not found.",
        });
      }

      return res.json({
        success: true,
        message:
          "Status updated successfully.",
        data: admission,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          "Failed to update status.",
        error: error.message,
      });
    }
  };

// ======================================================
// DELETE ADMISSION
// ======================================================

const deleteAdmission = async (
  req,
  res
) => {
  try {
    const admission =
      await Admission.findById(
        req.params.id
      );

    if (!admission) {
      return res.status(404).json({
        success: false,
        message:
          "Admission not found.",
      });
    }

    const documents =
      admission.documents?.toObject?.() ||
      admission.documents ||
      {};

    Object.values(documents).forEach(
      (document) => {
        if (document?.url) {
          deleteFile(
            document.url
          );
        }
      }
    );

    await Admission.findByIdAndDelete(
      req.params.id
    );

    return res.json({
      success: true,
      message:
        "Admission deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE ADMISSION ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete admission.",
      error: error.message,
    });
  }
};

module.exports = {
  createAdmission,
  getAdmissions,
  getAdmission,
  updateAdmission,
  updateAdmissionStatus,
  deleteAdmission,
};