import React, { useEffect, useMemo, useRef, useState } from "react";
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

const Testimonials = () => {
  /* =========================================================
     TESTIMONIAL DATA
  ========================================================= */

  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Priya Mohanty",
      designation: "Parent",
      rating: 5,
      review:
        "A wonderful place for little ones to begin their learning journey. The child-proofed classrooms feel safe and welcoming, while the teachers are caring and attentive to every child.",
      status: "Published",
      createdAt: "2025-09-12T10:30:00",
    },
    {
      id: 2,
      name: "Rahul Das",
      designation: "Parent",
      rating: 5,
      review:
        "We are very happy with the learning environment. The classrooms are clean, hygienic, and well maintained. The open play areas give children plenty of space to learn, play, and explore.",
      status: "Published",
      createdAt: "2025-09-10T16:15:00",
    },
    {
      id: 3,
      name: "Sneha Patnaik",
      designation: "Parent",
      rating: 5,
      review:
        "The teachers understand how young children learn. Activities are fun and engaging, and the school gives equal importance to learning, creativity, play, and good habits.",
      status: "Unpublished",
      createdAt: "2025-09-08T11:20:00",
    },
    {
      id: 4,
      name: "Amit Kumar",
      designation: "Guardian",
      rating: 4,
      review:
        "Good infrastructure and supportive staff. My child enjoys coming to school every day.",
      status: "Published",
      createdAt: "2025-09-05T09:45:00",
    },
    {
      id: 5,
      name: "Pooja Sahoo",
      designation: "Parent",
      rating: 5,
      review:
        "A safe and nurturing place for kids. Highly recommended!",
      status: "Unpublished",
      createdAt: "2025-09-01T14:10:00",
    },
    {
      id: 6,
      name: "Ananya Sahu",
      designation: "Parent",
      rating: 5,
      review:
        "The school has created a warm and positive atmosphere for children. My child has become more confident, social, and independent.",
      status: "Published",
      createdAt: "2025-08-28T12:30:00",
    },
    {
      id: 7,
      name: "Suman Mishra",
      designation: "Guardian",
      rating: 4,
      review:
        "I really appreciate the attention given to cleanliness and safety. The staff are friendly and approachable.",
      status: "Unpublished",
      createdAt: "2025-08-24T15:20:00",
    },
    {
      id: 8,
      name: "Ritika Nayak",
      designation: "Parent",
      rating: 5,
      review:
        "The caring teachers, safe classrooms, and enjoyable activities make this nursery a great choice.",
      status: "Published",
      createdAt: "2025-08-20T10:15:00",
    },
    {
      id: 9,
      name: "Debashis Rout",
      designation: "Parent",
      rating: 5,
      review:
        "The school provides a balanced environment where children can learn at their own pace.",
      status: "Published",
      createdAt: "2025-08-18T09:30:00",
    },
    {
      id: 10,
      name: "Neha Behera",
      designation: "Parent",
      rating: 4,
      review:
        "A lovely learning environment with friendly teachers and safe classrooms.",
      status: "Unpublished",
      createdAt: "2025-08-15T17:00:00",
    },
    {
      id: 11,
      name: "Rakesh Das",
      designation: "Guardian",
      rating: 5,
      review:
        "Very happy with the school environment and teaching methods.",
      status: "Published",
      createdAt: "2025-08-12T11:45:00",
    },
    {
      id: 12,
      name: "Sweta Mohanty",
      designation: "Parent",
      rating: 5,
      review:
        "The teachers are very supportive and caring towards children.",
      status: "Published",
      createdAt: "2025-08-09T13:10:00",
    },
    {
      id: 13,
      name: "Kunal Nayak",
      designation: "Parent",
      rating: 5,
      review:
        "Excellent atmosphere and very helpful teachers. My child loves school.",
      status: "Unpublished",
      createdAt: "2025-08-05T10:20:00",
    },
    {
      id: 14,
      name: "Madhuri Das",
      designation: "Guardian",
      rating: 4,
      review:
        "Clean classrooms and very good care for children.",
      status: "Published",
      createdAt: "2025-08-01T14:30:00",
    },
    {
      id: 15,
      name: "Sanjay Sahu",
      designation: "Parent",
      rating: 5,
      review:
        "A very positive learning environment for young children.",
      status: "Published",
      createdAt: "2025-07-28T12:10:00",
    },
    {
      id: 16,
      name: "Meera Mohanty",
      designation: "Parent",
      rating: 5,
      review:
        "The staff are caring and the school facilities are excellent.",
      status: "Unpublished",
      createdAt: "2025-07-25T09:50:00",
    },
  ]);

  /* =========================================================
     FILTER STATES
  ========================================================= */

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All Status");

  const [dateFilter, setDateFilter] =
    useState("All Time");

  /* =========================================================
     PAGINATION
  ========================================================= */

  const entriesPerPage = 6;

  const [currentPage, setCurrentPage] = useState(1);

  /* =========================================================
     SELECTION
  ========================================================= */

  const [selectedIds, setSelectedIds] = useState([]);

  const selectAllRef = useRef(null);

  /* =========================================================
     ACTION MENU
  ========================================================= */

  const [openMenu, setOpenMenu] = useState(null);

  /* =========================================================
     INITIALS
  ========================================================= */

  const getInitials = (name) => {
    return name
      .trim()
      .split(/\s+/)
      .map((word) => word.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  /* =========================================================
     AVATAR COLOR
  ========================================================= */

  const avatarColors = [
    "Testimonials__avatar--orange",
    "Testimonials__avatar--purple",
    "Testimonials__avatar--pink",
    "Testimonials__avatar--blue",
    "Testimonials__avatar--coral",
  ];

  const getAvatarColor = (id) => {
    return avatarColors[id % avatarColors.length];
  };

  /* =========================================================
     DATE FORMAT
  ========================================================= */

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");

    const month = date.toLocaleString("en-US", {
      month: "short",
    });

    const year = date.getFullYear();

    let hours = date.getHours();

    const minutes = String(
      date.getMinutes()
    ).padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    return {
      date: `${day} ${month} ${year}`,
      time: `${String(hours).padStart(
        2,
        "0"
      )}:${minutes} ${ampm}`,
    };
  };

  /* =========================================================
     DATE FILTER
  ========================================================= */

  const isDateMatch = (dateString) => {
    if (dateFilter === "All Time") {
      return true;
    }

    const createdDate = new Date(dateString);
    const now = new Date();

    if (dateFilter === "Today") {
      return (
        createdDate.toDateString() ===
        now.toDateString()
      );
    }

    if (dateFilter === "Last 7 Days") {
      const date = new Date();

      date.setDate(date.getDate() - 7);

      return createdDate >= date;
    }

    if (dateFilter === "Last 30 Days") {
      const date = new Date();

      date.setDate(date.getDate() - 30);

      return createdDate >= date;
    }

    if (dateFilter === "This Month") {
      return (
        createdDate.getMonth() === now.getMonth() &&
        createdDate.getFullYear() ===
          now.getFullYear()
      );
    }

    return true;
  };

  /* =========================================================
     FILTER DATA
  ========================================================= */

  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((item) => {
      const searchValue =
        search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        item.name
          .toLowerCase()
          .includes(searchValue) ||
        item.designation
          .toLowerCase()
          .includes(searchValue) ||
        item.review
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All Status" ||
        item.status === statusFilter;

      const matchesDate = isDateMatch(
        item.createdAt
      );

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

  /* =========================================================
     PAGINATION CALCULATION
  ========================================================= */

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

  /* =========================================================
     CURRENT PAGE SELECTED
  ========================================================= */

  const currentPageIds =
    currentTestimonials.map(
      (item) => item.id
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

  /* =========================================================
     SELECT ALL IN CURRENT PAGE
  ========================================================= */

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate =
        isSomeCurrentPageSelected;
    }
  }, [isSomeCurrentPageSelected]);

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

  /* =========================================================
     SINGLE SELECT
  ========================================================= */

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

  /* =========================================================
     SEARCH
  ========================================================= */

  const handleSearch = (e) => {
    setSearch(e.target.value);

    setCurrentPage(1);

    setSelectedIds([]);

    setOpenMenu(null);
  };

  /* =========================================================
     STATUS FILTER
  ========================================================= */

  const handleStatusFilter = (value) => {
    setStatusFilter(value);

    setCurrentPage(1);

    setSelectedIds([]);

    setOpenMenu(null);
  };

  /* =========================================================
     DATE FILTER
  ========================================================= */

  const handleDateFilter = (value) => {
    setDateFilter(value);

    setCurrentPage(1);

    setSelectedIds([]);

    setOpenMenu(null);
  };

  /* =========================================================
     RESET
  ========================================================= */

  const handleReset = () => {
    setSearch("");

    setStatusFilter("All Status");

    setDateFilter("All Time");

    setCurrentPage(1);

    setSelectedIds([]);

    setOpenMenu(null);
  };

  /* =========================================================
     CHANGE STATUS
  ========================================================= */

  const handleStatusChange = (
    id,
    newStatus
  ) => {
    setTestimonials((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: newStatus,
            }
          : item
      )
    );

    setOpenMenu(null);
  };

  /* =========================================================
     DELETE SINGLE
  ========================================================= */

  const handleDelete = (id) => {
    const item = testimonials.find(
      (testimonial) =>
        testimonial.id === id
    );

    if (!item) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${item.name}" testimonial?`
    );

    if (!confirmed) {
      return;
    }

    setTestimonials((prev) =>
      prev.filter(
        (testimonial) =>
          testimonial.id !== id
      )
    );

    setSelectedIds((prev) =>
      prev.filter(
        (selectedId) =>
          selectedId !== id
      )
    );

    setOpenMenu(null);
  };

  /* =========================================================
     PAGINATION
  ========================================================= */

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

  /* =========================================================
     PAGE NUMBERS
  ========================================================= */

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

  /* =========================================================
     CLOSE MENU
  ========================================================= */

  const handleOutsideClick = () => {
    if (openMenu !== null) {
      setOpenMenu(null);
    }
  };

  /* =========================================================
     RENDER
  ========================================================= */

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
              <option>
                All Status
              </option>

              <option>
                Published
              </option>

              <option>
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
              <option>
                All Time
              </option>

              <option>
                Today
              </option>

              <option>
                Last 7 Days
              </option>

              <option>
                Last 30 Days
              </option>

              <option>
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

              {currentTestimonials.length > 0 ? (

                currentTestimonials.map(
                  (item, index) => {

                    const formattedDate =
                      formatDate(
                        item.createdAt
                      );

                    const isSelected =
                      selectedIds.includes(
                        item.id
                      );

                    return (

                      <tr
                        key={item.id}
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
                                  item.id
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
                                item.id
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
                                    star <=
                                    item.rating
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
                            title={item.review}
                          >
                            {item.review}
                          </p>

                        </td>


                        {/* STATUS */}

                        <td>

                          {item.status ===
                          "Published" ? (

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
                              {formattedDate.date}
                            </span>

                            <small>
                              {formattedDate.time}
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
                                  item.id
                                    ? "Testimonials__action-button--active"
                                    : ""
                                }`}
                                onClick={() =>
                                  setOpenMenu(
                                    openMenu ===
                                      item.id
                                      ? null
                                      : item.id
                                  )
                                }
                                aria-label="More options"
                              >

                                <FaEllipsisV />

                              </button>


                              {/* DROPDOWN */}

                              {openMenu ===
                                item.id && (

                                <div className="Testimonials__action-menu">

                                  {item.status ===
                                  "Published" ? (

                                    <button
                                      type="button"
                                      className="Testimonials__menu-item Testimonials__menu-item--unpublish"
                                      onClick={() =>
                                        handleStatusChange(
                                          item.id,
                                          "Unpublished"
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
                                          item.id,
                                          "Published"
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
                                  item.id
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

                <tr>

                  <td
                    colSpan="9"
                    className="Testimonials__empty"
                  >

                    <div className="Testimonials__empty-content">

                      <FaExclamationTriangle />

                      <h3>
                        No testimonials found
                      </h3>

                      <p>
                        Try changing your
                        search or filter
                        options.
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
                  {filteredTestimonials.length}
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