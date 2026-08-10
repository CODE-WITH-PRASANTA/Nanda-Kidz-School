import React, { useState, useMemo } from 'react';
import {
  Search, ChevronDown, LayoutGrid, Users, UserPlus, UserCheck,
  MoreVertical, Eye, Pencil, X, CalendarDays, ChevronLeft,
  ChevronRight, SlidersHorizontal, Columns3, Download, Trash2, Filter
} from 'lucide-react';
import './StudentPage.css';

const initialStudentsData = [
  { id: 1, name: 'Aarav Sharma', admNo: 'ADM2025001', class: 'Class 1', section: 'A', rollNo: '01', gender: 'Male', dob: '12 May 2018', parent: 'Rahul Sharma', status: 'Active', phone: '9876543210', email: 'rahul@example.com', bloodGroup: 'O+', address: '123 Park Street, New Delhi' },
  { id: 2, name: 'Ananya Singh', admNo: 'ADM2025002', class: 'Class 1', section: 'A', rollNo: '02', gender: 'Female', dob: '23 Jul 2018', parent: 'Pooja Singh', status: 'Active', phone: '9876543211', email: 'pooja@example.com', bloodGroup: 'A+', address: '456 MG Road, Mumbai' },
  { id: 3, name: 'Vihaan Verma', admNo: 'ADM2025003', class: 'Class 1', section: 'B', rollNo: '01', gender: 'Male', dob: '16 Mar 2018', parent: 'Amit Verma', status: 'Active', phone: '9876543212', email: 'amit@example.com', bloodGroup: 'B+', address: '789 Ring Road, Bangalore' },
  { id: 4, name: 'Diya Patel', admNo: 'ADM2025004', class: 'Class 2', section: 'A', rollNo: '05', gender: 'Female', dob: '09 Sep 2017', parent: 'Nilesh Patel', status: 'Active', phone: '9876543213', email: 'nilesh@example.com', bloodGroup: 'O+', address: '321 Ashram Road, Ahmedabad' },
  { id: 5, name: 'Krish Gupta', admNo: 'ADM2025005', class: 'Class 2', section: 'B', rollNo: '03', gender: 'Male', dob: '02 Jan 2017', parent: 'Rohit Gupta', status: 'Active', phone: '9876543214', email: 'rohit@example.com', bloodGroup: 'AB+', address: '654 Civil Lines, Jaipur' },
  { id: 6, name: 'Myra Iyer', admNo: 'ADM2025006', class: 'Class 3', section: 'A', rollNo: '07', gender: 'Female', dob: '11 Nov 2016', parent: 'Sandeep Iyer', status: 'Active', phone: '9876543215', email: 'sandeep@example.com', bloodGroup: 'A-', address: '987 Anna Salai, Chennai' },
  { id: 7, name: 'Arjun Nair', admNo: 'ADM2025007', class: 'Class 3', section: 'B', rollNo: '02', gender: 'Male', dob: '30 Apr 2016', parent: 'Vivek Nair', status: 'Inactive', phone: '9876543216', email: 'vivek@example.com', bloodGroup: 'B-', address: '147 MG Road, Kochi' },
];

