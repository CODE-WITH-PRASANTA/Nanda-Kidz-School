const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const SchoolTeacher = require("../models/SchoolTeacher");

/*
|--------------------------------------------------------------------------
| SAFE TEACHER RESPONSE
|--------------------------------------------------------------------------
| Never send password back to frontend.
|--------------------------------------------------------------------------
*/

const safeTeacher = (teacher) => {
  if (!teacher) return null;

  const data = teacher.toObject
    ? teacher.toObject()
    : { ...teacher };

  delete data.password;

  return data;
};

/*
|--------------------------------------------------------------------------
| PARSE SKILLS
|--------------------------------------------------------------------------
*/

const parseSkills = (skills) => {
  if (!skills) {
    return [];
  }

  if (Array.isArray(skills)) {
    return skills
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  if (typeof skills === "string") {
    const value = skills.trim();

    if (!value) {
      return [];
    }

    // JSON array
    try {
      const parsed = JSON.parse(value);

      if (Array.isArray(parsed)) {
        return parsed
          .map((item) => String(item).trim())
          .filter(Boolean);
      }
    } catch (error) {
      // Not JSON, continue
    }

    // Comma separated
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

/*
|--------------------------------------------------------------------------
| DELETE TEACHER PHOTO
|--------------------------------------------------------------------------
*/

const removePhoto = (photoPath) => {
  try {
    if (!photoPath || typeof photoPath !== "string") {
      return;
    }

    if (!photoPath.startsWith("/uploads/")) {
      return;
    }

    const filename = path.basename(photoPath);

    const filePath = path.join(
      process.cwd(),
      "uploads",
      filename
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("Teacher photo deleted:", filename);
    }
  } catch (error) {
    console.error(
      "Teacher photo delete error:",
      error.message
    );
  }
};

/*
|--------------------------------------------------------------------------
| GET ALL TEACHERS
|--------------------------------------------------------------------------
| GET /api/school-teachers
|--------------------------------------------------------------------------
*/

const getSchoolTeachers = async (req, res) => {
  try {
    const teachers = await SchoolTeacher.find()
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: teachers.length,
      data: teachers,
    });
  } catch (error) {
    console.error(
      "GET SCHOOL TEACHERS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch teachers.",
      error: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET SINGLE TEACHER
|--------------------------------------------------------------------------
| GET /api/school-teachers/:id
|--------------------------------------------------------------------------
*/

const getSchoolTeacher = async (req, res) => {
  try {
    const teacher = await SchoolTeacher.findById(
      req.params.id
    ).select("-password");

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: teacher,
    });
  } catch (error) {
    console.error(
      "GET SINGLE SCHOOL TEACHER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch teacher.",
      error: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| CREATE TEACHER
|--------------------------------------------------------------------------
| POST /api/school-teachers
|--------------------------------------------------------------------------
*/

const createSchoolTeacher = async (req, res) => {
  let createdPhoto = null;

  try {
    const {
      name,
      phone,
      email,
      password,
      address,
      designation,
      experience,
      joiningDate,
      qualification,
      subject,
      gender,
      dob,
      bloodGroup,
      status,
      bio,
      skills,
    } = req.body;

    /*
    |--------------------------------------------------------------------------
    | PHOTO
    |--------------------------------------------------------------------------
    */

    if (req.processedFile?.path) {
      createdPhoto = req.processedFile.path;
    }

    /*
    |--------------------------------------------------------------------------
    | PASSWORD
    |--------------------------------------------------------------------------
    */

    let hashedPassword = "";

    if (
      password &&
      typeof password === "string" &&
      password.trim()
    ) {
      hashedPassword = await bcrypt.hash(
        password.trim(),
        12
      );
    }

    /*
    |--------------------------------------------------------------------------
    | CREATE DATA
    |--------------------------------------------------------------------------
    */

    const teacherData = {
      name: name || "",
      phone: phone || "",
      email: email || "",
      password: hashedPassword,
      address: address || "",
      designation: designation || "",
      experience: experience || "",
      joiningDate: joiningDate || null,
      qualification: qualification || "",
      subject: subject || "",
      gender: gender || "",
      dob: dob || null,
      bloodGroup: bloodGroup || "",
      status:
        status === "Inactive"
          ? "Inactive"
          : "Active",
      bio: bio || "",
      skills: parseSkills(skills),
      photo: createdPhoto || "",
    };

    /*
    |--------------------------------------------------------------------------
    | SAVE
    |--------------------------------------------------------------------------
    */

    const teacher = await SchoolTeacher.create(
      teacherData
    );

    return res.status(201).json({
      success: true,
      message: "Teacher created successfully.",
      data: safeTeacher(teacher),
    });
  } catch (error) {
    console.error(
      "CREATE SCHOOL TEACHER ERROR:",
      error
    );

    /*
    |--------------------------------------------------------------------------
    | CLEANUP PHOTO IF DATABASE SAVE FAILED
    |--------------------------------------------------------------------------
    */

    if (createdPhoto) {
      removePhoto(createdPhoto);
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create teacher.",
      error: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| UPDATE TEACHER
|--------------------------------------------------------------------------
| PUT /api/school-teachers/:id
|--------------------------------------------------------------------------
*/

const updateSchoolTeacher = async (req, res) => {
  let newPhoto = null;

  try {
    const teacher = await SchoolTeacher.findById(
      req.params.id
    ).select("+password");

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found.",
      });
    }

    const oldPhoto = teacher.photo;

    const {
      name,
      phone,
      email,
      password,
      address,
      designation,
      experience,
      joiningDate,
      qualification,
      subject,
      gender,
      dob,
      bloodGroup,
      status,
      bio,
      skills,
    } = req.body;

    /*
    |--------------------------------------------------------------------------
    | BASIC FIELDS
    |--------------------------------------------------------------------------
    */

    if (name !== undefined) {
      teacher.name = name;
    }

    if (phone !== undefined) {
      teacher.phone = phone;
    }

    if (email !== undefined) {
      teacher.email = email;
    }

    if (address !== undefined) {
      teacher.address = address;
    }

    if (designation !== undefined) {
      teacher.designation = designation;
    }

    if (experience !== undefined) {
      teacher.experience = experience;
    }

    if (qualification !== undefined) {
      teacher.qualification = qualification;
    }

    if (subject !== undefined) {
      teacher.subject = subject;
    }

    if (gender !== undefined) {
      teacher.gender = gender;
    }

    if (bloodGroup !== undefined) {
      teacher.bloodGroup = bloodGroup;
    }

    if (bio !== undefined) {
      teacher.bio = bio;
    }

    if (status !== undefined) {
      teacher.status =
        status === "Inactive"
          ? "Inactive"
          : "Active";
    }

    /*
    |--------------------------------------------------------------------------
    | DATES
    |--------------------------------------------------------------------------
    */

    if (joiningDate !== undefined) {
      teacher.joiningDate =
        joiningDate && String(joiningDate).trim()
          ? joiningDate
          : null;
    }

    if (dob !== undefined) {
      teacher.dob =
        dob && String(dob).trim()
          ? dob
          : null;
    }

    /*
    |--------------------------------------------------------------------------
    | SKILLS
    |--------------------------------------------------------------------------
    */

    if (skills !== undefined) {
      teacher.skills = parseSkills(skills);
    }

    /*
    |--------------------------------------------------------------------------
    | PASSWORD
    |--------------------------------------------------------------------------
    |
    | Empty password means:
    | KEEP OLD PASSWORD
    |
    */

    if (
      password &&
      typeof password === "string" &&
      password.trim()
    ) {
      teacher.password = await bcrypt.hash(
        password.trim(),
        12
      );
    }

    /*
    |--------------------------------------------------------------------------
    | NEW PHOTO
    |--------------------------------------------------------------------------
    */

    if (req.processedFile?.path) {
      newPhoto = req.processedFile.path;
      teacher.photo = newPhoto;
    }

    /*
    |--------------------------------------------------------------------------
    | SAVE
    |--------------------------------------------------------------------------
    */

    await teacher.save();

    /*
    |--------------------------------------------------------------------------
    | DELETE OLD PHOTO ONLY AFTER SUCCESSFUL SAVE
    |--------------------------------------------------------------------------
    */

    if (
      newPhoto &&
      oldPhoto &&
      oldPhoto !== newPhoto
    ) {
      removePhoto(oldPhoto);
    }

    return res.status(200).json({
      success: true,
      message: "Teacher updated successfully.",
      data: safeTeacher(teacher),
    });
  } catch (error) {
    console.error(
      "UPDATE SCHOOL TEACHER ERROR:",
      error
    );

    /*
    |--------------------------------------------------------------------------
    | DELETE NEW PHOTO IF UPDATE FAILED
    |--------------------------------------------------------------------------
    */

    if (newPhoto) {
      removePhoto(newPhoto);
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update teacher.",
      error: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| DELETE TEACHER
|--------------------------------------------------------------------------
| DELETE /api/school-teachers/:id
|--------------------------------------------------------------------------
*/

const deleteSchoolTeacher = async (req, res) => {
  try {
    const teacher = await SchoolTeacher.findByIdAndDelete(
      req.params.id
    );

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE PHOTO
    |--------------------------------------------------------------------------
    */

    if (teacher.photo) {
      removePhoto(teacher.photo);
    }

    return res.status(200).json({
      success: true,
      message: "Teacher deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE SCHOOL TEACHER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete teacher.",
      error: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| UPDATE STATUS
|--------------------------------------------------------------------------
| PATCH /api/school-teachers/:id/status
|--------------------------------------------------------------------------
*/

const updateSchoolTeacherStatus = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    if (!["Active", "Inactive"].includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Status must be Active or Inactive.",
      });
    }

    const teacher = await SchoolTeacher.findByIdAndUpdate(
      req.params.id,
      {
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Teacher ${
        status === "Active"
          ? "activated"
          : "deactivated"
      } successfully.`,
      data: teacher,
    });
  } catch (error) {
    console.error(
      "UPDATE TEACHER STATUS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update teacher status.",
      error: error.message,
    });
  }
};

module.exports = {
  getSchoolTeachers,
  getSchoolTeacher,
  createSchoolTeacher,
  updateSchoolTeacher,
  deleteSchoolTeacher,
  updateSchoolTeacherStatus,
};