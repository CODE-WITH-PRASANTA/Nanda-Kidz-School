import React, { useMemo, useState } from "react";
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

const initialStudentsData = [
  {
    id: 1,
    name: "Aarav Sharma",
    admNo: "ADM2025001",
    class: "Class 1",
    section: "A",
    rollNo: "01",
    gender: "Male",
    dob: "12 May 2018",
    parent: "Rahul Sharma",
    status: "Active",
    phone: "9876543210",
    email: "rahul@example.com",
    bloodGroup: "O+",
    address: "123 Park Street, New Delhi",
  },
  {
    id: 2,
    name: "Ananya Singh",
    admNo: "ADM2025002",
    class: "Class 1",
    section: "A",
    rollNo: "02",
    gender: "Female",
    dob: "23 Jul 2018",
    parent: "Pooja Singh",
    status: "Active",
    phone: "9876543211",
    email: "pooja@example.com",
    bloodGroup: "A+",
    address: "456 MG Road, Mumbai",
  },
  {
    id: 3,
    name: "Vihaan Verma",
    admNo: "ADM2025003",
    class: "Class 1",
    section: "B",
    rollNo: "01",
    gender: "Male",
    dob: "16 Mar 2018",
    parent: "Amit Verma",
    status: "Active",
    phone: "9876543212",
    email: "amit@example.com",
    bloodGroup: "B+",
    address: "789 Ring Road, Bangalore",
  },
  {
    id: 4,
    name: "Diya Patel",
    admNo: "ADM2025004",
    class: "Class 2",
    section: "A",
    rollNo: "05",
    gender: "Female",
    dob: "09 Sep 2017",
    parent: "Nilesh Patel",
    status: "Active",
    phone: "9876543213",
    email: "nilesh@example.com",
    bloodGroup: "O+",
    address: "321 Ashram Road, Ahmedabad",
  },
  {
    id: 5,
    name: "Krish Gupta",
    admNo: "ADM2025005",
    class: "Class 2",
    section: "B",
    rollNo: "03",
    gender: "Male",
    dob: "02 Jan 2017",
    parent: "Rohit Gupta",
    status: "Active",
    phone: "9876543214",
    email: "rohit@example.com",
    bloodGroup: "AB+",
    address: "654 Civil Lines, Jaipur",
  },
  {
    id: 6,
    name: "Myra Iyer",
    admNo: "ADM2025006",
    class: "Class 3",
    section: "A",
    rollNo: "07",
    gender: "Female",
    dob: "11 Nov 2016",
    parent: "Sandeep Iyer",
    status: "Active",
    phone: "9876543215",
    email: "sandeep@example.com",
    bloodGroup: "A-",
    address: "987 Anna Salai, Chennai",
  },
  {
    id: 7,
    name: "Arjun Nair",
    admNo: "ADM2025007",
    class: "Class 3",
    section: "B",
    rollNo: "02",
    gender: "Male",
    dob: "30 Apr 2016",
    parent: "Vivek Nair",
    status: "Inactive",
    phone: "9876543216",
    email: "vivek@example.com",
    bloodGroup: "B-",
    address: "147 MG Road, Kochi",
  },
];

const avatarList = [
  "https://i.pravatar.cc/100?img=11",
  "https://i.pravatar.cc/100?img=32",
  "https://i.pravatar.cc/100?img=12",
  "https://i.pravatar.cc/100?img=47",
  "https://i.pravatar.cc/100?img=13",
  "https://i.pravatar.cc/100?img=44",
  "https://i.pravatar.cc/100?img=15",
];

