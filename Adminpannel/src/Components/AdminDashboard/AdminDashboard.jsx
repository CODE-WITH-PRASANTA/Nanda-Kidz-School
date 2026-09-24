import React, { useMemo, useState } from "react";
import "./AdminDashboard.css";

import {
  Users,
  UserCheck,
  GraduationCap,
  CalendarCheck,
  Receipt,
  Calendar,
  UserPlus,
  Bell,
  Image as ImageIcon,
  FileText,
  Eye,
  MessageSquare,
  ArrowUpRight,
  TrendingUp,
  MoreHorizontal,
  Clock3,
  CheckCircle2,
  Sparkles,
  X,
  ExternalLink,
  ChevronDown,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* =========================================================
   ATTENDANCE DATA
========================================================= */

const attendanceData = {
  "This Week": [
    { day: "Mon", attendance: 91, absent: 9 },
    { day: "Tue", attendance: 94, absent: 6 },
    { day: "Wed", attendance: 92, absent: 8 },
    { day: "Thu", attendance: 96, absent: 4 },
    { day: "Fri", attendance: 93, absent: 7 },
    { day: "Sat", attendance: 89, absent: 11 },
    { day: "Sun", attendance: 95, absent: 5 },
  ],

  "Last Week": [
    { day: "Mon", attendance: 88, absent: 12 },
    { day: "Tue", attendance: 91, absent: 9 },
    { day: "Wed", attendance: 90, absent: 10 },
    { day: "Thu", attendance: 93, absent: 7 },
    { day: "Fri", attendance: 95, absent: 5 },
    { day: "Sat", attendance: 87, absent: 13 },
    { day: "Sun", attendance: 92, absent: 8 },
  ],

  "This Month": [
    { day: "Week 1", attendance: 91, absent: 9 },
    { day: "Week 2", attendance: 93, absent: 7 },
    { day: "Week 3", attendance: 94, absent: 6 },
    { day: "Week 4", attendance: 92, absent: 8 },
  ],
};

/* =========================================================
   CLASS DATA
========================================================= */

const classData = [
  {
    name: "Pre Nursery",
    students: 187,
    percentage: 15,
    color: "#7658E8",
  },
  {
    name: "Nursery",
    students: 225,
    percentage: 18,
    color: "#3E88E5",
  },
  {
    name: "LKG",
    students: 250,
    percentage: 20,
    color: "#20B879",
  },
  {
    name: "UKG",
    students: 212,
    percentage: 17,
    color: "#F1A329",
  },
  {
    name: "Class 1",
    students: 187,
    percentage: 15,
    color: "#E6558A",
  },
  {
    name: "Class 2",
    students: 187,
    percentage: 15,
    color: "#9960E8",
  },
];

/* =========================================================
   WEBSITE STATISTICS
========================================================= */

const websiteStatsData = {
  "This Month": {
    visitors: "8,542",
    visitorsChange: "12.5%",
    pageViews: "24,302",
    pageViewsChange: "18.6%",
    messages: "125",
    messagesChange: "7.3%",
  },

  "Last Month": {
    visitors: "7,596",
    visitorsChange: "8.4%",
    pageViews: "20,481",
    pageViewsChange: "13.2%",
    messages: "116",
    messagesChange: "5.8%",
  },

  "This Year": {
    visitors: "96,842",
    visitorsChange: "22.4%",
    pageViews: "286,430",
    pageViewsChange: "25.8%",
    messages: "1,482",
    messagesChange: "14.6%",
  },
};

/* =========================================================
   RECENT ADMISSIONS
========================================================= */

const recentAdmissions = [
  {
    name: "Aarav Sharma",
    className: "Class LKG - A",
    date: "18 Sep 2026",
  },
  {
    name: "Myra Singh",
    className: "Class Nursery - B",
    date: "17 Sep 2026",
  },
  {
    name: "Vihaan Patel",
    className: "Class UKG - A",
    date: "16 Sep 2026",
  },
  {
    name: "Ananya Verma",
    className: "Class LKG - B",
    date: "15 Sep 2026",
  },
  {
    name: "Kabir Gupta",
    className: "Class Nursery - A",
    date: "13 Sep 2026",
  },
];

/* =========================================================
   NOTICES
========================================================= */

const notices = [
  {
    title: "Annual Day Celebration",
    description: "Annual day celebration on 25th September",
    time: "2 hours ago",
    icon: Sparkles,
    type: "purple",
  },
  {
    title: "Parent Teacher Meeting",
    description: "Meeting scheduled for 25th September",
    time: "5 hours ago",
    icon: Users,
    type: "amber",
  },
  {
    title: "Fee Submission Reminder",
    description: "Last date to submit monthly fee",
    time: "1 day ago",
    icon: Receipt,
    type: "blue",
  },
  {
    title: "School Holiday Notice",
    description: "School will remain closed on Monday",
    time: "2 days ago",
    icon: FileText,
    type: "rose",
  },
];

/* =========================================================
   SCHEDULE
========================================================= */

const scheduleData = [
  {
    time: "08:30 AM",
    title: "Morning Assembly",
    subtitle: "All Classes",
    type: "purple",
  },
  {
    time: "09:00 AM",
    title: "English Class",
    subtitle: "Class LKG - A",
    type: "green",
  },
  {
    time: "10:00 AM",
    title: "Maths Class",
    subtitle: "Class UKG - B",
    type: "blue",
  },
  {
    time: "11:00 AM",
    title: "Drawing Activity",
    subtitle: "Class Nursery - A",
    type: "rose",
  },
  {
    time: "12:00 PM",
    title: "Lunch Break",
    subtitle: "All Classes",
    type: "amber",
  },
];

/* =========================================================
   EVENTS
========================================================= */

const upcomingEvents = [
  {
    date: "25",
    month: "SEP",
    title: "Parent Teacher Meeting",
    day: "Friday, 25 Sep 2026",
    type: "rose",
  },
  {
    date: "02",
    month: "OCT",
    title: "Gandhi Jayanti Celebration",
    day: "Friday, 02 Oct 2026",
    type: "blue",
  },
  {
    date: "20",
    month: "OCT",
    title: "School Cultural Day",
    day: "Tuesday, 20 Oct 2026",
    type: "amber",
  },
  {
    date: "05",
    month: "SEP",
    title: "Teacher's Day Celebration",
    day: "Saturday, 05 Sep 2026",
    type: "purple",
  },
];

/* =========================================================
   QUICK ACTIONS
========================================================= */

const quickActions = [
  {
    name: "Add Student",
    icon: UserPlus,
    type: "purple",
  },
  {
    name: "Add Teacher",
    icon: UserCheck,
    type: "green",
  },
  {
    name: "Add Class",
    icon: GraduationCap,
    type: "blue",
  },
  {
    name: "Mark Attendance",
    icon: CalendarCheck,
    type: "amber",
  },
  {
    name: "Collect Fees",
    icon: Receipt,
    type: "rose",
  },
  {
    name: "Add Notice",
    icon: Bell,
    type: "indigo",
  },
  {
    name: "Add Event",
    icon: Calendar,
    type: "teal",
  },
  {
    name: "Upload Gallery",
    icon: ImageIcon,
    type: "orange",
  },
  {
    name: "Add Blog",
    icon: FileText,
    type: "sky",
  },
];

/* =========================================================
   ATTENDANCE TOOLTIP
========================================================= */

const AttendanceTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) {
    return null;
  }

  const data = payload[0]?.payload;

  return (
    <div className="AdminDashboard-chart-tooltip">
      <div className="AdminDashboard-tooltip-title">
        {label}
      </div>

      <div className="AdminDashboard-tooltip-row">
        <span className="AdminDashboard-tooltip-dot purple" />
        <span>Attendance</span>
        <strong>{data?.attendance}%</strong>
      </div>

      <div className="AdminDashboard-tooltip-row muted">
        <span className="AdminDashboard-tooltip-dot gray" />
        <span>Absent</span>
        <strong>{data?.absent}%</strong>
      </div>
    </div>
  );
};

