import React from 'react'
import HeroSection from '../../Components/HeroSection/HeroSection'
import Homecoursecategory from '../../Components/Homecoursecategory/Homecoursecategory'
import HomeTailoredClasses from '../../Components/HomeTailoredClasses/HomeTailoredClasses'
import HomeQualityEducation from '../../Components/HomeQualityEducation/HomeQualityEducation'
import HomeOurPrograms from '../../Components/HomeOurPrograms/HomeOurPrograms'
import Homecompanypartner from '../../Components/Homecompanypartner/Homecompanypartner'
import HomeKindergarten from '../../Components/HomeKindergarten/HomeKindergarten'
import PopularClasses from '../../Components/PopularClasses/PopularClasses'
import CoreValues from '../../Components/CoreValues/CoreValues'
import OurTeachers from '../../Components/OurTeachers/OurTeachers'
import Testimonial from '../../Components/Testimonial/Testimonial'
import LatestNews from '../../Components/LatestNews/LatestNews'


const Home = () => {
  return (
    <div>
       <HeroSection />
       <HomeKindergarten/>
       <PopularClasses/>
       <CoreValues/>
       <OurTeachers/>
       <Testimonial/>
       <LatestNews/>
       <Homecoursecategory/>
       <HomeTailoredClasses/>
       <HomeQualityEducation/>
       <HomeOurPrograms/>
       <Homecompanypartner/>
       
    </div>
  )
}

export default Home