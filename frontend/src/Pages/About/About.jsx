import React from 'react'
import AboutUs from '../../Components/AboutUs/AboutUs'
import AboutBreadCrumb from '../../Components/AboutBreadCrumb/AboutBreadCrumb'
import AboutOurFacilities from '../../Components/AboutOurFacilities/AboutOurFacilities'
import AboutBackbone from '../../Components/AboutBackbone/AboutBackbone';
import AboutKidsSchool from '../../Components/AboutKidsSchool/AboutKidsSchool';
import AboutContact from '../../Components/AboutContact/AboutContact';

const About = () => {
  return (
    <div>
        <AboutBreadCrumb/>
        <AboutUs/>
        <AboutOurFacilities/>
        <AboutBackbone/>
        <AboutKidsSchool/>
        <AboutContact/>
    </div>
  );
};

export default About;