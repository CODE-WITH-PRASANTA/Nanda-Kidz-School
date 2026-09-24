import React, { useEffect, useState } from "react";
import "./TeacherPost.css";
import API, { IMG_URL } from "../../api/axios";

import {
  FaUserPlus,
  FaUser,
  FaEdit,
  FaTrashAlt,
  FaSearch,
  FaUndo,
  FaSave,
  FaChevronLeft,
  FaChevronRight,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaCamera,
  FaUpload,
  FaTimes,
  FaCheckCircle,
  FaSpinner,
  FaImage,
} from "react-icons/fa";

/* =========================================================
   EMPTY FORM
========================================================= */

const EMPTY_FORM = {
  name: "",
  designation: "",
  email: "",
  phone: "",
  role: "Teacher",
  status: "Active",
  bio: "",
  fb: "",
  linkedin: "",
  twitter: "",
  instagram: "",
  imageFile: null,
  imagePreview: "",
};

/* =========================================================
   IMAGE URL HELPER
========================================================= */

const getImageUrl = (image) => {
  if (!image) {
    return "";
  }

  // Full URL already
  if (
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }

  // MongoDB stores /uploads/teacher-xxxxx.webp
  return `${IMG_URL}${image.startsWith("/") ? "" : "/"}${image}`;
};

/* =========================================================
   COMPONENT
========================================================= */

