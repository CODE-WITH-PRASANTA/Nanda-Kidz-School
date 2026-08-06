import React from 'react';
import './TimeTableSchedule.css';

const TimeTableSchedule = () => {
  const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  const defaultTime = "8:00 AM - 6:00 AM";

  const scheduleData = [
    [
      { subject: 'Active Learning', time: defaultTime },
      { subject: 'Read & Write', time: defaultTime },
      { subject: 'Swimming Class', time: defaultTime },
      { subject: 'Art Class', time: defaultTime },
      { subject: 'Dance Class', time: defaultTime },
      { subject: 'Sport Class', time: defaultTime },
      { subject: 'Off', time: null }
    ],
    [
      { subject: 'Sport Class', time: defaultTime },
      { subject: 'Active Learning', time: defaultTime },
      { subject: 'Read & Write', time: defaultTime },
      { subject: 'Swimming Class', time: defaultTime },
      { subject: 'Art Class', time: defaultTime },
      { subject: 'Dance Class', time: defaultTime },
      { subject: 'Off', time: null }
    ],
    [
      { subject: 'Active Learning', time: defaultTime },
      { subject: 'Read & Write', time: defaultTime },
      { subject: 'Swimming Class', time: defaultTime },
      { subject: 'Art Class', time: defaultTime },
      { subject: 'Dance Class', time: defaultTime },
      { subject: 'Sport Class', time: defaultTime },
      { subject: 'Off', time: null }
    ],
    [
      { subject: 'Sport Class', time: defaultTime },
      { subject: 'Active Learning', time: defaultTime },
      { subject: 'Read & Write', time: defaultTime },
      { subject: 'Swimming Class', time: defaultTime },
      { subject: 'Art Class', time: defaultTime },
      { subject: 'Dance Class', time: defaultTime },
      { subject: 'Off', time: null }
    ]
  ];

  return (
    <div className="TimeTableSchedule-container">
      <div className="TimeTableSchedule-wrapper">
        <table className="TimeTableSchedule-table">
          <thead>
            <tr>
              {days.map((day, index) => (
                <th key={index} className="TimeTableSchedule-th">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((row, rowIndex) => (
              <tr key={rowIndex} className="TimeTableSchedule-tr">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="TimeTableSchedule-td">
                    <div className="TimeTableSchedule-subject">{cell.subject}</div>
                    {cell.time && <div className="TimeTableSchedule-time">{cell.time}</div>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeTableSchedule;