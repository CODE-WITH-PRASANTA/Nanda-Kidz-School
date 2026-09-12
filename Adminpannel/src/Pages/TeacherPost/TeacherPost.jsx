import React, { useEffect, useState } from "react";
import "./TeacherPost.css";

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
  FaImage,
} from "react-icons/fa";

/* =========================================================
   INITIAL DATA
========================================================= */

const initialTeachers = [
  {
    id: 1,
    name: "Glims Bond",
    designation: "Music Teacher",
    role: "Teacher",
    status: "Active",
    email: "glims.bond@school.com",
    phone: "+91 98765 43210",
    bio: "Passionate music educator specializing in vocal and rhythm training for early learners.",
    fb: "#",
    linkedin: "#",
    twitter: "#",
    instagram: "#",
    image: null,
  },
  {
    id: 2,
    name: "Sherlock Bin",
    designation: "Art Teacher",
    role: "Teacher",
    status: "Active",
    email: "sherlock.bin@school.com",
    phone: "+91 98765 43211",
    bio: "Focuses on developing creative imagination through drawing and clay craft.",
    fb: "#",
    linkedin: "#",
    twitter: "#",
    instagram: "#",
    image: null,
  },
  {
    id: 3,
    name: "Priestly Herbart",
    designation: "Math Teacher",
    role: "Teacher",
    status: "Active",
    email: "priestly.h@school.com",
    phone: "+91 98765 43212",
    bio: "Makes early arithmetic fun and interactive using logic puzzles and blocks.",
    fb: "#",
    linkedin: "#",
    twitter: "#",
    instagram: "#",
    image: null,
  },
  {
    id: 4,
    name: "Smith Broke",
    designation: "English Teacher",
    role: "Teacher",
    status: "Inactive",
    email: "smith.broke@school.com",
    phone: "+91 98765 43213",
    bio: "Specializes in phonics, storytelling, and communicative language skills.",
    fb: "#",
    linkedin: "#",
    twitter: "#",
    instagram: "#",
    image: null,
  },
  {
    id: 5,
    name: "David Miller",
    designation: "Science Teacher",
    role: "Teacher",
    status: "Active",
    email: "david.miller@school.com",
    phone: "+91 98765 43214",
    bio: "Encourages inquiry-based experiential learning and nature exploration.",
    fb: "#",
    linkedin: "#",
    twitter: "#",
    instagram: "#",
    image: null,
  },
];

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
  imageName: "",
  imageFile: null,
  imagePreview: "",
};

/* =========================================================
   COMPONENT
========================================================= */

