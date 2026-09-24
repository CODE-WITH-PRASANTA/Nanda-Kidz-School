import React, { useMemo, useState } from "react";
import {
  FaMagnifyingGlass,
  FaRotate,
  FaPlus,
  FaEye,
  FaPen,
  FaTrash,
  FaDownload,
  FaPrint,
  FaXmark,
  FaCheck,
  FaGraduationCap,
  FaUsers,
  FaCalendarDays,
  FaUser,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaTableColumns,
  FaFileLines,
  FaUserTie,
} from "react-icons/fa6";

import "./AdmissionList.css";

const initialAdmissions = [
  {
    id: 1,
    studentName: "Aarav Roul",
    admissionNo: "NK2024001",
    className: "Nursery",
    gender: "Male",
    admissionDate: "15-07-2024",
    parentName: "Ramesh Roul",
    contact: "+91 98765 43210",
    email: "ramesh.roul@gmail.com",
    status: "Active",
    documents: "5/5",
    session: "2024-25",
    address: "Bhubaneswar, Odisha",
    dob: "12-03-2020",
  },
  {
    id: 2,
    studentName: "Siya Patel",
    admissionNo: "NK2024002",
    className: "LKG",
    gender: "Female",
    admissionDate: "18-07-2024",
    parentName: "Amit Patel",
    contact: "+91 98765 43211",
    email: "amit.patel@gmail.com",
    status: "Active",
    documents: "5/5",
    session: "2024-25",
    address: "Cuttack, Odisha",
    dob: "21-06-2019",
  },
  {
    id: 3,
    studentName: "Rohan Kumar",
    admissionNo: "NK2024003",
    className: "UKG",
    gender: "Male",
    admissionDate: "20-07-2024",
    parentName: "Suresh Kumar",
    contact: "+91 98765 43212",
    email: "suresh.kumar@gmail.com",
    status: "Pending",
    documents: "4/5",
    session: "2024-25",
    address: "Puri, Odisha",
    dob: "08-01-2019",
  },
  {
    id: 4,
    studentName: "Ananya Gupta",
    admissionNo: "NK2024004",
    className: "Class 1",
    gender: "Female",
    admissionDate: "22-07-2024",
    parentName: "Vikram Gupta",
    contact: "+91 98765 43213",
    email: "vikram.gupta@gmail.com",
    status: "Active",
    documents: "5/5",
    session: "2024-25",
    address: "Bhubaneswar, Odisha",
    dob: "14-11-2018",
  },
  {
    id: 5,
    studentName: "Dev Pradhan",
    admissionNo: "NK2024005",
    className: "Class 2",
    gender: "Male",
    admissionDate: "25-07-2024",
    parentName: "Manoj Pradhan",
    contact: "+91 98765 43214",
    email: "manoj.pradhan@gmail.com",
    status: "Inactive",
    documents: "4/5",
    session: "2024-25",
    address: "Kendrapara, Odisha",
    dob: "19-08-2017",
  },
  {
    id: 6,
    studentName: "Kavya Tiwari",
    admissionNo: "NK2024006",
    className: "Class 3",
    gender: "Female",
    admissionDate: "28-07-2024",
    parentName: "Sanjay Tiwari",
    contact: "+91 98765 43215",
    email: "sanjay.tiwari@gmail.com",
    status: "Active",
    documents: "5/5",
    session: "2024-25",
    address: "Cuttack, Odisha",
    dob: "11-04-2016",
  },
  {
    id: 7,
    studentName: "Meet Sharma",
    admissionNo: "NK2024007",
    className: "Class 4",
    gender: "Male",
    admissionDate: "30-07-2024",
    parentName: "Rajesh Sharma",
    contact: "+91 98765 43216",
    email: "rajesh.sharma@gmail.com",
    status: "Active",
    documents: "5/5",
    session: "2024-25",
    address: "Bhubaneswar, Odisha",
    dob: "07-02-2015",
  },
  {
    id: 8,
    studentName: "Pihu Das",
    admissionNo: "NK2024008",
    className: "Class 5",
    gender: "Female",
    admissionDate: "01-08-2024",
    parentName: "Kishore Das",
    contact: "+91 98765 43217",
    email: "kishore.das@gmail.com",
    status: "Active",
    documents: "5/5",
    session: "2024-25",
    address: "Aul, Odisha",
    dob: "23-09-2014",
  },
];

