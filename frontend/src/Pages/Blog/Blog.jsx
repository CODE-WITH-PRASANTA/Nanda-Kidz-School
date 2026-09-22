import React from "react";
import { Helmet } from "react-helmet-async";

import BlogBreadCrumb from "../../Components/BlogBreadCrumb/BlogBreadCrumb";
import Blogpicture from "../../Components/Blogpicture/Blogpicture";

const Blog = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Nanda Kidz – The Little Kingdom Blog",
    description:
      "Read helpful articles from Nanda Kidz about early childhood learning, parenting, toddler development, play-based education and choosing the right school for your child.",
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
    about: [
      "Early childhood education",
      "Toddler learning",
      "Play-based learning",
      "Parenting",
      "Preschool education",
    ],
  };

  return (
    <>
      <Helmet>
        {/* =========================
            BASIC SEO
        ========================== */}
        <title>
          Which School Is Best for My Child? | Nanda Kidz Blog
        </title>

        <meta
          name="description"
          content="Explore the Nanda Kidz blog for helpful insights on early childhood education, toddler development, play-based learning, parenting and choosing the right school for your child in Bhubaneswar."
        />

        <meta
          name="keywords"
          content="which school is best for my child, best play school in bhubaneswar, best play school for kids in bhubaneswar, Nanda Kidz, Nanda Kidz The Little Kingdom A Play School, best kids school in bhubaneswar, top best nursery school in bhubaneswar, play school near khandagiri bhubaneswar, play school fees in bhubaneswar, Best play school in Kalinganagar"
        />

        <meta
          name="author"
          content="Nanda Kidz – The Little Kingdom"
        />

        <meta name="robots" content="index, follow" />

        <meta name="language" content="English" />

        <meta name="revisit-after" content="7 days" />

        {/* =========================
            LOCATION SEO
        ========================== */}
        <meta name="geo.region" content="IN-OR" />
        <meta
          name="geo.placename"
          content="Bhubaneswar, Odisha"
        />

        {/* =========================
            OPEN GRAPH
        ========================== */}
        <meta
          property="og:title"
          content="Which School Is Best for My Child? | Nanda Kidz Blog"
        />

        <meta
          property="og:description"
          content="Discover useful parenting and early-learning insights from Nanda Kidz – The Little Kingdom, a child-friendly play school in Bhubaneswar."
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
            TWITTER / SOCIAL SEO
        ========================== */}
        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Which School Is Best for My Child? | Nanda Kidz Blog"
        />

        <meta
          name="twitter:description"
          content="Read helpful articles about early learning, toddler development, parenting and choosing the right play school for your child."
        />

        {/* =========================
            MOBILE / BROWSER
        ========================== */}
        <meta
          name="theme-color"
          content="#17835f"
        />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />

        {/* =========================
            STRUCTURED DATA
        ========================== */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <main className="blog-page">
        <BlogBreadCrumb />
        <Blogpicture />
      </main>
    </>
  );
};

export default Blog;