/* =========================================================
   METRIC CARD
========================================================= */

const MetricCard = ({
  icon: Icon,
  title,
  value,
  trend,
  subtitle,
  type,
  onMore,
}) => {
  return (
    <div
      className={`AdminDashboard-metric-card AdminDashboard-metric-${type}`}
    >
      <div className="AdminDashboard-metric-top">
        <div className="AdminDashboard-metric-icon">
          <Icon size={23} strokeWidth={2.1} />
        </div>

        <button
          type="button"
          className="AdminDashboard-card-more"
          onClick={onMore}
          aria-label={`${title} details`}
        >
          <MoreHorizontal size={20} />
        </button>
      </div>

      <p className="AdminDashboard-metric-label">
        {title}
      </p>

      <h3 className="AdminDashboard-metric-value">
        {value}
      </h3>

      <div className="AdminDashboard-metric-bottom">
        <span className="AdminDashboard-metric-trend">
          <ArrowUpRight size={15} />
          {trend}
        </span>

        <span className="AdminDashboard-metric-subtitle">
          {subtitle}
        </span>
      </div>
    </div>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const AdminDashboard = () => {
  const [attendanceRange, setAttendanceRange] =
    useState("This Week");

  const [websiteRange, setWebsiteRange] =
    useState("This Month");

  const [hoveredClass, setHoveredClass] =
    useState(null);

  const [selectedClass, setSelectedClass] =
    useState(null);

  const [toastMessage, setToastMessage] =
    useState("");

  /* =======================================================
     DATE
  ======================================================= */

  const currentDate = useMemo(() => {
    return new Intl.DateTimeFormat("en-IN", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date());
  }, []);

  /* =======================================================
     ATTENDANCE
  ======================================================= */

  const currentAttendance =
    attendanceData[attendanceRange];

  const averageAttendance =
    currentAttendance.reduce(
      (sum, item) => sum + item.attendance,
      0
    ) / currentAttendance.length;

  /* =======================================================
     WEBSITE
  ======================================================= */

  const websiteData =
    websiteStatsData[websiteRange];

  /* =======================================================
     ACTIVE CLASS
  ======================================================= */

  const activeClassName =
    hoveredClass || selectedClass;

  const activeClassData =
    activeClassName
      ? classData.find(
          (item) =>
            item.name === activeClassName
        )
      : null;

  /* =======================================================
     TOAST
  ======================================================= */

  const showToast = (message) => {
    setToastMessage(message);

    window.clearTimeout(
      window.AdminDashboardToastTimer
    );

    window.AdminDashboardToastTimer =
      window.setTimeout(() => {
        setToastMessage("");
      }, 2600);
  };

  /* =======================================================
     CLASS SELECT
  ======================================================= */

  const handleClassSelect = (className) => {
    setSelectedClass((current) =>
      current === className
        ? null
        : className
    );
  };

  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <div className="AdminDashboard-container">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="AdminDashboard-header">
        <div className="AdminDashboard-header-content">

          <div className="AdminDashboard-header-copy">

            <div className="AdminDashboard-eyebrow">
              SCHOOL ADMINISTRATION
            </div>

            <h1 className="AdminDashboard-welcome-title">
              Welcome back, Admin
              <span>👋</span>
            </h1>

            <p className="AdminDashboard-welcome-subtitle">
              Here's what's happening in your
              school today.
            </p>

          </div>

          <div className="AdminDashboard-date-badge">

            <span className="AdminDashboard-date-icon">
              <Calendar size={20} />
            </span>

            <div>
              <span className="AdminDashboard-date-label">
                TODAY
              </span>

              <strong>
                {currentDate}
              </strong>
            </div>

          </div>

        </div>
      </header>

      {/* =================================================
          METRICS
      ================================================= */}

      <section className="AdminDashboard-metrics-grid">

        <MetricCard
          icon={Users}
          title="Total Students"
          value="1,248"
          trend="12"
          subtitle="this month"
          type="purple"
          onMore={() =>
            showToast(
              "Student statistics opened"
            )
          }
        />

        <MetricCard
          icon={UserCheck}
          title="Total Teachers"
          value="86"
          trend="5"
          subtitle="this month"
          type="green"
          onMore={() =>
            showToast(
              "Teacher statistics opened"
            )
          }
        />

        <MetricCard
          icon={GraduationCap}
          title="Total Classes"
          value="32"
          trend="2"
          subtitle="this month"
          type="blue"
          onMore={() =>
            showToast(
              "Class statistics opened"
            )
          }
        />

        <MetricCard
          icon={CalendarCheck}
          title="Today's Attendance"
          value={`${averageAttendance.toFixed(
            1
          )}%`}
          trend="3.2%"
          subtitle="from yesterday"
          type="amber"
          onMore={() =>
            showToast(
              "Attendance statistics opened"
            )
          }
        />

        <MetricCard
          icon={Receipt}
          title="Fees Collection"
          value="₹3,45,230"
          trend="18%"
          subtitle="this month"
          type="rose"
          onMore={() =>
            showToast(
              "Fee statistics opened"
            )
          }
        />

      </section>

      {/* =================================================
          MAIN GRID
      ================================================= */}

      <section className="AdminDashboard-main-grid">

        {/* =================================================
            ATTENDANCE
        ================================================= */}

        <div className="AdminDashboard-card AdminDashboard-attendance-card">

          <div className="AdminDashboard-card-header">

            <div>
              <div className="AdminDashboard-card-kicker">
                PERFORMANCE
              </div>

              <h2 className="AdminDashboard-card-title">
                Attendance Overview
              </h2>

              <p className="AdminDashboard-card-description">
                Daily student attendance
                percentage.
              </p>
            </div>

            <div className="AdminDashboard-select-wrap">

              <select
                className="AdminDashboard-select"
                value={attendanceRange}
                onChange={(e) =>
                  setAttendanceRange(
                    e.target.value
                  )
                }
              >
                <option>This Week</option>
                <option>Last Week</option>
                <option>This Month</option>
              </select>

              <ChevronDown
                size={16}
                className="AdminDashboard-select-arrow"
              />

            </div>

          </div>

          <div className="AdminDashboard-chart-summary">

            <div className="AdminDashboard-chart-average">

              <strong>
                {averageAttendance.toFixed(1)}%
              </strong>

              <span>
                Average attendance
              </span>

            </div>

            <div className="AdminDashboard-positive-summary">
              <TrendingUp size={17} />
              <span>3.2% vs previous</span>
            </div>

          </div>

          <div className="AdminDashboard-attendance-chart">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <AreaChart
                data={currentAttendance}
                margin={{
                  top: 12,
                  right: 12,
                  left: -16,
                  bottom: 0,
                }}
              >

                <defs>
                  <linearGradient
                    id="AdminDashboardAttendanceGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#7658E8"
                      stopOpacity={0.25}
                    />

                    <stop
                      offset="100%"
                      stopColor="#7658E8"
                      stopOpacity={0.015}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  vertical={false}
                  stroke="#E8ECF3"
                  strokeDasharray="5 6"
                />

                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#748198",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                  dy={11}
                />

                <YAxis
                  domain={[70, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#748198",
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                  tickFormatter={(value) =>
                    `${value}%`
                  }
                />

                <Tooltip
                  cursor={{
                    stroke: "#dcd8f8",
                    strokeDasharray: "4 4",
                  }}
                  content={
                    <AttendanceTooltip />
                  }
                />

                <Area
                  type="monotone"
                  dataKey="attendance"
                  stroke="#7658E8"
                  strokeWidth={3.5}
                  fill="url(#AdminDashboardAttendanceGradient)"
                  activeDot={{
                    r: 6,
                    fill: "#7658E8",
                    stroke: "#fff",
                    strokeWidth: 3,
                  }}
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

          <div className="AdminDashboard-chart-legend">

            <span>
              <i className="AdminDashboard-legend-dot purple" />
              Attendance
            </span>

            <span>
              <i className="AdminDashboard-legend-dot gray" />
              Target: 90%
            </span>

          </div>

        </div>

        {/* =================================================
            STUDENTS BY CLASS
        ================================================= */}

        <div className="AdminDashboard-card AdminDashboard-class-card">

          <div className="AdminDashboard-card-header">

            <div>
              <div className="AdminDashboard-card-kicker">
                ENROLLMENT
              </div>

              <h2 className="AdminDashboard-card-title">
                Students by Class
              </h2>

              <p className="AdminDashboard-card-description">
                Distribution of current students.
              </p>
            </div>

            <button
              type="button"
              className="AdminDashboard-icon-button"
              onClick={() =>
                showToast(
                  "Class enrollment details opened"
                )
              }
            >
              <MoreHorizontal size={20} />
            </button>

          </div>

          {/* =================================================
              CLASS CHART
          ================================================= */}

          <div className="AdminDashboard-class-chart-area">

            {/* PREMIUM HOVER TOOLTIP */}

            <div
              className={`AdminDashboard-class-hover-card ${
                activeClassData
                  ? "AdminDashboard-class-hover-visible"
                  : ""
              }`}
            >

              {activeClassData && (
                <>
                  <div
                    className="AdminDashboard-class-hover-color"
                    style={{
                      background:
                        activeClassData.color,
                    }}
                  />

                  <div className="AdminDashboard-class-hover-main">
                    <span>
                      {activeClassData.name}
                    </span>

                    <strong>
                      {activeClassData.students}
                    </strong>
                  </div>

                  <div className="AdminDashboard-class-hover-divider" />

                  <div className="AdminDashboard-class-hover-share">
                    <small>SHARE</small>

                    <b>
                      {activeClassData.percentage}%
                    </b>
                  </div>
                </>
              )}

            </div>

            {/* DONUT */}

            <div className="AdminDashboard-donut-wrapper">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={classData}
                    dataKey="students"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius="62%"
                    outerRadius="85%"
                    paddingAngle={4}
                    startAngle={90}
                    endAngle={-270}
                    stroke="#ffffff"
                    strokeWidth={4}
                    onMouseEnter={(entry) => {
                      setHoveredClass(
                        entry.name
                      );
                    }}
                    onMouseLeave={() => {
                      if (!selectedClass) {
                        setHoveredClass(null);
                      }
                    }}
                    onClick={(entry) => {
                      handleClassSelect(
                        entry.name
                      );
                    }}
                  >

                    {classData.map((entry) => {

                      const isActive =
                        activeClassName ===
                        entry.name;

                      return (
                        <Cell
                          key={entry.name}
                          fill={entry.color}
                          opacity={
                            activeClassName &&
                            !isActive
                              ? 0.22
                              : 1
                          }
                          style={{
                            cursor: "pointer",
                            transition:
                              "all 0.3s ease",
                            filter:
                              isActive
                                ? `drop-shadow(0 5px 10px ${entry.color}55)`
                                : "none",
                          }}
                        />
                      );
                    })}

                  </Pie>

                </PieChart>

              </ResponsiveContainer>

              {/* CENTER */}

              <div className="AdminDashboard-donut-center">

                <span className="AdminDashboard-donut-center-label">
                  TOTAL STUDENTS
                </span>

                <strong>1,248</strong>

                <span className="AdminDashboard-donut-center-sub">
                  Across all classes
                </span>

              </div>

            </div>

            {/* HELPER */}

            <div className="AdminDashboard-class-helper">

              <span className="AdminDashboard-class-helper-icon">
                <Users size={16} />
              </span>

              <div>
                <strong>6 active classes</strong>

                <span>
                  Hover over a class to explore
                  enrollment
                </span>
              </div>

            </div>

          </div>

          {/* =================================================
              CLASS LEGEND
          ================================================= */}

          <div className="AdminDashboard-class-legend">

            {classData.map((item) => {

              const isActive =
                activeClassName === item.name;

              return (
                <button
                  type="button"
                  key={item.name}
                  className={`AdminDashboard-class-legend-item ${
                    isActive
                      ? "AdminDashboard-class-selected"
                      : ""
                  }`}
                  onMouseEnter={() =>
                    setHoveredClass(item.name)
                  }
                  onMouseLeave={() => {
                    if (!selectedClass) {
                      setHoveredClass(null);
                    }
                  }}
                  onClick={() =>
                    handleClassSelect(
                      item.name
                    )
                  }
                >

                  <span
                    className="AdminDashboard-class-dot"
                    style={{
                      background: item.color,
                    }}
                  />

                  <span className="AdminDashboard-class-name">
                    {item.name}
                  </span>

                  <strong>
                    {item.students}
                  </strong>

                  <small>
                    {item.percentage}%
                  </small>

                </button>
              );
            })}

          </div>

        </div>

        {/* =================================================
            RECENT NOTICES
        ================================================= */}

        <div className="AdminDashboard-card">

          <div className="AdminDashboard-card-header">

            <div>
              <div className="AdminDashboard-card-kicker">
                COMMUNICATION
              </div>

              <h2 className="AdminDashboard-card-title">
                Recent Notices
              </h2>

              <p className="AdminDashboard-card-description">
                Latest school announcements.
              </p>
            </div>

            <button
              type="button"
              className="AdminDashboard-view-all"
              onClick={() =>
                showToast("Opening notices")
              }
            >
              View All
              <ArrowUpRight size={16} />
            </button>

          </div>

          <div className="AdminDashboard-list">

            {notices.map((notice) => {

              const Icon = notice.icon;

              return (
                <button
                  type="button"
                  className="AdminDashboard-list-item"
                  key={notice.title}
                  onClick={() =>
                    showToast(
                      `${notice.title} opened`
                    )
                  }
                >

                  <div
                    className={`AdminDashboard-notice-icon ${notice.type}`}
                  >
                    <Icon size={19} />
                  </div>

                  <div className="AdminDashboard-list-content">
                    <h4>{notice.title}</h4>

                    <p>
                      {notice.description}
                    </p>
                  </div>

                  <span className="AdminDashboard-list-time">
                    {notice.time}
                  </span>

                  <ArrowUpRight
                    className="AdminDashboard-row-arrow"
                    size={16}
                  />

                </button>
              );
            })}

          </div>

        </div>

      </section>

      {/* =================================================
          SECOND ROW
      ================================================= */}

      <section className="AdminDashboard-three-column-grid">

        {/* RECENT ADMISSIONS */}

        <div className="AdminDashboard-card">

          <div className="AdminDashboard-card-header">

            <div>
              <div className="AdminDashboard-card-kicker">
                ADMISSIONS
              </div>

              <h2 className="AdminDashboard-card-title">
                Recent Admissions
              </h2>
            </div>

            <button
              type="button"
              className="AdminDashboard-view-all"
              onClick={() =>
                showToast("Opening admissions")
              }
            >
              View All
              <ArrowUpRight size={16} />
            </button>

          </div>

          <div className="AdminDashboard-list">

            {recentAdmissions.map((item) => (
              <button
                type="button"
                className="AdminDashboard-list-item"
                key={item.name}
                onClick={() =>
                  showToast(
                    `${item.name} selected`
                  )
                }
              >

                <div className="AdminDashboard-avatar">
                  {item.name.charAt(0)}
                </div>

                <div className="AdminDashboard-list-content">

                  <h4>{item.name}</h4>

                  <p>{item.className}</p>

                </div>

                <div className="AdminDashboard-admission-right">

                  <span>{item.date}</span>

                  <b>New</b>

                </div>

                <ArrowUpRight
                  className="AdminDashboard-row-arrow"
                  size={16}
                />

              </button>
            ))}

          </div>

        </div>

        {/* SCHEDULE */}

        <div className="AdminDashboard-card">

          <div className="AdminDashboard-card-header">

            <div>
              <div className="AdminDashboard-card-kicker">
                TODAY
              </div>

              <h2 className="AdminDashboard-card-title">
                Today's Schedule
              </h2>
            </div>

            <button
              type="button"
              className="AdminDashboard-view-all"
              onClick={() =>
                showToast("Opening schedule")
              }
            >
              View All
              <ArrowUpRight size={16} />
            </button>

          </div>

          <div className="AdminDashboard-list">

            {scheduleData.map((item) => (
              <button
                type="button"
                className="AdminDashboard-list-item"
                key={item.time}
                onClick={() =>
                  showToast(
                    `${item.title} selected`
                  )
                }
              >

                <div
                  className={`AdminDashboard-time-badge ${item.type}`}
                >
                  <Clock3 size={14} />
                  {item.time}
                </div>

                <div className="AdminDashboard-list-content">

                  <h4>{item.title}</h4>

                  <p>{item.subtitle}</p>

                </div>

                <ArrowUpRight
                  className="AdminDashboard-row-arrow"
                  size={16}
                />

              </button>
            ))}

          </div>

        </div>

        {/* EVENTS */}

        <div className="AdminDashboard-card">

          <div className="AdminDashboard-card-header">

            <div>
              <div className="AdminDashboard-card-kicker">
                CALENDAR
              </div>

              <h2 className="AdminDashboard-card-title">
                Upcoming Events
              </h2>
            </div>

            <button
              type="button"
              className="AdminDashboard-view-all"
              onClick={() =>
                showToast("Opening events")
              }
            >
              View All
              <ArrowUpRight size={16} />
            </button>

          </div>

          <div className="AdminDashboard-list">

            {upcomingEvents.map((event) => (
              <button
                type="button"
                className="AdminDashboard-list-item"
                key={event.title}
                onClick={() =>
                  showToast(
                    `${event.title} selected`
                  )
                }
              >

                <div
                  className={`AdminDashboard-event-date ${event.type}`}
                >
                  <strong>{event.date}</strong>

                  <span>{event.month}</span>
                </div>

                <div className="AdminDashboard-list-content">

                  <h4>{event.title}</h4>

                  <p>{event.day}</p>

                </div>

                <ArrowUpRight
                  className="AdminDashboard-row-arrow"
                  size={16}
                />

              </button>
            ))}

          </div>

        </div>

      </section>

      {/* =================================================
          BOTTOM
      ================================================= */}

      <section className="AdminDashboard-bottom-grid">

        {/* QUICK ACTIONS */}

        <div className="AdminDashboard-card">

          <div className="AdminDashboard-card-header">

            <div>

              <div className="AdminDashboard-card-kicker">
                SHORTCUTS
              </div>

              <h2 className="AdminDashboard-card-title">
                Quick Actions
              </h2>

              <p className="AdminDashboard-card-description">
                Quickly access common
                administrative tasks.
              </p>

            </div>

          </div>

          <div className="AdminDashboard-actions-grid">

            {quickActions.map((action) => {

              const Icon = action.icon;

              return (
                <button
                  type="button"
                  key={action.name}
                  className="AdminDashboard-action-button"
                  onClick={() =>
                    showToast(
                      `${action.name} selected`
                    )
                  }
                >

                  <span
                    className={`AdminDashboard-action-icon ${action.type}`}
                  >
                    <Icon size={23} />
                  </span>

                  <span className="AdminDashboard-action-name">
                    {action.name}
                  </span>

                  <ArrowUpRight
                    size={16}
                    className="AdminDashboard-action-arrow"
                  />

                </button>
              );
            })}

          </div>

        </div>

        {/* WEBSITE STATISTICS */}

        <div className="AdminDashboard-card">

          <div className="AdminDashboard-card-header">

            <div>

              <div className="AdminDashboard-card-kicker">
                WEBSITE
              </div>

              <h2 className="AdminDashboard-card-title">
                Website Statistics
              </h2>

            </div>

            <div className="AdminDashboard-select-wrap">

              <select
                className="AdminDashboard-select"
                value={websiteRange}
                onChange={(e) =>
                  setWebsiteRange(
                    e.target.value
                  )
                }
              >
                <option>This Month</option>
                <option>Last Month</option>
                <option>This Year</option>
              </select>

              <ChevronDown
                size={16}
                className="AdminDashboard-select-arrow"
              />

            </div>

          </div>

          <div className="AdminDashboard-website-stats">

            <div className="AdminDashboard-website-stat purple">

              <div className="AdminDashboard-website-stat-top">

                <span className="AdminDashboard-website-stat-icon">
                  <Users size={19} />
                </span>

                <ArrowUpRight size={16} />

              </div>

              <span>Visitors</span>

              <strong>
                {websiteData.visitors}
              </strong>

              <small>
                ↑ {websiteData.visitorsChange}
              </small>

            </div>

            <div className="AdminDashboard-website-stat green">

              <div className="AdminDashboard-website-stat-top">

                <span className="AdminDashboard-website-stat-icon">
                  <Eye size={19} />
                </span>

                <ArrowUpRight size={16} />

              </div>

              <span>Page Views</span>

              <strong>
                {websiteData.pageViews}
              </strong>

              <small>
                ↑ {websiteData.pageViewsChange}
              </small>

            </div>

            <div className="AdminDashboard-website-stat amber">

              <div className="AdminDashboard-website-stat-top">

                <span className="AdminDashboard-website-stat-icon">
                  <MessageSquare size={19} />
                </span>

                <ArrowUpRight size={16} />

              </div>

              <span>Messages</span>

              <strong>
                {websiteData.messages}
              </strong>

              <small>
                ↑ {websiteData.messagesChange}
              </small>

            </div>

          </div>

          <div className="AdminDashboard-website-footer">

            <div>
              <TrendingUp size={18} />

              <span>
                Website engagement is growing
              </span>
            </div>

            <button
              type="button"
              onClick={() =>
                showToast(
                  "Website analytics opened"
                )
              }
            >
              Analytics
              <ExternalLink size={15} />
            </button>

          </div>

        </div>

      </section>

      {/* =================================================
          TOAST
      ================================================= */}

      {toastMessage && (
        <div className="AdminDashboard-toast">

          <div className="AdminDashboard-toast-icon">
            <CheckCircle2 size={20} />
          </div>

          <div className="AdminDashboard-toast-content">

            <strong>
              Action Selected
            </strong>

            <span>
              {toastMessage}
            </span>

          </div>

          <button
            type="button"
            onClick={() =>
              setToastMessage("")
            }
          >
            <X size={17} />
          </button>

        </div>
      )}

    </div>
  );
};

export default AdminDashboard;