const TeacherPost = () => {
  const [teachers, setTeachers] = useState(initialTeachers);

  const [searchTerm, setSearchTerm] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState(EMPTY_FORM);

  const itemsPerPage = 4;

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
     IMAGE UPLOAD
  ========================================================= */

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    /* File size validation */
    if (file.size > 2 * 1024 * 1024) {
      alert("Please select an image smaller than 2MB.");
      e.target.value = "";
      return;
    }

    /* Image type validation */
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      e.target.value = "";
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setFormData((prev) => ({
      ...prev,
      imageFile: file,
      imageName: file.name,
      imagePreview: previewUrl,
    }));
  };

  /* =========================================================
     REMOVE IMAGE
  ========================================================= */

  const handleRemoveImage = () => {
    if (formData.imagePreview && formData.imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(formData.imagePreview);
    }

    setFormData((prev) => ({
      ...prev,
      imageFile: null,
      imageName: "",
      imagePreview: "",
    }));
  };

  /* =========================================================
     RESET
  ========================================================= */

  const handleReset = () => {
    setFormData({ ...EMPTY_FORM });
    setEditingId(null);
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.designation.trim()) {
      alert("Please fill in required fields: Name and Designation.");
      return;
    }

    const dataToSave = {
      name: formData.name,
      designation: formData.designation,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      status: formData.status,
      bio: formData.bio,
      fb: formData.fb,
      linkedin: formData.linkedin,
      twitter: formData.twitter,
      instagram: formData.instagram,
      image: formData.imagePreview || null,
      imageName: formData.imageName,
    };

    if (editingId !== null) {
      setTeachers((prev) =>
        prev.map((teacher) =>
          teacher.id === editingId
            ? {
                ...teacher,
                ...dataToSave,
              }
            : teacher
        )
      );

      alert("Team member updated successfully.");
    } else {
      const newTeacher = {
        id: Date.now(),
        ...dataToSave,
      };

      setTeachers((prev) => [newTeacher, ...prev]);

      alert("Team member added successfully.");
    }

    handleReset();
    setCurrentPage(1);
  };

  /* =========================================================
     EDIT
  ========================================================= */

  const handleEdit = (teacher) => {
    setEditingId(teacher.id);

    setFormData({
      name: teacher.name || "",
      designation: teacher.designation || "",
      email: teacher.email || "",
      phone: teacher.phone || "",
      role: teacher.role || "Teacher",
      status: teacher.status || "Active",
      bio: teacher.bio || "",
      fb: teacher.fb || "",
      linkedin: teacher.linkedin || "",
      twitter: teacher.twitter || "",
      instagram: teacher.instagram || "",
      imageName: teacher.imageName || "",
      imageFile: null,
      imagePreview: teacher.image || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this team member?"
    );

    if (!confirmDelete) return;

    setTeachers((prev) => prev.filter((teacher) => teacher.id !== id));

    setCurrentPage(1);
  };

  /* =========================================================
     SEARCH
  ========================================================= */

  const filteredTeachers = teachers.filter((teacher) => {
    const search = searchTerm.toLowerCase();

    return (
      teacher.name.toLowerCase().includes(search) ||
      teacher.designation.toLowerCase().includes(search) ||
      teacher.email.toLowerCase().includes(search) ||
      teacher.role.toLowerCase().includes(search)
    );
  });

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages =
    Math.ceil(filteredTeachers.length / itemsPerPage) || 1;

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentTableData = filteredTeachers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  /* =========================================================
     KEEP PAGE VALID
  ========================================================= */

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  /* =========================================================
     SCROLL TO FORM
  ========================================================= */

  const handleAddNew = () => {
    handleReset();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="TeacherPost">

      <div className="TeacherPost-wrapper">

        {/* =====================================================
            FORM CARD
        ===================================================== */}

        <div className="TeacherPost-form-card">

          {/* Header */}

          <div className="TeacherPost-form-header">

            <div className="TeacherPost-header-icon">
              <FaUserPlus />
            </div>

            <div>
              <h2>
                {editingId !== null
                  ? "Edit Team Member"
                  : "Add Team Member"}
              </h2>

              <p>
                {editingId !== null
                  ? "Update team member information"
                  : "Fill in the details to add a new team member"}
              </p>
            </div>

          </div>

          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="TeacherPost-form"
          >

            {/* =================================================
                PROFILE IMAGE SECTION
            ================================================= */}

            <div className="TeacherPost-profile-image-section">

              <div className="TeacherPost-profile-image-heading">

                <div className="TeacherPost-profile-image-title">
                  <FaUser />
                  <span>Profile Photo</span>
                </div>

                <span className="TeacherPost-profile-image-required">
                  Recommended
                </span>

              </div>

              <div className="TeacherPost-profile-upload-card">

                {/* Preview */}

                <div className="TeacherPost-profile-preview-wrapper">

                  <div className="TeacherPost-profile-preview">

                    {formData.imagePreview ? (
                      <img
                        src={formData.imagePreview}
                        alt="Profile Preview"
                        className="TeacherPost-profile-preview-img"
                      />
                    ) : (
                      <div className="TeacherPost-profile-placeholder">
                        {formData.name ? (
                          formData.name.charAt(0).toUpperCase()
                        ) : (
                          <FaUser />
                        )}
                      </div>
                    )}

                  </div>

                  {/* Camera */}

                  <label className="TeacherPost-profile-camera">

                    <FaCamera />

                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      onChange={handleImageChange}
                    />

                  </label>

                </div>

                {/* Upload Information */}

                <div className="TeacherPost-profile-upload-content">

                  <h4>
                    Upload profile photo
                  </h4>

                  <p>
                    Add a professional profile photo for this
                    team member.
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
                        onChange={handleImageChange}
                      />

                    </label>

                    {formData.imagePreview && (
                      <button
                        type="button"
                        className="TeacherPost-profile-remove-btn"
                        onClick={handleRemoveImage}
                      >
                        <FaTimes />
                        Remove
                      </button>
                    )}

                  </div>

                  {formData.imageName && (
                    <div className="TeacherPost-selected-file">

                      <FaCheckCircle />

                      <span title={formData.imageName}>
                        {formData.imageName}
                      </span>

                    </div>
                  )}

                  <span className="TeacherPost-profile-upload-hint">
                    JPG, PNG or WEBP · Maximum 2MB ·
                    Recommended 400 × 400px
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
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />

              </div>

              <div className="TeacherPost-form-group">

                <label>
                  Designation <span>*</span>
                </label>

                <input
                  type="text"
                  name="designation"
                  placeholder="Enter designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  required
                />

              </div>

            </div>

            {/* =================================================
                EMAIL + PHONE
            ================================================= */}

            <div className="TeacherPost-form-row">

              <div className="TeacherPost-form-group">

                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleInputChange}
                />

              </div>

              <div className="TeacherPost-form-group">

                <label>Phone</label>

                <input
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />

              </div>

            </div>

            {/* =================================================
                ROLE + STATUS
            ================================================= */}

            <div className="TeacherPost-form-row">

              <div className="TeacherPost-form-group">

                <label>Role</label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
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

                <label>Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
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
                value={formData.bio}
                onChange={handleInputChange}
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
                    Add profile links for this team member
                  </span>
                </div>

              </div>

              <div className="TeacherPost-social-grid">

                {/* Facebook */}

                <div className="TeacherPost-social-input facebook">

                  <FaFacebookF className="social-icon" />

                  <input
                    type="text"
                    name="fb"
                    placeholder="Facebook URL"
                    value={formData.fb}
                    onChange={handleInputChange}
                  />

                </div>

                {/* LinkedIn */}

                <div className="TeacherPost-social-input linkedin">

                  <FaLinkedinIn className="social-icon" />

                  <input
                    type="text"
                    name="linkedin"
                    placeholder="LinkedIn URL"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                  />

                </div>

                {/* Twitter */}

                <div className="TeacherPost-social-input twitter">

                  <FaTwitter className="social-icon" />

                  <input
                    type="text"
                    name="twitter"
                    placeholder="Twitter URL"
                    value={formData.twitter}
                    onChange={handleInputChange}
                  />

                </div>

                {/* Instagram */}

                <div className="TeacherPost-social-input instagram">

                  <FaInstagram className="social-icon" />

                  <input
                    type="text"
                    name="instagram"
                    placeholder="Instagram URL"
                    value={formData.instagram}
                    onChange={handleInputChange}
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
                onClick={handleReset}
              >
                <FaUndo />
                Reset
              </button>

              <button
                type="submit"
                className="TeacherPost-btn-save"
              >
                <FaSave />

                {editingId !== null
                  ? "Update Member"
                  : "Save Member"}
              </button>

            </div>

          </form>

        </div>

        {/* =====================================================
            LIST CARD
        ===================================================== */}

        <div className="TeacherPost-list-card">

          {/* List Header */}

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
                  View and manage all team members
                </p>
              </div>

            </div>

            <div className="TeacherPost-top-controls">

              {/* Search */}

              <div className="TeacherPost-search-box">

                <FaSearch />

                <input
                  type="text"
                  placeholder="Search by name, designation..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />

              </div>

              {/* Add */}

              <button
                type="button"
                className="TeacherPost-add-top-btn"
                onClick={handleAddNew}
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

                {currentTableData.length > 0 ? (
                  currentTableData.map((teacher, index) => (

                    <tr key={teacher.id}>

                      <td className="font-medium">
                        {startIndex + index + 1}
                      </td>

                      {/* Profile */}

                      <td>

                        <div className="TeacherPost-table-avatar">

                          {teacher.image ? (
                            <img
                              src={teacher.image}
                              alt={teacher.name}
                            />
                          ) : (
                            teacher.name
                              .charAt(0)
                              .toUpperCase()
                          )}

                        </div>

                      </td>

                      {/* Name */}

                      <td>

                        <div className="TeacherPost-table-name">
                          {teacher.name}
                        </div>

                        <div className="TeacherPost-table-sub">
                          {teacher.email || "No email"}
                        </div>

                      </td>

                      {/* Designation */}

                      <td>

                        <span className="TeacherPost-designation-badge">
                          {teacher.designation}
                        </span>

                      </td>

                      {/* Role */}

                      <td>

                        <span className="TeacherPost-role-pill">
                          {teacher.role}
                        </span>

                      </td>

                      {/* Status */}

                      <td>

                        <span
                          className={`TeacherPost-status-tag ${
                            teacher.status === "Active"
                              ? "active"
                              : "inactive"
                          }`}
                        >
                          <span className="status-dot"></span>

                          {teacher.status}

                        </span>

                      </td>

                      {/* Social */}

                      <td>

                        <div className="TeacherPost-table-socials">

                          <a
                            href={teacher.fb || "#"}
                            target="_blank"
                            rel="noreferrer"
                            title="Facebook"
                            className={
                              teacher.fb && teacher.fb !== "#"
                                ? "available"
                                : ""
                            }
                          >
                            <FaFacebookF />
                          </a>

                          <a
                            href={teacher.linkedin || "#"}
                            target="_blank"
                            rel="noreferrer"
                            title="LinkedIn"
                            className={
                              teacher.linkedin &&
                              teacher.linkedin !== "#"
                                ? "available"
                                : ""
                            }
                          >
                            <FaLinkedinIn />
                          </a>

                          <a
                            href={teacher.twitter || "#"}
                            target="_blank"
                            rel="noreferrer"
                            title="Twitter"
                            className={
                              teacher.twitter &&
                              teacher.twitter !== "#"
                                ? "available"
                                : ""
                            }
                          >
                            <FaTwitter />
                          </a>

                          <a
                            href={teacher.instagram || "#"}
                            target="_blank"
                            rel="noreferrer"
                            title="Instagram"
                            className={
                              teacher.instagram &&
                              teacher.instagram !== "#"
                                ? "available"
                                : ""
                            }
                          >
                            <FaInstagram />
                          </a>

                        </div>

                      </td>

                      {/* Actions */}

                      <td className="text-right">

                        <div className="TeacherPost-action-group">

                          <button
                            type="button"
                            className="TeacherPost-action-btn edit"
                            onClick={() => handleEdit(teacher)}
                            title="Edit Member"
                          >
                            <FaEdit />
                          </button>

                          <button
                            type="button"
                            className="TeacherPost-action-btn delete"
                            onClick={() =>
                              handleDelete(teacher.id)
                            }
                            title="Delete Member"
                          >
                            <FaTrashAlt />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))
                ) : (

                  <tr>

                    <td
                      colSpan="8"
                      className="TeacherPost-no-data"
                    >
                      <FaImage />

                      <span>
                        No team members found matching
                        your search.
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
              {filteredTeachers.length > 0
                ? startIndex + 1
                : 0}{" "}
              to{" "}
              {Math.min(
                startIndex + itemsPerPage,
                filteredTeachers.length
              )}{" "}
              of {filteredTeachers.length} entries

            </div>

            <div className="TeacherPost-pagination-buttons">

              <button
                type="button"
                className="TeacherPost-page-btn"
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.max(page - 1, 1)
                  )
                }
                disabled={currentPage === 1}
              >
                <FaChevronLeft />
              </button>

              {Array.from(
                { length: totalPages },
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
                    setCurrentPage(page)
                  }
                >
                  {page}
                </button>

              ))}

              <button
                type="button"
                className="TeacherPost-page-btn"
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(page + 1, totalPages)
                  )
                }
                disabled={
                  currentPage === totalPages
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