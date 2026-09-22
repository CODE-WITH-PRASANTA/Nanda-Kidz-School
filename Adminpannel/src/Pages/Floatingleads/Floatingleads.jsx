import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

import {
  FaSearch,
  FaEye,
  FaTrashAlt,
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaTimes,
  FaMapMarkerAlt,
  FaChild,
  FaSpinner,
} from "react-icons/fa";

import "./Floatingleads.css";
import API from "../../api/axios";


/* =========================================================
   CONSTANTS
========================================================= */

const AVATAR_COLORS = [
  "#7C5CFC",
  "#22B07D",
  "#F5A524",
  "#3B82F6",
  "#EC4899",
  "#14B8A6",
];

const STATUS_META = {
  New: {
    className: "floating-leads__badge--new",
    label: "New",
  },

  Contacted: {
    className: "floating-leads__badge--contacted",
    label: "Contacted",
  },

  "Follow Up": {
    className: "floating-leads__badge--followup",
    label: "Follow Up",
  },

  Closed: {
    className: "floating-leads__badge--closed",
    label: "Closed",
  },
};

const AGE_OPTIONS = [
  "All Ages",
  "2 Years",
  "3 Years",
  "4 Years",
  "5+ Years",
];

const STATUS_OPTIONS = [
  "All",
  "New",
  "Contacted",
  "Follow Up",
  "Closed",
];

const DATE_OPTIONS = [
  "All Time",
  "Today",
  "Last 7 Days",
  "Last 30 Days",
];

const ROWS_PER_PAGE = 6;


/* =========================================================
   HELPERS
========================================================= */

const initials = (name) =>
  (name || "")
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();


const formatAge = (age) => {
  if (
    age === null ||
    age === undefined ||
    age === ""
  ) {
    return "N/A";
  }

  const value = String(age).trim();

  if (value.includes("Year")) {
    return value;
  }

  if (value === "5+") {
    return "5+ Years";
  }

  return `${value} Years`;
};


const normalizeStatus = (status) => {
  const allowedStatuses = [
    "New",
    "Contacted",
    "Follow Up",
    "Closed",
  ];

  return allowedStatuses.includes(status)
    ? status
    : "New";
};


const formatDate = (date) => {
  if (!date) {
    return "N/A";
  }

  return new Date(date).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};


const formatTime = (date) => {
  if (!date) {
    return "";
  }

  return new Date(date).toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
};


/* =========================================================
   COMPONENT
========================================================= */

const FloatingLeads = () => {

  /* =======================================================
     STATE
  ======================================================= */

  const [leads, setLeads] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [ageFilter, setAgeFilter] =
    useState("All Ages");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [dateFilter, setDateFilter] =
    useState("All Time");

  const [selectedIds, setSelectedIds] =
    useState([]);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [activeLead, setActiveLead] =
    useState(null);

  const [leadToDelete, setLeadToDelete] =
    useState(null);

  const [updatingStatus, setUpdatingStatus] =
    useState(false);

  const [pendingStatus, setPendingStatus] =
    useState(null);

  const [deletingLead, setDeletingLead] =
    useState(false);


  /* =======================================================
     FETCH LEADS
  ======================================================= */

  const fetchLeads = useCallback(
    async (showLoading = true) => {

      try {

        if (showLoading) {
          setLoading(true);
        }

        const response =
          await API.get("/enquiries");


        if (
          response.data &&
          Array.isArray(response.data.data)
        ) {

          const mappedLeads =
            response.data.data.map(
              (item) => {

                const leadId =
                  item._id || item.id;

                const createdAt =
                  item.createdAt;

                return {
                  id: leadId,

                  name:
                    item.name ||
                    "Unknown",

                  address:
                    item.address ||
                    "N/A",

                  childName:
                    item.childName ||
                    item.name ||
                    "N/A",

                  childAge:
                    formatAge(item.age),

                  rawAge:
                    item.age || "",

                  message:
                    item.message || "",

                  createdAt,

                  createdOn:
                    formatDate(createdAt),

                  createdTime:
                    formatTime(createdAt),

                  status:
                    normalizeStatus(
                      item.status
                    ),
                };
              }
            );

          setLeads(mappedLeads);

        } else if (
          Array.isArray(response.data)
        ) {

          const mappedLeads =
            response.data.map(
              (item) => {

                const leadId =
                  item._id || item.id;

                return {
                  id: leadId,

                  name:
                    item.name ||
                    "Unknown",

                  address:
                    item.address ||
                    "N/A",

                  childName:
                    item.childName ||
                    item.name ||
                    "N/A",

                  childAge:
                    formatAge(item.age),

                  rawAge:
                    item.age || "",

                  message:
                    item.message || "",

                  createdAt:
                    item.createdAt,

                  createdOn:
                    formatDate(
                      item.createdAt
                    ),

                  createdTime:
                    formatTime(
                      item.createdAt
                    ),

                  status:
                    normalizeStatus(
                      item.status
                    ),
                };
              }
            );

          setLeads(mappedLeads);
        }

      } catch (error) {

        console.error(
          "Failed to fetch enquiries:",
          error
        );

        alert(
          error.response?.data?.message ||
            "Failed to fetch enquiries."
        );

      } finally {

        if (showLoading) {
          setLoading(false);
        }
      }

    },
    []
  );


  /* =======================================================
     INITIAL FETCH
  ======================================================= */

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);


  /* =======================================================
     FILTER
  ======================================================= */

  const filteredLeads = useMemo(() => {

    const term =
      search.trim().toLowerCase();

    return leads.filter((lead) => {

      const matchesSearch =
        !term ||
        (lead.name &&
          lead.name
            .toLowerCase()
            .includes(term)) ||
        (lead.address &&
          lead.address
            .toLowerCase()
            .includes(term)) ||
        (lead.childName &&
          lead.childName
            .toLowerCase()
            .includes(term));


      const matchesAge =
        ageFilter === "All Ages" ||
        lead.childAge === ageFilter;


      const matchesStatus =
        statusFilter === "All" ||
        lead.status === statusFilter;


      let matchesDate = true;

      if (
        dateFilter !== "All Time" &&
        lead.createdAt
      ) {

        const createdDate =
          new Date(lead.createdAt);

        const now =
          new Date();

        if (
          dateFilter === "Today"
        ) {

          matchesDate =
            createdDate.toDateString() ===
            now.toDateString();

        } else if (
          dateFilter === "Last 7 Days"
        ) {

          const sevenDaysAgo =
            new Date();

          sevenDaysAgo.setDate(
            now.getDate() - 7
          );

          matchesDate =
            createdDate >=
            sevenDaysAgo;

        } else if (
          dateFilter === "Last 30 Days"
        ) {

          const thirtyDaysAgo =
            new Date();

          thirtyDaysAgo.setDate(
            now.getDate() - 30
          );

          matchesDate =
            createdDate >=
            thirtyDaysAgo;
        }
      }


      return (
        matchesSearch &&
        matchesAge &&
        matchesStatus &&
        matchesDate
      );
    });

  }, [
    leads,
    search,
    ageFilter,
    statusFilter,
    dateFilter,
  ]);


  /* =======================================================
     PAGINATION
  ======================================================= */

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredLeads.length /
          ROWS_PER_PAGE
      )
    );

  const safePage =
    Math.min(
      currentPage,
      totalPages
    );

  const pageLeads = useMemo(() => {

    const start =
      (safePage - 1) *
      ROWS_PER_PAGE;

    return filteredLeads.slice(
      start,
      start + ROWS_PER_PAGE
    );

  }, [
    filteredLeads,
    safePage,
  ]);


  /* =======================================================
     SELECT ALL
  ======================================================= */

  const allOnPageSelected =
    pageLeads.length > 0 &&
    pageLeads.every((lead) =>
      selectedIds.includes(lead.id)
    );


  const updateFilter =
    (setter) => (e) => {

      setter(e.target.value);

      setCurrentPage(1);
    };


  const toggleSelectAllOnPage = () => {

    if (allOnPageSelected) {

      setSelectedIds(
        (prev) =>
          prev.filter(
            (id) =>
              !pageLeads.some(
                (lead) =>
                  lead.id === id
              )
          )
      );

    } else {

      const pageIds =
        pageLeads.map(
          (lead) => lead.id
        );

      setSelectedIds(
        (prev) =>
          Array.from(
            new Set([
              ...prev,
              ...pageIds,
            ])
          )
      );
    }
  };


  const toggleSelectOne = (id) => {

    setSelectedIds(
      (prev) =>
        prev.includes(id)
          ? prev.filter(
              (item) => item !== id
            )
          : [...prev, id]
    );
  };


  /* =======================================================
     PAGINATION
  ======================================================= */

  const goToPage = (page) => {

    if (
      page < 1 ||
      page > totalPages
    ) {
      return;
    }

    setCurrentPage(page);
  };


  /* =======================================================
     DELETE
  ======================================================= */

  const confirmDelete = async () => {

    if (
      !leadToDelete ||
      !leadToDelete.id
    ) {
      return;
    }

    try {

      setDeletingLead(true);

      const response =
        await API.delete(
          `/enquiries/${leadToDelete.id}`
        );


      if (
        response.data?.success
      ) {

        const deletedId =
          leadToDelete.id;


        setLeads(
          (prev) =>
            prev.filter(
              (lead) =>
                lead.id !== deletedId
            )
        );


        setSelectedIds(
          (prev) =>
            prev.filter(
              (id) =>
                id !== deletedId
            )
        );


        setLeadToDelete(null);

        setCurrentPage(1);

      } else {

        alert(
          response.data?.message ||
            "Failed to delete lead."
        );
      }

    } catch (error) {

      console.error(
        "Failed to delete lead:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete lead from server."
      );

    } finally {

      setDeletingLead(false);
    }
  };


  /* =======================================================
     UPDATE STATUS
  ======================================================= */

  const handleUpdateStatus =
    async (newStatus) => {

      if (
        !activeLead ||
        !activeLead.id
      ) {
        alert(
          "Lead ID is missing."
        );

        return;
      }


      if (updatingStatus) {
        return;
      }


      if (
        activeLead.status ===
        newStatus
      ) {
        return;
      }


      try {

        setUpdatingStatus(true);

        /*
          Remember which button was clicked.
          This gives us a smooth loading state.
        */
        setPendingStatus(newStatus);


        const response =
          await API.patch(
            `/enquiries/${activeLead.id}`,
            {
              status: newStatus,
            }
          );


        if (
          response.data?.success
        ) {

          /*
            Update table immediately.
          */

          setLeads(
            (prev) =>
              prev.map(
                (lead) =>
                  lead.id ===
                  activeLead.id
                    ? {
                        ...lead,
                        status:
                          newStatus,
                      }
                    : lead
              )
          );


          /*
            Update modal immediately.
          */

          setActiveLead(
            (prev) =>
              prev
                ? {
                    ...prev,
                    status:
                      newStatus,
                  }
                : null
          );


          /*
            Small delay allows the
            CSS transition to finish
            naturally before clearing
            loading state.
          */

          setTimeout(() => {
            setUpdatingStatus(false);
            setPendingStatus(null);
          }, 280);

        } else {

          alert(
            response.data?.message ||
              "Failed to update status."
          );

          setUpdatingStatus(false);
          setPendingStatus(null);
        }

      } catch (error) {

        console.error(
          "Failed to update status:",
          error
        );

        alert(
          error.response?.data?.message ||
            "Failed to update status."
        );

        setUpdatingStatus(false);
        setPendingStatus(null);
      }
    };


  /* =======================================================
     PAGINATION INFO
  ======================================================= */

  const rangeStart =
    filteredLeads.length === 0
      ? 0
      : (safePage - 1) *
          ROWS_PER_PAGE +
        1;

  const rangeEnd =
    Math.min(
      safePage *
        ROWS_PER_PAGE,
      filteredLeads.length
    );

  const pageNumbers =
    Array.from(
      {
        length: totalPages,
      },
      (_, i) => i + 1
    );


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="floating-leads">

      {/* ===================================================
          TOOLBAR
      =================================================== */}

      <div className="floating-leads__toolbar">

        <div className="floating-leads__search">

          <FaSearch
            className="floating-leads__search-icon"
          />

          <input
            type="text"
            value={search}
            onChange={updateFilter(
              setSearch
            )}
            placeholder="Search by name or address..."
            aria-label="Search leads"
          />

        </div>


        <div className="floating-leads__filter-group">

          {/* AGE */}

          <label className="floating-leads__filter">

            <span>
              Child&apos;s Age
            </span>

            <div className="floating-leads__select-wrap">

              <select
                value={ageFilter}
                onChange={updateFilter(
                  setAgeFilter
                )}
              >

                {AGE_OPTIONS.map(
                  (age) => (
                    <option
                      key={age}
                      value={age}
                    >
                      {age}
                    </option>
                  )
                )}

              </select>

              <FaChevronDown
                className="floating-leads__select-caret"
              />

            </div>

          </label>


          {/* STATUS */}

          <label className="floating-leads__filter">

            <span>
              Status
            </span>

            <div className="floating-leads__select-wrap">

              <select
                value={statusFilter}
                onChange={updateFilter(
                  setStatusFilter
                )}
              >

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

              <FaChevronDown
                className="floating-leads__select-caret"
              />

            </div>

          </label>


          {/* DATE */}

          <label className="floating-leads__filter">

            <span>
              Date Range
            </span>

            <div className="floating-leads__select-wrap">

              <select
                value={dateFilter}
                onChange={updateFilter(
                  setDateFilter
                )}
              >

                {DATE_OPTIONS.map(
                  (range) => (
                    <option
                      key={range}
                      value={range}
                    >
                      {range}
                    </option>
                  )
                )}

              </select>

              <FaChevronDown
                className="floating-leads__select-caret"
              />

            </div>

          </label>

        </div>

      </div>


      {/* ===================================================
          TABLE
      =================================================== */}

      <div className="floating-leads__card">

        <div className="floating-leads__table-scroll">

          <table className="floating-leads__table">

            <thead>

              <tr>

                <th className="floating-leads__checkbox-cell">

                  <input
                    type="checkbox"
                    checked={
                      allOnPageSelected
                    }
                    onChange={
                      toggleSelectAllOnPage
                    }
                  />

                </th>

                <th>Name</th>

                <th>Address</th>

                <th>
                  Child&apos;s Name
                </th>

                <th>
                  Child&apos;s Age
                </th>

                <th>
                  Created On
                </th>

                <th>Status</th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan={8}
                    className="floating-leads__empty"
                  >

                    <div className="floating-leads__loading">

                      <FaSpinner className="fa-spin" />

                      Loading leads...

                    </div>

                  </td>

                </tr>

              ) : pageLeads.length === 0 ? (

                <tr>

                  <td
                    colSpan={8}
                    className="floating-leads__empty"
                  >
                    No leads match your filters.
                  </td>

                </tr>

              ) : (

                pageLeads.map(
                  (lead, index) => {

                    const status =
                      STATUS_META[
                        lead.status
                      ] ||
                      STATUS_META.New;


                    const color =
                      AVATAR_COLORS[
                        index %
                          AVATAR_COLORS.length
                      ];


                    return (

                      <tr
                        key={
                          lead.id
                        }
                      >

                        {/* CHECKBOX */}

                        <td className="floating-leads__checkbox-cell">

                          <input
                            type="checkbox"
                            checked={selectedIds.includes(
                              lead.id
                            )}
                            onChange={() =>
                              toggleSelectOne(
                                lead.id
                              )
                            }
                          />

                        </td>


                        {/* NAME */}

                        <td>

                          <div className="floating-leads__identity">

                            <span
                              className="floating-leads__avatar"
                              style={{
                                backgroundColor:
                                  color,
                              }}
                            >
                              {initials(
                                lead.name
                              )}
                            </span>

                            <p className="floating-leads__name">
                              {lead.name}
                            </p>

                          </div>

                        </td>


                        <td>
                          {lead.address}
                        </td>

                        <td>
                          {lead.childName}
                        </td>

                        <td>
                          {lead.childAge}
                        </td>


                        <td>

                          <p className="floating-leads__date">
                            {lead.createdOn}
                          </p>

                          <p className="floating-leads__subtext">
                            {lead.createdTime}
                          </p>

                        </td>


                        {/* STATUS BADGE */}

                        <td>

                          <span
                            className={`floating-leads__badge ${status.className}`}
                          >
                            {status.label}
                          </span>

                        </td>


                        {/* ACTIONS */}

                        <td>

                          <div className="floating-leads__actions">

                            <button
                              type="button"
                              className="floating-leads__icon-btn floating-leads__icon-btn--view"
                              onClick={() =>
                                setActiveLead(
                                  lead
                                )
                              }
                            >
                              <FaEye />
                            </button>


                            <button
                              type="button"
                              className="floating-leads__icon-btn floating-leads__icon-btn--delete"
                              onClick={() =>
                                setLeadToDelete(
                                  lead
                                )
                              }
                            >
                              <FaTrashAlt />
                            </button>

                          </div>

                        </td>

                      </tr>

                    );
                  }
                )

              )}

            </tbody>

          </table>

        </div>


        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="floating-leads__footer">

          <p className="floating-leads__count">

            {filteredLeads.length === 0
              ? "No entries found"
              : `Showing ${rangeStart} to ${rangeEnd} of ${filteredLeads.length} entries`}

          </p>


          <div className="floating-leads__pagination">

            <button
              type="button"
              className="floating-leads__page-btn"
              onClick={() =>
                goToPage(
                  safePage - 1
                )
              }
              disabled={
                safePage === 1
              }
            >
              <FaChevronLeft />
            </button>


            {pageNumbers.map(
              (page) => (

                <button
                  key={page}
                  type="button"
                  className={`floating-leads__page-btn ${
                    page === safePage
                      ? "floating-leads__page-btn--active"
                      : ""
                  }`}
                  onClick={() =>
                    goToPage(page)
                  }
                >
                  {page}
                </button>

              )
            )}


            <button
              type="button"
              className="floating-leads__page-btn"
              onClick={() =>
                goToPage(
                  safePage + 1
                )
              }
              disabled={
                safePage === totalPages
              }
            >
              <FaChevronRight />
            </button>

          </div>

        </div>

      </div>


      {/* ===================================================
          LEAD DETAILS MODAL
      =================================================== */}

      {activeLead && (

        <div
          className="floating-leads__overlay"
          onClick={() =>
            !updatingStatus &&
            setActiveLead(null)
          }
        >

          <div
            className="floating-leads__modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="floating-leads__modal-header">

              <h2>
                Lead Details
              </h2>

              <button
                type="button"
                className="floating-leads__modal-close"
                onClick={() =>
                  !updatingStatus &&
                  setActiveLead(null)
                }
                disabled={
                  updatingStatus
                }
              >
                <FaTimes />
              </button>

            </div>


            {/* BODY */}

            <div className="floating-leads__modal-body">

              <div className="floating-leads__modal-identity">

                <span
                  className="floating-leads__avatar floating-leads__avatar--lg"
                  style={{
                    backgroundColor:
                      AVATAR_COLORS[
                        Math.max(
                          0,
                          leads.findIndex(
                            (l) =>
                              l.id ===
                              activeLead.id
                          )
                        ) %
                          AVATAR_COLORS.length
                      ],
                  }}
                >
                  {initials(
                    activeLead.name
                  )}
                </span>


                <div>

                  <p className="floating-leads__modal-name">
                    {activeLead.name}
                  </p>


                  {/* SMOOTH STATUS BADGE */}

                  <span
                    className={`floating-leads__badge floating-leads__modal-status-badge ${
                      (
                        STATUS_META[
                          activeLead.status
                        ] ||
                        STATUS_META.New
                      ).className
                    }`}
                  >
                    {activeLead.status}
                  </span>

                </div>

              </div>


              {/* DETAILS */}

              <dl className="floating-leads__detail-grid">

                <div>

                  <dt>

                    <FaMapMarkerAlt />

                    Address

                  </dt>

                  <dd>
                    {activeLead.address}
                  </dd>

                </div>


                <div>

                  <dt>

                    <FaChild />

                    Child&apos;s Name

                  </dt>

                  <dd>
                    {activeLead.childName}
                  </dd>

                </div>


                <div>

                  <dt>

                    <FaChild />

                    Child&apos;s Age

                  </dt>

                  <dd>
                    {activeLead.childAge}
                  </dd>

                </div>


                <div>

                  <dt>
                    Created On
                  </dt>

                  <dd>
                    {activeLead.createdOn}
                    {" · "}
                    {activeLead.createdTime}
                  </dd>

                </div>

              </dl>


              {/* MESSAGE */}

              {activeLead.message && (

                <div className="floating-leads__message-box">

                  <div className="floating-leads__message-title">
                    Message
                  </div>

                  <div className="floating-leads__message-text">
                    {activeLead.message}
                  </div>

                </div>

              )}


              {/* STATUS */}

              <div className="floating-leads__edit-status">

                <span>
                  Update status
                </span>


                <div className="floating-leads__edit-options">

                  {STATUS_OPTIONS
                    .filter(
                      (status) =>
                        status !== "All"
                    )
                    .map(
                      (status) => {

                        const isActive =
                          activeLead.status ===
                          status;

                        const isPending =
                          pendingStatus ===
                          status;


                        return (

                          <button
                            key={status}
                            type="button"
                            disabled={
                              updatingStatus
                            }
                            className={`floating-leads__chip ${
                              isActive
                                ? "floating-leads__chip--active"
                                : ""
                            } ${
                              isPending
                                ? "floating-leads__chip--pending"
                                : ""
                            }`}
                            onClick={() =>
                              handleUpdateStatus(
                                status
                              )
                            }
                          >

                            {isPending ? (

                              <span className="floating-leads__chip-loading">

                                <FaSpinner className="fa-spin" />

                                <span>
                                  Updating
                                </span>

                              </span>

                            ) : (

                              <span>
                                {status}
                              </span>

                            )}

                          </button>

                        );

                      }
                    )}

                </div>

              </div>

            </div>


            {/* FOOTER */}

            <div className="floating-leads__modal-footer">

              <button
                type="button"
                className="floating-leads__btn floating-leads__btn--ghost"
                onClick={() =>
                  setActiveLead(null)
                }
                disabled={
                  updatingStatus
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}


      {/* ===================================================
          DELETE MODAL
      =================================================== */}

      {leadToDelete && (

        <div
          className="floating-leads__overlay"
          onClick={() =>
            !deletingLead &&
            setLeadToDelete(null)
          }
        >

          <div
            className="floating-leads__modal floating-leads__modal--sm"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="floating-leads__modal-header">

              <h2>
                Delete Lead
              </h2>

              <button
                type="button"
                className="floating-leads__modal-close"
                onClick={() =>
                  !deletingLead &&
                  setLeadToDelete(null)
                }
                disabled={
                  deletingLead
                }
              >
                <FaTimes />
              </button>

            </div>


            <div className="floating-leads__modal-body">

              <p className="floating-leads__confirm-text">

                Are you sure you want to
                delete{" "}

                <strong>
                  {leadToDelete.name}
                </strong>

                &apos;s lead record?

                <br />

                This cannot be undone.

              </p>

            </div>


            <div className="floating-leads__modal-footer">

              <button
                type="button"
                className="floating-leads__btn floating-leads__btn--ghost"
                onClick={() =>
                  setLeadToDelete(null)
                }
                disabled={
                  deletingLead
                }
              >
                Cancel
              </button>


              <button
                type="button"
                className="floating-leads__btn floating-leads__btn--danger"
                onClick={
                  confirmDelete
                }
                disabled={
                  deletingLead
                }
              >

                {deletingLead ? (
                  <>
                    <FaSpinner className="fa-spin" />
                    {" "}Deleting...
                  </>
                ) : (
                  "Delete"
                )}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default FloatingLeads;