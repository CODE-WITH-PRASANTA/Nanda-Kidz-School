import React from 'react'
<<<<<<< HEAD

const Home = () => {
  return (
    <div>Home</div>
=======
import HeroSection from '../../Components/HeroSection/HeroSection'
import Homecoursecategory from '../../Components/Homecoursecategory/Homecoursecategory'
import HomeTailoredClasses from '../../Components/HomeTailoredClasses/HomeTailoredClasses'
import HomeQualityEducation from '../../Components/HomeQualityEducation/HomeQualityEducation'
import HomeOurPrograms from '../../Components/HomeOurPrograms/HomeOurPrograms'
import Homecompanypartner from '../../Components/Homecompanypartner/Homecompanypartner'


const Home = () => {
  return (
    <div>
       <HeroSection />
       <Homecoursecategory/>
       <HomeTailoredClasses/>
       <HomeQualityEducation/>
       <HomeOurPrograms/>
       <Homecompanypartner/>
       
    </div>
>>>>>>> 90eaee8e0ecf9f3937aa387970312d1bcdbbb0c6
  )
}

export default Home