import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Image as ImageIcon,
  CloudUpload,
  Search,
  Pencil,
  Trash2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";
import API from "../../api/axios";
import "./Activites.css";

const MAX_IMAGES = 10;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ITEMS_PER_PAGE = 7;

const getServerOrigin = () => {
  const baseURL =
    API.defaults?.baseURL ||
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000";

  return baseURL
    .replace(/\/api\/?$/i, "")
    .replace(/\/+$/, "");
};

const imageUrl = (imagePath) => {
  if (!imagePath) return "";

  if (/^https?:\/\//i.test(imagePath)) return imagePath;

  const normalizedPath = String(imagePath).replace(/\\/g, "/");
  const path = normalizedPath.startsWith("/")
    ? normalizedPath
    : `/${normalizedPath}`;

  return `${getServerOrigin()}${path}`;
};

const getErrorMessage = (error) =>
  error.response?.data?.message ||
  error.response?.data?.error ||
  error.message ||
  "Something went wrong. Please try again.";

const categoryClass = (category = "") => {
  const value = category.toLowerCase();

  if (value.includes("event") || value.includes("celebrat"))
    return "activites-category-events";

  if (value.includes("outdoor") || value.includes("adventure"))
    return "activites-category-outdoor";

  if (value.includes("sport") || value.includes("fitness"))
    return "activites-category-sports";

  if (value.includes("creative") || value.includes("art"))
    return "activites-category-creative";

  if (value.includes("perform") || value.includes("music"))
    return "activites-category-performing";

  if (value.includes("learn") || value.includes("science"))
    return "activites-category-learning";

  return "activites-category-default";
};

const createImageItem = (path, activityId, index) => ({
  id: `saved-${activityId}-${index}-${path}`,
  path,
  url: imageUrl(path),
  name: `Activity image ${index + 1}`,
  isLocal: false,
});

const Activites = () => {
  const [activities, setActivities] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);

  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    category: "",
    status: "Active",
    images: [],
  });

  const fileInputRef = useRef(null);
  const titleInputRef = useRef(null);

  const fetchActivities = useCallback(async () => {
    setLoading(true);
    setFormError("");

    try {
      const response = await API.get("/activities");

      const records = Array.isArray(response.data)
        ? response.data
        : response.data?.data;

      if (!Array.isArray(records)) {
        throw new Error(
          "The server returned an invalid activities response. Expected an array in response.data.data."
        );
      }

      setActivities(records);
    } catch (error) {
      console.error("Fetch activities error:", error);
      setFormError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  // Filter table records by title, category, or status
  const filteredActivities = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return activities;

    return activities.filter((activity) =>
      [
        activity.title,
        activity.category,
        activity.status,
      ].some((value) =>
        String(value || "").toLowerCase().includes(query)
      )
    );
  }, [activities, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredActivities.length / ITEMS_PER_PAGE)
  );

  const safePage = Math.min(currentPage, totalPages);

  const pageActivities = filteredActivities.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  const updateForm = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFormError("");
    setNotice("");
  };

  const handleImageFiles = (event) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (!selectedFiles.length) return;

    const validFiles = selectedFiles.filter(
      (file) =>
        file.type.startsWith("image/") &&
        file.size <= MAX_IMAGE_SIZE
    );

    setForm((previous) => {
      const available = MAX_IMAGES - previous.images.length;
      const acceptedFiles = validFiles.slice(
        0,
        Math.max(0, available)
      );

      const newImages = acceptedFiles.map((file) => ({
        id: `${file.name}-${file.lastModified}-${Math.random()
          .toString(36)
          .slice(2)}`,
        name: file.name,
        url: URL.createObjectURL(file),
        file,
        isLocal: true,
      }));

      if (validFiles.length !== selectedFiles.length) {
        setFormError(
          "Only image files up to 5 MB each are accepted."
        );
      } else if (acceptedFiles.length < validFiles.length) {
        setFormError(
          `You can upload a maximum of ${MAX_IMAGES} images.`
        );
      } else {
        setFormError("");
      }

      return {
        ...previous,
        images: [...previous.images, ...newImages],
      };
    });

    event.target.value = "";
  };

  const handleDropImages = (event) => {
    event.preventDefault();

    const droppedFiles = Array.from(
      event.dataTransfer.files || []
    );

    if (!droppedFiles.length) return;

    handleImageFiles({
      target: {
        files: droppedFiles,
        value: "",
      },
    });
  };

  const removeImage = (imageId) => {
    setForm((previous) => {
      const image = previous.images.find(
        (item) => item.id === imageId
      );

      if (image?.isLocal && image.url.startsWith("blob:")) {
        URL.revokeObjectURL(image.url);
      }

      return {
        ...previous,
        images: previous.images.filter(
          (item) => item.id !== imageId
        ),
      };
    });

    setFormError("");
  };

  const resetForm = () => {
    form.images.forEach((image) => {
      if (image.isLocal && image.url.startsWith("blob:")) {
        URL.revokeObjectURL(image.url);
      }
    });

    setForm({
      title: "",
      category: "",
      status: "Active",
      images: [],
    });

    setEditingId(null);
    setFormError("");
    setNotice("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    setNotice("");

    // None of the fields are mandatory; only validate max image limit
    if (form.images.length > MAX_IMAGES) {
      setFormError(`You can upload a maximum of ${MAX_IMAGES} images.`);
      return;
    }

    const formData = new FormData();

    formData.append("title", form.title.trim());
    formData.append("category", form.category.trim());
    formData.append("status", form.status);

    const existingImages = form.images
      .filter((image) => !image.isLocal && image.path)
      .map((image) => image.path);

    formData.append(
      "existingImages",
      JSON.stringify(existingImages)
    );

    form.images.forEach((image) => {
      if (image.isLocal && image.file) {
        formData.append("images", image.file);
      }
    });

    setSaving(true);

    try {
      if (editingId) {
        await API.put(`/activities/${editingId}`, formData);
        setNotice("Activity updated successfully.");
      } else {
        await API.post("/activities", formData);
        setNotice("Activity added successfully.");
      }

      resetForm();
      setSearch("");
      setCurrentPage(1);

      await fetchActivities();
      setNotice(
        editingId
          ? "Activity updated successfully."
          : "Activity added successfully."
      );
    } catch (error) {
      console.error("Save activity error:", error);
      setFormError(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (activity) => {
    setEditingId(activity._id);

    setForm({
      title: activity.title || "",
      category: activity.category || "",
      status: activity.status || "Active",
      images: (activity.images || []).map((path, index) =>
        createImageItem(path, activity._id, index)
      ),
    });

    setFormError("");
    setNotice("");

    titleInputRef.current?.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (activity) => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${activity.title || "this activity"}"?`
      )
    ) {
      return;
    }

    setDeletingId(activity._id);
    setFormError("");
    setNotice("");

    try {
      await API.delete(`/activities/${activity._id}`);

      if (editingId === activity._id) {
        resetForm();
      }

      setNotice("Activity deleted successfully.");
      await fetchActivities();
    } catch (error) {
      console.error("Delete activity error:", error);
      setFormError(getErrorMessage(error));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="activites-page">
      <div className="activites-workspace">
        {/* ACTIVITY FORM */}
        <section className="activites-form-panel">
          <div className="activites-form-heading">
            <span className="activites-panel-icon">
              <ImageIcon size={23} />
            </span>

            <div>
              <h1>
                {editingId ? "Edit Activity" : "Add New Activity"}
              </h1>
              <p>
                Add activity details and upload images
              </p>
            </div>
          </div>

          <form className="activites-form" onSubmit={handleSubmit}>
            {/* TITLE */}
            <div className="activites-field">
              <label htmlFor="activites-title">
                Activity Title
              </label>

              <input
                ref={titleInputRef}
                id="activites-title"
                name="title"
                value={form.title}
                onChange={updateForm}
                placeholder="Enter activity title"
                maxLength={100}
              />
            </div>

            {/* CATEGORY */}
            <div className="activites-field activites-category-field">
              <label htmlFor="activites-category">
                Category
              </label>

              <input
                id="activites-category"
                name="category"
                value={form.category}
                onChange={updateForm}
                placeholder="Enter activity category"
                maxLength={50}
              />
            </div>

            {/* IMAGE UPLOAD */}
            <div className="activites-field">
              <div className="activites-upload-label">
                <label htmlFor="activites-images">
                  Images
                </label>
                <small>
                  {form.images.length}/{MAX_IMAGES} selected
                </small>
              </div>

              <input
                ref={fileInputRef}
                id="activites-images"
                className="activites-file-input"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                multiple
                onChange={handleImageFiles}
              />

              <button
                type="button"
                className="activites-upload-zone"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(event) => event.preventDefault()}
                onDrop={handleDropImages}
              >
                <CloudUpload size={35} />
                <strong>Click to upload images</strong>
                <span>or drag and drop</span>
                <small>
                  JPG, PNG, WebP · Up to 10 images · 5 MB each
                </small>
              </button>

              {form.images.length > 0 && (
                <div className="activites-image-previews">
                  {form.images.map((image) => (
                    <div
                      className="activites-preview-item"
                      key={image.id}
                    >
                      <img
                        src={image.url}
                        alt={image.name}
                        onError={(event) => {
                          event.currentTarget.style.opacity = "0.35";
                        }}
                      />

                      <button
                        type="button"
                        className="activites-preview-remove"
                        onClick={() => removeImage(image.id)}
                        aria-label={`Remove ${image.name}`}
                      >
                        <X size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* STATUS */}
            <div className="activites-field activites-status-field">
              <label htmlFor="activites-status">
                Status
              </label>

              <select
                id="activites-status"
                name="status"
                value={form.status}
                onChange={updateForm}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {formError && (
              <p className="activites-form-error" role="alert">
                {formError}
              </p>
            )}

            {notice && (
              <p className="activites-success-message" role="status">
                {notice}
              </p>
            )}

            <div className="activites-form-actions">
              <button
                type="button"
                className="activites-reset-button"
                onClick={resetForm}
                disabled={saving}
              >
                <RefreshCw size={17} />
                Reset
              </button>

              <button
                type="submit"
                className="activites-save-button"
                disabled={saving}
              >
                {saving ? (
                  <LoaderCircle className="activites-spinner" size={18} />
                ) : (
                  <CheckCircle2 size={18} />
                )}

                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Activity"
                    : "Save Activity"}
              </button>
            </div>
          </form>
        </section>

        {/* ACTIVITIES TABLE */}
        <section className="activites-table-panel">
          <div className="activites-table-heading">
            <div className="activites-panel-heading">
              <span className="activites-panel-icon">
                <ImageIcon size={23} />
              </span>

              <div>
                <h2>All Activities</h2>
                <p>Manage, edit or delete activities</p>
              </div>
            </div>

            <label className="activites-table-search">
              <Search size={18} />
              <input
                type="search"
                placeholder="Search activities..."
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Search activities"
              />
            </label>
          </div>

          <div className="activites-table-scroll">
            <table className="activites-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Images</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="activites-empty-state">
                      <LoaderCircle className="activites-spinner" size={24} />
                      <span>Loading activities...</span>
                    </td>
                  </tr>
                ) : (
                  <>
                    {pageActivities.map((activity, index) => (
                      <tr key={activity._id}>
                        <td className="activites-row-number">
                          {(safePage - 1) * ITEMS_PER_PAGE + index + 1}
                        </td>

                        <td>
                          <div className="activites-table-thumbnail">
                            {activity.images?.[0] ? (
                              <img
                                src={imageUrl(activity.images[0])}
                                alt={activity.title || "Activity"}
                                loading="lazy"
                                onError={(event) => {
                                  event.currentTarget.style.display = "none";
                                }}
                              />
                            ) : (
                              <ImageIcon size={22} />
                            )}
                          </div>
                        </td>

                        <td className="activites-table-title">
                          {activity.title || "—"}
                        </td>

                        <td>
                          {activity.category ? (
                            <span
                              className={`activites-category-badge ${categoryClass(
                                activity.category
                              )}`}
                            >
                              {activity.category}
                            </span>
                          ) : (
                            <span className="activites-muted-dash">—</span>
                          )}
                        </td>

                        <td>
                          <span className="activites-image-count-badge">
                            <ImageIcon size={16} />
                            {activity.images?.length || 0}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`activites-status-badge ${
                              activity.status === "Active"
                                ? "activites-status-active"
                                : "activites-status-inactive"
                            }`}
                          >
                            {activity.status || "Inactive"}
                          </span>
                        </td>

                        <td>
                          <div className="activites-row-actions">
                            <button
                              type="button"
                              className="activites-edit-button"
                              onClick={() => handleEdit(activity)}
                              title="Edit activity"
                              aria-label={`Edit ${activity.title || "activity"}`}
                            >
                              <Pencil size={16} />
                            </button>

                            <button
                              type="button"
                              className="activites-delete-button"
                              onClick={() => handleDelete(activity)}
                              title="Delete activity"
                              aria-label={`Delete ${activity.title || "activity"}`}
                              disabled={deletingId === activity._id}
                            >
                              {deletingId === activity._id ? (
                                <LoaderCircle
                                  className="activites-spinner"
                                  size={16}
                                />
                              ) : (
                                <Trash2 size={16} />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {pageActivities.length === 0 && (
                      <tr>
                        <td colSpan={7} className="activites-empty-state">
                          <Search size={26} />
                          <strong>No activities found</strong>
                          <span>
                            {search
                              ? "Try another search keyword."
                              : "Add your first activity using the form."}
                          </span>
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>

          <div className="activites-table-footer">
            <p>
              Showing{" "}
              <strong>
                {filteredActivities.length
                  ? (safePage - 1) * ITEMS_PER_PAGE + 1
                  : 0}
              </strong>{" "}
              to{" "}
              <strong>
                {Math.min(
                  safePage * ITEMS_PER_PAGE,
                  filteredActivities.length
                )}
              </strong>{" "}
              of <strong>{filteredActivities.length}</strong> activities
            </p>

            <div className="activites-pagination">
              <button
                type="button"
                className="activites-page-arrow"
                disabled={safePage === 1}
                onClick={() =>
                  setCurrentPage((page) => Math.max(1, page - 1))
                }
                aria-label="Previous page"
              >
                <ChevronLeft size={18} />
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  type="button"
                  key={page}
                  className={`activites-page-number ${
                    safePage === page
                      ? "activites-page-number-active"
                      : ""
                  }`}
                  onClick={() => setCurrentPage(page)}
                  aria-current={safePage === page ? "page" : undefined}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                className="activites-page-arrow"
                disabled={safePage === totalPages}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(totalPages, page + 1)
                  )
                }
                aria-label="Next page"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Activites;