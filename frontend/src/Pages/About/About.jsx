import React from "react";
import { Helmet } from "react-helmet-async";

import AboutUs from "../../Components/AboutUs/AboutUs";
import AboutBreadCrumb from "../../Components/AboutBreadCrumb/AboutBreadCrumb";
import AboutOurFacilities from "../../Components/AboutOurFacilities/AboutOurFacilities";
import AboutBackbone from "../../Components/AboutBackbone/AboutBackbone";
import AboutKidsSchool from "../../Components/AboutKidsSchool/AboutKidsSchool";
import AboutContact from "../../Components/AboutContact/AboutContact";
import AboutDetails from "../../Components/AboutDetails/AboutDetails";

const About = () => {
  return (
    <>
      <Helmet>
        {/* Basic SEO */}
        <title>
          About Nanda Kidz | Best Play School in Bhubaneswar
        </title>

        <meta
          name="description"
          content="Learn about Nanda Kidz – The Little Kingdom, a caring and activity-based play school in Bhubaneswar. Discover our learning approach, facilities, programs and child-friendly environment."
        />

        <meta
          name="keywords"
          content="best play school in bhubaneswar, best play school for kids in bhubaneswar, Nanda Kidz, Nanda Kidz The Little Kingdom A Play School, best kids school in bhubaneswar, top best nursery school in bhubaneswar, play school near khandagiri bhubaneswar, Best play school in Kalinganagar"
        />

        <meta name="robots" content="index, follow" />

        <meta name="author" content="Nanda Kidz" />

        <meta name="language" content="English" />

        <meta name="revisit-after" content="7 days" />

        {/* Open Graph / Facebook */}
        <meta
          property="og:title"
          content="About Nanda Kidz | Best Play School in Bhubaneswar"
        />

        <meta
          property="og:description"
          content="Discover Nanda Kidz – The Little Kingdom, a joyful and caring play school in Bhubaneswar where children learn through play, activities and everyday experiences."
        />

        <meta property="og:type" content="website" />

        <meta property="og:locale" content="en_IN" />

        <meta
          property="og:site_name"
          content="Nanda Kidz – The Little Kingdom"
        />

        {/* Twitter / X */}
        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="About Nanda Kidz | Best Play School in Bhubaneswar"
        />

        <meta
          name="twitter:description"
          content="Know more about Nanda Kidz – The Little Kingdom, a child-friendly play school in Bhubaneswar focused on joyful early learning and development."
        />

        {/* Location / Local SEO */}
        <meta
          name="geo.region"
          content="IN-OR"
        />

        <meta
          name="geo.placename"
          content="Bhubaneswar, Odisha"
        />

        {/* Mobile */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />

        <meta
          name="theme-color"
          content="#17835f"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Preschool",
            name: "Nanda Kidz – The Little Kingdom",
            description:
              "Nanda Kidz is a child-friendly play school in Bhubaneswar offering joyful, activity-based early learning.",
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "K-5, HIG-424, Kalinga Vihar LIG, Kalinganagar",
              addressLocality: "Bhubaneswar",
              addressRegion: "Odisha",
              postalCode: "751028",
              addressCountry: "IN",
            },
            telephone: "+91 9438013349",
            areaServed: [
              "Bhubaneswar",
              "Kalinganagar",
              "Kalinga Vihar",
              "Khandagiri",
            ],
          })}
        </script>
      </Helmet>

      <main className="about-page">
        <AboutBreadCrumb />

        <AboutUs />

        <AboutOurFacilities />

        <AboutDetails />

        <AboutBackbone />

        <AboutKidsSchool />

        <AboutContact />
      </main>
    </>
  );
};

export default About;