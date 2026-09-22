import React from "react";
import { Helmet } from "react-helmet-async";

import GalleryBanner from "../../Components/GalleryBanner/GalleryBanner";
import GalleryGrid from "../../Components/GalleryGrid/GalleryGrid";

const Gallery = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Nanda Kidz Gallery",
    description:
      "Explore memorable moments from Nanda Kidz – The Little Kingdom, a child-friendly play school in Bhubaneswar focused on emotional intelligence, kindness, curiosity and holistic growth.",
    publisher: {
      "@type": "Preschool",
      name: "Nanda Kidz – The Little Kingdom",
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
    },
    areaServed: [
      "Bhubaneswar",
      "Kalinganagar",
      "Kalinga Vihar",
      "Khandagiri",
    ],
  };

  return (
    <>
      <Helmet>
        {/* =========================
            BASIC SEO
        ========================== */}

        <title>
          Best Kids School in Bhubaneswar | Nanda Kidz Gallery
        </title>

        <meta
          name="description"
          content="Explore the Nanda Kidz gallery and discover joyful moments of learning, creativity, kindness and childhood experiences at one of the best kids school in Bhubaneswar."
        />

        <meta
          name="keywords"
          content="best kids school in bhubaneswar, best play school in bhubaneswar, best play school for kids in bhubaneswar, Nanda Kidz, Nanda Kidz The Little Kingdom A Play School, top best nursery school in bhubaneswar, play school near khandagiri bhubaneswar, play school fees in bhubaneswar, Best play school in Kalinganagar"
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

        {/* =========================
            LOCATION SEO
        ========================== */}

        <meta
          name="geo.region"
          content="IN-OR"
        />

        <meta
          name="geo.placename"
          content="Bhubaneswar, Odisha"
        />

        {/* =========================
            OPEN GRAPH
        ========================== */}

        <meta
          property="og:title"
          content="Best Kids School in Bhubaneswar | Nanda Kidz Gallery"
        />

        <meta
          property="og:description"
          content="Take a look at special moments from Nanda Kidz – The Little Kingdom, where children learn through play, creativity, kindness, curiosity and meaningful everyday experiences."
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

        {/* =========================
            TWITTER SEO
        ========================== */}

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Best Kids School in Bhubaneswar | Nanda Kidz Gallery"
        />

        <meta
          name="twitter:description"
          content="See the joyful learning moments, activities and childhood memories captured at Nanda Kidz – The Little Kingdom in Bhubaneswar."
        />

        {/* =========================
            MOBILE / BROWSER
        ========================== */}

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />

        <meta
          name="theme-color"
          content="#17835f"
        />

        {/* =========================
            STRUCTURED DATA
        ========================== */}

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <main className="gallery-page">
        <GalleryBanner />
        <GalleryGrid />
      </main>
    </>
  );
};

export default Gallery;