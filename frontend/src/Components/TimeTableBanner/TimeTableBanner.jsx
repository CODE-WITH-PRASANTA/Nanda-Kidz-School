import React from 'react';
import './TimeTableBanner.css'; 
import timetable_banner from '../../assets/gallery-banner.webp';

const TimeTableBanner = () => {
  return (
    <>
      <section 
        className="TimeTableBanner-container"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${timetable_banner})` 
        }}
      >
        <div className="TimeTableBanner-content">
          <h1 className="TimeTableBanner-title">TimeTable</h1>
          <div className="TimeTableBanner-breadcrumbs">
            <span className="TimeTableBanner-breadcrumb-home">Home</span>
            <span className="TimeTableBanner-breadcrumb-separator">|</span>
            <span className="TimeTableBanner-breadcrumb-current">TimeTable</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default TimeTableBanner;