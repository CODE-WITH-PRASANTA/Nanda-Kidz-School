import React, { useEffect, useMemo, useState } from "react";
import {
  Megaphone,
  Plus,
  Search,
  Save,
  X,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import API from "../../api/axios";
import "./LatestNews.css";

const ITEMS_PER_PAGE = 5;

const LatestNews = () => {
  const [announcements, setAnnouncements] = useState([]);

  const [inputHeading, setInputHeading] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // =====================================================
  // FETCH ANNOUNCEMENTS
  // =====================================================

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/announcements");

      if (response.data?.success) {
        setAnnouncements(response.data.data || []);
      } else {
        setAnnouncements([]);
      }
    } catch (error) {
      console.error("Fetch announcements error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load announcements. Please check your server."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // =====================================================
  // AUTO HIDE SUCCESS MESSAGE
  // =====================================================

  useEffect(() => {
    if (!successMessage) return;

    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  // =====================================================
  // SAVE / UPDATE
  // =====================================================

  const handleSave = async (e) => {
    e.preventDefault();

    const trimmedHeading = inputHeading.trim();

    if (!trimmedHeading) {
      setError("Please enter an announcement heading.");
      return;
    }

    if (trimmedHeading.length > 100) {
      setError("Announcement heading cannot exceed 100 characters.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      // ================================================
      // UPDATE
      // ================================================

      if (editingId) {
        const response = await API.put(
          `/announcements/${editingId}`,
          {
            heading: trimmedHeading,
          }
        );

        if (response.data?.success) {
          setAnnouncements((prev) =>
            prev.map((item) =>
              item._id === editingId
                ? response.data.data
                : item
            )
          );

          setSuccessMessage(
            "Announcement updated successfully."
          );

          setEditingId(null);
          setInputHeading("");
        }

        return;
      }

      // ================================================
      // CREATE
      // ================================================

      const response = await API.post("/announcements", {
        heading: trimmedHeading,
      });

      if (response.data?.success) {
        setAnnouncements((prev) => [
          response.data.data,
          ...prev,
        ]);

        setSuccessMessage(
          "Announcement created successfully."
        );

        setInputHeading("");
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Save announcement error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to save announcement."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (announcement) => {
    setInputHeading(announcement.heading);
    setEditingId(announcement._id);

    setError("");
    setSuccessMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    const announcement = announcements.find(
      (item) => item._id === id
    );

    const confirmed = window.confirm(
      `Are you sure you want to delete "${announcement?.heading}"?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");

      const response = await API.delete(
        `/announcements/${id}`
      );

      if (response.data?.success) {
        setAnnouncements((prev) =>
          prev.filter((item) => item._id !== id)
        );

        if (editingId === id) {
          setEditingId(null);
          setInputHeading("");
        }

        setSuccessMessage(
          "Announcement deleted successfully."
        );
      }
    } catch (error) {
      console.error("Delete announcement error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to delete announcement."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =====================================================
  // CLEAR FORM
  // =====================================================

  const handleClear = () => {
    setInputHeading("");
    setEditingId(null);
    setError("");
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredAnnouncements = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) {
      return announcements;
    }

    return announcements.filter((item) =>
      item.heading?.toLowerCase().includes(search)
    );
  }, [announcements, searchTerm]);

  // =====================================================
  // RESET PAGE WHEN SEARCH CHANGES
  // =====================================================

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredAnnouncements.length / ITEMS_PER_PAGE
    )
  );

  const paginatedAnnouncements = filteredAnnouncements.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // =====================================================
  // DATE FORMAT
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="AnnouncementMgr-wrapper">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="AnnouncementMgr-headerCard">

        <div className="AnnouncementMgr-headerLeft">

          <div className="AnnouncementMgr-mainIconBox">
            <Megaphone size={22} />
          </div>

          <div>
            <h1 className="AnnouncementMgr-title">
              Announcement Management
            </h1>

            <p className="AnnouncementMgr-subtitle">
              Manage the announcement heading displayed on
              your website.
            </p>
          </div>

        </div>

        <div className="AnnouncementMgr-totalBadge">

          <div className="AnnouncementMgr-totalInfo">
            <span className="AnnouncementMgr-totalLabel">
              Total Announcements
            </span>

            <span className="AnnouncementMgr-totalCount">
              {announcements.length}
            </span>
          </div>

          <div className="AnnouncementMgr-badgeIconBox">
            <Megaphone size={16} />
          </div>

        </div>

      </div>

      {/* =================================================
          SUCCESS MESSAGE
      ================================================= */}

      {successMessage && (
        <div className="AnnouncementMgr-alert AnnouncementMgr-success">
          <CheckCircle2 size={17} />
          <span>{successMessage}</span>
        </div>
      )}

      {/* =================================================
          ERROR MESSAGE
      ================================================= */}

      {error && (
        <div className="AnnouncementMgr-alert AnnouncementMgr-error">
          <AlertCircle size={17} />
          <span>{error}</span>

          <button
            type="button"
            onClick={() => setError("")}
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* =================================================
          CREATE / EDIT FORM
      ================================================= */}

      <div className="AnnouncementMgr-card">

        <div className="AnnouncementMgr-cardHeader">

          <div className="AnnouncementMgr-cardTitleGroup">

            <div className="AnnouncementMgr-actionIconBox">
              {editingId ? (
                <Edit2 size={18} />
              ) : (
                <Plus size={18} />
              )}
            </div>

            <div>
              <h2>
                {editingId
                  ? "Edit Announcement"
                  : "Create Announcement"}
              </h2>

              <p>
                Add a short heading for the announcement
                bar.
              </p>
            </div>

          </div>

          <span
            className={`AnnouncementMgr-newTag ${
              editingId
                ? "AnnouncementMgr-editingTag"
                : ""
            }`}
          >
            {editingId ? "Editing" : "New"}
          </span>

        </div>

        <form
          onSubmit={handleSave}
          className="AnnouncementMgr-form"
        >

          <div className="AnnouncementMgr-inputGroup">

            <label className="AnnouncementMgr-label">
              Announcement Heading{" "}
              <span className="AnnouncementMgr-required">
                *
              </span>
            </label>

            <div
              className={`AnnouncementMgr-inputWrapper ${
                editingId
                  ? "AnnouncementMgr-inputEditing"
                  : ""
              }`}
            >

              <span className="AnnouncementMgr-prefixIcon">
                <Megaphone size={16} />
              </span>

              <input
                type="text"
                className="AnnouncementMgr-input"
                placeholder="e.g. Admissions open for the new session"
                maxLength={100}
                value={inputHeading}
                onChange={(e) =>
                  setInputHeading(e.target.value)
                }
                disabled={saving}
              />

              <span className="AnnouncementMgr-counter">
                {inputHeading.length}/100
              </span>

            </div>

            <span className="AnnouncementMgr-helpText">
              Keep the announcement short and easy to read.
            </span>

          </div>

          <div className="AnnouncementMgr-formActions">

            <button
              type="button"
              className="AnnouncementMgr-btnClear"
              onClick={handleClear}
              disabled={saving}
            >
              <X size={15} />
              Clear
            </button>

            <button
              type="submit"
              className="AnnouncementMgr-btnSave"
              disabled={saving}
            >

              {saving ? (
                <>
                  <Loader2
                    size={16}
                    className="AnnouncementMgr-spin"
                  />

                  {editingId
                    ? "Updating..."
                    : "Saving..."}
                </>
              ) : (
                <>
                  <Save size={15} />

                  {editingId
                    ? "Update Announcement"
                    : "Save Announcement"}
                </>
              )}

            </button>

          </div>

        </form>

      </div>

      {/* =================================================
          LIST
      ================================================= */}

      <div className="AnnouncementMgr-card">

        <div className="AnnouncementMgr-tableHeaderBar">

          <div className="AnnouncementMgr-cardTitleGroup">

            <div className="AnnouncementMgr-listIconBox">
              <Megaphone size={18} />
            </div>

            <div>
              <h2>Announcement List</h2>

              <p>
                View and manage all announcement headings.
              </p>
            </div>

          </div>

          <div className="AnnouncementMgr-tableTools">

            <button
              type="button"
              className="AnnouncementMgr-refreshBtn"
              onClick={fetchAnnouncements}
              disabled={loading}
              title="Refresh"
            >
              <RefreshCw
                size={15}
                className={
                  loading
                    ? "AnnouncementMgr-spin"
                    : ""
                }
              />
            </button>

            <div className="AnnouncementMgr-searchBox">

              <Search
                size={15}
                className="AnnouncementMgr-searchIcon"
              />

              <input
                type="text"
                className="AnnouncementMgr-searchInput"
                placeholder="Search announcement..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
              />

            </div>

          </div>

        </div>

        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (
          <div className="AnnouncementMgr-loading">

            <Loader2
              size={28}
              className="AnnouncementMgr-spin"
            />

            <p>Loading announcements...</p>

          </div>
        ) : (

          <div className="AnnouncementMgr-tableResponsive">

            <table className="AnnouncementMgr-table">

              <thead>
                <tr>
                  <th className="col-num">#</th>
                  <th className="col-heading">
                    HEADING
                  </th>
                  <th className="col-status">
                    STATUS
                  </th>
                  <th className="col-date">
                    CREATED
                  </th>
                  <th className="col-actions">
                    ACTIONS
                  </th>
                </tr>
              </thead>

              <tbody>

                {paginatedAnnouncements.length > 0 ? (

                  paginatedAnnouncements.map(
                    (item, index) => {

                      const serialNumber =
                        (currentPage - 1) *
                          ITEMS_PER_PAGE +
                        index +
                        1;

                      return (
                        <tr key={item._id}>

                          <td className="col-num">
                            {String(
                              serialNumber
                            ).padStart(2, "0")}
                          </td>

                          <td className="col-heading">

                            <div className="AnnouncementMgr-itemRow">

                              <div className="AnnouncementMgr-rowIcon">
                                <Megaphone size={14} />
                              </div>

                              <div className="AnnouncementMgr-rowContent">

                                <span className="AnnouncementMgr-rowTitle">
                                  {item.heading}
                                </span>

                              </div>

                            </div>

                          </td>

                          <td className="col-status">

                            <span
                              className={`AnnouncementMgr-status ${
                                item.status ===
                                "Active"
                                  ? "AnnouncementMgr-statusActive"
                                  : "AnnouncementMgr-statusInactive"
                              }`}
                            >
                              <span className="AnnouncementMgr-statusDot" />

                              {item.status ||
                                "Active"}
                            </span>

                          </td>

                          <td className="col-date">

                            <span className="AnnouncementMgr-date">
                              {formatDate(
                                item.createdAt
                              )}
                            </span>

                          </td>

                          <td className="col-actions">

                            <div className="AnnouncementMgr-actionButtons">

                              <button
                                type="button"
                                className="AnnouncementMgr-btnEdit"
                                onClick={() =>
                                  handleEdit(item)
                                }
                                disabled={
                                  deletingId ===
                                  item._id
                                }
                              >
                                <Edit2 size={13} />
                                Edit
                              </button>

                              <button
                                type="button"
                                className="AnnouncementMgr-btnDelete"
                                onClick={() =>
                                  handleDelete(
                                    item._id
                                  )
                                }
                                disabled={
                                  deletingId ===
                                  item._id
                                }
                              >

                                {deletingId ===
                                item._id ? (
                                  <Loader2
                                    size={13}
                                    className="AnnouncementMgr-spin"
                                  />
                                ) : (
                                  <Trash2 size={13} />
                                )}

                                {deletingId ===
                                item._id
                                  ? "Deleting..."
                                  : "Delete"}

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
                      colSpan="5"
                      className="AnnouncementMgr-empty"
                    >

                      <div className="AnnouncementMgr-emptyIcon">
                        <Megaphone size={24} />
                      </div>

                      <strong>
                        No announcements found
                      </strong>

                      <span>
                        {searchTerm
                          ? "Try a different search term."
                          : "Create your first announcement above."}
                      </span>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>
        )}

        {/* =================================================
            FOOTER
        ================================================= */}

        {!loading &&
          filteredAnnouncements.length > 0 && (

            <div className="AnnouncementMgr-tableFooter">

              <span className="AnnouncementMgr-footerInfo">
                Showing{" "}
                {Math.min(
                  (currentPage - 1) *
                    ITEMS_PER_PAGE +
                    1,
                  filteredAnnouncements.length
                )}
                –
                {Math.min(
                  currentPage *
                    ITEMS_PER_PAGE,
                  filteredAnnouncements.length
                )}{" "}
                of{" "}
                {filteredAnnouncements.length}{" "}
                announcements
              </span>

              <div className="AnnouncementMgr-pagination">

                <button
                  type="button"
                  className="AnnouncementMgr-pageBtn"
                  disabled={currentPage <= 1}
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.max(prev - 1, 1)
                    )
                  }
                >
                  <ChevronLeft size={15} />
                </button>

                <span className="AnnouncementMgr-pageNumber">
                  {currentPage} / {totalPages}
                </span>

                <button
                  type="button"
                  className="AnnouncementMgr-pageBtn"
                  disabled={
                    currentPage >= totalPages
                  }
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(
                        prev + 1,
                        totalPages
                      )
                    )
                  }
                >
                  <ChevronRight size={15} />
                </button>

              </div>

            </div>
          )}

      </div>

    </div>
  );
};

export default LatestNews;