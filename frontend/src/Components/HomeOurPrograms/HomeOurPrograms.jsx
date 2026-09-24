import React from 'react';
import './HomeOurPrograms.css';

const iconPaths = {
  sun: (
    <>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.5M12 19v2.5M4.5 12H2M22 12h-2.5M5.8 5.8l1.8 1.8M16.4 16.4l1.8 1.8M18.2 5.8l-1.8 1.8M7.6 16.4l-1.8 1.8" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  bowl: (
    <>
      <path d="M4 12h16a8 6 0 0 1-16 0Z" />
      <path d="M8 12V8a4 3 0 0 1 8 0v4" />
      <path d="M9 5.5V4M12 5V3M15 5.5V4" />
    </>
  ),
  puzzle: (
    <>
      <path d="M9 4h4v2.2a1.8 1.8 0 1 1 0 3.6V12h-2.2a1.8 1.8 0 1 0 0 3.6H13v2.2a1.8 1.8 0 1 1-3.6 0V15.6H7a1.8 1.8 0 1 1 0-3.6H9V4Z" />
    </>
  ),
};

const HomeOurPrograms = () => {
  const feeData = [
    {
      id: 1,
      preschool: 'Full-Day (8:00 AM - 6:00 PM)',
      note: 'Full learning day with meals and rest time',
      icon: 'sun',
      daily: '₹800.00',
      weekly: '₹3,500.00',
      monthly: '₹12,000.00'
    },
    {
      id: 2,
      preschool: 'Half Day (8:00 AM - 2:00 PM or 3:00 PM - 6:00 PM)',
      note: 'Morning or afternoon session',
      icon: 'clock',
      daily: '₹500.00',
      weekly: '₹2,000.00',
      monthly: '₹7,000.00'
    },
    {
      id: 3,
      preschool: 'Food Expenses',
      note: 'Nutritious meals, paid per day',
      icon: 'bowl',
      daily: '₹150.00',
      weekly: '₹750.00',
      monthly: '₹2,500.00'
    },
    {
      id: 4,
      preschool: 'Activities',
      note: 'Art, music and play sessions',
      icon: 'puzzle',
      daily: '₹100.00',
      weekly: '₹400.00',
      monthly: '₹1,500.00'
    }
  ];

  return (
    <section className="HomeOurPrograms">
      <div className="HomeOurPrograms-container">

        <div className="HomeOurPrograms-header">
          <span className="HomeOurPrograms-badge">Our Programs</span>
          <h2 className="HomeOurPrograms-title">Standard Fee Structure</h2>
          <p className="HomeOurPrograms-subhead">
            Clear, upfront pricing for every family — choose the plan that fits your child's day.
          </p>
        </div>

        <div className="HomeOurPrograms-table-wrapper">
          <div className="HomeOurPrograms-table-card">

            <div className="HomeOurPrograms-table-row HomeOurPrograms-table-head">
              <div className="HomeOurPrograms-th">Preschool</div>
              <div className="HomeOurPrograms-th">Daily</div>
              <div className="HomeOurPrograms-th">Weekly</div>
              <div className="HomeOurPrograms-th HomeOurPrograms-th-monthly">Monthly</div>
            </div>

            <div className="HomeOurPrograms-table-body">
              {feeData.map((item) => (
                <div key={item.id} className="HomeOurPrograms-table-row HomeOurPrograms-table-data-row">
                  <div className="HomeOurPrograms-td HomeOurPrograms-td-title">
                    <span className={`HomeOurPrograms-icon HomeOurPrograms-icon-${item.icon}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                        {iconPaths[item.icon]}
                      </svg>
                    </span>
                    <span className="HomeOurPrograms-td-title-text">
                      <span className="HomeOurPrograms-mobile-label">Preschool</span>
                      <strong>{item.preschool}</strong>
                      <span className="HomeOurPrograms-td-note">{item.note}</span>
                    </span>
                  </div>
                  <div className="HomeOurPrograms-td">
                    <span className="HomeOurPrograms-mobile-label">Daily</span>
                    <span>{item.daily}</span>
                  </div>
                  <div className="HomeOurPrograms-td">
                    <span className="HomeOurPrograms-mobile-label">Weekly</span>
                    <span>{item.weekly}</span>
                  </div>
                  <div className="HomeOurPrograms-td HomeOurPrograms-td-monthly">
                    <span className="HomeOurPrograms-mobile-label">Monthly</span>
                    <span className="HomeOurPrograms-highlight-price">{item.monthly}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        <div className="HomeOurPrograms-footer-note">
          <svg className="HomeOurPrograms-footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v5M12 8v.01" />
          </svg>
          <p>The preschool reserves the right to revise the above fees when required. Parents can contact the school directly for the latest fee details and applicable terms.</p>
        </div>

      </div>
    </section>
  );
};

export default HomeOurPrograms;