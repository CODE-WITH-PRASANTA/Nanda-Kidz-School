import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  BookOpen,
  Search,
  Filter,
  Edit3,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Save,
  RotateCcw,
  Plus,
  X,
  Check,
  SlidersHorizontal,
  CheckSquare,
} from "lucide-react";
import "./Classandsection.css";

const API_URL = "http://localhost:5000/api/classes";

const Classandsection = () => {
  const [classList, setClassList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Premium filter states
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [sectionFilter, setSectionFilter] = useState("All");

  // Select states
  const [selectedIds, setSelectedIds] = useState([]);

  const itemsPerPage = 5;

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    section: "A",
    teacher: "",
    status: "Active",
  });

  /* =========================================================
     FETCH CLASSES
  ========================================================= */

  const fetchClasses = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API_URL);

      setClassList(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      alert("Failed to load class list from database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
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
     RESET FORM
  ========================================================= */

  const handleReset = () => {
    setFormData({
      name: "",
      code: "",
      section: "A",
      teacher: "",
      status: "Active",
    });

    setEditingId(null);
  };

  /* =========================================================
     ADD CLASS
  ========================================================= */

  const handleAddClassClick = () => {
    handleReset();
    setIsFormOpen(true);
  };

  /* =========================================================
     CLOSE FORM
  ========================================================= */

  const handleCloseForm = () => {
    handleReset();
    setIsFormOpen(false);
  };

  /* =========================================================
     SAVE / UPDATE CLASS
  ========================================================= */

  const handleSaveClass = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.code) {
      alert(
        "Please fill required fields (Class Name & Class Code)"
      );
      return;
    }

    try {
      if (editingId) {
        const res = await axios.put(
          `${API_URL}/${editingId}`,
          formData
        );

        setClassList((prev) =>
          prev.map((item) =>
            item._id === editingId ? res.data : item
          )
        );
      } else {
        const res = await axios.post(API_URL, formData);

        setClassList((prev) => [
          res.data,
          ...prev,
        ]);
      }

      handleCloseForm();
    } catch (err) {
      console.error("Error saving data:", err);
      alert("Failed to save class data.");
    }
  };

  /* =========================================================
     EDIT
  ========================================================= */

  const handleEdit = (item) => {
    setEditingId(item._id);

    setFormData({
      name: item.name || "",
      code: item.code || "",
      section: item.section || "A",
      teacher:
        item.teacher === "--"
          ? ""
          : item.teacher || "",
      status: item.status || "Active",
    });

    setIsFormOpen(true);
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this class?"
      )
    ) {
      try {
        await axios.delete(`${API_URL}/${id}`);

        setClassList((prev) =>
          prev.filter(
            (item) => item._id !== id
          )
        );

        setSelectedIds((prev) =>
          prev.filter(
            (selectedId) => selectedId !== id
          )
        );
      } catch (err) {
        console.error(
          "Error deleting class:",
          err
        );

        alert("Failed to delete class.");
      }
    }
  };

  /* =========================================================
     FILTER DATA
  ========================================================= */

  const filteredClasses = useMemo(() => {
    const query =
      searchQuery.trim().toLowerCase();

    return classList.filter((item) => {
      const matchesSearch =
        !query ||
        (item.name &&
          item.name
            .toLowerCase()
            .includes(query)) ||
        (item.code &&
          item.code
            .toLowerCase()
            .includes(query)) ||
        (item.section &&
          item.section
            .toLowerCase()
            .includes(query)) ||
        (item.teacher &&
          item.teacher
            .toLowerCase()
            .includes(query));

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      const matchesSection =
        sectionFilter === "All" ||
        item.section === sectionFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesSection
      );
    });
  }, [
    classList,
    searchQuery,
    statusFilter,
    sectionFilter,
  ]);

  /* =========================================================
     RESET PAGE WHEN FILTER CHANGES
  ========================================================= */

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    statusFilter,
    sectionFilter,
  ]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages =
    Math.ceil(
      filteredClasses.length /
        itemsPerPage
    ) || 1;

  const paginatedData = useMemo(() => {
    const start =
      (currentPage - 1) *
      itemsPerPage;

    return filteredClasses.slice(
      start,
      start + itemsPerPage
    );
  }, [
    filteredClasses,
    currentPage,
  ]);

  const handlePageChange = (page) => {
    if (
      page >= 1 &&
      page <= totalPages
    ) {
      setCurrentPage(page);
    }
  };

  /* =========================================================
     SELECT SINGLE ROW
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
     SELECT ALL CURRENT PAGE
  ========================================================= */

  const currentPageIds =
    paginatedData.map(
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
        const newIds = [
          ...prev,
          ...currentPageIds,
        ];

        return [...new Set(newIds)];
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
     RESET FILTER
  ========================================================= */

  const handleClearFilters = () => {
    setStatusFilter("All");
    setSectionFilter("All");
    setSearchQuery("");
    setIsFilterOpen(false);
  };

  /* =========================================================
     PAGE RANGE
  ========================================================= */

  const showingFrom =
    filteredClasses.length === 0
      ? 0
      : (currentPage - 1) *
          itemsPerPage +
        1;

  const showingTo = Math.min(
    currentPage * itemsPerPage,
    filteredClasses.length
  );

  return (
    <div className="cas-container">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <header className="cas-header">

        <div>
          <h1 className="cas-title">
            Classes & Section Management
          </h1>

          <nav className="cas-breadcrumb">
            <span>Dashboard</span>

            <span className="cas-breadcrumb-arrow">
              ›
            </span>

            <span className="active">
              Classes & Section
            </span>
          </nav>
        </div>

      </header>


      {/* =====================================================
          ACTION BAR
      ===================================================== */}

      <div className="cas-tab-bar">

        <div className="cas-tabs">
          <button className="cas-tab active">
            Class Management
          </button>
        </div>

        <button
          className="cas-btn-add-class"
          onClick={handleAddClassClick}
        >
          <Plus size={17} strokeWidth={2.5} />

          <span>Add Class</span>
        </button>

      </div>


      {/* =====================================================
          MAIN GRID
      ===================================================== */}

      <div
        className={`cas-grid ${
          isFormOpen
            ? "form-visible"
            : "form-hidden"
        }`}
      >

        {/* ===================================================
            FORM
        =================================================== */}

        {isFormOpen && (
          <div className="cas-card cas-form-card">

            <div className="cas-card-header-bar">

              <div className="cas-card-header">

                <div className="cas-header-icon-box">
                  <BookOpen size={18} />
                </div>

                <div>
                  <h2>
                    {editingId
                      ? "Edit Class"
                      : "Add Class"}
                  </h2>

                  <p>
                    {editingId
                      ? "Update class information"
                      : "Create a new class"}
                  </p>
                </div>

              </div>

              <button
                type="button"
                className="cas-btn-close"
                onClick={handleCloseForm}
                title="Close Panel"
              >
                <X size={18} />
              </button>

            </div>


            <form
              onSubmit={handleSaveClass}
              className="cas-form"
            >

              {/* CLASS NAME */}

              <div className="cas-form-group">

                <label>
                  Class Name
                  <span className="required">
                    *
                  </span>
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter class name"
                  required
                />

              </div>


              {/* CLASS CODE */}

              <div className="cas-form-group">

                <label>
                  Class Code
                  <span className="required">
                    *
                  </span>
                </label>

                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  placeholder="Enter class code"
                  required
                />

              </div>


              {/* SECTION */}

              <div className="cas-form-group">

                <label>
                  Section
                  <span className="required">
                    *
                  </span>
                </label>

                <select
                  name="section"
                  value={formData.section}
                  onChange={handleInputChange}
                >
                  <option value="A">
                    Section A
                  </option>

                  <option value="B">
                    Section B
                  </option>

                  <option value="C">
                    Section C
                  </option>

                  <option value="D">
                    Section D
                  </option>
                </select>

              </div>


              {/* TEACHER */}

              <div className="cas-form-group">

                <label>
                  Class Teacher
                </label>

                <select
                  name="teacher"
                  value={formData.teacher}
                  onChange={handleInputChange}
                >

                  <option value="">
                    Select Teacher (Optional)
                  </option>

                  <option value="Anjali Sharma">
                    Anjali Sharma
                  </option>

                  <option value="Pooja Verma">
                    Pooja Verma
                  </option>

                  <option value="Ritika Singh">
                    Ritika Singh
                  </option>

                  <option value="Neha Kapoor">
                    Neha Kapoor
                  </option>

                  <option value="Ramesh Gupta">
                    Ramesh Gupta
                  </option>

                </select>

              </div>


              {/* STATUS */}

              <div className="cas-form-group">

                <label>
                  Status
                </label>

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


              {/* FORM ACTIONS */}

              <div className="cas-form-actions">

                <button
                  type="button"
                  className="cas-btn-reset"
                  onClick={handleReset}
                >
                  <RotateCcw size={14} />

                  <span>Reset</span>
                </button>


                <button
                  type="submit"
                  className="cas-btn-save"
                >
                  <Save size={16} />

                  <span>
                    {editingId
                      ? "Update Class"
                      : "Save Class"}
                  </span>
                </button>

              </div>

            </form>

          </div>
        )}


        {/* ===================================================
            TABLE CARD
        =================================================== */}

        <div className="cas-card cas-table-card">

          {/* TABLE HEADER */}

          <div className="cas-table-header-bar">

            <div className="cas-card-header">

              <div className="cas-header-icon-box">
                <BookOpen size={18} />
              </div>

              <div>
                <h2>Class List</h2>

                <p>
                  Manage your classes and sections
                </p>
              </div>

            </div>


            {/* SEARCH + FILTER */}

            <div className="cas-table-controls">

              {/* PREMIUM SEARCH */}

              <div className="cas-search-box">

                <div className="cas-search-icon-wrap">
                  <Search
                    size={17}
                    strokeWidth={2.2}
                  />
                </div>

                <input
                  type="text"
                  placeholder="Search classes..."
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
                    type="button"
                    className="cas-search-clear"
                    onClick={() =>
                      setSearchQuery("")
                    }
                  >
                    <X size={14} />
                  </button>
                )}

              </div>


              {/* PREMIUM FILTER */}

              <div className="cas-filter-wrapper">

                <button
                  type="button"
                  className={`cas-btn-filter ${
                    isFilterOpen
                      ? "active"
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

                  <span>Filter</span>

                  {(statusFilter !== "All" ||
                    sectionFilter !== "All") && (
                    <span className="cas-filter-count">
                      1
                    </span>
                  )}
                </button>


                {isFilterOpen && (
                  <div className="cas-filter-dropdown">

                    <div className="cas-filter-dropdown-header">

                      <div>
                        <strong>
                          Filter Classes
                        </strong>

                        <span>
                          Refine your class list
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
                        <X size={16} />
                      </button>

                    </div>


                    <div className="cas-filter-body">

                      <div className="cas-filter-field">

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


                      <div className="cas-filter-field">

                        <label>
                          Section
                        </label>

                        <select
                          value={
                            sectionFilter
                          }
                          onChange={(e) =>
                            setSectionFilter(
                              e.target.value
                            )
                          }
                        >

                          <option value="All">
                            All Sections
                          </option>

                          <option value="A">
                            Section A
                          </option>

                          <option value="B">
                            Section B
                          </option>

                          <option value="C">
                            Section C
                          </option>

                          <option value="D">
                            Section D
                          </option>

                        </select>

                      </div>

                    </div>


                    <div className="cas-filter-footer">

                      <button
                        type="button"
                        className="cas-filter-reset"
                        onClick={
                          handleClearFilters
                        }
                      >
                        Reset
                      </button>

                      <button
                        type="button"
                        className="cas-filter-apply"
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
              SELECTION TOOLBAR
          ================================================= */}

          {selectedIds.length > 0 && (
            <div className="cas-selection-bar">

              <div className="cas-selection-left">

                <div className="cas-selection-icon">
                  <CheckSquare size={16} />
                </div>

                <div>

                  <strong>
                    {selectedIds.length}
                  </strong>

                  <span>
                    {selectedIds.length === 1
                      ? " class selected"
                      : " classes selected"}
                  </span>

                </div>

              </div>


              <button
                type="button"
                className="cas-clear-selection"
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

          <div className="cas-table-responsive">

            <table className="cas-table">

              <thead>

                <tr>

                  {/* SELECT ALL */}

                  <th className="cas-select-column">

                    <label className="cas-checkbox-wrapper">

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

                      <span className="cas-custom-checkbox">
                        {allCurrentPageSelected && (
                          <Check size={12} />
                        )}
                      </span>

                    </label>

                  </th>


                  <th>#</th>

                  <th>
                    Class Name
                  </th>

                  <th>
                    Class Code
                  </th>

                  <th>
                    Section
                  </th>

                  <th>
                    Class Teacher
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
                      colSpan="8"
                      className="cas-no-data"
                    >

                      <div className="cas-loading">

                        <div className="cas-loader" />

                        Loading classes...

                      </div>

                    </td>

                  </tr>

                ) : paginatedData.length > 0 ? (

                  paginatedData.map(
                    (item, index) => {

                      const isSelected =
                        selectedIds.includes(
                          item._id
                        );

                      return (

                        <tr
                          key={item._id}
                          className={
                            isSelected
                              ? "selected-row"
                              : ""
                          }
                        >

                          {/* CHECKBOX */}

                          <td className="cas-select-column">

                            <label className="cas-checkbox-wrapper">

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

                              <span className="cas-custom-checkbox">

                                {isSelected && (
                                  <Check
                                    size={12}
                                  />
                                )}

                              </span>

                            </label>

                          </td>


                          {/* NUMBER */}

                          <td className="cas-row-number">
                            {(currentPage - 1) *
                              itemsPerPage +
                              index +
                              1}
                          </td>


                          {/* NAME */}

                          <td className="cas-font-medium">

                            <div className="cas-class-name">

                              <span className="cas-class-avatar">
                                {item.name
                                  ?.charAt(0)
                                  ?.toUpperCase() ||
                                  "C"}
                              </span>

                              <span>
                                {item.name}
                              </span>

                            </div>

                          </td>


                          {/* CODE */}

                          <td>
                            <span className="cas-code">
                              {item.code}
                            </span>
                          </td>


                          {/* SECTION */}

                          <td>
                            <span className="cas-section-pill">
                              Section{" "}
                              {item.section}
                            </span>
                          </td>


                          {/* TEACHER */}

                          <td>
                            {item.teacher ||
                              "--"}
                          </td>


                          {/* STATUS */}

                          <td>

                            <span
                              className={`cas-badge ${
                                item.status?.toLowerCase() ===
                                "active"
                                  ? "active"
                                  : "inactive"
                              }`}
                            >

                              <span className="cas-status-dot" />

                              {item.status}

                            </span>

                          </td>


                          {/* ACTION */}

                          <td>

                            <div className="cas-action-btns">

                              <button
                                className="cas-btn-action edit"
                                onClick={() =>
                                  handleEdit(
                                    item
                                  )
                                }
                                title="Edit Class"
                              >
                                <Edit3
                                  size={15}
                                />
                              </button>


                              <button
                                className="cas-btn-action delete"
                                onClick={() =>
                                  handleDelete(
                                    item._id
                                  )
                                }
                                title="Delete Class"
                              >
                                <Trash2
                                  size={15}
                                />
                              </button>

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
                      className="cas-no-data"
                    >

                      <div className="cas-empty-state">

                        <div className="cas-empty-icon">
                          <BookOpen
                            size={25}
                          />
                        </div>

                        <strong>
                          No classes found
                        </strong>

                        <span>
                          Try changing your search
                          or filter.
                        </span>

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

          <div className="cas-pagination-wrapper">

            <div className="cas-entries-info">

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
                {filteredClasses.length}
              </strong>{" "}
              entries

            </div>


            <div className="cas-pagination">

              <button
                className="cas-page-btn arrow"
                disabled={
                  currentPage === 1
                }
                onClick={() =>
                  handlePageChange(
                    currentPage - 1
                  )
                }
              >
                <ChevronLeft size={16} />
              </button>


              {Array.from(
                {
                  length: totalPages,
                },
                (_, i) => i + 1
              ).map((page) => (

                <button
                  key={page}
                  className={`cas-page-btn ${
                    currentPage === page
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handlePageChange(
                      page
                    )
                  }
                >
                  {page}
                </button>

              ))}


              <button
                className="cas-page-btn arrow"
                disabled={
                  currentPage ===
                  totalPages
                }
                onClick={() =>
                  handlePageChange(
                    currentPage + 1
                  )
                }
              >
                <ChevronRight size={16} />
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Classandsection;