import React from "react";
import { Helmet } from "react-helmet-async";

import TimeTableBanner from "../../Components/TimeTableBanner/TimeTableBanner";
import TimeTableSchedule from "../../Components/TimeTableSchedule/TimeTableSchedule";

const TimeTable = () => {
  const pageTitle =
    "Nanda Kidz The Little Kingdom A Play School | Daily Timetable";

  const pageDescription =
    "Explore the daily timetable at Nanda Kidz – The Little Kingdom, a play school in Bhubaneswar where children learn through play, creative activities, movement, classroom experiences and social interaction.";

  const pageKeywords = [
    "Nanda Kidz The Little Kingdom A Play School",
    "best kids school in bhubaneswar",
    "best play school in bhubaneswar",
    "best play school for kids in bhubaneswar",
    "play school near khandagiri bhubaneswar",
    "best play school in Kalinganagar",
    "nursery school in bhubaneswar",
    "play school timetable in bhubaneswar",
    "preschool timetable bhubaneswar",
    "Nanda Kidz timetable",
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Preschool",
    name: "Nanda Kidz – The Little Kingdom",
    description: pageDescription,
    telephone: "+91 9438013349",

    address: {
      "@type": "PostalAddress",
      streetAddress:
        "K-5, HIG-424, Kalinga Vihar LIG, Kalinganagar",
      addressLocality: "Bhubaneswar",
      addressRegion: "Odisha",
      postalCode: "751028",
      addressCountry: "IN",
    },

    areaServed: [
      "Bhubaneswar",
      "Kalinganagar",
      "Kalinga Vihar",
      "Khandagiri",
    ],

    knowsAbout: [
      "Early childhood education",
      "Play-based learning",
      "Preschool activities",
      "Creative learning",
      "Child development",
      "Social learning",
    ],
  };

  return (
    <>
      <Helmet>
        {/* =====================================================
            BASIC SEO
        ====================================================== */}

        <title>{pageTitle}</title>

        <meta
          name="description"
          content={pageDescription}
        />

        <meta
          name="keywords"
          content={pageKeywords.join(", ")}
        />

        <meta
          name="author"
          content="Nanda Kidz – The Little Kingdom"
        />

        <meta
          name="robots"
          content="index, follow"
        />

        <meta
          name="language"
          content="English"
        />

        {/* =====================================================
            LOCAL SEO
        ====================================================== */}

        <meta
          name="geo.region"
          content="IN-OR"
        />

        <meta
          name="geo.placename"
          content="Bhubaneswar, Odisha"
        />

        {/* =====================================================
            OPEN GRAPH
        ====================================================== */}

        <meta
          property="og:title"
          content={pageTitle}
        />

        <meta
          property="og:description"
          content={pageDescription}
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:site_name"
          content="Nanda Kidz – The Little Kingdom"
        />

        <meta
          property="og:locale"
          content="en_IN"
        />

        {/* =====================================================
            TWITTER / SOCIAL
        ====================================================== */}

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content={pageTitle}
        />

        <meta
          name="twitter:description"
          content={pageDescription}
        />

        {/* =====================================================
            MOBILE / BROWSER
        ====================================================== */}

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />

        <meta
          name="theme-color"
          content="#17835f"
        />

        {/* =====================================================
            STRUCTURED DATA
        ====================================================== */}

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <main className="timetable-page">
        <TimeTableBanner />
        <TimeTableSchedule />
      </main>
    </>
  );
};

export default TimeTable;