import React, { useEffect, useMemo, useState } from "react";
import {
  FaUserFriends,
  FaUserCheck,
  FaUserTimes,
  FaCalendarMinus,
  FaClock,
  FaSearch,
  FaDownload,
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaTimes,
  FaCheck,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaMapMarkerAlt,
  FaRegClock,
  FaUser,
  FaRegSquare,
  FaCheckSquare,
  FaPlus,
  FaSave,
} from "react-icons/fa";

import "./TeachersAttendance.css";

const INITIAL_TEACHERS = [
  {
    id: 1,
    name: "Anita Sharma",
    employeeId: "TCH001",
    department: "Primary Wing",
    punchIn: "08:02 AM",
    punchOut: "04:15 PM",
    workingHours: "08h 13m",
    status: "Present",
    attendance: 100,
    punchInLocation: "Main Gate",
    punchOutLocation: "Main Gate",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  },
  {
    id: 2,
    name: "Priya Nair",
    employeeId: "TCH003",
    department: "Primary Wing",
    punchIn: "08:10 AM",
    punchOut: "04:20 PM",
    workingHours: "08h 10m",
    status: "Present",
    attendance: 100,
    punchInLocation: "Main Gate",
    punchOutLocation: "Main Gate",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop",
  },
  {
    id: 3,
    name: "Neha Joshi",
    employeeId: "TCH007",
    department: "Primary Wing",
    punchIn: "08:00 AM",
    punchOut: "04:05 PM",
    workingHours: "08h 05m",
    status: "Present",
    attendance: 100,
    punchInLocation: "Main Gate",
    punchOutLocation: "Main Gate",
    avatar:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop",
  },
  {
    id: 4,
    name: "Kavita Das",
    employeeId: "TCH009",
    department: "Primary Wing",
    punchIn: "08:15 AM",
    punchOut: "04:10 PM",
    workingHours: "07h 55m",
    status: "Present",
    attendance: 95,
    punchInLocation: "Main Gate",
    punchOutLocation: "Main Gate",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
  },
  {
    id: 5,
    name: "Rahul Mehta",
    employeeId: "TCH012",
    department: "Secondary Wing",
    punchIn: "08:25 AM",
    punchOut: "04:20 PM",
    workingHours: "07h 55m",
    status: "Present",
    attendance: 96,
    punchInLocation: "Main Gate",
    punchOutLocation: "Main Gate",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
  },
  {
    id: 6,
    name: "Sonia Patel",
    employeeId: "TCH015",
    department: "Secondary Wing",
    punchIn: "-",
    punchOut: "-",
    workingHours: "00h 00m",
    status: "Absent",
    attendance: 0,
    punchInLocation: "-",
    punchOutLocation: "-",
    avatar:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop",
  },
  {
    id: 7,
    name: "Rakesh Kumar",
    employeeId: "TCH018",
    department: "Secondary Wing",
    punchIn: "08:05 AM",
    punchOut: "12:10 PM",
    workingHours: "04h 05m",
    status: "Half Day",
    attendance: 50,
    punchInLocation: "Main Gate",
    punchOutLocation: "Main Gate",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  },
  {
    id: 8,
    name: "Meena Singh",
    employeeId: "TCH020",
    department: "Senior Wing",
    punchIn: "-",
    punchOut: "-",
    workingHours: "00h 00m",
    status: "On Leave",
    attendance: 0,
    punchInLocation: "-",
    punchOutLocation: "-",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
  },
  {
    id: 9,
    name: "Amit Verma",
    employeeId: "TCH022",
    department: "Senior Wing",
    punchIn: "08:12 AM",
    punchOut: "04:00 PM",
    workingHours: "07h 48m",
    status: "Present",
    attendance: 98,
    punchInLocation: "Main Gate",
    punchOutLocation: "Main Gate",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
  },
  {
    id: 10,
    name: "Pooja Mishra",
    employeeId: "TCH025",
    department: "Senior Wing",
    punchIn: "08:20 AM",
    punchOut: "04:15 PM",
    workingHours: "07h 55m",
    status: "Present",
    attendance: 97,
    punchInLocation: "Main Gate",
    punchOutLocation: "Main Gate",
    avatar:
      "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=150&h=150&fit=crop",
  },
];

const STATUS_OPTIONS = [
  {
    label: "Present",
    icon: <FaCheck />,
  },
  {
    label: "Absent",
    icon: <FaTimes />,
  },
  {
    label: "Half Day",
    icon: <FaCalendarMinus />,
  },
  {
    label: "On Leave",
    icon: <FaCalendarMinus />,
  },
];