const StudentPage = () => {
  const [students, setStudents] = useState(initialStudentsData);
  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit' | 'view' | 'columns' | null
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  // Column Visibility States
  const [visibleColumns, setVisibleColumns] = useState({
    student: true,
    admNo: true,
    classSection: true,
    rollNo: true,
    gender: true,
    dob: true,
    parent: true,
    status: true,
  });

  // Filter States
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedSection, setSelectedSection] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [bloodGroupFilter, setBloodGroupFilter] = useState('All');

  // Form state
  const [formData, setFormData] = useState({
    admNo: '', rollNo: '', firstName: '', lastName: '', dob: '',
    class: '', section: '', gender: '', bloodGroup: '', parent: '', phone: '', email: '', address: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openAddModal = () => {
    setFormData({
      admNo: '', rollNo: '', firstName: '', lastName: '', dob: '',
      class: '', section: '', gender: '', bloodGroup: '', parent: '', phone: '', email: '', address: ''
    });
    setModalMode('add');
  };

  const openEditModal = (student) => {
    setSelectedStudent(student);
    const nameParts = student.name.split(' ');
    setFormData({
      admNo: student.admNo || '',
      rollNo: student.rollNo || '',
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
      dob: student.dob || '',
      class: student.class?.replace('Class ', '') || '',
      section: student.section || '',
      gender: student.gender || '',
      bloodGroup: student.bloodGroup || '',
      parent: student.parent || '',
      phone: student.phone || '',
      email: student.email || '',
      address: student.address || ''
    });
    setModalMode('edit');
    setActiveMenuId(null);
  };

  const openViewModal = (student) => {
    setSelectedStudent(student);
    setModalMode('view');
    setActiveMenuId(null);
  };

  const handleDelete = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    setActiveMenuId(null);
  };

  const handleExport = () => {
    const headers = ["ID", "Name", "Admission No", "Class", "Section", "Roll No", "Gender", "DOB", "Parent", "Phone", "Email", "Status"];
    const csvRows = [
      headers.join(","),
      ...filteredStudents.map(s => [
        s.id, `"${s.name}"`, s.admNo, `"${s.class}"`, s.section, s.rollNo, s.gender, `"${s.dob}"`, `"${s.parent}"`, s.phone, s.email, s.status
      ].join(","))
    ];
    const blob = new Blob([csvRows.join("\n")], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'students_list.csv');
    a.click();
  };

  const handleSaveStudent = (e) => {
    e.preventDefault();
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    
    if (modalMode === 'add') {
      const newEntry = {
        id: Date.now(),
        name: fullName || 'New Student',
        admNo: formData.admNo || `ADM2025${Math.floor(100 + Math.random() * 900)}`,
        class: `Class ${formData.class}`,
        section: formData.section || 'A',
        rollNo: formData.rollNo || '01',
        gender: formData.gender || 'Male',
        dob: formData.dob || '01 Jan 2018',
        parent: formData.parent || 'Guardian',
        status: 'Active',
        phone: formData.phone,
        email: formData.email,
        bloodGroup: formData.bloodGroup,
        address: formData.address
      };
      setStudents(prev => [newEntry, ...prev]);
    } else if (modalMode === 'edit' && selectedStudent) {
      setStudents(prev => prev.map(s => s.id === selectedStudent.id ? {
        ...s,
        name: fullName,
        admNo: formData.admNo,
        class: `Class ${formData.class}`,
        section: formData.section,
        rollNo: formData.rollNo,
        gender: formData.gender,
        dob: formData.dob,
        parent: formData.parent,
        phone: formData.phone,
        email: formData.email,
        bloodGroup: formData.bloodGroup,
        address: formData.address
      } : s));
    }
    setModalMode(null);
  };

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesClass = selectedClass === 'All' || student.class === selectedClass || student.class === `Class ${selectedClass}`;
      const matchesSection = selectedSection === 'All' || student.section === selectedSection;
      const matchesStatus = selectedStatus === 'All' || student.status === selectedStatus;
      const matchesGender = selectedGender === 'All' || student.gender === selectedGender;
      const matchesBloodGroup = bloodGroupFilter === 'All' || student.bloodGroup === bloodGroupFilter;
      
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        student.name.toLowerCase().includes(query) ||
        student.admNo.toLowerCase().includes(query) ||
        student.parent.toLowerCase().includes(query) ||
        student.phone.toLowerCase().includes(query);

      return matchesClass && matchesSection && matchesStatus && matchesGender && matchesBloodGroup && matchesSearch;
    });
  }, [students, selectedClass, selectedSection, selectedStatus, selectedGender, bloodGroupFilter, searchQuery]);

  const resetAllFilters = () => {
    setSelectedClass('All');
    setSelectedSection('All');
    setSelectedStatus('All');
    setSelectedGender('All');
    setBloodGroupFilter('All');
    setSearchQuery('');
  };

  return (
    <div className="student-page-container" onClick={() => setActiveMenuId(null)}>
      {/* Top Header Section */}
      <div className="students-header-section">
        <div className="students-title-wrapper">
          <h1 className="page-main-title">Students</h1>
          <div className="breadcrumb-nav">
            <span className="breadcrumb-dashboard">Dashboard</span>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-current">Students</span>
          </div>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="metrics-cards-grid">
        <div className="metric-card">
          <div className="metric-icon-box total-students-icon"><LayoutGrid size={22} /></div>
          <div className="metric-content">
            <span className="metric-label">Total Students</span>
            <h2 className="metric-value">{students.length}</h2>
            <span className="metric-subtext">All Classes</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon-box boys-icon"><Users size={22} /></div>
          <div className="metric-content">
            <span className="metric-label">Boys</span>
            <h2 className="metric-value">{students.filter(s => s.gender === 'Male').length}</h2>
            <span className="metric-subtext">Gender Distribution</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon-box girls-icon"><Users size={22} /></div>
          <div className="metric-content">
            <span className="metric-label">Girls</span>
            <h2 className="metric-value">{students.filter(s => s.gender === 'Female').length}</h2>
            <span className="metric-subtext">Gender Distribution</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon-box admissions-icon"><UserPlus size={22} /></div>
          <div className="metric-content">
            <span className="metric-label">New Admissions</span>
            <h2 className="metric-value">18</h2>
            <span className="metric-subtext">This Month</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon-box active-icon"><UserCheck size={22} /></div>
          <div className="metric-content">
            <span className="metric-label">Active Students</span>
            <h2 className="metric-value">{students.filter(s => s.status === 'Active').length}</h2>
            <span className="metric-subtext">Operational</span>
          </div>
        </div>
      </div>

      {/* Filters and Controls Toolbar */}
      <div className="students-toolbar">
        <div className="filter-dropdown-group">
          <div className="dropdown-filter-item">
            <span className="filter-label-text">Class</span>
            <div className="filter-select-wrapper">
              <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="filter-native-select">
                <option value="All">All Classes</option>
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                <option value="Class 3">Class 3</option>
              </select>
              <ChevronDown size={16} className="select-chevron" />
            </div>
          </div>

          <div className="dropdown-filter-item">
            <span className="filter-label-text">Section</span>
            <div className="filter-select-wrapper">
              <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} className="filter-native-select">
                <option value="All">All Sections</option>
                <option value="A">Section A</option>
                <option value="B">Section B</option>
              </select>
              <ChevronDown size={16} className="select-chevron" />
            </div>
          </div>

          <div className="dropdown-filter-item">
            <span className="filter-label-text">Status</span>
            <div className="filter-select-wrapper">
              <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="filter-native-select">
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <ChevronDown size={16} className="select-chevron" />
            </div>
          </div>

          <div className="dropdown-filter-item">
            <span className="filter-label-text">Gender</span>
            <div className="filter-select-wrapper">
              <select value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)} className="filter-native-select">
                <option value="All">All Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <ChevronDown size={16} className="select-chevron" />
            </div>
          </div>

          <div className="dropdown-filter-item search-filter-item-wrapper">
            <span className="filter-label-text">&nbsp;</span>
            <div className="search-filter-box">
              <input 
                type="text" 
                placeholder="Search student, adm no..." 
                className="search-input-field" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={18} className="search-input-icon" />
            </div>
          </div>

          <div className="dropdown-filter-item">
            <span className="filter-label-text">&nbsp;</span>
            <button className={`more-filters-btn ${showMoreFilters ? 'active' : ''}`} onClick={() => setShowMoreFilters(!showMoreFilters)}>
              <SlidersHorizontal size={16} /><span>More Filters</span>
            </button>
          </div>
        </div>

        <button className="add-student-main-btn" onClick={openAddModal}>
          <span className="add-icon-wrapper">+</span><span>Add Student</span>
        </button>
      </div>

      {showMoreFilters && (
        <div className="more-filters-expansion-panel">
          <div className="expansion-header">
            <h4><Filter size={15} /> Advanced Filters</h4>
            <button className="clear-filters-link" onClick={resetAllFilters}>Reset All Filters</button>
          </div>
          <div className="expansion-filters-grid">
            <div className="form-input-group">
              <label className="form-field-label">Blood Group</label>
              <select value={bloodGroupFilter} onChange={(e) => setBloodGroupFilter(e.target.value)} className="form-select-input">
                <option value="All">All Blood Groups</option>
                <option value="O+">O+</option>
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="AB+">AB+</option>
                <option value="A-">A-</option>
                <option value="B-">B-</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Students Data Table Card */}
      <div className="students-table-card">
        <div className="table-card-header">
          <div className="table-header-titles">
            <h3 className="table-main-title">Students List</h3>
            <p className="table-subtitle">View and manage all student details</p>
          </div>
          <div className="table-top-actions">
            <button className="table-action-outline-btn" onClick={handleExport}><Download size={15} /><span>Export</span></button>
            <button className="table-action-outline-btn" onClick={() => setModalMode('columns')}><Columns3 size={15} /><span>Columns</span></button>
          </div>
        </div>

        <div className="table-responsive-wrapper">
          <table className="students-data-table">
            <thead>
              <tr>
                <th className="checkbox-col"><input type="checkbox" /></th>
                {visibleColumns.student && <th>Student</th>}
                {visibleColumns.admNo && <th>Admission No.</th>}
                {visibleColumns.classSection && <th>Class / Section</th>}
                {visibleColumns.rollNo && <th>Roll No.</th>}
                {visibleColumns.gender && <th>Gender</th>}
                {visibleColumns.dob && <th>Date of Birth</th>}
                {visibleColumns.parent && <th>Parent Name</th>}
                {visibleColumns.status && <th>Status</th>}
                <th className="action-col">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td className="checkbox-col"><input type="checkbox" /></td>
                    {visibleColumns.student && (
                      <td className="student-profile-cell">
                        <img src={`https://i.pravatar.cc/100?img=${student.id + 10}`} alt={student.name} className="student-avatar-img" />
                        <span className="student-name-text">{student.name}</span>
                      </td>
                    )}
                    {visibleColumns.admNo && <td className="adm-no-cell">{student.admNo}</td>}
                    {visibleColumns.classSection && <td><span className="class-badge-tag">{student.class} - {student.section}</span></td>}
                    {visibleColumns.rollNo && <td className="roll-no-cell">{student.rollNo}</td>}
                    {visibleColumns.gender && (
                      <td>
                        <span className={`gender-badge-tag ${student.gender.toLowerCase()}`}>
                          {student.gender === 'Male' ? '♂ Male' : '♀ Female'}
                        </span>
                      </td>
                    )}
                    {visibleColumns.dob && <td className="dob-cell">{student.dob}</td>}
                    {visibleColumns.parent && <td className="parent-name-cell">{student.parent}</td>}
                    {visibleColumns.status && (
                      <td>
                        <span className={`status-badge-indicator ${student.status.toLowerCase()}`}>
                          <span className="status-dot"></span>{student.status}
                        </span>
                      </td>
                    )}
                    <td className="action-buttons-cell">
                      <button className="action-icon-btn" title="View" onClick={() => openViewModal(student)}><Eye size={15} /></button>
                      <button className="action-icon-btn" title="Edit" onClick={() => openEditModal(student)}><Pencil size={15} /></button>
                      
                      <div className="action-menu-dropdown-container" onClick={(e) => e.stopPropagation()}>
                        <button className="action-icon-btn" title="More" onClick={() => setActiveMenuId(activeMenuId === student.id ? null : student.id)}>
                          <MoreVertical size={15} />
                        </button>
                        {activeMenuId === student.id && (
                          <div className="action-popup-menu">
                            <button className="action-menu-item" onClick={() => openViewModal(student)}><Eye size={14} /> View Profile</button>
                            <button className="action-menu-item" onClick={() => openEditModal(student)}><Pencil size={14} /> Edit Record</button>
                            <button className="action-menu-item delete-action" onClick={() => handleDelete(student.id)}><Trash2 size={14} /> Delete Record</button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="no-records-cell">No matching student records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="table-pagination-footer">
          <div className="pagination-entries-info">Showing {filteredStudents.length} of {students.length} entries</div>
          <div className="pagination-nav-controls">
            <button className="pagination-arrow-btn" disabled><ChevronLeft size={16} /></button>
            <button className="pagination-num-btn active">1</button>
            <button className="pagination-arrow-btn"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* Columns Visibility Modal */}
      {modalMode === 'columns' && (
        <div className="modal-backdrop-overlay" onClick={() => setModalMode(null)}>
          <div className="add-student-modal-card column-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top-header">
              <div>
                <h2 className="modal-title-text">Toggle Columns</h2>
                <p className="modal-subtitle-text">Select columns to display in table</p>
              </div>
              <button className="modal-close-icon-btn" onClick={() => setModalMode(null)}><X size={18} /></button>
            </div>
            <div className="modal-body-scroll-area">
              <div className="columns-toggle-list">
                {Object.keys(visibleColumns).map((col) => (
                  <label key={col} className="column-checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={visibleColumns[col]} 
                      onChange={() => setVisibleColumns(prev => ({ ...prev, [col]: !prev[col] }))}
                    />
                    <span>{col.charAt(0).toUpperCase() + col.slice(1).replace(/([A-Z])/g, ' $1')}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="modal-footer-actions">
              <button type="button" className="modal-save-gradient-btn" onClick={() => setModalMode(null)}>Apply</button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Form Modal */}
      {(modalMode === 'add' || modalMode === 'edit') && (
        <div className="modal-backdrop-overlay" onClick={() => setModalMode(null)}>
          <div className="add-student-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top-header">
              <div>
                <h2 className="modal-title-text">{modalMode === 'add' ? 'Add Student' : 'Edit Student'}</h2>
                <p className="modal-subtitle-text">Enter the student details below</p>
              </div>
              <button className="modal-close-icon-btn" onClick={() => setModalMode(null)}><X size={18} /></button>
            </div>

            <div className="modal-body-scroll-area">
              <form onSubmit={handleSaveStudent} className="add-student-form-grid" id="studentForm">
                <div className="form-input-group">
                  <label className="form-field-label">Admission No. <span className="req-star">*</span></label>
                  <input type="text" name="admNo" value={formData.admNo} onChange={handleInputChange} placeholder="Enter admission number" className="form-text-input" required />
                </div>
                <div className="form-input-group">
                  <label className="form-field-label">Roll No. <span className="req-star">*</span></label>
                  <input type="text" name="rollNo" value={formData.rollNo} onChange={handleInputChange} placeholder="Enter roll number" className="form-text-input" required />
                </div>
                <div className="form-input-group">
                  <label className="form-field-label">First Name <span className="req-star">*</span></label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Enter first name" className="form-text-input" required />
                </div>
                <div className="form-input-group">
                  <label className="form-field-label">Last Name</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Enter last name" className="form-text-input" />
                </div>
                <div className="form-input-group">
                  <label className="form-field-label">Date of Birth <span className="req-star">*</span></label>
                  <div className="input-with-icon-wrapper">
                    <input type="text" name="dob" value={formData.dob} onChange={handleInputChange} placeholder="dd mmm yyyy" className="form-text-input" required />
                    <CalendarDays size={18} className="field-trailing-icon" />
                  </div>
                </div>
                <div className="form-input-group">
                  <label className="form-field-label">Section <span className="req-star">*</span></label>
                  <div className="input-with-icon-wrapper">
                    <select name="section" value={formData.section} onChange={handleInputChange} className="form-select-input" required>
                      <option value="">Select section</option>
                      <option value="A">Section A</option>
                      <option value="B">Section B</option>
                    </select>
                    <ChevronDown size={18} className="field-trailing-icon" />
                  </div>
                </div>
                <div className="form-input-group">
                  <label className="form-field-label">Class <span className="req-star">*</span></label>
                  <div className="input-with-icon-wrapper">
                    <select name="class" value={formData.class} onChange={handleInputChange} className="form-select-input" required>
                      <option value="">Select class</option>
                      <option value="1">Class 1</option>
                      <option value="2">Class 2</option>
                      <option value="3">Class 3</option>
                    </select>
                    <ChevronDown size={18} className="field-trailing-icon" />
                  </div>
                </div>
                <div className="form-input-group">
                  <label className="form-field-label">Blood Group</label>
                  <div className="input-with-icon-wrapper">
                    <select name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange} className="form-select-input">
                      <option value="">Select blood group</option>
                      <option value="O+">O+</option>
                      <option value="A+">A+</option>
                      <option value="B+">B+</option>
                      <option value="AB+">AB+</option>
                    </select>
                    <ChevronDown size={18} className="field-trailing-icon" />
                  </div>
                </div>
                <div className="form-input-group">
                  <label className="form-field-label">Gender <span className="req-star">*</span></label>
                  <div className="input-with-icon-wrapper">
                    <select name="gender" value={formData.gender} onChange={handleInputChange} className="form-select-input" required>
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    <ChevronDown size={18} className="field-trailing-icon" />
                  </div>
                </div>
                <div className="form-input-group">
                  <label className="form-field-label">Phone Number <span className="req-star">*</span></label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter phone number" className="form-text-input" required />
                </div>
                <div className="form-input-group">
                  <label className="form-field-label">Parent Name <span className="req-star">*</span></label>
                  <input type="text" name="parent" value={formData.parent} onChange={handleInputChange} placeholder="Enter parent name" className="form-text-input" required />
                </div>
                <div className="form-input-group">
                  <label className="form-field-label">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter email address" className="form-text-input" />
                </div>
                <div className="form-input-group full-width-field">
                  <label className="form-field-label">Address</label>
                  <textarea name="address" value={formData.address} onChange={handleInputChange} placeholder="Enter full address" className="form-textarea-input" rows="2"></textarea>
                </div>
              </form>
            </div>

            <div className="modal-footer-actions">
              <button type="button" className="modal-cancel-btn" onClick={() => setModalMode(null)}>Cancel</button>
              <button type="submit" form="studentForm" className="modal-save-gradient-btn">Save Student</button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {modalMode === 'view' && selectedStudent && (
        <div className="modal-backdrop-overlay" onClick={() => setModalMode(null)}>
          <div className="add-student-modal-card view-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top-header">
              <div>
                <h2 className="modal-title-text">Student Profile</h2>
                <p className="modal-subtitle-text">Detailed view information</p>
              </div>
              <button className="modal-close-icon-btn" onClick={() => setModalMode(null)}><X size={18} /></button>
            </div>
            <div className="modal-body-scroll-area">
              <div className="view-profile-header">
                <img src={`https://i.pravatar.cc/100?img=${selectedStudent.id + 10}`} alt="" className="view-avatar" />
                <div>
                  <h3>{selectedStudent.name}</h3>
                  <p>{selectedStudent.admNo} | {selectedStudent.class} - {selectedStudent.section}</p>
                </div>
              </div>
              <div className="view-details-grid">
                <div><span>Roll No:</span> <strong>{selectedStudent.rollNo}</strong></div>
                <div><span>Gender:</span> <strong>{selectedStudent.gender}</strong></div>
                <div><span>Date of Birth:</span> <strong>{selectedStudent.dob}</strong></div>
                <div><span>Parent Name:</span> <strong>{selectedStudent.parent}</strong></div>
                <div><span>Phone:</span> <strong>{selectedStudent.phone || 'N/A'}</strong></div>
                <div><span>Email:</span> <strong>{selectedStudent.email || 'N/A'}</strong></div>
                <div><span>Blood Group:</span> <strong>{selectedStudent.bloodGroup || 'N/A'}</strong></div>
                <div><span>Status:</span> <strong className={selectedStudent.status.toLowerCase()}>{selectedStudent.status}</strong></div>
                <div className="full-width-field"><span>Address:</span> <strong>{selectedStudent.address || 'N/A'}</strong></div>
              </div>
            </div>
            <div className="modal-footer-actions">
              <button type="button" className="modal-cancel-btn" onClick={() => setModalMode(null)}>Close</button>
              <button type="button" className="modal-save-gradient-btn" onClick={() => openEditModal(selectedStudent)}>Edit Profile</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPage;