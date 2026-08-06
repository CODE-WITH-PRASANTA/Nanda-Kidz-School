import React from 'react';
import './TeacherDetailsBreadcurm.css';

// Import your local background image (update path according to your project structure)
import teacherDetailsBg from '../../assets/d1.jpg';

const TeacherDetailsBreadcurm = () => {
  return (
    <section 
      className="TeacherDetailsBreadcurm" 
      style={{ backgroundImage: `url(${teacherDetailsBg})` }}
    >
      <div className="TeacherDetailsBreadcurm-overlay">
        <div className="TeacherDetailsBreadcurm-content">
          <h1 className="TeacherDetailsBreadcurm-title">Teacher Details</h1>
          <nav className="TeacherDetailsBreadcurm-nav" aria-label="breadcrumb">
            <span className="TeacherDetailsBreadcurm-link TeacherDetailsBreadcurm-home">
              Home
            </span>
            <span className="TeacherDetailsBreadcurm-separator">|</span>
            <span className="TeacherDetailsBreadcurm-link TeacherDetailsBreadcurm-current">
              Teacher Details
            </span>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default TeacherDetailsBreadcurm;