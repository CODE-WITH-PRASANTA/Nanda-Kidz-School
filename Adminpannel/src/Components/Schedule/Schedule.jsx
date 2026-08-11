import React, { useState } from 'react';
import {
  LayoutGrid, CalendarDays, Zap, BookOpen, Users, Search, Bell, ChevronDown, 
  Settings, Edit3, Plus, Info, FileText, Printer, Mail, Copy, X, Clock3, Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Schedule.css';

// --- Header Component ---
const Header = () => (
  <header className="ct-header">
    <div className="ct-brand-container">
      <h1 className="ct-brand-title">Class Timetable</h1>
    </div>
  </header>
);

// --- Stat Card Component ---
const StatCard = ({ icon: Icon, title, value, subtitle }) => (
  <div className="ct-stat-card">
    <div className="ct-stat-icon-wrapper">
      <Icon size={22} />
    </div>
    <div>
      <p className="ct-stat-title">{title}</p>
      <h3 className="ct-stat-value">{value}</h3>
      <p className="ct-stat-subtitle">{subtitle}</p>
    </div>
  </div>
);

// --- Filter Dropdown Component ---
const FilterDropdown = ({ label, options, value, onChange }) => (
  <div className="ct-filter-group">
    <label className="ct-filter-label">{label}</label>
    <div className="ct-select-wrapper">
      <select className="ct-select" value={value} onChange={(e) => onChange && onChange(e.target.value)}>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <ChevronDown size={18} className="ct-select-icon" />
    </div>
  </div>
);

// --- Add Period Modal Component ---
const AddPeriodModal = ({ isOpen, onClose, onAddPeriod }) => {
  const [formData, setFormData] = useState({
    day: 'Monday',
    period: 'Period 1',
    startTime: '08:00',
    endTime: '08:45',
    subject: 'English',
  });

  const overlayVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPeriod(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="ct-modal-overlay" initial="hidden" animate="visible" exit="hidden" variants={overlayVariants}>
          <motion.div className="ct-modal-container" variants={modalVariants}>
            <button onClick={onClose} className="ct-modal-close"><X size={24} /></button>
            <h2 className="ct-modal-title">Add Period</h2>
            <form onSubmit={handleSubmit}>
              <div className="ct-modal-row">
                <div className="ct-modal-field">
                  <label className="ct-modal-label">Day</label>
                  <select className="ct-modal-select" value={formData.day} onChange={e => setFormData({...formData, day: e.target.value})}>
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div className="ct-modal-field">
                  <label className="ct-modal-label">Period</label>
                  <select className="ct-modal-select" value={formData.period} onChange={e => setFormData({...formData, period: e.target.value})}>
                    {["Period 1", "Period 2", "Period 3", "Period 4", "Period 5", "Period 6", "Period 7"].map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div className="ct-modal-row">
                <div className="ct-modal-field">
                  <label className="ct-modal-label">Start Time</label>
                  <input type="time" className="ct-modal-input" value={formData.startTime} onChange={e => setFormData({...formData, startTime: e.target.value})} />
                </div>
                <div className="ct-modal-field">
                  <label className="ct-modal-label">End Time</label>
                  <input type="time" className="ct-modal-input" value={formData.endTime} onChange={e => setFormData({...formData, endTime: e.target.value})} />
                </div>
              </div>
              <div className="ct-modal-row">
                <div className="ct-modal-field" style={{ width: '100%' }}>
                  <label className="ct-modal-label">Subject</label>
                  <select className="ct-modal-select" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}>
                    {["English", "Mathematics", "Science", "Computer", "Hindi", "Art", "Moral Science", "Sports", "Library", "EVS"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="ct-modal-actions">
                <button type="button" onClick={onClose} className="ct-btn-cancel">Cancel</button>
                <button type="submit" className="ct-btn-submit"><Plus size={18} /> Add Period</button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Manage Timetables Modal ---
const ManageModal = ({ isOpen, onClose, selectedClass, setSelectedClass }) => {
  if (!isOpen) return null;
  return (
    <div className="ct-modal-overlay">
      <motion.div className="ct-modal-container" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
        <button onClick={onClose} className="ct-modal-close"><X size={24} /></button>
        <h2 className="ct-modal-title">Manage Timetables</h2>
        <p className="ct-modal-desc">Configure and switch between active class schedules easily.</p>
        <div className="ct-modal-field" style={{ margin: '20px 0' }}>
          <label className="ct-modal-label">Select Active Timetable Context</label>
          <select 
            className="ct-modal-select" 
            value={selectedClass} 
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="Class 5 - A">Class 5 - A</option>
            <option value="Class 5 - B">Class 5 - B</option>
            <option value="Class 6 - A">Class 6 - A</option>
          </select>
        </div>
        <div className="ct-modal-actions">
          <button onClick={onClose} className="ct-btn-submit">Done</button>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main Schedule Component ---
const Schedule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedClass, setSelectedClass] = useState("Class 5 - A");

  const days = ["Time / Day", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const [periods, setPeriods] = useState([
    { time: "08:00 AM - 08:45 AM", label: "Period 1", entries: ["English", "Mathematics", "Science", "English", "Mathematics", "EVS"] },
    { time: "08:45 AM - 09:30 AM", label: "Period 2", entries: ["Mathematics", "Science", "English", "Mathematics", "Science", "Computer"] },
    { time: "09:30 AM - 10:15 AM", label: "Period 3", entries: ["Science", "English", "Mathematics", "EVS", "Science", "Hindi"] },
    { type: "break", name: "Short Break", colspan: 7 },
    { time: "10:30 AM - 11:15 AM", label: "Period 4", entries: ["Hindi", "Computer", "EVS", "Science", "Hindi", "Mathematics"] },
    { time: "11:15 AM - 12:00 PM", label: "Period 5", entries: ["Computer", "Hindi", "EVS", "Computer", "Art", "English"] },
    { type: "break", name: "Lunch Break", colspan: 7 },
    { time: "12:45 PM - 01:30 PM", label: "Period 6", entries: ["Art", "Sports", "Music", "Hindi", "Moral Science", "Sports"] },
    { time: "01:30 PM - 02:15 PM", label: "Period 7", entries: ["Moral Science", "Library", "Art", "Music", "Library", "Activity"] },
  ]);

  const teachersMap = {
    "English": "Ms. Priya Nair", "Mathematics": "Mr. Rohit Verma", "Science": "Ms. Anita Sharma",
    "Computer": "Mr. Vikram Singh", "Hindi": "Ms. Neha Joshi", "Art": "Mr. Sandeep Kumar",
    "Moral Science": "Ms. Meena Iyer", "Sports": "Mr. Arvind Patel", "Library": "Ms. Priya Nair",
    "Activity": "All Teachers", "EVS": "Ms. Meena Iyer", "Music": "Mr. Devdas"
  };

  const handleCellChange = (periodIndex, dayIndex, newSubject) => {
    const updated = [...periods];
    updated[periodIndex].entries[dayIndex] = newSubject;
    setPeriods(updated);
  };

  const handleAddPeriod = (newEntry) => {
    alert(`Period ${newEntry.period} for ${newEntry.day} (${newEntry.subject}) saved successfully!`);
  };

  return (
    <div className="ct-dashboard-wrapper">
      <Header />
      <AddPeriodModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddPeriod={handleAddPeriod} />
      <ManageModal isOpen={isManageModalOpen} onClose={() => setIsManageModalOpen(false)} selectedClass={selectedClass} setSelectedClass={setSelectedClass} />

      <main className="ct-main-content">
        <div className="ct-breadcrumb">
          <span>Dashboard</span> / <span>Classes</span> / <span className="current">Timetable</span>
        </div>

        {/* Stats Grid */}
        <section className="ct-stats-grid">
          <StatCard icon={BookOpen} title="Total Classes" value="26" subtitle="All Classes" />
          <StatCard icon={CalendarDays} title="Total Timetables" value="26" subtitle="This Academic Year" />
          <StatCard icon={Zap} title="Active Timetables" value="24" subtitle="Currently Running" />
          <StatCard icon={BookOpen} title="Total Subjects" value="58" subtitle="All Subjects" />
          <StatCard icon={Users} title="Total Teachers" value="32" subtitle="All Teachers" />
        </section>

        {/* Filter / Action Section */}
        <section className="ct-filter-section">
          <div className="ct-filters-container">
            <FilterDropdown label="Class" options={["Class 5 - A", "Class 5 - B", "Class 6 - A"]} value={selectedClass} onChange={setSelectedClass} />
            <FilterDropdown label="Section" options={["A", "B", "C"]} />
            <FilterDropdown label="Academic Year" options={["2025 - 2026", "2024 - 2025"]} />
            <FilterDropdown label="View" options={["Weekly Timetable", "Daily Timetable"]} />
          </div>
          <button className="ct-btn-manage" onClick={() => setIsManageModalOpen(true)}>
            <Settings size={18} /> Manage Timetables
          </button>
        </section>

        {/* Timetable Section */}
        <section className="ct-content-grid">
          <div className="ct-timetable-card">
            <div className="ct-timetable-header">
              <div className="ct-timetable-title-wrapper">
                <CalendarDays className="ct-icon-muted" size={20} />
                <h2>Weekly Timetable - {selectedClass}</h2>
              </div>
              <div className="ct-timetable-actions">
                <button className={`ct-btn-secondary ${isEditing ? 'active-editing' : ''}`} onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? <><Save size={16} /> Save Changes</> : <><Edit3 size={16} /> Edit Timetable</>}
                </button>
                <button onClick={() => setIsModalOpen(true)} className="ct-btn-primary">
                  <Plus size={16} /> Add Period
                </button>
              </div>
            </div>

            <div className="ct-table-responsive">
              <table className="ct-table">
                <thead>
                  <tr className="ct-thead-row">
                    {days.map((day, idx) => (<th key={idx} className="ct-th">{day}</th>))}
                  </tr>
                </thead>
                <tbody className="ct-tbody">
                  {periods.map((row, idx) => {
                    if (row.type === 'break') {
                      return (
                        <tr key={idx} className="ct-break-row">
                          <td colSpan={row.colspan} className="ct-break-cell">
                            <div className="ct-break-content"><Clock3 size={14} /> {row.name}</div>
                          </td>
                        </tr>
                      );
                    }
                    return (
                      <tr key={idx} className="ct-tr">
                        <td className="ct-time-cell">
                          <div className="ct-time-text">{row.time}</div>
                          <div className="ct-period-text">{row.label}</div>
                        </td>
                        {row.entries.map((subject, sIdx) => (
                          <td key={sIdx} className="ct-subject-td">
                            {isEditing ? (
                              <select 
                                className="ct-inline-edit-select" 
                                value={subject} 
                                onChange={(e) => handleCellChange(idx, sIdx, e.target.value)}
                              >
                                {Object.keys(teachersMap).map(sub => <option key={sub} value={sub}>{sub}</option>)}
                              </select>
                            ) : (
                              <div className="ct-subject-card">
                                <div className="ct-subject-name">{subject}</div>
                                <div className="ct-teacher-name">{teachersMap[subject] || "Staff"}</div>
                              </div>
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="ct-note-footer">
              <Info size={16} className="ct-note-icon" />
              <span><strong>Note:</strong> Timetable is effective from 01 May 2025. Changes sync instantly upon saving.</span>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="ct-sidebar">
            <div className="ct-sidebar-card">
              <div className="ct-sidebar-header">
                <BookOpen size={18} className="ct-sidebar-icon" />
                <h3>Class Information</h3>
              </div>
              <div className="ct-sidebar-list">
                <div className="ct-sidebar-item"><span className="label">Class Context</span><span className="value">{selectedClass}</span></div>
                <div className="ct-sidebar-item"><span className="label">Academic Year</span><span className="value">2025 - 2026</span></div>
                <div className="ct-sidebar-item"><span className="label">Class Teacher</span><span className="value">Ms. Priya Nair</span></div>
                <div className="ct-sidebar-item"><span className="label">Total Students</span><span className="value">32</span></div>
                <div className="ct-sidebar-item"><span className="label">Room No.</span><span className="value">101</span></div>
              </div>
            </div>

            <div className="ct-sidebar-card">
              <div className="ct-sidebar-header"><Zap size={18} className="ct-sidebar-icon" /><h3>Quick Actions</h3></div>
              <div className="ct-actions-list">
                <div className="ct-action-item highlight" onClick={() => alert("PDF download started!")}>
                  <FileText size={18} />
                  <div><div className="action-title">Download PDF</div><div className="action-desc">Download timetable as PDF</div></div>
                </div>
                <div className="ct-action-item" onClick={() => window.print()}>
                  <Printer size={18} className="ct-action-muted-icon" />
                  <div><div className="action-title">Print Timetable</div><div className="action-desc">Print current timetable</div></div>
                </div>
                <div className="ct-action-item" onClick={() => alert("Email dispatched successfully!")}>
                  <Mail size={18} className="ct-action-muted-icon" />
                  <div><div className="action-title">Email Timetable</div><div className="action-desc">Send to teachers & parents</div></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Schedule;