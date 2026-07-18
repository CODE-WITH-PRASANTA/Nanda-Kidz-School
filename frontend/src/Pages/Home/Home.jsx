import React from 'react'
import Homecoursecategory from '../../Components/Homecoursecategory/Homecoursecategory'
import HomeTailoredClasses from '../../Components/HomeTailoredClasses/HomeTailoredClasses'
import HomeQualityEducation from '../../Components/HomeQualityEducation/HomeQualityEducation'
import HomeOurPrograms from '../../Components/HomeOurPrograms/HomeOurPrograms'


const Home = () => {
  return (
    <div>
      <Homecoursecategory/>
      <HomeTailoredClasses/>
      <HomeQualityEducation/>
      <HomeOurPrograms/>

    </div>
  )
}

export default Home