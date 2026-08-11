import React from 'react';
import './TeacherBreadcurm.css';

// Import your local background image (adjust path to match your folder structure)
import breadcrumbBg from "../../assets/bc1.png";

const TeacherBreadcurm = () => {
  return (
    <section 
      className="TeacherBreadcurm" 
      style={{ backgroundImage: `url(${breadcrumbBg})` }}
    >
      <div className="TeacherBreadcurm-overlay">
        <div className="TeacherBreadcurm-content">
          <h1 className="TeacherBreadcurm-title">Teacher</h1>
          <nav className="TeacherBreadcurm-nav" aria-label="breadcrumb">
            <span className="TeacherBreadcurm-link TeacherBreadcurm-home">Home</span>
            <span className="TeacherBreadcurm-separator">|</span>
            <span className="TeacherBreadcurm-link TeacherBreadcurm-current">Teacher</span>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default TeacherBreadcurm;