import React, { useEffect, useState, useMemo } from "react";
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
  FaSpinner
} from "react-icons/fa";
import "./Floatingleads.css";
import API from "../../api/axios";

const AVATAR_COLORS = [
  "#7C5CFC",
  "#22B07D",
  "#F5A524",
  "#3B82F6",
  "#EC4899",
  "#14B8A6",
];

const STATUS_META = {
  New: { className: "floating-leads__badge--new", label: "New" },
  Contacted: { className: "floating-leads__badge--contacted", label: "Contacted" },
  "Follow Up": { className: "floating-leads__badge--followup", label: "Follow Up" },
  Closed: { className: "floating-leads__badge--closed", label: "Closed" },
};

const AGE_OPTIONS = ["All Ages", "2 Years", "3 Years", "4 Years", "5 Years"];
const STATUS_OPTIONS = ["All", "New", "Contacted", "Follow Up", "Closed"];
const DATE_OPTIONS = ["All Time", "Today", "Last 7 Days", "Last 30 Days"];
const ROWS_PER_PAGE = 6;

const initials = (name) =>
  (name || "")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const FloatingLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [ageFilter, setAgeFilter] = useState("All Ages");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All Time");
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeLead, setActiveLead] = useState(null);
  const [leadToDelete, setLeadToDelete] = useState(null);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await API.get('/enquiries');
      if (response.data && Array.isArray(response.data.data)) {
        const mappedLeads = response.data.data.map(item => ({
          id: item._id || item.id,
          name: item.name || 'Unknown',
          address: item.address || 'N/A',
          childName: item.childName || item.name || 'N/A',
          childAge: item.age ? `${item.age} Years` : '3 Years',
          rawAge: item.age || 3,
          createdOn: item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '12 Sep 2025',
          createdTime: item.createdAt ? new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '10:24 AM',
          status: item.status || 'New'
        }));
        setLeads(mappedLeads);
      } else if (Array.isArray(response.data)) {
        setLeads(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch enquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = useMemo(() => {
    const term = search.trim().toLowerCase();
    return leads.filter((lead) => {
      const matchesSearch =
        !term ||
        (lead.name && lead.name.toLowerCase().includes(term)) ||
        (lead.address && lead.address.toLowerCase().includes(term));
      const matchesAge = ageFilter === "All Ages" || lead.childAge === ageFilter;
      const matchesStatus = statusFilter === "All" || lead.status === statusFilter;
      return matchesSearch && matchesAge && matchesStatus;
    });
  }, [leads, search, ageFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / ROWS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const pageLeads = useMemo(() => {
    const start = (safePage - 1) * ROWS_PER_PAGE;
    return filteredLeads.slice(start, start + ROWS_PER_PAGE);
  }, [filteredLeads, safePage]);

  const allOnPageSelected =
    pageLeads.length > 0 && pageLeads.every((lead) => selectedIds.includes(lead.id));

  const updateFilter = (setter) => (e) => {
    setter(e.target.value);
    setCurrentPage(1);
  };

  const toggleSelectAllOnPage = () => {
    if (allOnPageSelected) {
      setSelectedIds((prev) => prev.filter((id) => !pageLeads.some((lead) => lead.id === id)));
    } else {
      const pageIds = pageLeads.map((lead) => lead.id);
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const confirmDelete = async () => {
    if (!leadToDelete) return;
    try {
      await API.delete(`/enquiries/${leadToDelete.id}`);
      setLeads((prev) => prev.filter((lead) => lead.id !== leadToDelete.id));
      setSelectedIds((prev) => prev.filter((id) => id !== leadToDelete.id));
    } catch (error) {
      console.error("Failed to delete lead:", error);
      alert("Failed to delete lead from server.");
    } finally {
      setLeadToDelete(null);
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    if (!activeLead) return;
    try {
      await API.patch(`/enquiries/${activeLead.id}`, { status: newStatus });
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === activeLead.id ? { ...lead, status: newStatus } : lead
        )
      );
      setActiveLead((prev) => ({ ...prev, status: newStatus }));
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status.");
    }
  };

  const rangeStart = filteredLeads.length === 0 ? 0 : (safePage - 1) * ROWS_PER_PAGE + 1;
  const rangeEnd = Math.min(safePage * ROWS_PER_PAGE, filteredLeads.length);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="floating-leads">
      <div className="floating-leads__toolbar">
        <div className="floating-leads__search">
          <FaSearch className="floating-leads__search-icon" aria-hidden="true" />
          <input
            type="text"
            value={search}
            onChange={updateFilter(setSearch)}
            placeholder="Search by name or address..."
            aria-label="Search leads"
          />
        </div>

        <div className="floating-leads__filter-group">
          <label className="floating-leads__filter">
            <span>Child&apos;s Age</span>
            <div className="floating-leads__select-wrap">
              <select value={ageFilter} onChange={updateFilter(setAgeFilter)}>
                {AGE_OPTIONS.map((age) => (
                  <option key={age} value={age}>
                    {age}
                  </option>
                ))}
              </select>
              <FaChevronDown className="floating-leads__select-caret" aria-hidden="true" />
            </div>
          </label>

          <label className="floating-leads__filter">
            <span>Status</span>
            <div className="floating-leads__select-wrap">
              <select value={statusFilter} onChange={updateFilter(setStatusFilter)}>
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <FaChevronDown className="floating-leads__select-caret" aria-hidden="true" />
            </div>
          </label>

          <label className="floating-leads__filter">
            <span>Date Range</span>
            <div className="floating-leads__select-wrap">
              <select value={dateFilter} onChange={updateFilter(setDateFilter)}>
                {DATE_OPTIONS.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
              <FaChevronDown className="floating-leads__select-caret" aria-hidden="true" />
            </div>
          </label>
        </div>
      </div>

      <div className="floating-leads__card">
        <div className="floating-leads__table-scroll">
          <table className="floating-leads__table">
            <thead>
              <tr>
                <th className="floating-leads__checkbox-cell">
                  <input
                    type="checkbox"
                    checked={allOnPageSelected}
                    onChange={toggleSelectAllOnPage}
                    aria-label="Select all leads on this page"
                  />
                </th>
                <th>Name</th>
                <th>Address</th>
                <th>Child&apos;s Name</th>
                <th>Child&apos;s Age</th>
                <th>Created On</th>
                <th>Status</th>
                <th className="floating-leads__actions-head">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="floating-leads__empty">
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', padding: '20px' }}>
                      <FaSpinner className="fa-spin" /> Loading leads...
                    </div>
                  </td>
                </tr>
              ) : pageLeads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="floating-leads__empty">
                    No leads match your filters.
                  </td>
                </tr>
              ) : (
                pageLeads.map((lead, index) => {
                  const status = STATUS_META[lead.status] || STATUS_META.New;
                  const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
                  return (
                    <tr key={lead.id} data-label={lead.name}>
                      <td className="floating-leads__checkbox-cell">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(lead.id)}
                          onChange={() => toggleSelectOne(lead.id)}
                          aria-label={`Select ${lead.name}`}
                        />
                      </td>
                      <td>
                        <div className="floating-leads__identity">
                          <span
                            className="floating-leads__avatar"
                            style={{ backgroundColor: color }}
                          >
                            {initials(lead.name)}
                          </span>
                          <div>
                            <p className="floating-leads__name">{lead.name}</p>
                          </div>
                        </div>
                      </td>
                      <td>{lead.address}</td>
                      <td>{lead.childName}</td>
                      <td>{lead.childAge}</td>
                      <td>
                        <p className="floating-leads__date">{lead.createdOn}</p>
                        <p className="floating-leads__subtext">{lead.createdTime}</p>
                      </td>
                      <td>
                        <span className={`floating-leads__badge ${status.className}`}>
                          {status.label}
                        </span>
                      </td>
                      <td>
                        <div className="floating-leads__actions">
                          <button
                            type="button"
                            className="floating-leads__icon-btn floating-leads__icon-btn--view"
                            onClick={() => setActiveLead(lead)}
                            aria-label={`View ${lead.name}`}
                          >
                            <FaEye />
                          </button>
                          <button
                            type="button"
                            className="floating-leads__icon-btn floating-leads__icon-btn--delete"
                            onClick={() => setLeadToDelete(lead)}
                            aria-label={`Delete ${lead.name}`}
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

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
              onClick={() => goToPage(safePage - 1)}
              disabled={safePage === 1}
              aria-label="Previous page"
            >
              <FaChevronLeft />
            </button>
            {pageNumbers.map((page) => (
              <button
                key={page}
                type="button"
                className={`floating-leads__page-btn ${
                  page === safePage ? "floating-leads__page-btn--active" : ""
                }`}
                onClick={() => goToPage(page)}
                aria-current={page === safePage ? "page" : undefined}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              className="floating-leads__page-btn"
              onClick={() => goToPage(safePage + 1)}
              disabled={safePage === totalPages}
              aria-label="Next page"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>

      {activeLead && (
        <div
          className="floating-leads__overlay"
          onClick={() => setActiveLead(null)}
          role="presentation"
        >
          <div
            className="floating-leads__modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`Lead details for ${activeLead.name}`}
          >
            <div className="floating-leads__modal-header">
              <h2>Lead Details</h2>
              <button
                type="button"
                className="floating-leads__modal-close"
                onClick={() => setActiveLead(null)}
                aria-label="Close"
              >
                <FaTimes />
              </button>
            </div>

            <div className="floating-leads__modal-body">
              <div className="floating-leads__modal-identity">
                <span
                  className="floating-leads__avatar floating-leads__avatar--lg"
                  style={{
                    backgroundColor:
                      AVATAR_COLORS[
                        leads.findIndex((l) => l.id === activeLead.id) % AVATAR_COLORS.length
                      ],
                  }}
                >
                  {initials(activeLead.name)}
                </span>
                <div>
                  <p className="floating-leads__modal-name">{activeLead.name}</p>
                  <span
                    className={`floating-leads__badge ${
                      (STATUS_META[activeLead.status] || STATUS_META.New).className
                    }`}
                  >
                    {activeLead.status}
                  </span>
                </div>
              </div>

              <dl className="floating-leads__detail-grid">
                <div>
                  <dt>
                    <FaMapMarkerAlt aria-hidden="true" /> Address
                  </dt>
                  <dd>{activeLead.address}</dd>
                </div>
                <div>
                  <dt>
                    <FaChild aria-hidden="true" /> Child&apos;s Name
                  </dt>
                  <dd>{activeLead.childName}</dd>
                </div>
                <div>
                  <dt>
                    <FaChild aria-hidden="true" /> Child&apos;s Age
                  </dt>
                  <dd>{activeLead.childAge}</dd>
                </div>
                <div>
                  <dt>Created On</dt>
                  <dd>
                    {activeLead.createdOn} · {activeLead.createdTime}
                  </dd>
                </div>
              </dl>

              <div className="floating-leads__edit-status">
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '8px' }}>Update status</span>
                <div className="floating-leads__edit-options">
                  {STATUS_OPTIONS.filter((s) => s !== "All").map((status) => (
                    <button
                      key={status}
                      type="button"
                      className={`floating-leads__chip ${
                        activeLead.status === status ? "floating-leads__chip--active" : ""
                      }`}
                      onClick={() => handleUpdateStatus(status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="floating-leads__modal-footer">
              <button
                type="button"
                className="floating-leads__btn floating-leads__btn--ghost"
                onClick={() => setActiveLead(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {leadToDelete && (
        <div
          className="floating-leads__overlay"
          onClick={() => setLeadToDelete(null)}
          role="presentation"
        >
          <div
            className="floating-leads__modal floating-leads__modal--sm"
            onClick={(e) => e.stopPropagation()}
            role="alertdialog"
            aria-modal="true"
            aria-label="Confirm delete"
          >
            <div className="floating-leads__modal-header">
              <h2>Delete Lead</h2>
              <button
                type="button"
                className="floating-leads__modal-close"
                onClick={() => setLeadToDelete(null)}
                aria-label="Close"
              >
                <FaTimes />
              </button>
            </div>
            <div className="floating-leads__modal-body">
              <p className="floating-leads__confirm-text">
                Are you sure you want to delete <strong>{leadToDelete.name}</strong>&apos;s
                lead record? This cannot be undone.
              </p>
            </div>
            <div className="floating-leads__modal-footer">
              <button
                type="button"
                className="floating-leads__btn floating-leads__btn--ghost"
                onClick={() => setLeadToDelete(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="floating-leads__btn floating-leads__btn--danger"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingLeads;