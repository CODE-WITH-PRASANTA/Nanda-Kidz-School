const Teacher = require("../models/teacherModel");

// =====================================================
// CREATE TEACHER
// =====================================================
const createTeacher = async (req, res) => {
  try {
    const {
      name,
      designation,
      email,
      phone,
      role,
      status,
      bio,
      fb,
      linkedin,
      twitter,
      instagram,
    } = req.body;

    // ---------------------------------------------
    // IMAGE PATH
    // ---------------------------------------------
    let image = "";

    if (req.processedFile) {
      image = req.processedFile.path;
    }

    // ---------------------------------------------
    // CREATE TEACHER
    // ---------------------------------------------
    const teacher = await Teacher.create({
      name,
      designation,
      email,
      phone,
      role: role || "Teacher",
      status: status || "Active",
      bio,
      fb,
      linkedin,
      twitter,
      instagram,
      image,
    });

    return res.status(201).json({
      success: true,
      message: "Teacher created successfully",
      teacher,
    });
  } catch (error) {
    console.error("CREATE TEACHER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create teacher",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL TEACHERS
// =====================================================
const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      teachers,
    });
  } catch (error) {
    console.error("GET TEACHERS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch teachers",
      error: error.message,
    });
  }
};

// =====================================================
// GET TEACHER BY ID
// =====================================================
const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    return res.status(200).json({
      success: true,
      teacher,
    });
  } catch (error) {
    console.error("GET TEACHER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch teacher",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE TEACHER
// =====================================================
const updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    // ---------------------------------------------
    // UPDATE TEXT FIELDS
    // ---------------------------------------------
    teacher.name = req.body.name;
    teacher.designation = req.body.designation;
    teacher.email = req.body.email;
    teacher.phone = req.body.phone;
    teacher.role = req.body.role || "Teacher";
    teacher.status = req.body.status || "Active";
    teacher.bio = req.body.bio;
    teacher.fb = req.body.fb;
    teacher.linkedin = req.body.linkedin;
    teacher.twitter = req.body.twitter;
    teacher.instagram = req.body.instagram;

    // ---------------------------------------------
    // UPDATE IMAGE ONLY IF NEW IMAGE UPLOADED
    // ---------------------------------------------
    if (req.processedFile) {
      teacher.image = req.processedFile.path;
    }

    await teacher.save();

    return res.status(200).json({
      success: true,
      message: "Teacher updated successfully",
      teacher,
    });
  } catch (error) {
    console.error("UPDATE TEACHER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update teacher",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE TEACHER
// =====================================================
const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    // ---------------------------------------------
    // DELETE IMAGE FROM UPLOADS
    // ---------------------------------------------
    if (teacher.image) {
      const imagePath = path.join(
        __dirname,
        "..",
        teacher.image.replace(/^\/+/, "")
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Teacher.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Teacher deleted successfully",
    });
  } catch (error) {
    console.error("DELETE TEACHER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete teacher",
      error: error.message,
    });
  }
};

module.exports = {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};