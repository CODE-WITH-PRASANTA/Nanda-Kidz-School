
import React, { useEffect, useMemo, useState } from "react";
import {
  FaUserCheck,
  FaSearch,
  FaFilter,
  FaDownload,
  FaSync,
  FaEdit,
  FaEye,
  FaTrashAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaCalendarAlt,
  FaUpload,
  FaTimes,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaEllipsisV,
  FaLock,
  FaEyeSlash,
  FaSave,
  FaPlus,
} from "react-icons/fa";

import API, { IMG_URL } from "../../api/axios";
import "./Teacherlist.css";

/* =========================================================
   EMPTY FORM
========================================================= */

const EMPTY_FORM = {
  id: null,
  name: "",
  phone: "",
  email: "",
  password: "",
  address: "",
  designation: "",
  experience: "",
  joiningDate: "",
  qualification: "",
  subject: "",
  gender: "",
  dob: "",
  bloodGroup: "",
  status: "Active",
  bio: "",
  skills: [],
  photo: "",
};

/* =========================================================
   IMAGE URL HELPER
========================================================= */

const getImageUrl = (photo) => {
  if (!photo) return "";

  if (
    photo.startsWith("http://") ||
    photo.startsWith("https://") ||
    photo.startsWith("blob:")
  ) {
    return photo;
  }

  return `${IMG_URL}${photo.startsWith("/") ? photo : `/${photo}`}`;
};

/* =========================================================
   DATE HELPERS
========================================================= */

const formatDateForInput = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value).slice(0, 10);
  }

  return date.toISOString().split("T")[0];
};