const EMPTY_FORM = {
  name: "",
  employeeId: "",
  department: "Primary Wing",
  status: "Present",
  punchIn: "08:00 AM",
  punchOut: "04:00 PM",
  punchInLocation: "Main Gate",
  punchOutLocation: "Main Gate",
};

const getWorkingMinutes = (value) => {
  const match = String(value).match(/(\d+)h\s*(\d+)m/);

  if (!match) return 0;

  return Number(match[1]) * 60 + Number(match[2]);
};

const formatMinutes = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${String(hours).padStart(2, "0")}h ${String(mins).padStart(
    2,
    "0"
  )}m`;
};

const convertTimeToMinutes = (time) => {
  if (!time || time === "-") return null;

  const match = String(time)
    .trim()
    .match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

  if (!match) return null;

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3].toUpperCase();

  if (period === "AM" && hours === 12) {
    hours = 0;
  }

  if (period === "PM" && hours !== 12) {
    hours += 12;
  }

  return hours * 60 + minutes;
};

const calculateWorkingHours = (punchIn, punchOut, status) => {
  if (status !== "Present" && status !== "Half Day") {
    return "00h 00m";
  }

  const start = convertTimeToMinutes(punchIn);
  const end = convertTimeToMinutes(punchOut);

  if (start === null || end === null || end <= start) {
    return status === "Half Day" ? "04h 00m" : "00h 00m";
  }

  return formatMinutes(end - start);
};

const getAttendanceByStatus = (status) => {
  if (status === "Present") return 100;
  if (status === "Half Day") return 50;

  return 0;
};

const TeachersAttendance = () => {
  const [teachers, setTeachers] = useState(INITIAL_TEACHERS);

  const [selectedDate, setSelectedDate] = useState("2025-05-08");
  const [departmentFilter, setDepartmentFilter] =
    useState("All Departments");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [selectedTeacherIds, setSelectedTeacherIds] = useState([]);
  const [activeMenuId, setActiveMenuId] = useState(null);

  const [viewTeacherModal, setViewTeacherModal] = useState(null);
  const [editTeacherModal, setEditTeacherModal] = useState(null);

  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);
  const [newTeacher, setNewTeacher] = useState(EMPTY_FORM);

  const departments = useMemo(
    () => [
      "All Departments",
      ...new Set(teachers.map((teacher) => teacher.department)),
    ],
    [teachers]
  );

  const filteredTeachers = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return teachers.filter((teacher) => {
      const matchesDepartment =
        departmentFilter === "All Departments" ||
        teacher.department === departmentFilter;

      const matchesStatus =
        statusFilter === "All Status" ||
        teacher.status === statusFilter;

      const matchesSearch =
        !search ||
        teacher.name.toLowerCase().includes(search) ||
        teacher.employeeId.toLowerCase().includes(search) ||
        teacher.department.toLowerCase().includes(search);

      return matchesDepartment && matchesStatus && matchesSearch;
    });
  }, [teachers, departmentFilter, statusFilter, searchTerm]);

  const totalTeachers = teachers.length;

  const presentCount = teachers.filter(
    (teacher) => teacher.status === "Present"
  ).length;

  const absentCount = teachers.filter(
    (teacher) => teacher.status === "Absent"
  ).length;

  const leaveCount = teachers.filter(
    (teacher) =>
      teacher.status === "On Leave" || teacher.status === "Half Day"
  ).length;

  const averageWorkingMinutes =
    teachers.length > 0
      ? Math.round(
          teachers.reduce(
            (total, teacher) =>
              total + getWorkingMinutes(teacher.workingHours),
            0
          ) / teachers.length
        )
      : 0;

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTeachers.length / itemsPerPage)
  );

  const paginatedTeachers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    return filteredTeachers.slice(
      startIndex,
      startIndex + itemsPerPage
    );
  }, [filteredTeachers, currentPage, itemsPerPage]);

  const allFilteredSelected =
    filteredTeachers.length > 0 &&
    filteredTeachers.every((teacher) =>
      selectedTeacherIds.includes(teacher.id)
    );

  const selectedTeachers = teachers.filter((teacher) =>
    selectedTeacherIds.includes(teacher.id)
  );

  useEffect(() => {
    setSelectedTeacherIds((previous) =>
      previous.filter((id) =>
        teachers.some((teacher) => teacher.id === id)
      )
    );
  }, [teachers]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleToggleTeacher = (id) => {
    setSelectedTeacherIds((previous) =>
      previous.includes(id)
        ? previous.filter((teacherId) => teacherId !== id)
        : [...previous, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (allFilteredSelected) {
      setSelectedTeacherIds((previous) =>
        previous.filter(
          (id) =>
            !filteredTeachers.some(
              (teacher) => teacher.id === id
            )
        )
      );

      return;
    }

    setSelectedTeacherIds((previous) => [
      ...new Set([
        ...previous,
        ...filteredTeachers.map((teacher) => teacher.id),
      ]),
    ]);
  };

  const handleStatusChange = (id, status) => {
    setTeachers((previous) =>
      previous.map((teacher) =>
        teacher.id === id
          ? {
              ...teacher,
              status,
              attendance: getAttendanceByStatus(status),
              workingHours: calculateWorkingHours(
                teacher.punchIn,
                teacher.punchOut,
                status
              ),
              ...(status === "Absent" || status === "On Leave"
                ? {
                    punchIn: "-",
                    punchOut: "-",
                    punchInLocation: "-",
                    punchOutLocation: "-",
                  }
                : {}),
            }
          : teacher
      )
    );

    setActiveMenuId(null);
  };

  const handleDelete = (id) => {
    const teacher = teachers.find(
      (item) => item.id === id
    );

    if (!teacher) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${teacher.name}?`
    );

    if (!confirmed) return;

    setTeachers((previous) =>
      previous.filter(
        (teacherItem) => teacherItem.id !== id
      )
    );

    setSelectedTeacherIds((previous) =>
      previous.filter((teacherId) => teacherId !== id)
    );

    setActiveMenuId(null);
  };

  const handleSaveEdit = (event) => {
    event.preventDefault();

    if (!editTeacherModal) return;

    const updatedTeacher = {
      ...editTeacherModal,
      attendance: getAttendanceByStatus(
        editTeacherModal.status
      ),
      workingHours: calculateWorkingHours(
        editTeacherModal.punchIn,
        editTeacherModal.punchOut,
        editTeacherModal.status
      ),
    };

    setTeachers((previous) =>
      previous.map((teacher) =>
        teacher.id === updatedTeacher.id
          ? updatedTeacher
          : teacher
      )
    );

    setEditTeacherModal(null);
  };

  const handleNewTeacherChange = (event) => {
    const { name, value } = event.target;

    setNewTeacher((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAddTeacher = (event) => {
    event.preventDefault();

    const trimmedName = newTeacher.name.trim();
    const trimmedEmployeeId =
      newTeacher.employeeId.trim();

    if (!trimmedName || !trimmedEmployeeId) {
      return;
    }

    const employeeExists = teachers.some(
      (teacher) =>
        teacher.employeeId.toLowerCase() ===
        trimmedEmployeeId.toLowerCase()
    );

    if (employeeExists) {
      alert("This Employee ID already exists.");
      return;
    }

    const id =
      teachers.length > 0
        ? Math.max(...teachers.map((teacher) => teacher.id)) +
          1
        : 1;

    const status = newTeacher.status;

    const isAbsent =
      status === "Absent" || status === "On Leave";

    const teacher = {
      id,
      name: trimmedName,
      employeeId: trimmedEmployeeId,
      department: newTeacher.department,
      status,
      punchIn: isAbsent ? "-" : newTeacher.punchIn,
      punchOut: isAbsent ? "-" : newTeacher.punchOut,
      workingHours: calculateWorkingHours(
        isAbsent ? "-" : newTeacher.punchIn,
        isAbsent ? "-" : newTeacher.punchOut,
        status
      ),
      attendance: getAttendanceByStatus(status),
      punchInLocation: isAbsent
        ? "-"
        : newTeacher.punchInLocation || "Main Gate",
      punchOutLocation: isAbsent
        ? "-"
        : newTeacher.punchOutLocation || "Main Gate",
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        trimmedName
      )}&background=7052e8&color=ffffff&size=150`,
    };

    setTeachers((previous) => [
      teacher,
      ...previous,
    ]);

    setNewTeacher(EMPTY_FORM);
    setIsAddTeacherOpen(false);
    setCurrentPage(1);

    setDepartmentFilter("All Departments");
    setStatusFilter("All Status");
    setSearchTerm("");
  };

  const handleReset = () => {
    setSelectedDate("2025-05-08");
    setDepartmentFilter("All Departments");
    setStatusFilter("All Status");
    setSearchTerm("");
    setCurrentPage(1);
  };

  const escapeCsv = (value) =>
    `"${String(value ?? "").replace(/"/g, '""')}"`;

  const handleExportCSV = () => {
    const exportTeachers =
      selectedTeachers.length > 0
        ? selectedTeachers
        : filteredTeachers;

    if (!exportTeachers.length) return;

    const headers = [
      "Teacher",
      "Employee ID",
      "Department",
      "Punch In",
      "Punch Out",
      "Working Hours",
      "Status",
      "Attendance",
    ];

    const rows = exportTeachers.map((teacher) => [
      teacher.name,
      teacher.employeeId,
      teacher.department,
      teacher.punchIn,
      teacher.punchOut,
      teacher.workingHours,
      teacher.status,
      `${teacher.attendance}%`,
    ]);

    const csvContent = [
      headers.map(escapeCsv).join(","),
      ...rows.map((row) =>
        row.map(escapeCsv).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `teachers-attendance${
      selectedTeachers.length ? "-selected" : ""
    }.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Present":
        return "teachers-attendance-status-present";

      case "Absent":
        return "teachers-attendance-status-absent";

      case "Half Day":
        return "teachers-attendance-status-half";

      case "On Leave":
        return "teachers-attendance-status-leave";

      default:
        return "";
    }
  };

  return (
    <div className="teachers-attendance-container">
      {/* PAGE HEADER */}
      <div className="teachers-attendance-page-header">
        <div>
          <h1 className="teachers-attendance-page-title">
            Teachers Attendance
          </h1>

          <p className="teachers-attendance-page-subtitle">
            View and manage daily teacher attendance
            records.
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="teachers-attendance-stats-grid">
        <div className="teachers-attendance-stat-card">
          <div className="teachers-attendance-stat-icon teachers-attendance-stat-purple">
            <FaUserFriends />
          </div>

          <div className="teachers-attendance-stat-content">
            <span>Total Teachers</span>
            <strong>{totalTeachers}</strong>
            <small>All teachers</small>
          </div>
        </div>

        <div className="teachers-attendance-stat-card">
          <div className="teachers-attendance-stat-icon teachers-attendance-stat-green">
            <FaUserCheck />
          </div>

          <div className="teachers-attendance-stat-content">
            <span>Present Today</span>
            <strong>{presentCount}</strong>
            <small>
              {totalTeachers
                ? Math.round(
                    (presentCount / totalTeachers) * 100
                  )
                : 0}
              % attendance
            </small>
          </div>
        </div>

        <div className="teachers-attendance-stat-card">
          <div className="teachers-attendance-stat-icon teachers-attendance-stat-red">
            <FaUserTimes />
          </div>

          <div className="teachers-attendance-stat-content">
            <span>Absent Today</span>
            <strong>{absentCount}</strong>
            <small>
              {totalTeachers
                ? Math.round(
                    (absentCount / totalTeachers) * 100
                  )
                : 0}
              % teachers
            </small>
          </div>
        </div>

        <div className="teachers-attendance-stat-card">
          <div className="teachers-attendance-stat-icon teachers-attendance-stat-orange">
            <FaCalendarMinus />
          </div>

          <div className="teachers-attendance-stat-content">
            <span>Leave / Half Day</span>
            <strong>{leaveCount}</strong>
            <small>Today's records</small>
          </div>
        </div>

        <div className="teachers-attendance-stat-card">
          <div className="teachers-attendance-stat-icon teachers-attendance-stat-blue">
            <FaClock />
          </div>

          <div className="teachers-attendance-stat-content">
            <span>Avg. Working Hours</span>
            <strong>
              {formatMinutes(averageWorkingMinutes)}
            </strong>
            <small>Today's average</small>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="teachers-attendance-filter-card">
        <div className="teachers-attendance-filter-header">
          <div>
            <h2>Attendance Filters</h2>
            <p>
              Filter attendance records quickly.
            </p>
          </div>

          <button
            type="button"
            className="teachers-attendance-reset-button"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>

        <div className="teachers-attendance-filter-grid">
          <div className="teachers-attendance-field">
            <label>Date</label>

            <div className="teachers-attendance-input-wrapper">
              <FaCalendarAlt />

              <input
                type="date"
                value={selectedDate}
                onChange={(event) => {
                  setSelectedDate(
                    event.target.value
                  );
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <div className="teachers-attendance-field">
            <label>Department</label>

            <select
              value={departmentFilter}
              onChange={(event) => {
                setDepartmentFilter(
                  event.target.value
                );
                setCurrentPage(1);
              }}
            >
              {departments.map((department) => (
                <option
                  key={department}
                  value={department}
                >
                  {department}
                </option>
              ))}
            </select>
          </div>

          <div className="teachers-attendance-field">
            <label>Status</label>

            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All Status">
                All Status
              </option>
              <option value="Present">
                Present
              </option>
              <option value="Absent">
                Absent
              </option>
              <option value="Half Day">
                Half Day
              </option>
              <option value="On Leave">
                On Leave
              </option>
            </select>
          </div>

          <div className="teachers-attendance-field teachers-attendance-search-field">
            <label>Search</label>

            <div className="teachers-attendance-input-wrapper">
              <FaSearch />

              <input
                type="text"
                placeholder="Search teacher, ID or department..."
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <button
            type="button"
            className="teachers-attendance-export-button"
            onClick={handleExportCSV}
          >
            <FaDownload />
            Export
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="teachers-attendance-table-card">
        <div className="teachers-attendance-table-header">
          <div>
            <h2>Teachers Attendance List</h2>
            <p>
              View and manage teacher attendance
            </p>
          </div>

          <div className="teachers-attendance-table-header-actions">
            {/* ADD TEACHER */}
            <button
              type="button"
              className="teachers-attendance-add-teacher-button"
              onClick={() =>
                setIsAddTeacherOpen(true)
              }
            >
              <FaPlus />
              Add Teacher
            </button>

            {/* SELECT ALL */}
            <button
              type="button"
              className="teachers-attendance-select-all-button"
              onClick={handleToggleSelectAll}
              disabled={!filteredTeachers.length}
            >
              {allFilteredSelected ? (
                <FaCheckSquare />
              ) : (
                <FaRegSquare />
              )}

              {allFilteredSelected
                ? "Clear All"
                : "Select All"}
            </button>

            <span className="teachers-attendance-record-count">
              {filteredTeachers.length} Records
            </span>
          </div>
        </div>

        {/* SELECTION BAR */}
        {selectedTeacherIds.length > 0 && (
          <div className="teachers-attendance-selection-bar">
            <div>
              <FaCheck />

              <strong>
                {selectedTeacherIds.length}
              </strong>

              <span>teachers selected</span>
            </div>

            <div className="teachers-attendance-selection-actions">
              <button
                type="button"
                onClick={handleExportCSV}
                className="teachers-attendance-selection-export"
              >
                <FaDownload />
                Export Selected
              </button>

              <button
                type="button"
                onClick={() =>
                  setSelectedTeacherIds([])
                }
                className="teachers-attendance-clear-selection"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}

        <div className="teachers-attendance-table-wrapper">
          <table className="teachers-attendance-table">
            <thead>
              <tr>
                <th className="teachers-attendance-checkbox-column">
                  <button
                    type="button"
                    className="teachers-attendance-header-checkbox"
                    onClick={handleToggleSelectAll}
                    disabled={!filteredTeachers.length}
                    aria-label="Select all teachers"
                  >
                    {allFilteredSelected ? (
                      <FaCheckSquare />
                    ) : (
                      <FaRegSquare />
                    )}
                  </button>
                </th>

                <th>Teacher</th>
                <th>Department</th>
                <th>Punch In</th>
                <th>Punch Out</th>
                <th>Working Hours</th>
                <th>Status</th>
                <th>Attendance</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {paginatedTeachers.length > 0 ? (
                paginatedTeachers.map((teacher) => (
                  <tr
                    key={teacher.id}
                    className={
                      selectedTeacherIds.includes(
                        teacher.id
                      )
                        ? "teachers-attendance-selected-row"
                        : ""
                    }
                  >
                    <td className="teachers-attendance-checkbox-column">
                      <input
                        type="checkbox"
                        className="teachers-attendance-row-checkbox"
                        checked={selectedTeacherIds.includes(
                          teacher.id
                        )}
                        onChange={() =>
                          handleToggleTeacher(
                            teacher.id
                          )
                        }
                        aria-label={`Select ${teacher.name}`}
                      />
                    </td>

                    <td>
                      <div className="teachers-attendance-teacher-cell">
                        <img
                          src={teacher.avatar}
                          alt={teacher.name}
                          className="teachers-attendance-avatar"
                        />

                        <div>
                          <strong>
                            {teacher.name}
                          </strong>

                          <span>
                            {teacher.employeeId}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="teachers-attendance-department">
                        {teacher.department}
                      </span>
                    </td>

                    <td>
                      <div className="teachers-attendance-time-cell">
                        <div>
                          <FaRegClock />
                          <strong>
                            {teacher.punchIn}
                          </strong>
                        </div>

                        {teacher.punchInLocation !==
                          "-" && (
                          <span>
                            <FaMapMarkerAlt />
                            {teacher.punchInLocation}
                          </span>
                        )}
                      </div>
                    </td>

                    <td>
                      <div className="teachers-attendance-time-cell">
                        <div>
                          <FaRegClock />
                          <strong>
                            {teacher.punchOut}
                          </strong>
                        </div>

                        {teacher.punchOutLocation !==
                          "-" && (
                          <span>
                            <FaMapMarkerAlt />
                            {teacher.punchOutLocation}
                          </span>
                        )}
                      </div>
                    </td>

                    <td>
                      <strong className="teachers-attendance-working-hours">
                        {teacher.workingHours}
                      </strong>
                    </td>

                    <td>
                      <div className="teachers-attendance-status-wrapper">
                        <button
                          type="button"
                          className={`teachers-attendance-status-badge ${getStatusClass(
                            teacher.status
                          )}`}
                          onClick={() =>
                            setActiveMenuId(
                              activeMenuId ===
                                teacher.id
                                ? null
                                : teacher.id
                            )
                          }
                        >
                          <span />
                          {teacher.status}
                        </button>

                        {activeMenuId ===
                          teacher.id && (
                          <div className="teachers-attendance-status-menu">
                            {STATUS_OPTIONS.map(
                              (status) => (
                                <button
                                  type="button"
                                  key={
                                    status.label
                                  }
                                  className={
                                    teacher.status ===
                                    status.label
                                      ? "teachers-attendance-status-menu-item teachers-attendance-active"
                                      : "teachers-attendance-status-menu-item"
                                  }
                                  onClick={() =>
                                    handleStatusChange(
                                      teacher.id,
                                      status.label
                                    )
                                  }
                                >
                                  {status.icon}
                                  {status.label}
                                </button>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </td>

                    <td>
                      <div className="teachers-attendance-progress-cell">
                        <div className="teachers-attendance-progress-top">
                          <strong>
                            {teacher.attendance}%
                          </strong>

                          <span>
                            Attendance
                          </span>
                        </div>

                        <div className="teachers-attendance-progress-track">
                          <div
                            className="teachers-attendance-progress-fill"
                            style={{
                              width: `${teacher.attendance}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="teachers-attendance-action-buttons">
                        <button
                          type="button"
                          className="teachers-attendance-action-view"
                          onClick={() =>
                            setViewTeacherModal(
                              teacher
                            )
                          }
                          title="View"
                        >
                          <FaEye />
                        </button>

                        <button
                          type="button"
                          className="teachers-attendance-action-edit"
                          onClick={() =>
                            setEditTeacherModal({
                              ...teacher,
                            })
                          }
                          title="Edit"
                        >
                          <FaEdit />
                        </button>

                        <button
                          type="button"
                          className="teachers-attendance-action-delete"
                          onClick={() =>
                            handleDelete(
                              teacher.id
                            )
                          }
                          title="Delete"
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
                    colSpan="9"
                    className="teachers-attendance-empty-state"
                  >
                    <FaUser />

                    <strong>
                      No attendance records found
                    </strong>

                    <span>
                      Try changing your filters or
                      search keyword.
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="teachers-attendance-pagination">
          <div className="teachers-attendance-pagination-info">
            Showing{" "}
            <strong>
              {filteredTeachers.length === 0
                ? 0
                : (currentPage - 1) *
                    itemsPerPage +
                  1}
            </strong>{" "}
            to{" "}
            <strong>
              {Math.min(
                currentPage * itemsPerPage,
                filteredTeachers.length
              )}
            </strong>{" "}
            of{" "}
            <strong>
              {filteredTeachers.length}
            </strong>{" "}
            records
          </div>

          <div className="teachers-attendance-pagination-controls">
            <select
              value={itemsPerPage}
              onChange={(event) => {
                setItemsPerPage(
                  Number(event.target.value)
                );
                setCurrentPage(1);
              }}
              className="teachers-attendance-items-select"
            >
              <option value="5">5 / page</option>
              <option value="10">10 / page</option>
              <option value="20">20 / page</option>
            </select>

            <button
              type="button"
              className="teachers-attendance-page-button"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(
                  (page) => page - 1
                )
              }
            >
              <FaChevronLeft />
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                type="button"
                key={page}
                className={
                  currentPage === page
                    ? "teachers-attendance-page-button teachers-attendance-active"
                    : "teachers-attendance-page-button"
                }
                onClick={() =>
                  setCurrentPage(page)
                }
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              className="teachers-attendance-page-button"
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage(
                  (page) => page + 1
                )
              }
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* =========================
          ADD TEACHER MODAL
      ========================= */}
      {isAddTeacherOpen && (
        <div
          className="teachers-attendance-modal-overlay teachers-attendance-add-overlay"
          onClick={() =>
            setIsAddTeacherOpen(false)
          }
        >
          <form
            className="teachers-attendance-modal teachers-attendance-add-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
            onSubmit={handleAddTeacher}
          >
            <div className="teachers-attendance-add-modal-top">
              <div className="teachers-attendance-add-icon">
                <FaUserFriends />
              </div>

              <div className="teachers-attendance-add-heading">
                <h2>Add New Teacher</h2>
                <p>
                  Create a teacher attendance
                  record.
                </p>
              </div>

              <button
                type="button"
                className="teachers-attendance-modal-close"
                onClick={() =>
                  setIsAddTeacherOpen(false)
                }
                aria-label="Close add teacher form"
              >
                <FaTimes />
              </button>
            </div>

            <div className="teachers-attendance-add-divider" />

            <div className="teachers-attendance-add-form">
              <div className="teachers-attendance-form-field">
                <label>
                  Teacher Name
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter teacher name"
                  value={newTeacher.name}
                  onChange={handleNewTeacherChange}
                  required
                />
              </div>

              <div className="teachers-attendance-form-field">
                <label>
                  Employee ID
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="employeeId"
                  placeholder="e.g. TCH026"
                  value={newTeacher.employeeId}
                  onChange={handleNewTeacherChange}
                  required
                />
              </div>

              <div className="teachers-attendance-form-field">
                <label>Department</label>

                <select
                  name="department"
                  value={newTeacher.department}
                  onChange={
                    handleNewTeacherChange
                  }
                >
                  <option value="Primary Wing">
                    Primary Wing
                  </option>
                  <option value="Secondary Wing">
                    Secondary Wing
                  </option>
                  <option value="Senior Wing">
                    Senior Wing
                  </option>
                  <option value="Administration">
                    Administration
                  </option>
                  <option value="Pre-Primary Wing">
                    Pre-Primary Wing
                  </option>
                </select>
              </div>

              <div className="teachers-attendance-form-field">
                <label>Status</label>

                <select
                  name="status"
                  value={newTeacher.status}
                  onChange={
                    handleNewTeacherChange
                  }
                >
                  <option value="Present">
                    Present
                  </option>
                  <option value="Absent">
                    Absent
                  </option>
                  <option value="Half Day">
                    Half Day
                  </option>
                  <option value="On Leave">
                    On Leave
                  </option>
                </select>
              </div>

              <div className="teachers-attendance-form-field">
                <label>Punch In</label>

                <input
                  type="text"
                  name="punchIn"
                  placeholder="08:00 AM"
                  value={newTeacher.punchIn}
                  onChange={
                    handleNewTeacherChange
                  }
                  disabled={
                    newTeacher.status ===
                      "Absent" ||
                    newTeacher.status ===
                      "On Leave"
                  }
                />
              </div>

              <div className="teachers-attendance-form-field">
                <label>Punch Out</label>

                <input
                  type="text"
                  name="punchOut"
                  placeholder="04:00 PM"
                  value={newTeacher.punchOut}
                  onChange={
                    handleNewTeacherChange
                  }
                  disabled={
                    newTeacher.status ===
                      "Absent" ||
                    newTeacher.status ===
                      "On Leave"
                  }
                />
              </div>

              <div className="teachers-attendance-form-field">
                <label>Punch In Location</label>

                <div className="teachers-attendance-form-input-icon">
                  <FaMapMarkerAlt />

                  <input
                    type="text"
                    name="punchInLocation"
                    placeholder="Main Gate"
                    value={
                      newTeacher.punchInLocation
                    }
                    onChange={
                      handleNewTeacherChange
                    }
                    disabled={
                      newTeacher.status ===
                        "Absent" ||
                      newTeacher.status ===
                        "On Leave"
                    }
                  />
                </div>
              </div>

              <div className="teachers-attendance-form-field">
                <label>Punch Out Location</label>

                <div className="teachers-attendance-form-input-icon">
                  <FaMapMarkerAlt />

                  <input
                    type="text"
                    name="punchOutLocation"
                    placeholder="Main Gate"
                    value={
                      newTeacher.punchOutLocation
                    }
                    onChange={
                      handleNewTeacherChange
                    }
                    disabled={
                      newTeacher.status ===
                        "Absent" ||
                      newTeacher.status ===
                        "On Leave"
                    }
                  />
                </div>
              </div>
            </div>

            <div className="teachers-attendance-add-preview">
              <div>
                <span>Attendance</span>
                <strong>
                  {getAttendanceByStatus(
                    newTeacher.status
                  )}
                  %
                </strong>
              </div>

              <div>
                <span>Working Hours</span>
                <strong>
                  {calculateWorkingHours(
                    newTeacher.punchIn,
                    newTeacher.punchOut,
                    newTeacher.status
                  )}
                </strong>
              </div>
            </div>

            <div className="teachers-attendance-modal-footer teachers-attendance-add-footer">
              <button
                type="button"
                className="teachers-attendance-cancel-button"
                onClick={() => {
                  setNewTeacher(EMPTY_FORM);
                  setIsAddTeacherOpen(false);
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="teachers-attendance-save-button"
              >
                <FaSave />
                Add Teacher
              </button>
            </div>
          </form>
        </div>
      )}

      {/* VIEW MODAL */}
      {viewTeacherModal && (
        <div
          className="teachers-attendance-modal-overlay"
          onClick={() =>
            setViewTeacherModal(null)
          }
        >
          <div
            className="teachers-attendance-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="teachers-attendance-modal-header">
              <div>
                <h2>Teacher Details</h2>
                <p>
                  Attendance information
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setViewTeacherModal(null)
                }
              >
                <FaTimes />
              </button>
            </div>

            <div className="teachers-attendance-profile">
              <img
                src={viewTeacherModal.avatar}
                alt={viewTeacherModal.name}
              />

              <div>
                <h3>
                  {viewTeacherModal.name}
                </h3>

                <p>
                  {viewTeacherModal.employeeId}
                </p>

                <span>
                  {viewTeacherModal.department}
                </span>
              </div>
            </div>

            <div className="teachers-attendance-details-grid">
              <div>
                <span>Punch In</span>
                <strong>
                  {viewTeacherModal.punchIn}
                </strong>
              </div>

              <div>
                <span>Punch Out</span>
                <strong>
                  {viewTeacherModal.punchOut}
                </strong>
              </div>

              <div>
                <span>Working Hours</span>
                <strong>
                  {
                    viewTeacherModal.workingHours
                  }
                </strong>
              </div>

              <div>
                <span>Attendance</span>
                <strong>
                  {viewTeacherModal.attendance}%
                </strong>
              </div>

              <div>
                <span>Status</span>
                <strong>
                  {viewTeacherModal.status}
                </strong>
              </div>

              <div>
                <span>Location</span>
                <strong>
                  {
                    viewTeacherModal.punchInLocation
                  }
                </strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editTeacherModal && (
        <div
          className="teachers-attendance-modal-overlay"
          onClick={() =>
            setEditTeacherModal(null)
          }
        >
          <form
            className="teachers-attendance-modal teachers-attendance-edit-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
            onSubmit={handleSaveEdit}
          >
            <div className="teachers-attendance-modal-header">
              <div>
                <h2>Edit Teacher</h2>
                <p>
                  Update attendance
                  information
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setEditTeacherModal(null)
                }
              >
                <FaTimes />
              </button>
            </div>

            <div className="teachers-attendance-form-grid">
              <div className="teachers-attendance-form-field">
                <label>Teacher Name</label>

                <input
                  type="text"
                  value={
                    editTeacherModal.name
                  }
                  onChange={(event) =>
                    setEditTeacherModal({
                      ...editTeacherModal,
                      name: event.target.value,
                    })
                  }
                />
              </div>

              <div className="teachers-attendance-form-field">
                <label>Employee ID</label>

                <input
                  type="text"
                  value={
                    editTeacherModal.employeeId
                  }
                  onChange={(event) =>
                    setEditTeacherModal({
                      ...editTeacherModal,
                      employeeId:
                        event.target.value,
                    })
                  }
                />
              </div>

              <div className="teachers-attendance-form-field">
                <label>Department</label>

                <select
                  value={
                    editTeacherModal.department
                  }
                  onChange={(event) =>
                    setEditTeacherModal({
                      ...editTeacherModal,
                      department:
                        event.target.value,
                    })
                  }
                >
                  {departments
                    .filter(
                      (department) =>
                        department !==
                        "All Departments"
                    )
                    .map((department) => (
                      <option
                        key={department}
                        value={department}
                      >
                        {department}
                      </option>
                    ))}
                </select>
              </div>

              <div className="teachers-attendance-form-field">
                <label>Status</label>

                <select
                  value={
                    editTeacherModal.status
                  }
                  onChange={(event) =>
                    setEditTeacherModal({
                      ...editTeacherModal,
                      status:
                        event.target.value,
                    })
                  }
                >
                  <option value="Present">
                    Present
                  </option>
                  <option value="Absent">
                    Absent
                  </option>
                  <option value="Half Day">
                    Half Day
                  </option>
                  <option value="On Leave">
                    On Leave
                  </option>
                </select>
              </div>

              <div className="teachers-attendance-form-field">
                <label>Punch In</label>

                <input
                  type="text"
                  value={
                    editTeacherModal.punchIn
                  }
                  onChange={(event) =>
                    setEditTeacherModal({
                      ...editTeacherModal,
                      punchIn:
                        event.target.value,
                    })
                  }
                />
              </div>

              <div className="teachers-attendance-form-field">
                <label>Punch Out</label>

                <input
                  type="text"
                  value={
                    editTeacherModal.punchOut
                  }
                  onChange={(event) =>
                    setEditTeacherModal({
                      ...editTeacherModal,
                      punchOut:
                        event.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="teachers-attendance-modal-footer">
              <button
                type="button"
                className="teachers-attendance-cancel-button"
                onClick={() =>
                  setEditTeacherModal(null)
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="teachers-attendance-save-button"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TeachersAttendance;