const StudentPage = () => {
  const [students, setStudents] = useState(initialStudentsData);

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

  const [formData, setFormData] = useState({
    admNo: "",
    rollNo: "",
    firstName: "",
    lastName: "",
    dob: "",
    class: "",
    section: "",
    gender: "",
    bloodGroup: "",
    parent: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      admNo: "",
      rollNo: "",
      firstName: "",
      lastName: "",
      dob: "",
      class: "",
      section: "",
      gender: "",
      bloodGroup: "",
      parent: "",
      phone: "",
      email: "",
      address: "",
    });
  };

  const openAddModal = () => {
    resetForm();
    setSelectedStudent(null);
    setModalMode("add");
  };

  const openEditModal = (student) => {
    setSelectedStudent(student);

    const nameParts = student.name.trim().split(" ");

    setFormData({
      admNo: student.admNo || "",
      rollNo: student.rollNo || "",
      firstName: nameParts[0] || "",
      lastName: nameParts.slice(1).join(" ") || "",
      dob: student.dob || "",
      class: student.class?.replace("Class ", "") || "",
      section: student.section || "",
      gender: student.gender || "",
      bloodGroup: student.bloodGroup || "",
      parent: student.parent || "",
      phone: student.phone || "",
      email: student.email || "",
      address: student.address || "",
    });

    setModalMode("edit");
  };

  const openViewModal = (student) => {
    setSelectedStudent(student);
    setModalMode("view");
  };

  const handleDelete = (id) => {
    const student = students.find((item) => item.id === id);

    if (!student) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${student.name}?`
    );

    if (!confirmed) return;

    setStudents((prev) => prev.filter((student) => student.id !== id));

    setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));

    if (selectedStudent?.id === id) {
      setSelectedStudent(null);
      setModalMode(null);
    }
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;

    const confirmed = window.confirm(
      `Delete ${selectedIds.length} selected student(s)?`
    );

    if (!confirmed) return;

    setStudents((prev) =>
      prev.filter((student) => !selectedIds.includes(student.id))
    );

    setSelectedIds([]);
  };

  const toggleStudentStatus = (id) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? {
              ...student,
              status: student.status === "Active" ? "Inactive" : "Active",
            }
          : student
      )
    );
  };

  const handleSaveStudent = (e) => {
    e.preventDefault();

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    if (modalMode === "add") {
      const newStudent = {
        id: Date.now(),
        name: fullName || "New Student",
        admNo:
          formData.admNo ||
          `ADM2025${Math.floor(100 + Math.random() * 900)}`,
        class: `Class ${formData.class}`,
        section: formData.section || "A",
        rollNo: formData.rollNo || "01",
        gender: formData.gender || "Male",
        dob: formData.dob || "01 Jan 2018",
        parent: formData.parent || "Guardian",
        status: "Active",
        phone: formData.phone || "",
        email: formData.email || "",
        bloodGroup: formData.bloodGroup || "",
        address: formData.address || "",
      };

      setStudents((prev) => [newStudent, ...prev]);
      setCurrentPage(1);
    }

    if (modalMode === "edit" && selectedStudent) {
      setStudents((prev) =>
        prev.map((student) =>
          student.id === selectedStudent.id
            ? {
                ...student,
                name: fullName,
                admNo: formData.admNo,
                class: `Class ${formData.class}`,
                section: formData.section,
                rollNo: formData.rollNo,
                gender: formData.gender,
                dob: formData.dob,
                parent: formData.parent,
                phone: formData.phone,
                email: formData.email,
                bloodGroup: formData.bloodGroup,
                address: formData.address,
              }
            : student
        )
      );
    }

    setModalMode(null);
    setSelectedStudent(null);
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

  const getAvatar = (id) => {
    return avatarList[(id - 1) % avatarList.length];
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
          onClick={openAddModal}
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
                              src={getAvatar(student.id)}
                              alt={student.name}
                              className="student-avatar-img"
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

      {/* ================= ADD / EDIT MODAL ================= */}

      {(modalMode === "add" || modalMode === "edit") && (
        <div
          className="students-modal-overlay"
          onClick={() => setModalMode(null)}
        >
          <div
            className="students-modal-card students-form-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="students-modal-header">
              <div>
                <span className="students-modal-eyebrow">
                  STUDENT MANAGEMENT
                </span>

                <h2>
                  {modalMode === "add"
                    ? "Add Student"
                    : "Edit Student"}
                </h2>

                <p>
                  Enter and manage the student information
                  below.
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
              <form
                id="studentForm"
                onSubmit={handleSaveStudent}
                className="students-form-grid"
              >
                <div className="students-form-group">
                  <label>
                    Admission No.{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="admNo"
                    value={formData.admNo}
                    onChange={handleInputChange}
                    placeholder="Enter admission number"
                    required
                  />
                </div>

                <div className="students-form-group">
                  <label>
                    Roll No. <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="rollNo"
                    value={formData.rollNo}
                    onChange={handleInputChange}
                    placeholder="Enter roll number"
                    required
                  />
                </div>

                <div className="students-form-group">
                  <label>
                    First Name <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                    required
                  />
                </div>

                <div className="students-form-group">
                  <label>Last Name</label>

                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                  />
                </div>

                <div className="students-form-group">
                  <label>
                    Date of Birth <span>*</span>
                  </label>

                  <div className="students-input-icon-wrapper">
                    <input
                      type="text"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      placeholder="dd mmm yyyy"
                      required
                    />

                    <CalendarDays size={17} />
                  </div>
                </div>

                <div className="students-form-group">
                  <label>
                    Class <span>*</span>
                  </label>

                  <div className="students-input-icon-wrapper">
                    <select
                      name="class"
                      value={formData.class}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">
                        Select class
                      </option>
                      <option value="1">Class 1</option>
                      <option value="2">Class 2</option>
                      <option value="3">Class 3</option>
                    </select>

                    <ChevronDown size={17} />
                  </div>
                </div>

                <div className="students-form-group">
                  <label>
                    Section <span>*</span>
                  </label>

                  <div className="students-input-icon-wrapper">
                    <select
                      name="section"
                      value={formData.section}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">
                        Select section
                      </option>
                      <option value="A">
                        Section A
                      </option>
                      <option value="B">
                        Section B
                      </option>
                    </select>

                    <ChevronDown size={17} />
                  </div>
                </div>

                <div className="students-form-group">
                  <label>
                    Gender <span>*</span>
                  </label>

                  <div className="students-input-icon-wrapper">
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
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
                    </select>

                    <ChevronDown size={17} />
                  </div>
                </div>

                <div className="students-form-group">
                  <label>Blood Group</label>

                  <div className="students-input-icon-wrapper">
                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleInputChange}
                    >
                      <option value="">
                        Select blood group
                      </option>
                      <option value="O+">O+</option>
                      <option value="A+">A+</option>
                      <option value="B+">B+</option>
                      <option value="AB+">AB+</option>
                      <option value="A-">A-</option>
                      <option value="B-">B-</option>
                    </select>

                    <Droplets size={17} />
                  </div>
                </div>

                <div className="students-form-group">
                  <label>
                    Parent Name <span>*</span>
                  </label>

                  <div className="students-input-icon-wrapper">
                    <input
                      type="text"
                      name="parent"
                      value={formData.parent}
                      onChange={handleInputChange}
                      placeholder="Enter parent name"
                      required
                    />
                  </div>
                </div>

                <div className="students-form-group">
                  <label>
                    Phone Number <span>*</span>
                  </label>

                  <div className="students-input-icon-wrapper">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      required
                    />

                    <Phone size={16} />
                  </div>
                </div>

                <div className="students-form-group">
                  <label>Email</label>

                  <div className="students-input-icon-wrapper">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter email address"
                    />

                    <Mail size={16} />
                  </div>
                </div>

                <div className="students-form-group students-full-width">
                  <label>Address</label>

                  <div className="students-input-icon-wrapper students-textarea-wrapper">
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter full address"
                      rows="3"
                    />
                    <MapPin size={16} />
                  </div>
                </div>
              </form>
            </div>

            <div className="students-modal-footer">
              <button
                className="students-modal-cancel-btn"
                onClick={() => setModalMode(null)}
              >
                Cancel
              </button>

              <button
                type="submit"
                form="studentForm"
                className="students-modal-primary-btn"
              >
                {modalMode === "add"
                  ? "Save Student"
                  : "Update Student"}
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
                  src={getAvatar(selectedStudent.id)}
                  alt={selectedStudent.name}
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