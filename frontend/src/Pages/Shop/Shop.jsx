import React from "react";
import { Helmet } from "react-helmet-async";

import ShopBreadcrumb from "../../Components/ShopBreadcrumb/ShopBreadcrumb";
import Shopdetails from "../../Components/Shopdetails/Shopdetails";

const Shop = () => {
  return (
    <>
      <Helmet>
        {/* Page Title */}
        <title>
          Play School Near Khandagiri, Bhubaneswar | Nanda Kidz
        </title>

        {/* Meta Description */}
        <meta
          name="description"
          content="Explore Nanda Kidz – The Little Kingdom, a play school near Khandagiri, Bhubaneswar where children learn through creative activities, play, discovery and joyful experiences."
        />

        {/* SEO Keywords */}
        <meta
          name="keywords"
          content="play school near khandagiri, bhubaneswar, best play school in bhubaneswar, Nanda Kidz, Nanda Kidz The Little Kingdom A Play School, best play school for kids in bhubaneswar, best kids school in bhubaneswar, nursery school in bhubaneswar, play school in Kalinganagar"
        />

        {/* Search Engine Instructions */}
        <meta
          name="robots"
          content="index, follow"
        />

        {/* Author */}
        <meta
          name="author"
          content="Nanda Kidz – The Little Kingdom"
        />

        {/* Language */}
        <meta
          name="language"
          content="English"
        />

        {/* Local SEO */}
        <meta
          name="geo.region"
          content="IN-OR"
        />

        <meta
          name="geo.placename"
          content="Bhubaneswar, Odisha"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Play School Near Khandagiri, Bhubaneswar | Nanda Kidz"
        />

        <meta
          property="og:description"
          content="Nanda Kidz – The Little Kingdom provides a friendly and engaging environment where children can learn, play, explore and grow with confidence."
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

        {/* Twitter / X */}
        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Play School Near Khandagiri, Bhubaneswar | Nanda Kidz"
        />

        <meta
          name="twitter:description"
          content="Discover Nanda Kidz – The Little Kingdom, a caring play school near Khandagiri, Bhubaneswar focused on joyful early learning."
        />

        {/* Mobile Browser Theme */}
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
              "A child-friendly play school near Khandagiri, Bhubaneswar focused on joyful, activity-based early learning.",
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
              "Khandagiri",
              "Kalinga Vihar",
              "Kalinganagar",
              "Bhubaneswar",
            ],
          })}
        </script>
      </Helmet>

      <main className="shop-page">
        <ShopBreadcrumb />
        <Shopdetails />
      </main>
    </>
  );
};

export default Shop;