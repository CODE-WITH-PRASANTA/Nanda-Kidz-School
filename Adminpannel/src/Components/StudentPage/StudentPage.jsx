import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  ChevronDown,
  LayoutGrid,
  Users,
  UserPlus,
  UserCheck,
  Eye,
  Pencil,
  X,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Columns3,
  Download,
  Trash2,
  Filter,
  Check,
  UserRound,
  Phone,
  Mail,
  MapPin,
  Droplets,
} from "lucide-react";

import "./StudentPage.css";
import API, { IMG_URL } from "../../api/axios";
import { useNavigate } from "react-router-dom";

const DEFAULT_STUDENT_IMAGE = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
  <rect width="120" height="120" rx="60" fill="#f1f5f9"/>
  <circle cx="60" cy="45" r="22" fill="#94a3b8"/>
  <path d="M24 105c4-23 18-35 36-35s32 12 36 35" fill="#94a3b8"/>
</svg>
`)}`;

const getFileUrl = (file) => {
  if (!file) return "";

  const value =
    typeof file === "string"
      ? file
      : file?.url || file?.path || file?.fileName || "";

  if (!value) return "";

  if (/^https?:\/\//i.test(value) || value.startsWith("data:")) {
    return value;
  }

  return `${IMG_URL}${value.startsWith("/") ? "" : "/"}${value}`;
};

const getStudentPhotoUrl = (admission) => {
  const photo =
    admission?.documents?.passportPhoto ||
    admission?.passportPhoto ||
    admission?.photo ||
    admission?.studentPhoto;

  return getFileUrl(photo);
};

