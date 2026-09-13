import React, { useState } from 'react';
import './Order.css';
import { FaEye, FaEdit, FaTrash, FaTimes, FaSearch, FaCheck } from 'react-icons/fa';

const initialOrders = [
  {
    id: 'ORD-101',
    productTitle: 'Discovery Lab',
    price: '₹599',
    studentName: 'Aarav Sharma',
    age: 4,
    size: 'Age 4-5',
    phone: '9438013349',
    address: 'Plot No. 42, Kalinganagar, Bhubaneswar',
    orderDate: '2025-05-10',
    status: 'Pending',
  },
  {
    id: 'ORD-102',
    productTitle: 'Creative Arts',
    price: '₹499',
    studentName: 'Ananya Patra',
    age: 5,
    size: 'M',
    phone: '9876543210',
    address: 'Flat 301, Sunshine Enclave, Khandagiri',
    orderDate: '2025-05-11',
    status: 'Completed',
  },
  {
    id: 'ORD-103',
    productTitle: 'Fine Motor',
    price: '₹749',
    studentName: 'Rohan Jena',
    age: 3,
    size: 'S',
    phone: '9123456780',
    address: 'Lane 4, Baramunda, Bhubaneswar',
    orderDate: '2025-05-12',
    status: 'Pending',
  },
];

const Order = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingOrder, setViewingOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);

  // Filter orders by search input
  const filteredOrders = orders.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.studentName.toLowerCase().includes(query) ||
      item.phone.includes(query) ||
      item.productTitle.toLowerCase().includes(query) ||
      item.id.toLowerCase().includes(query)
    );
  });

  // Delete an order
  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete order ${id}?`)) {
      setOrders((prev) => prev.filter((order) => order.id !== id));
    }
  };

  // Open Edit Modal
  const handleOpenEdit = (order) => {
    setEditingOrder({ ...order });
  };

  // Handle Edit Input Change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save Edited Order
  const handleSaveEdit = (e) => {
    e.preventDefault();
    setOrders((prev) =>
      prev.map((ord) => (ord.id === editingOrder.id ? editingOrder : ord))
    );
    setEditingOrder(null);
  };

  return (
    <div className="Order">
      <div className="Order-container">
        
        {/* Header section */}
        <div className="Order-header">
          <div className="Order-header-text">
            <h1 className="Order-title">Student Orders</h1>
            <p className="Order-subtitle">Manage and track store orders and student requests</p>
          </div>

          {/* Search bar */}
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

        {/* Orders Table Card */}
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
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="Order-td-id">{order.id}</td>
                    <td className="Order-td-name">{order.studentName}</td>
                    <td>{order.productTitle}</td>
                    <td className="Order-td-price">{order.price}</td>
                    <td>
                      {order.age} yrs <span className="Order-size-pill">{order.size}</span>
                    </td>
                    <td>{order.phone}</td>
                    <td>
                      <span className={`Order-badge ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="Order-td-actions">
                      <button
                        className="Order-btn Order-btn-view"
                        title="View Details"
                        onClick={() => setViewingOrder(order)}
                      >
                        <FaEye />
                      </button>
                      <button
                        className="Order-btn Order-btn-edit"
                        title="Edit Order"
                        onClick={() => handleOpenEdit(order)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="Order-btn Order-btn-delete"
                        title="Delete Order"
                        onClick={() => handleDelete(order.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="Order-empty-state">
                    No orders found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================
          VIEW ORDER MODAL
      ========================================================= */}
      {viewingOrder && (
        <div className="Order-modal-backdrop" onClick={() => setViewingOrder(null)}>
          <div className="Order-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="Order-modal-close"
              onClick={() => setViewingOrder(null)}
            >
              <FaTimes />
            </button>

            <div className="Order-modal-header">
              <span className="Order-modal-tag">Order Details</span>
              <h2>{viewingOrder.productTitle}</h2>
              <p className="Order-modal-price">{viewingOrder.price}</p>
            </div>

            <div className="Order-details-grid">
              <div className="Order-detail-item">
                <label>Order ID</label>
                <p>{viewingOrder.id}</p>
              </div>
              <div className="Order-detail-item">
                <label>Status</label>
                <span className={`Order-badge ${viewingOrder.status.toLowerCase()}`}>
                  {viewingOrder.status}
                </span>
              </div>
              <div className="Order-detail-item">
                <label>Student Name</label>
                <p>{viewingOrder.studentName}</p>
              </div>
              <div className="Order-detail-item">
                <label>Age</label>
                <p>{viewingOrder.age} years old</p>
              </div>
              <div className="Order-detail-item">
                <label>Size / Grade</label>
                <p>{viewingOrder.size}</p>
              </div>
              <div className="Order-detail-item">
                <label>Parent Contact</label>
                <p>{viewingOrder.phone}</p>
              </div>
              <div className="Order-detail-item Order-detail-full">
                <label>Delivery Address</label>
                <p>{viewingOrder.address}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          EDIT ORDER MODAL
      ========================================================= */}
      {editingOrder && (
        <div className="Order-modal-backdrop" onClick={() => setEditingOrder(null)}>
          <div className="Order-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="Order-modal-close"
              onClick={() => setEditingOrder(null)}
            >
              <FaTimes />
            </button>

            <div className="Order-modal-header">
              <span className="Order-modal-tag">Edit Student Order</span>
              <h2>{editingOrder.id}</h2>
            </div>

            <form onSubmit={handleSaveEdit} className="Order-edit-form">
              <div className="Order-form-group">
                <label>Student Name</label>
                <input
                  type="text"
                  name="studentName"
                  value={editingOrder.studentName}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div className="Order-form-row">
                <div className="Order-form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    name="age"
                    value={editingOrder.age}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="Order-form-group">
                  <label>Size / Grade</label>
                  <input
                    type="text"
                    name="size"
                    value={editingOrder.size}
                    onChange={handleEditChange}
                    required
                  />
                </div>
              </div>

              <div className="Order-form-row">
                <div className="Order-form-group">
                  <label>Contact Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={editingOrder.phone}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="Order-form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={editingOrder.status}
                    onChange={handleEditChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="Order-form-group">
                <label>Delivery Address</label>
                <textarea
                  name="address"
                  rows="3"
                  value={editingOrder.address}
                  onChange={handleEditChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="Order-submit-btn">
                <FaCheck /> Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;