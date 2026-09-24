const express = require("express");
const router = express.Router();

const {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teacherController");

const {
  upload,
  convertTeacherImageToWebp,
} = require("../middleware/upload");

router.post(
  "/",
  upload.single("image"),
  convertTeacherImageToWebp,
  createTeacher
);

router.get("/", getTeachers);

router.get("/:id", getTeacherById);

router.put(
  "/:id",
  upload.single("image"),
  convertTeacherImageToWebp,
  updateTeacher
);

router.delete("/:id", deleteTeacher);

module.exports = router;