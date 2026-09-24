
import React, { useEffect, useState } from "react";
import "./ColdLead.css";
import api from "../../api/axios";

import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaTag,
  FaCommentDots,
  FaCalendarAlt,
  FaEye,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

const ColdLead = () => {
  // ==========================================
  // STATES
  // ==========================================

  const [leads, setLeads] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [selectedLead, setSelectedLead] = useState(null);

  const [editingLead, setEditingLead] = useState(null);

  const [isUpdating, setIsUpdating] = useState(false);

  const [deletingId, setDeletingId] = useState(null);

  // ==========================================
  // FETCH ALL LEADS
  // ==========================================

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/contacts");

      console.log("Leads fetched:", response.data);

      const fetchedLeads = response.data?.data || [];

      setLeads(fetchedLeads);
    } catch (err) {
      console.error("Fetch leads error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load enquiries. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // FETCH WHEN COMPONENT LOADS
  // ==========================================

  useEffect(() => {
    fetchLeads();
  }, []);

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const formattedDate = new Date(date);

    if (Number.isNaN(formattedDate.getTime())) {
      return "-";
    }

    return formattedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==========================================
  // FILTER LEADS
  // ==========================================

  const filteredLeads = leads.filter((lead) => {
    const searchText = search.toLowerCase().trim();

    return (
      (lead.name || "")
        .toLowerCase()
        .includes(searchText) ||
      (lead.email || "")
        .toLowerCase()
        .includes(searchText) ||
      (lead.phone || "")
        .toLowerCase()
        .includes(searchText) ||
      (lead.subject || "")
        .toLowerCase()
        .includes(searchText) ||
      (lead.message || "")
        .toLowerCase()
        .includes(searchText)
    );
  });

  // ==========================================
  // DELETE LEAD
  // ==========================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingId(id);

      await api.delete(`/contacts/${id}`);

      // Remove from current UI after successful backend deletion
      setLeads((prevLeads) =>
        prevLeads.filter((lead) => lead._id !== id)
      );

      // Close view modal if deleted lead was open
      if (selectedLead?._id === id) {
        setSelectedLead(null);
      }

      // Close edit modal if deleted lead was being edited
      if (editingLead?._id === id) {
        setEditingLead(null);
      }
    } catch (err) {
      console.error("Delete lead error:", err);

      alert(
        err.response?.data?.message ||
          "Failed to delete lead. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ==========================================
  // EDIT INPUT CHANGE
  // ==========================================

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditingLead((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // UPDATE LEAD
  // ==========================================

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingLead?._id) {
      return;
    }

    try {
      setIsUpdating(true);

      const response = await api.put(
        `/contacts/${editingLead._id}`,
        {
          name: editingLead.name,
          email: editingLead.email,
          phone: editingLead.phone,
          subject: editingLead.subject,
          message: editingLead.message,
          status: editingLead.status,
        }
      );

      console.log("Lead updated:", response.data);

      const updatedLead = response.data?.data;

      if (updatedLead) {
        setLeads((prevLeads) =>
          prevLeads.map((lead) =>
            lead._id === updatedLead._id
              ? updatedLead
              : lead
          )
        );
      } else {
        // Fallback: reload data from backend
        await fetchLeads();
      }

      setEditingLead(null);
    } catch (err) {
      console.error("Update lead error:", err);

      alert(
        err.response?.data?.message ||
          "Failed to update lead. Please try again."
      );
    } finally {
      setIsUpdating(false);
    }
  };

  // ==========================================
  // REFRESH LEADS
  // ==========================================

  const handleRefresh = () => {
    fetchLeads();
  };

  return (
    <div className="ColdLead-container">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="ColdLead-header">

        <div className="ColdLead-header-content">

          <div>
            <h1 className="ColdLead-title">
              Cold Leads
            </h1>

            <p className="ColdLead-subtitle">
              Manage and follow up with website enquiries.
            </p>
          </div>

          <div className="ColdLead-total-box">

            <span className="ColdLead-total-label">
              Total Leads
            </span>

            <strong className="ColdLead-total-number">
              {leads.length}
            </strong>

          </div>

        </div>

      </div>

      {/* ==========================================
          STATISTICS
      ========================================== */}

      <div className="ColdLead-stats">

        {/* Total */}

        <div className="ColdLead-stat-card">

          <div className="ColdLead-stat-icon ColdLead-stat-icon-blue">
            <FaUser />
          </div>

          <div className="ColdLead-stat-info">

            <span>Total Leads</span>

            <strong>
              {leads.length}
            </strong>

          </div>

        </div>

        {/* Contacted */}

        <div className="ColdLead-stat-card">

          <div className="ColdLead-stat-icon ColdLead-stat-icon-green">
            <FaCheckCircle />
          </div>

          <div className="ColdLead-stat-info">

            <span>Contacted</span>

            <strong>
              {
                leads.filter(
                  (lead) => lead.status === "Contacted"
                ).length
              }
            </strong>

          </div>

        </div>

        {/* New */}

        <div className="ColdLead-stat-card">

          <div className="ColdLead-stat-icon ColdLead-stat-icon-orange">
            <FaClock />
          </div>

          <div className="ColdLead-stat-info">

            <span>New Leads</span>

            <strong>
              {
                leads.filter(
                  (lead) => lead.status === "New"
                ).length
              }
            </strong>

          </div>

        </div>

      </div>

      {/* ==========================================
          MAIN CARD
      ========================================== */}

      <div className="ColdLead-card">

        {/* Toolbar */}

        <div className="ColdLead-toolbar">

          <div className="ColdLead-toolbar-left">

            <h2 className="ColdLead-table-title">
              Enquiry List
            </h2>

            <span className="ColdLead-result-count">
              {filteredLeads.length} results
            </span>

          </div>

          <div className="ColdLead-search-wrapper">

            <FaSearch className="ColdLead-search-icon" />

            <input
              type="text"
              className="ColdLead-search"
              placeholder="Search leads..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            {search && (
              <button
                type="button"
                className="ColdLead-search-clear"
                onClick={() => setSearch("")}
              >
                <FaTimes />
              </button>
            )}

          </div>

          {/* Refresh */}

          <button
            type="button"
            className="ColdLead-refresh-button"
            onClick={handleRefresh}
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh"}
          </button>

        </div>

        {/* ==========================================
            ERROR
        ========================================== */}

        {error && (
          <div className="ColdLead-error">
            {error}

            <button
              type="button"
              onClick={handleRefresh}
            >
              Try Again
            </button>
          </div>
        )}

        {/* ==========================================
            LOADING
        ========================================== */}

        {loading ? (
          <div className="ColdLead-loading">

            <div className="ColdLead-loading-spinner" />

            <p>
              Loading enquiries...
            </p>

          </div>
        ) : (
          <>
            {/* ==========================================
                DESKTOP TABLE
            ========================================== */}

            <div className="ColdLead-table-wrapper">

              <table className="ColdLead-table">

                <thead>

                  <tr>
                    <th>#</th>
                    <th>Lead Details</th>
                    <th>Phone</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredLeads.length > 0 ? (

                    filteredLeads.map((lead, index) => (

                      <tr key={lead._id}>

                        {/* Number */}

                        <td>

                          <span className="ColdLead-index">
                            {index + 1}
                          </span>

                        </td>

                        {/* Lead Details */}

                        <td>

                          <div className="ColdLead-person">

                            <div className="ColdLead-avatar">
                              {(lead.name || "?")
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div className="ColdLead-person-info">

                              <strong>
                                {lead.name || "-"}
                              </strong>

                              <span>
                                <FaEnvelope />
                                {lead.email || "-"}
                              </span>

                            </div>

                          </div>

                        </td>

                        {/* Phone */}

                        <td>

                          <div className="ColdLead-phone">

                            <FaPhone />

                            <span>
                              {lead.phone || "-"}
                            </span>

                          </div>

                        </td>

                        {/* Subject */}

                        <td>

                          <div className="ColdLead-subject">

                            <FaTag />

                            <span>
                              {lead.subject || "-"}
                            </span>

                          </div>

                        </td>

                        {/* Message */}

                        <td>

                          <div className="ColdLead-message-cell">
                            {lead.message || "-"}
                          </div>

                        </td>

                        {/* Status */}

                        <td>

                          <span
                            className={`ColdLead-status ${
                              lead.status === "Contacted"
                                ? "ColdLead-status-contacted"
                                : lead.status === "Closed"
                                ? "ColdLead-status-closed"
                                : "ColdLead-status-new"
                            }`}
                          >
                            {lead.status || "New"}
                          </span>

                        </td>

                        {/* Date */}

                        <td>

                          <div className="ColdLead-date">

                            <FaCalendarAlt />

                            {formatDate(
                              lead.createdAt
                            )}

                          </div>

                        </td>

                        {/* Actions */}

                        <td>

                          <div className="ColdLead-actions">

                            {/* View */}

                            <button
                              type="button"
                              className="ColdLead-action-button ColdLead-view-button"
                              title="View"
                              onClick={() =>
                                setSelectedLead(lead)
                              }
                            >
                              <FaEye />
                            </button>

                            {/* Edit */}

                            <button
                              type="button"
                              className="ColdLead-action-button ColdLead-edit-button"
                              title="Edit"
                              onClick={() =>
                                setEditingLead({
                                  ...lead,
                                })
                              }
                            >
                              <FaEdit />
                            </button>

                            {/* Delete */}

                            <button
                              type="button"
                              className="ColdLead-action-button ColdLead-delete-button"
                              title="Delete"
                              disabled={
                                deletingId === lead._id
                              }
                              onClick={() =>
                                handleDelete(
                                  lead._id
                                )
                              }
                            >
                              <FaTrash />
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td colSpan="8">

                        <div className="ColdLead-empty">

                          <div className="ColdLead-empty-icon">
                            <FaCommentDots />
                          </div>

                          <h3>
                            No leads found
                          </h3>

                          <p>
                            {search
                              ? "No enquiry matches your search."
                              : "No enquiries have been submitted yet."}
                          </p>

                        </div>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

            {/* ==========================================
                MOBILE CARDS
            ========================================== */}

            <div className="ColdLead-mobile-list">

              {filteredLeads.length > 0 ? (

                filteredLeads.map((lead) => (

                  <div
                    className="ColdLead-mobile-card"
                    key={lead._id}
                  >

                    <div className="ColdLead-mobile-top">

                      <div className="ColdLead-person">

                        <div className="ColdLead-avatar">
                          {(lead.name || "?")
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div className="ColdLead-person-info">

                          <strong>
                            {lead.name || "-"}
                          </strong>

                          <span>
                            <FaEnvelope />
                            {lead.email || "-"}
                          </span>

                        </div>

                      </div>

                      <span
                        className={`ColdLead-status ${
                          lead.status === "Contacted"
                            ? "ColdLead-status-contacted"
                            : lead.status === "Closed"
                            ? "ColdLead-status-closed"
                            : "ColdLead-status-new"
                        }`}
                      >
                        {lead.status || "New"}
                      </span>

                    </div>

                    <div className="ColdLead-mobile-details">

                      <div className="ColdLead-mobile-detail">

                        <FaPhone />

                        <span>
                          {lead.phone || "-"}
                        </span>

                      </div>

                      <div className="ColdLead-mobile-detail">

                        <FaTag />

                        <span>
                          {lead.subject || "-"}
                        </span>

                      </div>

                      <div className="ColdLead-mobile-detail">

                        <FaCalendarAlt />

                        <span>
                          {formatDate(
                            lead.createdAt
                          )}
                        </span>

                      </div>

                    </div>

                    <div className="ColdLead-mobile-message">

                      <strong>
                        Message
                      </strong>

                      <p>
                        {lead.message || "-"}
                      </p>

                    </div>

                    <div className="ColdLead-mobile-actions">

                      <button
                        type="button"
                        className="ColdLead-mobile-view"
                        onClick={() =>
                          setSelectedLead(lead)
                        }
                      >
                        <FaEye />
                        View
                      </button>

                      <button
                        type="button"
                        className="ColdLead-mobile-edit"
                        onClick={() =>
                          setEditingLead({
                            ...lead,
                          })
                        }
                      >
                        <FaEdit />
                        Edit
                      </button>

                      <button
                        type="button"
                        className="ColdLead-mobile-delete"
                        disabled={
                          deletingId === lead._id
                        }
                        onClick={() =>
                          handleDelete(
                            lead._id
                          )
                        }
                      >
                        <FaTrash />
                        Delete
                      </button>

                    </div>

                  </div>

                ))

              ) : (

                <div className="ColdLead-empty">

                  <div className="ColdLead-empty-icon">
                    <FaCommentDots />
                  </div>

                  <h3>
                    No leads found
                  </h3>

                  <p>
                    {search
                      ? "No enquiry matches your search."
                      : "No enquiries have been submitted yet."}
                  </p>

                </div>

              )}

            </div>
          </>
        )}

      </div>

      {/* ==========================================
          VIEW MODAL
      ========================================== */}

      {selectedLead && (

        <div
          className="ColdLead-modal-overlay"
          onClick={() =>
            setSelectedLead(null)
          }
        >

          <div
            className="ColdLead-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="ColdLead-modal-header">

              <div>

                <h2>
                  Lead Details
                </h2>

                <p>
                  Complete enquiry information
                </p>

              </div>

              <button
                type="button"
                className="ColdLead-modal-close"
                onClick={() =>
                  setSelectedLead(null)
                }
              >
                <FaTimes />
              </button>

            </div>

            <div className="ColdLead-modal-body">

              <div className="ColdLead-modal-profile">

                <div className="ColdLead-modal-avatar">
                  {(selectedLead.name || "?")
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>

                  <h3>
                    {selectedLead.name}
                  </h3>

                  <span>
                    {selectedLead.email}
                  </span>

                </div>

              </div>

              <div className="ColdLead-modal-grid">

                <div className="ColdLead-modal-field">

                  <label>
                    Phone
                  </label>

                  <p>
                    {selectedLead.phone || "-"}
                  </p>

                </div>

                <div className="ColdLead-modal-field">

                  <label>
                    Subject
                  </label>

                  <p>
                    {selectedLead.subject || "-"}
                  </p>

                </div>

                <div className="ColdLead-modal-field">

                  <label>
                    Date
                  </label>

                  <p>
                    {formatDate(
                      selectedLead.createdAt
                    )}
                  </p>

                </div>

                <div className="ColdLead-modal-field">

                  <label>
                    Status
                  </label>

                  <p>
                    {selectedLead.status || "New"}
                  </p>

                </div>

              </div>

              <div className="ColdLead-modal-message">

                <label>
                  Message
                </label>

                <p>
                  {selectedLead.message || "-"}
                </p>

              </div>

            </div>

            <div className="ColdLead-modal-footer">

              <button
                type="button"
                className="ColdLead-modal-edit"
                onClick={() => {
                  setSelectedLead(null);

                  setEditingLead({
                    ...selectedLead,
                  });
                }}
              >
                <FaEdit />
                Edit Lead
              </button>

              <button
                type="button"
                className="ColdLead-modal-cancel"
                onClick={() =>
                  setSelectedLead(null)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

      {/* ==========================================
          EDIT MODAL
      ========================================== */}

      {editingLead && (

        <div
          className="ColdLead-modal-overlay"
          onClick={() =>
            !isUpdating &&
            setEditingLead(null)
          }
        >

          <div
            className="ColdLead-edit-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="ColdLead-modal-header">

              <div>

                <h2>
                  Edit Lead
                </h2>

                <p>
                  Update enquiry information
                </p>

              </div>

              <button
                type="button"
                className="ColdLead-modal-close"
                disabled={isUpdating}
                onClick={() =>
                  setEditingLead(null)
                }
              >
                <FaTimes />
              </button>

            </div>

            <form
              className="ColdLead-edit-form"
              onSubmit={handleUpdate}
            >

              <div className="ColdLead-form-grid">

                {/* Name */}

                <div className="ColdLead-form-group">

                  <label>
                    <FaUser />
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={
                      editingLead.name || ""
                    }
                    onChange={
                      handleEditChange
                    }
                    required
                  />

                </div>

                {/* Email */}

                <div className="ColdLead-form-group">

                  <label>
                    <FaEnvelope />
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={
                      editingLead.email || ""
                    }
                    onChange={
                      handleEditChange
                    }
                    required
                  />

                </div>

                {/* Phone */}

                <div className="ColdLead-form-group">

                  <label>
                    <FaPhone />
                    Phone
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={
                      editingLead.phone || ""
                    }
                    onChange={
                      handleEditChange
                    }
                  />

                </div>

                {/* Subject */}

                <div className="ColdLead-form-group">

                  <label>
                    <FaTag />
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    value={
                      editingLead.subject || ""
                    }
                    onChange={
                      handleEditChange
                    }
                  />

                </div>

              </div>

              {/* Message */}

              <div className="ColdLead-form-group">

                <label>
                  <FaCommentDots />
                  Message
                </label>

                <textarea
                  name="message"
                  value={
                    editingLead.message || ""
                  }
                  onChange={
                    handleEditChange
                  }
                  rows="5"
                  required
                />

              </div>

              {/* Status */}

              <div className="ColdLead-form-group">

                <label>
                  Status
                </label>

                <select
                  name="status"
                  value={
                    editingLead.status || "New"
                  }
                  onChange={
                    handleEditChange
                  }
                >

                  <option value="New">
                    New
                  </option>

                  <option value="Contacted">
                    Contacted
                  </option>

                  <option value="Closed">
                    Closed
                  </option>

                </select>

              </div>

              {/* Footer */}

              <div className="ColdLead-edit-footer">

                <button
                  type="button"
                  className="ColdLead-cancel-button"
                  disabled={isUpdating}
                  onClick={() =>
                    setEditingLead(null)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="ColdLead-save-button"
                  disabled={isUpdating}
                >

                  <FaCheckCircle />

                  {isUpdating
                    ? "Saving..."
                    : "Save Changes"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default ColdLead;

