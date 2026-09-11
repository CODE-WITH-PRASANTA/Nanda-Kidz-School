import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass, faCalendarDays, faBell, faFilter, faPlus,
  faEye, faPen, faTrash, faChevronLeft, faChevronRight, faAnglesLeft, faAnglesRight, faXmark
} from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays as faCalendarRegular } from '@fortawesome/free-regular-svg-icons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './ParentsInquiry.css';

const API_URL = 'http://localhost:5000/api/inquiries';

const StatCard = ({ icon, value, label, subtitle, color }) => (
  <div className="pi-stat-card">
    <div className={`pi-stat-icon-bg ${color}`}>
      <FontAwesomeIcon icon={icon} className={`pi-stat-icon ${color}`} />
    </div>
    <div className="pi-stat-content">
      <div className="pi-stat-value">{value}</div>
      <div className="pi-stat-label">{label}</div>
      <div className="pi-stat-subtitle">{subtitle}</div>
    </div>
  </div>
);

const ParentsInquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter States
  const [filterStatus, setFilterStatus] = useState('');
  const [filterTransport, setFilterTransport] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterDate, setFilterDate] = useState(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  // Modal & Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', 'view'
  const [currentEditSr, setCurrentEditSr] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const [formData, setFormData] = useState({
    parentName: '', phone: '', email: '', address: '',
    babyName: '', age: '', transport: '', status: '', location: '', notes: ''
  });

  // Fetch Inquiries on Mount
  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setInquiries(data);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    }
  };

  const handleOpenAddModal = () => {
    setModalMode('add');
    setFormData({ parentName: '', phone: '', email: '', address: '', babyName: '', age: '', transport: 'Yes', status: 'New', location: 'Bhubaneswar', notes: '' });
    setSelectedDate(new Date());
    setIsModalOpen(true);
  };

  const handleOpenViewModal = (item) => {
    setModalMode('view');
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setModalMode('edit');
    setCurrentEditSr(item.sr);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (sr) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      try {
        const response = await fetch(`${API_URL}/${sr}`, { method: 'DELETE' });
        if (response.ok) {
          setInquiries(prev => prev.filter(item => item.sr !== sr));
        }
      } catch (error) {
        console.error("Error deleting inquiry:", error);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEditSr(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSaveInquiry = async () => {
    if (!formData.parentName || !formData.phone || !formData.babyName) {
      alert("Please fill out all required fields (Parent Name, Phone, Baby Name).");
      return;
    }

    const formattedDate = selectedDate.toLocaleString('en-GB', { 
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' 
    });

    const payload = {
      ...formData,
      enqDate: formattedDate,
      age: formData.age ? (formData.age.includes('Years') ? formData.age : `${formData.age.replace(' Years', '')} Years`) : 'N/A',
      location: formData.location || 'Bhubaneswar',
      transport: formData.transport || 'Yes',
      status: formData.status || 'New'
    };

    try {
      if (modalMode === 'add') {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (response.ok) {
          const newEntry = await response.json();
          setInquiries(prev => [newEntry, ...prev]);
        }
      } else if (modalMode === 'edit') {
        const response = await fetch(`${API_URL}/${currentEditSr}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (response.ok) {
          const updatedEntry = await response.json();
          setInquiries(prev => prev.map(item => item.sr === currentEditSr ? updatedEntry : item));
        }
      }
      closeModal();
    } catch (error) {
      console.error("Error saving inquiry:", error);
    }
  };

  const handleResetFilters = () => {
    setFilterStatus('');
    setFilterTransport('');
    setFilterLocation('');
    setFilterDate(null);
    setSearchQuery('');
    setCurrentPage(1);
  };

  // Filter Logic
  const filteredInquiries = inquiries.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.babyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.includes(searchQuery);

    const matchesStatus = filterStatus === '' || item.status === filterStatus;
    const matchesTransport = filterTransport === '' || item.transport === filterTransport;
    const matchesLocation = filterLocation === '' || item.location === filterLocation;
    
    const matchesDate = !filterDate || item.enqDate.toLowerCase().includes(
      filterDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toLowerCase()
    );

    return matchesSearch && matchesStatus && matchesTransport && matchesLocation && matchesDate;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredInquiries.length / entriesPerPage) || 1;
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredInquiries.slice(indexOfFirstEntry, indexOfLastEntry);

  const StatusBadge = ({ status }) => {
    const statusMap = {
      'New': 'badge-new',
      'Contacted': 'badge-contacted',
      'Interested': 'badge-interested',
      'Not Interested': 'badge-not-interested',
    };
    return <span className={`pi-badge ${statusMap[status] || 'badge-new'}`}>{status}</span>;
  };

  return (
    <div className="pi-container">
      <header className="pi-header">
        <div className="pi-title-area">
          <h1>Parents Inquiry Management</h1>
          <p>Dashboard &gt; Parents Inquiry</p>
        </div>  
      </header>

      <div className="pi-stats-grid">
        <StatCard icon={faCalendarRegular} value={inquiries.length} label="Total Inquiries" subtitle="All Time" color="purple" />
        <StatCard icon={faCalendarRegular} value={inquiries.filter(i => i.status === 'New').length} label="New Inquiries" subtitle="Current" color="blue" />
        <StatCard icon={faCalendarRegular} value={inquiries.filter(i => i.status === 'Interested').length} label="Interested" subtitle="Total Interested" color="green" />
        <StatCard icon={faCalendarRegular} value={inquiries.filter(i => i.status === 'Not Interested').length} label="Not Interested" subtitle="Total Not Interested" color="orange" />
      </div>

      <div className="pi-toolbar">
        <div className="pi-filters">
          <select className="pi-select" value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}>
            <option value="">Select Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Interested">Interested</option>
            <option value="Not Interested">Not Interested</option>
          </select>

          <select className="pi-select" value={filterTransport} onChange={(e) => { setFilterTransport(e.target.value); setCurrentPage(1); }}>
            <option value="">Transport Interest</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <div className="pi-date-range-container">
            <DatePicker
              selected={filterDate}
              onChange={(date) => { setFilterDate(date); setCurrentPage(1); }}
              placeholderText="Select Date"
              className="pi-date-range-picker"
              dateFormat="dd MMM yyyy"
            />
            <FontAwesomeIcon icon={faCalendarDays} className="pi-date-range-icon" />
          </div>

          <select className="pi-select" value={filterLocation} onChange={(e) => { setFilterLocation(e.target.value); setCurrentPage(1); }}>
            <option value="">Select Location</option>
            <option value="Bhubaneswar">Bhubaneswar</option>
            <option value="Cuttack">Cuttack</option>
            <option value="Puri">Puri</option>
            <option value="Berhampur">Berhampur</option>
          </select>

          <button className="pi-reset-btn" onClick={handleResetFilters}>Reset</button>
        </div>
        <div className="pi-main-actions">
          <button className="pi-add-btn" onClick={handleOpenAddModal}>
            <FontAwesomeIcon icon={faPlus} />
            Add Inquiry
          </button>
        </div>
      </div>

      <div className="pi-table-container">
        <table className="pi-table">
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Enquiry Date</th>
              <th>Parent Name</th>
              <th>Baby Name</th>
              <th>Age</th>
              <th>Location</th>
              <th>Phone No.</th>
              <th>Address</th>
              <th>Transport Interest</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.length > 0 ? (
              currentEntries.map((item, index) => (
                <tr key={item.sr}>
                  <td>{indexOfFirstEntry + index + 1}</td>
                  <td>{item.enqDate}</td>
                  <td>{item.parentName}</td>
                  <td>{item.babyName}</td>
                  <td>{item.age}</td>
                  <td>{item.location}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>
                    <span className={`pi-transport-pill ${item.transport === 'Yes' ? 'yes' : 'no'}`}>
                      {item.transport}
                    </span>
                  </td>
                  <td><StatusBadge status={item.status} /></td>
                  <td className="pi-actions-cell">
                    <button className="pi-action-btn view" onClick={() => handleOpenViewModal(item)} title="View">
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button className="pi-action-btn edit" onClick={() => handleOpenEditModal(item)} title="Edit">
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button className="pi-action-btn delete" onClick={() => handleDelete(item.sr)} title="Delete">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="pi-no-records">No inquiries found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pi-pagination">
        <div className="pi-pagination-info">
          Showing {filteredInquiries.length > 0 ? indexOfFirstEntry + 1 : 0} to {Math.min(indexOfLastEntry, filteredInquiries.length)} of {filteredInquiries.length} entries
        </div>
        <div className="pi-pagination-controls">
          <button className={`pi-page-btn ${currentPage === 1 ? 'disabled' : ''}`} onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
            <FontAwesomeIcon icon={faAnglesLeft} />
          </button>
          <button className={`pi-page-btn ${currentPage === 1 ? 'disabled' : ''}`} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
            <button key={pageNumber} className={`pi-page-btn ${currentPage === pageNumber ? 'active' : ''}`} onClick={() => setCurrentPage(pageNumber)}>
              {pageNumber}
            </button>
          ))}

          <button className={`pi-page-btn ${currentPage === totalPages ? 'disabled' : ''}`} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
          <button className={`pi-page-btn ${currentPage === totalPages ? 'disabled' : ''}`} onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
            <FontAwesomeIcon icon={faAnglesRight} />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="pi-modal-backdrop" onClick={closeModal}>
          <div className="pi-modal-content" onClick={e => e.stopPropagation()}>
            <div className="pi-modal-header">
              <h2>
                {modalMode === 'add' && 'Add New Inquiry'}
                {modalMode === 'edit' && 'Edit Inquiry'}
                {modalMode === 'view' && 'View Inquiry Details'}
              </h2>
              <button className="pi-modal-close" onClick={closeModal}><FontAwesomeIcon icon={faXmark} /></button>
            </div>

            <div className="pi-modal-body">
              <section className="pi-form-section">
                <h3>Parent Information</h3>
                <div className="pi-form-grid">
                  <div className="pi-form-group">
                    <label>Parent Name *</label>
                    <input type="text" name="parentName" value={formData.parentName} onChange={handleInputChange} disabled={modalMode === 'view'} placeholder="Enter parent name" />
                  </div>
                  <div className="pi-form-group">
                    <label>Phone No. *</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} disabled={modalMode === 'view'} placeholder="Enter phone number" />
                  </div>
                  <div className="pi-form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email || ''} onChange={handleInputChange} disabled={modalMode === 'view'} placeholder="Enter email address" />
                  </div>
                  <div className="pi-form-group full-width">
                    <label>Address *</label>
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} disabled={modalMode === 'view'} placeholder="Enter complete address" />
                  </div>
                </div>
              </section>

              <section className="pi-form-section">
                <h3>Child Information</h3>
                <div className="pi-form-grid">
                  <div className="pi-form-group">
                    <label>Baby Name *</label>
                    <input type="text" name="babyName" value={formData.babyName} onChange={handleInputChange} disabled={modalMode === 'view'} placeholder="Enter baby name" />
                  </div>
                  <div className="pi-form-group">
                    <label>Age *</label>
                    {modalMode === 'view' ? (
                      <input type="text" value={formData.age} disabled />
                    ) : (
                      <select name="age" value={formData.age} onChange={handleInputChange}>
                        <option value="">Select age</option>
                        <option value="1">1 Year</option>
                        <option value="2">2 Years</option>
                        <option value="2.5">2.5 Years</option>
                        <option value="3">3 Years</option>
                        <option value="3.5">3.5 Years</option>
                        <option value="4">4 Years</option>
                      </select>
                    )}
                  </div>
                </div>
              </section>

              <section className="pi-form-section">
                <h3>Inquiry Details</h3>
                <div className="pi-form-grid">
                  <div className="pi-form-group">
                    <label>Transport Interest *</label>
                    {modalMode === 'view' ? (
                      <input type="text" value={formData.transport} disabled />
                    ) : (
                      <select name="transport" value={formData.transport} onChange={handleInputChange}>
                        <option value="">Select transport interest</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    )}
                  </div>
                  <div className="pi-form-group">
                    <label>Inquiry Status *</label>
                    {modalMode === 'view' ? (
                      <input type="text" value={formData.status} disabled />
                    ) : (
                      <select name="status" value={formData.status} onChange={handleInputChange}>
                        <option value="">Select status</option>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Interested">Interested</option>
                        <option value="Not Interested">Not Interested</option>
                      </select>
                    )}
                  </div>
                  <div className="pi-form-group">
                    <label>Preferred Location</label>
                    {modalMode === 'view' ? (
                      <input type="text" value={formData.location} disabled />
                    ) : (
                      <select name="location" value={formData.location} onChange={handleInputChange}>
                        <option value="">Select location</option>
                        <option value="Bhubaneswar">Bhubaneswar</option>
                        <option value="Cuttack">Cuttack</option>
                        <option value="Puri">Puri</option>
                        <option value="Berhampur">Berhampur</option>
                      </select>
                    )}
                  </div>
                  <div className="pi-form-group">
                    <label>Inquiry Date *</label>
                    <div className="pi-datepicker-wrapper">
                      {modalMode === 'view' ? (
                        <input type="text" value={formData.enqDate} disabled />
                      ) : (
                        <>
                          <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            showTimeSelect
                            dateFormat="dd MMM yyyy hh:mm aa"
                          />
                          <FontAwesomeIcon icon={faCalendarRegular} className="pi-picker-icon" />
                        </>
                      )}
                    </div>
                  </div>
                  <div className="pi-form-group full-width">
                    <label>Notes</label>
                    <textarea name="notes" value={formData.notes || ''} onChange={handleInputChange} disabled={modalMode === 'view'} placeholder="Add any additional notes..." rows="3"></textarea>
                  </div>
                </div>
              </section>
            </div>

            <div className="pi-modal-footer">
              <button className="pi-btn-cancel" onClick={closeModal}>
                {modalMode === 'view' ? 'Close' : 'Cancel'}
              </button>
              {modalMode !== 'view' && (
                <button className="pi-btn-save" onClick={handleSaveInquiry}>
                  {modalMode === 'add' ? 'Save Inquiry' : 'Update Inquiry'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentsInquiry;