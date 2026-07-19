import React from "react";
import "./AboutUs.css";

import AboutImage from "../../assets/aboutus.webp"; // Your own image

import {
  FaArrowRight,
  FaRegStar,
  FaGraduationCap,
} from "react-icons/fa";

import { GiRocket } from "react-icons/gi";

const AboutUs = () => {
  return (
    <section className="aboutUs">

      {/* Floating Shapes */}

      <div className="aboutStar">
        <FaRegStar />
      </div>

      <div className="aboutRocket">
        <GiRocket />
      </div>

      <div className="aboutCap">
        <FaGraduationCap />
      </div>

      {/* Left Side */}

      <div className="aboutLeft">

        <div className="aboutCircleOne"></div>

        <div className="aboutCircleTwo"></div>

        <div className="aboutImageShape">

          <img
            src={AboutImage}
            alt="About"
            className="aboutImage"
          />

        </div>

      </div>

      {/* Right Side */}

      <div className="aboutRight">

        <div className="aboutHeading">

          <FaGraduationCap className="smallCap" />

          <span>ABOUT US</span>

        </div>

        <h2>
          Globally Recognized
          <br />
          Interactive Preschool
          <br />
          Education
        </h2>

        <p>
          Tellus in hac habitasse platea dictumst. Eget arcu dictum varius
          duis at consectetur lorem donec massa. Eget magna fermentum
          iaculis eu non diam. Amet nisl purus in mollis nunc sed id.
        </p>

        <button className="aboutBtn">

          READ MORE

          <FaArrowRight />

        </button>

      </div>

    </section>
  );
};

export default AboutUs;