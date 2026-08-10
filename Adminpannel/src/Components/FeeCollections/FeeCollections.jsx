import React, { useState, useEffect } from 'react';
import './FeeCollections.css';

const dummyClasses = ['All Classes', 'Nursery', 'LKG', 'UKG', 'Class 1', 'Class 2', 'Class 3'];
const dummySections = ['All Sections', 'Section A', 'Section B', 'Section C'];
const dummyStudentsFilter = ['All Students', 'Aarav Kumar', 'Ananya Singh', 'Vivaan Sharma', 'Myra Patel', 'Rohan Verma', 'Siya Reddy', 'Kabir Joshi', 'Advika Nair'];
const dummyDates = ['May 2025', 'April 2025', 'March 2025', 'February 2025', 'January 2025'];

const trendDataByPeriod = {
  'This Year': [
    { month: 'Dec', value: '₹ 50K', num: 50000, x: 20, y: 150 },
    { month: 'Jan', value: '₹ 65K', num: 65000, x: 120, y: 110 },
    { month: 'Feb', value: '₹ 70K', num: 70000, x: 220, y: 100 },
    { month: 'Mar', value: '₹ 60K', num: 60000, x: 320, y: 120 },
    { month: 'Apr', value: '₹ 62K', num: 62000, x: 420, y: 115 },
    { month: 'May', value: '₹ 95K', num: 95000, x: 560, y: 50 },
  ],
  'Last Year': [
    { month: 'Dec', value: '₹ 40K', num: 40000, x: 20, y: 160 },
    { month: 'Jan', value: '₹ 55K', num: 55000, x: 120, y: 130 },
    { month: 'Feb', value: '₹ 50K', num: 50000, x: 220, y: 140 },
    { month: 'Mar', value: '₹ 58K', num: 58000, x: 320, y: 125 },
    { month: 'Apr', value: '₹ 60K', num: 60000, x: 420, y: 120 },
    { month: 'May', value: '₹ 80K', num: 80000, x: 560, y: 80 },
  ],
  'This Month': [
    { month: 'W1', value: '₹ 15K', num: 15000, x: 20, y: 165 },
    { month: 'W2', value: '₹ 22K', num: 22000, x: 120, y: 145 },
    { month: 'W3', value: '₹ 30K', num: 30000, x: 220, y: 130 },
    { month: 'W4', value: '₹ 35K', num: 35000, x: 320, y: 120 },
    { month: 'W5', value: '₹ 42K', num: 42000, x: 420, y: 105 },
    { month: 'W6', value: '₹ 50K', num: 50000, x: 560, y: 90 },
  ]
};

const initialStudentsData = [
  { id: 'STU1001', name: 'Aarav Kumar', class: 'Nursery', section: 'Section A', type: 'Monthly Fee', due: '₹ 2,500', paid: '₹ 2,500', status: 'Paid', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces' },
  { id: 'STU1002', name: 'Ananya Singh', class: 'LKG', section: 'Section B', type: 'Monthly Fee', due: '₹ 2,800', paid: '₹ 1,400', status: 'Partial', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces' },
  { id: 'STU1003', name: 'Vivaan Sharma', class: 'UKG', section: 'Section A', type: 'Monthly Fee', due: '₹ 2,800', paid: '₹ 0', status: 'Due', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces' },
  { id: 'STU1004', name: 'Myra Patel', class: 'Class 1', section: 'Section A', type: 'Quarterly Fee', due: '₹ 7,500', paid: '₹ 7,500', status: 'Paid', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces' },
  { id: 'STU1005', name: 'Rohan Verma', class: 'Class 1', section: 'Section B', type: 'Quarterly Fee', due: '₹ 7,500', paid: '₹ 3,000', status: 'Partial', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces' },
  { id: 'STU1006', name: 'Siya Reddy', class: 'Class 2', section: 'Section A', type: 'Monthly Fee', due: '₹ 3,000', paid: '₹ 0', status: 'Due', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces' },
  { id: 'STU1007', name: 'Kabir Joshi', class: 'Class 2', section: 'Section B', type: 'Monthly Fee', due: '₹ 3,000', paid: '₹ 3,000', status: 'Paid', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces' },
  { id: 'STU1008', name: 'Advika Nair', class: 'Class 3', section: 'Section A', type: 'Quarterly Fee', due: '₹ 8,000', paid: '₹ 4,000', status: 'Partial', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces' },
];

const FeeCollections = () => {
  const [activeTab, setActiveTab] = useState('Fee Collection');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openActionMenuId, setOpenActionMenuId] = useState(null);

  // Filter States
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [selectedSection, setSelectedSection] = useState('All Sections');
  const [selectedStudentFilter, setSelectedStudentFilter] = useState('All Students');
  const [selectedDateFilter, setSelectedDateFilter] = useState('May 2025');

  // Trend Chart State
  const [timeframe, setTimeframe] = useState('This Year');
  const [isTimeframeDropdownOpen, setIsTimeframeDropdownOpen] = useState(false);
  const [activeTrendPoint, setActiveTrendPoint] = useState(null);

  // Donut Hover State
  const [donutHoverState, setDonutHoverState] = useState({
    label: 'Total Collection',
    value: '₹ 8,75,200'
  });

  // Form State
  const [formData, setFormData] = useState({
    student: '',
    classSection: '',
    feeType: '',
    collectionDate: '2025-05-20',
    dueAmount: '',
    paidAmountInput: '',
    paidAmountWords: '',
    discount: '0',
    lateFee: '0',
    totalAmount: '',
    paymentMethod: '',
    transactionId: '',
    remarks: ''
  });

  const recentPayments = [
    { name: 'Aarav Kumar', class: 'Nursery - A', time: 'Today, 10:30 AM', amount: '₹ 2,500', mode: 'Cash', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces' },
    { name: 'Myra Patel', class: 'Class 1 - A', time: 'Today, 09:45 AM', amount: '₹ 7,500', mode: 'Online', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces' },
    { name: 'Kabir Joshi', class: 'Class 2 - B', time: 'Today, 09:15 AM', amount: '₹ 3,000', mode: 'UPI', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces' },
    { name: 'Ananya Singh', class: 'LKG - B', time: 'Yesterday, 04:20 PM', amount: '₹ 1,400', mode: 'Cash', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces' },
  ];

  // Lock Body Scroll when Modal is Open
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('fee-collections-body-scroll-lock');
    } else {
      document.body.classList.remove('fee-collections-body-scroll-lock');
    }
    return () => {
      document.body.classList.remove('fee-collections-body-scroll-lock');
    };
  }, [isModalOpen]);

  // Handle Outside Click for Action Menus
  useEffect(() => {
    const handleGlobalClick = () => {
      setOpenActionMenuId(null);
      setIsTimeframeDropdownOpen(false);
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleActionMenu = (e, id) => {
    e.stopPropagation();
    setOpenActionMenuId(prev => (prev === id ? null : id));
  };

  // Filter Table Data dynamically based on active filter choices
  const filteredStudents = initialStudentsData.filter(student => {
    const matchesClass = selectedClass === 'All Classes' || student.class === selectedClass;
    const matchesSection = selectedSection === 'All Sections' || student.section === selectedSection;
    const matchesStudent = selectedStudentFilter === 'All Students' || student.name === selectedStudentFilter;
    const matchesSearch = searchQuery === '' || 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      student.id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesClass && matchesSection && matchesStudent && matchesSearch;
  });

  // Calculate SVG Path dynamically for trend chart
  const currentTrendPoints = trendDataByPeriod[timeframe] || trendDataByPeriod['This Year'];
  const svgPathD = currentTrendPoints.reduce((acc, point, idx) => {
    return idx === 0 ? `M ${point.x} ${point.y}` : `${acc} L ${point.x} ${point.y}`;
  }, '');
  const svgAreaD = `${svgPathD} L ${currentTrendPoints[currentTrendPoints.length - 1].x} 170 L ${currentTrendPoints[0].x} 170 Z`;

  return (
    <div className="fee-collections-dashboard-container">
      {/* Top Header */}
      <header className="fee-collections-header">
        <div className="fee-collections-header-title-group">
          <h1 className="fee-collections-main-title">Fee Collection</h1>
          <p className="fee-collections-subtitle">Track and manage student fee payments</p>
        </div>
      </header>

      {/* Metrics Grid */}
      <section className="fee-collections-metrics-grid">
        <div className="fee-collections-metric-card fee-collections-metric-purple">
          <div className="fee-collections-metric-header">
            <span className="fee-collections-metric-title">Total Collection</span>
            <div className="fee-collections-metric-icon-box purple-bg">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
            </div>
          </div>
          <div className="fee-collections-metric-value">₹ 8,75,200</div>
          <div className="fee-collections-metric-footer">
            <span className="fee-collections-subtext">This Month</span>
            <div className="fee-collections-trend-chart-mini purple-line"></div>
          </div>
          <div className="fee-collections-metric-trend positive">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"/></svg>
            <span>12.5% from last month</span>
          </div>
        </div>

        <div className="fee-collections-metric-card fee-collections-metric-green">
          <div className="fee-collections-metric-header">
            <span className="fee-collections-metric-title">Total Due</span>
            <div className="fee-collections-metric-icon-box green-bg">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            </div>
          </div>
          <div className="fee-collections-metric-value">₹ 2,45,800</div>
          <div className="fee-collections-metric-footer">
            <span className="fee-collections-subtext">From 68 Students</span>
            <div className="fee-collections-trend-chart-mini green-line"></div>
          </div>
          <div className="fee-collections-metric-trend negative">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
            <span>5.3% from last month</span>
          </div>
        </div>

        <div className="fee-collections-metric-card fee-collections-metric-yellow">
          <div className="fee-collections-metric-header">
            <span className="fee-collections-metric-title">Total Students</span>
            <div className="fee-collections-metric-icon-box yellow-bg">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
            </div>
          </div>
          <div className="fee-collections-metric-value">256</div>
          <div className="fee-collections-metric-footer">
            <span className="fee-collections-subtext">All Classes</span>
            <span className="fee-collections-dot-divider">—</span>
          </div>
          <div className="fee-collections-metric-trend neutral">
            <span>Active Students</span>
          </div>
        </div>

        <div className="fee-collections-metric-card fee-collections-metric-blue">
          <div className="fee-collections-metric-header">
            <span className="fee-collections-metric-title">Collected Today</span>
            <div className="fee-collections-metric-icon-box blue-bg">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
          </div>
          <div className="fee-collections-metric-value">₹ 35,400</div>
          <div className="fee-collections-metric-footer">
            <span className="fee-collections-subtext">8 Payments</span>
          </div>
          <div className="fee-collections-metric-trend positive">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"/></svg>
            <span>8.1% from yesterday</span>
          </div>
        </div>

        <div className="fee-collections-metric-card fee-collections-metric-red">
          <div className="fee-collections-metric-header">
            <span className="fee-collections-metric-title">Overdue Students</span>
            <div className="fee-collections-metric-icon-box red-bg">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            </div>
          </div>
          <div className="fee-collections-metric-value">42</div>
          <div className="fee-collections-metric-footer">
            <span className="fee-collections-subtext">Need Attention</span>
          </div>
          <div className="fee-collections-metric-action-link" onClick={() => alert("Redirecting to Overdue Students details...")}>
            <span>View Details</span>
          </div>
        </div>
      </section>

      {/* Navigation Sub-Tabs & Collect Fee Button */}
      <div className="fee-collections-nav-bar">
        <div className="fee-collections-tabs">
          {['Fee Collection', 'Due Fees', 'Payment History', 'Fee Structure'].map((tab) => (
            <button
              key={tab}
              className={`fee-collections-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <button className="fee-collections-collect-fee-btn" onClick={() => setIsModalOpen(true)}>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
          Collect Fee
        </button>
      </div>

      {/* Main Content Layout Grid */}
      <div className="fee-collections-content-grid">
        {/* Left Section */}
        <div className="fee-collections-main-section">
          {/* Filters Bar */}
          <div className="fee-collections-filters-bar">
            {/* All Classes Filter */}
            <div className="fee-collections-filter-dropdown">
              <select 
                className="fee-collections-select"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                {dummyClasses.map((item, i) => (
                  <option key={i} value={item}>{item}</option>
                ))}
              </select>
            </div>

            {/* All Sections Filter */}
            <div className="fee-collections-filter-dropdown">
              <select 
                className="fee-collections-select"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
              >
                {dummySections.map((item, i) => (
                  <option key={i} value={item}>{item}</option>
                ))}
              </select>
            </div>

            {/* All Students Filter */}
            <div className="fee-collections-filter-dropdown">
              <select 
                className="fee-collections-select"
                value={selectedStudentFilter}
                onChange={(e) => setSelectedStudentFilter(e.target.value)}
              >
                {dummyStudentsFilter.map((item, i) => (
                  <option key={i} value={item}>{item}</option>
                ))}
              </select>
            </div>

            {/* Calendar Filter */}
            <div className="fee-collections-filter-dropdown fee-collections-date-dropdown-wrapper">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              <select 
                className="fee-collections-select fee-collections-date-select"
                value={selectedDateFilter}
                onChange={(e) => setSelectedDateFilter(e.target.value)}
              >
                {dummyDates.map((d, i) => (
                  <option key={i} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Search Input Box */}
            <div className="fee-collections-search-box">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <input
                type="text"
                placeholder="Search student..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Student Table */}
          <div className="fee-collections-table-container">
            <table className="fee-collections-table">
              <thead>
                <tr>
                  <th>Student <span className="fee-collections-sort-icon">↕</span></th>
                  <th>Class & Section</th>
                  <th>Fee Type</th>
                  <th>Due Amount</th>
                  <th>Paid Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((item) => (
                    <tr key={item.id} className="fee-collections-table-row">
                      <td>
                        <div className="fee-collections-student-cell">
                          <img src={item.avatar} alt={item.name} className="fee-collections-student-avatar" />
                          <div className="fee-collections-student-info">
                            <span className="fee-collections-student-name">{item.name}</span>
                            <span className="fee-collections-student-id">ID: {item.id}</span>
                          </div>
                        </div>
                      </td>
                      <td><span className="fee-collections-text-regular">{item.class} - {item.section.replace('Section ', '')}</span></td>
                      <td><span className="fee-collections-text-regular">{item.type}</span></td>
                      <td><span className="fee-collections-text-amount">{item.due}</span></td>
                      <td><span className="fee-collections-text-amount">{item.paid}</span></td>
                      <td>
                        <span className={`fee-collections-badge fee-collections-badge-${item.status.toLowerCase()}`}>
                          {item.status === 'Paid' && <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
                          {item.status === 'Partial' && <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>}
                          {item.status === 'Due' && <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>}
                          {item.status}
                        </span>
                      </td>
                      <td className="fee-collections-action-cell">
                        <button 
                          className="fee-collections-action-dots-btn" 
                          aria-label="More actions"
                          onClick={(e) => toggleActionMenu(e, item.id)}
                        >
                          <span>•</span><span>•</span><span>•</span>
                        </button>
                        {openActionMenuId === item.id && (
                          <div className="fee-collections-action-popup-menu" onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => alert(`View Receipt for ${item.name}`)}>View Receipt</button>
                            <button onClick={() => alert(`Print Invoice for ${item.name}`)}>Print Invoice</button>
                            <button onClick={() => alert(`Reminder Sent to ${item.name}`)}>Send Reminder</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="fee-collections-no-data">No students found matching filters</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Pagination */}
          <div className="fee-collections-pagination-bar">
            <span className="fee-collections-pagination-info">Showing {filteredStudents.length} of {initialStudentsData.length} entries</span>
            <div className="fee-collections-pagination-controls">
              <button className="fee-collections-page-arrow" disabled>&lt;</button>
              <button className="fee-collections-page-num active">1</button>
              <button className="fee-collections-page-num">2</button>
              <button className="fee-collections-page-num">3</button>
              <span className="fee-collections-page-dots">...</span>
              <button className="fee-collections-page-num">32</button>
              <button className="fee-collections-page-arrow">&gt;</button>
            </div>
          </div>

          {/* Live Collection Trend Chart Section */}
          <div className="fee-collections-card fee-collections-trend-section">
            <div className="fee-collections-card-header">
              <h3 className="fee-collections-card-title">Collection Trend</h3>
              
              {/* Interactive Dropdown for Year / Timeframe */}
              <div 
                className="fee-collections-card-filter-pill-wrapper"
                onClick={(e) => { e.stopPropagation(); setIsTimeframeDropdownOpen(!isTimeframeDropdownOpen); }}
              >
                <div className="fee-collections-card-filter-pill">
                  <span>{timeframe}</span>
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                </div>
                {isTimeframeDropdownOpen && (
                  <div className="fee-collections-timeframe-dropdown">
                    <div onClick={() => setTimeframe('This Year')}>This Year</div>
                    <div onClick={() => setTimeframe('Last Year')}>Last Year</div>
                    <div onClick={() => setTimeframe('This Month')}>This Month</div>
                  </div>
                )}
              </div>
            </div>

            <div className="fee-collections-trend-chart-body">
              <div className="fee-collections-trend-y-axis">
                <span>₹ 100K</span>
                <span>₹ 80K</span>
                <span>₹ 60K</span>
                <span>₹ 40K</span>
                <span>₹ 20K</span>
                <span>₹ 0</span>
              </div>
              <div className="fee-collections-trend-graph-area">
                <svg className="fee-collections-svg-line-chart" viewBox="0 0 600 180" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Fill Area */}
                  <path d={svgAreaD} fill="url(#chartGradient)" />
                  
                  {/* Line */}
                  <path d={svgPathD} fill="none" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Interactive Circles */}
                  {currentTrendPoints.map((pt, idx) => (
                    <g key={idx}>
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={activeTrendPoint?.month === pt.month ? "7" : "4"}
                        fill="#7C3AED"
                        stroke="#ffffff"
                        strokeWidth="2"
                        className="fee-collections-chart-point"
                        onMouseEnter={() => setActiveTrendPoint(pt)}
                        onMouseLeave={() => setActiveTrendPoint(null)}
                      />
                    </g>
                  ))}
                </svg>

                {/* Interactive Dynamic Hover Tooltip */}
                {activeTrendPoint && (
                  <div 
                    className="fee-collections-chart-tooltip"
                    style={{ left: `${(activeTrendPoint.x / 600) * 100}%`, top: `${activeTrendPoint.y - 35}px` }}
                  >
                    <strong>{activeTrendPoint.month}</strong>: {activeTrendPoint.value}
                  </div>
                )}

                <div className="fee-collections-trend-x-axis">
                  {currentTrendPoints.map((pt, idx) => (
                    <span key={idx}>{pt.month}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="fee-collections-sidebar-section">
          {/* Fee Collection Overview Donut Chart */}
          <div className="fee-collections-card">
            <h3 className="fee-collections-card-title">Fee Collection Overview</h3>
            <div className="fee-collections-donut-container">
              <div className="fee-collections-donut-chart-box">
                <div className="fee-collections-donut-hole">
                  <span className="fee-collections-donut-center-val">{donutHoverState.value}</span>
                  <span className="fee-collections-donut-center-lbl">{donutHoverState.label}</span>
                </div>
              </div>
              <div className="fee-collections-donut-legend">
                <div 
                  className="fee-collections-legend-item"
                  onMouseEnter={() => setDonutHoverState({ label: 'Collected Fee', value: '₹ 8,75,200' })}
                  onMouseLeave={() => setDonutHoverState({ label: 'Total Collection', value: '₹ 8,75,200' })}
                >
                  <span className="fee-collections-legend-dot collected"></span>
                  <div className="fee-collections-legend-text">
                    <span className="fee-collections-legend-label">Collected</span>
                    <span className="fee-collections-legend-value">₹ 8,75,200 (72%)</span>
                  </div>
                </div>

                <div 
                  className="fee-collections-legend-item"
                  onMouseEnter={() => setDonutHoverState({ label: 'Due Amount', value: '₹ 2,45,800' })}
                  onMouseLeave={() => setDonutHoverState({ label: 'Total Collection', value: '₹ 8,75,200' })}
                >
                  <span className="fee-collections-legend-dot due"></span>
                  <div className="fee-collections-legend-text">
                    <span className="fee-collections-legend-label">Due</span>
                    <span className="fee-collections-legend-value">₹ 2,45,800 (20%)</span>
                  </div>
                </div>

                <div 
                  className="fee-collections-legend-item"
                  onMouseEnter={() => setDonutHoverState({ label: 'Overdue Amount', value: '₹ 95,600' })}
                  onMouseLeave={() => setDonutHoverState({ label: 'Total Collection', value: '₹ 8,75,200' })}
                >
                  <span className="fee-collections-legend-dot overdue"></span>
                  <div className="fee-collections-legend-text">
                    <span className="fee-collections-legend-label">Overdue</span>
                    <span className="fee-collections-legend-value">₹ 95,600 (8%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions List */}
          <div className="fee-collections-card">
            <h3 className="fee-collections-card-title">Quick Actions</h3>
            <div className="fee-collections-quick-actions-list">
              <div className="fee-collections-quick-action-item" onClick={() => setIsModalOpen(true)}>
                <div className="fee-collections-qa-icon purple-bg">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
                </div>
                <div className="fee-collections-qa-info">
                  <span className="fee-collections-qa-title">Collect Fee</span>
                  <span className="fee-collections-qa-desc">Add new payment</span>
                </div>
              </div>

              <div className="fee-collections-quick-action-item" onClick={() => alert('Fee Reminder System Opening...')}>
                <div className="fee-collections-qa-icon purple-bg">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                </div>
                <div className="fee-collections-qa-info">
                  <span className="fee-collections-qa-title">Fee Reminder</span>
                  <span className="fee-collections-qa-desc">Send reminder to parents</span>
                </div>
              </div>

              <div className="fee-collections-quick-action-item" onClick={() => alert('Generating PDF Fee Report...')}>
                <div className="fee-collections-qa-icon purple-bg">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                </div>
                <div className="fee-collections-qa-info">
                  <span className="fee-collections-qa-title">Fee Report</span>
                  <span className="fee-collections-qa-desc">Download fee report</span>
                </div>
              </div>

              <div className="fee-collections-quick-action-item" onClick={() => alert('Opening Fee Structure Settings...')}>
                <div className="fee-collections-qa-icon purple-bg">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                </div>
                <div className="fee-collections-qa-info">
                  <span className="fee-collections-qa-title">Fee Structure</span>
                  <span className="fee-collections-qa-desc">Manage fee structure</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Payments Section */}
          <div className="fee-collections-card">
            <div className="fee-collections-card-header">
              <h3 className="fee-collections-card-title">Recent Payments</h3>
              <span className="fee-collections-card-link" onClick={() => alert('Loading All Recent Payments History...')}>View All</span>
            </div>
            <div className="fee-collections-recent-list">
              {recentPayments.map((payment, idx) => (
                <div 
                  key={idx} 
                  className="fee-collections-recent-item"
                  onClick={() => alert(`Student Payment Detail:\nName: ${payment.name}\nClass: ${payment.class}\nAmount: ${payment.amount}\nMode: ${payment.mode}`)}
                >
                  <img src={payment.avatar} alt={payment.name} className="fee-collections-recent-avatar" />
                  <div className="fee-collections-recent-info">
                    <span className="fee-collections-recent-name">{payment.name}</span>
                    <span className="fee-collections-recent-sub">{payment.class} • {payment.time}</span>
                  </div>
                  <div className="fee-collections-recent-amount-box">
                    <span className="fee-collections-recent-amount">{payment.amount}</span>
                    <span className={`fee-collections-payment-mode ${payment.mode.toLowerCase()}`}>{payment.mode}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Note Banner */}
          <div className="fee-collections-card fee-collections-important-note-card">
            <div className="fee-collections-note-header">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <h4 className="fee-collections-note-title">Important Note</h4>
            </div>
            <p className="fee-collections-note-desc">
              Send fee reminders to parents to ensure timely payments before the due date. Avoid late fees.
            </p>
            <div className="fee-collections-note-footer-content">
              <button className="fee-collections-note-action-btn" onClick={() => alert('Reminders Sent to All Overdue Parents!')}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                Send Reminder
              </button>
              <div className="fee-collections-note-illustration">
                <span className="fee-collections-emoji-megaphone">📢</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Collect Fee Popup Modal */}
      {isModalOpen && (
        <div className="fee-collections-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="fee-collections-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="fee-collections-modal-header">
              <div className="fee-collections-modal-title-group">
                <div className="fee-collections-modal-icon-box">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                </div>
                <div>
                  <h2 className="fee-collections-modal-title">Collect Fee</h2>
                  <p className="fee-collections-modal-subtitle">Add a new fee collection for a student</p>
                </div>
              </div>
              <button className="fee-collections-modal-close-btn" onClick={() => setIsModalOpen(false)}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>

            <div className="fee-collections-modal-body">
              <div className="fee-collections-form-grid">
                {/* Column 1 */}
                <div className="fee-collections-form-column">
                  <div className="fee-collections-form-group">
                    <label className="fee-collections-label">Student *</label>
                    <div className="fee-collections-input-wrapper">
                      <span className="fee-collections-input-icon"><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg></span>
                      <select name="student" value={formData.student} onChange={handleInputChange} className="fee-collections-input with-icon with-arrow">
                        <option value="">Select Student</option>
                        <option value="Aarav Kumar">Aarav Kumar (STU1001)</option>
                        <option value="Ananya Singh">Ananya Singh (STU1002)</option>
                        <option value="Vivaan Sharma">Vivaan Sharma (STU1003)</option>
                      </select>
                    </div>
                  </div>

                  <div className="fee-collections-form-group">
                    <label className="fee-collections-label">Class & Section *</label>
                    <div className="fee-collections-input-wrapper">
                      <span className="fee-collections-input-icon"><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg></span>
                      <select name="classSection" value={formData.classSection} onChange={handleInputChange} className="fee-collections-input with-icon with-arrow">
                        <option value="">Select Class & Section</option>
                        <option value="Nursery - A">Nursery - A</option>
                        <option value="LKG - B">LKG - B</option>
                        <option value="UKG - A">UKG - A</option>
                      </select>
                    </div>
                  </div>

                  <div className="fee-collections-form-group">
                    <label className="fee-collections-label">Fee Type *</label>
                    <div className="fee-collections-input-wrapper">
                      <span className="fee-collections-input-icon"><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg></span>
                      <select name="feeType" value={formData.feeType} onChange={handleInputChange} className="fee-collections-input with-icon with-arrow">
                        <option value="">Select Fee Type</option>
                        <option value="Monthly Fee">Monthly Fee</option>
                        <option value="Quarterly Fee">Quarterly Fee</option>
                      </select>
                    </div>
                  </div>

                  <div className="fee-collections-form-group">
                    <label className="fee-collections-label">Due Amount (₹) *</label>
                    <div className="fee-collections-input-wrapper">
                      <span className="fee-collections-input-icon">₹</span>
                      <input type="text" name="dueAmount" placeholder="Enter due amount" value={formData.dueAmount} onChange={handleInputChange} className="fee-collections-input with-icon" />
                    </div>
                  </div>

                  <div className="fee-collections-form-group">
                    <label className="fee-collections-label">Paid Amount (₹) *</label>
                    <div className="fee-collections-input-wrapper">
                      <span className="fee-collections-input-icon">₹</span>
                      <input type="text" name="paidAmountInput" placeholder="Enter paid amount" value={formData.paidAmountInput} onChange={handleInputChange} className="fee-collections-input with-icon" />
                    </div>
                  </div>

                  <div className="fee-collections-form-group">
                    <label className="fee-collections-label">Payment Method *</label>
                    <div className="fee-collections-input-wrapper">
                      <span className="fee-collections-input-icon"><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg></span>
                      <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange} className="fee-collections-input with-icon with-arrow">
                        <option value="">Select Payment Method</option>
                        <option value="Cash">Cash</option>
                        <option value="Online">Online / UPI</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="fee-collections-form-column">
                  <div className="fee-collections-form-group">
                    <label className="fee-collections-label">Collection Date *</label>
                    <div className="fee-collections-input-wrapper">
                      <span className="fee-collections-input-icon"><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></span>
                      <input type="date" name="collectionDate" value={formData.collectionDate} onChange={handleInputChange} className="fee-collections-input with-icon" />
                    </div>
                  </div>

                  <div className="fee-collections-form-group">
                    <label className="fee-collections-label">Paid Amount (in words)</label>
                    <div className="fee-collections-input-wrapper">
                      <span className="fee-collections-input-icon">Aa</span>
                      <input type="text" name="paidAmountWords" placeholder="Enter amount in words" value={formData.paidAmountWords} onChange={handleInputChange} className="fee-collections-input with-icon" />
                    </div>
                  </div>

                  <div className="fee-collections-form-group">
                    <label className="fee-collections-label">Discount (₹)</label>
                    <div className="fee-collections-input-wrapper">
                      <span className="fee-collections-input-icon">%</span>
                      <input type="text" name="discount" placeholder="Enter discount amount" value={formData.discount} onChange={handleInputChange} className="fee-collections-input with-icon" />
                    </div>
                  </div>

                  <div className="fee-collections-form-group">
                    <label className="fee-collections-label">Late Fee (₹)</label>
                    <div className="fee-collections-input-wrapper">
                      <span className="fee-collections-input-icon"><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></span>
                      <input type="text" name="lateFee" placeholder="Enter late fee amount" value={formData.lateFee} onChange={handleInputChange} className="fee-collections-input with-icon" />
                    </div>
                  </div>

                  <div className="fee-collections-form-group">
                    <label className="fee-collections-label">Total Amount (₹)</label>
                    <div className="fee-collections-input-wrapper">
                      <span className="fee-collections-input-icon"><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg></span>
                      <input type="text" name="totalAmount" placeholder="0" value={formData.totalAmount} onChange={handleInputChange} className="fee-collections-input with-icon" />
                    </div>
                  </div>

                  <div className="fee-collections-form-group">
                    <label className="fee-collections-label">Payment Reference / Transaction ID</label>
                    <div className="fee-collections-input-wrapper">
                      <span className="fee-collections-input-icon"><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg></span>
                      <input type="text" name="transactionId" placeholder="Enter reference or transaction ID" value={formData.transactionId} onChange={handleInputChange} className="fee-collections-input with-icon" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Remarks */}
              <div className="fee-collections-form-group full-width">
                <label className="fee-collections-label">Remarks (Optional)</label>
                <div className="fee-collections-input-wrapper">
                  <span className="fee-collections-input-icon"><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg></span>
                  <input type="text" name="remarks" placeholder="Add any remarks" value={formData.remarks} onChange={handleInputChange} className="fee-collections-input with-icon" />
                </div>
              </div>

              <div className="fee-collections-modal-footer-note">
                <span>* All required fields must be populated before submitting.</span>
              </div>
            </div>

            <div className="fee-collections-modal-footer">
              <button className="fee-collections-btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="fee-collections-btn-save" onClick={() => { alert('Fee Collection Saved Successfully!'); setIsModalOpen(false); }}>Save Collection</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeeCollections;