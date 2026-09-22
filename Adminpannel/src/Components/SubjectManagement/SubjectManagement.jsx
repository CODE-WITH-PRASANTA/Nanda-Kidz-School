import React, { useState, useEffect, useMemo } from "react";
import {
  BookOpen,
  Search,
  SlidersHorizontal,
  Edit3,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Save,
  RotateCcw,
  Plus,
  X,
  Check,
  CheckSquare,
  MoreVertical,
  Library,
} from "lucide-react";

import "./SubjectManagement.css";

const API_BASE_URL = "http://localhost:5000/api/subjects";
const CLASS_API_URL = "http://localhost:5000/api/classes";

const ITEMS_PER_PAGE = 5;

const SubjectManagement = () => {
  /* =========================================================
     STATES
  ========================================================= */

  const [subjects, setSubjects] = useState([]);
  const [classList, setClassList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isFormVisible, setIsFormVisible] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [openDropdownId, setOpenDropdownId] =
    useState(null);

  /* Filter */
  const [isFilterOpen, setIsFilterOpen] =
    useState(false);

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [classFilter, setClassFilter] =
    useState("All");

  /* Selection */
  const [selectedIds, setSelectedIds] =
    useState([]);

  /* Form */
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    className: "",
    description: "",
    status: "Active",
  });

  /* =========================================================
     FETCH DATA
  ========================================================= */

  useEffect(() => {
    fetchSubjects();
    fetchClasses();
  }, []);

  /* =========================================================
     FETCH SUBJECTS
  ========================================================= */

  const fetchSubjects = async () => {
    setLoading(true);
    setError(null);

    try {
      const response =
        await fetch(API_BASE_URL);

      if (!response.ok) {
        throw new Error(
          "Failed to fetch subjects"
        );
      }

      const data =
        await response.json();

      setSubjects(data);
    } catch (err) {
      console.error(
        "Error fetching subjects:",
        err
      );

      setError(
        err.message ||
          "Error connecting to server"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     FETCH CLASSES
  ========================================================= */

  const fetchClasses = async () => {
    try {
      const response =
        await fetch(CLASS_API_URL);

      if (!response.ok) {
        throw new Error(
          "Failed to fetch classes"
        );
      }

      const data =
        await response.json();

      setClassList(data);
    } catch (err) {
      console.error(
        "Error fetching classes:",
        err
      );
    }
  };

  /* =========================================================
     TOGGLE FORM
  ========================================================= */

  const handleToggleForm = () => {
    if (isFormVisible) {
      resetForm();
      setIsFormVisible(false);
    } else {
      resetForm();
      setIsFormVisible(true);
    }
  };

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
     RESET FORM
  ========================================================= */

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      className: "",
      description: "",
      status: "Active",
    });

    setEditingId(null);
  };

  /* =========================================================
     SUBMIT FORM
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.code ||
      !formData.className
    ) {
      alert(
        "Please fill all required fields!"
      );
      return;
    }

    try {
      if (editingId !== null) {
        /* UPDATE */

        const response = await fetch(
          `${API_BASE_URL}/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const resData =
          await response.json();

        if (!response.ok) {
          throw new Error(
            resData.message ||
              "Failed to update subject"
          );
        }

        setSubjects((prev) =>
          prev.map((sub) =>
            sub._id === editingId
              ? resData
              : sub
          )
        );

        alert(
          "Subject updated successfully!"
        );
      } else {
        /* CREATE */

        const response = await fetch(
          API_BASE_URL,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const resData =
          await response.json();

        if (!response.ok) {
          throw new Error(
            resData.message ||
              "Failed to add subject"
          );
        }

        setSubjects((prev) => [
          resData,
          ...prev,
        ]);

        alert(
          "Subject created successfully!"
        );
      }

      resetForm();
      setIsFormVisible(false);
    } catch (err) {
      console.error(
        "Subject save error:",
        err
      );

      alert(
        `Error: ${err.message}`
      );
    }
  };

  /* =========================================================
     EDIT
  ========================================================= */

  const handleEdit = (subject) => {
    setFormData({
      name: subject.name || "",
      code: subject.code || "",
      className:
        subject.className || "",
      description:
        subject.description || "",
      status:
        subject.status || "Active",
    });

    setEditingId(subject._id);

    setIsFormVisible(true);

    setOpenDropdownId(null);
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = async (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this subject?"
      );

    if (!confirmed) return;

    try {
      const response =
        await fetch(
          `${API_BASE_URL}/${id}`,
          {
            method: "DELETE",
          }
        );

      const resData =
        await response.json();

      if (!response.ok) {
        throw new Error(
          resData.message ||
            "Failed to delete subject"
        );
      }

      setSubjects((prev) =>
        prev.filter(
          (sub) => sub._id !== id
        )
      );

      setSelectedIds((prev) =>
        prev.filter(
          (selectedId) =>
            selectedId !== id
        )
      );

      if (editingId === id) {
        resetForm();
      }

      alert(
        "Subject deleted successfully!"
      );
    } catch (err) {
      console.error(
        "Delete error:",
        err
      );

      alert(
        `Error: ${err.message}`
      );
    } finally {
      setOpenDropdownId(null);
    }
  };

  /* =========================================================
     STATUS CHANGE
  ========================================================= */

  const handleStatusChange = async (
    id,
    newStatus
  ) => {
    try {
      const response =
        await fetch(
          `${API_BASE_URL}/${id}/status`,
          {
            method: "PATCH",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              status: newStatus,
            }),
          }
        );

      const resData =
        await response.json();

      if (!response.ok) {
        throw new Error(
          resData.message ||
            "Failed to update status"
        );
      }

      setSubjects((prev) =>
        prev.map((sub) =>
          sub._id === id
            ? {
                ...sub,
                status: newStatus,
              }
            : sub
        )
      );
    } catch (err) {
      console.error(
        "Status update error:",
        err
      );

      alert(
        `Error: ${err.message}`
      );
    } finally {
      setOpenDropdownId(null);
    }
  };

  /* =========================================================
     FILTER SUBJECTS
  ========================================================= */

  const filteredSubjects = useMemo(() => {
    const query =
      searchQuery
        .trim()
        .toLowerCase();

    return subjects.filter((sub) => {
      const matchesSearch =
        !query ||
        (sub.name &&
          sub.name
            .toLowerCase()
            .includes(query)) ||
        (sub.code &&
          sub.code
            .toLowerCase()
            .includes(query)) ||
        (sub.className &&
          sub.className
            .toLowerCase()
            .includes(query)) ||
        (sub.description &&
          sub.description
            .toLowerCase()
            .includes(query));

      const matchesStatus =
        statusFilter === "All" ||
        sub.status === statusFilter;

      const matchesClass =
        classFilter === "All" ||
        sub.className === classFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesClass
      );
    });
  }, [
    subjects,
    searchQuery,
    statusFilter,
    classFilter,
  ]);

  /* =========================================================
     RESET PAGE WHEN FILTER CHANGES
  ========================================================= */

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    statusFilter,
    classFilter,
  ]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages =
    Math.ceil(
      filteredSubjects.length /
        ITEMS_PER_PAGE
    ) || 1;

  const startIndex =
    (currentPage - 1) *
    ITEMS_PER_PAGE;

  const currentData =
    filteredSubjects.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );

  /* =========================================================
     SELECT CURRENT PAGE
  ========================================================= */

  const currentPageIds =
    currentData.map(
      (item) => item._id
    );

  const allCurrentPageSelected =
    currentPageIds.length > 0 &&
    currentPageIds.every((id) =>
      selectedIds.includes(id)
    );

  const someCurrentPageSelected =
    currentPageIds.some((id) =>
      selectedIds.includes(id)
    );

  /* =========================================================
     SELECT SINGLE
  ========================================================= */

  const handleSelectOne = (id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter(
          (item) => item !== id
        );
      }

      return [...prev, id];
    });
  };

  /* =========================================================
     SELECT ALL
  ========================================================= */

  const handleSelectAll = () => {
    if (allCurrentPageSelected) {
      setSelectedIds((prev) =>
        prev.filter(
          (id) =>
            !currentPageIds.includes(id)
        )
      );
    } else {
      setSelectedIds((prev) => {
        return [
          ...new Set([
            ...prev,
            ...currentPageIds,
          ]),
        ];
      });
    }
  };

  /* =========================================================
     CLEAR SELECTION
  ========================================================= */

  const handleClearSelection = () => {
    setSelectedIds([]);
  };

  /* =========================================================
     CLEAR FILTERS
  ========================================================= */

  const handleClearFilters = () => {
    setStatusFilter("All");
    setClassFilter("All");
    setSearchQuery("");
    setIsFilterOpen(false);
  };

  /* =========================================================
     CLOSE DROPDOWN WHEN CLICK OUTSIDE
  ========================================================= */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !event.target.closest(
          ".sm-dropdown-container"
        )
      ) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener(
      "click",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "click",
        handleOutsideClick
      );
    };
  }, []);

  /* =========================================================
     PAGINATION RANGE
  ========================================================= */

  const showingFrom =
    filteredSubjects.length === 0
      ? 0
      : startIndex + 1;

  const showingTo = Math.min(
    startIndex + ITEMS_PER_PAGE,
    filteredSubjects.length
  );

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="sm-container">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="sm-header">

        <div>
          <h2 className="sm-title">
            Subject Management
          </h2>

          <div className="sm-breadcrumb">
            <span>Dashboard</span>

            <span className="sm-breadcrumb-arrow">
              ›
            </span>

            <span className="sm-breadcrumb-active">
              Subject Management
            </span>
          </div>
        </div>

        <button
          className="sm-btn-primary"
          onClick={handleToggleForm}
        >
          {isFormVisible ? (
            <>
              <X size={16} />
              Close Form
            </>
          ) : (
            <>
              <Plus size={16} />
              Add Subject
            </>
          )}
        </button>

      </div>


      {/* =====================================================
          MAIN GRID
      ===================================================== */}

      <div
        className={`sm-grid ${
          isFormVisible
            ? "sm-grid-split"
            : "sm-grid-full"
        }`}
      >

        {/* ===================================================
            FORM
        =================================================== */}

        {isFormVisible && (
          <div className="sm-card sm-form-card">

            <div className="sm-form-header">

              <div className="sm-form-title-wrapper">

                <div className="sm-form-icon">
                  <BookOpen size={18} />
                </div>

                <div>
                  <h3>
                    {editingId
                      ? "Edit Subject"
                      : "Add Subject"}
                  </h3>

                  <p>
                    {editingId
                      ? "Update subject information"
                      : "Create a new subject"}
                  </p>
                </div>

              </div>

              <button
                type="button"
                className="sm-form-close"
                onClick={handleToggleForm}
              >
                <X size={17} />
              </button>

            </div>


            <form
              onSubmit={handleSubmit}
              className="sm-form"
            >

              {/* SUBJECT NAME */}

              <div className="sm-form-group">

                <label>
                  Subject Name
                  <span className="sm-required">
                    *
                  </span>
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={
                    handleInputChange
                  }
                  placeholder="Enter subject name"
                  required
                />

              </div>


              {/* SUBJECT CODE */}

              <div className="sm-form-group">

                <label>
                  Subject Code
                  <span className="sm-required">
                    *
                  </span>
                </label>

                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={
                    handleInputChange
                  }
                  placeholder="Enter subject code"
                  required
                />

              </div>


              {/* CLASS */}

              <div className="sm-form-group">

                <label>
                  Select Class
                  <span className="sm-required">
                    *
                  </span>
                </label>

                <select
                  name="className"
                  value={
                    formData.className
                  }
                  onChange={
                    handleInputChange
                  }
                  required
                >

                  <option value="">
                    Select Class
                  </option>

                  {classList.map(
                    (cls) => (
                      <option
                        key={cls._id}
                        value={`${cls.name} - Sec ${cls.section}`}
                      >
                        {cls.name} (
                        {cls.section})
                      </option>
                    )
                  )}

                </select>

              </div>


              {/* DESCRIPTION */}

              <div className="sm-form-group">

                <label>
                  Description
                  <span className="sm-optional">
                    Optional
                  </span>
                </label>

                <textarea
                  name="description"
                  rows="4"
                  value={
                    formData.description
                  }
                  onChange={
                    handleInputChange
                  }
                  placeholder="Enter subject description..."
                />

              </div>


              {/* STATUS */}

              <div className="sm-form-group">

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


              {/* FORM ACTIONS */}

              <div className="sm-form-actions">

                <button
                  type="button"
                  className="sm-btn-secondary"
                  onClick={resetForm}
                >
                  <RotateCcw size={14} />
                  Reset
                </button>

                <button
                  type="submit"
                  className="sm-btn-save"
                >
                  <Save size={16} />

                  {editingId
                    ? "Update Subject"
                    : "Save Subject"}
                </button>

              </div>

            </form>

          </div>
        )}


        {/* ===================================================
            SUBJECT TABLE
        =================================================== */}

        <div className="sm-card sm-table-card">

          {/* TABLE TOPBAR */}

          <div className="sm-table-topbar">

            <div className="sm-table-title-wrapper">

              <div className="sm-table-icon">
                <Library size={18} />
              </div>

              <div>
                <h3>
                  Subject List
                </h3>

                <p>
                  Manage subjects and class
                  assignments
                </p>
              </div>

            </div>


            {/* SEARCH + FILTER */}

            <div className="sm-table-tools">

              {/* SEARCH */}

              <div className="sm-search-box">

                <div className="sm-search-icon">
                  <Search size={17} />
                </div>

                <input
                  type="text"
                  placeholder="Search subjects..."
                  value={
                    searchQuery
                  }
                  onChange={(e) => {
                    setSearchQuery(
                      e.target.value
                    );
                    setCurrentPage(1);
                  }}
                />

                {searchQuery && (
                  <button
                    type="button"
                    className="sm-search-clear"
                    onClick={() =>
                      setSearchQuery("")
                    }
                  >
                    <X size={14} />
                  </button>
                )}

              </div>


              {/* FILTER */}

              <div className="sm-filter-wrapper">

                <button
                  type="button"
                  className={`sm-filter-button ${
                    isFilterOpen
                      ? "sm-filter-active"
                      : ""
                  }`}
                  onClick={() =>
                    setIsFilterOpen(
                      (prev) => !prev
                    )
                  }
                >
                  <SlidersHorizontal
                    size={15}
                  />

                  <span>
                    Filter
                  </span>

                  {(statusFilter !==
                    "All" ||
                    classFilter !==
                      "All") && (
                    <span className="sm-filter-count">
                      1
                    </span>
                  )}

                </button>


                {/* FILTER DROPDOWN */}

                {isFilterOpen && (
                  <div className="sm-filter-dropdown">

                    <div className="sm-filter-header">

                      <div>
                        <strong>
                          Filter Subjects
                        </strong>

                        <span>
                          Refine your subject
                          list
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setIsFilterOpen(
                            false
                          )
                        }
                      >
                        <X size={15} />
                      </button>

                    </div>


                    <div className="sm-filter-body">

                      {/* STATUS */}

                      <div className="sm-filter-field">

                        <label>
                          Status
                        </label>

                        <select
                          value={
                            statusFilter
                          }
                          onChange={(e) =>
                            setStatusFilter(
                              e.target.value
                            )
                          }
                        >
                          <option value="All">
                            All Status
                          </option>

                          <option value="Active">
                            Active
                          </option>

                          <option value="Inactive">
                            Inactive
                          </option>
                        </select>

                      </div>


                      {/* CLASS */}

                      <div className="sm-filter-field">

                        <label>
                          Class
                        </label>

                        <select
                          value={
                            classFilter
                          }
                          onChange={(e) =>
                            setClassFilter(
                              e.target.value
                            )
                          }
                        >

                          <option value="All">
                            All Classes
                          </option>

                          {classList.map(
                            (cls) => {
                              const value = `${cls.name} - Sec ${cls.section}`;

                              return (
                                <option
                                  key={
                                    cls._id
                                  }
                                  value={
                                    value
                                  }
                                >
                                  {
                                    value
                                  }
                                </option>
                              );
                            }
                          )}

                        </select>

                      </div>

                    </div>


                    <div className="sm-filter-footer">

                      <button
                        type="button"
                        className="sm-filter-reset"
                        onClick={
                          handleClearFilters
                        }
                      >
                        Reset
                      </button>

                      <button
                        type="button"
                        className="sm-filter-apply"
                        onClick={() =>
                          setIsFilterOpen(
                            false
                          )
                        }
                      >
                        <Check size={14} />
                        Apply Filter
                      </button>

                    </div>

                  </div>
                )}

              </div>

            </div>

          </div>


          {/* =================================================
              SELECTION BAR
          ================================================= */}

          {selectedIds.length > 0 && (
            <div className="sm-selection-bar">

              <div className="sm-selection-left">

                <div className="sm-selection-icon">
                  <CheckSquare size={16} />
                </div>

                <div>
                  <strong>
                    {selectedIds.length}
                  </strong>

                  <span>
                    {selectedIds.length ===
                    1
                      ? " subject selected"
                      : " subjects selected"}
                  </span>
                </div>

              </div>

              <button
                type="button"
                className="sm-clear-selection"
                onClick={
                  handleClearSelection
                }
              >
                Clear Selection
              </button>

            </div>
          )}


          {/* =================================================
              TABLE
          ================================================= */}

          <div className="sm-table-responsive">

            {loading ? (

              <div className="sm-loading-state">

                <div className="sm-loader" />

                <span>
                  Loading subjects...
                </span>

              </div>

            ) : error ? (

              <div className="sm-error-state">

                <strong>
                  Unable to load subjects
                </strong>

                <span>
                  {error}
                </span>

                <button
                  onClick={
                    fetchSubjects
                  }
                >
                  Try Again
                </button>

              </div>

            ) : (

              <table className="sm-table">

                <thead>

                  <tr>

                    {/* SELECT ALL */}

                    <th className="sm-select-column">

                      <label className="sm-checkbox-wrapper">

                        <input
                          type="checkbox"
                          checked={
                            allCurrentPageSelected
                          }
                          ref={(input) => {
                            if (input) {
                              input.indeterminate =
                                !allCurrentPageSelected &&
                                someCurrentPageSelected;
                            }
                          }}
                          onChange={
                            handleSelectAll
                          }
                        />

                        <span className="sm-custom-checkbox">

                          {allCurrentPageSelected && (
                            <Check size={12} />
                          )}

                        </span>

                      </label>

                    </th>

                    <th>#</th>

                    <th>
                      Subject Name
                    </th>

                    <th>
                      Subject Code
                    </th>

                    <th>
                      Class
                    </th>

                    <th>
                      Description
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

                  {currentData.length >
                  0 ? (

                    currentData.map(
                      (item, index) => {

                        const isSelected =
                          selectedIds.includes(
                            item._id
                          );

                        return (
                          <tr
                            key={
                              item._id
                            }
                            className={
                              isSelected
                                ? "sm-selected-row"
                                : ""
                            }
                          >

                            {/* CHECKBOX */}

                            <td className="sm-select-column">

                              <label className="sm-checkbox-wrapper">

                                <input
                                  type="checkbox"
                                  checked={
                                    isSelected
                                  }
                                  onChange={() =>
                                    handleSelectOne(
                                      item._id
                                    )
                                  }
                                />

                                <span className="sm-custom-checkbox">

                                  {isSelected && (
                                    <Check
                                      size={
                                        12
                                      }
                                    />
                                  )}

                                </span>

                              </label>

                            </td>


                            {/* NUMBER */}

                            <td className="sm-row-number">
                              {startIndex +
                                index +
                                1}
                            </td>


                            {/* SUBJECT NAME */}

                            <td className="sm-fw-bold">

                              <div className="sm-subject-name">

                                <span className="sm-subject-avatar">
                                  {item.name
                                    ?.charAt(
                                      0
                                    )
                                    ?.toUpperCase() ||
                                    "S"}
                                </span>

                                <span>
                                  {item.name}
                                </span>

                              </div>

                            </td>


                            {/* CODE */}

                            <td>

                              <span className="sm-code-pill">
                                {
                                  item.code
                                }
                              </span>

                            </td>


                            {/* CLASS */}

                            <td>

                              <span className="sm-class-pill">
                                {
                                  item.className
                                }
                              </span>

                            </td>


                            {/* DESCRIPTION */}

                            <td>

                              <span
                                className="sm-description"
                                title={
                                  item.description ||
                                  ""
                                }
                              >
                                {item.description ||
                                  "--"}
                              </span>

                            </td>


                            {/* STATUS */}

                            <td>

                              <span
                                className={`sm-badge ${
                                  item.status?.toLowerCase() ===
                                  "active"
                                    ? "active"
                                    : "inactive"
                                }`}
                              >

                                <span className="sm-status-dot" />

                                {
                                  item.status
                                }

                              </span>

                            </td>


                            {/* ACTION */}

                            <td>

                              <div className="sm-actions-cell">

                                {/* EDIT */}

                                <button
                                  className="sm-action-btn sm-edit-btn"
                                  title="Edit Subject"
                                  onClick={() =>
                                    handleEdit(
                                      item
                                    )
                                  }
                                >
                                  <Edit3
                                    size={
                                      15
                                    }
                                  />
                                </button>


                                {/* DELETE */}

                                <button
                                  className="sm-action-btn sm-delete-btn"
                                  title="Delete Subject"
                                  onClick={() =>
                                    handleDelete(
                                      item._id
                                    )
                                  }
                                >
                                  <Trash2
                                    size={
                                      15
                                    }
                                  />
                                </button>


                                {/* MORE */}

                                <div className="sm-dropdown-container">

                                  <button
                                    className="sm-action-btn sm-more-btn"
                                    title="More"
                                    onClick={(
                                      e
                                    ) => {
                                      e.stopPropagation();

                                      setOpenDropdownId(
                                        openDropdownId ===
                                          item._id
                                          ? null
                                          : item._id
                                      );
                                    }}
                                  >
                                    <MoreVertical
                                      size={
                                        16
                                      }
                                    />
                                  </button>


                                  {openDropdownId ===
                                    item._id && (
                                    <div className="sm-dropdown-menu">

                                      <div className="sm-dropdown-title">
                                        Change Status
                                      </div>

                                      <button
                                        className={
                                          item.status ===
                                          "Active"
                                            ? "sm-dropdown-active"
                                            : ""
                                        }
                                        onClick={() =>
                                          handleStatusChange(
                                            item._id,
                                            "Active"
                                          )
                                        }
                                      >
                                        <span className="sm-dropdown-status-dot sm-green" />
                                        Mark Active
                                      </button>

                                      <button
                                        className={
                                          item.status ===
                                          "Inactive"
                                            ? "sm-dropdown-active"
                                            : ""
                                        }
                                        onClick={() =>
                                          handleStatusChange(
                                            item._id,
                                            "Inactive"
                                          )
                                        }
                                      >
                                        <span className="sm-dropdown-status-dot sm-red" />
                                        Mark Inactive
                                      </button>

                                    </div>
                                  )}

                                </div>

                              </div>

                            </td>

                          </tr>
                        );
                      }
                    )

                  ) : (

                    <tr>

                      <td
                        colSpan="8"
                        className="sm-no-data"
                      >

                        <div className="sm-empty-state">

                          <div className="sm-empty-icon">
                            <BookOpen
                              size={
                                24
                              }
                            />
                          </div>

                          <strong>
                            No subjects found
                          </strong>

                          <span>
                            Try changing your
                            search or filter.
                          </span>

                        </div>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            )}

          </div>


          {/* =================================================
              PAGINATION
          ================================================= */}

          <div className="sm-pagination-footer">

            <span className="sm-pagination-info">

              Showing{" "}
              <strong>
                {showingFrom}
              </strong>{" "}
              to{" "}
              <strong>
                {showingTo}
              </strong>{" "}
              of{" "}
              <strong>
                {
                  filteredSubjects.length
                }
              </strong>{" "}
              entries

            </span>


            <div className="sm-pagination">

              <button
                className="sm-pagination-arrow"
                disabled={
                  currentPage ===
                  1
                }
                onClick={() =>
                  setCurrentPage(
                    (prev) =>
                      Math.max(
                        prev - 1,
                        1
                      )
                  )
                }
              >
                <ChevronLeft
                  size={16}
                />
              </button>


              {Array.from(
                {
                  length: totalPages,
                },
                (_, i) => i + 1
              ).map((page) => (

                <button
                  key={page}
                  className={
                    currentPage ===
                    page
                      ? "sm-pagination-active"
                      : ""
                  }
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
                className="sm-pagination-arrow"
                disabled={
                  currentPage ===
                  totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    (prev) =>
                      Math.min(
                        prev + 1,
                        totalPages
                      )
                  )
                }
              >
                <ChevronRight
                  size={16}
                />
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default SubjectManagement;