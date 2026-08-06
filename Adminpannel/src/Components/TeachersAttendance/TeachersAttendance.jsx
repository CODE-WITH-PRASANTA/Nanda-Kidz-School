import React, { useState } from 'react';
import {
  FaUserFriends,
  FaUserCheck,
  FaUserTimes,
  FaCalendarMinus,
  FaClock,
  FaSearch,
  FaFilter,
  FaDownload,
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaEllipsisV,
  FaTimes,
  FaCheck,
  FaCalendarAlt
} from 'react-icons/fa';
import './TeachersAttendance.css';

const INITIAL_TEACHERS = [
  {
    id: 1,
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    name: 'Anita Sharma',
    code: 'TCH001',
    department: 'Primary Wing',
    punchIn: '08:02 AM',
    punchInLocation: 'Main Gate',
    punchOut: '04:15 PM',
    punchOutLocation: 'Main Gate',
    workingHours: '08h 13m',
    status: 'Present',
    attendancePct: 100
  },
  {
    id: 2,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    name: 'Rohit Verma',
    code: 'TCH002',
    department: 'Secondary Wing',
    punchIn: '08:05 AM',
    punchInLocation: 'Main Gate',
    punchOut: '04:02 PM',
    punchOutLocation: 'Main Gate',
    workingHours: '07h 57m',
    status: 'Present',
    attendancePct: 98
  },
  {
    id: 3,
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150',
    name: 'Priya Nair',
    code: 'TCH003',
    department: 'Primary Wing',
    punchIn: '08:10 AM',
    punchInLocation: 'Main Gate',
    punchOut: '04:20 PM',
    punchOutLocation: 'Main Gate',
    workingHours: '08h 10m',
    status: 'Present',
    attendancePct: 100
  },
  {
    id: 4,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    name: 'Sandeep Kumar',
    code: 'TCH004',
    department: 'Secondary Wing',
    punchIn: '-',
    punchInLocation: '',
    punchOut: '-',
    punchOutLocation: '',
    workingHours: '00h 00m',
    status: 'Absent',
    attendancePct: 0
  },
  {
    id: 5,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    name: 'Meena Iyer',
    code: 'TCH005',
    department: 'Pre-Primary Wing',
    punchIn: '08:18 AM',
    punchInLocation: 'Main Gate',
    punchOut: '01:30 PM',
    punchOutLocation: 'Main Gate',
    workingHours: '05h 12m',
    status: 'Half Day',
    attendancePct: 50
  },
  {
    id: 6,
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    name: 'Vikram Singh',
    code: 'TCH006',
    department: 'Secondary Wing',
    punchIn: '09:00 AM',
    punchInLocation: 'Main Gate',
    punchOut: '-',
    punchOutLocation: '',
    workingHours: '-',
    status: 'On Leave',
    attendancePct: 0
  },
  {
    id: 7,
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    name: 'Neha Joshi',
    code: 'TCH007',
    department: 'Primary Wing',
    punchIn: '08:00 AM',
    punchInLocation: 'Main Gate',
    punchOut: '04:05 PM',
    punchOutLocation: 'Main Gate',
    workingHours: '08h 05m',
    status: 'Present',
    attendancePct: 100
  },
  {
    id: 8,
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
    name: 'Arvind Patel',
    code: 'TCH008',
    department: 'Pre-Primary Wing',
    punchIn: '08:12 AM',
    punchInLocation: 'Main Gate',
    punchOut: '04:18 PM',
    punchOutLocation: 'Main Gate',
    workingHours: '08h 06m',
    status: 'Present',
    attendancePct: 100
  },
  {
    id: 9,
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
    name: 'Kavita Das',
    code: 'TCH009',
    department: 'Primary Wing',
    punchIn: '08:15 AM',
    punchInLocation: 'Main Gate',
    punchOut: '04:10 PM',
    punchOutLocation: 'Main Gate',
    workingHours: '07h 55m',
    status: 'Present',
    attendancePct: 95
  },
  {
    id: 10,
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150',
    name: 'Rajesh Gupta',
    code: 'TCH010',
    department: 'Secondary Wing',
    punchIn: '-',
    punchInLocation: '',
    punchOut: '-',
    punchOutLocation: '',
    workingHours: '00h 00m',
    status: 'Absent',
    attendancePct: 0
  }
];

const TeachersAttendance = () => {
  const [teachers, setTeachers] = useState(INITIAL_TEACHERS);
  const [selectedDate, setSelectedDate] = useState('2025-05-06');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination State (8 entries per page)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  // Active Menu / Modals
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [viewTeacherModal, setViewTeacherModal] = useState(null);
  const [editTeacherModal, setEditTeacherModal] = useState(null);

  // Stats Calculations
  const totalTeachers = teachers.length;
  const presentCount = teachers.filter((t) => t.status === 'Present').length;
  const absentCount = teachers.filter((t) => t.status === 'Absent').length;
  const leaveCount = teachers.filter((t) => t.status === 'On Leave' || t.status === 'Half Day').length;

  const presentPct = totalTeachers > 0 ? ((presentCount / totalTeachers) * 100).toFixed(2) : 0;
  const absentPct = totalTeachers > 0 ? ((absentCount / totalTeachers) * 100).toFixed(2) : 0;
  const leavePct = totalTeachers > 0 ? ((leaveCount / totalTeachers) * 100).toFixed(2) : 0;

  // Filter Logic
  const filteredTeachers = teachers.filter((teacher) => {
    const matchesDept =
      departmentFilter === 'All Departments' || teacher.department === departmentFilter;
    const matchesStatus =
      statusFilter === 'All Status' || teacher.status === statusFilter;
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.code.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesDept && matchesStatus && matchesSearch;
  });

  // Pagination Calculations
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTableData = filteredTeachers.slice(startIndex, startIndex + itemsPerPage);

  // Handlers
  const handleStatusChange = (id, newStatus) => {
    setTeachers((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          let updatedPct = t.attendancePct;
          if (newStatus === 'Present') updatedPct = 100;
          if (newStatus === 'Absent') updatedPct = 0;
          if (newStatus === 'Half Day') updatedPct = 50;
          if (newStatus === 'On Leave') updatedPct = 0;

          return { ...t, status: newStatus, attendancePct: updatedPct };
        }
        return t;
      })
    );
    setActiveMenuId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this teacher attendance record?')) {
      setTeachers((prev) => prev.filter((t) => t.id !== id));
      setActiveMenuId(null);
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setTeachers((prev) =>
      prev.map((t) => (t.id === editTeacherModal.id ? { ...editTeacherModal } : t))
    );
    setEditTeacherModal(null);
  };

  const handleExportCSV = () => {
    if (filteredTeachers.length === 0) {
      alert('No data to export.');
      return;
    }
    const headers = ['Teacher ID', 'Name', 'Department', 'Punch In', 'Punch Out', 'Working Hours', 'Status', 'Attendance %'];
    const rows = filteredTeachers.map((t) => [
      t.code,
      `"${t.name}"`,
      `"${t.department}"`,
      `"${t.punchIn}"`,
      `"${t.punchOut}"`,
      `"${t.workingHours}"`,
      `"${t.status}"`,
      `"${t.attendancePct}%"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Teachers_Attendance_${selectedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="attendance-container">
      {/* 5 OVERVIEW CARDS WITH HOVER */}
      <div className="stats-cards-grid">
        {/* Card 1 */}
        <div className="stat-card">
          <div className="stat-icon-wrapper purple">
            <FaUserFriends />
          </div>
          <div className="stat-details">
            <span className="stat-title">Total Teachers</span>
            <h2 className="stat-value">{totalTeachers}</h2>
            <span className="stat-subtitle">All Teachers</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="stat-card">
          <div className="stat-icon-wrapper green">
            <FaUserCheck />
          </div>
          <div className="stat-details">
            <span className="stat-title">Present Today</span>
            <h2 className="stat-value">{presentCount}</h2>
            <span className="stat-subtitle text-green">{presentPct}%</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="stat-card">
          <div className="stat-icon-wrapper red">
            <FaUserTimes />
          </div>
          <div className="stat-details">
            <span className="stat-title">Absent Today</span>
            <h2 className="stat-value">{absentCount}</h2>
            <span className="stat-subtitle text-red">{absentPct}%</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="stat-card">
          <div className="stat-icon-wrapper orange">
            <FaCalendarMinus />
          </div>
          <div className="stat-details">
            <span className="stat-title">On Leave</span>
            <h2 className="stat-value">{leaveCount}</h2>
            <span className="stat-subtitle text-orange">{leavePct}%</span>
          </div>
        </div>

        {/* Card 5 */}
        <div className="stat-card">
          <div className="stat-icon-wrapper light-purple">
            <FaClock />
          </div>
          <div className="stat-details">
            <span className="stat-title">Avg. Working Hours</span>
            <h2 className="stat-value">07h 32m</h2>
            <span className="stat-subtitle">Today Average</span>
          </div>
        </div>
      </div>

      {/* FILTER CONTROLS BAR */}
      <div className="filter-controls-card">
        <div className="filter-item date-picker-group">
          <label>Date</label>
          <div className="date-input-wrapper">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <FaCalendarAlt className="calendar-icon" />
          </div>
        </div>

        <div className="filter-item">
          <label>Department</label>
          <select
            value={departmentFilter}
            onChange={(e) => {
              setDepartmentFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All Departments">All Departments</option>
            <option value="Primary Wing">Primary Wing</option>
            <option value="Secondary Wing">Secondary Wing</option>
            <option value="Pre-Primary Wing">Pre-Primary Wing</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Status</label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All Status">All Status</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Half Day">Half Day</option>
            <option value="On Leave">On Leave</option>
          </select>
        </div>

        <div className="filter-item search-input-group">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search teacher..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <FaSearch className="search-icon" />
          </div>
        </div>

        <div className="filter-actions">
          <button className="btn-more-filters" title="More Filters">
            <FaFilter /> More Filters
          </button>
          <button className="btn-export" onClick={handleExportCSV}>
            <FaDownload /> Export
          </button>
        </div>
      </div>

      {/* MAIN TABLE CONTAINER */}
      <div className="table-card">
        <div className="table-header">
          <h3>Teachers Attendance List</h3>
          <p>View and manage teacher attendance details</p>
        </div>

        <div className="table-responsive-wrapper">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Teacher Name</th>
                <th>Department</th>
                <th>Punch In</th>
                <th>Punch Out</th>
                <th>Working Hours</th>
                <th>Status</th>
                <th>Attendance</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentTableData.length > 0 ? (
                currentTableData.map((teacher) => (
                  <tr key={teacher.id}>
                    {/* Teacher Profile */}
                    <td>
                      <div className="teacher-profile-cell">
                        <img src={teacher.photo} alt={teacher.name} className="teacher-avatar" />
                        <div className="profile-info">
                          <span className="teacher-name">{teacher.name}</span>
                          <span className="teacher-code">{teacher.code}</span>
                        </div>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="dept-cell">{teacher.department}</td>

                    {/* Punch In */}
                    <td>
                      <div className="punch-time-cell">
                        <span className="time-text">{teacher.punchIn}</span>
                        {teacher.punchInLocation && (
                          <span className="location-tag green-dot">• {teacher.punchInLocation}</span>
                        )}
                      </div>
                    </td>

                    {/* Punch Out */}
                    <td>
                      <div className="punch-time-cell">
                        <span className="time-text">{teacher.punchOut}</span>
                        {teacher.punchOutLocation && (
                          <span className="location-tag green-dot">• {teacher.punchOutLocation}</span>
                        )}
                      </div>
                    </td>

                    {/* Working Hours */}
                    <td>
                      <span
                        className={`working-hours-text ${
                          teacher.status === 'Present'
                            ? 'text-green'
                            : teacher.status === 'Half Day'
                            ? 'text-orange'
                            : teacher.status === 'Absent'
                            ? 'text-red'
                            : ''
                        }`}
                      >
                        {teacher.workingHours}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td>
                      <span className={`status-badge ${teacher.status.toLowerCase().replace(' ', '-')}`}>
                        • {teacher.status}
                      </span>
                    </td>

                    {/* Attendance Progress Bar */}
                    <td>
                      <div className="progress-cell">
                        <span className="pct-label">{teacher.attendancePct}%</span>
                        <div className="progress-bar-bg">
                          <div
                            className={`progress-fill ${
                              teacher.attendancePct >= 90
                                ? 'green'
                                : teacher.attendancePct >= 50
                                ? 'orange'
                                : 'red'
                            }`}
                            style={{ width: `${teacher.attendancePct}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    {/* Action Cell */}
                    <td>
                      <div className="action-buttons-group">
                        {/* View Button */}
                        <button
                          className="action-icon-btn"
                          title="View Details"
                          onClick={() => setViewTeacherModal(teacher)}
                        >
                          <FaEye />
                        </button>

                        {/* Edit Button */}
                        <button
                          className="action-icon-btn"
                          title="Edit Teacher"
                          onClick={() => setEditTeacherModal({ ...teacher })}
                        >
                          <FaEdit />
                        </button>

                        {/* Delete Button (Left of three dots) */}
                        <button
                          className="action-icon-btn delete-btn"
                          title="Delete Record"
                          onClick={() => handleDelete(teacher.id)}
                        >
                          <FaTrashAlt />
                        </button>

                        {/* Three Dots Menu Button */}
                        <div className="more-menu-wrapper">
                          <button
                            className="action-icon-btn menu-trigger"
                            title="Change Status"
                            onClick={() =>
                              setActiveMenuId(activeMenuId === teacher.id ? null : teacher.id)
                            }
                          >
                            <FaEllipsisV />
                          </button>

                          {/* Status Dropdown */}
                          {activeMenuId === teacher.id && (
                            <div className="status-dropdown-menu">
                              <div className="dropdown-title">Set Status</div>
                              <button
                                className={`dropdown-item ${teacher.status === 'Present' ? 'active' : ''}`}
                                onClick={() => handleStatusChange(teacher.id, 'Present')}
                              >
                                <span className="dot green"></span> Present
                              </button>
                              <button
                                className={`dropdown-item ${teacher.status === 'Absent' ? 'active' : ''}`}
                                onClick={() => handleStatusChange(teacher.id, 'Absent')}
                              >
                                <span className="dot red"></span> Absent
                              </button>
                              <button
                                className={`dropdown-item ${teacher.status === 'Half Day' ? 'active' : ''}`}
                                onClick={() => handleStatusChange(teacher.id, 'Half Day')}
                              >
                                <span className="dot orange"></span> Half Day
                              </button>
                              <button
                                className={`dropdown-item ${teacher.status === 'On Leave' ? 'active' : ''}`}
                                onClick={() => handleStatusChange(teacher.id, 'On Leave')}
                              >
                                <span className="dot purple"></span> On Leave
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
                  <td colSpan="8" className="no-data-cell">
                    No attendance records found matching filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <div className="pagination-footer">
          <div className="pagination-info">
            Showing {filteredTeachers.length > 0 ? startIndex + 1 : 0} to{' '}
            {Math.min(startIndex + itemsPerPage, filteredTeachers.length)} of {filteredTeachers.length}{' '}
            entries
          </div>

          <div className="pagination-controls">
            <button
              className="page-nav-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              &lt;
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              &gt;
            </button>

            <div className="per-page-selector">
              <span>Rows per page</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={8}>8</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* VIEW DETAILS MODAL */}
      {viewTeacherModal && (
        <div className="modal-overlay" onClick={() => setViewTeacherModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Teacher Attendance Details</h3>
              <button className="close-btn" onClick={() => setViewTeacherModal(null)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body profile-modal-body">
              <img
                src={viewTeacherModal.photo}
                alt={viewTeacherModal.name}
                className="modal-avatar"
              />
              <div className="profile-details-list">
                <h2>{viewTeacherModal.name}</h2>
                <span className="code-badge">{viewTeacherModal.code}</span>
                <hr className="divider" />
                <div className="detail-grid">
                  <p><strong>Department:</strong> {viewTeacherModal.department}</p>
                  <p><strong>Status:</strong> {viewTeacherModal.status}</p>
                  <p><strong>Punch In:</strong> {viewTeacherModal.punchIn}</p>
                  <p><strong>Punch Out:</strong> {viewTeacherModal.punchOut}</p>
                  <p><strong>Working Hours:</strong> {viewTeacherModal.workingHours}</p>
                  <p><strong>Attendance %:</strong> {viewTeacherModal.attendancePct}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT TEACHER MODAL */}
      {editTeacherModal && (
        <div className="modal-overlay" onClick={() => setEditTeacherModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Attendance Record</h3>
              <button className="close-btn" onClick={() => setEditTeacherModal(null)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="modal-body">
              <div className="form-group">
                <label>Teacher Name</label>
                <input
                  type="text"
                  value={editTeacherModal.name}
                  onChange={(e) =>
                    setEditTeacherModal({ ...editTeacherModal, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Department</label>
                <select
                  value={editTeacherModal.department}
                  onChange={(e) =>
                    setEditTeacherModal({ ...editTeacherModal, department: e.target.value })
                  }
                >
                  <option value="Primary Wing">Primary Wing</option>
                  <option value="Secondary Wing">Secondary Wing</option>
                  <option value="Pre-Primary Wing">Pre-Primary Wing</option>
                </select>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Punch In Time</label>
                  <input
                    type="text"
                    value={editTeacherModal.punchIn}
                    onChange={(e) =>
                      setEditTeacherModal({ ...editTeacherModal, punchIn: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Punch Out Time</label>
                  <input
                    type="text"
                    value={editTeacherModal.punchOut}
                    onChange={(e) =>
                      setEditTeacherModal({ ...editTeacherModal, punchOut: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Attendance Status</label>
                <select
                  value={editTeacherModal.status}
                  onChange={(e) =>
                    setEditTeacherModal({ ...editTeacherModal, status: e.target.value })
                  }
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Half Day">Half Day</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setEditTeacherModal(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  <FaCheck /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeachersAttendance;