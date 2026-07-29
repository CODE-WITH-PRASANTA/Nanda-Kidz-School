import React from 'react';
import './Dashboard.css';
import {
  Users,
  UserCheck,
  GraduationCap,
  CalendarCheck,
  Receipt,
  Calendar,
  UserPlus,
  Bell,
  Image,
  FileText,
  Eye,
  MessageSquare
} from 'lucide-react';

const Dashboard = () => {
  // Interactive Handler for Action Buttons
  const handleActionClick = (actionName) => {
    alert(`${actionName} बटन पर सफलतापूर्वक क्लिक किया गया!`);
  };

  return (
    <div className="dashboard-container">
      {/* Top Header */}
      <div className="header-section">
        <div>
          <h1 className="welcome-title">Welcome back, Admin! 👋</h1>
          <p className="welcome-subtitle">Here's what's happening in your school today.</p>
        </div>
        <div className="date-badge">
          <Calendar className="calendar-icon" size={16} />
          <span>Tuesday, 29 July 2025</span>
        </div>
      </div>

      {/* Top 5 Metric Cards */}
      <div className="metrics-grid">
        <div className="metric-card card-purple">
          <div className="icon-wrapper"><Users size={22} /></div>
          <div>
            <p className="metric-label">Total Students</p>
            <h3 className="metric-value">1,248</h3>
            <p className="metric-trend">↑ 12 this month</p>
          </div>
        </div>

        <div className="metric-card card-green">
          <div className="icon-wrapper"><UserCheck size={22} /></div>
          <div>
            <p className="metric-label">Total Teachers</p>
            <h3 className="metric-value">86</h3>
            <p className="metric-trend">↑ 5 this month</p>
          </div>
        </div>

        <div className="metric-card card-blue">
          <div className="icon-wrapper"><GraduationCap size={22} /></div>
          <div>
            <p className="metric-label">Total Classes</p>
            <h3 className="metric-value">32</h3>
            <p className="metric-trend">↑ 2 this month</p>
          </div>
        </div>

        <div className="metric-card card-yellow">
          <div className="icon-wrapper"><CalendarCheck size={22} /></div>
          <div>
            <p className="metric-label">Today's Attendance</p>
            <h3 className="metric-value">92.5%</h3>
            <p className="metric-trend">↑ 3.2% from yesterday</p>
          </div>
        </div>

        <div className="metric-card card-pink">
          <div className="icon-wrapper"><Receipt size={22} /></div>
          <div>
            <p className="metric-label">Fees Collection</p>
            <h3 className="metric-value">₹3,45,230</h3>
            <p className="metric-trend">↑ 18% this month</p>
          </div>
        </div>
      </div>

      {/* Middle Grid */}
      <div className="middle-grid">
        {/* Attendance Overview */}
        <div className="card-box">
          <div className="card-header">
            <h2 className="card-title">Attendance Overview</h2>
            <select className="timeframe-select">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          <div className="chart-container">
            <svg className="svg-chart" viewBox="0 0 400 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,80 Q50,40 100,60 T200,30 T300,70 T400,20 L400,120 L0,120 Z" fill="url(#purpleGradient)" />
              <path d="M0,80 Q50,40 100,60 T200,30 T300,70 T400,20" fill="none" stroke="#8b5cf6" strokeWidth="3" />
              <circle cx="0" cy="80" r="4" fill="#8b5cf6" />
              <circle cx="66" cy="48" r="4" fill="#8b5cf6" />
              <circle cx="133" cy="62" r="4" fill="#8b5cf6" />
              <circle cx="200" cy="30" r="4" fill="#8b5cf6" />
              <circle cx="266" cy="65" r="4" fill="#8b5cf6" />
              <circle cx="333" cy="50" r="4" fill="#8b5cf6" />
              <circle cx="400" cy="20" r="4" fill="#8b5cf6" />
            </svg>
            <div className="chart-labels">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </div>

        {/* Students by Class */}
        <div className="card-box">
          <h2 className="card-title" style={{ marginBottom: '16px' }}>Students by Class</h2>
          <div className="donut-wrapper">
            <div className="donut-chart-container">
              <div className="donut-chart"></div>
              <div className="donut-center">
                <span className="donut-total">1,248</span>
                <span className="donut-sub">Total</span>
              </div>
            </div>
            <div className="legend-grid">
              <div className="legend-item"><span className="dot" style={{ backgroundColor: '#8b5cf6' }}></span><span className="legend-text">Pre Nursery</span><span className="legend-percent">15%</span></div>
              <div className="legend-item"><span className="dot" style={{ backgroundColor: '#3b82f6' }}></span><span className="legend-text">Nursery</span><span className="legend-percent">18%</span></div>
              <div className="legend-item"><span className="dot" style={{ backgroundColor: '#22c55e' }}></span><span className="legend-text">LKG</span><span className="legend-percent">20%</span></div>
              <div className="legend-item"><span className="dot" style={{ backgroundColor: '#f59e0b' }}></span><span className="legend-text">UKG</span><span className="legend-percent">17%</span></div>
              <div className="legend-item"><span className="dot" style={{ backgroundColor: '#ec4899' }}></span><span className="legend-text">Class 1</span><span className="legend-percent">15%</span></div>
              <div className="legend-item"><span className="dot" style={{ backgroundColor: '#a855f7' }}></span><span className="legend-text">Class 2</span><span className="legend-percent">15%</span></div>
            </div>
          </div>
        </div>

        {/* Recent Notices */}
        <div className="card-box">
          <div className="card-header">
            <h2 className="card-title">Recent Notices</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="list-container">
            <div className="list-item notice-rose">
              <div className="notice-icon"><FileText size={16} /></div>
              <div className="item-content">
                <h4 className="item-title">Summer Holiday Notice</h4>
                <p className="item-desc">Holiday from 10th May to 20th May</p>
              </div>
              <span className="item-time">2 days ago</span>
            </div>
            <div className="list-item notice-purple">
              <div className="notice-icon"><FileText size={16} /></div>
              <div className="item-content">
                <h4 className="item-title">Annual Day Celebration</h4>
                <p className="item-desc">Annual day on 25th May 2025</p>
              </div>
              <span className="item-time">3 days ago</span>
            </div>
            <div className="list-item notice-amber">
              <div className="notice-icon"><FileText size={16} /></div>
              <div className="item-content">
                <h4 className="item-title">Parent Meeting</h4>
                <p className="item-desc">Meeting on 5th May at 10:00 AM</p>
              </div>
              <span className="item-time">5 days ago</span>
            </div>
            <div className="list-item notice-blue">
              <div className="notice-icon"><FileText size={16} /></div>
              <div className="item-content">
                <h4 className="item-title">Fee Submission Reminder</h4>
                <p className="item-desc">Last date to submit fee is 10th May</p>
              </div>
              <span className="item-time">1 week ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="bottom-grid">
        {/* Recent Admissions */}
        <div className="card-box">
          <div className="card-header">
            <h2 className="card-title">Recent Admissions</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="list-container">
            {[
              { name: 'Aarav Sharma', class: 'Class LKG - A', date: '28 Jul 2025' },
              { name: 'Myra Singh', class: 'Class Nursery - B', date: '26 Jul 2025' },
              { name: 'Vihaan Patel', class: 'Class UKG - A', date: '25 Jul 2025' },
              { name: 'Ananya Verma', class: 'Class LKG - B', date: '24 Jul 2025' },
              { name: 'Kabir Gupta', class: 'Class Nursery - A', date: '22 Jul 2025' }
            ].map((item, i) => (
              <div key={i} className="list-item">
                <div className="avatar">{item.name[0]}</div>
                <div className="item-content">
                  <h4 className="item-title">{item.name}</h4>
                  <p className="item-desc">{item.class}</p>
                </div>
                <span className="item-time" style={{ marginRight: '6px' }}>{item.date}</span>
                <span className="tag-new">New</span>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="card-box">
          <div className="card-header">
            <h2 className="card-title">Today's Schedule</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="list-container">
            {[
              { time: '08:30 AM', title: 'Morning Assembly', sub: 'All Classes', bg: '#f3e8ff', color: '#6b21a8' },
              { time: '09:00 AM', title: 'English Class', sub: 'Class LKG - A', bg: '#dcfce7', color: '#15803d' },
              { time: '10:00 AM', title: 'Maths Class', sub: 'Class UKG - B', bg: '#dbeafe', color: '#1e40af' },
              { time: '11:00 AM', title: 'Drawing Activity', sub: 'Class Nursery - A', bg: '#ffe4e6', color: '#be123c' },
              { time: '12:00 PM', title: 'Lunch Break', sub: 'All Classes', bg: '#fef3c7', color: '#b45309' }
            ].map((item, i) => (
              <div key={i} className="list-item">
                <span className="time-badge" style={{ backgroundColor: item.bg, color: item.color }}>
                  {item.time}
                </span>
                <div className="item-content">
                  <h4 className="item-title">{item.title}</h4>
                  <p className="item-desc">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="card-box">
          <div className="card-header">
            <h2 className="card-title">Upcoming Events</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="list-container">
            {[
              { date: '05', month: 'AUG', title: 'Parent Teacher Meeting', day: 'Tuesday, 05 Aug 2025', bg: '#ffe4e6', color: '#be123c' },
              { date: '15', month: 'AUG', title: 'Independence Day Celebration', day: 'Friday, 15 Aug 2025', bg: '#dbeafe', color: '#1e40af' },
              { date: '25', month: 'AUG', title: 'Janmashtami Celebration', day: 'Monday, 25 Aug 2025', bg: '#fef3c7', color: '#b45309' },
              { date: '05', month: 'SEP', title: "Teacher's Day Celebration", day: 'Friday, 05 Sep 2025', bg: '#f3e8ff', color: '#6b21a8' }
            ].map((evt, i) => (
              <div key={i} className="list-item">
                <div className="date-box" style={{ backgroundColor: evt.bg, color: evt.color }}>
                  <span className="date-num">{evt.date}</span>
                  <span className="date-month">{evt.month}</span>
                </div>
                <div className="item-content">
                  <h4 className="item-title">{evt.title}</h4>
                  <p className="item-desc">{evt.day}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions and Stats Grid */}
      <div className="actions-stats-grid">
        {/* Quick Actions */}
        <div className="card-box">
          <h2 className="card-title" style={{ marginBottom: '16px' }}>Quick Actions</h2>
          <div className="actions-grid">
            {[
              { name: 'Add Student', icon: UserPlus, class: 'act-purple' },
              { name: 'Add Teacher', icon: UserCheck, class: 'act-green' },
              { name: 'Add Class', icon: GraduationCap, class: 'act-blue' },
              { name: 'Mark Attendance', icon: CalendarCheck, class: 'act-amber' },
              { name: 'Collect Fees', icon: Receipt, class: 'act-rose' },
              { name: 'Add Notice', icon: Bell, class: 'act-indigo' },
              { name: 'Add Event', icon: Calendar, class: 'act-teal' },
              { name: 'Upload Gallery', icon: Image, class: 'act-orange' },
              { name: 'Add Blog', icon: FileText, class: 'act-sky' }
            ].map((action, idx) => {
              const IconComp = action.icon;
              return (
                <button
                  key={idx}
                  className="action-btn"
                  onClick={() => handleActionClick(action.name)}
                >
                  <div className={`action-icon ${action.class}`}>
                    <IconComp size={20} />
                  </div>
                  <span>{action.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Website Statistics */}
        <div className="card-box">
          <div className="card-header">
            <h2 className="card-title">Website Statistics</h2>
            <select className="timeframe-select">
              <option>This Month</option>
            </select>
          </div>
          <div className="stats-cards">
            <div className="stat-card stat-purple">
              <Users size={18} color="#8b5cf6" style={{ margin: '0 auto 4px' }} />
              <p>Visitors</p>
              <h4>8,542</h4>
              <span>↑ 12.5%</span>
            </div>
            <div className="stat-card stat-green">
              <Eye size={18} color="#22c55e" style={{ margin: '0 auto 4px' }} />
              <p>Page Views</p>
              <h4>24,302</h4>
              <span>↑ 18.6%</span>
            </div>
            <div className="stat-card stat-amber">
              <MessageSquare size={18} color="#f59e0b" style={{ margin: '0 auto 4px' }} />
              <p>Messages</p>
              <h4>125</h4>
              <span>↑ 7.3%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;