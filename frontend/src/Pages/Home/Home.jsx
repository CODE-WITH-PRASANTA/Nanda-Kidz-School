import React from 'react'
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
  )
}

export default Home