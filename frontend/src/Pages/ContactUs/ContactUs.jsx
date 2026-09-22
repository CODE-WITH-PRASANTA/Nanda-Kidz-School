import React from "react";
import { Helmet } from "react-helmet-async";

import ContactBreadcrumb from "../../Components/ContactBreadcrumb/ContactBreadcrumb";
import Contacts from "../../Components/Contacts/Contacts";
import Love from "../../Components/love/love";
import LearningAdventuers from "../../Components/LearningAdventuers/LearningAdventuers";
import FindUs from "../../Components/FindUs/FindUs";

const ContactUs = () => {
  const pageTitle =
    "Contact Nanda Kidz | Best Play School in Bhubaneswar";

  const pageDescription =
    "Contact Nanda Kidz – The Little Kingdom in Kalinga Vihar, Kalinganagar, Bhubaneswar for admissions, school visits, programs, activities and parent enquiries. Call +91 9438013349.";

  const keywords = [
    "Nanda Kidz Best play school in Bhubaneswar",
    "best play school in bhubaneswar",
    "best kids school in bhubaneswar",
    "best play school for kids in bhubaneswar",
    "play school near khandagiri bhubaneswar",
    "Best play school in Kalinganagar",
    "top best nursery school in bhubaneswar",
    "best school for lkg in bhubaneswar",
    "play school fees in bhubaneswar",
    "Nanda Kidz The Little Kingdom A Play School",
    "contact Nanda Kidz",
  ];

  const schoolSchema = {
    "@context": "https://schema.org",
    "@type": "Preschool",
    name: "Nanda Kidz – The Little Kingdom",
    description: pageDescription,
    telephone: "+91 9438013349",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "K-5, HIG-424, Kalinga Vihar, Kalinganagar",
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
  };

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Nanda Kidz",
    description: pageDescription,
    telephone: "+91 9438013349",
    mainEntity: {
      "@type": "Preschool",
      name: "Nanda Kidz – The Little Kingdom",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "K-5, HIG-424, Kalinga Vihar, Kalinganagar",
        addressLocality: "Bhubaneswar",
        addressRegion: "Odisha",
        postalCode: "751028",
        addressCountry: "IN",
      },
    },
  };

  return (
    <>
      <Helmet>
        {/* =========================
            PRIMARY SEO
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

        <meta
          name="revisit-after"
          content="7 days"
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
          {JSON.stringify(schoolSchema)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(contactPageSchema)}
        </script>
      </Helmet>

      <main className="contact-page">
        <ContactBreadcrumb />

        <Contacts />

        <Love />

        <LearningAdventuers />

        <FindUs />
      </main>
    </>
  );
};

export default ContactUs;