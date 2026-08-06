import React from "react";
import "./Termandconditionbreadcrum.css";
import bgImage from "../../assets/ourfacilities1.webp";

const Termandconditionbreadcrum = () => {
  return (
    <div className="termandcondition-breadcrumb">
      <img
        src={bgImage}
        alt="Terms and Conditions Banner"
        className="termandcondition-breadcrumb-image"
      />

      <div className="termandcondition-breadcrumb-overlay"></div>

      <div className="termandcondition-breadcrumb-content">
        <h1>Terms & Conditions</h1>
        <p>KINDERGARTEN WORDPRESS THEME</p>
      </div>
    </div>
  );
};

export default Termandconditionbreadcrum;