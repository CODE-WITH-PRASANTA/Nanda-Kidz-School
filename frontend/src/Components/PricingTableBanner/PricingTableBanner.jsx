import React from 'react';
import './PricingTableBanner.css'; 
import pricing_banner from '../../assets/pricing-banner.webp';

const PricingTableBanner = () => {
  return (
    <>
      <section 
        className="PricingTableBanner-container"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${pricing_banner})` 
        }}
      >
        <div className="PricingTableBanner-content">
          <h1 className="PricingTableBanner-title">Pricing</h1>
          <div className="PricingTableBanner-breadcrumbs">
            <span className="PricingTableBanner-breadcrumb-home">Home</span>
            <span className="PricingTableBanner-breadcrumb-separator">|</span>
            <span className="PricingTableBanner-breadcrumb-current">Pricing</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default PricingTableBanner;