const formatDisplayDate = (value) => {
  if (!value) return "N/A";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/* =========================================================
   NORMALIZE API DATA
========================================================= */

const normalizeTeacher = (teacher) => {
  return {
    id: teacher._id || teacher.id,

    name: teacher.name || "",
    phone: teacher.phone || "",
    email: teacher.email || "",

    // Never display password received from API
    password: "",

    address: teacher.address || "",
    designation: teacher.designation || "",
    experience: teacher.experience || "",

    joiningDate: formatDateForInput(teacher.joiningDate),
    qualification: teacher.qualification || "",
    subject: teacher.subject || "",
    gender: teacher.gender || "",
    dob: formatDateForInput(teacher.dob),
    bloodGroup: teacher.bloodGroup || "",

    status: teacher.status || "Active",

    bio: teacher.bio || "",

    skills: Array.isArray(teacher.skills)
      ? teacher.skills
      : typeof teacher.skills === "string"
        ? teacher.skills
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [],

    photo: teacher.photo || "",
  };
};

/* =========================================================
   COMPONENT
========================================================= */

const TeacherList = () => {
  /* =======================================================
     MAIN STATES
  ======================================================= */

  const [activeTab, setActiveTab] = useState("list");

  const [teachers, setTeachers] = useState([]);

  const [formData, setFormData] = useState(EMPTY_FORM);

  const [searchTerm, setSearchTerm] = useState("");

  const [filterMode, setFilterMode] = useState("All");

  const [activeMenuId, setActiveMenuId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(5);

  /* =======================================================
     MODALS
  ======================================================= */

  const [viewModalTeacher, setViewModalTeacher] = useState(null);

  /* =======================================================
     PHOTO STATES
  ======================================================= */

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const [photoPreview, setPhotoPreview] = useState("");

  /* =======================================================
     SKILL STATES
  ======================================================= */

  const [tagInput, setTagInput] = useState("");

  /* =======================================================
     PASSWORD
  ======================================================= */

  const [showPassword, setShowPassword] = useState(false);

  /* =======================================================
     LOADING STATES
  ======================================================= */

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [deletingId, setDeletingId] = useState(null);

  const [statusUpdatingId, setStatusUpdatingId] = useState(null);

  /* =======================================================
     FETCH TEACHERS
  ======================================================= */

  const fetchTeachers = async () => {
    try {
      setLoading(true);

      const response = await API.get("/school-teachers");

      const responseData = response?.data;

      let teacherData = [];

      if (Array.isArray(responseData)) {
        teacherData = responseData;
      } else if (Array.isArray(responseData?.data)) {
        teacherData = responseData.data;
      } else if (Array.isArray(responseData?.teachers)) {
        teacherData = responseData.teachers;
      }

      setTeachers(teacherData.map(normalizeTeacher));
    } catch (error) {
      console.error("Fetch teachers error:", error);

      alert(
        error?.response?.data?.message ||
          "Unable to fetch teacher data."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     INITIAL FETCH
  ======================================================= */

  useEffect(() => {
    fetchTeachers();
  }, []);

  /* =======================================================
     INPUT CHANGE
  ======================================================= */

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked ? "Active" : "Inactive",
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =======================================================
     SKILL REMOVE
  ======================================================= */

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter(
        (skill) => skill !== skillToRemove
      ),
    }));
  };

  /* =======================================================
     ADD SKILL
  ======================================================= */

  const handleAddSkillKey = (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const skill = tagInput.trim();

    if (!skill) return;

    if (
      !formData.skills.some(
        (item) => item.toLowerCase() === skill.toLowerCase()
      )
    ) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
    }

    setTagInput("");
  };

  /* =======================================================
     IMAGE UPLOAD
  ======================================================= */

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Image size must be less than 10MB.");
      return;
    }

    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }

    const previewUrl = URL.createObjectURL(file);

    setSelectedPhoto(file);

    setPhotoPreview(previewUrl);
  };

  /* =======================================================
     RESET FORM
  ======================================================= */

  const handleResetForm = () => {
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }

    setFormData({
      ...EMPTY_FORM,
      skills: [],
    });

    setSelectedPhoto(null);

    setPhotoPreview("");

    setTagInput("");

    setShowPassword(false);
  };

  /* =======================================================
     EDIT TEACHER
  ======================================================= */

  const handleEdit = (teacher) => {
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }

    setFormData({
      ...teacher,
      password: "",
      joiningDate: formatDateForInput(teacher.joiningDate),
      dob: formatDateForInput(teacher.dob),
      skills: Array.isArray(teacher.skills)
        ? teacher.skills
        : [],
    });

    setSelectedPhoto(null);

    setPhotoPreview("");

    setShowPassword(false);

    setTagInput("");

    setActiveMenuId(null);

    setActiveTab("add_edit");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =======================================================
     SAVE TEACHER
  ======================================================= */

  const handleSaveTeacher = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const formDataToSend = new FormData();

      /* -----------------------------------------------
         TEXT FIELDS
      ------------------------------------------------ */

      formDataToSend.append(
        "name",
        formData.name?.trim() || ""
      );

      formDataToSend.append(
        "phone",
        formData.phone?.trim() || ""
      );

      formDataToSend.append(
        "email",
        formData.email?.trim() || ""
      );

      formDataToSend.append(
        "address",
        formData.address?.trim() || ""
      );

      formDataToSend.append(
        "designation",
        formData.designation?.trim() || ""
      );

      formDataToSend.append(
        "experience",
        formData.experience?.trim() || ""
      );

      formDataToSend.append(
        "qualification",
        formData.qualification?.trim() || ""
      );

      formDataToSend.append(
        "subject",
        formData.subject?.trim() || ""
      );

      formDataToSend.append(
        "gender",
        formData.gender || ""
      );

      formDataToSend.append(
        "bloodGroup",
        formData.bloodGroup || ""
      );

      formDataToSend.append(
        "status",
        formData.status || "Active"
      );

      formDataToSend.append(
        "bio",
        formData.bio?.trim() || ""
      );

      /* -----------------------------------------------
         DATES
      ------------------------------------------------ */

      formDataToSend.append(
        "joiningDate",
        formData.joiningDate || ""
      );

      formDataToSend.append(
        "dob",
        formData.dob || ""
      );

      /* -----------------------------------------------
         SKILLS
      ------------------------------------------------ */

      formDataToSend.append(
        "skills",
        JSON.stringify(formData.skills || [])
      );

      /* -----------------------------------------------
         PASSWORD
         
         Important:
         On edit, empty password means:
         keep existing password.
      ------------------------------------------------ */

      if (formData.password?.trim()) {
        formDataToSend.append(
          "password",
          formData.password.trim()
        );
      }

      /* -----------------------------------------------
         PHOTO
         
         Only append when a new photo was selected.
      ------------------------------------------------ */

      if (selectedPhoto) {
        formDataToSend.append(
          "photo",
          selectedPhoto
        );
      }

      let response;

      /* -----------------------------------------------
         UPDATE
      ------------------------------------------------ */

      if (formData.id) {
        response = await API.put(
          `/school-teachers/${formData.id}`,
          formDataToSend
        );
      }

      /* -----------------------------------------------
         CREATE
      ------------------------------------------------ */

      else {
        response = await API.post(
          "/school-teachers",
          formDataToSend
        );
      }

      if (response?.data?.success === false) {
        throw new Error(
          response?.data?.message ||
            "Unable to save teacher."
        );
      }

      alert(
        formData.id
          ? "Teacher updated successfully."
          : "Teacher added successfully."
      );

      await fetchTeachers();

      handleResetForm();

      setActiveTab("list");
    } catch (error) {
      console.error("Save teacher error:", error);

      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to save teacher."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =======================================================
     DELETE TEACHER
  ======================================================= */

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this teacher record?"
    );

    if (!confirmed) {
      setActiveMenuId(null);
      return;
    }

    try {
      setDeletingId(id);

      await API.delete(
        `/school-teachers/${id}`
      );

      alert("Teacher deleted successfully.");

      setTeachers((prev) =>
        prev.filter((teacher) => teacher.id !== id)
      );

      setActiveMenuId(null);

      setCurrentPage(1);
    } catch (error) {
      console.error("Delete teacher error:", error);

      alert(
        error?.response?.data?.message ||
          "Unable to delete teacher."
      );
    } finally {
      setDeletingId(null);
    }
  };

  /* =======================================================
     STATUS CHANGE
  ======================================================= */

  const handleStatusChange = async (
    id,
    newStatus
  ) => {
    try {
      setStatusUpdatingId(id);

      await API.patch(
        `/school-teachers/${id}/status`,
        {
          status: newStatus,
        }
      );

      setTeachers((prev) =>
        prev.map((teacher) =>
          teacher.id === id
            ? {
                ...teacher,
                status: newStatus,
              }
            : teacher
        )
      );

      setActiveMenuId(null);
    } catch (error) {
      console.error(
        "Update teacher status error:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Unable to update teacher status."
      );
    } finally {
      setStatusUpdatingId(null);
    }
  };

  /* =======================================================
     FILTER TOGGLE
  ======================================================= */

  const handleToggleFilter = () => {
    if (filterMode === "All") {
      setFilterMode("Active");
    } else if (filterMode === "Active") {
      setFilterMode("Inactive");
    } else {
      setFilterMode("All");
    }

    setCurrentPage(1);
  };

  /* =======================================================
     REFRESH
  ======================================================= */

  const handleRefresh = async () => {
    setSearchTerm("");

    setFilterMode("All");

    setCurrentPage(1);

    setActiveMenuId(null);

    await fetchTeachers();
  };

  /* =======================================================
     FILTERED TEACHERS
  ======================================================= */

  const filteredTeachers = useMemo(() => {
    const search = searchTerm
      .trim()
      .toLowerCase();

    return teachers.filter((teacher) => {
      const matchesSearch =
        !search ||
        teacher.name
          ?.toLowerCase()
          .includes(search) ||
        teacher.subject
          ?.toLowerCase()
          .includes(search) ||
        teacher.email
          ?.toLowerCase()
          .includes(search) ||
        teacher.phone
          ?.toLowerCase()
          .includes(search) ||
        teacher.designation
          ?.toLowerCase()
          .includes(search);

      const matchesStatus =
        filterMode === "All" ||
        teacher.status?.toLowerCase() ===
          filterMode.toLowerCase();

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    teachers,
    searchTerm,
    filterMode,
  ]);

  /* =======================================================
     PAGINATION
  ======================================================= */

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

  /* =======================================================
     CSV EXPORT
  ======================================================= */

  const handleExportCSV = () => {
    if (!filteredTeachers.length) {
      alert("No data available to export.");
      return;
    }

    const headers = [
      "ID",
      "Name",
      "Designation",
      "Subject",
      "Experience",
      "Email",
      "Phone",
      "Qualification",
      "Gender",
      "Status",
    ];

    const rows = filteredTeachers.map(
      (teacher) => [
        teacher.id || "",
        teacher.name || "",
        teacher.designation || "",
        teacher.subject || "",
        teacher.experience || "",
        teacher.email || "",
        teacher.phone || "",
        teacher.qualification || "",
        teacher.gender || "",
        teacher.status || "",
      ]
    );

    const escapeCSV = (value) => {
      const stringValue = String(
        value ?? ""
      );

      return `"${stringValue.replace(
        /"/g,
        '""'
      )}"`;
    };

    const csvContent = [
      headers.map(escapeCSV).join(","),
      ...rows.map((row) =>
        row.map(escapeCSV).join(",")
      ),
    ].join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "teachers_list.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* =======================================================
     PREVIOUS PAGE
  ======================================================= */

  const handlePreviousPage = () => {
    setCurrentPage((prev) =>
      Math.max(prev - 1, 1)
    );
  };

  /* =======================================================
     NEXT PAGE
  ======================================================= */

  const handleNextPage = () => {
    setCurrentPage((prev) =>
      Math.min(
        prev + 1,
        totalPages
      )
    );
  };

  /* =======================================================
     NEW TEACHER
  ======================================================= */

  const handleNewTeacher = () => {
    handleResetForm();

    setActiveTab("add_edit");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =======================================================
     PHOTO TO SHOW IN FORM
  ======================================================= */

  const currentPhoto =
    photoPreview ||
    getImageUrl(formData.photo);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="teacher-container">

      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="teacher-header">

        <div className="tab-navigation">

          <button
            type="button"
            className={`tab-btn ${
              activeTab === "list"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveTab("list")
            }
          >
            Teacher List
          </button>

          <button
            type="button"
            className={`tab-btn ${
              activeTab === "add_edit"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveTab("add_edit")
            }
          >
            Add / Edit Teacher
          </button>

        </div>

        <button
          type="button"
          className="add-teacher-btn"
          onClick={handleNewTeacher}
        >
          <FaPlus />
          Add New Teacher
        </button>

      </div>

      {/* ===================================================
          ADD / EDIT
      =================================================== */}

      {activeTab === "add_edit" && (
        <div className="add-edit-layout">

          {/* ===============================================
              LEFT FORM
          =============================================== */}

          <div className="form-column scrollable-left-pane">

            {/* BASIC INFORMATION */}

            <div className="card">

              <div className="card-header flex-between">

                <div className="card-title-wrapper">
                  <FaUserCheck className="card-icon" />

                  <h3 className="card-title-right">
                    Basic Information
                  </h3>
                </div>

              </div>

              <div className="card-body">

                <form
                  id="teacherForm"
                  onSubmit={handleSaveTeacher}
                >

                  {/* NAME + PHONE */}

                  <div className="grid-2">

                    <div className="form-group">

                      <label>
                        Full Name
                      </label>

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={
                          handleInputChange
                        }
                        placeholder="Enter teacher name"
                      />

                    </div>

                    <div className="form-group">

                      <label>
                        Phone
                      </label>

                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={
                          handleInputChange
                        }
                        placeholder="Enter phone number"
                      />

                    </div>

                  </div>

                  {/* EMAIL + ADDRESS */}

                  <div className="grid-2">

                    <div className="form-group">

                      <label>
                        Email
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={
                          handleInputChange
                        }
                        placeholder="Enter email address"
                      />

                    </div>

                    <div className="form-group">

                      <label>
                        Address
                      </label>

                      <input
                        type="text"
                        name="address"
                        value={
                          formData.address
                        }
                        onChange={
                          handleInputChange
                        }
                        placeholder="Enter address"
                      />

                    </div>

                  </div>

                  {/* PASSWORD */}

                  <div className="grid-2">

                    <div className="form-group password-field-group">

                      <label>
                        Password
                      </label>

                      <div className="password-input-wrap">

                        <FaLock className="password-left-icon" />

                        <input
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          name="password"
                          value={
                            formData.password
                          }
                          onChange={
                            handleInputChange
                          }
                          placeholder={
                            formData.id
                              ? "Enter new password or leave blank"
                              : "Enter password"
                          }
                        />

                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() =>
                            setShowPassword(
                              (prev) => !prev
                            )
                          }
                          title={
                            showPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showPassword ? (
                            <FaEyeSlash />
                          ) : (
                            <FaEye />
                          )}
                        </button>

                      </div>

                      <small className="field-hint">
                        {formData.id
                          ? "Leave blank to keep the existing password."
                          : "Password will be securely stored."}
                      </small>

                    </div>

                    <div className="form-group security-note-group">

                      <label>
                        Account Security
                      </label>

                      <div className="security-note">

                        <FaLock />

                        <div>
                          <strong>
                            Private password
                          </strong>

                          <span>
                            Used for teacher account access.
                          </span>
                        </div>

                      </div>

                    </div>

                  </div>

                  {/* DESIGNATION EXPERIENCE JOINING */}

                  <div className="grid-3">

                    <div className="form-group">

                      <label>
                        Designation
                      </label>

                      <input
                        type="text"
                        name="designation"
                        value={
                          formData.designation
                        }
                        onChange={
                          handleInputChange
                        }
                        placeholder="e.g. Math Teacher"
                      />

                    </div>

                    <div className="form-group">

                      <label>
                        Experience
                      </label>

                      <input
                        type="text"
                        name="experience"
                        value={
                          formData.experience
                        }
                        onChange={
                          handleInputChange
                        }
                        placeholder="e.g. 5 Years"
                      />

                    </div>

                    <div className="form-group">

                      <label>
                        Date of Joining
                      </label>

                      <input
                        type="date"
                        name="joiningDate"
                        value={
                          formData.joiningDate
                        }
                        onChange={
                          handleInputChange
                        }
                      />

                    </div>

                  </div>

                  {/* QUALIFICATION + SUBJECT */}

                  <div className="grid-2">

                    <div className="form-group">

                      <label>
                        Qualification
                      </label>

                      <input
                        type="text"
                        name="qualification"
                        value={
                          formData.qualification
                        }
                        onChange={
                          handleInputChange
                        }
                        placeholder="e.g. M.Sc, B.Ed"
                      />

                    </div>

                    <div className="form-group">

                      <label>
                        Subject Specialization
                      </label>

                      <input
                        type="text"
                        name="subject"
                        value={
                          formData.subject
                        }
                        onChange={
                          handleInputChange
                        }
                        placeholder="e.g. Mathematics"
                      />

                    </div>

                  </div>

                  {/* DOB + BLOOD + GENDER */}

                  <div className="grid-3">

                    <div className="form-group">

                      <label>
                        Date of Birth
                      </label>

                      <input
                        type="date"
                        name="dob"
                        value={
                          formData.dob
                        }
                        onChange={
                          handleInputChange
                        }
                      />

                    </div>

                    <div className="form-group">

                      <label>
                        Blood Group
                      </label>

                      <select
                        name="bloodGroup"
                        value={
                          formData.bloodGroup
                        }
                        onChange={
                          handleInputChange
                        }
                      >
                        <option value="">
                          Select blood group
                        </option>

                        <option value="A+">
                          A+
                        </option>

                        <option value="A-">
                          A-
                        </option>

                        <option value="B+">
                          B+
                        </option>

                        <option value="B-">
                          B-
                        </option>

                        <option value="AB+">
                          AB+
                        </option>

                        <option value="AB-">
                          AB-
                        </option>

                        <option value="O+">
                          O+
                        </option>

                        <option value="O-">
                          O-
                        </option>
                      </select>

                    </div>

                    <div className="form-group">

                      <label>
                        Gender
                      </label>

                      <select
                        name="gender"
                        value={
                          formData.gender
                        }
                        onChange={
                          handleInputChange
                        }
                      >
                        <option value="">
                          Select gender
                        </option>

                        <option value="Male">
                          Male
                        </option>

                        <option value="Female">
                          Female
                        </option>

                        <option value="Other">
                          Other
                        </option>
                      </select>

                    </div>

                  </div>

                  {/* STATUS */}

                  <div className="form-group toggle-group">

                    <label>
                      Status
                    </label>

                    <div className="status-toggle-wrapper">

                      <label className="switch">

                        <input
                          type="checkbox"
                          name="status"
                          checked={
                            formData.status ===
                            "Active"
                          }
                          onChange={
                            handleInputChange
                          }
                        />

                        <span className="slider round"></span>

                      </label>

                      <span
                        className={`status-label ${
                          formData.status?.toLowerCase()
                        }`}
                      >
                        {formData.status}
                      </span>

                    </div>

                  </div>

                </form>

              </div>

            </div>

            {/* =============================================
                ADDITIONAL INFORMATION
            ============================================== */}

            <div className="card">

              <div className="card-header flex-between">

                <div className="card-title-wrapper">

                  <FaUserCheck className="card-icon" />

                  <h3 className="card-title-right">
                    Additional Information
                  </h3>

                </div>

              </div>

              <div className="card-body">

                {/* BIO */}

                <div className="form-group">

                  <label>
                    About / Biography
                  </label>

                  <textarea
                    rows="4"
                    name="bio"
                    value={formData.bio}
                    onChange={
                      handleInputChange
                    }
                    placeholder="Write teacher biography..."
                  />

                </div>

                {/* PHOTO */}

                <div className="photo-upload-section">

                  <label>
                    Profile Photo
                  </label>

                  <div className="upload-box">

                    {currentPhoto ? (
                      <img
                        src={currentPhoto}
                        alt="Teacher Preview"
                        className="photo-preview"
                      />
                    ) : (
                      <div className="empty-photo-preview">
                        <FaUserCheck />
                        <span>
                          No photo selected
                        </span>
                      </div>
                    )}

                    <label
                      htmlFor="photo-upload-input"
                      className="upload-btn"
                    >
                      <FaUpload />
                      Choose Photo
                    </label>

                    <input
                      id="photo-upload-input"
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                      style={{
                        display: "none",
                      }}
                      onChange={
                        handleImageUpload
                      }
                    />

                    <span className="file-info">
                      JPG, PNG, WEBP or GIF
                    </span>

                    {selectedPhoto && (
                      <span className="selected-file-name">
                        {selectedPhoto.name}
                      </span>
                    )}

                  </div>

                </div>

                {/* SKILLS */}

                <div className="form-group margin-top-15">

                  <label>
                    Teaching Skills
                  </label>

                  <div className="skills-tags-container">

                    {formData.skills.length >
                    0 ? (
                      formData.skills.map(
                        (skill, index) => (
                          <span
                            key={`${skill}-${index}`}
                            className="skill-badge"
                          >
                            {skill}

                            <FaTimes
                              onClick={() =>
                                handleRemoveSkill(
                                  skill
                                )
                              }
                              className="remove-skill"
                            />
                          </span>
                        )
                      )
                    ) : (
                      <span className="no-skills-text">
                        No skills added yet
                      </span>
                    )}

                  </div>

                  <input
                    type="text"
                    placeholder="Type skill and press Enter..."
                    value={tagInput}
                    onChange={(e) =>
                      setTagInput(
                        e.target.value
                      )
                    }
                    onKeyDown={
                      handleAddSkillKey
                    }
                    className="tag-input"
                  />

                </div>

                {/* FORM ACTIONS */}

                <div className="form-actions">

                  <button
                    type="button"
                    className="btn-reset"
                    onClick={
                      handleResetForm
                    }
                    disabled={saving}
                  >
                    Reset
                  </button>

                  <button
                    type="submit"
                    form="teacherForm"
                    className="btn-save"
                    disabled={saving}
                  >

                    {saving ? (
                      <>
                        <FaSync className="spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave />
                        {formData.id
                          ? "Update Teacher"
                          : "Save Teacher"}
                      </>
                    )}

                  </button>

                </div>

              </div>

            </div>

          </div>

          {/* ===============================================
              RIGHT PREVIEW
          =============================================== */}

          <div className="preview-column">

            {/* PROFILE PREVIEW */}

            <div className="card">

              <div className="card-header flex-between">

                <div className="card-title-wrapper">

                  <FaEye className="card-icon" />

                  <h3 className="card-title-right">
                    Profile Preview
                  </h3>

                </div>

              </div>

              <div className="card-body profile-preview-card">

                <div className="profile-preview-flex">

                  {currentPhoto ? (
                    <img
                      src={currentPhoto}
                      alt={
                        formData.name ||
                        "Teacher"
                      }
                      className="large-avatar"
                    />
                  ) : (
                    <div className="large-avatar empty-avatar">
                      <FaUserCheck />
                    </div>
                  )}

                  <div className="profile-info">

                    <h2>
                      {formData.name ||
                        "Teacher Name"}
                    </h2>

                    <p className="designation-text">
                      {formData.designation ||
                        "Designation"}
                    </p>

                    <ul className="info-list">

                      <li>
                        <FaPhoneAlt />
                        <span>
                          Phone
                        </span>
                        <strong>
                          {formData.phone ||
                            "N/A"}
                        </strong>
                      </li>

                      <li>
                        <FaEnvelope />
                        <span>
                          Email
                        </span>
                        <strong>
                          {formData.email ||
                            "N/A"}
                        </strong>
                      </li>

                      <li>
                        <FaMapMarkerAlt />
                        <span>
                          Address
                        </span>
                        <strong>
                          {formData.address ||
                            "N/A"}
                        </strong>
                      </li>

                      <li>
                        <FaBriefcase />
                        <span>
                          Experience
                        </span>
                        <strong>
                          {formData.experience ||
                            "N/A"}
                        </strong>
                      </li>

                      <li>
                        <FaGraduationCap />
                        <span>
                          Qualification
                        </span>
                        <strong>
                          {formData.qualification ||
                            "N/A"}
                        </strong>
                      </li>

                      <li>
                        <FaCalendarAlt />
                        <span>
                          Joining Date
                        </span>
                        <strong>
                          {formData.joiningDate
                            ? formatDisplayDate(
                                formData.joiningDate
                              )
                            : "N/A"}
                        </strong>
                      </li>

                    </ul>

                    <div className="social-links">

                      <span>
                        Contact
                      </span>

                      <div className="social-icons">

                        <a
                          href="#facebook"
                          onClick={(e) =>
                            e.preventDefault()
                          }
                        >
                          <FaFacebookF />
                        </a>

                        <a
                          href="#twitter"
                          onClick={(e) =>
                            e.preventDefault()
                          }
                        >
                          <FaTwitter />
                        </a>

                        <a
                          href="#linkedin"
                          onClick={(e) =>
                            e.preventDefault()
                          }
                        >
                          <FaLinkedinIn />
                        </a>

                        <a
                          href="#instagram"
                          onClick={(e) =>
                            e.preventDefault()
                          }
                        >
                          <FaInstagram />
                        </a>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* SKILLS PREVIEW */}

            <div className="card">

              <div className="card-header flex-between">

                <div className="card-title-wrapper">

                  <FaUserCheck className="card-icon" />

                  <h3 className="card-title-right">
                    Teacher Skills Preview
                  </h3>

                </div>

              </div>

              <div className="card-body">

                {[
                  {
                    name: "Teaching Skills",
                    value: 95,
                    className: "yellow",
                  },
                  {
                    name: "Speaking",
                    value: 85,
                    className: "red",
                  },
                  {
                    name: "Communication Skill",
                    value: 75,
                    className: "blue",
                  },
                  {
                    name: "Follow The Rules",
                    value: 65,
                    className: "green",
                  },
                ].map((skill) => (
                  <div
                    className="progress-item"
                    key={skill.name}
                  >

                    <div className="progress-labels">

                      <span>
                        {skill.name}
                      </span>

                      <span>
                        {skill.value}%
                      </span>

                    </div>

                    <div className="progress-bar">

                      <div
                        className={`progress-fill ${skill.className}`}
                        style={{
                          width: `${skill.value}%`,
                        }}
                      />

                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>
      )}

      {/* ===================================================
          TEACHER LIST
      =================================================== */}

      {activeTab === "list" && (
        <div className="card table-card">

          {/* TABLE HEADER */}

          <div className="table-top-bar">

            <div className="table-title">

              <FaUserCheck className="card-icon" />

              <h3>
                All Teachers
              </h3>

              <span className="teacher-count">
                {filteredTeachers.length}
              </span>

            </div>

            <div className="table-actions">

              {/* SEARCH */}

              <div className="search-box">

                <FaSearch className="search-icon" />

                <input
                  type="text"
                  placeholder="Search teacher..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(
                      e.target.value
                    );
                    setCurrentPage(1);
                  }}
                />

                {searchTerm && (
                  <button
                    type="button"
                    className="search-clear"
                    onClick={() =>
                      setSearchTerm("")
                    }
                  >
                    <FaTimes />
                  </button>
                )}

              </div>

              {/* FILTER */}

              <button
                type="button"
                className={`icon-btn filter-toggle-btn ${filterMode.toLowerCase()}`}
                onClick={
                  handleToggleFilter
                }
                title="All → Active → Inactive"
              >
                <FaFilter />

                Filter:

                <span>
                  {filterMode}
                </span>

              </button>

              {/* EXPORT */}

              <button
                type="button"
                className="icon-btn export-btn"
                onClick={
                  handleExportCSV
                }
                title="Export CSV"
              >
                <FaDownload />
                Export
              </button>

              {/* REFRESH */}

              <button
                type="button"
                className="icon-btn refresh-btn"
                onClick={
                  handleRefresh
                }
                title="Refresh"
                disabled={loading}
              >
                <FaSync
                  className={
                    loading
                      ? "spin"
                      : ""
                  }
                />
              </button>

            </div>

          </div>

          {/* TABLE */}

          <div className="responsive-table-wrapper">

            <table className="teacher-table">

              <thead>

                <tr>

                  <th>#</th>

                  <th>
                    Photo
                  </th>

                  <th>
                    Name
                  </th>

                  <th>
                    Designation
                  </th>

                  <th>
                    Subject
                  </th>

                  <th>
                    Experience
                  </th>

                  <th>
                    Email
                  </th>

                  <th>
                    Phone
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {loading ? (

                  <tr>

                    <td
                      colSpan="10"
                      className="no-data"
                    >
                      <FaSync className="spin" />
                      <span>
                        Loading teachers...
                      </span>
                    </td>

                  </tr>

                ) : currentTableData.length >
                  0 ? (

                  currentTableData.map(
                    (teacher, index) => (

                      <tr
                        key={teacher.id}
                      >

                        <td>
                          {String(
                            startIndex +
                              index +
                              1
                          ).padStart(
                            2,
                            "0"
                          )}
                        </td>

                        <td>

                          {teacher.photo ? (
                            <img
                              src={getImageUrl(
                                teacher.photo
                              )}
                              alt={
                                teacher.name
                              }
                              className="table-avatar"
                              onError={(e) => {
                                e.currentTarget.style.display =
                                  "none";
                              }}
                            />
                          ) : (
                            <div className="table-avatar empty-table-avatar">
                              <FaUserCheck />
                            </div>
                          )}

                        </td>

                        <td className="font-semibold">
                          {teacher.name ||
                            "N/A"}
                        </td>

                        <td>
                          {teacher.designation ||
                            "N/A"}
                        </td>

                        <td>
                          {teacher.subject ||
                            "N/A"}
                        </td>

                        <td>
                          {teacher.experience ||
                            "N/A"}
                        </td>

                        <td>
                          {teacher.email ||
                            "N/A"}
                        </td>

                        <td>
                          {teacher.phone ||
                            "N/A"}
                        </td>

                        <td>

                          <span
                            className={`status-badge ${
                              teacher.status?.toLowerCase() ||
                              "inactive"
                            }`}
                          >
                            {teacher.status ||
                              "Inactive"}
                          </span>

                        </td>

                        <td>

                          <div className="action-buttons">

                            {/* EDIT */}

                            <button
                              type="button"
                              className="action-btn edit-btn"
                              title="Edit"
                              onClick={() =>
                                handleEdit(
                                  teacher
                                )
                              }
                            >
                              <FaEdit />
                            </button>

                            {/* VIEW */}

                            <button
                              type="button"
                              className="action-btn view-btn"
                              title="View"
                              onClick={() =>
                                setViewModalTeacher(
                                  teacher
                                )
                              }
                            >
                              <FaEye />
                            </button>

                            {/* DELETE */}

                            <button
                              type="button"
                              className="action-btn delete-btn"
                              title="Delete"
                              disabled={
                                deletingId ===
                                teacher.id
                              }
                              onClick={() =>
                                handleDelete(
                                  teacher.id
                                )
                              }
                            >
                              {deletingId ===
                              teacher.id ? (
                                <FaSync className="spin" />
                              ) : (
                                <FaTrashAlt />
                              )}
                            </button>

                            {/* MORE */}

                            <div className="more-menu-container">

                              <button
                                type="button"
                                className="action-btn more-btn"
                                title="Change Status"
                                onClick={() =>
                                  setActiveMenuId(
                                    activeMenuId ===
                                      teacher.id
                                      ? null
                                      : teacher.id
                                  )
                                }
                              >
                                <FaEllipsisV />
                              </button>

                              {activeMenuId ===
                                teacher.id && (

                                <div className="status-dropdown-menu">

                                  <div className="menu-header">
                                    Change Status
                                  </div>

                                  <button
                                    type="button"
                                    className={`menu-option opt-active ${
                                      teacher.status ===
                                      "Active"
                                        ? "selected"
                                        : ""
                                    }`}
                                    disabled={
                                      statusUpdatingId ===
                                      teacher.id
                                    }
                                    onClick={() =>
                                      handleStatusChange(
                                        teacher.id,
                                        "Active"
                                      )
                                    }
                                  >
                                    <span className="status-dot green"></span>

                                    Active
                                  </button>

                                  <button
                                    type="button"
                                    className={`menu-option opt-inactive ${
                                      teacher.status ===
                                      "Inactive"
                                        ? "selected"
                                        : ""
                                    }`}
                                    disabled={
                                      statusUpdatingId ===
                                      teacher.id
                                    }
                                    onClick={() =>
                                      handleStatusChange(
                                        teacher.id,
                                        "Inactive"
                                      )
                                    }
                                  >
                                    <span className="status-dot red"></span>

                                    Inactive
                                  </button>

                                </div>

                              )}

                            </div>

                          </div>

                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="10"
                      className="no-data"
                    >
                      <FaUserCheck />

                      <span>
                        No teachers found.
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

          <div className="pagination-wrapper">

            <div className="pagination-info">

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

            <div className="pagination-controls">

              <button
                type="button"
                className="page-nav-btn"
                disabled={
                  currentPage === 1
                }
                onClick={
                  handlePreviousPage
                }
              >
                &lt;
              </button>

              {Array.from(
                {
                  length: totalPages,
                },
                (_, index) =>
                  index + 1
              ).map((page) => (

                <button
                  type="button"
                  key={page}
                  className={`page-num-btn ${
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

              <button
                type="button"
                className="page-nav-btn"
                disabled={
                  currentPage ===
                  totalPages
                }
                onClick={
                  handleNextPage
                }
              >
                &gt;
              </button>

              <select
                className="per-page-select"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(
                    Number(
                      e.target.value
                    )
                  );
                  setCurrentPage(1);
                }}
              >
                <option value={5}>
                  5 / page
                </option>

                <option value={10}>
                  10 / page
                </option>

                <option value={20}>
                  20 / page
                </option>

                <option value={50}>
                  50 / page
                </option>
              </select>

            </div>

          </div>

        </div>
      )}

      {/* ===================================================
          VIEW TEACHER MODAL
      =================================================== */}

      {viewModalTeacher && (

        <div
          className="modal-overlay"
          onClick={() =>
            setViewModalTeacher(null)
          }
        >

          <div
            className="modal-container teacher-view-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <h3>
                Teacher Details
              </h3>

              <button
                type="button"
                className="modal-close"
                onClick={() =>
                  setViewModalTeacher(null)
                }
              >
                <FaTimes />
              </button>

            </div>

            <div className="modal-body flex-modal">

              <div className="modal-photo-section">

                {viewModalTeacher.photo ? (
                  <img
                    src={getImageUrl(
                      viewModalTeacher.photo
                    )}
                    alt={
                      viewModalTeacher.name
                    }
                    className="modal-avatar"
                  />
                ) : (
                  <div className="modal-avatar empty-modal-avatar">
                    <FaUserCheck />
                  </div>
                )}

                <span
                  className={`status-badge ${
                    viewModalTeacher.status?.toLowerCase()
                  }`}
                >
                  {viewModalTeacher.status}
                </span>

              </div>

              <div className="modal-info">

                <h2>
                  {viewModalTeacher.name}
                </h2>

                <p className="designation-text">
                  {
                    viewModalTeacher.designation
                  }
                </p>

                <hr className="divider" />

                <ul className="info-list">

                  <li>
                    <FaPhoneAlt />
                    <span>
                      Phone
                    </span>
                    <strong>
                      {
                        viewModalTeacher.phone ||
                        "N/A"
                      }
                    </strong>
                  </li>

                  <li>
                    <FaEnvelope />
                    <span>
                      Email
                    </span>
                    <strong>
                      {
                        viewModalTeacher.email ||
                        "N/A"
                      }
                    </strong>
                  </li>

                  <li>
                    <FaMapMarkerAlt />
                    <span>
                      Address
                    </span>
                    <strong>
                      {
                        viewModalTeacher.address ||
                        "N/A"
                      }
                    </strong>
                  </li>

                  <li>
                    <FaBriefcase />
                    <span>
                      Experience
                    </span>
                    <strong>
                      {
                        viewModalTeacher.experience ||
                        "N/A"
                      }
                    </strong>
                  </li>

                  <li>
                    <FaGraduationCap />
                    <span>
                      Qualification
                    </span>
                    <strong>
                      {
                        viewModalTeacher.qualification ||
                        "N/A"
                      }
                    </strong>
                  </li>

                  <li>
                    <FaCalendarAlt />
                    <span>
                      Joining Date
                    </span>
                    <strong>
                      {formatDisplayDate(
                        viewModalTeacher.joiningDate
                      )}
                    </strong>
                  </li>

                  <li>
                    <FaCalendarAlt />
                    <span>
                      Date of Birth
                    </span>
                    <strong>
                      {formatDisplayDate(
                        viewModalTeacher.dob
                      )}
                    </strong>
                  </li>

                  <li>
                    <FaUserCheck />
                    <span>
                      Gender
                    </span>
                    <strong>
                      {
                        viewModalTeacher.gender ||
                        "N/A"
                      }
                    </strong>
                  </li>

                  <li>
                    <FaUserCheck />
                    <span>
                      Blood Group
                    </span>
                    <strong>
                      {
                        viewModalTeacher.bloodGroup ||
                        "N/A"
                      }
                    </strong>
                  </li>

                </ul>

                {/* SKILLS */}

                {viewModalTeacher.skills
                  ?.length > 0 && (

                  <div className="modal-skills-section">

                    <strong>
                      Teaching Skills
                    </strong>

                    <div className="skills-tags-container">

                      {viewModalTeacher.skills.map(
                        (
                          skill,
                          index
                        ) => (
                          <span
                            key={`${skill}-${index}`}
                            className="skill-badge"
                          >
                            {skill}
                          </span>
                        )
                      )}

                    </div>

                  </div>

                )}

                {/* BIO */}

                <div className="bio-section margin-top-15">

                  <strong>
                    Biography
                  </strong>

                  <p>
                    {viewModalTeacher.bio ||
                      "No biography available."}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default TeacherList;

