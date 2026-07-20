import React, { useEffect, useState } from 'react';
import './HomeTailoredClasses.css';

// Importing local images (Replace with your actual paths if needed)
import westernMusicImg from '../../assets/Image1.webp';
import orchestraPlayingImg from '../../assets/image2.webp';
import engineeringClassImg from '../../assets/image3.webp';
import kidsPlayingImg from '../../assets/image4.webp';
import artClubImg from '../../assets/image5.webp';
import paintingClassImg from '../../assets/image6.webp';

const HomeTailoredClasses = () => {
  const [isAnimate, setIsAnimate] = useState(false);

  useEffect(() => {
    // Trigger entrance animation on page mount
    setIsAnimate(true);
  }, []);

  const cardData = [
    {
      id: 1,
      image: westernMusicImg,
      title: "Western Music Club",
      description: "Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Tortor at risus viverra adipiscing at.",
      isSoldOut: true,
      reviews: 2,
      stars: [true, true, true, true, false] // 4.5 stars layout approximation
    },
    {
      id: 2,
      image: orchestraPlayingImg,
      title: "Orchestra Playing",
      description: "Orci nulla pellentesque dignissim enim. Et egestas quis ipsum suspendisse ultrices.",
      isSoldOut: false,
      reviews: 1,
      stars: [true, true, true, true, true]
    },
    {
      id: 3,
      image: engineeringClassImg,
      title: "Engineering Class",
      description: "Penatibus et magnis dis parturient montes nascetur ridiculus. Arcu cursus euismod quis viverra.",
      isSoldOut: false,
      reviews: 1,
      stars: [true, true, true, true, false]
    },
    {
      id: 4,
      image: kidsPlayingImg,
      title: "Kids Playing Club",
      description: "Erat imperdiet sed euismod nisi porta lorem mollis. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus.",
      isSoldOut: false,
      reviews: 1,
      stars: [true, true, true, true, false]
    },
    {
      id: 5,
      image: artClubImg,
      title: "Art Club",
      description: "Elementum nisi quis eleifend quam adipiscing vitae. Sit amet consectetur adipiscing elit pellentesque.",
      isSoldOut: false,
      reviews: 1,
      stars: [true, true, true, true, true]
    },
    {
      id: 6,
      image: paintingClassImg,
      title: "Painting Class",
      description: "Tellus rutrum tellus pellentesque eu tincidunt. Ullamcorper eget nulla facilisi etiam dignissim diam.",
      isSoldOut: false,
      reviews: 1,
      stars: [true, true, false, false, false]
    }
  ];

  return (
    <div className="tailored-classes-container">
      {/* Header Section */}
      <header className={`tc-header ${isAnimate ? 'fade-in-up' : ''}`}>
        {/* Abstract Green Worm Shape */}
        <div className="shape-worm">
          <svg viewBox="0 0 100 50" width="80" height="40">
            <path d="M10,30 Q25,10 40,30 T70,30 T90,20" fill="none" stroke="#22c55e" strokeWidth="12" strokeLinecap="round"/>
            <circle cx="25" cy="22" r="3" fill="#1e293b"/>
            <circle cx="55" cy="28" r="3" fill="#1e293b"/>
            <circle cx="75" cy="26" r="3" fill="#1e293b"/>
          </svg>
        </div>

        <span className="tc-subtitle">TAILORED CLASSES</span>
        <h1 className="tc-title">
          Unique Approaches To Teaching<br />
          Combined Technology &amp;<br />
          Learning.
        </h1>

        {/* Abstract Yellow Star Shape */}
        <div className="shape-star">
          <svg viewBox="0 0 100 100" width="90" height="90">
            <path d="M50,0 L63,35 L100,35 L70,57 L81,95 L50,73 L19,95 L30,57 L0,35 L37,35 Z" fill="#eab308" stroke="#1e293b" strokeWidth="2"/>
          </svg>
        </div>
      </header>

      {/* Grid Layout Section */}
      <main className="tc-grid">
        {cardData.map((item) => (
          <div key={item.id} className="tc-card">
            
            {/* Image Container with Hover Effects */}
            <div className="tc-image-wrapper">
              {item.isSoldOut && <div className="tc-badge-sold">SOLD OUT</div>}
              <img src={item.image} alt={item.title} className="tc-card-image" />
              
              {/* Hover Floating Action Buttons */}
              <div className="tc-hover-actions">
                <button className="action-btn check-btn" title="Approve">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button className="action-btn view-btn" title="Quick View">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button className="action-btn wishlist-btn" title="Add to Wishlist">
                  <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Card Content Elements */}
            <div className="tc-card-content">
              <h3 className="tc-card-title">{item.title}</h3>
              <p className="tc-card-desc">{item.description}</p>
              
              <div className="tc-card-price">{item.price}</div>
              
              {/* Dynamic Action Buttons based on state */}
              {item.isSoldOut ? (
                <button className="tc-btn btn-sold-out">
                  SOLD OUT 
                  <span className="arrow-icon">↗</span>
                </button>
              ) : (
                <button className="tc-btn btn-add-cart">
                  ADD TO CART 
                  <span className="arrow-icon">↗</span>
                </button>
              )}

              {/* Star Rating Layout */}
              <div className="tc-rating-container">
                <div className="stars-row">
                  {item.stars.map((filled, index) => (
                    <span key={index} className={`star ${filled ? 'filled' : 'empty'}`}>★</span>
                  ))}
                </div>
                <span className="reviews-text">{item.reviews} {item.reviews > 1 ? 'reviews' : 'review'}</span>
              </div>
            </div>

          </div>
        ))}
      </main>

      {/* Main Bottom Footer Button */}
      <div className="tc-footer-actions">
        <button className="tc-btn-view-all">
          VIEW ALL <span className="arrow-icon-large">↗</span>
        </button>
      </div>
    </div>
  );
};

export default HomeTailoredClasses;