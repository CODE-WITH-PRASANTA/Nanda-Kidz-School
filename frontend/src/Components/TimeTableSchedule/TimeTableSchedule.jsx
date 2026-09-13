import React from "react";
import "./TimeTableSchedule.css";

const TimeTableSchedule = () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const scheduleData = [
    [
      { subject: "Active Learning", time: "8:00 AM - 9:00 AM" },
      { subject: "Read & Write", time: "9:00 AM - 10:00 AM" },
      { subject: "Swimming Class", time: "10:00 AM - 11:00 AM" },
      { subject: "Art Class", time: "11:15 AM - 12:15 PM" },
      { subject: "Dance Class", time: "12:15 PM - 1:15 PM" },
      { subject: "Sport Class", time: "3:00 PM - 4:00 PM" },
      { subject: "Off", time: null },
    ],
    [
      { subject: "Sport Class", time: "8:00 AM - 9:00 AM" },
      { subject: "Active Learning", time: "9:00 AM - 10:00 AM" },
      { subject: "Read & Write", time: "10:00 AM - 11:00 AM" },
      { subject: "Swimming Class", time: "11:15 AM - 12:15 PM" },
      { subject: "Art Class", time: "12:15 PM - 1:15 PM" },
      { subject: "Dance Class", time: "3:00 PM - 4:00 PM" },
      { subject: "Off", time: null },
    ],
    [
      { subject: "Active Learning", time: "8:00 AM - 9:00 AM" },
      { subject: "Read & Write", time: "9:00 AM - 10:00 AM" },
      { subject: "Swimming Class", time: "10:00 AM - 11:00 AM" },
      { subject: "Art Class", time: "11:15 AM - 12:15 PM" },
      { subject: "Dance Class", time: "12:15 PM - 1:15 PM" },
      { subject: "Sport Class", time: "3:00 PM - 4:00 PM" },
      { subject: "Off", time: null },
    ],
    [
      { subject: "Sport Class", time: "8:00 AM - 9:00 AM" },
      { subject: "Active Learning", time: "9:00 AM - 10:00 AM" },
      { subject: "Read & Write", time: "10:00 AM - 11:00 AM" },
      { subject: "Swimming Class", time: "11:15 AM - 12:15 PM" },
      { subject: "Art Class", time: "12:15 PM - 1:15 PM" },
      { subject: "Dance Class", time: "3:00 PM - 4:00 PM" },
      { subject: "Off", time: null },
    ],
  ];

  return (
    <section className="TimeTableSchedule-section">
      <div className="TimeTableSchedule-container">

        {/* Intro */}
        <div className="TimeTableSchedule-heading">
          <span className="TimeTableSchedule-label">
            A Day at Nanda Kidz
          </span>

          <h1 className="TimeTableSchedule-title">
            Nanda Kidz The Little Kingdom A Play School
          </h1>

          <p className="TimeTableSchedule-description">
            Take a closer look at everyday learning, play and activity
            time at Nanda Kidz. This page gives parents a simple view
            of how classroom learning, creative activities, movement
            and social interaction can fit into a child's day.
          </p>

          <p className="TimeTableSchedule-description secondary">
            Along with the schedule, our high-resolution visual tour
            gives families a better feel for the classrooms, play
            zones and joyful school moments that make the learning
            environment welcoming for little children.
          </p>
        </div>

        {/* Schedule */}
        <div className="TimeTableSchedule-card">
          <div className="TimeTableSchedule-table-wrapper">
            <table className="TimeTableSchedule-table">
              <thead>
                <tr>
                  {days.map((day) => (
                    <th
                      key={day}
                      className="TimeTableSchedule-th"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {scheduleData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="TimeTableSchedule-tr"
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={`${rowIndex}-${cellIndex}`}
                        className={`TimeTableSchedule-td ${
                          cell.subject === "Off"
                            ? "TimeTableSchedule-off"
                            : ""
                        }`}
                      >
                        <div className="TimeTableSchedule-subject">
                          {cell.subject}
                        </div>

                        {cell.time && (
                          <div className="TimeTableSchedule-time">
                            {cell.time}
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visual Tour Content */}
        <div className="TimeTableSchedule-tour">
          <div className="TimeTableSchedule-tour-content">
            <span className="TimeTableSchedule-tour-label">
              Explore the school
            </span>

            <h2>
              Classrooms, play zones and happy learning spaces
            </h2>

            <p>
              A child's early school experience is shaped by the
              spaces around them. At Nanda Kidz, classrooms and play
              areas are designed to support learning through movement,
              creativity, conversation and hands-on activities.
            </p>

            <p>
              Parents can explore our visual gallery to see the
              environment where children spend their school days,
              from classroom activities to playful moments and
              group experiences.
            </p>
          </div>

          <div className="TimeTableSchedule-tour-badge">
            <span className="TimeTableSchedule-badge-number">
              01
            </span>

            <div>
              <strong>Learning</strong>
              <span>Play · Explore · Grow</span>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="TimeTableSchedule-note">
          <strong>A joyful routine for little learners.</strong>

          <p>
            Daily activities may be adjusted based on the children's
            needs, school events, special activities and other
            practical arrangements.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TimeTableSchedule;