const StudentPage = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [studentError, setStudentError] = useState("");

  const [modalMode, setModalMode] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedSection, setSelectedSection] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");
  const [bloodGroupFilter, setBloodGroupFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [selectedIds, setSelectedIds] = useState([]);

  const [visibleColumns, setVisibleColumns] = useState({
    student: true,
    admNo: true,
    classSection: true,
    rollNo: true,
    gender: true,
    dob: true,
    parent: true,
    status: true,
  });

  const mapAdmissionToStudent = (admission, index = 0) => {
    const fullName = admission.studentName || "Unnamed Student";
    return {
      id: admission._id || admission.id,
      name: fullName,
      admNo: admission.admissionNo || admission.admNo || `ADM-${String(index + 1).padStart(4, "0")}`,
      class: admission.admissionClass
        ? String(admission.admissionClass).startsWith("Class ")
          ? admission.admissionClass
          : `Class ${admission.admissionClass}`
        : "N/A",
      section: admission.section || "-",
      rollNo: admission.rollNo || "-",
      gender: admission.gender || "-",
      dob: admission.dob
        ? new Date(admission.dob).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "-",
      parent: admission.fatherName || admission.motherName || "Guardian",
      status: admission.status || "Active",
      phone: admission.mobile || "",
      email: admission.email || "",
      bloodGroup: admission.bloodGroup || "",
      address: admission.address || "",
      photo: getStudentPhotoUrl(admission),
      documents: admission.documents || {},
    };
  };

  useEffect(() => {
    let mounted = true;

    const loadStudents = async () => {
      try {
        setLoadingStudents(true);
        setStudentError("");

        const response = await API.get("/admissions");
        const payload = response?.data;

        const admissions = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data)
            ? payload.data
            : Array.isArray(payload?.admissions)
              ? payload.admissions
              : [];

        if (mounted) {
          setStudents(admissions.map(mapAdmissionToStudent));
        }
      } catch (error) {
        console.error("Failed to load students:", error);
        if (mounted) {
          setStudentError(
            error?.response?.data?.message ||
              "Unable to load students from the server."
          );
          setStudents([]);
        }
      } finally {
        if (mounted) setLoadingStudents(false);
      }
    };

    loadStudents();

    return () => {
      mounted = false;
    };
  }, []);

  const openAddAdmission = () => {
    navigate("/admission");
  };

  const openEditModal = (student) => {
    if (!student?.id) return;
    navigate(`/admission/edit/${student.id}`);
  };

  const openViewModal = (student) => {
    setSelectedStudent(student);
    setModalMode("view");
  };

  const handleDelete = async (id) => {
    const student = students.find((item) => item.id === id);
    if (!student) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${student.name}?`
    );
    if (!confirmed) return;

    try {
      await API.delete(`/admissions/${id}`);
      setStudents((prev) => prev.filter((item) => item.id !== id));
      setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));

      if (selectedStudent?.id === id) {
        setSelectedStudent(null);
        setModalMode(null);
      }
    } catch (error) {
      console.error("Failed to delete student:", error);
      alert(
        error?.response?.data?.message ||
          "Failed to delete student. Please try again."
      );
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;

    const confirmed = window.confirm(
      `Delete ${selectedIds.length} selected student(s)?`
    );
    if (!confirmed) return;

    try {
      await Promise.all(
        selectedIds.map((id) => API.delete(`/admissions/${id}`))
      );

      setStudents((prev) =>
        prev.filter((student) => !selectedIds.includes(student.id))
      );
      setSelectedIds([]);
    } catch (error) {
      console.error("Bulk delete failed:", error);
      alert(
        error?.response?.data?.message ||
          "Some students could not be deleted. Please try again."
      );
    }
  };

  const toggleStudentStatus = async (id) => {
    const student = students.find((item) => item.id === id);
    if (!student) return;

    const nextStatus = student.status === "Active" ? "Inactive" : "Active";

    try {
      await API.patch(`/admissions/${id}/status`, {
        status: nextStatus,
      });

      setStudents((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: nextStatus } : item
        )
      );

      if (selectedStudent?.id === id) {
        setSelectedStudent((prev) =>
          prev ? { ...prev, status: nextStatus } : prev
        );
      }
    } catch (error) {
      console.error("Failed to update student status:", error);
      alert(
        error?.response?.data?.message ||
          "Failed to update student status."
      );
    }
  };

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesClass =
        selectedClass === "All" ||
        student.class === selectedClass ||
        student.class === `Class ${selectedClass}`;

      const matchesSection =
        selectedSection === "All" ||
        student.section === selectedSection;

      const matchesStatus =
        selectedStatus === "All" ||
        student.status === selectedStatus;

      const matchesGender =
        selectedGender === "All" ||
        student.gender === selectedGender;

      const matchesBloodGroup =
        bloodGroupFilter === "All" ||
        student.bloodGroup === bloodGroupFilter;

      const query = searchQuery.toLowerCase().trim();

      const matchesSearch =
        !query ||
        student.name.toLowerCase().includes(query) ||
        student.admNo.toLowerCase().includes(query) ||
        student.parent.toLowerCase().includes(query) ||
        student.phone.toLowerCase().includes(query);

      return (
        matchesClass &&
        matchesSection &&
        matchesStatus &&
        matchesGender &&
        matchesBloodGroup &&
        matchesSearch
      );
    });
  }, [
    students,
    selectedClass,
    selectedSection,
    selectedStatus,
    selectedGender,
    bloodGroupFilter,
    searchQuery,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / itemsPerPage)
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedStudents = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * itemsPerPage;

    return filteredStudents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredStudents, safeCurrentPage, itemsPerPage]);

  const firstEntry =
    filteredStudents.length === 0
      ? 0
      : (safeCurrentPage - 1) * itemsPerPage + 1;

  const lastEntry = Math.min(
    safeCurrentPage * itemsPerPage,
    filteredStudents.length
  );

  const allVisibleSelected =
    paginatedStudents.length > 0 &&
    paginatedStudents.every((student) => selectedIds.includes(student.id));

  const toggleSelectAll = () => {
    if (allVisibleSelected) {
      setSelectedIds((prev) =>
        prev.filter(
          (id) => !paginatedStudents.some((student) => student.id === id)
        )
      );
    } else {
      setSelectedIds((prev) => [
        ...new Set([...prev, ...paginatedStudents.map((student) => student.id)]),
      ]);
    }
  };

  const toggleSelectStudent = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  const resetAllFilters = () => {
    setSelectedClass("All");
    setSelectedSection("All");
    setSelectedStatus("All");
    setSelectedGender("All");
    setBloodGroupFilter("All");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleExport = () => {
    const headers = [
      "ID",
      "Name",
      "Admission No",
      "Class",
      "Section",
      "Roll No",
      "Gender",
      "DOB",
      "Parent",
      "Phone",
      "Email",
      "Blood Group",
      "Status",
    ];

    const rows = filteredStudents.map((student) => [
      student.id,
      `"${student.name}"`,
      student.admNo,
      `"${student.class}"`,
      student.section,
      student.rollNo,
      student.gender,
      `"${student.dob}"`,
      `"${student.parent}"`,
      student.phone,
      student.email,
      student.bloodGroup,
      student.status,
    ]);

    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join(
      "\n"
    );

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "students_list.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (safeCurrentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (safeCurrentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      safeCurrentPage - 1,
      safeCurrentPage,
      safeCurrentPage + 1,
      "...",
      totalPages,
    ];
  };

  return (
    <div className="student-page-container">
      {/* ================= HEADER ================= */}

      <div className="students-header-section">
        <div className="students-title-wrapper">
          <h1 className="student-page-main-title">Students</h1>

          <div className="students-breadcrumb-nav">
            <span className="students-breadcrumb-dashboard">
              Dashboard
            </span>

            <span className="students-breadcrumb-separator">
              <ChevronRight size={13} />
            </span>

            <span className="students-breadcrumb-current">
              Students
            </span>
          </div>
        </div>
      </div>

      {studentError && (
        <div className="students-error-message" role="alert">
          {studentError}
        </div>
      )}

      {loadingStudents && (
        <div className="students-loading-message">
          Loading students...
        </div>
      )}

      {/* ================= METRICS ================= */}

      <div className="students-metrics-cards-grid">
        <div className="student-metric-card">
          <div className="student-metric-icon-box student-total-icon">
            <LayoutGrid size={21} />
          </div>

          <div className="student-metric-content">
            <span className="student-metric-label">
              Total Students
            </span>

            <strong className="student-metric-value">
              {students.length}
            </strong>

            <span className="student-metric-subtext">
              All Classes
            </span>
          </div>
        </div>

        <div className="student-metric-card">
          <div className="student-metric-icon-box student-boys-icon">
            <Users size={21} />
          </div>

          <div className="student-metric-content">
            <span className="student-metric-label">
              Boys
            </span>

            <strong className="student-metric-value">
              {students.filter((s) => s.gender === "Male").length}
            </strong>

            <span className="student-metric-subtext">
              Gender Distribution
            </span>
          </div>
        </div>

        <div className="student-metric-card">
          <div className="student-metric-icon-box student-girls-icon">
            <Users size={21} />
          </div>

          <div className="student-metric-content">
            <span className="student-metric-label">
              Girls
            </span>

            <strong className="student-metric-value">
              {students.filter((s) => s.gender === "Female").length}
            </strong>

            <span className="student-metric-subtext">
              Gender Distribution
            </span>
          </div>
        </div>

        <div className="student-metric-card">
          <div className="student-metric-icon-box student-admission-icon">
            <UserPlus size={21} />
          </div>

          <div className="student-metric-content">
            <span className="student-metric-label">
              New Admissions
            </span>

            <strong className="student-metric-value">
              18
            </strong>

            <span className="student-metric-subtext">
              This Month
            </span>
          </div>
        </div>

        <div className="student-metric-card">
          <div className="student-metric-icon-box student-active-icon">
            <UserCheck size={21} />
          </div>

          <div className="student-metric-content">
            <span className="student-metric-label">
              Active Students
            </span>

            <strong className="student-metric-value">
              {students.filter((s) => s.status === "Active").length}
            </strong>

            <span className="student-metric-subtext">
              Operational
            </span>
          </div>
        </div>
      </div>

      {/* ================= TOOLBAR ================= */}

      <div className="students-toolbar-card">
        <div className="students-filter-group">
          <div className="students-filter-item">
            <label>Class</label>

            <div className="students-select-wrapper">
              <select
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Classes</option>
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                <option value="Class 3">Class 3</option>
              </select>

              <ChevronDown size={15} />
            </div>
          </div>

          <div className="students-filter-item">
            <label>Section</label>

            <div className="students-select-wrapper">
              <select
                value={selectedSection}
                onChange={(e) => {
                  setSelectedSection(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Sections</option>
                <option value="A">Section A</option>
                <option value="B">Section B</option>
              </select>

              <ChevronDown size={15} />
            </div>
          </div>

          <div className="students-filter-item">
            <label>Status</label>

            <div className="students-select-wrapper">
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <ChevronDown size={15} />
            </div>
          </div>

          <div className="students-filter-item">
            <label>Gender</label>

            <div className="students-select-wrapper">
              <select
                value={selectedGender}
                onChange={(e) => {
                  setSelectedGender(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <ChevronDown size={15} />
            </div>
          </div>

          <div className="students-filter-item students-search-filter-item">
            <label>Search</label>

            <div className="students-search-box">
              <Search size={17} />

              <input
                type="text"
                placeholder="Search student, adm no..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          <div className="students-filter-item students-more-filter-item">
            <label>&nbsp;</label>

            <button
              className={`students-more-filter-btn ${
                showMoreFilters ? "active" : ""
              }`}
              onClick={() =>
                setShowMoreFilters((prev) => !prev)
              }
            >
              <SlidersHorizontal size={16} />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        <button
          className="students-add-main-btn"
          onClick={openAddAdmission}
        >
          <span>+</span>
          Add Student
        </button>
      </div>

      {/* ================= ADVANCED FILTER ================= */}

      {showMoreFilters && (
        <div className="students-advanced-filter-panel">
          <div className="students-advanced-header">
            <div>
              <h4>
                <Filter size={16} />
                Advanced Filters
              </h4>

              <p>
                Refine the student list using additional filters.
              </p>
            </div>

            <button onClick={resetAllFilters}>
              Reset All Filters
            </button>
          </div>

          <div className="students-advanced-grid">
            <div className="students-form-group">
              <label>Blood Group</label>

              <select
                value={bloodGroupFilter}
                onChange={(e) => {
                  setBloodGroupFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Blood Groups</option>
                <option value="O+">O+</option>
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="AB+">AB+</option>
                <option value="A-">A-</option>
                <option value="B-">B-</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* ================= TABLE ================= */}

      <div className="students-table-card">
        <div className="students-table-header">
          <div>
            <h3>Students List</h3>
            <p>View and manage all student details</p>
          </div>

          <div className="students-table-header-actions">
            {selectedIds.length > 0 && (
              <button
                className="students-bulk-delete-btn"
                onClick={handleBulkDelete}
              >
                <Trash2 size={15} />
                Delete Selected
              </button>
            )}

            <button
              className="students-outline-action-btn"
              onClick={handleExport}
            >
              <Download size={15} />
              <span>Export</span>
            </button>

            <button
              className="students-outline-action-btn"
              onClick={() => setModalMode("columns")}
            >
              <Columns3 size={15} />
              <span>Columns</span>
            </button>
          </div>
        </div>

        <div className="students-table-responsive">
          <table className="students-data-table">
            <thead>
              <tr>
                <th className="students-checkbox-column">
                  <input
                    type="checkbox"
                    checked={allVisibleSelected}
                    onChange={toggleSelectAll}
                    aria-label="Select all students"
                  />
                </th>

                {visibleColumns.student && <th>Student</th>}
                {visibleColumns.admNo && <th>Admission No.</th>}
                {visibleColumns.classSection && (
                  <th>Class / Section</th>
                )}
                {visibleColumns.rollNo && <th>Roll No.</th>}
                {visibleColumns.gender && <th>Gender</th>}
                {visibleColumns.dob && <th>Date of Birth</th>}
                {visibleColumns.parent && <th>Parent Name</th>}
                {visibleColumns.status && <th>Status</th>}

                <th className="students-action-column">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedStudents.length > 0 ? (
                paginatedStudents.map((student) => {
                  const isSelected = selectedIds.includes(student.id);

                  return (
                    <tr
                      key={student.id}
                      className={
                        isSelected
                          ? "students-row-selected"
                          : ""
                      }
                    >
                      <td className="students-checkbox-column">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() =>
                            toggleSelectStudent(student.id)
                          }
                          aria-label={`Select ${student.name}`}
                        />
                      </td>

                      {visibleColumns.student && (
                        <td>
                          <div className="student-profile-cell">
                            <img
                              src={student.photo || DEFAULT_STUDENT_IMAGE}
                              alt={student.name}
                              className="student-avatar-img"
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = DEFAULT_STUDENT_IMAGE;
                              }}
                            />

                            <div className="student-profile-info">
                              <span className="student-name-text">
                                {student.name}
                              </span>

                              <span className="student-mobile-adm">
                                {student.admNo}
                              </span>
                            </div>
                          </div>
                        </td>
                      )}

                      {visibleColumns.admNo && (
                        <td className="student-admission-number">
                          {student.admNo}
                        </td>
                      )}

                      {visibleColumns.classSection && (
                        <td>
                          <span className="student-class-badge">
                            {student.class} - {student.section}
                          </span>
                        </td>
                      )}

                      {visibleColumns.rollNo && (
                        <td className="student-roll-number">
                          {student.rollNo}
                        </td>
                      )}

                      {visibleColumns.gender && (
                        <td>
                          <span
                            className={`student-gender-badge ${
                              student.gender === "Male"
                                ? "male"
                                : "female"
                            }`}
                          >
                            <span>
                              {student.gender === "Male"
                                ? "♂"
                                : "♀"}
                            </span>

                            {student.gender}
                          </span>
                        </td>
                      )}

                      {visibleColumns.dob && (
                        <td className="student-dob-cell">
                          {student.dob}
                        </td>
                      )}

                      {visibleColumns.parent && (
                        <td className="student-parent-cell">
                          {student.parent}
                        </td>
                      )}

                      {visibleColumns.status && (
                        <td>
                          <span
                            className={`student-status-badge ${
                              student.status === "Active"
                                ? "active"
                                : "inactive"
                            }`}
                          >
                            <span className="student-status-dot" />
                            {student.status}
                          </span>
                        </td>
                      )}

                      {/* ACTIONS */}
                      <td className="students-action-cell">
                        <div className="students-action-buttons">
                          {/* VIEW */}
                          <button
                            type="button"
                            className="students-action-btn students-view-btn"
                            title="View Student"
                            onClick={() =>
                              openViewModal(student)
                            }
                          >
                            <Eye size={16} />
                          </button>

                          {/* EDIT */}
                          <button
                            type="button"
                            className="students-action-btn students-edit-btn"
                            title="Edit Student"
                            onClick={() =>
                              openEditModal(student)
                            }
                          >
                            <Pencil size={16} />
                          </button>

                          {/* DELETE */}
                          <button
                            type="button"
                            className="students-action-btn students-delete-btn"
                            title="Delete Student"
                            onClick={() =>
                              handleDelete(student.id)
                            }
                          >
                            <Trash2 size={16} />
                          </button>

                          {/* ACTIVE / INACTIVE */}
                          <button
                            type="button"
                            className={`students-status-action-btn ${
                              student.status === "Active"
                                ? "students-deactivate-btn"
                                : "students-activate-btn"
                            }`}
                            title={
                              student.status === "Active"
                                ? "Set Inactive"
                                : "Set Active"
                            }
                            onClick={() =>
                              toggleStudentStatus(student.id)
                            }
                          >
                            {student.status === "Active" ? (
                              <>
                                <span className="students-action-status-dot" />
                                <span>Active</span>
                              </>
                            ) : (
                              <>
                                <Check size={13} />
                                <span>Activate</span>
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={10}
                    className="students-no-records"
                  >
                    <div>
                      <UserRound size={32} />
                      <strong>No students found</strong>
                      <span>
                        Try changing your search or filter
                        criteria.
                      </span>

                      <button onClick={resetAllFilters}>
                        Reset Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ================= PAGINATION ================= */}

        <div className="students-pagination-footer">
          <div className="students-pagination-info">
            Showing{" "}
            <strong>
              {firstEntry}-{lastEntry}
            </strong>{" "}
            of <strong>{filteredStudents.length}</strong>{" "}
            entries
          </div>

          <div className="students-pagination-right">
            <div className="students-per-page">
              <span>Rows:</span>

              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="students-pagination-controls">
              <button
                className="students-pagination-arrow"
                disabled={safeCurrentPage === 1}
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.max(1, prev - 1)
                  )
                }
              >
                <ChevronLeft size={16} />
              </button>

              {getPageNumbers().map((page, index) =>
                page === "..." ? (
                  <span
                    key={`dots-${index}`}
                    className="students-pagination-dots"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    className={`students-pagination-number ${
                      safeCurrentPage === page
                        ? "active"
                        : ""
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                className="students-pagination-arrow"
                disabled={safeCurrentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(totalPages, prev + 1)
                  )
                }
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= COLUMNS MODAL ================= */}

      {modalMode === "columns" && (
        <div
          className="students-modal-overlay"
          onClick={() => setModalMode(null)}
        >
          <div
            className="students-modal-card students-columns-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="students-modal-header">
              <div>
                <span className="students-modal-eyebrow">
                  TABLE SETTINGS
                </span>

                <h2>Toggle Columns</h2>

                <p>
                  Choose which columns should appear in
                  the student table.
                </p>
              </div>

              <button
                className="students-modal-close"
                onClick={() => setModalMode(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="students-modal-body">
              <div className="students-columns-list">
                {Object.keys(visibleColumns).map((column) => (
                  <label
                    key={column}
                    className="students-column-toggle"
                  >
                    <input
                      type="checkbox"
                      checked={visibleColumns[column]}
                      onChange={() =>
                        setVisibleColumns((prev) => ({
                          ...prev,
                          [column]: !prev[column],
                        }))
                      }
                    />

                    <span className="students-custom-checkbox">
                      <Check size={13} />
                    </span>

                    <span>
                      {column
                        .charAt(0)
                        .toUpperCase() +
                        column
                          .slice(1)
                          .replace(
                            /([A-Z])/g,
                            " $1"
                          )}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="students-modal-footer">
              <button
                className="students-modal-cancel-btn"
                onClick={() => setModalMode(null)}
              >
                Cancel
              </button>

              <button
                className="students-modal-primary-btn"
                onClick={() => setModalMode(null)}
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= VIEW MODAL ================= */}

      {modalMode === "view" && selectedStudent && (
        <div
          className="students-modal-overlay"
          onClick={() => setModalMode(null)}
        >
          <div
            className="students-modal-card students-view-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="students-modal-header">
              <div>
                <span className="students-modal-eyebrow">
                  STUDENT PROFILE
                </span>

                <h2>Student Details</h2>

                <p>
                  Complete information about this student.
                </p>
              </div>

              <button
                className="students-modal-close"
                onClick={() => setModalMode(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="students-modal-body">
              <div className="students-profile-hero">
                <img
                  src={selectedStudent.photo || DEFAULT_STUDENT_IMAGE}
                  alt={selectedStudent.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = DEFAULT_STUDENT_IMAGE;
                  }}
                />

                <div>
                  <h3>{selectedStudent.name}</h3>

                  <p>
                    {selectedStudent.admNo}
                  </p>

                  <span>
                    {selectedStudent.class} • Section{" "}
                    {selectedStudent.section}
                  </span>
                </div>

                <span
                  className={`student-status-badge ${
                    selectedStudent.status === "Active"
                      ? "active"
                      : "inactive"
                  }`}
                >
                  <span className="student-status-dot" />
                  {selectedStudent.status}
                </span>
              </div>

              <div className="students-details-grid">
                <div>
                  <span>Roll Number</span>
                  <strong>
                    {selectedStudent.rollNo}
                  </strong>
                </div>

                <div>
                  <span>Gender</span>
                  <strong>
                    {selectedStudent.gender}
                  </strong>
                </div>

                <div>
                  <span>Date of Birth</span>
                  <strong>{selectedStudent.dob}</strong>
                </div>

                <div>
                  <span>Blood Group</span>
                  <strong>
                    {selectedStudent.bloodGroup ||
                      "N/A"}
                  </strong>
                </div>

                <div>
                  <span>Parent Name</span>
                  <strong>
                    {selectedStudent.parent}
                  </strong>
                </div>

                <div>
                  <span>Phone</span>
                  <strong>
                    {selectedStudent.phone || "N/A"}
                  </strong>
                </div>

                <div>
                  <span>Email</span>
                  <strong>
                    {selectedStudent.email || "N/A"}
                  </strong>
                </div>

                <div className="students-details-full">
                  <span>Address</span>
                  <strong>
                    {selectedStudent.address || "N/A"}
                  </strong>
                </div>
              </div>
            </div>

            <div className="students-modal-footer">
              <button
                className="students-modal-cancel-btn"
                onClick={() => setModalMode(null)}
              >
                Close
              </button>

              <button
                className="students-modal-primary-btn"
                onClick={() =>
                  openEditModal(selectedStudent)
                }
              >
                <Pencil size={15} />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPage;