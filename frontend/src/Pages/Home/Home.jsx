import React from 'react';
import { Helmet } from 'react-helmet-async';

import HeroSection from '../../Components/HeroSection/HeroSection';
import Homecoursecategory from '../../Components/Homecoursecategory/Homecoursecategory';
import HomeTailoredClasses from '../../Components/HomeTailoredClasses/HomeTailoredClasses';
import HomeQualityEducation from '../../Components/HomeQualityEducation/HomeQualityEducation';
import HomeOurPrograms from '../../Components/HomeOurPrograms/HomeOurPrograms';
import Homecompanypartner from '../../Components/Homecompanypartner/Homecompanypartner';
import HomeKindergarten from '../../Components/HomeKindergarten/HomeKindergarten';
import PopularClasses from '../../Components/PopularClasses/PopularClasses';
import CoreValues from '../../Components/CoreValues/CoreValues';
import OurTeachers from '../../Components/OurTeachers/OurTeachers';
import Testimonial from '../../Components/Testimonial/Testimonial';
import LatestNews from '../../Components/LatestNews/LatestNews';

const Home = () => {
  return (
    <>
      <Helmet>
        {/* Primary SEO */}
        <title>
          Nanda Kidz – Best Play School in Bhubaneswar | The Little Kingdom
        </title>

        <meta
          name="description"
          content="Nanda Kidz – The Little Kingdom is a trusted play school in Bhubaneswar offering joyful, safe and engaging early education, nursery programs, creative activities and learning through play."
        />

        <meta
          name="keywords"
          content="best play school in bhubaneswar, best kids school in bhubaneswar, best play school for kids in bhubaneswar, top best nursery school in bhubaneswar, play school fees in bhubaneswar, Nanda Kidz, Nanda Kidz The Little Kingdom, nursery school in Bhubaneswar, preschool in Bhubaneswar"
        />

        <meta name="author" content="Nanda Kidz – The Little Kingdom" />

        <meta name="robots" content="index, follow" />

        <meta
          name="googlebot"
          content="index, follow, max-image-preview:large"
        />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href="https://www.nandakidz.com/"
        />

        {/* Open Graph / Facebook */}
        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:title"
          content="Nanda Kidz – Best Play School in Bhubaneswar"
        />

        <meta
          property="og:description"
          content="Discover Nanda Kidz – The Little Kingdom, a caring and engaging play school in Bhubaneswar where children learn, play and grow with confidence."
        />

        <meta
          property="og:url"
          content="https://www.nandakidz.com/"
        />

        <meta
          property="og:site_name"
          content="Nanda Kidz – The Little Kingdom"
        />

        <meta
          property="og:image"
          content="https://www.nandakidz.com/assets/Education.webp"
        />

        <meta
          property="og:image:alt"
          content="Nanda Kidz – The Little Kingdom"
        />

        {/* Twitter / X */}
        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Nanda Kidz – Best Play School in Bhubaneswar"
        />

        <meta
          name="twitter:description"
          content="Nanda Kidz provides a joyful and caring early learning environment for children in Bhubaneswar."
        />

        <meta
          name="twitter:image"
          content="https://www.nandakidz.com/assets/Education.webp"
        />

        {/* Theme */}
        <meta
          name="theme-color"
          content="#bc00dd"
        />

        {/* Mobile */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />

        {/* Language */}
        <meta
          httpEquiv="content-language"
          content="en"
        />

        {/* Geo information */}
        <meta
          name="geo.region"
          content="IN-OD"
        />

        <meta
          name="geo.placename"
          content="Bhubaneswar, Odisha"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Preschool',
            name: 'Nanda Kidz – The Little Kingdom',
            alternateName: 'Nanda Kidz',
            description:
              'Nanda Kidz – The Little Kingdom is a play school in Bhubaneswar providing a safe, caring and engaging early learning environment for children.',
            url: 'https://www.nandakidz.com/',
            image: 'https://www.nandakidz.com/assets/Education.webp',
            telephone: '+91 9438013349',
            address: {
              '@type': 'PostalAddress',
              streetAddress:
                'K-5, HIG-424, Kalinga Vihar LIG, Kalinganagar',
              addressLocality: 'Bhubaneswar',
              addressRegion: 'Odisha',
              postalCode: '751028',
              addressCountry: 'IN',
            },
            areaServed: {
              '@type': 'City',
              name: 'Bhubaneswar',
            },
            sameAs: [],
          })}
        </script>
      </Helmet>

      <main className="home-page">

        {/* Hero */}
        <HeroSection />

        {/* About Nanda Kidz */}
        <HomeKindergarten />

        {/* Popular Classes */}
        <PopularClasses />

        {/* Core Values */}
        <CoreValues />

        {/* Teachers */}
        <OurTeachers />

        {/* Parent Testimonials */}
        <Testimonial />

        {/* Latest News */}
        <LatestNews />

        {/* Course Categories */}
        <Homecoursecategory />

        {/* Activities */}
        <HomeTailoredClasses />

        {/* Quality Education */}
        <HomeQualityEducation />

        {/* Programs */}
        <HomeOurPrograms />

        {/* Partners */}
        <Homecompanypartner />

      </main>
    </>
  );
};

export default Home;