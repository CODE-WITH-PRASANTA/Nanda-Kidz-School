import React from 'react'
import ClassBreadcrumbs from '../../Components/ClassBreadcrumbs/ClassBreadcrumbs'
import ClassInformation from '../../Components/ClassInformation/ClassInformation'
import PopularClasses from '../../Components/PopularClasses/PopularClasses'


const ClassDetails = () => {
  return (
    <div>
        <ClassBreadcrumbs/>
        <ClassInformation/>
        <PopularClasses/>
        
    </div>
  )
}

export default ClassDetails