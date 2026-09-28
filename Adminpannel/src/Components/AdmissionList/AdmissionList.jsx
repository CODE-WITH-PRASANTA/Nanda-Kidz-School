import React, { useEffect, useMemo, useState } from "react";
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
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

const AdmissionList = () => {
  const navigate = useNavigate();

  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      const text = String(value);
      const parts = text.split("-");
      if (parts.length === 3 && parts[0].length === 4) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
      return text;
    }

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const toISODate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toISOString().slice(0, 10);
  };

  const getDocumentCount = (documents) => {
    if (!documents || typeof documents !== "object") return 0;
    return Object.values(documents).filter(Boolean).length;
  };

  const mapAdmission = (admission, index) => {
    const id = admission?._id || admission?.id;
    const parentName =
      admission?.fatherName ||
      admission?.motherName ||
      "Guardian";

    const admissionClass = admission?.admissionClass
      ? String(admission.admissionClass).startsWith("Class ")
        ? String(admission.admissionClass)
        : String(admission.admissionClass)
      : "N/A";

    return {
      ...admission,
      id,
      _id: id,
      studentName: admission?.studentName || "Unnamed Student",
      admissionNo:
        admission?.admissionNo ||
        admission?.admNo ||
        `ADM-${String(index + 1).padStart(4, "0")}`,
      className: admissionClass,
      gender: admission?.gender || "-",
      admissionDate: formatDate(admission?.admissionDate),
      parentName,
      contact: admission?.mobile || admission?.altMobile || "",
      email: admission?.email || "",
      status: admission?.status || "Active",
      documents: `${getDocumentCount(admission?.documents)}/5`,
      session: admission?.session || "",
      address: admission?.address || "",
      dob: formatDate(admission?.dob),
    };
  };

  const fetchAdmissions = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/admissions");
      const payload = response?.data;

      const records = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload?.admissions)
            ? payload.admissions
            : [];

      const mapped = records
        .filter((item) => item?._id || item?.id)
        .map(mapAdmission);

      setAdmissions(mapped);
      setSelectedRows([]);
    } catch (err) {
      console.error("Failed to fetch admissions:", err);
      setError(
        err?.response?.data?.message ||
          "Unable to fetch admission data. Please check your backend server."
      );
      setAdmissions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const convertDisplayDateToISO = (date) => {
    if (!date) return "";
    const parts = String(date).split("-");
    if (parts.length === 3 && parts[2]?.length === 4) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return toISODate(date);
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
    if (!item?.id) {
      alert("Student ID is missing.");
      return;
    }

    setModal(null);
    setSelectedAdmission(null);
    navigate(`/admission/edit/${item.id}`);
  };

  const openAdd = () => {
    setModal(null);
    setSelectedAdmission(null);
    navigate("/admission");
  };

  const openDelete = (item) => {
    setSelectedAdmission(item);
    setModal("delete");
  };

  const closeModal = () => {
    setModal(null);
    setSelectedAdmission(null);
  };

  const confirmDelete = async () => {
    if (!selectedAdmission?.id) return;

    try {
      await API.delete(`/admissions/${selectedAdmission.id}`);

      setAdmissions((prev) =>
        prev.filter((item) => item.id !== selectedAdmission.id)
      );

      setSelectedRows((prev) =>
        prev.filter((id) => id !== selectedAdmission.id)
      );

      closeModal();
    } catch (err) {
      console.error("Failed to delete admission:", err);
      alert(
        err?.response?.data?.message ||
          "Failed to delete admission. Please try again."
      );
    }
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

      {error && (
        <div className="AdmissionList__errorMessage" role="alert">
          {error}
        </div>
      )}

      {loading && (
        <div className="AdmissionList__loadingMessage">
          Loading admission records...
        </div>
      )}

      {/* STAT CARDS */}
      <section className="AdmissionList__stats">
        <div className="AdmissionList__statCard AdmissionList__statCard--purple">
          <div className="AdmissionList__statIcon">
            <FaUsers />
          </div>
          <div className="AdmissionList__statContent">
            <span>Total Admissions</span>
            <div className="AdmissionList__statValue">
              {admissions.length}
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
              {admissions.filter((item) => {
                if (!item.admissionDate) return false;
                const [day, month, year] = item.admissionDate.split("-");
                const date = new Date(`${year}-${month}-${day}`);
                const now = new Date();
                return (
                  date.getMonth() === now.getMonth() &&
                  date.getFullYear() === now.getFullYear()
                );
              }).length}
              <small className="AdmissionList__badgeGrowth">This month</small>
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
              {maleCount}
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
              {femaleCount}
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
          {[...new Set(admissions.map((item) => item.className).filter(Boolean))].map(
            (className) => (
              <option key={className} value={className}>
                {className}
              </option>
            )
          )}
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
          {[...new Set(admissions.map((item) => item.session).filter(Boolean))].map(
            (session) => (
              <option key={session} value={session}>
                {session}
              </option>
            )
          )}
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
                fetchAdmissions();
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