const TeacherPost = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState({
    ...EMPTY_FORM,
  });

  const itemsPerPage = 4;

  /* =========================================================
     FETCH ALL TEACHERS
  ========================================================= */

  const fetchTeachers = async () => {
    try {
      setLoading(true);

      const response = await API.get("/teachers");

      console.log(
        "================================="
      );
      console.log("TEACHERS API RESPONSE");
      console.log(response.data);
      console.log(
        "================================="
      );

      if (response.data?.success) {
        /*
          Supports both:

          {
            success: true,
            data: [...]
          }

          OR

          {
            success: true,
            teachers: [...]
          }
        */

        const teacherData =
          Array.isArray(response.data.data)
            ? response.data.data
            : Array.isArray(response.data.teachers)
            ? response.data.teachers
            : [];

        setTeachers(teacherData);
      } else {
        setTeachers([]);
      }
    } catch (error) {
      console.error(
        "Error fetching teachers:",
        error
      );

      if (error.response) {
        console.error(
          "Status:",
          error.response.status
        );

        console.error(
          "Response:",
          error.response.data
        );
      }

      alert(
        error.response?.data?.message ||
          "Failed to load team members from server."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     LOAD DATA
  ========================================================= */

  useEffect(() => {
    fetchTeachers();
  }, []);

  /* =========================================================
     INPUT CHANGE
  ========================================================= */

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     IMAGE CHANGE
  ========================================================= */

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    /* ---------------------------------------------
       IMAGE TYPE
    --------------------------------------------- */

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(
        "Please select JPG, JPEG, PNG or WEBP image."
      );

      e.target.value = "";
      return;
    }

    /* ---------------------------------------------
       IMAGE SIZE
    --------------------------------------------- */

    if (file.size > 10 * 1024 * 1024) {
      alert(
        "Please select an image smaller than 10MB."
      );

      e.target.value = "";
      return;
    }

    /* ---------------------------------------------
       PREVIEW
    --------------------------------------------- */

    const reader = new FileReader();

    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: reader.result,
      }));
    };

    reader.readAsDataURL(file);

    e.target.value = "";
  };

  /* =========================================================
     REMOVE IMAGE
  ========================================================= */

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      imageFile: null,
      imagePreview: "",
    }));
  };

  /* =========================================================
     RESET FORM
  ========================================================= */

  const handleReset = () => {
    setFormData({
      ...EMPTY_FORM,
    });

    setEditingId(null);
  };

  /* =========================================================
     CREATE / UPDATE TEACHER
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* ---------------------------------------------
       VALIDATION
    --------------------------------------------- */

    if (!formData.name.trim()) {
      alert("Please enter teacher name.");
      return;
    }

    if (!formData.designation.trim()) {
      alert("Please enter designation.");
      return;
    }

    try {
      setSubmitting(true);

      const data = new FormData();

      /* ---------------------------------------------
         BASIC INFORMATION
      --------------------------------------------- */

      data.append(
        "name",
        formData.name.trim()
      );

      data.append(
        "designation",
        formData.designation.trim()
      );

      data.append(
        "email",
        formData.email.trim()
      );

      data.append(
        "phone",
        formData.phone.trim()
      );

      data.append(
        "role",
        formData.role
      );

      data.append(
        "status",
        formData.status
      );

      data.append(
        "bio",
        formData.bio.trim()
      );

      /* ---------------------------------------------
         SOCIAL LINKS
      --------------------------------------------- */

      data.append(
        "fb",
        formData.fb.trim()
      );

      data.append(
        "linkedin",
        formData.linkedin.trim()
      );

      data.append(
        "twitter",
        formData.twitter.trim()
      );

      data.append(
        "instagram",
        formData.instagram.trim()
      );

      /* ---------------------------------------------
         IMAGE

         IMPORTANT:
         Backend uses:

         upload.single("image")

         Therefore:

         data.append("image", formData.imageFile)
      --------------------------------------------- */

      if (formData.imageFile) {
        data.append(
          "image",
          formData.imageFile
        );
      }

      /* ---------------------------------------------
         DEBUG FORMDATA
      --------------------------------------------- */

      console.log(
        "================================="
      );

      console.log(
        editingId
          ? "UPDATING TEACHER"
          : "CREATING TEACHER"
      );

      console.log(
        "Image selected:",
        formData.imageFile
          ? formData.imageFile.name
          : "No new image"
      );

      for (const [key, value] of data.entries()) {
        console.log(
          key,
          value instanceof File
            ? {
                name: value.name,
                type: value.type,
                size: value.size,
              }
            : value
        );
      }

      console.log(
        "================================="
      );

      let response;

      /* =====================================================
         UPDATE
      ===================================================== */

      if (editingId) {
        response = await API.put(
          `/teachers/${editingId}`,
          data
        );

        console.log(
          "UPDATE TEACHER RESPONSE:",
          response.data
        );

        if (response.data?.success) {
          alert(
            "Team member updated successfully."
          );

          await fetchTeachers();

          handleReset();
        } else {
          alert(
            response.data?.message ||
              "Teacher update failed."
          );
        }
      }

      /* =====================================================
         CREATE
      ===================================================== */

      else {
        response = await API.post(
          "/teachers",
          data
        );

        console.log(
          "CREATE TEACHER RESPONSE:",
          response.data
        );

        if (response.data?.success) {
          alert(
            "Team member added successfully."
          );

          await fetchTeachers();

          handleReset();

          setCurrentPage(1);
        } else {
          alert(
            response.data?.message ||
              "Teacher creation failed."
          );
        }
      }
    } catch (error) {
      console.error(
        "================================="
      );

      console.error(
        "TEACHER SUBMISSION ERROR:",
        error
      );

      if (error.response) {
        console.error(
          "Status:",
          error.response.status
        );

        console.error(
          "Response:",
          error.response.data
        );
      }

      console.error(
        "================================="
      );

      alert(
        error.response?.data?.message ||
          "Failed to save team member."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* =========================================================
     EDIT TEACHER
  ========================================================= */

  const handleEdit = (teacher) => {
    if (!teacher?._id) {
      return;
    }

    console.log(
      "EDIT TEACHER:",
      teacher
    );

    console.log(
      "TEACHER IMAGE:",
      teacher.image
    );

    console.log(
      "TEACHER IMAGE URL:",
      getImageUrl(teacher.image)
    );

    setEditingId(teacher._id);

    setFormData({
      name: teacher.name || "",

      designation:
        teacher.designation || "",

      email: teacher.email || "",

      phone: teacher.phone || "",

      role:
        teacher.role || "Teacher",

      status:
        teacher.status || "Active",

      bio: teacher.bio || "",

      fb: teacher.fb || "",

      linkedin:
        teacher.linkedin || "",

      twitter:
        teacher.twitter || "",

      instagram:
        teacher.instagram || "",

      /*
        Important:
        Existing image is NOT a File.

        It is only used for preview.
      */

      imageFile: null,

      imagePreview:
        getImageUrl(teacher.image),
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     DELETE TEACHER
  ========================================================= */

  const handleDelete = async (id) => {
    if (!id) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this team member?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      const response =
        await API.delete(
          `/teachers/${id}`
        );

      console.log(
        "DELETE TEACHER RESPONSE:",
        response.data
      );

      if (response.data?.success) {
        alert(
          "Team member deleted successfully."
        );

        await fetchTeachers();

        setCurrentPage(1);

        /*
          If deleted teacher was being edited,
          reset the form.
        */

        if (editingId === id) {
          handleReset();
        }
      } else {
        alert(
          response.data?.message ||
            "Teacher deletion failed."
        );
      }
    } catch (error) {
      console.error(
        "Delete Teacher Error:",
        error
      );

      if (error.response) {
        console.error(
          "Delete Status:",
          error.response.status
        );

        console.error(
          "Delete Response:",
          error.response.data
        );
      }

      alert(
        error.response?.data?.message ||
          "Failed to delete team member."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     ADD NEW
  ========================================================= */

  const handleAddNew = () => {
    handleReset();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     SEARCH
  ========================================================= */

  const filteredTeachers =
    teachers.filter((teacher) => {
      const search =
        searchTerm
          .toLowerCase()
          .trim();

      if (!search) {
        return true;
      }

      return (
        (teacher.name || "")
          .toLowerCase()
          .includes(search) ||

        (teacher.designation || "")
          .toLowerCase()
          .includes(search) ||

        (teacher.email || "")
          .toLowerCase()
          .includes(search) ||

        (teacher.phone || "")
          .toLowerCase()
          .includes(search) ||

        (teacher.role || "")
          .toLowerCase()
          .includes(search) ||

        (teacher.status || "")
          .toLowerCase()
          .includes(search)
      );
    });

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages =
    Math.ceil(
      filteredTeachers.length /
        itemsPerPage
    ) || 1;

  const startIndex =
    (currentPage - 1) *
    itemsPerPage;

  const currentTableData =
    filteredTeachers.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  /* =========================================================
     PAGE VALIDATION
  ========================================================= */

  useEffect(() => {
    if (
      currentPage > totalPages
    ) {
      setCurrentPage(totalPages);
    }
  }, [
    currentPage,
    totalPages,
  ]);

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="TeacherPost">
      <div className="TeacherPost-wrapper">

        {/* =================================================
            FORM CARD
        ================================================= */}

        <div className="TeacherPost-form-card">

          {/* HEADER */}

          <div className="TeacherPost-form-header">

            <div className="TeacherPost-header-icon">
              <FaUserPlus />
            </div>

            <div>
              <h2>
                {editingId
                  ? "Edit Team Member"
                  : "Add Team Member"}
              </h2>

              <p>
                {editingId
                  ? "Update team member information"
                  : "Fill in the details to add a new team member"}
              </p>
            </div>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="TeacherPost-form"
          >

            {/* =================================================
                PROFILE IMAGE
            ================================================= */}

            <div className="TeacherPost-profile-image-section">

              <div className="TeacherPost-profile-image-heading">

                <div className="TeacherPost-profile-image-title">
                  <FaUser />
                  <span>
                    Profile Photo
                  </span>
                </div>

                <span className="TeacherPost-profile-image-required">
                  Recommended
                </span>

              </div>

              <div className="TeacherPost-profile-upload-card">

                {/* PREVIEW */}

                <div className="TeacherPost-profile-preview-wrapper">

                  <div className="TeacherPost-profile-preview">

                    {formData.imagePreview ? (
                      <img
                        src={
                          formData.imagePreview
                        }
                        alt="Profile Preview"
                        className="TeacherPost-profile-preview-img"
                        onError={(e) => {
                          console.error(
                            "PROFILE IMAGE LOAD ERROR:",
                            formData.imagePreview
                          );

                          e.currentTarget.style.display =
                            "none";
                        }}
                      />
                    ) : (
                      <div className="TeacherPost-profile-placeholder">

                        {formData.name ? (
                          formData.name
                            .charAt(0)
                            .toUpperCase()
                        ) : (
                          <FaUser />
                        )}

                      </div>
                    )}

                  </div>

                  <label className="TeacherPost-profile-camera">

                    <FaCamera />

                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      onChange={
                        handleImageChange
                      }
                    />

                  </label>

                </div>

                {/* UPLOAD CONTENT */}

                <div className="TeacherPost-profile-upload-content">

                  <h4>
                    Upload profile photo
                  </h4>

                  <p>
                    Add a professional profile
                    photo for this team member.
                  </p>

                  <div className="TeacherPost-profile-upload-actions">

                    <label className="TeacherPost-profile-upload-btn">

                      <FaUpload />

                      {formData.imagePreview
                        ? "Change Photo"
                        : "Upload Photo"}

                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/webp"
                        onChange={
                          handleImageChange
                        }
                      />

                    </label>

                    {formData.imagePreview && (
                      <button
                        type="button"
                        className="TeacherPost-profile-remove-btn"
                        onClick={
                          handleRemoveImage
                        }
                      >
                        <FaTimes />
                        Remove
                      </button>
                    )}

                  </div>

                  {formData.imageFile && (
                    <div className="TeacherPost-selected-file">

                      <FaCheckCircle />

                      <span>
                        {
                          formData
                            .imageFile
                            .name
                        }
                      </span>

                    </div>
                  )}

                  <span className="TeacherPost-profile-upload-hint">
                    JPG, PNG or WEBP · Maximum
                    10MB
                  </span>

                </div>

              </div>

            </div>

            {/* =================================================
                NAME + DESIGNATION
            ================================================= */}

            <div className="TeacherPost-form-row">

              <div className="TeacherPost-form-group">

                <label>
                  Name <span>*</span>
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={
                    formData.name
                  }
                  onChange={
                    handleInputChange
                  }
                  required
                />

              </div>

              <div className="TeacherPost-form-group">

                <label>
                  Designation{" "}
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="designation"
                  placeholder="Enter designation"
                  value={
                    formData.designation
                  }
                  onChange={
                    handleInputChange
                  }
                  required
                />

              </div>

            </div>

            {/* =================================================
                EMAIL + PHONE
            ================================================= */}

            <div className="TeacherPost-form-row">

              <div className="TeacherPost-form-group">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={
                    formData.email
                  }
                  onChange={
                    handleInputChange
                  }
                />

              </div>

              <div className="TeacherPost-form-group">

                <label>
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  value={
                    formData.phone
                  }
                  onChange={
                    handleInputChange
                  }
                />

              </div>

            </div>

            {/* =================================================
                ROLE + STATUS
            ================================================= */}

            <div className="TeacherPost-form-row">

              <div className="TeacherPost-form-group">

                <label>
                  Role
                </label>

                <select
                  name="role"
                  value={
                    formData.role
                  }
                  onChange={
                    handleInputChange
                  }
                >
                  <option value="Teacher">
                    Teacher
                  </option>

                  <option value="Senior Educator">
                    Senior Educator
                  </option>

                  <option value="Coordinator">
                    Coordinator
                  </option>

                  <option value="Assistant">
                    Assistant
                  </option>
                </select>

              </div>

              <div className="TeacherPost-form-group">

                <label>
                  Status
                </label>

                <select
                  name="status"
                  value={
                    formData.status
                  }
                  onChange={
                    handleInputChange
                  }
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>
                </select>

              </div>

            </div>

            {/* =================================================
                BIO
            ================================================= */}

            <div className="TeacherPost-form-group">

              <label>
                Short Bio
              </label>

              <textarea
                name="bio"
                rows="4"
                placeholder="Write a short bio about the team member..."
                value={
                  formData.bio
                }
                onChange={
                  handleInputChange
                }
              />

            </div>

            {/* =================================================
                SOCIAL MEDIA
            ================================================= */}

            <div className="TeacherPost-social-section">

              <div className="TeacherPost-social-heading">

                <div>

                  <strong>
                    Social Media Links
                  </strong>

                  <span>
                    Add profile links for this
                    team member
                  </span>

                </div>

              </div>

              <div className="TeacherPost-social-grid">

                {/* FACEBOOK */}

                <div className="TeacherPost-social-input facebook">

                  <FaFacebookF className="social-icon" />

                  <input
                    type="text"
                    name="fb"
                    placeholder="Facebook URL"
                    value={
                      formData.fb
                    }
                    onChange={
                      handleInputChange
                    }
                  />

                </div>

                {/* LINKEDIN */}

                <div className="TeacherPost-social-input linkedin">

                  <FaLinkedinIn className="social-icon" />

                  <input
                    type="text"
                    name="linkedin"
                    placeholder="LinkedIn URL"
                    value={
                      formData.linkedin
                    }
                    onChange={
                      handleInputChange
                    }
                  />

                </div>

                {/* TWITTER */}

                <div className="TeacherPost-social-input twitter">

                  <FaTwitter className="social-icon" />

                  <input
                    type="text"
                    name="twitter"
                    placeholder="Twitter URL"
                    value={
                      formData.twitter
                    }
                    onChange={
                      handleInputChange
                    }
                  />

                </div>

                {/* INSTAGRAM */}

                <div className="TeacherPost-social-input instagram">

                  <FaInstagram className="social-icon" />

                  <input
                    type="text"
                    name="instagram"
                    placeholder="Instagram URL"
                    value={
                      formData.instagram
                    }
                    onChange={
                      handleInputChange
                    }
                  />

                </div>

              </div>

            </div>

            {/* =================================================
                ACTION BUTTONS
            ================================================= */}

            <div className="TeacherPost-form-actions">

              <button
                type="button"
                className="TeacherPost-btn-reset"
                onClick={
                  handleReset
                }
                disabled={
                  submitting
                }
              >
                <FaUndo />
                Reset
              </button>

              <button
                type="submit"
                className="TeacherPost-btn-save"
                disabled={
                  submitting
                }
              >

                {submitting ? (
                  <FaSpinner className="fa-spin" />
                ) : (
                  <FaSave />
                )}

                {submitting
                  ? editingId
                    ? "Updating..."
                    : "Saving..."
                  : editingId
                  ? "Update Member"
                  : "Save Member"}

              </button>

            </div>

          </form>

        </div>

        {/* =================================================
            LIST CARD
        ================================================= */}

        <div className="TeacherPost-list-card">

          {/* LIST HEADER */}

          <div className="TeacherPost-list-header">

            <div className="TeacherPost-list-title-wrap">

              <div className="TeacherPost-header-icon sm">
                <FaUser />
              </div>

              <div>

                <h2>
                  Team Members List
                </h2>

                <p>
                  View and manage all team
                  members
                </p>

              </div>

            </div>

            <div className="TeacherPost-top-controls">

              {/* SEARCH */}

              <div className="TeacherPost-search-box">

                <FaSearch />

                <input
                  type="text"
                  placeholder="Search by name, designation..."
                  value={
                    searchTerm
                  }
                  onChange={(e) => {
                    setSearchTerm(
                      e.target.value
                    );

                    setCurrentPage(1);
                  }}
                />

              </div>

              {/* ADD NEW */}

              <button
                type="button"
                className="TeacherPost-add-top-btn"
                onClick={
                  handleAddNew
                }
              >
                <FaUserPlus />
                Add New
              </button>

            </div>

          </div>

          {/* =================================================
              TABLE
          ================================================= */}

          <div className="TeacherPost-table-container">

            <table className="TeacherPost-table">

              <thead>

                <tr>
                  <th>#</th>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Social Links</th>
                  <th className="text-right">
                    Action
                  </th>
                </tr>

              </thead>

              <tbody>

                {/* LOADING */}

                {loading ? (
                  <tr>

                    <td
                      colSpan="8"
                      className="TeacherPost-no-data"
                    >

                      <FaSpinner className="fa-spin" />

                      <span>
                        Loading team members...
                      </span>

                    </td>

                  </tr>
                ) : currentTableData.length >
                  0 ? (

                  /* DATA */

                  currentTableData.map(
                    (teacher, index) => {

                      const teacherImage =
                        getImageUrl(
                          teacher.image
                        );

                      return (
                        <tr
                          key={
                            teacher._id
                          }
                        >

                          {/* NUMBER */}

                          <td className="font-medium">
                            {startIndex +
                              index +
                              1}
                          </td>

                          {/* PROFILE */}

                          <td>

                            <div className="TeacherPost-table-avatar">

                              {teacherImage ? (
                                <img
                                  src={
                                    teacherImage
                                  }
                                  alt={
                                    teacher.name ||
                                    "Teacher"
                                  }
                                  className="TeacherPost-table-avatar-img"
                                  onError={(
                                    e
                                  ) => {

                                    console.error(
                                      "TABLE IMAGE LOAD ERROR:",
                                      teacherImage
                                    );

                                    e.currentTarget.style.display =
                                      "none";

                                    const fallback =
                                      e.currentTarget
                                        .parentElement
                                        ?.querySelector(
                                          ".TeacherPost-table-avatar-fallback"
                                        );

                                    if (
                                      fallback
                                    ) {
                                      fallback.style.display =
                                        "flex";
                                    }

                                  }}
                                />
                              ) : null}

                              <div
                                className="TeacherPost-table-avatar-fallback"
                                style={{
                                  display:
                                    teacherImage
                                      ? "none"
                                      : "flex",
                                }}
                              >

                                {teacher.name
                                  ?.charAt(
                                    0
                                  )
                                  ?.toUpperCase() || (
                                  <FaUser />
                                )}

                              </div>

                            </div>

                          </td>

                          {/* NAME */}

                          <td>

                            <div className="TeacherPost-table-name">
                              {teacher.name ||
                                "N/A"}
                            </div>

                            <div className="TeacherPost-table-sub">
                              {teacher.email ||
                                "No email"}
                            </div>

                          </td>

                          {/* DESIGNATION */}

                          <td>

                            <span className="TeacherPost-designation-badge">
                              {teacher.designation ||
                                "N/A"}
                            </span>

                          </td>

                          {/* ROLE */}

                          <td>

                            <span className="TeacherPost-role-pill">
                              {teacher.role ||
                                "Teacher"}
                            </span>

                          </td>

                          {/* STATUS */}

                          <td>

                            <span
                              className={`TeacherPost-status-tag ${
                                teacher.status ===
                                "Active"
                                  ? "active"
                                  : "inactive"
                              }`}
                            >

                              <span className="status-dot"></span>

                              {teacher.status ||
                                "Inactive"}

                            </span>

                          </td>

                          {/* SOCIAL */}

                          <td>

                            <div className="TeacherPost-table-socials">

                              {/* FACEBOOK */}

                              <a
                                href={
                                  teacher.fb ||
                                  "#"
                                }
                                target="_blank"
                                rel="noreferrer"
                                title="Facebook"
                                className={
                                  teacher.fb
                                    ? "available"
                                    : ""
                                }
                                onClick={(
                                  e
                                ) => {
                                  if (
                                    !teacher.fb
                                  ) {
                                    e.preventDefault();
                                  }
                                }}
                              >
                                <FaFacebookF />
                              </a>

                              {/* LINKEDIN */}

                              <a
                                href={
                                  teacher.linkedin ||
                                  "#"
                                }
                                target="_blank"
                                rel="noreferrer"
                                title="LinkedIn"
                                className={
                                  teacher.linkedin
                                    ? "available"
                                    : ""
                                }
                                onClick={(
                                  e
                                ) => {
                                  if (
                                    !teacher.linkedin
                                  ) {
                                    e.preventDefault();
                                  }
                                }}
                              >
                                <FaLinkedinIn />
                              </a>

                              {/* TWITTER */}

                              <a
                                href={
                                  teacher.twitter ||
                                  "#"
                                }
                                target="_blank"
                                rel="noreferrer"
                                title="Twitter"
                                className={
                                  teacher.twitter
                                    ? "available"
                                    : ""
                                }
                                onClick={(
                                  e
                                ) => {
                                  if (
                                    !teacher.twitter
                                  ) {
                                    e.preventDefault();
                                  }
                                }}
                              >
                                <FaTwitter />
                              </a>

                              {/* INSTAGRAM */}

                              <a
                                href={
                                  teacher.instagram ||
                                  "#"
                                }
                                target="_blank"
                                rel="noreferrer"
                                title="Instagram"
                                className={
                                  teacher.instagram
                                    ? "available"
                                    : ""
                                }
                                onClick={(
                                  e
                                ) => {
                                  if (
                                    !teacher.instagram
                                  ) {
                                    e.preventDefault();
                                  }
                                }}
                              >
                                <FaInstagram />
                              </a>

                            </div>

                          </td>

                          {/* ACTIONS */}

                          <td className="text-right">

                            <div className="TeacherPost-action-group">

                              <button
                                type="button"
                                className="TeacherPost-action-btn edit"
                                onClick={() =>
                                  handleEdit(
                                    teacher
                                  )
                                }
                                title="Edit Member"
                              >
                                <FaEdit />
                              </button>

                              <button
                                type="button"
                                className="TeacherPost-action-btn delete"
                                onClick={() =>
                                  handleDelete(
                                    teacher._id
                                  )
                                }
                                title="Delete Member"
                              >
                                <FaTrashAlt />
                              </button>

                            </div>

                          </td>

                        </tr>
                      );
                    }
                  )

                ) : (

                  /* NO DATA */

                  <tr>

                    <td
                      colSpan="8"
                      className="TeacherPost-no-data"
                    >

                      <FaImage />

                      <span>
                        No team members found
                        matching your search.
                      </span>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

          {/* =================================================
              PAGINATION
          ================================================= */}

          <div className="TeacherPost-pagination-footer">

            <div className="TeacherPost-pagination-info">

              Showing{" "}

              {filteredTeachers.length >
              0
                ? startIndex + 1
                : 0}

              {" "}to{" "}

              {Math.min(
                startIndex +
                  itemsPerPage,
                filteredTeachers.length
              )}

              {" "}of{" "}

              {filteredTeachers.length}

              {" "}entries

            </div>

            <div className="TeacherPost-pagination-buttons">

              {/* PREVIOUS */}

              <button
                type="button"
                className="TeacherPost-page-btn"
                onClick={() =>
                  setCurrentPage(
                    (page) =>
                      Math.max(
                        page - 1,
                        1
                      )
                  )
                }
                disabled={
                  currentPage === 1
                }
              >
                <FaChevronLeft />
              </button>

              {/* PAGE NUMBERS */}

              {Array.from(
                {
                  length: totalPages,
                },
                (_, i) => i + 1
              ).map((page) => (

                <button
                  type="button"
                  key={page}
                  className={`TeacherPost-page-number ${
                    currentPage === page
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setCurrentPage(
                      page
                    )
                  }
                >
                  {page}
                </button>

              ))}

              {/* NEXT */}

              <button
                type="button"
                className="TeacherPost-page-btn"
                onClick={() =>
                  setCurrentPage(
                    (page) =>
                      Math.min(
                        page + 1,
                        totalPages
                      )
                  )
                }
                disabled={
                  currentPage ===
                  totalPages
                }
              >
                <FaChevronRight />
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default TeacherPost;