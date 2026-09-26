const express = require("express");

const router = express.Router();

const {
  getSchoolTeachers,
  getSchoolTeacher,
  createSchoolTeacher,
  updateSchoolTeacher,
  deleteSchoolTeacher,
  updateSchoolTeacherStatus,
} = require("../controllers/schoolTeacherController");

// Existing upload middleware
const {
  upload,
  convertTeacherImageToWebp,
} = require("../middleware/upload");

/*
|--------------------------------------------------------------------------
| GET ALL TEACHERS
|--------------------------------------------------------------------------
| GET /api/school-teachers
|--------------------------------------------------------------------------
*/

router.get("/", getSchoolTeachers);

/*
|--------------------------------------------------------------------------
| GET SINGLE TEACHER
|--------------------------------------------------------------------------
| GET /api/school-teachers/:id
|--------------------------------------------------------------------------
*/

router.get("/:id", getSchoolTeacher);

/*
|--------------------------------------------------------------------------
| CREATE TEACHER
|--------------------------------------------------------------------------
| POST /api/school-teachers
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  upload.single("photo"),
  convertTeacherImageToWebp,
  createSchoolTeacher
);

/*
|--------------------------------------------------------------------------
| UPDATE TEACHER
|--------------------------------------------------------------------------
| PUT /api/school-teachers/:id
|--------------------------------------------------------------------------
*/

router.put(
  "/:id",
  upload.single("photo"),
  convertTeacherImageToWebp,
  updateSchoolTeacher
);

/*
|--------------------------------------------------------------------------
| UPDATE STATUS
|--------------------------------------------------------------------------
| PATCH /api/school-teachers/:id/status
|--------------------------------------------------------------------------
*/

router.patch(
  "/:id/status",
  updateSchoolTeacherStatus
);

/*
|--------------------------------------------------------------------------
| DELETE TEACHER
|--------------------------------------------------------------------------
| DELETE /api/school-teachers/:id
|--------------------------------------------------------------------------
*/

router.delete(
  "/:id",
  deleteSchoolTeacher
);

module.exports = router;