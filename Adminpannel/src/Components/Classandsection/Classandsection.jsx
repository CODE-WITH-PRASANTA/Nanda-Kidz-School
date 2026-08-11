import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { 
  BookOpen, Search, Filter, Edit3, Trash2, ChevronLeft, ChevronRight, 
  Calendar, Save, RotateCcw, Plus, X 
} from 'lucide-react';
import './Classandsection.css';

const API_URL = 'http://localhost:5000/api/classes';

const Classandsection = () => {
  const [classList, setClassList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const itemsPerPage = 5;

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    section: 'A',
    teacher: '',
    status: 'Active'
  });

  // Fetch classes from backend on component mount
  const fetchClasses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setClassList(res.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      alert('Failed to load class list from database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      name: '',
      code: '',
      section: 'A',
      teacher: '',
      status: 'Active'
    });
    setEditingId(null);
  };

  const handleAddClassClick = () => {
    handleReset();
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    handleReset();
    setIsFormOpen(false);
  };

  // Add or Update Class
  const handleSaveClass = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.code) {
      alert('Please fill required fields (Class Name & Class Code)');
      return;
    }

    try {
      if (editingId) {
        // Edit existing class
        const res = await axios.put(`${API_URL}/${editingId}`, formData);
        setClassList(prev => prev.map(item => item._id === editingId ? res.data : item));
      } else {
        // Add new class
        const res = await axios.post(API_URL, formData);
        setClassList(prev => [res.data, ...prev]);
      }
      handleCloseForm();
    } catch (err) {
      console.error('Error saving data:', err);
      alert('Failed to save class data.');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      name: item.name,
      code: item.code,
      section: item.section || 'A',
      teacher: item.teacher === '--' ? '' : item.teacher,
      status: item.status
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setClassList(prev => prev.filter(item => item._id !== id));
      } catch (err) {
        console.error('Error deleting class:', err);
        alert('Failed to delete class.');
      }
    }
  };

  // Search Filter
  const filteredClasses = useMemo(() => {
    return classList.filter(item =>
      (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.code && item.code.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.section && item.section.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.teacher && item.teacher.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [classList, searchQuery]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredClasses.slice(start, start + itemsPerPage);
  }, [filteredClasses, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="cas-container">
      {/* Top Header */}
      <header className="cas-header">
        <div>
          <h1 className="cas-title">Classes & Section Management</h1>
          <nav className="cas-breadcrumb">
            <span>Dashboard</span> &gt; <span className="active">Classes & Section</span>
          </nav>
        </div>
        <button className="cas-btn-icon-top" title="Academic Calendar">
          <Calendar size={18} />
        </button>
      </header>

      {/* Action Bar */}
      <div className="cas-tab-bar">
        <div className="cas-tabs">
          <button className="cas-tab active">Class Management</button>
        </div>
        <button className="cas-btn-add-class" onClick={handleAddClassClick}>
          <Plus size={16} /> Add Class
        </button>
      </div>

      {/* Main Grid */}
      <div className={`cas-grid ${isFormOpen ? 'form-visible' : 'form-hidden'}`}>
        
        {/* Left Side: Form */}
        {isFormOpen && (
          <div className="cas-card cas-form-card">
            <div className="cas-card-header-bar">
              <div className="cas-card-header">
                <BookOpen size={18} className="cas-header-icon" />
                <h2>{editingId ? 'Edit Class' : 'Add Class'}</h2>
              </div>
              <button type="button" className="cas-btn-close" onClick={handleCloseForm} title="Close Panel">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveClass} className="cas-form">
              <div className="cas-form-group">
                <label>Class Name <span className="required">*</span></label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter class name (e.g. Class 1)" 
                  required 
                />
              </div>

              <div className="cas-form-group">
                <label>Class Code <span className="required">*</span></label>
                <input 
                  type="text" 
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  placeholder="Enter class code (e.g. C1)" 
                  required 
                />
              </div>

              <div className="cas-form-group">
                <label>Section <span className="required">*</span></label>
                <select name="section" value={formData.section} onChange={handleInputChange}>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                  <option value="D">Section D</option>
                </select>
              </div>

              <div className="cas-form-group">
                <label>Class Teacher</label>
                <select name="teacher" value={formData.teacher} onChange={handleInputChange}>
                  <option value="">Select Teacher (Optional)</option>
                  <option value="Anjali Sharma">Anjali Sharma</option>
                  <option value="Pooja Verma">Pooja Verma</option>
                  <option value="Ritika Singh">Ritika Singh</option>
                  <option value="Neha Kapoor">Neha Kapoor</option>
                  <option value="Ramesh Gupta">Ramesh Gupta</option>
                </select>
              </div>

              <div className="cas-form-group">
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="cas-form-actions">
                <button type="button" className="cas-btn-reset" onClick={handleReset}>
                  <RotateCcw size={14} style={{ marginRight: '4px' }} /> Reset
                </button>
                <button type="submit" className="cas-btn-save">
                  <Save size={16} /> {editingId ? 'Update Class' : 'Save Class'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Right Side: Table */}
        <div className="cas-card cas-table-card">
          <div className="cas-table-header-bar">
            <div className="cas-card-header">
              <BookOpen size={18} className="cas-header-icon" />
              <h2>Class List</h2>
            </div>
            <div className="cas-table-controls">
              <div className="cas-search-box">
                <Search size={16} className="cas-search-icon" />
                <input 
                  type="text" 
                  placeholder="Search class..." 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <button className="cas-btn-filter">
                <Filter size={14} /> Filter
              </button>
            </div>
          </div>

          <div className="cas-table-responsive">
            <table className="cas-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Class Name</th>
                  <th>Class Code</th>
                  <th>Section</th>
                  <th>Class Teacher</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="cas-no-data">Loading data...</td>
                  </tr>
                ) : paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => (
                    <tr key={item._id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td className="cas-font-medium">{item.name}</td>
                      <td>{item.code}</td>
                      <td>Section {item.section}</td>
                      <td>{item.teacher}</td>
                      <td>
                        <span className={`cas-badge ${item.status.toLowerCase()}`}>
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <div className="cas-action-btns">
                          <button className="cas-btn-action edit" onClick={() => handleEdit(item)} title="Edit">
                            <Edit3 size={14} />
                          </button>
                          <button className="cas-btn-action delete" onClick={() => handleDelete(item._id)} title="Delete">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="cas-no-data">
                      No matching classes found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="cas-pagination-wrapper">
            <div className="cas-entries-info">
              Showing {filteredClasses.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredClasses.length)} of {filteredClasses.length} entries
            </div>
            
            <div className="cas-pagination">
              <button 
                className="cas-page-btn" 
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`cas-page-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}

              <button 
                className="cas-page-btn" 
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Classandsection;