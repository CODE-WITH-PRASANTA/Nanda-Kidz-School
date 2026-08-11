import React, { useState, useEffect } from 'react';
import './SubjectManagement.css';

const API_BASE_URL = 'http://localhost:5000/api/subjects';
const ITEMS_PER_PAGE = 5;

const SubjectManagement = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    className: '',
    description: '',
    status: 'Active',
  });

  // Fetch subjects on initial component mount
  useEffect(() => {
    fetchSubjects();
  }, []);

  // GET: Fetch subjects from API
  const fetchSubjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error('Failed to fetch subjects');
      const data = await response.json();
      setSubjects(data);
    } catch (err) {
      setError(err.message || 'Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  // Toggle Form Display
  const handleToggleForm = () => {
    if (isFormVisible && editingId !== null) {
      resetForm();
    } else {
      setIsFormVisible(!isFormVisible);
      if (!isFormVisible) resetForm();
    }
  };

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Reset Form
  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      className: '',
      description: '',
      status: 'Active',
    });
    setEditingId(null);
  };

  // POST / PUT: Save or Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.code || !formData.className) {
      alert('Please fill all required fields!');
      return;
    }

    try {
      if (editingId !== null) {
        // UPDATE existing subject (PUT)
        const response = await fetch(`${API_BASE_URL}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const resData = await response.json();
        if (!response.ok) throw new Error(resData.message || 'Failed to update subject');

        setSubjects((prev) =>
          prev.map((sub) => (sub._id === editingId ? resData : sub))
        );
        alert('Subject updated successfully!');
      } else {
        // CREATE new subject (POST)
        const response = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const resData = await response.json();
        if (!response.ok) throw new Error(resData.message || 'Failed to add subject');

        setSubjects((prev) => [resData, ...prev]);
        alert('Subject created successfully!');
      }

      resetForm();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Edit Button Handler: Populates form with selected row
  const handleEdit = (subject) => {
    setFormData({
      name: subject.name,
      code: subject.code,
      className: subject.className,
      description: subject.description || '',
      status: subject.status,
    });
    setEditingId(subject._id);
    setIsFormVisible(true);
    setOpenDropdownId(null);
  };

  // DELETE: Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this subject?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });

      const resData = await response.json();
      if (!response.ok) throw new Error(resData.message || 'Failed to delete subject');

      setSubjects((prev) => prev.filter((sub) => sub._id !== id));
      if (editingId === id) resetForm();

      alert('Subject deleted successfully!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setOpenDropdownId(null);
    }
  };

  // PATCH: Toggle Status via Dropdown
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const resData = await response.json();
      if (!response.ok) throw new Error(resData.message || 'Failed to update status');

      setSubjects((prev) =>
        prev.map((sub) => (sub._id === id ? { ...sub, status: newStatus } : sub))
      );
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setOpenDropdownId(null);
    }
  };

  // Filtered Subjects
  const filteredSubjects = subjects.filter(
    (sub) =>
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Calculations
  const totalPages = Math.ceil(filteredSubjects.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = filteredSubjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="sm-container">
      {/* Top Header */}
      <div className="sm-header">
        <div>
          <h2 className="sm-title">Subject Management</h2>
          <span className="sm-breadcrumb">Dashboard &gt; Subject Management</span>
        </div>
        <button className="sm-btn-primary" onClick={handleToggleForm}>
          {isFormVisible && editingId === null ? '✕ Close Form' : '+ Add Subject'}
        </button>
      </div>

      {/* Main Grid Content */}
      <div className={`sm-grid ${isFormVisible ? 'sm-grid-split' : 'sm-grid-full'}`}>
        {/* LEFT SIDE: Add/Edit Form */}
        {isFormVisible && (
          <div className="sm-card sm-form-card">
            <div className="sm-card-header">
              <span className="sm-icon">📖</span>
              <h3>{editingId ? 'Edit Subject' : 'Add Subject'}</h3>
            </div>

            <form onSubmit={handleSubmit} className="sm-form">
              <div className="sm-form-group">
                <label>
                  Subject Name <span className="sm-required">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter subject name (e.g. Mathematics)"
                  required
                />
              </div>

              <div className="sm-form-group">
                <label>
                  Subject Code <span className="sm-required">*</span>
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  placeholder="Enter subject code (e.g. MATH)"
                  required
                />
              </div>

              <div className="sm-form-group">
                <label>
                  Select Class <span className="sm-required">*</span>
                </label>
                <select
                  name="className"
                  value={formData.className}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Class</option>
                  <option value="Nursery - Class 5">Nursery - Class 5</option>
                  <option value="Nursery - Class 3">Nursery - Class 3</option>
                  <option value="Class 1 - Class 5">Class 1 - Class 5</option>
                  <option value="Class 3 - Class 5">Class 3 - Class 5</option>
                </select>
              </div>

              <div className="sm-form-group">
                <label>Description (Optional)</label>
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter subject description..."
                ></textarea>
              </div>

              <div className="sm-form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="sm-form-actions">
                <button type="button" className="sm-btn-secondary" onClick={resetForm}>
                  Reset
                </button>
                <button type="submit" className="sm-btn-primary">
                  📥 {editingId ? 'Update Subject' : 'Save Subject'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* RIGHT SIDE: Subject List Table */}
        <div className="sm-card sm-table-card">
          <div className="sm-table-topbar">
            <div className="sm-card-header">
              <span className="sm-icon">📚</span>
              <h3>Subject List</h3>
            </div>

            <div className="sm-table-tools">
              <div className="sm-search-box">
                <span className="sm-search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search subject..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <button className="sm-btn-outline">🌪 Filter</button>
            </div>
          </div>

          {/* Table Container */}
          <div className="sm-table-responsive">
            {loading ? (
              <div style={{ padding: '20px', textAlign: 'center' }}>Loading subjects...</div>
            ) : error ? (
              <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>{error}</div>
            ) : (
              <table className="sm-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Subject Name</th>
                    <th>Subject Code</th>
                    <th>Class</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.length > 0 ? (
                    currentData.map((item, index) => (
                      <tr key={item._id}>
                        <td>{startIndex + index + 1}</td>
                        <td className="sm-fw-bold">{item.name}</td>
                        <td>{item.code}</td>
                        <td>{item.className}</td>
                        <td>{item.description || '-'}</td>
                        <td>
                          <span className={`sm-badge ${item.status.toLowerCase()}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="sm-actions-cell">
                          {/* Edit Button */}
                          <button
                            className="sm-action-btn sm-edit-btn"
                            title="Edit"
                            onClick={() => handleEdit(item)}
                          >
                            ✏️
                          </button>

                          {/* Delete Button */}
                          <button
                            className="sm-action-btn sm-delete-btn"
                            title="Delete"
                            onClick={() => handleDelete(item._id)}
                          >
                            🗑️
                          </button>

                          {/* Dropdown Menu for Status */}
                          <div className="sm-dropdown-container">
                            <button
                              className="sm-action-btn sm-more-btn"
                              onClick={() =>
                                setOpenDropdownId(openDropdownId === item._id ? null : item._id)
                              }
                            >
                              ⋮
                            </button>
                            {openDropdownId === item._id && (
                              <div className="sm-dropdown-menu">
                                <button
                                  className={item.status === 'Active' ? 'active-opt' : ''}
                                  onClick={() => handleStatusChange(item._id, 'Active')}
                                >
                                  Mark Active
                                </button>
                                <button
                                  className={item.status === 'Inactive' ? 'active-opt' : ''}
                                  onClick={() => handleStatusChange(item._id, 'Inactive')}
                                >
                                  Mark Inactive
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="sm-no-data">
                        No subjects found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination Footer */}
          <div className="sm-pagination-footer">
            <span className="sm-pagination-info">
              Showing {filteredSubjects.length > 0 ? startIndex + 1 : 0} to{' '}
              {Math.min(startIndex + ITEMS_PER_PAGE, filteredSubjects.length)} of{' '}
              {filteredSubjects.length} entries
            </span>

            <div className="sm-pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={currentPage === page ? 'active' : ''}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectManagement;