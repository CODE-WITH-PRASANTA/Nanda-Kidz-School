import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  Zap,
  BookOpen,
  Users,
  ChevronDown,
  Settings,
  Edit3,
  Plus,
  Info,
  FileText,
  Printer,
  Mail,
  X,
  Clock3,
  Save,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./Schedule.css";

/* =========================================================
   HEADER
========================================================= */

const Header = () => (
  <header className="ct-header">
    <div className="ct-header-inner">
      <div className="ct-brand-container">
        <div className="ct-brand-icon">
          <CalendarDays size={20} />
        </div>

        <div>
          <h1 className="ct-brand-title">Class Timetable</h1>
          <p className="ct-brand-subtitle">
            Manage class schedules and academic periods
          </p>
        </div>
      </div>
    </div>
  </header>
);

/* =========================================================
   STAT CARD
========================================================= */

const StatCard = ({ icon: Icon, title, value, subtitle }) => (
  <div className="ct-stat-card">
    <div className="ct-stat-icon-wrapper">
      <Icon size={21} strokeWidth={2.2} />
    </div>

    <div className="ct-stat-content">
      <p className="ct-stat-title">{title}</p>
      <h3 className="ct-stat-value">{value}</h3>
      <p className="ct-stat-subtitle">{subtitle}</p>
    </div>
  </div>
);

/* =========================================================
   FILTER DROPDOWN
========================================================= */

const FilterDropdown = ({
  label,
  options,
  value,
  onChange,
}) => (
  <div className="ct-filter-group">
    <label className="ct-filter-label">{label}</label>

    <div className="ct-select-wrapper">
      <select
        className="ct-select"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <ChevronDown size={17} className="ct-select-icon" />
    </div>
  </div>
);

/* =========================================================
   ADD PERIOD MODAL
========================================================= */

const AddPeriodModal = ({
  isOpen,
  onClose,
  onAddPeriod,
}) => {
  const [formData, setFormData] = useState({
    day: "Monday",
    period: "Period 1",
    startTime: "08:00",
    endTime: "08:45",
    subject: "English",
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.startTime >= formData.endTime) {
      alert("End time must be later than start time.");
      return;
    }

    onAddPeriod(formData);

    setFormData({
      day: "Monday",
      period: "Period 1",
      startTime: "08:00",
      endTime: "08:45",
      subject: "English",
    });

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="ct-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            className="ct-modal-container"
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 26,
            }}
          >
            <button
              type="button"
              onClick={onClose}
              className="ct-modal-close"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="ct-modal-heading">
              <div className="ct-modal-heading-icon">
                <Plus size={19} />
              </div>

              <div>
                <h2 className="ct-modal-title">
                  Add Period
                </h2>

                <p className="ct-modal-desc">
                  Add a new subject period to the timetable.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="ct-modal-row">
                <div className="ct-modal-field">
                  <label className="ct-modal-label">
                    Day
                  </label>

                  <select
                    className="ct-modal-select"
                    value={formData.day}
                    onChange={(e) =>
                      updateField("day", e.target.value)
                    }
                  >
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                    ].map((day) => (
                      <option key={day}>{day}</option>
                    ))}
                  </select>
                </div>

                <div className="ct-modal-field">
                  <label className="ct-modal-label">
                    Period
                  </label>

                  <select
                    className="ct-modal-select"
                    value={formData.period}
                    onChange={(e) =>
                      updateField("period", e.target.value)
                    }
                  >
                    {[
                      "Period 1",
                      "Period 2",
                      "Period 3",
                      "Period 4",
                      "Period 5",
                      "Period 6",
                      "Period 7",
                    ].map((period) => (
                      <option key={period}>
                        {period}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="ct-modal-row">
                <div className="ct-modal-field">
                  <label className="ct-modal-label">
                    Start Time
                  </label>

                  <input
                    type="time"
                    className="ct-modal-input"
                    value={formData.startTime}
                    onChange={(e) =>
                      updateField(
                        "startTime",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="ct-modal-field">
                  <label className="ct-modal-label">
                    End Time
                  </label>

                  <input
                    type="time"
                    className="ct-modal-input"
                    value={formData.endTime}
                    onChange={(e) =>
                      updateField(
                        "endTime",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className="ct-modal-field ct-full-field">
                <label className="ct-modal-label">
                  Subject
                </label>

                <select
                  className="ct-modal-select"
                  value={formData.subject}
                  onChange={(e) =>
                    updateField(
                      "subject",
                      e.target.value
                    )
                  }
                >
                  {[
                    "English",
                    "Mathematics",
                    "Science",
                    "Computer",
                    "Hindi",
                    "Art",
                    "Moral Science",
                    "Sports",
                    "Library",
                    "EVS",
                    "Music",
                    "Activity",
                  ].map((subject) => (
                    <option key={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              <div className="ct-modal-actions">
                <button
                  type="button"
                  onClick={onClose}
                  className="ct-btn-cancel"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="ct-btn-submit"
                >
                  <Plus size={17} />
                  Add Period
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* =========================================================
   MANAGE MODAL
========================================================= */

const ManageModal = ({
  isOpen,
  onClose,
  selectedClass,
  setSelectedClass,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="ct-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            className="ct-modal-container"
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
          >
            <button
              type="button"
              onClick={onClose}
              className="ct-modal-close"
            >
              <X size={20} />
            </button>

            <div className="ct-modal-heading">
              <div className="ct-modal-heading-icon">
                <Settings size={19} />
              </div>

              <div>
                <h2 className="ct-modal-title">
                  Manage Timetables
                </h2>

                <p className="ct-modal-desc">
                  Configure and switch between active
                  class schedules.
                </p>
              </div>
            </div>

            <div className="ct-modal-field ct-manage-field">
              <label className="ct-modal-label">
                Select Active Timetable
              </label>

              <select
                className="ct-modal-select"
                value={selectedClass}
                onChange={(e) =>
                  setSelectedClass(e.target.value)
                }
              >
                <option value="Class 5 - A">
                  Class 5 - A
                </option>

                <option value="Class 5 - B">
                  Class 5 - B
                </option>

                <option value="Class 6 - A">
                  Class 6 - A
                </option>
              </select>
            </div>

            <div className="ct-modal-actions">
              <button
                type="button"
                onClick={onClose}
                className="ct-btn-submit"
              >
                <Check size={17} />
                Done
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* =========================================================
   MAIN SCHEDULE COMPONENT
========================================================= */

const Schedule = () => {
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [isManageModalOpen, setIsManageModalOpen] =
    useState(false);

  const [isEditing, setIsEditing] =
    useState(false);

  const [selectedClass, setSelectedClass] =
    useState("Class 5 - A");

  const [selectedSection, setSelectedSection] =
    useState("A");

  const [academicYear, setAcademicYear] =
    useState("2025 - 2026");

  const [viewMode, setViewMode] =
    useState("Weekly Timetable");

  const days = [
    "Time / Day",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [periods, setPeriods] = useState([
    {
      time: "08:00 AM - 08:45 AM",
      label: "Period 1",
      entries: [
        "English",
        "Mathematics",
        "Science",
        "English",
        "Mathematics",
        "EVS",
      ],
    },

    {
      time: "08:45 AM - 09:30 AM",
      label: "Period 2",
      entries: [
        "Mathematics",
        "Science",
        "English",
        "Mathematics",
        "Science",
        "Computer",
      ],
    },

    {
      time: "09:30 AM - 10:15 AM",
      label: "Period 3",
      entries: [
        "Science",
        "English",
        "Mathematics",
        "EVS",
        "Science",
        "Hindi",
      ],
    },

    {
      type: "break",
      name: "Short Break",
      colspan: 7,
    },

    {
      time: "10:30 AM - 11:15 AM",
      label: "Period 4",
      entries: [
        "Hindi",
        "Computer",
        "EVS",
        "Science",
        "Hindi",
        "Mathematics",
      ],
    },

    {
      time: "11:15 AM - 12:00 PM",
      label: "Period 5",
      entries: [
        "Computer",
        "Hindi",
        "EVS",
        "Computer",
        "Art",
        "English",
      ],
    },

    {
      type: "break",
      name: "Lunch Break",
      colspan: 7,
    },

    {
      time: "12:45 PM - 01:30 PM",
      label: "Period 6",
      entries: [
        "Art",
        "Sports",
        "Music",
        "Hindi",
        "Moral Science",
        "Sports",
      ],
    },

    {
      time: "01:30 PM - 02:15 PM",
      label: "Period 7",
      entries: [
        "Moral Science",
        "Library",
        "Art",
        "Music",
        "Library",
        "Activity",
      ],
    },
  ]);

  const teachersMap = {
    English: "Ms. Priya Nair",
    Mathematics: "Mr. Rohit Verma",
    Science: "Ms. Anita Sharma",
    Computer: "Mr. Vikram Singh",
    Hindi: "Ms. Neha Joshi",
    Art: "Mr. Sandeep Kumar",
    "Moral Science": "Ms. Meena Iyer",
    Sports: "Mr. Arvind Patel",
    Library: "Ms. Priya Nair",
    Activity: "All Teachers",
    EVS: "Ms. Meena Iyer",
    Music: "Mr. Devdas",
  };

  const subjectOptions =
    Object.keys(teachersMap);

  /* =====================================================
     VIEW MODE
  ===================================================== */

  const activeDay = "Monday";

  const visibleDays = useMemo(() => {
    if (viewMode === "Daily Timetable") {
      return ["Time / Day", activeDay];
    }

    return days;
  }, [viewMode]);

  /* =====================================================
     CHANGE SUBJECT
  ===================================================== */

  const handleCellChange = (
    periodIndex,
    dayIndex,
    newSubject
  ) => {
    setPeriods((prev) =>
      prev.map((period, index) => {
        if (
          index !== periodIndex ||
          period.type === "break"
        ) {
          return period;
        }

        const updatedEntries = [
          ...period.entries,
        ];

        updatedEntries[dayIndex] =
          newSubject;

        return {
          ...period,
          entries: updatedEntries,
        };
      })
    );
  };

  /* =====================================================
     ADD PERIOD
  ===================================================== */

  const handleAddPeriod = (newEntry) => {
    const dayIndex = days.indexOf(
      newEntry.day
    );

    if (dayIndex === -1) {
      alert("Invalid day selected.");
      return;
    }

    const timeLabel = `${formatTime(
      newEntry.startTime
    )} - ${formatTime(newEntry.endTime)}`;

    setPeriods((prev) => {
      const existingPeriodIndex =
        prev.findIndex(
          (period) =>
            period.label ===
              newEntry.period &&
            period.type !== "break"
        );

      if (existingPeriodIndex !== -1) {
        return prev.map(
          (period, index) => {
            if (
              index !==
              existingPeriodIndex
            ) {
              return period;
            }

            const updatedEntries = [
              ...period.entries,
            ];

            updatedEntries[
              dayIndex - 1
            ] = newEntry.subject;

            return {
              ...period,
              entries: updatedEntries,
            };
          }
        );
      }

      const newEntries =
        Array(6).fill("Activity");

      newEntries[dayIndex - 1] =
        newEntry.subject;

      return [
        ...prev,
        {
          time: timeLabel,
          label: newEntry.period,
          entries: newEntries,
        },
      ];
    });

    alert(
      `${newEntry.subject} added for ${newEntry.day}.`
    );
  };

  /* =====================================================
     SAVE
  ===================================================== */

  const handleSave = () => {
    setIsEditing(false);

    alert(
      "Timetable changes saved successfully."
    );
  };

  /* =====================================================
     QUICK ACTIONS
  ===================================================== */

  const handleDownload = () => {
    alert("PDF download started!");
  };

  const handleEmail = () => {
    alert(
      "Email dispatched successfully!"
    );
  };

  return (
    <div className="ct-dashboard-wrapper">
      <Header />

      <AddPeriodModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        onAddPeriod={handleAddPeriod}
      />

      <ManageModal
        isOpen={isManageModalOpen}
        onClose={() =>
          setIsManageModalOpen(false)
        }
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
      />

      <main className="ct-main-content">

        {/* Breadcrumb */}

        <div className="ct-breadcrumb">
          <span>Dashboard</span>

          <span className="ct-breadcrumb-separator">
            /
          </span>

          <span>Classes</span>

          <span className="ct-breadcrumb-separator">
            /
          </span>

          <span className="current">
            Timetable
          </span>
        </div>

        {/* =================================================
            STATS
        ================================================= */}

        <section className="ct-stats-grid">

          <StatCard
            icon={BookOpen}
            title="Total Classes"
            value="26"
            subtitle="All Classes"
          />

          <StatCard
            icon={CalendarDays}
            title="Total Timetables"
            value="26"
            subtitle="This Academic Year"
          />

          <StatCard
            icon={Zap}
            title="Active Timetables"
            value="24"
            subtitle="Currently Running"
          />

          <StatCard
            icon={BookOpen}
            title="Total Subjects"
            value="58"
            subtitle="All Subjects"
          />

          <StatCard
            icon={Users}
            title="Total Teachers"
            value="32"
            subtitle="All Teachers"
          />

        </section>

        {/* =================================================
            FILTERS
        ================================================= */}

        <section className="ct-filter-section">

          <div className="ct-filters-container">

            <FilterDropdown
              label="Class"
              options={[
                "Class 5 - A",
                "Class 5 - B",
                "Class 6 - A",
              ]}
              value={selectedClass}
              onChange={setSelectedClass}
            />

            <FilterDropdown
              label="Section"
              options={[
                "A",
                "B",
                "C",
              ]}
              value={selectedSection}
              onChange={setSelectedSection}
            />

            <FilterDropdown
              label="Academic Year"
              options={[
                "2025 - 2026",
                "2024 - 2025",
              ]}
              value={academicYear}
              onChange={setAcademicYear}
            />

            <FilterDropdown
              label="View"
              options={[
                "Weekly Timetable",
                "Daily Timetable",
              ]}
              value={viewMode}
              onChange={setViewMode}
            />

          </div>

          <button
            className="ct-btn-manage"
            onClick={() =>
              setIsManageModalOpen(true)
            }
          >
            <Settings size={17} />

            <span>
              Manage Timetables
            </span>
          </button>

        </section>

        {/* =================================================
            CONTENT
        ================================================= */}

        <section className="ct-content-grid">

          {/* =================================================
              TIMETABLE
          ================================================= */}

          <div className="ct-timetable-card">

            <div className="ct-timetable-header">

              <div className="ct-timetable-title-wrapper">

                <div className="ct-title-icon">
                  <CalendarDays size={19} />
                </div>

                <div>

                  <h2>
                    {viewMode ===
                    "Daily Timetable"
                      ? `${activeDay} Timetable`
                      : "Weekly Timetable"}
                  </h2>

                  <p>
                    {selectedClass} •{" "}
                    {academicYear}
                  </p>

                </div>

              </div>

              <div className="ct-timetable-actions">

                <button
                  className={`ct-btn-secondary ${
                    isEditing
                      ? "active-editing"
                      : ""
                  }`}
                  onClick={() => {
                    if (isEditing) {
                      handleSave();
                    } else {
                      setIsEditing(true);
                    }
                  }}
                >
                  {isEditing ? (
                    <>
                      <Save size={16} />
                      <span>
                        Save Changes
                      </span>
                    </>
                  ) : (
                    <>
                      <Edit3 size={16} />
                      <span>
                        Edit Timetable
                      </span>
                    </>
                  )}
                </button>

                <button
                  onClick={() =>
                    setIsModalOpen(true)
                  }
                  className="ct-btn-primary"
                >
                  <Plus size={17} />

                  <span>
                    Add Period
                  </span>
                </button>

              </div>

            </div>

            {/* =================================================
                TABLE
            ================================================= */}

            <div className="ct-table-wrapper">

              <div className="ct-table-responsive">

                <table className="ct-table">

                  <thead>
                    <tr className="ct-thead-row">

                      {visibleDays.map(
                        (day, idx) => (
                          <th
                            key={day}
                            className={`ct-th ${
                              idx === 0
                                ? "ct-th-time"
                                : ""
                            }`}
                          >
                            {day}
                          </th>
                        )
                      )}

                    </tr>
                  </thead>

                  <tbody className="ct-tbody">

                    {periods.map(
                      (row, idx) => {

                        if (
                          row.type ===
                          "break"
                        ) {
                          return (
                            <tr
                              key={`${row.name}-${idx}`}
                              className="ct-break-row"
                            >
                              <td
                                colSpan={
                                  visibleDays.length
                                }
                                className="ct-break-cell"
                              >
                                <div className="ct-break-content">

                                  <Clock3
                                    size={15}
                                  />

                                  <span>
                                    {row.name}
                                  </span>

                                </div>
                              </td>
                            </tr>
                          );
                        }

                        return (
                          <tr
                            key={`${row.label}-${idx}`}
                            className="ct-tr"
                          >

                            <td className="ct-time-cell">

                              <div className="ct-time-badge">

                                <Clock3
                                  size={13}
                                />

                                <span>
                                  {row.time}
                                </span>

                              </div>

                              <div className="ct-period-text">
                                {row.label}
                              </div>

                            </td>

                            {row.entries
                              .map(
                                (
                                  subject,
                                  sIdx
                                ) => ({
                                  subject,
                                  sIdx,
                                })
                              )
                              .filter(
                                ({
                                  sIdx,
                                }) => {
                                  if (
                                    viewMode ===
                                    "Daily Timetable"
                                  ) {
                                    return (
                                      sIdx ===
                                      0
                                    );
                                  }

                                  return true;
                                }
                              )
                              .map(
                                ({
                                  subject,
                                  sIdx,
                                }) => (

                                  <td
                                    key={sIdx}
                                    className="ct-subject-td"
                                  >

                                    {isEditing ? (

                                      <select
                                        className="ct-inline-edit-select"
                                        value={
                                          subject
                                        }
                                        onChange={(
                                          e
                                        ) =>
                                          handleCellChange(
                                            idx,
                                            sIdx,
                                            e
                                              .target
                                              .value
                                          )
                                        }
                                      >

                                        {subjectOptions.map(
                                          (
                                            sub
                                          ) => (
                                            <option
                                              key={
                                                sub
                                              }
                                              value={
                                                sub
                                              }
                                            >
                                              {
                                                sub
                                              }
                                            </option>
                                          )
                                        )}

                                      </select>

                                    ) : (

                                      <div className="ct-subject-card">

                                        <div className="ct-subject-top">

                                          <span className="ct-subject-dot" />

                                          <div className="ct-subject-name">
                                            {subject}
                                          </div>

                                        </div>

                                        <div className="ct-teacher-name">
                                          {teachersMap[
                                            subject
                                          ] ||
                                            "Staff"}
                                        </div>

                                      </div>

                                    )}

                                  </td>

                                )
                              )}

                          </tr>
                        );
                      }
                    )}

                  </tbody>

                </table>

              </div>

            </div>

            {/* =================================================
                NOTE
            ================================================= */}

            <div className="ct-note-footer">

              <Info
                size={16}
                className="ct-note-icon"
              />

              <span>
                <strong>Note:</strong>{" "}
                Timetable is effective from
                01 May 2025. Changes sync
                instantly upon saving.
              </span>

            </div>

          </div>

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="ct-sidebar">

            {/* CLASS INFORMATION */}

            <div className="ct-sidebar-card">

              <div className="ct-sidebar-header">

                <div className="ct-sidebar-header-icon">
                  <BookOpen size={17} />
                </div>

                <h3>
                  Class Information
                </h3>

              </div>

              <div className="ct-sidebar-list">

                <div className="ct-sidebar-item">
                  <span className="label">
                    Class Context
                  </span>

                  <span className="value">
                    {selectedClass}
                  </span>
                </div>

                <div className="ct-sidebar-item">
                  <span className="label">
                    Academic Year
                  </span>

                  <span className="value">
                    {academicYear}
                  </span>
                </div>

                <div className="ct-sidebar-item">
                  <span className="label">
                    Class Teacher
                  </span>

                  <span className="value">
                    Ms. Priya Nair
                  </span>
                </div>

                <div className="ct-sidebar-item">
                  <span className="label">
                    Total Students
                  </span>

                  <span className="value">
                    32
                  </span>
                </div>

                <div className="ct-sidebar-item">
                  <span className="label">
                    Room No.
                  </span>

                  <span className="value">
                    101
                  </span>
                </div>

              </div>

            </div>

            {/* QUICK ACTIONS */}

            <div className="ct-sidebar-card">

              <div className="ct-sidebar-header">

                <div className="ct-sidebar-header-icon">
                  <Zap size={17} />
                </div>

                <h3>
                  Quick Actions
                </h3>

              </div>

              <div className="ct-actions-list">

                <button
                  className="ct-action-item highlight"
                  onClick={handleDownload}
                >

                  <div className="ct-action-icon">
                    <FileText size={18} />
                  </div>

                  <div>

                    <div className="action-title">
                      Download PDF
                    </div>

                    <div className="action-desc">
                      Download timetable as PDF
                    </div>

                  </div>

                </button>

                <button
                  className="ct-action-item"
                  onClick={() =>
                    window.print()
                  }
                >

                  <div className="ct-action-icon muted">
                    <Printer size={18} />
                  </div>

                  <div>

                    <div className="action-title">
                      Print Timetable
                    </div>

                    <div className="action-desc">
                      Print current timetable
                    </div>

                  </div>

                </button>

                <button
                  className="ct-action-item"
                  onClick={handleEmail}
                >

                  <div className="ct-action-icon muted">
                    <Mail size={18} />
                  </div>

                  <div>

                    <div className="action-title">
                      Email Timetable
                    </div>

                    <div className="action-desc">
                      Send to teachers & parents
                    </div>

                  </div>

                </button>

              </div>

            </div>

          </aside>

        </section>

      </main>
    </div>
  );
};

/* =========================================================
   TIME FORMATTER
========================================================= */

const formatTime = (time) => {
  if (!time) return "";

  const [hours, minutes] =
    time.split(":").map(Number);

  const suffix =
    hours >= 12 ? "PM" : "AM";

  const formattedHour =
    hours % 12 || 12;

  return `${String(
    formattedHour
  ).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")} ${suffix}`;
};

export default Schedule;