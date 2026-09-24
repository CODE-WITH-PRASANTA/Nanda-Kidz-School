import React, { useEffect, useMemo, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faMagnifyingGlass,
  faCalendarDays,
  faPlus,
  faEye,
  faPen,
  faTrash,
  faChevronLeft,
  faChevronRight,
  faAnglesLeft,
  faAnglesRight,
  faXmark,
  faRotate,
  faFilter,
  faCheck,
  faUserGroup,
  faClock,
  faHeart,
  faCircleXmark,
  faLocationDot,
  faBus,
  faEnvelope,
  faPhone,
  faHouse,
  faBaby,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

import {
  faCalendarDays as faCalendarRegular,
} from "@fortawesome/free-regular-svg-icons";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./ParentsInquiry.css";

/* =========================================================
   API
   ========================================================= */

const API_URL = "http://localhost:5000/api/inquiries";

/* =========================================================
   STATUS CONFIG
   ========================================================= */

const STATUS_OPTIONS = [
  "New",
  "Contacted",
  "Interested",
  "Not Interested",
];

const TRANSPORT_OPTIONS = ["Yes", "No"];

const LOCATION_OPTIONS = [
  "Bhubaneswar",
  "Cuttack",
  "Puri",
  "Berhampur",
];

/* =========================================================
   EMPTY FORM
   ========================================================= */

const EMPTY_FORM = {
  parentName: "",
  phone: "",
  email: "",
  address: "",
  babyName: "",
  age: "",
  transport: "Yes",
  status: "New",
  location: "Bhubaneswar",
  notes: "",
};

/* =========================================================
   STAT CARD
   ========================================================= */

const StatCard = ({
  icon,
  value,
  label,
  subtitle,
  color,
}) => {
  return (
    <div className="pi-stat-card">
      <div className={`pi-stat-icon-wrapper ${color}`}>
        <FontAwesomeIcon
          icon={icon}
          className="pi-stat-icon"
        />
      </div>

      <div className="pi-stat-content">
        <span className="pi-stat-label">
          {label}
        </span>

        <strong className="pi-stat-value">
          {value}
        </strong>

        <span className="pi-stat-subtitle">
          {subtitle}
        </span>
      </div>
    </div>
  );
};

/* =========================================================
   STATUS BADGE
   ========================================================= */

const StatusBadge = ({ status }) => {
  const statusMap = {
    New: "new",
    Contacted: "contacted",
    Interested: "interested",
    "Not Interested": "not-interested",
  };

  const badgeClass =
    statusMap[status] || "new";

  return (
    <span
      className={`pi-status-badge ${badgeClass}`}
    >
      <span className="pi-status-dot" />
      {status || "New"}
    </span>
  );
};

/* =========================================================
   TRANSPORT BADGE
   ========================================================= */

const TransportBadge = ({ transport }) => {
  const isYes = transport === "Yes";

  return (
    <span
      className={`pi-transport-badge ${
        isYes ? "yes" : "no"
      }`}
    >
      <FontAwesomeIcon
        icon={faBus}
      />

      {isYes ? "Yes" : "No"}
    </span>
  );
};

/* =========================================================
   DATE HELPERS
   ========================================================= */

const parseInquiryDate = (dateValue) => {
  if (!dateValue) {
    return null;
  }

  const parsed = new Date(dateValue);

  if (!Number.isNaN(parsed.getTime())) {
    return parsed;
  }

  return null;
};

const formatDateForDisplay = (dateValue) => {
  if (!dateValue) {
    return "N/A";
  }

  return dateValue;
};

const isSameCalendarDate = (
  inquiryDate,
  selectedDate
) => {
  if (!inquiryDate || !selectedDate) {
    return true;
  }

  const parsedInquiryDate =
    parseInquiryDate(inquiryDate);

  if (!parsedInquiryDate) {
    return inquiryDate
      .toLowerCase()
      .includes(
        selectedDate
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
          .toLowerCase()
      );
  }

  return (
    parsedInquiryDate.getDate() ===
      selectedDate.getDate() &&
    parsedInquiryDate.getMonth() ===
      selectedDate.getMonth() &&
    parsedInquiryDate.getFullYear() ===
      selectedDate.getFullYear()
  );
};

/* =========================================================
   COMPONENT
   ========================================================= */

const ParentsInquiry = () => {
  /* -------------------------------------------------------
     DATA
  ------------------------------------------------------- */

  const [inquiries, setInquiries] = useState([]);

  const [loading, setLoading] = useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  /* -------------------------------------------------------
     SEARCH
  ------------------------------------------------------- */

  const [searchQuery, setSearchQuery] =
    useState("");

  /* -------------------------------------------------------
     FILTERS
  ------------------------------------------------------- */

  const [filterStatus, setFilterStatus] =
    useState("");

  const [filterTransport, setFilterTransport] =
    useState("");

  const [filterLocation, setFilterLocation] =
    useState("");

  const [filterDate, setFilterDate] =
    useState(null);

  /* -------------------------------------------------------
     PAGINATION
  ------------------------------------------------------- */

  const [currentPage, setCurrentPage] =
    useState(1);

  const [entriesPerPage, setEntriesPerPage] =
    useState(5);

  /* -------------------------------------------------------
     SELECTION
  ------------------------------------------------------- */

  const [selectedInquiryIds, setSelectedInquiryIds] =
    useState([]);

  /* -------------------------------------------------------
     MODAL
  ------------------------------------------------------- */

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [modalMode, setModalMode] =
    useState("add");

  const [currentEditSr, setCurrentEditSr] =
    useState(null);

  const [selectedInquiry, setSelectedInquiry] =
    useState(null);

  const [selectedDate, setSelectedDate] =
    useState(new Date());

  /* -------------------------------------------------------
     FORM
  ------------------------------------------------------- */

  const [formData, setFormData] =
    useState(EMPTY_FORM);

  /* -------------------------------------------------------
     FETCH
  ------------------------------------------------------- */

  useEffect(() => {
    fetchInquiries();
  }, []);

  /* =======================================================
     FETCH INQUIRIES
  ======================================================= */

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(
          `Request failed with status ${response.status}`
        );
      }

      const data = await response.json();

      setInquiries(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "Error fetching inquiries:",
        error
      );

      setErrorMessage(
        "Unable to load inquiries. Please check that your backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     OPEN ADD MODAL
  ======================================================= */

  const handleOpenAddModal = () => {
    setModalMode("add");

    setCurrentEditSr(null);

    setSelectedInquiry(null);

    setFormData({
      ...EMPTY_FORM,
    });

    setSelectedDate(new Date());

    setIsModalOpen(true);
  };

  /* =======================================================
     OPEN VIEW MODAL
  ======================================================= */

  const handleOpenViewModal = (item) => {
    setModalMode("view");

    setCurrentEditSr(item.sr);

    setSelectedInquiry(item);

    setFormData({
      ...EMPTY_FORM,
      ...item,
    });

    const parsedDate = parseInquiryDate(
      item.enqDate
    );

    setSelectedDate(
      parsedDate || new Date()
    );

    setIsModalOpen(true);
  };

  /* =======================================================
     OPEN EDIT MODAL
  ======================================================= */

  const handleOpenEditModal = (item) => {
    setModalMode("edit");

    setCurrentEditSr(item.sr);

    setSelectedInquiry(item);

    setFormData({
      ...EMPTY_FORM,
      ...item,
    });

    const parsedDate = parseInquiryDate(
      item.enqDate
    );

    setSelectedDate(
      parsedDate || new Date()
    );

    setIsModalOpen(true);
  };

  /* =======================================================
     CLOSE MODAL
  ======================================================= */

  const closeModal = () => {
    setIsModalOpen(false);

    setCurrentEditSr(null);

    setSelectedInquiry(null);

    setModalMode("add");
  };

  /* =======================================================
     INPUT CHANGE
  ======================================================= */

  const handleInputChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =======================================================
     DELETE SINGLE
  ======================================================= */

  const handleDelete = async (sr) => {
    const item = inquiries.find(
      (inquiry) => inquiry.sr === sr
    );

    const itemName =
      item?.parentName || "this inquiry";

    const confirmed = window.confirm(
      `Are you sure you want to delete ${itemName}'s inquiry?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/${sr}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to delete inquiry"
        );
      }

      setInquiries((prev) =>
        prev.filter(
          (item) => item.sr !== sr
        )
      );

      setSelectedInquiryIds((prev) =>
        prev.filter(
          (id) => id !== sr
        )
      );

      if (
        selectedInquiry?.sr === sr
      ) {
        closeModal();
      }
    } catch (error) {
      console.error(
        "Error deleting inquiry:",
        error
      );

      alert(
        "Unable to delete inquiry. Please try again."
      );
    }
  };

  /* =======================================================
     DELETE SELECTED
  ======================================================= */

  const handleDeleteSelected = async () => {
    if (
      selectedInquiryIds.length === 0
    ) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedInquiryIds.length} selected inquiry(s)?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      const deleteResults =
        await Promise.all(
          selectedInquiryIds.map(
            async (sr) => {
              const response =
                await fetch(
                  `${API_URL}/${sr}`,
                  {
                    method: "DELETE",
                  }
                );

              return {
                sr,
                success:
                  response.ok,
              };
            }
          )
        );

      const successfullyDeleted =
        deleteResults
          .filter(
            (result) =>
              result.success
          )
          .map(
            (result) => result.sr
          );

      setInquiries((prev) =>
        prev.filter(
          (item) =>
            !successfullyDeleted.includes(
              item.sr
            )
        )
      );

      setSelectedInquiryIds([]);

      setCurrentPage(1);
    } catch (error) {
      console.error(
        "Bulk delete error:",
        error
      );

      alert(
        "Some inquiries could not be deleted. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     SAVE INQUIRY
  ======================================================= */

  const handleSaveInquiry = async () => {
    if (
      !formData.parentName.trim() ||
      !formData.phone.trim() ||
      !formData.babyName.trim()
    ) {
      alert(
        "Please fill out all required fields: Parent Name, Phone and Baby Name."
      );

      return;
    }

    const formattedDate =
      selectedDate.toLocaleString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      );

    const normalizedAge =
      formData.age
        ? formData.age
            .toString()
            .replace(" Years", "")
            .replace(" Year", "") +
          (Number(formData.age) === 1
            ? " Year"
            : " Years")
        : "N/A";

    const payload = {
      ...formData,

      parentName:
        formData.parentName.trim(),

      phone:
        formData.phone.trim(),

      babyName:
        formData.babyName.trim(),

      enqDate: formattedDate,

      age: normalizedAge,

      location:
        formData.location ||
        "Bhubaneswar",

      transport:
        formData.transport || "Yes",

      status:
        formData.status || "New",
    };

    try {
      setLoading(true);

      if (modalMode === "add") {
        const response =
          await fetch(API_URL, {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              payload
            ),
          });

        if (!response.ok) {
          throw new Error(
            "Failed to create inquiry"
          );
        }

        const newEntry =
          await response.json();

        setInquiries((prev) => [
          newEntry,
          ...prev,
        ]);

        setCurrentPage(1);
      }

      if (
        modalMode === "edit" &&
        currentEditSr !== null
      ) {
        const response =
          await fetch(
            `${API_URL}/${currentEditSr}`,
            {
              method: "PUT",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify(
                payload
              ),
            }
          );

        if (!response.ok) {
          throw new Error(
            "Failed to update inquiry"
          );
        }

        const updatedEntry =
          await response.json();

        setInquiries((prev) =>
          prev.map((item) =>
            item.sr === currentEditSr
              ? updatedEntry
              : item
          )
        );
      }

      closeModal();
    } catch (error) {
      console.error(
        "Error saving inquiry:",
        error
      );

      alert(
        "Unable to save inquiry. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     RESET FILTERS
  ======================================================= */

  const handleResetFilters = () => {
    setFilterStatus("");

    setFilterTransport("");

    setFilterLocation("");

    setFilterDate(null);

    setSearchQuery("");

    setCurrentPage(1);
  };

  /* =======================================================
     FILTERED DATA
  ======================================================= */

  const filteredInquiries = useMemo(() => {
    const query =
      searchQuery
        .trim()
        .toLowerCase();

    return inquiries.filter(
      (item) => {
        const parentName =
          item.parentName
            ?.toLowerCase() || "";

        const babyName =
          item.babyName
            ?.toLowerCase() || "";

        const phone =
          item.phone
            ?.toString() || "";

        const address =
          item.address
            ?.toLowerCase() || "";

        const location =
          item.location
            ?.toLowerCase() || "";

        const matchesSearch =
          !query ||
          parentName.includes(query) ||
          babyName.includes(query) ||
          phone.includes(query) ||
          address.includes(query) ||
          location.includes(query);

        const matchesStatus =
          !filterStatus ||
          item.status === filterStatus;

        const matchesTransport =
          !filterTransport ||
          item.transport ===
            filterTransport;

        const matchesLocation =
          !filterLocation ||
          item.location ===
            filterLocation;

        const matchesDate =
          !filterDate ||
          isSameCalendarDate(
            item.enqDate,
            filterDate
          );

        return (
          matchesSearch &&
          matchesStatus &&
          matchesTransport &&
          matchesLocation &&
          matchesDate
        );
      }
    );
  }, [
    inquiries,
    searchQuery,
    filterStatus,
    filterTransport,
    filterLocation,
    filterDate,
  ]);

  /* =======================================================
     PAGINATION
  ======================================================= */

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredInquiries.length /
          entriesPerPage
      )
    );

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

  const indexOfLastEntry =
    currentPage *
    entriesPerPage;

  const indexOfFirstEntry =
    indexOfLastEntry -
    entriesPerPage;

  const currentEntries =
    filteredInquiries.slice(
      indexOfFirstEntry,
      indexOfLastEntry
    );

  /* =======================================================
     SELECTION
  ======================================================= */

  const allCurrentPageSelected =
    currentEntries.length > 0 &&
    currentEntries.every(
      (item) =>
        selectedInquiryIds.includes(
          item.sr
        )
    );

  const allFilteredSelected =
    filteredInquiries.length > 0 &&
    filteredInquiries.every(
      (item) =>
        selectedInquiryIds.includes(
          item.sr
        )
    );

  const handleToggleInquiry =
    (sr) => {
      setSelectedInquiryIds(
        (prev) => {
          if (prev.includes(sr)) {
            return prev.filter(
              (id) => id !== sr
            );
          }

          return [
            ...prev,
            sr,
          ];
        }
      );
    };

  const handleToggleCurrentPage =
    () => {
      if (
        allCurrentPageSelected
      ) {
        setSelectedInquiryIds(
          (prev) =>
            prev.filter(
              (id) =>
                !currentEntries.some(
                  (item) =>
                    item.sr === id
                )
            )
        );
      } else {
        setSelectedInquiryIds(
          (prev) => [
            ...new Set([
              ...prev,
              ...currentEntries.map(
                (item) => item.sr
              ),
            ]),
          ]
        );
      }
    };

  const handleSelectAllFiltered =
    () => {
      if (allFilteredSelected) {
        setSelectedInquiryIds(
          (prev) =>
            prev.filter(
              (id) =>
                !filteredInquiries.some(
                  (item) =>
                    item.sr === id
                )
            )
        );
      } else {
        setSelectedInquiryIds(
          (prev) => [
            ...new Set([
              ...prev,
              ...filteredInquiries.map(
                (item) => item.sr
              ),
            ]),
          ]
        );
      }
    };

  /* =======================================================
     PAGE NUMBERS
  ======================================================= */

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from(
        {
          length: totalPages,
        },
        (_, index) =>
          index + 1
      );
    }

    if (currentPage <= 3) {
      return [
        1,
        2,
        3,
        4,
        "...",
        totalPages,
      ];
    }

    if (
      currentPage >=
      totalPages - 2
    ) {
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
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="pi-container">
      {/* ===================================================
          PAGE HEADER
      =================================================== */}

      <header className="pi-header">
        <div className="pi-title-area">
          <span className="pi-page-eyebrow">
            PARENT RELATIONS
          </span>

          <h1>
            Parents Inquiry Management
          </h1>

          <div className="pi-breadcrumb">
            <span>Dashboard</span>

            <span className="pi-breadcrumb-arrow">
              <FontAwesomeIcon
                icon={faChevronRight}
              />
            </span>

            <strong>
              Parents Inquiry
            </strong>
          </div>
        </div>
      </header>

      {/* ===================================================
          ERROR
      =================================================== */}

      {errorMessage && (
        <div className="pi-error-banner">
          <div className="pi-error-icon">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
            />
          </div>

          <div>
            <strong>
              Connection Error
            </strong>

            <p>
              {errorMessage}
            </p>
          </div>

          <button
            onClick={fetchInquiries}
          >
            <FontAwesomeIcon
              icon={faRotate}
            />
            Retry
          </button>
        </div>
      )}

      {/* ===================================================
          STATS
      =================================================== */}

      <div className="pi-stats-grid">
        <StatCard
          icon={faUserGroup}
          value={inquiries.length}
          label="Total Inquiries"
          subtitle="All Time"
          color="purple"
        />

        <StatCard
          icon={faClock}
          value={
            inquiries.filter(
              (item) =>
                item.status === "New"
            ).length
          }
          label="New Inquiries"
          subtitle="Requires Attention"
          color="blue"
        />

        <StatCard
          icon={faHeart}
          value={
            inquiries.filter(
              (item) =>
                item.status ===
                "Interested"
            ).length
          }
          label="Interested"
          subtitle="Potential Admissions"
          color="green"
        />

        <StatCard
          icon={faCircleXmark}
          value={
            inquiries.filter(
              (item) =>
                item.status ===
                "Not Interested"
            ).length
          }
          label="Not Interested"
          subtitle="Closed Inquiries"
          color="orange"
        />
      </div>

      {/* ===================================================
          TOOLBAR
      =================================================== */}

      <div className="pi-toolbar">
        <div className="pi-toolbar-left">
          <div className="pi-search-wrapper">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
            />

            <input
              type="text"
              placeholder="Search parent, baby, phone..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(
                  e.target.value
                );
                setCurrentPage(1);
              }}
            />

            {searchQuery && (
              <button
                className="pi-search-clear"
                onClick={() =>
                  setSearchQuery("")
                }
              >
                <FontAwesomeIcon
                  icon={faXmark}
                />
              </button>
            )}
          </div>

          <select
            className="pi-select"
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(
                e.target.value
              );
              setCurrentPage(1);
            }}
          >
            <option value="">
              All Status
            </option>

            {STATUS_OPTIONS.map(
              (status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              )
            )}
          </select>

          <select
            className="pi-select"
            value={filterTransport}
            onChange={(e) => {
              setFilterTransport(
                e.target.value
              );
              setCurrentPage(1);
            }}
          >
            <option value="">
              Transport Interest
            </option>

            {TRANSPORT_OPTIONS.map(
              (transport) => (
                <option
                  key={transport}
                  value={transport}
                >
                  {transport}
                </option>
              )
            )}
          </select>

          <div className="pi-date-filter-wrapper">
            <DatePicker
              selected={filterDate}
              onChange={(date) => {
                setFilterDate(date);
                setCurrentPage(1);
              }}
              placeholderText="Select Date"
              className="pi-date-filter-input"
              dateFormat="dd MMM yyyy"
              isClearable
            />

            <FontAwesomeIcon
              icon={faCalendarDays}
              className="pi-date-filter-icon"
            />
          </div>

          <select
            className="pi-select"
            value={filterLocation}
            onChange={(e) => {
              setFilterLocation(
                e.target.value
              );
              setCurrentPage(1);
            }}
          >
            <option value="">
              All Locations
            </option>

            {LOCATION_OPTIONS.map(
              (location) => (
                <option
                  key={location}
                  value={location}
                >
                  {location}
                </option>
              )
            )}
          </select>

          <button
            className="pi-reset-btn"
            onClick={
              handleResetFilters
            }
          >
            <FontAwesomeIcon
              icon={faRotate}
            />

            Reset
          </button>
        </div>

        <div className="pi-toolbar-right">
          <button
            className={`pi-select-all-btn ${
              allFilteredSelected
                ? "selected"
                : ""
            }`}
            onClick={
              handleSelectAllFiltered
            }
            disabled={
              filteredInquiries.length ===
              0
            }
          >
            <span className="pi-select-all-check">
              <FontAwesomeIcon
                icon={faCheck}
              />
            </span>

            {allFilteredSelected
              ? "Clear All"
              : "Select All"}
          </button>

          {selectedInquiryIds.length >
            0 && (
            <button
              className="pi-bulk-delete-btn"
              onClick={
                handleDeleteSelected
              }
            >
              <FontAwesomeIcon
                icon={faTrash}
              />

              Delete Selected
              <span>
                {selectedInquiryIds.length}
              </span>
            </button>
          )}

          <button
            className="pi-add-btn"
            onClick={
              handleOpenAddModal
            }
          >
            <FontAwesomeIcon
              icon={faPlus}
            />

            Add Inquiry
          </button>
        </div>
      </div>

      {/* ===================================================
          SELECTION SUMMARY
      =================================================== */}

      {selectedInquiryIds.length >
        0 && (
        <div className="pi-selection-bar">
          <div>
            <span className="pi-selection-check">
              <FontAwesomeIcon
                icon={faCheck}
              />
            </span>

            <strong>
              {selectedInquiryIds.length}
            </strong>

            inquiry
            {selectedInquiryIds.length >
            1
              ? "ies"
              : ""}{" "}
            selected
          </div>

          <div>
            <button
              onClick={() =>
                setSelectedInquiryIds(
                  []
                )
              }
            >
              Clear Selection
            </button>

            {!allFilteredSelected &&
              filteredInquiries.length >
                0 && (
                <button
                  onClick={
                    handleSelectAllFiltered
                  }
                >
                  Select all{" "}
                  {
                    filteredInquiries.length
                  }{" "}
                  filtered inquiries
                </button>
              )}
          </div>
        </div>
      )}

      {/* ===================================================
          TABLE
      =================================================== */}

      <div className="pi-table-card">
        <div className="pi-table-card-header">
          <div>
            <h2>
              Inquiry Records
            </h2>

            <p>
              Manage and track parent
              admission inquiries
            </p>
          </div>

          <div className="pi-table-summary">
            <span>
              {filteredInquiries.length}
            </span>

            records
          </div>
        </div>

        <div className="pi-table-scroll">
          <table className="pi-table">
            <thead>
              <tr>
                <th className="pi-checkbox-column">
                  <input
                    type="checkbox"
                    checked={
                      allCurrentPageSelected
                    }
                    onChange={
                      handleToggleCurrentPage
                    }
                    disabled={
                      currentEntries.length ===
                      0
                    }
                    aria-label="Select current page"
                  />
                </th>

                <th>Sr No.</th>

                <th>Enquiry Date</th>

                <th>Parent</th>

                <th>Baby Name</th>

                <th>Age</th>

                <th>Location</th>

                <th>Phone</th>

                <th>Address</th>

                <th>Transport</th>

                <th>Status</th>

                <th className="pi-action-header">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="12"
                    className="pi-loading-cell"
                  >
                    <div className="pi-loading-state">
                      <span className="pi-loading-spinner" />

                      <span>
                        Loading inquiries...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : currentEntries.length >
                0 ? (
                currentEntries.map(
                  (item, index) => {
                    const isSelected =
                      selectedInquiryIds.includes(
                        item.sr
                      );

                    return (
                      <tr
                        key={
                          item.sr ??
                          `${item.parentName}-${index}`
                        }
                        className={
                          isSelected
                            ? "pi-row-selected"
                            : ""
                        }
                      >
                        <td className="pi-checkbox-column">
                          <input
                            type="checkbox"
                            checked={
                              isSelected
                            }
                            onChange={() =>
                              handleToggleInquiry(
                                item.sr
                              )
                            }
                            aria-label={`Select inquiry ${item.parentName}`}
                          />
                        </td>

                        <td>
                          <span className="pi-sr-number">
                            {indexOfFirstEntry +
                              index +
                              1}
                          </span>
                        </td>

                        <td>
                          <div className="pi-date-cell">
                            <span>
                              {formatDateForDisplay(
                                item.enqDate
                              )}
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="pi-parent-cell">
                            <div className="pi-parent-avatar">
                              {item.parentName
                                ?.charAt(0)
                                ?.toUpperCase() ||
                                "P"}
                            </div>

                            <div>
                              <strong>
                                {
                                  item.parentName
                                }
                              </strong>

                              <span>
                                {item.email ||
                                  "No email"}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="pi-baby-cell">
                            <span className="pi-baby-icon">
                              <FontAwesomeIcon
                                icon={faBaby}
                              />
                            </span>

                            <strong>
                              {item.babyName}
                            </strong>
                          </div>
                        </td>

                        <td>
                          <span className="pi-age-text">
                            {item.age ||
                              "N/A"}
                          </span>
                        </td>

                        <td>
                          <div className="pi-location-cell">
                            <FontAwesomeIcon
                              icon={
                                faLocationDot
                              }
                            />

                            <span>
                              {item.location ||
                                "N/A"}
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="pi-phone-cell">
                            <FontAwesomeIcon
                              icon={faPhone}
                            />

                            <span>
                              {item.phone ||
                                "N/A"}
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="pi-address-cell">
                            <FontAwesomeIcon
                              icon={faHouse}
                            />

                            <span
                              title={
                                item.address ||
                                "N/A"
                              }
                            >
                              {item.address ||
                                "N/A"}
                            </span>
                          </div>
                        </td>

                        <td>
                          <TransportBadge
                            transport={
                              item.transport
                            }
                          />
                        </td>

                        <td>
                          <StatusBadge
                            status={
                              item.status
                            }
                          />
                        </td>

                        {/* ACTIONS */}
                        <td className="pi-actions-cell">
                          <button
                            className="pi-action-btn pi-view-btn"
                            onClick={() =>
                              handleOpenViewModal(
                                item
                              )
                            }
                            title="View Inquiry"
                          >
                            <FontAwesomeIcon
                              icon={faEye}
                            />
                          </button>

                          <button
                            className="pi-action-btn pi-edit-btn"
                            onClick={() =>
                              handleOpenEditModal(
                                item
                              )
                            }
                            title="Edit Inquiry"
                          >
                            <FontAwesomeIcon
                              icon={faPen}
                            />
                          </button>

                          <button
                            className="pi-action-btn pi-delete-btn"
                            onClick={() =>
                              handleDelete(
                                item.sr
                              )
                            }
                            title="Delete Inquiry"
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  }
                )
              ) : (
                <tr>
                  <td
                    colSpan="12"
                    className="pi-empty-cell"
                  >
                    <div className="pi-empty-state">
                      <div className="pi-empty-icon">
                        <FontAwesomeIcon
                          icon={
                            faUserGroup
                          }
                        />
                      </div>

                      <h3>
                        No inquiries found
                      </h3>

                      <p>
                        No inquiry records
                        match your current
                        filters.
                      </p>

                      <button
                        onClick={
                          handleResetFilters
                        }
                      >
                        <FontAwesomeIcon
                          icon={faRotate}
                        />
                        Reset Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* =================================================
            PAGINATION
        ================================================= */}

        <div className="pi-pagination">
          <div className="pi-pagination-info">
            Showing{" "}
            <strong>
              {filteredInquiries.length >
              0
                ? indexOfFirstEntry + 1
                : 0}
            </strong>{" "}
            to{" "}
            <strong>
              {Math.min(
                indexOfLastEntry,
                filteredInquiries.length
              )}
            </strong>{" "}
            of{" "}
            <strong>
              {filteredInquiries.length}
            </strong>{" "}
            entries
          </div>

          <div className="pi-pagination-right">
            <div className="pi-per-page">
              <span>Rows</span>

              <select
                value={
                  entriesPerPage
                }
                onChange={(e) => {
                  setEntriesPerPage(
                    Number(
                      e.target.value
                    )
                  );

                  setCurrentPage(1);
                }}
              >
                <option value={5}>
                  5
                </option>

                <option value={10}>
                  10
                </option>

                <option value={20}>
                  20
                </option>

                <option value={50}>
                  50
                </option>
              </select>
            </div>

            <div className="pi-pagination-controls">
              <button
                className="pi-page-btn"
                onClick={() =>
                  setCurrentPage(1)
                }
                disabled={
                  currentPage === 1
                }
              >
                <FontAwesomeIcon
                  icon={faAnglesLeft}
                />
              </button>

              <button
                className="pi-page-btn"
                onClick={() =>
                  setCurrentPage(
                    (prev) =>
                      Math.max(
                        prev - 1,
                        1
                      )
                  )
                }
                disabled={
                  currentPage === 1
                }
              >
                <FontAwesomeIcon
                  icon={faChevronLeft}
                />
              </button>

              {getPageNumbers().map(
                (page, index) =>
                  page === "..." ? (
                    <span
                      key={`dots-${index}`}
                      className="pi-pagination-dots"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      className={`pi-page-btn ${
                        currentPage ===
                        page
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
                  )
              )}

              <button
                className="pi-page-btn"
                onClick={() =>
                  setCurrentPage(
                    (prev) =>
                      Math.min(
                        prev + 1,
                        totalPages
                      )
                  )
                }
                disabled={
                  currentPage ===
                  totalPages
                }
              >
                <FontAwesomeIcon
                  icon={
                    faChevronRight
                  }
                />
              </button>

              <button
                className="pi-page-btn"
                onClick={() =>
                  setCurrentPage(
                    totalPages
                  )
                }
                disabled={
                  currentPage ===
                  totalPages
                }
              >
                <FontAwesomeIcon
                  icon={
                    faAnglesRight
                  }
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================
          MODAL
      =================================================== */}

      {isModalOpen && (
        <div
          className="pi-modal-backdrop"
          onClick={closeModal}
        >
          <div
            className="pi-modal-content"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            {/* MODAL HEADER */}

            <div className="pi-modal-header">
              <div>
                <span className="pi-modal-eyebrow">
                  PARENT INQUIRY
                </span>

                <h2>
                  {modalMode === "add" &&
                    "Add New Inquiry"}

                  {modalMode === "edit" &&
                    "Edit Inquiry"}

                  {modalMode === "view" &&
                    "Inquiry Details"}
                </h2>

                <p>
                  {modalMode === "view"
                    ? "Review complete inquiry information."
                    : "Enter the inquiry information carefully."}
                </p>
              </div>

              <button
                className="pi-modal-close"
                onClick={
                  closeModal
                }
              >
                <FontAwesomeIcon
                  icon={faXmark}
                />
              </button>
            </div>

            {/* MODAL BODY */}

            <div className="pi-modal-body">
              {/* PARENT */}

              <section className="pi-form-section">
                <div className="pi-form-section-title">
                  <div className="pi-section-icon">
                    <FontAwesomeIcon
                      icon={
                        faUserGroup
                      }
                    />
                  </div>

                  <div>
                    <h3>
                      Parent Information
                    </h3>

                    <p>
                      Contact information
                      of the parent or
                      guardian.
                    </p>
                  </div>
                </div>

                <div className="pi-form-grid">
                  <div className="pi-form-group">
                    <label>
                      Parent Name{" "}
                      <span>*</span>
                    </label>

                    <div className="pi-input-wrapper">
                      <FontAwesomeIcon
                        icon={
                          faUserGroup
                        }
                      />

                      <input
                        type="text"
                        name="parentName"
                        value={
                          formData.parentName ||
                          ""
                        }
                        onChange={
                          handleInputChange
                        }
                        disabled={
                          modalMode ===
                          "view"
                        }
                        placeholder="Enter parent name"
                      />
                    </div>
                  </div>

                  <div className="pi-form-group">
                    <label>
                      Phone No.{" "}
                      <span>*</span>
                    </label>

                    <div className="pi-input-wrapper">
                      <FontAwesomeIcon
                        icon={faPhone}
                      />

                      <input
                        type="tel"
                        name="phone"
                        value={
                          formData.phone ||
                          ""
                        }
                        onChange={
                          handleInputChange
                        }
                        disabled={
                          modalMode ===
                          "view"
                        }
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>

                  <div className="pi-form-group">
                    <label>
                      Email
                    </label>

                    <div className="pi-input-wrapper">
                      <FontAwesomeIcon
                        icon={
                          faEnvelope
                        }
                      />

                      <input
                        type="email"
                        name="email"
                        value={
                          formData.email ||
                          ""
                        }
                        onChange={
                          handleInputChange
                        }
                        disabled={
                          modalMode ===
                          "view"
                        }
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>

                  <div className="pi-form-group pi-full-width">
                    <label>
                      Address
                    </label>

                    <div className="pi-input-wrapper">
                      <FontAwesomeIcon
                        icon={faHouse}
                      />

                      <input
                        type="text"
                        name="address"
                        value={
                          formData.address ||
                          ""
                        }
                        onChange={
                          handleInputChange
                        }
                        disabled={
                          modalMode ===
                          "view"
                        }
                        placeholder="Enter complete address"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* CHILD */}

              <section className="pi-form-section">
                <div className="pi-form-section-title">
                  <div className="pi-section-icon blue">
                    <FontAwesomeIcon
                      icon={faBaby}
                    />
                  </div>

                  <div>
                    <h3>
                      Child Information
                    </h3>

                    <p>
                      Basic details about
                      the child.
                    </p>
                  </div>
                </div>

                <div className="pi-form-grid">
                  <div className="pi-form-group">
                    <label>
                      Baby Name{" "}
                      <span>*</span>
                    </label>

                    <div className="pi-input-wrapper">
                      <FontAwesomeIcon
                        icon={faBaby}
                      />

                      <input
                        type="text"
                        name="babyName"
                        value={
                          formData.babyName ||
                          ""
                        }
                        onChange={
                          handleInputChange
                        }
                        disabled={
                          modalMode ===
                          "view"
                        }
                        placeholder="Enter baby name"
                      />
                    </div>
                  </div>

                  <div className="pi-form-group">
                    <label>
                      Age
                    </label>

                    <select
                      name="age"
                      value={
                        formData.age ||
                        ""
                      }
                      onChange={
                        handleInputChange
                      }
                      disabled={
                        modalMode ===
                        "view"
                      }
                    >
                      <option value="">
                        Select age
                      </option>

                      <option value="1">
                        1 Year
                      </option>

                      <option value="2">
                        2 Years
                      </option>

                      <option value="2.5">
                        2.5 Years
                      </option>

                      <option value="3">
                        3 Years
                      </option>

                      <option value="3.5">
                        3.5 Years
                      </option>

                      <option value="4">
                        4 Years
                      </option>
                    </select>
                  </div>
                </div>
              </section>

              {/* INQUIRY */}

              <section className="pi-form-section">
                <div className="pi-form-section-title">
                  <div className="pi-section-icon green">
                    <FontAwesomeIcon
                      icon={faFilter}
                    />
                  </div>

                  <div>
                    <h3>
                      Inquiry Details
                    </h3>

                    <p>
                      Admission preference
                      and follow-up details.
                    </p>
                  </div>
                </div>

                <div className="pi-form-grid">
                  <div className="pi-form-group">
                    <label>
                      Transport Interest
                    </label>

                    <select
                      name="transport"
                      value={
                        formData.transport ||
                        ""
                      }
                      onChange={
                        handleInputChange
                      }
                      disabled={
                        modalMode ===
                        "view"
                      }
                    >
                      <option value="">
                        Select transport
                      </option>

                      <option value="Yes">
                        Yes
                      </option>

                      <option value="No">
                        No
                      </option>
                    </select>
                  </div>

                  <div className="pi-form-group">
                    <label>
                      Inquiry Status
                    </label>

                    <select
                      name="status"
                      value={
                        formData.status ||
                        ""
                      }
                      onChange={
                        handleInputChange
                      }
                      disabled={
                        modalMode ===
                        "view"
                      }
                    >
                      <option value="">
                        Select status
                      </option>

                      {STATUS_OPTIONS.map(
                        (status) => (
                          <option
                            key={status}
                            value={
                              status
                            }
                          >
                            {status}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div className="pi-form-group">
                    <label>
                      Preferred Location
                    </label>

                    <select
                      name="location"
                      value={
                        formData.location ||
                        ""
                      }
                      onChange={
                        handleInputChange
                      }
                      disabled={
                        modalMode ===
                        "view"
                      }
                    >
                      <option value="">
                        Select location
                      </option>

                      {LOCATION_OPTIONS.map(
                        (location) => (
                          <option
                            key={
                              location
                            }
                            value={
                              location
                            }
                          >
                            {location}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div className="pi-form-group">
                    <label>
                      Inquiry Date
                    </label>

                    {modalMode ===
                    "view" ? (
                      <div className="pi-input-wrapper">
                        <FontAwesomeIcon
                          icon={
                            faCalendarRegular
                          }
                        />

                        <input
                          type="text"
                          value={
                            formData.enqDate ||
                            "N/A"
                          }
                          disabled
                        />
                      </div>
                    ) : (
                      <div className="pi-datepicker-wrapper">
                        <DatePicker
                          selected={
                            selectedDate
                          }
                          onChange={(
                            date
                          ) =>
                            setSelectedDate(
                              date ||
                                new Date()
                            )
                          }
                          showTimeSelect
                          dateFormat="dd MMM yyyy hh:mm aa"
                          className="pi-datepicker-input"
                          popperPlacement="bottom-start"
                        />

                        <FontAwesomeIcon
                          icon={
                            faCalendarRegular
                          }
                          className="pi-datepicker-icon"
                        />
                      </div>
                    )}
                  </div>

                  <div className="pi-form-group pi-full-width">
                    <label>
                      Notes
                    </label>

                    <textarea
                      name="notes"
                      value={
                        formData.notes ||
                        ""
                      }
                      onChange={
                        handleInputChange
                      }
                      disabled={
                        modalMode ===
                        "view"
                      }
                      placeholder="Add additional notes..."
                      rows="4"
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* MODAL FOOTER */}

            <div className="pi-modal-footer">
              <button
                className="pi-btn-cancel"
                onClick={
                  closeModal
                }
              >
                {modalMode ===
                "view"
                  ? "Close"
                  : "Cancel"}
              </button>

              {modalMode !==
                "view" && (
                <button
                  className="pi-btn-save"
                  onClick={
                    handleSaveInquiry
                  }
                  disabled={loading}
                >
                  {loading
                    ? "Saving..."
                    : modalMode ===
                      "add"
                    ? "Save Inquiry"
                    : "Update Inquiry"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentsInquiry;