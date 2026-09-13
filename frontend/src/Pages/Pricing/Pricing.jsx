import React from "react";
import { Helmet } from "react-helmet-async";

import PricingTableBanner from "../../Components/PricingTableBanner/PricingTableBanner";
import PricingTable from "../../Components/PricingTable/PricingTable";

const Pricing = () => {
  const pageTitle =
    "Play School Fees in Bhubaneswar | Nanda Kidz – The Little Kingdom";

  const pageDescription =
    "Explore play school fees in Bhubaneswar at Nanda Kidz – The Little Kingdom. Find information about preschool programs, daily, weekly and monthly fees, activities, admission, transport and child safety.";

  const keywords = [
    "play school fees in bhubaneswar",
    "which school is best for my child",
    "best play school in bhubaneswar",
    "best play school for kids in bhubaneswar",
    "best kids school in bhubaneswar",
    "top best nursery school in bhubaneswar",
    "play school near khandagiri bhubaneswar",
    "Nanda Kidz",
    "Nanda Kidz The Little Kingdom A Play School",
    "Best play school in Kalinganagar",
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
      "Preschool education",
      "Play-based learning",
      "Early childhood development",
      "Child safety",
      "Nursery education",
    ],
  };

  return (
    <>
      <Helmet>
        {/* =========================
            BASIC SEO
        ========================== */}

        <title>{pageTitle}</title>

        <meta
          name="description"
          content={pageDescription}
        />

        <meta
          name="keywords"
          content={keywords.join(", ")}
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

        {/* =========================
            LOCAL SEO
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

        {/* =========================
            TWITTER
        ========================== */}

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

      <main className="pricing-page">
        <PricingTableBanner />
        <PricingTable />
      </main>
    </>
  );
};

export default Pricing;