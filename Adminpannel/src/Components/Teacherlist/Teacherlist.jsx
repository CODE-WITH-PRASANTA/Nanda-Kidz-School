import React, { useState } from 'react';
import {
  FaUserCheck,
  FaPlus,
  FaSearch,
  FaFilter,
  FaDownload,
  FaSync,
  FaEdit,
  FaEye,
  FaTrashAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaCalendarAlt,
  FaUpload,
  FaTimes,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaEllipsisV
} from 'react-icons/fa';
import './TeacherList.css';

const INITIAL_TEACHERS = [
  {
    id: 1,
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    name: 'Alex Maywel',
    designation: 'Math Teacher',
    subject: 'Mathematics',
    experience: '10 Years',
    email: 'ketan@gmail.com',
    phone: '882-569-756',
    address: 'Wonder Street, USA, New York',
    qualification: 'M.Sc, B.Ed',
    joiningDate: '2025-05-16',
    dob: '1990-08-12',
    bloodGroup: 'O+',
    gender: 'Female',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    skills: ['Teaching', 'Speaking', 'Communication', 'Leadership'],
    status: 'Active',
    skillRatings: { teaching: 95, speaking: 85, communication: 75, rules: 65 }
  },
  {
    id: 2,
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    name: 'Sarah Johnson',
    designation: 'English Teacher',
    subject: 'English',
    experience: '8 Years',
    email: 'sarah@gmail.com',
    phone: '889-120-567',
    address: '45 Park Avenue, NY',
    qualification: 'M.A, B.Ed',
    joiningDate: '2023-01-10',
    dob: '1992-04-15',
    bloodGroup: 'A+',
    gender: 'Female',
    bio: 'Passionate about literature and modern teaching techniques.',
    skills: ['Teaching', 'Writing', 'Communication'],
    status: 'Active',
    skillRatings: { teaching: 90, speaking: 88, communication: 92, rules: 80 }
  },
  {
    id: 3,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    name: 'Michael Brown',
    designation: 'Science Teacher',
    subject: 'Science',
    experience: '12 Years',
    email: 'michael@gmail.com',
    phone: '887-654-321',
    address: '78 Pine Street, CA',
    qualification: 'Ph.D Physics',
    joiningDate: '2021-08-20',
    dob: '1985-11-03',
    bloodGroup: 'B+',
    gender: 'Male',
    bio: 'Dedicated scientist with over a decade of teaching secondary students.',
    skills: ['Research', 'Leadership', 'Teaching'],
    status: 'Inactive',
    skillRatings: { teaching: 85, speaking: 75, communication: 80, rules: 90 }
  },
  {
    id: 4,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    name: 'David Smith',
    designation: 'History Teacher',
    subject: 'History',
    experience: '6 Years',
    email: 'david@gmail.com',
    phone: '881-234-567',
    address: '12 Oak Lane, TX',
    qualification: 'M.A. History',
    joiningDate: '2022-09-01',
    dob: '1993-02-18',
    bloodGroup: 'AB+',
    gender: 'Male',
    bio: 'Making history interactive and exciting for students.',
    skills: ['Storytelling', 'Teaching'],
    status: 'Active',
    skillRatings: { teaching: 88, speaking: 90, communication: 85, rules: 70 }
  },
  {
    id: 5,
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    name: 'Emma Watson',
    designation: 'Art Teacher',
    subject: 'Fine Arts',
    experience: '5 Years',
    email: 'emma@gmail.com',
    phone: '883-999-112',
    address: '90 Creative Blvd, FL',
    qualification: 'B.F.A',
    joiningDate: '2024-03-15',
    dob: '1995-07-22',
    bloodGroup: 'O-',
    gender: 'Female',
    bio: 'Encouraging creative expression through visual arts.',
    skills: ['Creativity', 'Teaching'],
    status: 'Active',
    skillRatings: { teaching: 92, speaking: 80, communication: 82, rules: 60 }
  },
  {
    id: 6,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    name: 'Robert Wilson',
    designation: 'Sports Teacher',
    subject: 'Physical Education',
    experience: '9 Years',
    email: 'robert@gmail.com',
    phone: '886-444-221',
    address: '33 Stadium Way, IL',
    qualification: 'B.P.Ed',
    joiningDate: '2020-06-11',
    dob: '1988-12-05',
    bloodGroup: 'A-',
    gender: 'Male',
    bio: 'Promoting fitness and team spirit in sports.',
    skills: ['Coaching', 'Leadership'],
    status: 'Active',
    skillRatings: { teaching: 80, speaking: 85, communication: 88, rules: 95 }
  }
];

const INITIAL_FORM_STATE = {
  id: null,
  name: 'Alex Maywel',
  phone: '882-569-756',
  email: 'ketan@gmail.com',
  address: 'Wonder Street, USA, New York',
  designation: 'Math Teacher',
  experience: '10 Years',
  joiningDate: '2025-05-16',
  qualification: 'M.Sc, B.Ed',
  subject: 'Mathematics',
  gender: 'Female',
  dob: '1990-12-08',
  bloodGroup: 'O+',
  status: 'Active',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  skills: ['Teaching', 'Speaking', 'Communication', 'Leadership'],
  photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
};

const TeacherList = () => {
  const [activeTab, setActiveTab] = useState('add_edit');
  const [teachers, setTeachers] = useState(INITIAL_TEACHERS);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Status filter mode: 'All' -> 'Active' -> 'Inactive'
  const [filterMode, setFilterMode] = useState('All');
  const [activeMenuId, setActiveMenuId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  // Modals
  const [viewModalTeacher, setViewModalTeacher] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Skill tag input
  const [tagInput, setTagInput] = useState('');

  // Form field handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked ? 'Active' : 'Inactive' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  const handleAddSkillKey = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.skills.includes(tagInput.trim())) {
        setFormData(prev => ({ ...prev, skills: [...prev.skills, tagInput.trim()] }));
      }
      setTagInput('');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, photo: imageUrl }));
    }
  };

  const handleSaveTeacher = (e) => {
    e.preventDefault();
    if (formData.id) {
      setTeachers(prev => prev.map(item => item.id === formData.id ? { ...formData } : item));
      alert('Teacher details updated successfully!');
    } else {
      const newTeacher = {
        ...formData,
        id: Date.now(),
        skillRatings: { teaching: 90, speaking: 80, communication: 85, rules: 75 }
      };
      setTeachers(prev => [newTeacher, ...prev]);
      alert('New Teacher added successfully!');
    }
    setActiveTab('list');
  };

  const handleResetForm = () => {
    setFormData(INITIAL_FORM_STATE);
  };

  // Actions in Table
  const handleEdit = (teacher) => {
    setFormData({ ...teacher });
    setActiveTab('add_edit');
    setActiveMenuId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this teacher record?')) {
      setTeachers(prev => prev.filter(t => t.id !== id));
    }
    setActiveMenuId(null);
  };

  const handleStatusChange = (id, newStatus) => {
    setTeachers(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
    setActiveMenuId(null);
  };

  const handleAddNewTeacherClick = () => {
    handleResetForm();
    setIsAddModalOpen(true);
  };

  // Direct toggle filter function (No dropdown)
  const handleToggleFilter = () => {
    if (filterMode === 'All') setFilterMode('Active');
    else if (filterMode === 'Active') setFilterMode('Inactive');
    else setFilterMode('All');
    setCurrentPage(1);
  };

  // Refresh handler: resets search, filters, pagination, and dropdown menus
  const handleRefresh = () => {
    setSearchTerm('');
    setFilterMode('All');
    setCurrentPage(1);
    setActiveMenuId(null);
  };

  // Export handler: exports table data to CSV format
  const handleExportCSV = () => {
    if (filteredTeachers.length === 0) {
      alert('No data available to export.');
      return;
    }

    const headers = ['ID', 'Name', 'Designation', 'Subject', 'Experience', 'Email', 'Phone', 'Status'];
    const rows = filteredTeachers.map(t => [
      t.id,
      `"${t.name}"`,
      `"${t.designation}"`,
      `"${t.subject}"`,
      `"${t.experience}"`,
      `"${t.email}"`,
      `"${t.phone}"`,
      `"${t.status}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'teachers_list.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pagination & Filtering logic
  const filteredTeachers = teachers.filter(t => {
    const matchesSearch = 
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterMode === 'All' || t.status.toLowerCase() === filterMode.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTableData = filteredTeachers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="teacher-container">
      {/* Top Header Controls */}
      <div className="teacher-header">
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            Teacher List
          </button>
          <button 
            className={`tab-btn ${activeTab === 'add_edit' ? 'active' : ''}`}
            onClick={() => setActiveTab('add_edit')}
          >
            Add / Edit Teacher
          </button>
        </div>
        <button className="add-teacher-btn" onClick={handleAddNewTeacherClick}>
          <FaPlus /> Add New Teacher
        </button>
      </div>

      {/* VIEW 1: ADD / EDIT TEACHER */}
      {activeTab === 'add_edit' && (
        <div className="add-edit-layout">
          {/* Left Column: Form Controls */}
          <div className="form-column scrollable-left-pane">
            {/* Basic Information Card */}
            <div className="card">
              <div className="card-header flex-between">
                <FaUserCheck className="card-icon" />
                <h3 className="card-title-right">Basic Information</h3>
              </div>
              <div className="card-body">
                <form id="teacherForm" onSubmit={handleSaveTeacher}>
                  <div className="grid-2">
                    <div className="form-group">
                      <label>Full Name <span>*</span></label>
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone <span>*</span></label>
                      <input 
                        type="text" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="grid-2">
                    <div className="form-group">
                      <label>Email <span>*</span></label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Address <span>*</span></label>
                      <input 
                        type="text" 
                        name="address" 
                        value={formData.address} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="grid-3">
                    <div className="form-group">
                      <label>Designation <span>*</span></label>
                      <select name="designation" value={formData.designation} onChange={handleInputChange}>
                        <option value="Math Teacher">Math Teacher</option>
                        <option value="English Teacher">English Teacher</option>
                        <option value="Science Teacher">Science Teacher</option>
                        <option value="History Teacher">History Teacher</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Experience <span>*</span></label>
                      <select name="experience" value={formData.experience} onChange={handleInputChange}>
                        <option value="5 Years">5 Years</option>
                        <option value="8 Years">8 Years</option>
                        <option value="10 Years">10 Years</option>
                        <option value="12 Years">12 Years</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Date of Joining <span>*</span></label>
                      <input 
                        type="date" 
                        name="joiningDate" 
                        value={formData.joiningDate} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="grid-2">
                    <div className="form-group">
                      <label>Qualification <span>*</span></label>
                      <input 
                        type="text" 
                        name="qualification" 
                        value={formData.qualification} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Subject Specialization <span>*</span></label>
                      <input 
                        type="text" 
                        name="subject" 
                        value={formData.subject} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="grid-3">
                    <div className="form-group">
                      <label>Date of Birth</label>
                      <input 
                        type="date" 
                        name="dob" 
                        value={formData.dob} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    <div className="form-group">
                      <label>Blood Group</label>
                      <select name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange}>
                        <option value="O+">O+</option>
                        <option value="A+">A+</option>
                        <option value="B+">B+</option>
                        <option value="AB+">AB+</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Gender <span>*</span></label>
                      <div className="radio-group">
                        <label>
                          <input 
                            type="radio" 
                            name="gender" 
                            value="Male" 
                            checked={formData.gender === 'Male'} 
                            onChange={handleInputChange} 
                          /> Male
                        </label>
                        <label>
                          <input 
                            type="radio" 
                            name="gender" 
                            value="Female" 
                            checked={formData.gender === 'Female'} 
                            onChange={handleInputChange} 
                          /> Female
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="form-group toggle-group">
                    <label>Status</label>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        name="status" 
                        checked={formData.status === 'Active'} 
                        onChange={handleInputChange} 
                      />
                      <span className="slider round"></span>
                    </label>
                    <span className={`status-label ${formData.status.toLowerCase()}`}>{formData.status}</span>
                  </div>
                </form>
              </div>
            </div>

            {/* Additional Information Card */}
            <div className="card">
              <div className="card-header flex-between">
                <FaUserCheck className="card-icon" />
                <h3 className="card-title-right">Additional Information</h3>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label>About / Biography</label>
                  <textarea 
                    rows="3" 
                    name="bio" 
                    value={formData.bio} 
                    onChange={handleInputChange} 
                  />
                </div>

                <div className="photo-upload-section">
                  <label>Profile Photo</label>
                  <div className="upload-box">
                    <img src={formData.photo} alt="Preview" className="photo-preview" />
                    <label htmlFor="photo-upload-input" className="upload-btn">
                      <FaUpload /> Upload Photo
                    </label>
                    <input 
                      id="photo-upload-input" 
                      type="file" 
                      accept="image/*" 
                      style={{ display: 'none' }} 
                      onChange={handleImageUpload} 
                    />
                    <span className="file-info">JPG, PNG (Max 2MB)</span>
                  </div>
                </div>

                <div className="form-group margin-top-15">
                  <label>Teaching Skills</label>
                  <div className="skills-tags-container">
                    {formData.skills.map((skill, index) => (
                      <span key={index} className="skill-badge">
                        {skill} 
                        <FaTimes onClick={() => handleRemoveSkill(skill)} className="remove-skill" />
                      </span>
                    ))}
                  </div>
                  <input 
                    type="text" 
                    placeholder="Type skill and press Enter..." 
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddSkillKey}
                    className="tag-input"
                  />
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-reset" onClick={handleResetForm}>
                    Reset
                  </button>
                  <button type="submit" form="teacherForm" className="btn-save">
                    <FaUserCheck /> Save Teacher
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Previews */}
          <div className="preview-column">
            {/* Profile Preview Card */}
            <div className="card">
              <div className="card-header flex-between">
                <FaEye className="card-icon" />
                <h3 className="card-title-right">Profile Preview</h3>
              </div>
              <div className="card-body profile-preview-card">
                <div className="profile-preview-flex">
                  <img src={formData.photo} alt={formData.name} className="large-avatar" />
                  <div className="profile-info">
                    <h2>{formData.name || 'Alex Maywel'}</h2>
                    <p className="designation-text">{formData.designation || 'Math Teacher'}</p>
                    
                    <ul className="info-list">
                      <li><FaPhoneAlt /> <span>Phone</span> <strong>{formData.phone || 'N/A'}</strong></li>
                      <li><FaEnvelope /> <span>Email</span> <strong>{formData.email || 'N/A'}</strong></li>
                      <li><FaMapMarkerAlt /> <span>Address</span> <strong>{formData.address || 'N/A'}</strong></li>
                      <li><FaBriefcase /> <span>Experience</span> <strong>{formData.experience || 'N/A'}</strong></li>
                      <li><FaGraduationCap /> <span>Qualification</span> <strong>{formData.qualification || 'N/A'}</strong></li>
                      <li><FaCalendarAlt /> <span>Date of Joining</span> <strong>{formData.joiningDate || 'N/A'}</strong></li>
                    </ul>

                    <div className="social-links">
                      <span>Contact</span>
                      <div className="social-icons">
                        <a href="#fb"><FaFacebookF /></a>
                        <a href="#tw"><FaTwitter /></a>
                        <a href="#li"><FaLinkedinIn /></a>
                        <a href="#ig"><FaInstagram /></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Teacher Skills Preview Card */}
            <div className="card">
              <div className="card-header flex-between">
                <FaUserCheck className="card-icon" />
                <h3 className="card-title-right">Teacher Skills Preview</h3>
              </div>
              <div className="card-body">
                <div className="progress-item">
                  <div className="progress-labels">
                    <span>Teaching Skills</span>
                    <span>95%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill yellow" style={{ width: '95%' }}></div>
                  </div>
                </div>

                <div className="progress-item">
                  <div className="progress-labels">
                    <span>Speaking</span>
                    <span>85%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill red" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div className="progress-item">
                  <div className="progress-labels">
                    <span>Communication Skill</span>
                    <span>75%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill blue" style={{ width: '75%' }}></div>
                  </div>
                </div>

                <div className="progress-item">
                  <div className="progress-labels">
                    <span>Follow The Rules</span>
                    <span>65%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill green" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: TEACHER LIST TABLE */}
      {activeTab === 'list' && (
        <div className="card table-card">
          <div className="table-top-bar">
            <div className="table-title">
              <FaUserCheck className="card-icon" />
              <h3>All Teachers</h3>
            </div>
            <div className="table-actions">
              <div className="search-box">
                <FaSearch className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search teacher..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Direct Filter Toggle Button (No dropdowns) */}
              <button 
                className={`icon-btn filter-toggle-btn ${filterMode.toLowerCase()}`}
                onClick={handleToggleFilter}
                title="Click to toggle filter (All -> Active -> Inactive)"
              >
                <FaFilter /> Filter: <span>{filterMode}</span>
              </button>

              {/* Working Export CSV Option */}
              <button className="icon-btn export-btn" onClick={handleExportCSV} title="Export Table Data to CSV">
                <FaDownload /> Export
              </button>

              {/* Working Refresh Option */}
              <button className="icon-btn refresh-btn" onClick={handleRefresh} title="Reset Filter & Refresh Table">
                <FaSync />
              </button>
            </div>
          </div>

          <div className="responsive-table-wrapper">
            <table className="teacher-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Subject</th>
                  <th>Experience</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentTableData.length > 0 ? (
                  currentTableData.map((teacher, index) => (
                    <tr key={teacher.id}>
                      <td>{String(startIndex + index + 1).padStart(2, '0')}</td>
                      <td>
                        <img src={teacher.photo} alt={teacher.name} className="table-avatar" />
                      </td>
                      <td className="font-semibold">{teacher.name}</td>
                      <td>{teacher.designation}</td>
                      <td>{teacher.subject}</td>
                      <td>{teacher.experience}</td>
                      <td>{teacher.email}</td>
                      <td>{teacher.phone}</td>
                      <td>
                        <span className={`status-badge ${teacher.status.toLowerCase()}`}>
                          {teacher.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn edit-btn" title="Edit" onClick={() => handleEdit(teacher)}>
                            <FaEdit />
                          </button>
                          <button className="action-btn view-btn" title="View" onClick={() => setViewModalTeacher(teacher)}>
                            <FaEye />
                          </button>
                          <button className="action-btn delete-btn" title="Delete" onClick={() => handleDelete(teacher.id)}>
                            <FaTrashAlt />
                          </button>

                          {/* Three-dots Menu Icon beside Delete button */}
                          <div className="more-menu-container">
                            <button 
                              className="action-btn more-btn" 
                              title="Change Status"
                              onClick={() => setActiveMenuId(activeMenuId === teacher.id ? null : teacher.id)}
                            >
                              <FaEllipsisV />
                            </button>

                            {/* Dropdown for Active & Inactive */}
                            {activeMenuId === teacher.id && (
                              <div className="status-dropdown-menu">
                                <div className="menu-header">Change Status</div>
                                <button 
                                  className={`menu-option opt-active ${teacher.status === 'Active' ? 'selected' : ''}`}
                                  onClick={() => handleStatusChange(teacher.id, 'Active')}
                                >
                                  <span className="status-dot green"></span> Active
                                </button>
                                <button 
                                  className={`menu-option opt-inactive ${teacher.status === 'Inactive' ? 'selected' : ''}`}
                                  onClick={() => handleStatusChange(teacher.id, 'Inactive')}
                                >
                                  <span className="status-dot red"></span> Inactive
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="no-data">No teachers found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="pagination-wrapper">
            <div className="pagination-info">
              Showing {filteredTeachers.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + itemsPerPage, filteredTeachers.length)} of {filteredTeachers.length} entries
            </div>

            <div className="pagination-controls">
              <button 
                className="page-nav-btn" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                &lt;
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`page-num-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

              <button 
                className="page-nav-btn" 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              >
                &gt;
              </button>

              <select 
                className="per-page-select"
                value={itemsPerPage}
                onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              >
                <option value={5}>5 / page</option>
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* VIEW DETAILS POPUP MODAL */}
      {viewModalTeacher && (
        <div className="modal-overlay" onClick={() => setViewModalTeacher(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Teacher Details</h3>
              <button className="modal-close" onClick={() => setViewModalTeacher(null)}><FaTimes /></button>
            </div>
            <div className="modal-body flex-modal">
              <img src={viewModalTeacher.photo} alt={viewModalTeacher.name} className="modal-avatar" />
              <div className="modal-info">
                <h2>{viewModalTeacher.name}</h2>
                <p className="designation-text">{viewModalTeacher.designation}</p>
                <hr className="divider" />
                <ul className="info-list">
                  <li><FaPhoneAlt /> <span>Phone:</span> {viewModalTeacher.phone}</li>
                  <li><FaEnvelope /> <span>Email:</span> {viewModalTeacher.email}</li>
                  <li><FaMapMarkerAlt /> <span>Address:</span> {viewModalTeacher.address}</li>
                  <li><FaBriefcase /> <span>Experience:</span> {viewModalTeacher.experience}</li>
                  <li><FaGraduationCap /> <span>Qualification:</span> {viewModalTeacher.qualification}</li>
                  <li><FaCalendarAlt /> <span>Date of Joining:</span> {viewModalTeacher.joiningDate}</li>
                </ul>
                <div className="bio-section margin-top-15">
                  <strong>Biography:</strong>
                  <p>{viewModalTeacher.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD NEW TEACHER QUICK MODAL */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Teacher Quick Form</h3>
              <button className="modal-close" onClick={() => setIsAddModalOpen(false)}><FaTimes /></button>
            </div>
            <div className="modal-body">
              <p>Switch to full editor or quick submit below:</p>
              <div className="form-group margin-top-15">
                <label>Teacher Full Name</label>
                <input 
                  type="text" 
                  placeholder="Enter teacher name"
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="form-group margin-top-15">
                <label>Email Address</label>
                <input 
                  type="email" 
                  placeholder="Enter teacher email"
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="modal-actions margin-top-15">
                <button className="btn-save" onClick={() => { setIsAddModalOpen(false); setActiveTab('add_edit'); }}>
                  Open Full Editor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherList;