import React, { useEffect, useState, useRef } from 'react';
import './HeroSection.css';

// Import all background, decorative, and children elements
import bgImage from '../../assets/bg-1.jpg';
import child1 from '../../assets/c-1.webp';
import child2 from '../../assets/c-2.webp';
import child3 from '../../assets/c-3.webp';
import child4 from '../../assets/c-4.webp';
import child5 from '../../assets/c-5.webp';
import child6 from '../../assets/c-6.webp';
import child7 from '../../assets/c-7.webp';
import child8 from '../../assets/c-8.webp';
import child9 from '../../assets/c-9.webp';

// Decorative vectors overlapping the grid
import giraffeAsset from '../../assets/jeeraf.png';
import flowerBlue from '../../assets/flower.png';

/* Balanced 4-image columns (was 3 left / 5 right, which left a large
   empty gap under the shorter columns). Each entry carries its own
   height class (defined in HeroSection.css) and alt text. */
const LEFT_COLUMN_IMAGES = [
  { src: child7, alt: 'Kids hugging', heightClass: 'img-child7' },
  { src: child1, alt: 'Classroom learning', heightClass: 'img-child1' },
  { src: child3, alt: 'Child drawing', heightClass: 'img-child3' },
  { src: child9, alt: 'Girl blowing bubbles', heightClass: 'img-child9' },
];

const RIGHT_COLUMN_IMAGES = [
  { src: child8, alt: 'Kids with tablet', heightClass: 'img-child8' },
  { src: child2, alt: 'Girl playing flute', heightClass: 'img-child2' },
  { src: child5, alt: 'Smiling girl', heightClass: 'img-child5' },
  { src: child6, alt: 'Kids playing percussion instruments', heightClass: 'img-child6' },
];

const HeroSection = () => {
  // Target position (where the user actually scrolled to)
  const scrollTarget = useRef(0);
  // Current interpolated position (smoothly catches up to target)
  const scrollCurrent = useRef(0);

  const [animatedY, setAnimatedY] = useState(0);
  const [activeModalImage, setActiveModalImage] = useState(null);
  const [revealedCards, setRevealedCards] = useState({});

  const cardRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      scrollTarget.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Smooth Lerp Rendering Loop
    let animationFrameId;
    const renderLoop = () => {
      scrollCurrent.current += (scrollTarget.current - scrollCurrent.current) * 0.08;
      setAnimatedY(scrollCurrent.current);
      animationFrameId = window.requestAnimationFrame(renderLoop);
    };

    animationFrameId = window.requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Staggered scroll-reveal for each card
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.cardIndex);
            setRevealedCards((prev) => (prev[idx] ? prev : { ...prev, [idx]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Multipliers for the scrolling layers
  const imageGridScrollOffset = animatedY * 0.45;
  const backgroundScrollOffset = animatedY * 0.25;

  const handleCardClick = (imgSrc, altText) => {
    setActiveModalImage({ src: imgSrc, alt: altText });
  };

  const closeModal = () => {
    setActiveModalImage(null);
  };

  const setCardRef = (index) => (el) => {
    cardRefs.current[index] = el;
  };

  const renderCard = (item, index, extraClass = '') => (
    <div
      key={item.alt}
      ref={setCardRef(index)}
      data-card-index={index}
      className={`HeroSection-card ${item.heightClass} ${extraClass} ${
        revealedCards[index] ? 'is-revealed' : ''
      }`}
      style={{ '--reveal-delay': `${index * 80}ms` }}
      onClick={() => handleCardClick(item.src, item.alt)}
    >
      <img src={item.src} alt={item.alt} />
      <div className="HeroSection-eyeOverlay">
        <div className="cartoon-eye-icon">👀</div>
      </div>
    </div>
  );

  return (
    <div
      className="HeroSection"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPositionY: `${backgroundScrollOffset}px`,
      }}
    >
      {/* Decorative Assets */}
      <img src={giraffeAsset} className="HeroSection-giraffe" alt="" />
      <img
        src={flowerBlue}
        className="HeroSection-flower"
        style={{ transform: `translateY(${imageGridScrollOffset * 0.8}px)` }}
        alt=""
      />

      {/* Synced Layout Wrapper Container with Lerped Parallax */}
      <div
        className="HeroSection-gridWrapper"
        style={{ transform: `translateY(${imageGridScrollOffset}px)` }}
      >

        {/* Left Column Stack */}
        <div className="HeroSection-col LeftCol">
          {LEFT_COLUMN_IMAGES.map((item, i) =>
            renderCard(item, i, i === 0 ? 'rounded-tr-lg' : '')
          )}
        </div>

        {/* Center Text & Tall Content Section */}
        <div className="HeroSection-centerContent">
          <div className="HeroSection-textBlock">
            <span className="HeroSection-subtitle">Nanda Kidz</span>
            <h1 className="HeroSection-title MainTitle">
              The Little <br />
              <span className="HeroSection-titleGreen">Kingdom</span>
            </h1>
          </div>

          {/* Centered Tall Card */}
          {renderCard(
            { src: child4, alt: 'Girl full body playing', heightClass: 'img-child4' },
            LEFT_COLUMN_IMAGES.length
          )}
        </div>

        {/* Right Column Stack */}
        <div className="HeroSection-col RightCol">
          {RIGHT_COLUMN_IMAGES.map((item, i) =>
            renderCard(item, LEFT_COLUMN_IMAGES.length + 1 + i)
          )}
        </div>

      </div>

      {/* Animated Cartoon Eye Popup Modal Format */}
      {activeModalImage && (
        <div className="HeroSection-modalBackdrop" onClick={closeModal}>
          <div className="HeroSection-modalContainer animate-popIn" onClick={(e) => e.stopPropagation()}>
            <div className="HeroSection-modalCloseBtn" onClick={closeModal}>&times;</div>
            <div className="HeroSection-modalFrame">
              <div className="cartoon-preview-badge">✨ Magic View ✨</div>
              <img src={activeModalImage.src} alt={activeModalImage.alt} className="HeroSection-modalImage" />
              <div className="cartoon-eye-decoration left-eye">
                <div className="eyeball"><div className="pupil"></div></div>
              </div>
              <div className="cartoon-eye-decoration right-eye">
                <div className="eyeball"><div className="pupil"></div></div>
              </div>
            </div>
            <p className="HeroSection-modalCaption">{activeModalImage.alt}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;