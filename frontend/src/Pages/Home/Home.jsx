import React from 'react'
import Homecoursecategory from '../../Components/Homecoursecategory/Homecoursecategory'
import HomeTailoredClasses from '../../Components/HomeTailoredClasses/HomeTailoredClasses'
import HomeQualityEducation from '../../Components/HomeQualityEducation/HomeQualityEducation'
import HomeOurPrograms from '../../Components/HomeOurPrograms/HomeOurPrograms'

import HeroSection from '../../Components/HeroSection/HeroSection'

const Home = () => {
  return (
    <div>
      <Homecoursecategory/>
      <HomeTailoredClasses/>
      <HomeQualityEducation/>
      <HomeOurPrograms/>

      <HeroSection />
    </div>
  )
}

export default Home