import React, { useState } from "react";
import "./ColdLead.css";

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
  // Sample data
  // Replace this with your API data later
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "Rahul Kumar",
      email: "rahul@gmail.com",
      phone: "+91 9876543210",
      subject: "Admission Enquiry",
      message:
        "I would like to know more about the admission process and available seats.",
      status: "New",
      date: "12 Sep 2026",
    },
    {
      id: 2,
      name: "Priya Das",
      email: "priya@gmail.com",
      phone: "+91 9123456780",
      subject: "School Activities",
      message:
        "Please share details about school activities and extracurricular programs.",
      status: "Contacted",
      date: "11 Sep 2026",
    },
    {
      id: 3,
      name: "Amit Mishra",
      email: "amit@gmail.com",
      phone: "+91 9988776655",
      subject: "Visiting Nanda Kidz",
      message:
        "I want to schedule a visit to the school. Please let me know the available timings.",
      status: "New",
      date: "10 Sep 2026",
    },
    {
      id: 4,
      name: "Sneha Rout",
      email: "sneha@gmail.com",
      phone: "+91 9090909090",
      subject: "Fee Structure",
      message:
        "Could you please provide the current fee structure for admission?",
      status: "Contacted",
      date: "09 Sep 2026",
    },
  ]);

  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState(null);
  const [editingLead, setEditingLead] = useState(null);

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const searchText = search.toLowerCase();

    return (
      lead.name.toLowerCase().includes(searchText) ||
      lead.email.toLowerCase().includes(searchText) ||
      lead.phone.toLowerCase().includes(searchText) ||
      lead.subject.toLowerCase().includes(searchText)
    );
  });

  // Delete lead
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) return;

    setLeads((prevLeads) =>
      prevLeads.filter((lead) => lead.id !== id)
    );
  };

  // Edit input change
  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditingLead((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save edited lead
  const handleUpdate = (e) => {
    e.preventDefault();

    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === editingLead.id ? editingLead : lead
      )
    );

    setEditingLead(null);
  };

  return (
    <div className="ColdLead-container">

      {/* Header */}
      <div className="ColdLead-header">
        <div className="ColdLead-header-content">
          <div>
            <h1 className="ColdLead-title">Cold Leads</h1>
            <p className="ColdLead-subtitle">
              Manage and follow up with website enquiries.
            </p>
          </div>

          <div className="ColdLead-total-box">
            <span className="ColdLead-total-label">Total Leads</span>
            <strong className="ColdLead-total-number">
              {leads.length}
            </strong>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="ColdLead-stats">

        <div className="ColdLead-stat-card">
          <div className="ColdLead-stat-icon ColdLead-stat-icon-blue">
            <FaUser />
          </div>

          <div className="ColdLead-stat-info">
            <span>Total Leads</span>
            <strong>{leads.length}</strong>
          </div>
        </div>

        <div className="ColdLead-stat-card">
          <div className="ColdLead-stat-icon ColdLead-stat-icon-green">
            <FaCheckCircle />
          </div>

          <div className="ColdLead-stat-info">
            <span>Contacted</span>
            <strong>
              {leads.filter((lead) => lead.status === "Contacted").length}
            </strong>
          </div>
        </div>

        <div className="ColdLead-stat-card">
          <div className="ColdLead-stat-icon ColdLead-stat-icon-orange">
            <FaClock />
          </div>

          <div className="ColdLead-stat-info">
            <span>New Leads</span>
            <strong>
              {leads.filter((lead) => lead.status === "New").length}
            </strong>
          </div>
        </div>

      </div>

      {/* Main Card */}
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
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                className="ColdLead-search-clear"
                onClick={() => setSearch("")}
              >
                <FaTimes />
              </button>
            )}
          </div>

        </div>

        {/* Desktop Table */}
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
                  <tr key={lead.id}>

                    <td>
                      <span className="ColdLead-index">
                        {index + 1}
                      </span>
                    </td>

                    {/* Lead Details */}
                    <td>
                      <div className="ColdLead-person">

                        <div className="ColdLead-avatar">
                          {lead.name.charAt(0).toUpperCase()}
                        </div>

                        <div className="ColdLead-person-info">
                          <strong>{lead.name}</strong>

                          <span>
                            <FaEnvelope />
                            {lead.email}
                          </span>
                        </div>

                      </div>
                    </td>

                    {/* Phone */}
                    <td>
                      <div className="ColdLead-phone">
                        <FaPhone />
                        <span>{lead.phone}</span>
                      </div>
                    </td>

                    {/* Subject */}
                    <td>
                      <div className="ColdLead-subject">
                        <FaTag />
                        <span>{lead.subject}</span>
                      </div>
                    </td>

                    {/* Message */}
                    <td>
                      <div className="ColdLead-message-cell">
                        {lead.message}
                      </div>
                    </td>

                    {/* Status */}
                    <td>
                      <span
                        className={`ColdLead-status ${
                          lead.status === "Contacted"
                            ? "ColdLead-status-contacted"
                            : "ColdLead-status-new"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>

                    {/* Date */}
                    <td>
                      <div className="ColdLead-date">
                        <FaCalendarAlt />
                        {lead.date}
                      </div>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="ColdLead-actions">

                        <button
                          className="ColdLead-action-button ColdLead-view-button"
                          title="View"
                          onClick={() => setSelectedLead(lead)}
                        >
                          <FaEye />
                        </button>

                        <button
                          className="ColdLead-action-button ColdLead-edit-button"
                          title="Edit"
                          onClick={() => setEditingLead({ ...lead })}
                        >
                          <FaEdit />
                        </button>

                        <button
                          className="ColdLead-action-button ColdLead-delete-button"
                          title="Delete"
                          onClick={() => handleDelete(lead.id)}
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

                      <h3>No leads found</h3>

                      <p>
                        No enquiry matches your search.
                      </p>
                    </div>
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* Mobile Cards */}
        <div className="ColdLead-mobile-list">

          {filteredLeads.length > 0 ? (
            filteredLeads.map((lead, index) => (
              <div className="ColdLead-mobile-card" key={lead.id}>

                <div className="ColdLead-mobile-top">

                  <div className="ColdLead-person">

                    <div className="ColdLead-avatar">
                      {lead.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="ColdLead-person-info">
                      <strong>{lead.name}</strong>

                      <span>
                        <FaEnvelope />
                        {lead.email}
                      </span>
                    </div>

                  </div>

                  <span
                    className={`ColdLead-status ${
                      lead.status === "Contacted"
                        ? "ColdLead-status-contacted"
                        : "ColdLead-status-new"
                    }`}
                  >
                    {lead.status}
                  </span>

                </div>

                <div className="ColdLead-mobile-details">

                  <div className="ColdLead-mobile-detail">
                    <FaPhone />
                    <span>{lead.phone}</span>
                  </div>

                  <div className="ColdLead-mobile-detail">
                    <FaTag />
                    <span>{lead.subject}</span>
                  </div>

                  <div className="ColdLead-mobile-detail">
                    <FaCalendarAlt />
                    <span>{lead.date}</span>
                  </div>

                </div>

                <div className="ColdLead-mobile-message">
                  <strong>Message</strong>
                  <p>{lead.message}</p>
                </div>

                <div className="ColdLead-mobile-actions">

                  <button
                    className="ColdLead-mobile-view"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <FaEye />
                    View
                  </button>

                  <button
                    className="ColdLead-mobile-edit"
                    onClick={() => setEditingLead({ ...lead })}
                  >
                    <FaEdit />
                    Edit
                  </button>

                  <button
                    className="ColdLead-mobile-delete"
                    onClick={() => handleDelete(lead.id)}
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

              <h3>No leads found</h3>
              <p>No enquiry matches your search.</p>
            </div>
          )}

        </div>

      </div>

      {/* View Modal */}
      {selectedLead && (
        <div
          className="ColdLead-modal-overlay"
          onClick={() => setSelectedLead(null)}
        >

          <div
            className="ColdLead-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="ColdLead-modal-header">
              <div>
                <h2>Lead Details</h2>
                <p>Complete enquiry information</p>
              </div>

              <button
                className="ColdLead-modal-close"
                onClick={() => setSelectedLead(null)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="ColdLead-modal-body">

              <div className="ColdLead-modal-profile">

                <div className="ColdLead-modal-avatar">
                  {selectedLead.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3>{selectedLead.name}</h3>
                  <span>{selectedLead.email}</span>
                </div>

              </div>

              <div className="ColdLead-modal-grid">

                <div className="ColdLead-modal-field">
                  <label>Phone</label>
                  <p>{selectedLead.phone}</p>
                </div>

                <div className="ColdLead-modal-field">
                  <label>Subject</label>
                  <p>{selectedLead.subject}</p>
                </div>

                <div className="ColdLead-modal-field">
                  <label>Date</label>
                  <p>{selectedLead.date}</p>
                </div>

                <div className="ColdLead-modal-field">
                  <label>Status</label>
                  <p>{selectedLead.status}</p>
                </div>

              </div>

              <div className="ColdLead-modal-message">
                <label>Message</label>
                <p>{selectedLead.message}</p>
              </div>

            </div>

            <div className="ColdLead-modal-footer">
              <button
                className="ColdLead-modal-edit"
                onClick={() => {
                  setSelectedLead(null);
                  setEditingLead({ ...selectedLead });
                }}
              >
                <FaEdit />
                Edit Lead
              </button>

              <button
                className="ColdLead-modal-cancel"
                onClick={() => setSelectedLead(null)}
              >
                Close
              </button>
            </div>

          </div>

        </div>
      )}

      {/* Edit Modal */}
      {editingLead && (
        <div
          className="ColdLead-modal-overlay"
          onClick={() => setEditingLead(null)}
        >

          <div
            className="ColdLead-edit-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="ColdLead-modal-header">
              <div>
                <h2>Edit Lead</h2>
                <p>Update enquiry information</p>
              </div>

              <button
                className="ColdLead-modal-close"
                onClick={() => setEditingLead(null)}
              >
                <FaTimes />
              </button>
            </div>

            <form
              className="ColdLead-edit-form"
              onSubmit={handleUpdate}
            >

              <div className="ColdLead-form-grid">

                <div className="ColdLead-form-group">
                  <label>
                    <FaUser />
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={editingLead.name}
                    onChange={handleEditChange}
                    required
                  />
                </div>

                <div className="ColdLead-form-group">
                  <label>
                    <FaEnvelope />
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={editingLead.email}
                    onChange={handleEditChange}
                    required
                  />
                </div>

                <div className="ColdLead-form-group">
                  <label>
                    <FaPhone />
                    Phone
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={editingLead.phone}
                    onChange={handleEditChange}
                    required
                  />
                </div>

                <div className="ColdLead-form-group">
                  <label>
                    <FaTag />
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    value={editingLead.subject}
                    onChange={handleEditChange}
                    required
                  />
                </div>

              </div>

              <div className="ColdLead-form-group">
                <label>
                  <FaCommentDots />
                  Message
                </label>

                <textarea
                  name="message"
                  value={editingLead.message}
                  onChange={handleEditChange}
                  rows="5"
                  required
                />
              </div>

              <div className="ColdLead-form-group">
                <label>Status</label>

                <select
                  name="status"
                  value={editingLead.status}
                  onChange={handleEditChange}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="ColdLead-edit-footer">

                <button
                  type="button"
                  className="ColdLead-cancel-button"
                  onClick={() => setEditingLead(null)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="ColdLead-save-button"
                >
                  <FaCheckCircle />
                  Save Changes
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