const emptyFormData = {
  studentName: "",
  admissionNo: "",
  className: "Nursery",
  gender: "Male",
  admissionDate: "",
  parentName: "",
  contact: "",
  email: "",
  status: "Active",
  documents: "5/5",
  session: "2024-25",
  address: "",
  dob: "",
};

const AdmissionList = () => {
  const [admissions, setAdmissions] = useState(initialAdmissions);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All Classes");
  const [sessionFilter, setSessionFilter] = useState("All Sessions");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [selectedRows, setSelectedRows] = useState([]);
  const [modal, setModal] = useState(null);
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [showColumns, setShowColumns] = useState(false);

  const [visibleColumns, setVisibleColumns] = useState({
    admissionNo: true,
    className: true,
    gender: true,
    admissionDate: true,
    parentName: true,
    contact: true,
    status: true,
    documents: true,
    actions: true,
  });

  const [formData, setFormData] = useState(emptyFormData);

  // Date Formatting Helpers
  const convertDisplayDateToISO = (date) => {
    if (!date) return "";
    const [day, month, year] = date.split("-");
    return day && month && year ? `${year}-${month}-${day}` : "";
  };

  const formatDateForInput = (date) => {
    if (!date) return "";
    const [day, month, year] = date.split("-");
    return day && month && year ? `${year}-${month}-${day}` : "";
  };

  const formatDateForDisplay = (value) => {
    if (!value) return "";
    const parts = value.split("-");
    return parts.length === 3 && parts[0].length === 4
      ? `${parts[2]}-${parts[1]}-${parts[0]}`
      : value;
  };

  // Reactive Filter Computation
  const filteredAdmissions = useMemo(() => {
    return admissions.filter((item) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.studentName.toLowerCase().includes(q) ||
        item.admissionNo.toLowerCase().includes(q) ||
        item.parentName.toLowerCase().includes(q) ||
        item.contact.toLowerCase().includes(q);

      const matchesClass =
        classFilter === "All Classes" || item.className === classFilter;
      const matchesSession =
        sessionFilter === "All Sessions" || item.session === sessionFilter;
      const matchesStatus =
        statusFilter === "All Status" || item.status === statusFilter;

      const itemDateISO = convertDisplayDateToISO(item.admissionDate);
      const matchesFromDate = !fromDate || itemDateISO >= fromDate;
      const matchesToDate = !toDate || itemDateISO <= toDate;

      return (
        matchesSearch &&
        matchesClass &&
        matchesSession &&
        matchesStatus &&
        matchesFromDate &&
        matchesToDate
      );
    });
  }, [admissions, search, classFilter, sessionFilter, statusFilter, fromDate, toDate]);

  // Pagination Calculations
  const totalPages = Math.max(1, Math.ceil(filteredAdmissions.length / rowsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedAdmissions = filteredAdmissions.slice(
    (safeCurrentPage - 1) * rowsPerPage,
    safeCurrentPage * rowsPerPage
  );

  // Statistics
  const maleCount = admissions.filter((item) => item.gender === "Male").length;
  const femaleCount = admissions.filter((item) => item.gender === "Female").length;

  const resetFilters = () => {
    setSearch("");
    setClassFilter("All Classes");
    setSessionFilter("All Sessions");
    setStatusFilter("All Status");
    setFromDate("");
    setToDate("");
    setCurrentPage(1);
  };

  const toggleSelectAll = () => {
    const pageIds = paginatedAdmissions.map((item) => item.id);
    const allSelected =
      pageIds.length > 0 && pageIds.every((id) => selectedRows.includes(id));

    setSelectedRows((prev) =>
      allSelected
        ? prev.filter((id) => !pageIds.includes(id))
        : [...new Set([...prev, ...pageIds])]
    );
  };

  const toggleRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const openView = (item) => {
    setSelectedAdmission(item);
    setModal("view");
  };

  const openEdit = (item) => {
    setSelectedAdmission(item);
    setFormData({
      ...item,
      admissionDate: item.admissionDate || "",
      dob: item.dob || "",
    });
    setModal("edit");
  };

  const openDelete = (item) => {
    setSelectedAdmission(item);
    setModal("delete");
  };

  const openAdd = () => {
    setFormData(emptyFormData);
    setSelectedAdmission(null);
    setModal("add");
  };

  const closeModal = () => {
    setModal(null);
    setSelectedAdmission(null);
    setFormData(emptyFormData);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.studentName.trim() || !formData.parentName.trim()) return;

    if (modal === "add") {
      const newAdmission = {
        ...formData,
        id: Date.now(),
        admissionNo:
          formData.admissionNo ||
          `NK${new Date().getFullYear()}${String(admissions.length + 1).padStart(3, "0")}`,
      };
      setAdmissions((prev) => [...prev, newAdmission]);
      setCurrentPage(1);
    } else if (modal === "edit" && selectedAdmission) {
      setAdmissions((prev) =>
        prev.map((item) =>
          item.id === selectedAdmission.id
            ? { ...formData, id: selectedAdmission.id }
            : item
        )
      );
    }
    closeModal();
  };

  const confirmDelete = () => {
    if (!selectedAdmission) return;
    setAdmissions((prev) => prev.filter((item) => item.id !== selectedAdmission.id));
    setSelectedRows((prev) => prev.filter((id) => id !== selectedAdmission.id));
    closeModal();
  };

  const exportCSV = () => {
    const headers = [
      "Student Name",
      "Admission No.",
      "Class",
      "Gender",
      "Admission Date",
      "Parent Name",
      "Contact",
      "Status",
      "Documents",
    ];

    const rows = filteredAdmissions.map((item) => [
      item.studentName,
      item.admissionNo,
      item.className,
      item.gender,
      item.admissionDate,
      item.parentName,
      item.contact,
      item.status,
      item.documents,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `admissions_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getInitials = (name) => {
    return (name || "")
      .split(" ")
      .filter(Boolean)
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const avatarClasses = ["purple", "pink", "blue", "magenta", "cyan", "violet", "indigo", "rose"];
  const getAvatarClass = (id) => avatarClasses[(id - 1) % avatarClasses.length];

  return (
    <div className="AdmissionList">
      {/* HEADER */}
      <header className="AdmissionList__header">
        <div className="AdmissionList__titleArea">
          <div className="AdmissionList__titleIcon">
            <FaGraduationCap />
          </div>
          <div>
            <h1>Admission List</h1>
            <p>View, track, and manage student admissions seamlessly</p>
          </div>
        </div>

        <button className="AdmissionList__addButton" onClick={openAdd} type="button">
          <FaPlus />
          <span>Add New Admission</span>
        </button>
      </header>

      {/* STAT CARDS */}
      <section className="AdmissionList__stats">
        <div className="AdmissionList__statCard AdmissionList__statCard--purple">
          <div className="AdmissionList__statIcon">
            <FaUsers />
          </div>
          <div className="AdmissionList__statContent">
            <span>Total Admissions</span>
            <div className="AdmissionList__statValue">
              {admissions.length + 240}
              <small className="AdmissionList__badgeGrowth">↑ 12%</small>
            </div>
            <p>All-time recorded entries</p>
          </div>
        </div>

        <div className="AdmissionList__statCard AdmissionList__statCard--green">
          <div className="AdmissionList__statIcon">
            <FaCalendarDays />
          </div>
          <div className="AdmissionList__statContent">
            <span>This Month</span>
            <div className="AdmissionList__statValue">
              32
              <small className="AdmissionList__badgeGrowth">↑ 8%</small>
            </div>
            <p>Newly enrolled students</p>
          </div>
        </div>

        <div className="AdmissionList__statCard AdmissionList__statCard--orange">
          <div className="AdmissionList__statIcon">
            <FaUser />
          </div>
          <div className="AdmissionList__statContent">
            <span>Boys</span>
            <div className="AdmissionList__statValue">
              {maleCount + 124}
              <small className="AdmissionList__neutralRatio">53%</small>
            </div>
            <p>Total male students</p>
          </div>
        </div>

        <div className="AdmissionList__statCard AdmissionList__statCard--pink">
          <div className="AdmissionList__statIcon">
            <FaUser />
          </div>
          <div className="AdmissionList__statContent">
            <span>Girls</span>
            <div className="AdmissionList__statValue">
              {femaleCount + 108}
              <small className="AdmissionList__pinkRatio">47%</small>
            </div>
            <p>Total female students</p>
          </div>
        </div>
      </section>

      {/* FILTER CONTROLS BAR (Auto-Filtering + Reset Button) */}
      <section className="AdmissionList__filterBox">
        <div className="AdmissionList__searchBox">
          <FaMagnifyingGlass />
          <input
            type="text"
            placeholder="Search student, admission no, parent..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <select
          className="AdmissionList__select"
          value={classFilter}
          onChange={(e) => {
            setClassFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option>All Classes</option>
          <option>Nursery</option>
          <option>LKG</option>
          <option>UKG</option>
          <option>Class 1</option>
          <option>Class 2</option>
          <option>Class 3</option>
          <option>Class 4</option>
          <option>Class 5</option>
        </select>

        <select
          className="AdmissionList__select"
          value={sessionFilter}
          onChange={(e) => {
            setSessionFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option>All Sessions</option>
          <option>2024-25</option>
          <option>2025-26</option>
          <option>2026-27</option>
        </select>

        <select
          className="AdmissionList__select"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option>All Status</option>
          <option>Active</option>
          <option>Pending</option>
          <option>Inactive</option>
        </select>

        <div className="AdmissionList__dateInput">
          <label>From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => {
              setFromDate(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="AdmissionList__dateInput">
          <label>To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => {
              setToDate(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <button
          type="button"
          className="AdmissionList__resetButton"
          onClick={resetFilters}
          title="Clear all filters"
        >
          <FaRotate />
          <span>Reset</span>
        </button>
      </section>

      {/* TABLE SECTION */}
      <section className="AdmissionList__tableCard">
        <div className="AdmissionList__tableHeader">
          <div className="AdmissionList__tableTitle">
            <div className="AdmissionList__tableIcon">
              <FaFileLines />
            </div>
            <div>
              <h2>Admission Records</h2>
              <p>Complete directory of student applications & details</p>
            </div>
          </div>

          <div className="AdmissionList__tableTools">
            <div className="AdmissionList__dropdownWrapper">
              <button
                type="button"
                className="AdmissionList__toolButton"
                onClick={() => setShowColumns((prev) => !prev)}
              >
                <FaTableColumns />
                <span>Columns</span>
                <FaChevronDown />
              </button>

              {showColumns && (
                <div className="AdmissionList__columnDropdown">
                  {Object.entries(visibleColumns).map(([key, value]) => {
                    if (key === "actions") return null;
                    return (
                      <label key={key}>
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={() =>
                            setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }))
                          }
                        />
                        <span>
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            <button type="button" className="AdmissionList__toolButton" onClick={exportCSV}>
              <FaDownload />
              <span>Export</span>
            </button>

            <button
              type="button"
              className="AdmissionList__toolButton"
              onClick={() => window.print()}
            >
              <FaPrint />
              <span>Print</span>
            </button>

            <button
              type="button"
              className="AdmissionList__toolButton"
              onClick={() => {
                setAdmissions([...initialAdmissions]);
                setSelectedRows([]);
                setCurrentPage(1);
              }}
            >
              <FaRotate />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        <div className="AdmissionList__tableWrapper">
          <table className="AdmissionList__table">
            <thead>
              <tr>
                <th className="AdmissionList__checkboxColumn">
                  <input
                    type="checkbox"
                    checked={
                      paginatedAdmissions.length > 0 &&
                      paginatedAdmissions.every((item) => selectedRows.includes(item.id))
                    }
                    onChange={toggleSelectAll}
                  />
                </th>
                <th>#</th>
                <th>Student Name</th>
                {visibleColumns.admissionNo && <th>Admission No.</th>}
                {visibleColumns.className && <th>Class</th>}
                {visibleColumns.gender && <th>Gender</th>}
                {visibleColumns.admissionDate && <th>Admission Date</th>}
                {visibleColumns.parentName && <th>Parent / Guardian</th>}
                {visibleColumns.contact && <th>Contact</th>}
                {visibleColumns.status && <th>Status</th>}
                {visibleColumns.documents && <th>Documents</th>}
                {visibleColumns.actions && <th>Actions</th>}
              </tr>
            </thead>

            <tbody>
              {paginatedAdmissions.length > 0 ? (
                paginatedAdmissions.map((item, index) => (
                  <tr key={item.id}>
                    <td className="AdmissionList__checkboxColumn">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(item.id)}
                        onChange={() => toggleRow(item.id)}
                      />
                    </td>
                    <td>{(safeCurrentPage - 1) * rowsPerPage + index + 1}</td>
                    <td>
                      <div className="AdmissionList__student">
                        <div
                          className={`AdmissionList__avatar AdmissionList__avatar--${getAvatarClass(
                            item.id
                          )}`}
                        >
                          {getInitials(item.studentName)}
                        </div>
                        <strong>{item.studentName}</strong>
                      </div>
                    </td>

                    {visibleColumns.admissionNo && (
                      <td className="AdmissionList__admissionNo">{item.admissionNo}</td>
                    )}

                    {visibleColumns.className && <td>{item.className}</td>}

                    {visibleColumns.gender && (
                      <td>
                        <span
                          className={`AdmissionList__gender AdmissionList__gender--${item.gender.toLowerCase()}`}
                        >
                          {item.gender}
                        </span>
                      </td>
                    )}

                    {visibleColumns.admissionDate && <td>{item.admissionDate}</td>}

                    {visibleColumns.parentName && (
                      <td>
                        <div className="AdmissionList__parent">
                          <strong>{item.parentName}</strong>
                          <small>Guardian</small>
                        </div>
                      </td>
                    )}

                    {visibleColumns.contact && <td>{item.contact}</td>}

                    {visibleColumns.status && (
                      <td>
                        <span
                          className={`AdmissionList__status AdmissionList__status--${item.status.toLowerCase()}`}
                        >
                          <i />
                          {item.status}
                        </span>
                      </td>
                    )}

                    {visibleColumns.documents && (
                      <td>
                        <span
                          className={`AdmissionList__documents ${
                            item.documents === "5/5"
                              ? "AdmissionList__documents--complete"
                              : "AdmissionList__documents--pending"
                          }`}
                        >
                          <FaFileLines />
                          {item.documents}
                        </span>
                      </td>
                    )}

                    {visibleColumns.actions && (
                      <td>
                        <div className="AdmissionList__actions">
                          <button
                            type="button"
                            className="AdmissionList__action AdmissionList__action--view"
                            title="View"
                            onClick={() => openView(item)}
                          >
                            <FaEye />
                          </button>
                          <button
                            type="button"
                            className="AdmissionList__action AdmissionList__action--edit"
                            title="Edit"
                            onClick={() => openEdit(item)}
                          >
                            <FaPen />
                          </button>
                          <button
                            type="button"
                            className="AdmissionList__action AdmissionList__action--delete"
                            title="Delete"
                            onClick={() => openDelete(item)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={12} className="AdmissionList__empty">
                    <FaFileLines />
                    <h3>No admissions found</h3>
                    <p>Try adjusting your search criteria or resetting filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="AdmissionList__pagination">
          <div>
            Showing{" "}
            <strong>
              {filteredAdmissions.length === 0 ? 0 : (safeCurrentPage - 1) * rowsPerPage + 1}
            </strong>{" "}
            to{" "}
            <strong>
              {Math.min(safeCurrentPage * rowsPerPage, filteredAdmissions.length)}
            </strong>{" "}
            of <strong>{filteredAdmissions.length}</strong> records
          </div>

          <div className="AdmissionList__paginationRight">
            <button
              type="button"
              disabled={safeCurrentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <FaChevronLeft />
            </button>

            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
              <button
                type="button"
                key={page}
                className={safeCurrentPage === page ? "AdmissionList__page--active" : ""}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            {totalPages > 5 && (
              <>
                <span>...</span>
                <button type="button" onClick={() => setCurrentPage(totalPages)}>
                  {totalPages}
                </button>
              </>
            )}

            <button
              type="button"
              disabled={safeCurrentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              <FaChevronRight />
            </button>

            <div className="AdmissionList__rowsSelect">
              <span>Rows:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={8}>8</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {modal && (
        <div
          className="AdmissionList__modalOverlay"
          onMouseDown={(e) => {
            if (e.target.classList.contains("AdmissionList__modalOverlay")) closeModal();
          }}
        >
          <div className={`AdmissionList__modal AdmissionList__modal--${modal}`}>
            {modal === "view" && selectedAdmission && (
              <>
                <div className="AdmissionList__modalHeader">
                  <div>
                    <span className="AdmissionList__modalEyebrow">Admission Details</span>
                    <h2>{selectedAdmission.studentName}</h2>
                  </div>
                  <button type="button" className="AdmissionList__closeButton" onClick={closeModal}>
                    <FaXmark />
                  </button>
                </div>

                <div className="AdmissionList__profileHeader">
                  <div
                    className={`AdmissionList__largeAvatar AdmissionList__largeAvatar--${getAvatarClass(
                      selectedAdmission.id
                    )}`}
                  >
                    {getInitials(selectedAdmission.studentName)}
                  </div>
                  <div>
                    <h3>{selectedAdmission.studentName}</h3>
                    <p>{selectedAdmission.admissionNo}</p>
                    <span
                      className={`AdmissionList__status AdmissionList__status--${selectedAdmission.status.toLowerCase()}`}
                    >
                      <i />
                      {selectedAdmission.status}
                    </span>
                  </div>
                </div>

                <div className="AdmissionList__detailGrid">
                  <div>
                    <span>Class</span>
                    <strong>{selectedAdmission.className}</strong>
                  </div>
                  <div>
                    <span>Gender</span>
                    <strong>{selectedAdmission.gender}</strong>
                  </div>
                  <div>
                    <span>Admission Date</span>
                    <strong>{selectedAdmission.admissionDate}</strong>
                  </div>
                  <div>
                    <span>Session</span>
                    <strong>{selectedAdmission.session}</strong>
                  </div>
                  <div>
                    <span>Parent / Guardian</span>
                    <strong>{selectedAdmission.parentName}</strong>
                  </div>
                  <div>
                    <span>Contact Number</span>
                    <strong>{selectedAdmission.contact}</strong>
                  </div>
                  <div>
                    <span>Email Address</span>
                    <strong>{selectedAdmission.email || "—"}</strong>
                  </div>
                  <div>
                    <span>Date of Birth</span>
                    <strong>{selectedAdmission.dob || "—"}</strong>
                  </div>
                  <div className="AdmissionList__detailFull">
                    <span>Address</span>
                    <strong>{selectedAdmission.address || "—"}</strong>
                  </div>
                  <div>
                    <span>Submitted Documents</span>
                    <strong>{selectedAdmission.documents}</strong>
                  </div>
                </div>

                <div className="AdmissionList__modalFooter">
                  <button
                    type="button"
                    className="AdmissionList__secondaryButton"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="AdmissionList__primaryButton"
                    onClick={() => openEdit(selectedAdmission)}
                  >
                    <FaPen />
                    Edit Admission
                  </button>
                </div>
              </>
            )}

            {(modal === "add" || modal === "edit") && (
              <>
                <div className="AdmissionList__modalHeader">
                  <div>
                    <span className="AdmissionList__modalEyebrow">Student Management</span>
                    <h2>{modal === "add" ? "Add New Admission" : "Edit Admission"}</h2>
                  </div>
                  <button type="button" className="AdmissionList__closeButton" onClick={closeModal}>
                    <FaXmark />
                  </button>
                </div>

                <form className="AdmissionList__form" onSubmit={handleSubmit}>
                  <div className="AdmissionList__formSectionTitle">
                    <FaUser />
                    <span>Student Information</span>
                  </div>

                  <div className="AdmissionList__formGrid">
                    <div className="AdmissionList__formGroup">
                      <label>
                        Student Name <b>*</b>
                      </label>
                      <input
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleInput}
                        placeholder="e.g. Aarav Roul"
                        required
                      />
                    </div>

                    <div className="AdmissionList__formGroup">
                      <label>Admission Number</label>
                      <input
                        name="admissionNo"
                        value={formData.admissionNo}
                        onChange={handleInput}
                        placeholder="Leave blank to auto-generate"
                      />
                    </div>

                    <div className="AdmissionList__formGroup">
                      <label>Class</label>
                      <select
                        name="className"
                        value={formData.className}
                        onChange={handleInput}
                      >
                        <option>Nursery</option>
                        <option>LKG</option>
                        <option>UKG</option>
                        <option>Class 1</option>
                        <option>Class 2</option>
                        <option>Class 3</option>
                        <option>Class 4</option>
                        <option>Class 5</option>
                      </select>
                    </div>

                    <div className="AdmissionList__formGroup">
                      <label>Gender</label>
                      <select name="gender" value={formData.gender} onChange={handleInput}>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>

                    <div className="AdmissionList__formGroup">
                      <label>Admission Date</label>
                      <div className="AdmissionList__calendarInput">
                        <FaCalendarDays />
                        <input
                          type="date"
                          value={formatDateForInput(formData.admissionDate)}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              admissionDate: formatDateForDisplay(e.target.value),
                            }))
                          }
                        />
                      </div>
                    </div>

                    <div className="AdmissionList__formGroup">
                      <label>Date of Birth</label>
                      <div className="AdmissionList__calendarInput">
                        <FaCalendarDays />
                        <input
                          type="date"
                          name="dob"
                          value={formatDateForInput(formData.dob)}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              dob: formatDateForDisplay(e.target.value),
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="AdmissionList__formSectionTitle">
                    <FaUserTie />
                    <span>Parent / Guardian Information</span>
                  </div>

                  <div className="AdmissionList__formGrid">
                    <div className="AdmissionList__formGroup">
                      <label>
                        Parent Name <b>*</b>
                      </label>
                      <input
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleInput}
                        placeholder="e.g. Ramesh Roul"
                        required
                      />
                    </div>

                    <div className="AdmissionList__formGroup">
                      <label>Contact Number</label>
                      <input
                        name="contact"
                        value={formData.contact}
                        onChange={handleInput}
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div className="AdmissionList__formGroup">
                      <label>Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInput}
                        placeholder="parent@example.com"
                      />
                    </div>

                    <div className="AdmissionList__formGroup">
                      <label>Session</label>
                      <select
                        name="session"
                        value={formData.session}
                        onChange={handleInput}
                      >
                        <option>2024-25</option>
                        <option>2025-26</option>
                        <option>2026-27</option>
                      </select>
                    </div>

                    <div className="AdmissionList__formGroup">
                      <label>Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInput}
                      >
                        <option>Active</option>
                        <option>Pending</option>
                        <option>Inactive</option>
                      </select>
                    </div>

                    <div className="AdmissionList__formGroup AdmissionList__formGroup--full">
                      <label>Address</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInput}
                        placeholder="Enter full residential address"
                        rows="3"
                      />
                    </div>
                  </div>

                  <div className="AdmissionList__modalFooter">
                    <button
                      type="button"
                      className="AdmissionList__secondaryButton"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="AdmissionList__primaryButton">
                      <FaCheck />
                      {modal === "add" ? "Save Admission" : "Update Admission"}
                    </button>
                  </div>
                </form>
              </>
            )}

            {modal === "delete" && selectedAdmission && (
              <div className="AdmissionList__deleteModal">
                <div className="AdmissionList__deleteIcon">
                  <FaTrash />
                </div>
                <h2>Delete Admission Record?</h2>
                <p>
                  Are you sure you want to delete the record for{" "}
                  <strong>{selectedAdmission.studentName}</strong>? This action cannot be undone.
                </p>

                <div className="AdmissionList__deleteInfo">
                  <span>
                    <FaUser />
                    {selectedAdmission.studentName}
                  </span>
                  <span>
                    <FaFileLines />
                    {selectedAdmission.admissionNo}
                  </span>
                </div>

                <div className="AdmissionList__deleteActions">
                  <button
                    type="button"
                    className="AdmissionList__secondaryButton"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="AdmissionList__dangerButton"
                    onClick={confirmDelete}
                  >
                    <FaTrash />
                    Delete Permanently
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdmissionList;