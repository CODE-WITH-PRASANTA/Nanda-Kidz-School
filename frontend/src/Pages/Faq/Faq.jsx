import React from "react";
import { Helmet } from "react-helmet-async";

import FaqBreadcurm from "../../Components/FaqBreadcurm/FaqBreadcurm";
import FaqSection from "../../Components/FaqSection/FaqSection";
import QuestionsSection from "../../Components/QuestionsSection/QuestionsSection";

const Faq = () => {
  const pageTitle =
    "Play School Near Khandagiri, Bhubaneswar | FAQs | Nanda Kidz";

  const pageDescription =
    "Find answers to common parent questions about Nanda Kidz, including admission age, play school fees in Bhubaneswar, transport, safety, LKG admission and choosing the right play school for your child.";

  const pageKeywords = [
    "play school near khandagiri, bhubaneswar",
    "best play school in bhubaneswar",
    "best kids school in bhubaneswar",
    "top best nursery school in bhubaneswar",
    "best play school in bhubaneswar with fees",
    "play school fees in bhubaneswar",
    "which school is best for my child",
    "best play school for kids in bhubaneswar",
    "Nanda Kidz The Little Kingdom A Play School",
    "Best play school in Kalinganagar",
    "Nanda Kidz Best play school in Bhubaneswar",
    "best school for lkg in bhubaneswar",
  ];

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which school is best for my child?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "The right school is one where your child feels safe, comfortable and encouraged to learn. Parents can consider the learning approach, classroom environment, activities, care, communication and safety practices before making a decision.",
        },
      },
      {
        "@type": "Question",
        name: "How much are play school fees in Bhubaneswar?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Play school fees in Bhubaneswar can vary depending on the program, duration, activities and other services included. Parents should contact Nanda Kidz for the latest fee details and applicable terms.",
        },
      },
      {
        "@type": "Question",
        name: "Is Nanda Kidz near Khandagiri, Bhubaneswar?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Nanda Kidz – The Little Kingdom is located in Kalinganagar, Bhubaneswar and is convenient for families looking for a play school near Khandagiri, Bhubaneswar.",
        },
      },
      {
        "@type": "Question",
        name: "Does Nanda Kidz provide LKG admission?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Parents looking for a best school for LKG in Bhubaneswar can contact Nanda Kidz to understand the available class structure, admission age, current admission status and learning activities.",
        },
      },
      {
        "@type": "Question",
        name: "What should parents check before choosing a play school?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Parents should consider the school's learning approach, classroom environment, child supervision, hygiene, safety procedures, activities, transport arrangements, communication and fee structure before admission.",
        },
      },
    ],
  };

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
    ],
    knowsAbout: [
      "Preschool education",
      "Play-based learning",
      "Early childhood development",
      "Nursery education",
      "LKG education",
      "Child safety",
    ],
  };

  return (
    <>
      <Helmet>
        {/* =====================================================
            PRIMARY SEO
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
            TWITTER
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
            FAQ STRUCTURED DATA
        ====================================================== */}

        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>

        {/* =====================================================
            PRESCHOOL STRUCTURED DATA
        ====================================================== */}

        <script type="application/ld+json">
          {JSON.stringify(preschoolStructuredData)}
        </script>
      </Helmet>

      <main className="faq-page">
        <FaqBreadcurm />
        <FaqSection />
        <QuestionsSection />
      </main>
    </>
  );
};

export default Faq;