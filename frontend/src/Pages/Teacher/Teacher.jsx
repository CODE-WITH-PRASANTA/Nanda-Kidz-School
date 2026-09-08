import React from "react";
import { Helmet } from "react-helmet-async";

import TeacherBreadcurm from "../../Components/TeacherBreadcurm/TeacherBreadcurm";
import TeacherSection from "../../Components/TeacherSection/TeacherSection";

const Teacher = () => {
  const pageTitle =
    "Best Teachers at Nanda Kidz | Best Kids School in Bhubaneswar";

  const pageDescription =
    "Meet the teaching team at Nanda Kidz – The Little Kingdom. Our educators support children through play-based learning, creativity, communication, confidence and positive early childhood experiences in Bhubaneswar.";

  const pageKeywords = [
    "which school is best for my child",
    "best play school for kids in bhubaneswar",
    "best kids school in bhubaneswar",
    "best play school in bhubaneswar",
    "Nanda Kidz The Little Kingdom A Play School",
    "Nanda Kidz Best play school in Bhubaneswar",
    "play school near khandagiri bhubaneswar",
    "Best play school in Kalinganagar",
    "top best nursery school in bhubaneswar",
    "best school for lkg in bhubaneswar",
    "play school teachers in bhubaneswar",
  ];

  const preschoolStructuredData = {
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
      "Patrapada",
      "Ghatikia",
    ],
    knowsAbout: [
      "Early childhood education",
      "Play-based learning",
      "Preschool education",
      "Child development",
      "Creative learning",
      "Social and emotional development",
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

        <meta
          name="revisit-after"
          content="7 days"
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
          {JSON.stringify(preschoolStructuredData)}
        </script>
      </Helmet>

      <main className="teacher-page">
        <TeacherBreadcurm />
        <TeacherSection />
      </main>
    </>
  );
};

export default Teacher;