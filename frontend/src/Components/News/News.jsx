import React from "react";
import "./News.css";

/*
 * NEWS TICKER
 * A fixed "Latest News" ribbon sits on the left; the announcements scroll
 * past it in an endless, seamless loop (no jump/reset visible).
 *
 * To add/edit announcements, just edit the NEWS_ITEMS array below.
 */

const NEWS_ITEMS = [
  "Don't hold it. Live it. Spread it.",
  "Admissions open for the new session",
  "Book a free campus tour this week",
];

const ICON = "✦"; // change to ★ • ⭑ etc. if you like

const News = () => {
  // Duplicated once so the scroll can loop seamlessly at -50%
  const loopItems = [...NEWS_ITEMS, ...NEWS_ITEMS];

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