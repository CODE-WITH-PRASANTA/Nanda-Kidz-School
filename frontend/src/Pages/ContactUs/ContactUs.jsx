import React from 'react'
import ContactBreadcrumb from '../../Components/ContactBreadcrumb/ContactBreadcrumb'
import Contacts from '../../Components/Contacts/Contacts'
import Love from '../../Components/love/love'
import LearningAdventuers from '../../Components/LearningAdventuers/LearningAdventuers'
import FindUs from '../../Components/FindUs/FindUs'

const ContactUs = () => {
  return (
    <div>
        <ContactBreadcrumb/>
        <Contacts/>
        <Love/>
        <LearningAdventuers/>
        <FindUs/>
       
    </div>
  )
}

export default ContactUs