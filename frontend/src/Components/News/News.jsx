import React, { useState, useEffect } from "react";
import API from "../../api/axios"; // Adjust path to your axios instance if needed
import "./News.css";

/*
 * NEWS TICKER
 * Dynamically fetches announcements from the backend database
 * and loops them seamlessly across the marquee.
 */

const ICON = "✦";

const News = () => {
  const [newsItems, setNewsItems] = useState([
    "Don't hold it. Live it. Spread it.", // Fallback default item
  ]);
  const [loading, setLoading] = useState(true);

  // Fetch announcements from backend API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await API.get("/announcements");
        if (response.data?.success && response.data.data.length > 0) {
          // Extract only the active/created headings from the database
          const fetchedHeadings = response.data.data
            .filter((item) => !item.status || item.status === "Active")
            .map((item) => item.heading);

          if (fetchedHeadings.length > 0) {
            setNewsItems(fetchedHeadings);
          }
        }
      } catch (error) {
        console.error("Failed to fetch marquee announcements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Duplicate items once so the CSS scroll loops seamlessly at -50%
  const loopItems = [...newsItems, ...newsItems];

  return (
    <div className="news-container" role="region" aria-label="Latest news">
      {/* Fixed label ribbon */}
      <div className="news-label">
        <span className="news-label-icon" aria-hidden="true">
          🎉
        </span>
        <span>Latest News</span>
      </div>

      {/* Scrolling ticker */}
      <div className="news-marquee">
        <div className="marquee-track">
          {[0, 1].map((groupIndex) => (
            <div
              className="marquee-content"
              key={groupIndex}
              aria-hidden={groupIndex === 1 ? "true" : undefined}
            >
              {loopItems.map((text, index) => (
                <React.Fragment key={`${groupIndex}-${index}`}>
                  <span className="news-text" data-text={text}>
                    {text}
                  </span>

                  <span className="news-icon" aria-hidden="true">
                    {ICON}
                  </span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;