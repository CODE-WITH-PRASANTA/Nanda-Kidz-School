import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import "./Testimonials.css";

import {
  FaSearch,
  FaCalendarAlt,
  FaChevronDown,
  FaSyncAlt,
  FaStar,
  FaEllipsisV,
  FaCheckCircle,
  FaTimesCircle,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
  FaExclamationTriangle,
} from "react-icons/fa";

// =====================================================
// API
// =====================================================

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const Testimonials = () => {
  // =====================================================
  // TESTIMONIAL DATA
  // =====================================================

  const [testimonials, setTestimonials] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // =====================================================
  // FILTER STATES
  // =====================================================

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All Status");

  const [dateFilter, setDateFilter] =
    useState("All Time");

  // =====================================================
  // PAGINATION
  // =====================================================

  const entriesPerPage = 6;

  const [currentPage, setCurrentPage] = useState(1);

  // =====================================================
  // SELECTION
  // =====================================================

  const [selectedIds, setSelectedIds] = useState([]);

  const selectAllRef = useRef(null);

  // =====================================================
  // ACTION MENU
  // =====================================================

  const [openMenu, setOpenMenu] = useState(null);

  // =====================================================
  // FETCH ALL TESTIMONIALS
  // =====================================================

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/api/testimonials/admin`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch testimonials."
        );
      }

      setTestimonials(data.testimonials || []);

      setCurrentPage(1);
      setSelectedIds([]);
    } catch (error) {
      console.error(
        "FETCH TESTIMONIALS ERROR:",
        error
      );

      setTestimonials([]);

      setError(
        error.message ||
          "Unable to load testimonials."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // =====================================================
  // INITIALS
  // =====================================================

  const getInitials = (name = "") => {
    return String(name)
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  // =====================================================
  // AVATAR COLORS
  // =====================================================

  const avatarColors = [
    "Testimonials__avatar--orange",
    "Testimonials__avatar--purple",
    "Testimonials__avatar--pink",
    "Testimonials__avatar--blue",
    "Testimonials__avatar--coral",
  ];

  const getAvatarColor = (id) => {
    const value = String(id || "");

    let hash = 0;

    for (let i = 0; i < value.length; i++) {
      hash =
        value.charCodeAt(i) +
        ((hash << 5) - hash);
    }

    return avatarColors[
      Math.abs(hash) % avatarColors.length
    ];
  };

  // =====================================================
  // DATE FORMAT
  // =====================================================

  const formatDate = (dateString) => {
    if (!dateString) {
      return {
        date: "-",
        time: "-",
      };
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return {
        date: "-",
        time: "-",
      };
    }

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    const month = date.toLocaleString(
      "en-US",
      {
        month: "short",
      }
    );

    const year = date.getFullYear();

    let hours = date.getHours();

    const minutes = String(
      date.getMinutes()
    ).padStart(2, "0");

    const ampm =
      hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    return {
      date: `${day} ${month} ${year}`,

      time: `${String(hours).padStart(
        2,
        "0"
      )}:${minutes} ${ampm}`,
    };
  };

  // =====================================================
  // DATE FILTER
  // =====================================================

  const isDateMatch = (dateString) => {
    if (dateFilter === "All Time") {
      return true;
    }

    if (!dateString) {
      return false;
    }

    const createdDate =
      new Date(dateString);

    const now = new Date();

    if (
      Number.isNaN(
        createdDate.getTime()
      )
    ) {
      return false;
    }

    if (dateFilter === "Today") {
      return (
        createdDate.toDateString() ===
        now.toDateString()
      );
    }

    if (dateFilter === "Last 7 Days") {
      const date = new Date();

      date.setDate(
        date.getDate() - 7
      );

      return createdDate >= date;
    }

    if (dateFilter === "Last 30 Days") {
      const date = new Date();

      date.setDate(
        date.getDate() - 30
      );

      return createdDate >= date;
    }

    if (dateFilter === "This Month") {
      return (
        createdDate.getMonth() ===
          now.getMonth() &&
        createdDate.getFullYear() ===
          now.getFullYear()
      );
    }

    return true;
  };

  // =====================================================
  // FILTER DATA
  // =====================================================

  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((item) => {
      const searchValue =
        search.toLowerCase().trim();

      const name =
        String(item.name || "")
          .toLowerCase();

      const designation =
        String(
          item.designation || ""
        ).toLowerCase();

      const description =
        String(
          item.description || ""
        ).toLowerCase();

      const matchesSearch =
        !searchValue ||
        name.includes(searchValue) ||
        designation.includes(
          searchValue
        ) ||
        description.includes(
          searchValue
        );

      const matchesStatus =
        statusFilter === "All Status" ||
        item.status === statusFilter;

      const matchesDate =
        isDateMatch(item.createdAt);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDate
      );
    });
  }, [
    testimonials,
    search,
    statusFilter,
    dateFilter,
  ]);

  // =====================================================
  // PAGINATION CALCULATION
  // =====================================================

  const totalPages = Math.ceil(
    filteredTestimonials.length /
      entriesPerPage
  );

  const safeCurrentPage =
    totalPages === 0
      ? 1
      : Math.min(
          currentPage,
          totalPages
        );

  const startIndex =
    (safeCurrentPage - 1) *
    entriesPerPage;

  const endIndex =
    startIndex + entriesPerPage;

  const currentTestimonials =
    filteredTestimonials.slice(
      startIndex,
      endIndex
    );

  // =====================================================
  // CURRENT PAGE SELECTED
  // =====================================================

  const currentPageIds =
    currentTestimonials.map(
      (item) => item._id
    );

  const selectedCurrentPageCount =
    currentPageIds.filter((id) =>
      selectedIds.includes(id)
    ).length;

  const isAllCurrentPageSelected =
    currentTestimonials.length > 0 &&
    selectedCurrentPageCount ===
      currentTestimonials.length;

  const isSomeCurrentPageSelected =
    selectedCurrentPageCount > 0 &&
    selectedCurrentPageCount <
      currentTestimonials.length;

  // =====================================================
  // SELECT ALL REF
  // =====================================================

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate =
        isSomeCurrentPageSelected;
    }
  }, [isSomeCurrentPageSelected]);

  // =====================================================
  // SELECT ALL
  // =====================================================

  const handleSelectAll = () => {
    if (isAllCurrentPageSelected) {
      setSelectedIds((prev) =>
        prev.filter(
          (id) =>
            !currentPageIds.includes(id)
        )
      );
    } else {
      setSelectedIds((prev) => {
        const merged = new Set([
          ...prev,
          ...currentPageIds,
        ]);

        return Array.from(merged);
      });
    }
  };

  // =====================================================
  // SINGLE SELECT
  // =====================================================

  const handleSingleSelect = (id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter(
          (selectedId) =>
            selectedId !== id
        );
      }

      return [...prev, id];
    });
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = (e) => {
    setSearch(e.target.value);

    setCurrentPage(1);

    setSelectedIds([]);

    setOpenMenu(null);
  };

  // =====================================================
  // STATUS FILTER
  // =====================================================

  const handleStatusFilter = (value) => {
    setStatusFilter(value);

    setCurrentPage(1);

    setSelectedIds([]);

    setOpenMenu(null);
  };

  // =====================================================
  // DATE FILTER
  // =====================================================

  const handleDateFilter = (value) => {
    setDateFilter(value);

    setCurrentPage(1);

    setSelectedIds([]);

    setOpenMenu(null);
  };

  // =====================================================
  // RESET
  // =====================================================

  const handleReset = () => {
    setSearch("");

    setStatusFilter("All Status");

    setDateFilter("All Time");

    setCurrentPage(1);

    setSelectedIds([]);

    setOpenMenu(null);
  };

  // =====================================================
  // REFRESH
  // =====================================================

  const handleRefresh = () => {
    setOpenMenu(null);
    fetchTestimonials();
  };

  // =====================================================
  // CHANGE STATUS - BACKEND
  // =====================================================

  const handleStatusChange = async (
    id,
    newStatus
  ) => {
    try {
      setOpenMenu(null);

      const response = await fetch(
        `${API_BASE_URL}/api/testimonials/${id}/status`,
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

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update testimonial status."
        );
      }

      setTestimonials((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                status:
                  data.testimonial
                    ?.status ||
                  newStatus,
              }
            : item
        )
      );
    } catch (error) {
      console.error(
        "UPDATE TESTIMONIAL STATUS ERROR:",
        error
      );

      alert(
        error.message ||
          "Failed to update testimonial status."
      );
    }
  };

  // =====================================================
  // DELETE SINGLE - BACKEND
  // =====================================================

  const handleDelete = async (id) => {
    const item = testimonials.find(
      (testimonial) =>
        testimonial._id === id
    );

    if (!item) {
      return;
    }

    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${item.name}" testimonial?`
      );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/testimonials/${id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete testimonial."
        );
      }

      setTestimonials((prev) =>
        prev.filter(
          (testimonial) =>
            testimonial._id !== id
        )
      );

      setSelectedIds((prev) =>
        prev.filter(
          (selectedId) =>
            selectedId !== id
        )
      );

      setOpenMenu(null);
    } catch (error) {
      console.error(
        "DELETE TESTIMONIAL ERROR:",
        error
      );

      alert(
        error.message ||
          "Failed to delete testimonial."
      );
    }
  };

  // =====================================================
  // PAGINATION
  // =====================================================

  const goToPage = (page) => {
    if (
      page < 1 ||
      page > totalPages
    ) {
      return;
    }

    setCurrentPage(page);

    setSelectedIds([]);

    setOpenMenu(null);
  };

  // =====================================================
  // PAGE NUMBERS
  // =====================================================

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (
        let i = 1;
        i <= totalPages;
        i++
      ) {
        pages.push(i);
      }

      return pages;
    }

    if (safeCurrentPage <= 3) {
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
      safeCurrentPage >=
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
      safeCurrentPage - 1,
      safeCurrentPage,
      safeCurrentPage + 1,
      "...",
      totalPages,
    ];
  };

  // =====================================================
  // CLOSE MENU
  // =====================================================

  const handleOutsideClick = () => {
    if (openMenu !== null) {
      setOpenMenu(null);
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div
      className="Testimonials"
      onClick={handleOutsideClick}
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="Testimonials__header">
        <div className="Testimonials__header-content">
          <h1 className="Testimonials__title">
            Testimonials
          </h1>
        </div>
      </div>

      {/* =====================================================
          MAIN CARD
      ===================================================== */}

      <div className="Testimonials__card">

        {/* ===================================================
            FILTER BAR
        =================================================== */}

        <div className="Testimonials__filters">

          {/* SEARCH */}

          <div className="Testimonials__search">
            <FaSearch />

            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search by name or designation..."
            />
          </div>

          {/* STATUS */}

          <div className="Testimonials__select-wrapper">
            <select
              value={statusFilter}
              onChange={(e) =>
                handleStatusFilter(
                  e.target.value
                )
              }
            >
              <option value="All Status">
                All Status
              </option>

              <option value="published">
                Published
              </option>

              <option value="unpublished">
                Unpublished
              </option>
            </select>

            <FaChevronDown />
          </div>

          {/* DATE */}

          <div className="Testimonials__select-wrapper Testimonials__select-wrapper--date">
            <FaCalendarAlt className="Testimonials__calendar-icon" />

            <select
              value={dateFilter}
              onChange={(e) =>
                handleDateFilter(
                  e.target.value
                )
              }
            >
              <option value="All Time">
                All Time
              </option>

              <option value="Today">
                Today
              </option>

              <option value="Last 7 Days">
                Last 7 Days
              </option>

              <option value="Last 30 Days">
                Last 30 Days
              </option>

              <option value="This Month">
                This Month
              </option>
            </select>

            <FaChevronDown />
          </div>

          {/* RESET */}

          <button
            type="button"
            className="Testimonials__reset"
            onClick={handleReset}
          >
            <FaSyncAlt />

            <span>
              Reset
            </span>
          </button>

        </div>

        {/* ===================================================
            SELECTED INFO
        =================================================== */}

        {selectedIds.length > 0 && (
          <div className="Testimonials__selection-bar">

            <div className="Testimonials__selection-info">
              <span className="Testimonials__selection-count">
                {selectedIds.length}
              </span>

              <span>
                testimonial
                {selectedIds.length > 1
                  ? "s"
                  : ""}{" "}
                selected
              </span>
            </div>

            <button
              type="button"
              className="Testimonials__clear-selection"
              onClick={() =>
                setSelectedIds([])
              }
            >
              Clear selection
            </button>

          </div>
        )}

        {/* ===================================================
            TABLE
        =================================================== */}

        <div className="Testimonials__table-scroll">

          <table className="Testimonials__table">

            <thead>
              <tr>

                {/* SELECT ALL */}

                <th className="Testimonials__th--check">
                  <label className="Testimonials__checkbox">

                    <input
                      ref={selectAllRef}
                      type="checkbox"
                      checked={
                        isAllCurrentPageSelected
                      }
                      onChange={
                        handleSelectAll
                      }
                    />

                    <span className="Testimonials__checkbox-custom"></span>

                  </label>
                </th>

                {/* NUMBER */}

                <th className="Testimonials__th--number">
                  #
                </th>

                {/* NAME */}

                <th>
                  Name
                </th>

                {/* DESIGNATION */}

                <th>
                  Designation
                </th>

                {/* RATING */}

                <th>
                  Rating
                </th>

                {/* REVIEW */}

                <th className="Testimonials__th--review">
                  Review
                </th>

                {/* STATUS */}

                <th>
                  Status
                </th>

                {/* DATE */}

                <th>
                  Created At
                </th>

                {/* ACTION */}

                <th className="Testimonials__th--action">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {/* =================================================
                  LOADING
              ================================================= */}

              {loading ? (
                <tr>
                  <td
                    colSpan="10"
                    className="Testimonials__empty"
                  >
                    <div className="Testimonials__empty-content">
                      <FaSyncAlt />

                      <h3>
                        Loading testimonials...
                      </h3>

                      <p>
                        Please wait while testimonials are loading.
                      </p>
                    </div>
                  </td>
                </tr>

              ) : error ? (

                /* =================================================
                    ERROR
                ================================================= */

                <tr>
                  <td
                    colSpan="10"
                    className="Testimonials__empty"
                  >
                    <div className="Testimonials__empty-content">

                      <FaExclamationTriangle />

                      <h3>
                        Failed to load testimonials
                      </h3>

                      <p>
                        {error}
                      </p>

                      <button
                        type="button"
                        className="Testimonials__reset"
                        onClick={handleRefresh}
                      >
                        <FaSyncAlt />

                        <span>
                          Try Again
                        </span>
                      </button>

                    </div>
                  </td>
                </tr>

              ) : currentTestimonials.length > 0 ? (

                /* =================================================
                    TESTIMONIAL ROWS
                ================================================= */

                currentTestimonials.map(
                  (item, index) => {

                    const formattedDate =
                      formatDate(
                        item.createdAt
                      );

                    const isSelected =
                      selectedIds.includes(
                        item._id
                      );

                    const rating =
                      Number(
                        item.rating
                      );

                    return (
                      <tr
                        key={item._id}
                        className={
                          isSelected
                            ? "Testimonials__row--selected"
                            : ""
                        }
                      >

                        {/* CHECKBOX */}

                        <td className="Testimonials__td--check">

                          <label className="Testimonials__checkbox">

                            <input
                              type="checkbox"
                              checked={
                                isSelected
                              }
                              onChange={() =>
                                handleSingleSelect(
                                  item._id
                                )
                              }
                            />

                            <span className="Testimonials__checkbox-custom"></span>

                          </label>

                        </td>

                        {/* NUMBER */}

                        <td className="Testimonials__number">
                          {startIndex +
                            index +
                            1}
                        </td>

                        {/* NAME */}

                        <td>

                          <div className="Testimonials__user">

                            <div
                              className={`Testimonials__avatar ${getAvatarColor(
                                item._id
                              )}`}
                            >
                              {getInitials(
                                item.name
                              )}
                            </div>

                            <span className="Testimonials__name">
                              {item.name}
                            </span>

                          </div>

                        </td>

                        {/* DESIGNATION */}

                        <td>

                          <span className="Testimonials__designation">
                            {item.designation}
                          </span>

                        </td>

                        {/* RATING */}

                        <td>

                          <div className="Testimonials__rating">

                            {[1, 2, 3, 4, 5].map(
                              (star) => (
                                <FaStar
                                  key={star}
                                  className={
                                    star <= rating
                                      ? "Testimonials__star Testimonials__star--active"
                                      : "Testimonials__star Testimonials__star--inactive"
                                  }
                                />
                              )
                            )}

                          </div>

                        </td>

                        {/* REVIEW */}

                        <td className="Testimonials__review-cell">

                          <p
                            className="Testimonials__review"
                            title={
                              item.description
                            }
                          >
                            {item.description}
                          </p>

                        </td>

                        {/* STATUS */}

                        <td>

                          {item.status ===
                          "published" ? (

                            <span className="Testimonials__status Testimonials__status--published">

                              <FaCheckCircle />

                              Published

                            </span>

                          ) : (

                            <span className="Testimonials__status Testimonials__status--unpublished">

                              <FaTimesCircle />

                              Unpublished

                            </span>

                          )}

                        </td>

                        {/* DATE */}

                        <td>

                          <div className="Testimonials__date">

                            <span>
                              {
                                formattedDate.date
                              }
                            </span>

                            <small>
                              {
                                formattedDate.time
                              }
                            </small>

                          </div>

                        </td>

                        {/* ACTION */}

                        <td>

                          <div
                            className="Testimonials__actions"
                            onClick={(e) =>
                              e.stopPropagation()
                            }
                          >

                            {/* 3 DOT */}

                            <div className="Testimonials__action-menu-wrapper">

                              <button
                                type="button"
                                className={`Testimonials__action-button ${
                                  openMenu ===
                                  item._id
                                    ? "Testimonials__action-button--active"
                                    : ""
                                }`}
                                onClick={() =>
                                  setOpenMenu(
                                    openMenu ===
                                      item._id
                                      ? null
                                      : item._id
                                  )
                                }
                                aria-label="More options"
                              >
                                <FaEllipsisV />
                              </button>

                              {/* DROPDOWN */}

                              {openMenu ===
                                item._id && (
                                <div className="Testimonials__action-menu">

                                  {item.status ===
                                  "published" ? (

                                    <button
                                      type="button"
                                      className="Testimonials__menu-item Testimonials__menu-item--unpublish"
                                      onClick={() =>
                                        handleStatusChange(
                                          item._id,
                                          "unpublished"
                                        )
                                      }
                                    >
                                      <FaTimesCircle />

                                      Unpublish
                                    </button>

                                  ) : (

                                    <button
                                      type="button"
                                      className="Testimonials__menu-item Testimonials__menu-item--publish"
                                      onClick={() =>
                                        handleStatusChange(
                                          item._id,
                                          "published"
                                        )
                                      }
                                    >
                                      <FaCheckCircle />

                                      Publish
                                    </button>

                                  )}

                                </div>
                              )}

                            </div>

                            {/* DELETE */}

                            <button
                              type="button"
                              className="Testimonials__delete-button"
                              onClick={() =>
                                handleDelete(
                                  item._id
                                )
                              }
                              aria-label={`Delete ${item.name}`}
                            >
                              <FaTrash />
                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  }
                )

              ) : (

                /* =================================================
                    NO DATA
                ================================================= */

                <tr>
                  <td
                    colSpan="10"
                    className="Testimonials__empty"
                  >
                    <div className="Testimonials__empty-content">

                      <FaExclamationTriangle />

                      <h3>
                        No testimonials found
                      </h3>

                      <p>
                        Try changing your search or filter options.
                      </p>

                    </div>
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* ===================================================
            FOOTER / PAGINATION
        =================================================== */}

        <div className="Testimonials__footer">

          <div className="Testimonials__showing">

            {filteredTestimonials.length >
            0 ? (
              <>
                Showing{" "}

                <strong>
                  {startIndex + 1}
                </strong>{" "}

                to{" "}

                <strong>
                  {Math.min(
                    endIndex,
                    filteredTestimonials.length
                  )}
                </strong>{" "}

                of{" "}

                <strong>
                  {
                    filteredTestimonials.length
                  }
                </strong>{" "}

                entries
              </>
            ) : (
              "Showing 0 to 0 of 0 entries"
            )}

          </div>

          {/* PAGINATION */}

          {totalPages > 0 && (
            <div className="Testimonials__pagination">

              {/* PREVIOUS */}

              <button
                type="button"
                className="Testimonials__page-button Testimonials__page-button--arrow"
                disabled={
                  safeCurrentPage === 1
                }
                onClick={() =>
                  goToPage(
                    safeCurrentPage - 1
                  )
                }
              >
                <FaChevronLeft />
              </button>

              {/* PAGE NUMBERS */}

              {getPageNumbers().map(
                (page, index) => {

                  if (page === "...") {
                    return (
                      <span
                        key={`dots-${index}`}
                        className="Testimonials__page-dots"
                      >
                        ...
                      </span>
                    );
                  }

                  return (
                    <button
                      type="button"
                      key={page}
                      className={`Testimonials__page-button ${
                        safeCurrentPage ===
                        page
                          ? "Testimonials__page-button--active"
                          : ""
                      }`}
                      onClick={() =>
                        goToPage(page)
                      }
                    >
                      {page}
                    </button>
                  );
                }
              )}

              {/* NEXT */}

              <button
                type="button"
                className="Testimonials__page-button Testimonials__page-button--arrow"
                disabled={
                  safeCurrentPage ===
                  totalPages
                }
                onClick={() =>
                  goToPage(
                    safeCurrentPage + 1
                  )
                }
              >
                <FaChevronRight />
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Testimonials;