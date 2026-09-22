import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Plus,
  Search,
  Save,
  X,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  UploadCloud,
  Star,
  Image as ImageIcon,
  RefreshCw,
  Loader2,
  AlertCircle,
} from "lucide-react";

import "./ShopImg.css";

import API, {
  IMG_URL,
} from "../../api/axios";

// =====================================================
// CONFIGURATION
// =====================================================

const ITEMS_PER_PAGE = 3;

// =====================================================
// IMAGE URL HELPER
// =====================================================

const getImageUrl = (image) => {
  if (!image) {
    return "";
  }

  // Already full URL
  if (
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }

  // IMG_URL may already contain /uploads
  return `${IMG_URL}${image.startsWith("/") ? "" : "/"}${image}`;
};

// =====================================================
// SHOP IMAGE COMPONENT
// =====================================================

const ShopImg = () => {
  // ===================================================
  // DATA STATES
  // ===================================================

  const [items, setItems] = useState([]);

  // ===================================================
  // FORM STATES
  // ===================================================

  const [title, setTitle] = useState("");

  const [price, setPrice] = useState("");

  const [discountPrice, setDiscountPrice] =
    useState("");

  const [rating, setRating] =
    useState(4);

  const [imageFile, setImageFile] =
    useState(null);

  const [imagePreview, setImagePreview] =
    useState("");

  // ===================================================
  // UI STATES
  // ===================================================

  const [searchTerm, setSearchTerm] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState(null);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // ===================================================
  // FETCH ALL SHOP IMAGES
  // ===================================================

  const fetchShopImages = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await API.get(
          "/shop-images"
        );

      if (
        response.data &&
        response.data.success
      ) {
        setItems(
          Array.isArray(
            response.data.data
          )
            ? response.data.data
            : []
        );
      } else {
        setItems([]);
      }
    } catch (err) {
      console.error(
        "FETCH SHOP IMAGES ERROR:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to load shop images."
      );
    } finally {
      setLoading(false);
    }
  };

  // ===================================================
  // INITIAL LOAD
  // ===================================================

  useEffect(() => {
    fetchShopImages();
  }, []);

  // ===================================================
  // AUTO CLEAR SUCCESS MESSAGE
  // ===================================================

  useEffect(() => {
    if (!success) {
      return;
    }

    const timer =
      setTimeout(() => {
        setSuccess("");
      }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [success]);

  // ===================================================
  // IMAGE SELECTION
  // ===================================================

  const handleImageChange = (e) => {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    // -------------------------------------------------
    // File type validation
    // -------------------------------------------------

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      setError(
        "Please select a valid image file."
      );

      e.target.value = "";

      return;
    }

    // -------------------------------------------------
    // 10MB frontend validation
    // Backend also validates this.
    // -------------------------------------------------

    if (
      file.size >
      10 * 1024 * 1024
    ) {
      setError(
        "Image size cannot exceed 10 MB."
      );

      e.target.value = "";

      return;
    }

    // -------------------------------------------------
    // Revoke old preview
    // -------------------------------------------------

    if (
      imagePreview &&
      imagePreview.startsWith(
        "blob:"
      )
    ) {
      URL.revokeObjectURL(
        imagePreview
      );
    }

    // -------------------------------------------------
    // Set file
    // -------------------------------------------------

    setImageFile(file);

    setImagePreview(
      URL.createObjectURL(file)
    );

    setError("");
  };

  // ===================================================
  // CLEAR FORM
  // ===================================================

  const handleClear = () => {
    setTitle("");

    setPrice("");

    setDiscountPrice("");

    setRating(4);

    setImageFile(null);

    if (
      imagePreview &&
      imagePreview.startsWith(
        "blob:"
      )
    ) {
      URL.revokeObjectURL(
        imagePreview
      );
    }

    setImagePreview("");

    setEditingId(null);

    setError("");

    const fileInput =
      document.getElementById(
        "ShopImg-imageInput"
      );

    if (fileInput) {
      fileInput.value = "";
    }
  };

  // ===================================================
  // SAVE / UPDATE
  // ===================================================

  const handleSave = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // -------------------------------------------------
    // VALIDATION
    // -------------------------------------------------

    if (!title.trim()) {
      setError(
        "Title is required."
      );

      return;
    }

    if (
      price === "" ||
      price === null
    ) {
      setError(
        "Price is required."
      );

      return;
    }

    if (
      Number(price) < 0
    ) {
      setError(
        "Price cannot be negative."
      );

      return;
    }

    if (
      discountPrice !== "" &&
      Number(discountPrice) < 0
    ) {
      setError(
        "Discount price cannot be negative."
      );

      return;
    }

    if (
      Number(rating) < 1 ||
      Number(rating) > 5
    ) {
      setError(
        "Rating must be between 1 and 5."
      );

      return;
    }

    // -------------------------------------------------
    // CREATE REQUIRES IMAGE
    // -------------------------------------------------

    if (
      editingId === null &&
      !imageFile
    ) {
      setError(
        "Please select an image."
      );

      return;
    }

    try {
      setSaving(true);

      // ------------------------------------------------
      // FORM DATA
      // ------------------------------------------------

      const formData =
        new FormData();

      formData.append(
        "title",
        title.trim()
      );

      formData.append(
        "price",
        price
      );

      formData.append(
        "discountPrice",
        discountPrice
      );

      formData.append(
        "rating",
        rating
      );

      // ------------------------------------------------
      // Image only if selected
      // ------------------------------------------------

      if (imageFile) {
        formData.append(
          "image",
          imageFile
        );
      }

      // =================================================
      // UPDATE
      // =================================================

      if (editingId !== null) {
        const response =
          await API.put(
            `/shop-images/${editingId}`,
            formData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        if (
          response.data?.success
        ) {
          setSuccess(
            "Shop item updated successfully."
          );

          handleClear();

          await fetchShopImages();

          setCurrentPage(1);
        }
      }

      // =================================================
      // CREATE
      // =================================================

      else {
        const response =
          await API.post(
            "/shop-images",
            formData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        if (
          response.data?.success
        ) {
          setSuccess(
            "Shop item created successfully."
          );

          handleClear();

          await fetchShopImages();

          setCurrentPage(1);
        }
      }
    } catch (err) {
      console.error(
        "SAVE SHOP IMAGE ERROR:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to save shop item."
      );
    } finally {
      setSaving(false);
    }
  };

  // ===================================================
  // EDIT
  // ===================================================

  const handleEdit = (item) => {
    setTitle(
      item.title || ""
    );

    setPrice(
      item.price ?? ""
    );

    setDiscountPrice(
      item.discountPrice ?? ""
    );

    setRating(
      Number(item.rating) || 4
    );

    setImageFile(null);

    setImagePreview(
      getImageUrl(item.image)
    );

    setEditingId(
      item._id
    );

    setError("");

    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ===================================================
  // DELETE
  // ===================================================

  const handleDelete = async (
    id
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this shop image?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      setError("");

      const response =
        await API.delete(
          `/shop-images/${id}`
        );

      if (
        response.data?.success
      ) {
        setSuccess(
          "Shop item deleted successfully."
        );

        if (
          editingId === id
        ) {
          handleClear();
        }

        await fetchShopImages();

        // ------------------------------------------------
        // Keep pagination safe
        // ------------------------------------------------

        setCurrentPage(
          (page) =>
            Math.max(page, 1)
        );
      }
    } catch (err) {
      console.error(
        "DELETE SHOP IMAGE ERROR:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to delete shop item."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ===================================================
  // SEARCH
  // ===================================================

  const filteredItems =
    useMemo(() => {
      const search =
        searchTerm
          .toLowerCase()
          .trim();

      if (!search) {
        return items;
      }

      return items.filter(
        (item) =>
          item.title
            ?.toLowerCase()
            .includes(search)
      );
    }, [
      items,
      searchTerm,
    ]);

  // ===================================================
  // PAGINATION
  // ===================================================

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredItems.length /
          ITEMS_PER_PAGE
      )
    );

  const safeCurrentPage =
    Math.min(
      currentPage,
      totalPages
    );

  const paginatedItems =
    filteredItems.slice(
      (safeCurrentPage - 1) *
        ITEMS_PER_PAGE,
      safeCurrentPage *
        ITEMS_PER_PAGE
    );

  // ===================================================
  // RATING STARS
  // ===================================================

  const renderStars = (
    value,
    size = 18,
    clickable = false
  ) => {
    return [1, 2, 3, 4, 5].map(
      (star) => (
        <Star
          key={star}
          size={size}
          className={`ShopImg-star ${
            star <=
            Math.round(value)
              ? "filled"
              : ""
          }`}
          onClick={
            clickable
              ? () =>
                  setRating(star)
              : undefined
          }
          style={{
            cursor: clickable
              ? "pointer"
              : "default",
          }}
        />
      )
    );
  };

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <div className="ShopImg-wrapper">

      {/* =================================================
          GLOBAL ERROR
      ================================================= */}

      {error && (
        <div className="ShopImg-alert ShopImg-alertError">
          <AlertCircle size={17} />

          <span>
            {error}
          </span>

          <button
            type="button"
            onClick={() =>
              setError("")
            }
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* =================================================
          GLOBAL SUCCESS
      ================================================= */}

      {success && (
        <div className="ShopImg-alert ShopImg-alertSuccess">
          <span>
            {success}
          </span>

          <button
            type="button"
            onClick={() =>
              setSuccess("")
            }
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* =================================================
          ADD / EDIT CARD
      ================================================= */}

      <div className="ShopImg-card">

        <div className="ShopImg-cardHeader">

          <div className="ShopImg-cardTitleGroup">

            <div className="ShopImg-actionIconBox">
              {editingId !== null ? (
                <Edit2 size={18} />
              ) : (
                <Plus size={18} />
              )}
            </div>

            <div>
              <h2>
                {editingId !== null
                  ? "Edit Item"
                  : "Add New Item"}
              </h2>

              <p>
                Upload an image and add
                details for the shop item.
              </p>
            </div>

          </div>

          <span
            className={`ShopImg-newTag ${
              editingId !== null
                ? "editing"
                : ""
            }`}
          >
            {editingId !== null
              ? "Editing"
              : "New"}
          </span>

        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <form
          onSubmit={handleSave}
          className="ShopImg-form"
        >

          <div className="ShopImg-formGrid">

            {/* TITLE */}

            <div className="ShopImg-inputGroup">

              <label className="ShopImg-label">
                Title{" "}
                <span className="ShopImg-required">
                  *
                </span>
              </label>

              <input
                type="text"
                className="ShopImg-input"
                placeholder="e.g. Creative Arts"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                required
              />

            </div>

            {/* PRICE */}

            <div className="ShopImg-inputGroup">

              <label className="ShopImg-label">
                Price (₹){" "}
                <span className="ShopImg-required">
                  *
                </span>
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                className="ShopImg-input"
                placeholder="Enter price"
                value={price}
                onChange={(e) =>
                  setPrice(
                    e.target.value
                  )
                }
                required
              />

            </div>

            {/* DISCOUNT */}

            <div className="ShopImg-inputGroup">

              <label className="ShopImg-label">
                Discount Price (₹)
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                className="ShopImg-input"
                placeholder="Enter discount price"
                value={discountPrice}
                onChange={(e) =>
                  setDiscountPrice(
                    e.target.value
                  )
                }
              />

            </div>

            {/* RATING */}

            <div className="ShopImg-inputGroup">

              <label className="ShopImg-label">
                Rating
              </label>

              <div className="ShopImg-ratingWrapper">

                <div className="ShopImg-stars">
                  {renderStars(
                    rating,
                    18,
                    true
                  )}
                </div>

                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  className="ShopImg-ratingInput"
                  value={rating}
                  onChange={(e) =>
                    setRating(
                      Number(
                        e.target.value
                      )
                    )
                  }
                />

              </div>

            </div>

          </div>

          {/* =================================================
              IMAGE UPLOAD
          ================================================= */}

          <div className="ShopImg-inputGroup ShopImg-fullWidth">

            <label className="ShopImg-label">
              Image{" "}
              {editingId === null && (
                <span className="ShopImg-required">
                  *
                </span>
              )}
            </label>

            <div className="ShopImg-dropzone">

              <input
                id="ShopImg-imageInput"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,image/avif"
                className="ShopImg-fileInput"
                onChange={
                  handleImageChange
                }
              />

              {imagePreview ? (

                <div className="ShopImg-previewContainer">

                  <img
                    src={imagePreview}
                    alt="Shop Preview"
                    className="ShopImg-previewImage"
                    onError={(e) => {
                      e.currentTarget.style.display =
                        "none";
                    }}
                  />

                  <span className="ShopImg-previewText">
                    {imageFile
                      ? "New image selected — click to replace"
                      : "Existing image — click to replace"}
                  </span>

                </div>

              ) : (

                <div className="ShopImg-dropzoneContent">

                  <UploadCloud
                    size={28}
                    className="ShopImg-uploadIcon"
                  />

                  <span className="ShopImg-dropText">
                    <strong>
                      Click to upload
                    </strong>{" "}
                    or drag and drop
                  </span>

                  <span className="ShopImg-dropHint">
                    JPG, JPEG, PNG, WEBP,
                    GIF or AVIF · Max 10MB
                  </span>

                </div>

              )}

            </div>

          </div>

          {/* =================================================
              ACTIONS
          ================================================= */}

          <div className="ShopImg-formActions">

            <button
              type="button"
              className="ShopImg-btnClear"
              onClick={
                handleClear
              }
              disabled={saving}
            >
              <X size={15} />

              Clear
            </button>

            <button
              type="submit"
              className="ShopImg-btnSave"
              disabled={saving}
            >

              {saving ? (
                <>
                  <Loader2
                    size={15}
                    className="ShopImg-spin"
                  />

                  {editingId !== null
                    ? "Updating..."
                    : "Saving..."}
                </>
              ) : (
                <>
                  <Save size={15} />

                  {editingId !== null
                    ? "Update Item"
                    : "Save Item"}
                </>
              )}

            </button>

          </div>

        </form>

      </div>

      {/* =================================================
          ITEMS LIST
      ================================================= */}

      <div className="ShopImg-card">

        <div className="ShopImg-tableHeaderBar">

          <div className="ShopImg-cardTitleGroup">

            <div className="ShopImg-listIconBox">
              <ImageIcon size={18} />
            </div>

            <div>
              <h2>
                Items List
              </h2>

              <p>
                View and manage all shop
                images.
              </p>
            </div>

          </div>

          <div className="ShopImg-toolsGroup">

            <div className="ShopImg-searchBox">

              <Search
                size={15}
                className="ShopImg-searchIcon"
              />

              <input
                type="text"
                className="ShopImg-searchInput"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(
                    e.target.value
                  );

                  setCurrentPage(1);
                }}
              />

            </div>

            <button
              type="button"
              className="ShopImg-refreshBtn"
              onClick={() => {
                setSearchTerm("");
                setCurrentPage(1);
                fetchShopImages();
              }}
              title="Refresh"
              disabled={loading}
            >

              {loading ? (
                <Loader2
                  size={15}
                  className="ShopImg-spin"
                />
              ) : (
                <RefreshCw
                  size={15}
                />
              )}

            </button>

          </div>

        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div className="ShopImg-tableResponsive">

          <table className="ShopImg-table">

            <thead>

              <tr>

                <th className="col-num">
                  #
                </th>

                <th className="col-image">
                  IMAGE
                </th>

                <th className="col-title">
                  TITLE
                </th>

                <th className="col-price">
                  PRICE
                </th>

                <th className="col-discount">
                  DISCOUNT PRICE
                </th>

                <th className="col-rating">
                  RATING
                </th>

                <th className="col-actions">
                  ACTIONS
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
                    colSpan="7"
                    className="ShopImg-empty"
                  >

                    <Loader2
                      size={25}
                      className="ShopImg-spin"
                    />

                    <span>
                      Loading shop images...
                    </span>

                  </td>

                </tr>

              ) : paginatedItems.length >
                0 ? (

                paginatedItems.map(
                  (item, index) => {

                    const serialNum =
                      (safeCurrentPage -
                        1) *
                        ITEMS_PER_PAGE +
                      index +
                      1;

                    return (

                      <tr
                        key={
                          item._id
                        }
                      >

                        <td className="col-num">
                          {String(
                            serialNum
                          ).padStart(
                            2,
                            "0"
                          )}
                        </td>

                        <td className="col-image">

                          <img
                            src={getImageUrl(
                              item.image
                            )}
                            alt={
                              item.title
                            }
                            className="ShopImg-tableThumb"
                            onError={(
                              e
                            ) => {
                              e.currentTarget.src =
                                "https://via.placeholder.com/100x80?text=Image";
                            }}
                          />

                        </td>

                        <td className="col-title">

                          <span className="ShopImg-itemTitle">
                            {item.title}
                          </span>

                        </td>

                        <td className="col-price">
                          ₹
                          {Number(
                            item.price
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </td>

                        <td className="col-discount">

                          {item.discountPrice !==
                            null &&
                          item.discountPrice !==
                            undefined &&
                          item.discountPrice !==
                            "" ? (
                            <>
                              ₹
                              {Number(
                                item.discountPrice
                              ).toLocaleString(
                                "en-IN"
                              )}
                            </>
                          ) : (
                            "-"
                          )}

                        </td>

                        <td className="col-rating">

                          <div className="ShopImg-tableRating">

                            <div className="ShopImg-starRow">
                              {renderStars(
                                Number(
                                  item.rating
                                ) || 0,
                                13
                              )}
                            </div>

                            <span className="ShopImg-ratingNum">
                              {Number(
                                item.rating ||
                                  0
                              ).toFixed(
                                1
                              )}
                            </span>

                          </div>

                        </td>

                        <td className="col-actions">

                          <div className="ShopImg-actionButtons">

                            <button
                              type="button"
                              className="ShopImg-btnEdit"
                              onClick={() =>
                                handleEdit(
                                  item
                                )
                              }
                              title="Edit"
                              disabled={
                                deletingId ===
                                item._id
                              }
                            >
                              <Edit2
                                size={13}
                              />

                              Edit
                            </button>

                            <button
                              type="button"
                              className="ShopImg-btnDelete"
                              onClick={() =>
                                handleDelete(
                                  item._id
                                )
                              }
                              title="Delete"
                              disabled={
                                deletingId ===
                                item._id
                              }
                            >

                              {deletingId ===
                              item._id ? (
                                <Loader2
                                  size={13}
                                  className="ShopImg-spin"
                                />
                              ) : (
                                <Trash2
                                  size={13}
                                />
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
                    colSpan="7"
                    className="ShopImg-empty"
                  >

                    <ImageIcon
                      size={30}
                    />

                    <span>
                      {searchTerm
                        ? "No items found matching your search."
                        : "No shop images available yet."}
                    </span>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="ShopImg-tableFooter">

          <span className="ShopImg-footerInfo">

            Showing{" "}

            {filteredItems.length >
            0
              ? (safeCurrentPage -
                  1) *
                  ITEMS_PER_PAGE +
                1
              : 0}

            –

            {Math.min(
              safeCurrentPage *
                ITEMS_PER_PAGE,
              filteredItems.length
            )}

            {" "}of{" "}

            {filteredItems.length}

            {" "}items

          </span>

          {/* =================================================
              PAGINATION
          ================================================= */}

          <div className="ShopImg-pagination">

            <button
              type="button"
              className="ShopImg-pageBtn"
              disabled={
                safeCurrentPage ===
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
                size={15}
              />
            </button>

            {Array.from(
              {
                length:
                  totalPages,
              },
              (_, i) => i + 1
            ).map((num) => (

              <button
                key={num}
                type="button"
                className={`ShopImg-pageBtn ${
                  safeCurrentPage ===
                  num
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setCurrentPage(
                    num
                  )
                }
              >
                {num}
              </button>

            ))}

            <button
              type="button"
              className="ShopImg-pageBtn"
              disabled={
                safeCurrentPage ===
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
                size={15}
              />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ShopImg;