import React, { useEffect, useState } from "react";
import "./Order.css";

import {
  FaEye,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSearch,
  FaCheck,
} from "react-icons/fa";

import API from "../../api/axios";

const Order = () => {
  // =========================================================
  // STATE
  // =========================================================

  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [viewingOrder, setViewingOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");

  // =========================================================
  // FETCH ORDERS
  // =========================================================

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/orders");

      setOrders(response.data.orders || []);
    } catch (error) {
      console.error("Fetch orders error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load orders. Please check your backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // SEARCH / FILTER
  // =========================================================

  const filteredOrders = orders.filter((item) => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) {
      return true;
    }

    return (
      item.studentName?.toLowerCase().includes(query) ||
      item.phone?.includes(query) ||
      item.productTitle?.toLowerCase().includes(query) ||
      item.orderId?.toLowerCase().includes(query)
    );
  });

  // =========================================================
  // DELETE ORDER
  // =========================================================

  const handleDelete = async (id) => {
    const order = orders.find((item) => item._id === id);

    if (!order) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete order ${order.orderId}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      await API.delete(`/orders/${id}`);

      // Remove deleted order from UI
      setOrders((previousOrders) =>
        previousOrders.filter((item) => item._id !== id)
      );

      // Close modals if deleted order is currently open
      if (viewingOrder?._id === id) {
        setViewingOrder(null);
      }

      if (editingOrder?._id === id) {
        setEditingOrder(null);
      }

      alert("Order deleted successfully.");
    } catch (error) {
      console.error("Delete order error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete order. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =========================================================
  // OPEN EDIT MODAL
  // =========================================================

  const handleOpenEdit = (order) => {
    setEditingOrder({
      ...order,
    });
  };

  // =========================================================
  // HANDLE EDIT INPUT
  // =========================================================

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditingOrder((previousOrder) => ({
      ...previousOrder,
      [name]: value,
    }));
  };

  // =========================================================
  // SAVE EDITED ORDER
  // =========================================================

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    if (!editingOrder) {
      return;
    }

    // Basic frontend validation
    const studentName = editingOrder.studentName?.trim();
    const size = editingOrder.size?.trim();
    const phone = editingOrder.phone?.trim();
    const address = editingOrder.address?.trim();
    const age = Number(editingOrder.age);

    if (!studentName) {
      alert("Please enter student name.");
      return;
    }

    if (!age || age < 1 || age > 12) {
      alert("Age must be between 1 and 12.");
      return;
    }

    if (!size) {
      alert("Please enter size / grade.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!address) {
      alert("Please enter delivery address.");
      return;
    }

    try {
      setSaving(true);

      const updateData = {
        studentName,
        age,
        size,
        phone,
        address,
        status: editingOrder.status,
      };

      const response = await API.put(
        `/orders/${editingOrder._id}`,
        updateData
      );

      const updatedOrder = response.data.order;

      // Update local table with database response
      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );

      // Update view modal if the same order is open
      if (viewingOrder?._id === updatedOrder._id) {
        setViewingOrder(updatedOrder);
      }

      setEditingOrder(null);

      alert("Order updated successfully.");
    } catch (error) {
      console.error("Update order error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update order. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatOrderDate = (order) => {
    const dateValue = order.createdAt || order.orderDate;

    if (!dateValue) {
      return "-";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return dateValue;
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =========================================================
  // STATUS CLASS
  // =========================================================

  const getStatusClass = (status) => {
    return status?.toLowerCase().replace(/\s+/g, "-") || "pending";
  };

  // =========================================================
  // RETURN
  // =========================================================

  return (
    <div className="Order">
      <div className="Order-container">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="Order-header">
          <div className="Order-header-text">
            <h1 className="Order-title">Student Orders</h1>

            <p className="Order-subtitle">
              Manage and track store orders and student requests
            </p>
          </div>

          {/* SEARCH */}

          <div className="Order-search-box">
            <FaSearch className="Order-search-icon" />

            <input
              type="text"
              placeholder="Search by student, product, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="Order-search-input"
            />
          </div>
        </div>

        {/* =====================================================
            ERROR MESSAGE
        ===================================================== */}

        {error && (
          <div className="Order-error">
            <span>{error}</span>

            <button type="button" onClick={fetchOrders}>
              Retry
            </button>
          </div>
        )}

        {/* =====================================================
            ORDERS TABLE
        ===================================================== */}

        <div className="Order-table-wrapper">
          <table className="Order-table">

            <thead>
              <tr>
                <th>Order ID</th>
                <th>Student Name</th>
                <th>Product</th>
                <th>Price</th>
                <th>Age / Size</th>
                <th>Phone</th>
                <th>Status</th>
                <th className="Order-th-actions">Actions</th>
              </tr>
            </thead>

            <tbody>

              {/* LOADING */}

              {loading ? (
                <tr>
                  <td colSpan="8" className="Order-empty-state">
                    <div className="Order-loading">
                      <div className="Order-loading-spinner"></div>
                      <span>Loading orders...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredOrders.length > 0 ? (

                /* ORDERS */

                filteredOrders.map((order) => (
                  <tr key={order._id}>

                    {/* ORDER ID */}

                    <td className="Order-td-id">
                      {order.orderId || "-"}
                    </td>

                    {/* STUDENT */}

                    <td className="Order-td-name">
                      {order.studentName || "-"}
                    </td>

                    {/* PRODUCT */}

                    <td>
                      {order.productTitle || "-"}
                    </td>

                    {/* PRICE */}

                    <td className="Order-td-price">
                      {order.price || "-"}
                    </td>

                    {/* AGE / SIZE */}

                    <td>
                      {order.age ? `${order.age} yrs` : "-"}

                      {order.size && (
                        <span className="Order-size-pill">
                          {order.size}
                        </span>
                      )}
                    </td>

                    {/* PHONE */}

                    <td>
                      {order.phone || "-"}
                    </td>

                    {/* STATUS */}

                    <td>
                      <span
                        className={`Order-badge ${getStatusClass(
                          order.status
                        )}`}
                      >
                        {order.status || "Pending"}
                      </span>
                    </td>

                    {/* ACTIONS */}

                    <td className="Order-td-actions">

                      {/* VIEW */}

                      <button
                        type="button"
                        className="Order-btn Order-btn-view"
                        title="View Details"
                        onClick={() => setViewingOrder(order)}
                      >
                        <FaEye />
                      </button>

                      {/* EDIT */}

                      <button
                        type="button"
                        className="Order-btn Order-btn-edit"
                        title="Edit Order"
                        onClick={() => handleOpenEdit(order)}
                        disabled={deletingId === order._id}
                      >
                        <FaEdit />
                      </button>

                      {/* DELETE */}

                      <button
                        type="button"
                        className="Order-btn Order-btn-delete"
                        title="Delete Order"
                        onClick={() => handleDelete(order._id)}
                        disabled={deletingId === order._id}
                      >
                        {deletingId === order._id ? (
                          <span className="Order-button-spinner"></span>
                        ) : (
                          <FaTrash />
                        )}
                      </button>

                    </td>
                  </tr>
                ))

              ) : (

                /* NO ORDERS */

                <tr>
                  <td colSpan="8" className="Order-empty-state">
                    {searchQuery
                      ? "No orders found matching your search."
                      : "No orders available."}
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>

        {/* =====================================================
            VIEW ORDER MODAL
        ===================================================== */}

        {viewingOrder && (
          <div
            className="Order-modal-backdrop"
            onClick={() => setViewingOrder(null)}
          >
            <div
              className="Order-modal-content"
              onClick={(e) => e.stopPropagation()}
            >

              {/* CLOSE */}

              <button
                type="button"
                className="Order-modal-close"
                onClick={() => setViewingOrder(null)}
              >
                <FaTimes />
              </button>

              {/* MODAL HEADER */}

              <div className="Order-modal-header">
                <span className="Order-modal-tag">
                  Order Details
                </span>

                <h2>
                  {viewingOrder.productTitle}
                </h2>

                <p className="Order-modal-price">
                  {viewingOrder.price}
                </p>
              </div>

              {/* DETAILS */}

              <div className="Order-details-grid">

                {/* ORDER ID */}

                <div className="Order-detail-item">
                  <label>Order ID</label>

                  <p>
                    {viewingOrder.orderId || "-"}
                  </p>
                </div>

                {/* STATUS */}

                <div className="Order-detail-item">
                  <label>Status</label>

                  <span
                    className={`Order-badge ${getStatusClass(
                      viewingOrder.status
                    )}`}
                  >
                    {viewingOrder.status || "Pending"}
                  </span>
                </div>

                {/* STUDENT */}

                <div className="Order-detail-item">
                  <label>Student Name</label>

                  <p>
                    {viewingOrder.studentName || "-"}
                  </p>
                </div>

                {/* AGE */}

                <div className="Order-detail-item">
                  <label>Age</label>

                  <p>
                    {viewingOrder.age
                      ? `${viewingOrder.age} years old`
                      : "-"}
                  </p>
                </div>

                {/* SIZE */}

                <div className="Order-detail-item">
                  <label>Size / Grade</label>

                  <p>
                    {viewingOrder.size || "-"}
                  </p>
                </div>

                {/* PHONE */}

                <div className="Order-detail-item">
                  <label>Parent Contact</label>

                  <p>
                    {viewingOrder.phone || "-"}
                  </p>
                </div>

                {/* DATE */}

                <div className="Order-detail-item">
                  <label>Order Date</label>

                  <p>
                    {formatOrderDate(viewingOrder)}
                  </p>
                </div>

                {/* ADDRESS */}

                <div className="Order-detail-item Order-detail-full">
                  <label>Delivery Address</label>

                  <p>
                    {viewingOrder.address || "-"}
                  </p>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* =====================================================
            EDIT ORDER MODAL
        ===================================================== */}

        {editingOrder && (
          <div
            className="Order-modal-backdrop"
            onClick={() => {
              if (!saving) {
                setEditingOrder(null);
              }
            }}
          >
            <div
              className="Order-modal-content"
              onClick={(e) => e.stopPropagation()}
            >

              {/* CLOSE */}

              <button
                type="button"
                className="Order-modal-close"
                onClick={() => {
                  if (!saving) {
                    setEditingOrder(null);
                  }
                }}
                disabled={saving}
              >
                <FaTimes />
              </button>

              {/* HEADER */}

              <div className="Order-modal-header">
                <span className="Order-modal-tag">
                  Edit Student Order
                </span>

                <h2>
                  {editingOrder.orderId || "-"}
                </h2>
              </div>

              {/* FORM */}

              <form
                onSubmit={handleSaveEdit}
                className="Order-edit-form"
              >

                {/* STUDENT NAME */}

                <div className="Order-form-group">
                  <label htmlFor="Order-studentName">
                    Student Name
                  </label>

                  <input
                    id="Order-studentName"
                    type="text"
                    name="studentName"
                    value={editingOrder.studentName || ""}
                    onChange={handleEditChange}
                    placeholder="Enter student name"
                    required
                  />
                </div>

                {/* AGE + SIZE */}

                <div className="Order-form-row">

                  <div className="Order-form-group">
                    <label htmlFor="Order-age">
                      Age
                    </label>

                    <input
                      id="Order-age"
                      type="number"
                      name="age"
                      min="1"
                      max="12"
                      value={editingOrder.age || ""}
                      onChange={handleEditChange}
                      placeholder="Age"
                      required
                    />
                  </div>

                  <div className="Order-form-group">
                    <label htmlFor="Order-size">
                      Size / Grade
                    </label>

                    <input
                      id="Order-size"
                      type="text"
                      name="size"
                      value={editingOrder.size || ""}
                      onChange={handleEditChange}
                      placeholder="Enter size / grade"
                      required
                    />
                  </div>

                </div>

                {/* PHONE + STATUS */}

                <div className="Order-form-row">

                  <div className="Order-form-group">
                    <label htmlFor="Order-phone">
                      Contact Phone
                    </label>

                    <input
                      id="Order-phone"
                      type="tel"
                      name="phone"
                      value={editingOrder.phone || ""}
                      onChange={handleEditChange}
                      placeholder="10-digit phone number"
                      maxLength="10"
                      pattern="[0-9]{10}"
                      required
                    />
                  </div>

                  <div className="Order-form-group">
                    <label htmlFor="Order-status">
                      Status
                    </label>

                    <select
                      id="Order-status"
                      name="status"
                      value={editingOrder.status || "Pending"}
                      onChange={handleEditChange}
                      required
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Processing">
                        Processing
                      </option>

                      <option value="Completed">
                        Completed
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>
                  </div>

                </div>

                {/* ADDRESS */}

                <div className="Order-form-group">
                  <label htmlFor="Order-address">
                    Delivery Address
                  </label>

                  <textarea
                    id="Order-address"
                    name="address"
                    rows="3"
                    value={editingOrder.address || ""}
                    onChange={handleEditChange}
                    placeholder="Enter delivery address"
                    required
                  ></textarea>
                </div>

                {/* SAVE BUTTON */}

                <button
                  type="submit"
                  className="Order-submit-btn"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <span className="Order-button-spinner"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaCheck />
                      Save Changes
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Order;