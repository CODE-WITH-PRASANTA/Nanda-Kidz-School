import React, { useState, useEffect, useRef } from "react";
import "./GalleryManagement.css";
import API, { IMG_URL } from "../../api/axios";

const GalleryManagement = () => {
  // ==============================
  // DATA & STATUS STATES
  // ==============================
  const [galleryList, setGalleryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ==============================
  // FORM STATES
  // ==============================
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [editingId, setEditingId] = useState(null);

  // ==============================
  // SEARCH & MODAL STATES
  // ==============================
  const [searchQuery, setSearchQuery] = useState("");
  const [viewModalData, setViewModalData] = useState(null);

  // ==============================
  // PAGINATION
  // ==============================
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const fileInputRef = useRef(null);

  // ==============================
  // FETCH GALLERY
  // ==============================
  useEffect(() => {
    fetchGalleries();
  }, [searchQuery]);

  const fetchGalleries = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await API.get(
        `/gallery?search=${encodeURIComponent(searchQuery)}`
      );

      // Backend normally returns an array
      if (Array.isArray(response.data)) {
        setGalleryList(response.data);
      } else if (Array.isArray(response.data?.data)) {
        setGalleryList(response.data.data);
      } else {
        setGalleryList([]);
      }
    } catch (err) {
      console.error("FETCH GALLERY ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load gallery items from the server."
      );

      setGalleryList([]);
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // IMAGE URL HELPER
  // ==============================
  const getImageUrl = (image) => {
    if (!image) return "";

    // If it's already a blob URL (local file preview) or absolute URL
    if (
      image.startsWith("blob:") ||
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    // Fallback for relative backend path using IMG_URL or localhost
    const baseUrl = IMG_URL || "http://localhost:5000";
    return `${baseUrl.replace(/\/$/, "")}${image.startsWith("/") ? "" : "/"}${image}`;
  };

  // ==============================
  // IMAGE CHANGE
  // ==============================
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Validate image type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please select a JPG, JPEG or PNG image.");
      e.target.value = "";
      return;
    }

    // Frontend file size validation - 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      e.target.value = "";
      return;
    }

    setSelectedImage(file);

    // Remove previous object URL if required
    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview(URL.createObjectURL(file));
  };

  // ==============================
  // RESET FORM
  // ==============================
  const resetForm = () => {
    setTitle("");
    setSelectedImage(null);
    setImagePreview("");
    setEditingId(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ==============================
  // SUBMIT FORM
  // ADD / UPDATE
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter an image title.");
      return;
    }

    // Image required only while adding
    if (!editingId && !selectedImage) {
      alert("Please upload an image.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title.trim());

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      // ==============================
      // UPDATE
      // ==============================
      if (editingId) {
        const response = await API.put(
          `/gallery/${editingId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const updatedItem = response.data?.data;

        if (updatedItem) {
          setGalleryList((prevList) =>
            prevList.map((item) =>
              item._id === editingId ? updatedItem : item
            )
          );
        } else {
          await fetchGalleries();
        }

        alert("Gallery image updated successfully.");
      }

      // ==============================
      // ADD
      // ==============================
      else {
        const response = await API.post(
          "/gallery",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const newItem = response.data?.data;

        if (newItem) {
          setGalleryList((prevList) => [
            newItem,
            ...prevList,
          ]);
        } else {
          await fetchGalleries();
        }

        setCurrentPage(1);

        alert("Gallery image added successfully.");
      }

      resetForm();
    } catch (err) {
      console.error("GALLERY SUBMIT ERROR:", err);

      alert(
        err.response?.data?.message ||
          "Something went wrong while saving the gallery item."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // EDIT
  // ==============================
  const handleEdit = (item) => {
    setEditingId(item._id);
    setTitle(item.title || "");
    setSelectedImage(null);

    // Existing backend image URL (will be processed correctly by getImageUrl)
    setImagePreview(item.image || "");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==============================
  // DELETE
  // ==============================
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this gallery item?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      await API.delete(`/gallery/${id}`);

      const updatedList = galleryList.filter(
        (item) => item._id !== id
      );

      setGalleryList(updatedList);

      // Recalculate pages
      const totalPagesAfterDelete =
        Math.ceil(updatedList.length / itemsPerPage) || 1;

      if (currentPage > totalPagesAfterDelete) {
        setCurrentPage(totalPagesAfterDelete);
      }

      alert("Gallery image deleted successfully.");
    } catch (err) {
      console.error("DELETE GALLERY ERROR:", err);

      alert(
        err.response?.data?.message ||
          "Failed to delete the gallery item."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // PAGINATION
  // ==============================
  const totalPages =
    Math.ceil(galleryList.length / itemsPerPage) || 1;

  const indexOfLastItem =
    currentPage * itemsPerPage;

  const indexOfFirstItem =
    indexOfLastItem - itemsPerPage;

  const currentItems = galleryList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber) => {
    if (
      pageNumber >= 1 &&
      pageNumber <= totalPages
    ) {
      setCurrentPage(pageNumber);
    }
  };

  // ==============================
  // JSX
  // ==============================
  return (
    <div className="gallery-management-container">

      {/* =====================================
          HEADER
      ===================================== */}
      <div className="gallery-header-section">
        <div className="gallery-header-icon-wrapper">
          <svg
            className="gallery-header-main-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="2"
              ry="2"
            />

            <circle
              cx="8.5"
              cy="8.5"
              r="1.5"
            />

            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>

        <div>
          <h1 className="gallery-main-title">
            Gallery
          </h1>

          <p className="gallery-sub-title">
            Add and manage school gallery images
          </p>
        </div>
      </div>

      {/* =====================================
          ERROR
      ===================================== */}
      {error && (
        <div className="gallery-error-banner">
          {error}
        </div>
      )}

      {/* =====================================
          ADD / EDIT FORM
      ===================================== */}
      <div className="gallery-card add-gallery-card">

        <div className="gallery-card-header">
          <svg
            className="gallery-card-title-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
            />

            <line
              x1="12"
              y1="8"
              x2="12"
              y2="16"
            />

            <line
              x1="8"
              y1="12"
              x2="16"
              y2="12"
            />
          </svg>

          <h2>
            {editingId
              ? "Edit Gallery Image"
              : "Add Gallery Image"}
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="gallery-form-grid"
        >

          {/* =====================================
              TITLE
          ===================================== */}
          <div className="gallery-form-group">

            <label className="gallery-input-label">
              Title *
            </label>

            <input
              type="text"
              className="gallery-text-input"
              placeholder="Enter image title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

          </div>

          {/* =====================================
              IMAGE UPLOAD
          ===================================== */}
          <div className="gallery-form-group">

            <label className="gallery-input-label">
              {editingId
                ? "Change Image"
                : "Upload Image *"}
            </label>

            <div
              className="gallery-upload-dropzone"
              onClick={() =>
                fileInputRef.current?.click()
              }
            >

              {imagePreview ? (

                <div className="gallery-preview-container">

                  <img
                    src={getImageUrl(imagePreview)}
                    alt="Preview"
                    className="gallery-uploaded-preview"
                  />

                  <span className="gallery-change-text">
                    Click to change image
                  </span>

                </div>

              ) : (

                <div className="gallery-upload-placeholder-content">

                  <svg
                    className="gallery-upload-cloud-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />

                    <polyline points="17 8 12 3 7 8" />

                    <line
                      x1="12"
                      y1="3"
                      x2="12"
                      y2="15"
                    />
                  </svg>

                  <p className="gallery-upload-main-text">
                    Click to upload or drag and drop
                  </p>

                  <p className="gallery-upload-sub-text">
                    Supports: JPG, PNG, JPEG (Max 5MB)
                  </p>

                </div>

              )}

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/png,image/jpeg,image/jpg"
                style={{ display: "none" }}
              />

            </div>

          </div>

          {/* =====================================
              ACTION BUTTONS
          ===================================== */}
          <div className="gallery-form-actions">

            <button
              type="submit"
              className="gallery-btn gallery-btn-primary"
              disabled={loading}
            >

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="18"
                height="18"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />

                <polyline points="17 21 17 13 7 13 7 21" />

                <polyline points="7 3 7 8 15 8" />
              </svg>

              {loading
                ? "Processing..."
                : editingId
                ? "Update Image"
                : "Save"}

            </button>

            {editingId && (
              <button
                type="button"
                className="gallery-btn gallery-btn-secondary"
                onClick={resetForm}
                disabled={loading}
              >
                Cancel
              </button>
            )}

          </div>

        </form>

      </div>

      {/* =====================================
          GALLERY LIST
      ===================================== */}
      <div className="gallery-card list-gallery-card">

        <div className="gallery-list-header-bar">

          <div className="gallery-card-header no-border">

            <svg
              className="gallery-card-title-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <rect
                x="3"
                y="3"
                width="7"
                height="7"
              />

              <rect
                x="14"
                y="3"
                width="7"
                height="7"
              />

              <rect
                x="14"
                y="14"
                width="7"
                height="7"
              />

              <rect
                x="3"
                y="14"
                width="7"
                height="7"
              />
            </svg>

            <h2>Gallery List</h2>

          </div>

          {/* =====================================
              SEARCH
          ===================================== */}
          <div className="gallery-search-wrapper">

            <svg
              className="gallery-search-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle
                cx="11"
                cy="11"
                r="8"
              />

              <line
                x1="21"
                y1="21"
                x2="16.65"
                y2="16.65"
              />
            </svg>

            <input
              type="text"
              className="gallery-search-input"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />

          </div>

        </div>

        {/* =====================================
            TABLE
        ===================================== */}
        <div className="gallery-table-responsive">

          <table className="gallery-table">

            <thead>
              <tr>

                <th className="col-num">
                  #
                </th>

                <th className="col-img">
                  Image
                </th>

                <th className="col-title">
                  Title
                </th>

                <th className="col-date">
                  Uploaded On
                </th>

                <th className="col-actions">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {loading && galleryList.length === 0 ? (

                <tr>
                  <td
                    colSpan="5"
                    className="gallery-no-results"
                  >
                    Loading galleries...
                  </td>
                </tr>

              ) : currentItems.length > 0 ? (

                currentItems.map((item, index) => (

                  <tr key={item._id}>

                    {/* NUMBER */}
                    <td className="col-num">
                      {indexOfFirstItem + index + 1}
                    </td>

                    {/* IMAGE */}
                    <td className="col-img">

                      <div
                        className="gallery-table-img-wrapper"
                        onClick={() =>
                          setViewModalData(item)
                        }
                      >

                        <img
                          src={getImageUrl(item.image)}
                          alt={item.title}
                          className="gallery-table-thumb"
                        />

                      </div>

                    </td>

                    {/* TITLE */}
                    <td className="col-title font-medium">
                      {item.title}
                    </td>

                    {/* DATE */}
                    <td className="col-date text-muted">
                      {item.uploadedOn || "-"}
                    </td>

                    {/* ACTIONS */}
                    <td className="col-actions">

                      <div className="gallery-action-buttons">

                        {/* VIEW */}
                        <button
                          type="button"
                          className="gallery-action-btn gallery-btn-view"
                          title="View Image"
                          onClick={() =>
                            setViewModalData(item)
                          }
                        >

                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            width="16"
                            height="16"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />

                            <circle
                              cx="12"
                              cy="12"
                              r="3"
                            />
                          </svg>

                        </button>

                        {/* EDIT */}
                        <button
                          type="button"
                          className="gallery-action-btn gallery-btn-edit"
                          title="Edit"
                          onClick={() =>
                            handleEdit(item)
                          }
                        >

                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            width="16"
                            height="16"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />

                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>

                        </button>

                        {/* DELETE */}
                        <button
                          type="button"
                          className="gallery-action-btn gallery-btn-delete"
                          title="Delete"
                          onClick={() =>
                            handleDelete(item._id)
                          }
                        >

                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            width="16"
                            height="16"
                          >
                            <polyline points="3 6 5 6 21 6" />

                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />

                            <line
                              x1="10"
                              y1="11"
                              x2="10"
                              y2="17"
                            />

                            <line
                              x1="14"
                              y1="11"
                              x2="14"
                              y2="17"
                            />
                          </svg>

                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="5"
                    className="gallery-no-results"
                  >
                    {searchQuery
                      ? "No gallery images found for your search."
                      : "No gallery images found."}
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* =====================================
            PAGINATION
        ===================================== */}
        <div className="gallery-pagination-bar">

          <span className="gallery-pagination-info">

            Showing{" "}

            {galleryList.length > 0
              ? indexOfFirstItem + 1
              : 0}

            {" "}to{" "}

            {Math.min(
              indexOfLastItem,
              galleryList.length
            )}

            {" "}of{" "}

            {galleryList.length} entries

          </span>

          <div className="gallery-pagination-controls">

            {/* PREVIOUS */}
            <button
              type="button"
              className="gallery-page-btn"
              onClick={() =>
                handlePageChange(
                  currentPage - 1
                )
              }
              disabled={currentPage === 1}
            >
              &lt;
            </button>

            {/* PAGE NUMBERS */}
            {[...Array(totalPages)].map(
              (_, i) => (

                <button
                  type="button"
                  key={i + 1}
                  className={`gallery-page-btn ${
                    currentPage === i + 1
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handlePageChange(i + 1)
                  }
                >
                  {i + 1}
                </button>

              )
            )}

            {/* NEXT */}
            <button
              type="button"
              className="gallery-page-btn"
              onClick={() =>
                handlePageChange(
                  currentPage + 1
                )
              }
              disabled={
                currentPage === totalPages
              }
            >
              &gt;
            </button>

          </div>

        </div>

      </div>

      {/* =====================================
          IMAGE VIEW MODAL
      ===================================== */}
      {viewModalData && (

        <div
          className="gallery-modal-overlay"
          onClick={() =>
            setViewModalData(null)
          }
        >

          <div
            className="gallery-modal-content"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}
            <div className="gallery-modal-header">

              <h3>
                {viewModalData.title}
              </h3>

              <button
                type="button"
                className="gallery-modal-close"
                onClick={() =>
                  setViewModalData(null)
                }
              >
                &times;
              </button>

            </div>

            {/* MODAL BODY */}
            <div className="gallery-modal-body">

              <img
                src={getImageUrl(
                  viewModalData.image
                )}
                alt={viewModalData.title}
                className="gallery-modal-img"
              />

              <p className="gallery-modal-date">
                Uploaded on:{" "}
                {viewModalData.uploadedOn ||
                  "-"}
              </p>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default GalleryManagement;