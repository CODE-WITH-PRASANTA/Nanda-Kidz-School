import React from "react";
import AboutUs from "../../Components/AboutUs/AboutUs";
import AboutBreadCrumb from "../../Components/AboutBreadCrumb/AboutBreadCrumb";
import AboutOurFacilities from "../../Components/AboutOurFacilities/AboutOurFacilities";
import AboutBackbone from "../../Components/AboutBackbone/AboutBackbone";
import AboutKidsSchool from "../../Components/AboutKidsSchool/AboutKidsSchool";
import AboutContact from "../../Components/AboutContact/AboutContact";
import AboutDetails from "../../Components/AboutDetails/AboutDetails";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <AboutBreadCrumb />
      <AboutUs />
      <AboutOurFacilities />
      <AboutDetails />
      <AboutBackbone />
      <AboutKidsSchool />
      <AboutContact />
    </div>
  );
};

export default About;