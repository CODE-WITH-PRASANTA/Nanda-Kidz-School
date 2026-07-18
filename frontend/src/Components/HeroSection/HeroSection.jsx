import React, { useEffect, useState, useRef } from 'react';
import './HeroSection.css';

// Import all background, decorative, and children elements
import bgImage from '../../assets/bg-1.jpg';
import child1 from '../../assets/c-1.jpg'; 
import child2 from '../../assets/c-2.jpg'; 
import child3 from '../../assets/c-3.jpg'; 
import child4 from '../../assets/c-4.jpg'; 
import child5 from '../../assets/c-5.jpg'; 
import child6 from '../../assets/c-6.jpg'; 
import child7 from '../../assets/c-7.jpg'; 
import child8 from '../../assets/c-8.jpg'; 
import child9 from '../../assets/c-9.jpg'; 

// Decorative vectors overlapping the grid
import giraffeAsset from '../../assets/jeeraf.png'; 
import flowerBlue from '../../assets/flower.png';

const HeroSection = () => {
  // Target position (where the user actually scrolled to)
  const scrollTarget = useRef(0);
  // Current interpolated position (smoothly catches up to target)
  const scrollCurrent = useRef(0);
  
  const [animatedY, setAnimatedY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollTarget.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Smooth Lerp Rendering Loop
    let animationFrameId;
    const renderLoop = () => {
      // Linear interpolation formula: current = current + (target - current) * easeFactor
      // 0.08 offers an extremely fluid, cushioned ease-out response
      scrollCurrent.current += (scrollTarget.current - scrollCurrent.current) * 0.08;
      
      // Update state to trigger smooth transform updates
      setAnimatedY(scrollCurrent.current);
      
      animationFrameId = window.requestAnimationFrame(renderLoop);
    };
    
    animationFrameId = window.requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Multipliers for the scrolling layers
  const imageGridScrollOffset = animatedY * 0.45; 
  const backgroundScrollOffset = animatedY * 0.25;

  return (
    <div 
      className="HeroSection" 
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundPositionY: `${backgroundScrollOffset}px`
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

      {/* Floating Action CTA Menu Container */}
      

      {/* Synced Layout Wrapper Container with Lerped Parallax */}
      <div 
        className="HeroSection-gridWrapper"
        style={{ transform: `translateY(${imageGridScrollOffset}px)` }}
      >
        
        {/* Left Column Stack */}
        <div className="HeroSection-col LeftCol">
          <div className="HeroSection-card img-child7 rounded-tr-lg">
            <img src={child7} alt="Kids hugging" />
          </div>
          <div className="HeroSection-card img-child1">
            <img src={child1} alt="Classroom learning" />
          </div>
          <div className="HeroSection-card img-child3">
            <img src={child3} alt="Child drawing" />
          </div>
        </div>

        {/* Center Text & Tall Content Section */}
        <div className="HeroSection-centerContent">
          <div className="HeroSection-textBlock">
            <span className="HeroSection-subtitle">EXPLORE OUR WORLD</span>
            <h1 className="HeroSection-title MainTitle">
              School <br />
              <span className="HeroSection-titleGreen">Lab</span>
            </h1>
          </div>
          
          {/* Centered Tall Card */}
          <div className="HeroSection-card img-child4">
            <img src={child4} alt="Girl full body playing" />
          </div>
        </div>

        {/* Right Column Stack */}
        <div className="HeroSection-col RightCol">
          <div className="HeroSection-card img-child8">
            <img src={child8} alt="Kids with tablet" />
          </div>
          <div className="HeroSection-card img-child2">
            <img src={child2} alt="Girl playing flute" />
          </div>
          <div className="HeroSection-card img-child5">
            <img src={child5} alt="Smiling girl" />
          </div>
          <div className="HeroSection-card img-child9">
            <img src={child9} alt="Girl blowing bubbles" />
          </div>
          <div className="HeroSection-card img-child6">
            <img src={child6} alt="Kids playing percussion instruments" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;