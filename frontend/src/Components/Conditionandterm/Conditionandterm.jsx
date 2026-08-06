import React from 'react';
import { Home, Info, Phone, Mail, MapPin } from 'lucide-react';
import './conditionandterm.css';

const conditionandterm = () => {
  return (
    <div className="terms-container">
      <div className="terms-wrapper">
        
        {/* Page Title & Subtitle */}
        <h1 className="terms-title">Terms and Conditions</h1>
        <p className="terms-subtitle">
          These Terms and Conditions govern your use of our school website and the online payment services provided through our payment gateway.
        </p>

        {/* Info Box */}
        <div className="info-box">
          <Info className="info-icon" />
          <p className="info-text">
            By accessing this website or using our services, you agree to be bound by these Terms and Conditions.
          </p>
        </div>

        {/* Content Sections */}
        <div className="terms-content">
          
          {/* Section 1 */}
          <section className="terms-section">
            <h2 className="section-title">1. General</h2>
            <p>
              This website is owned and operated by our school. By using this website, you agree to comply with and be bound by these Terms and Conditions and our Privacy Policy.
            </p>
          </section>

          {/* Section 2 */}
          <section className="terms-section">
            <h2 className="section-title">2. School Services</h2>
            <p>
              The information provided on this website is for general information about our school, including admissions, academics, facilities, events, and activities. We reserve the right to modify or update any content on this website at any time without prior notice.
            </p>
          </section>

          {/* Section 3 */}
          <section className="terms-section">
            <h2 className="section-title">3. User Responsibilities</h2>
            <ul className="terms-list">
              <li>You agree to use this website only for lawful purposes.</li>
              <li>You must not misuse the website or try to gain unauthorized access to any part of it.</li>
              <li>You are responsible for ensuring that the information you provide (e.g., during admission or inquiries) is accurate and complete.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="terms-section">
            <h2 className="section-title">4. Payments and Fees</h2>
            <ul className="terms-list">
              <li>All fee payments must be made through the online payment gateway provided on our website.</li>
              <li>We accept payments via credit/debit cards, UPI, net banking, and other modes as displayed.</li>
              <li>Fees once paid are generally non-refundable, except in cases mentioned in our Refund Policy.</li>
              <li>It is the responsibility of the parent/guardian to ensure the correctness of payment details before confirming any transaction.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="terms-section">
            <h2 className="section-title">5. Payment Gateway</h2>
            <ul className="terms-list">
              <li>Our website uses a secure third-party payment gateway to process online payments.</li>
              <li>We do not store any of your card or banking details on our servers.</li>
              <li>All transactions are encrypted and processed securely by the payment gateway service provider.</li>
              <li>For any payment-related issues, please contact the payment gateway support team or our school office.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="terms-section">
            <h2 className="section-title">6. Refund Policy</h2>
            <p>
              Refunds, if applicable, will be processed as per the school's{' '}
              <a href="#" className="refund-link">refund policy</a>. The decision of the school management in this regard shall be final.
            </p>
          </section>

          {/* Section 7 */}
          <section className="terms-section">
            <h2 className="section-title">7. Limitation of Liability</h2>
            <p>
              We are not liable for any direct, indirect, incidental, or consequential damages arising from the use of this website or any payment-related issues beyond our control.
            </p>
          </section>

          {/* Section 8 */}
          <section className="terms-section">
            <h2 className="section-title">8. Changes to Terms</h2>
            <p>
              We may update these Terms and Conditions at any time. All changes will be posted on this page with the updated effective date.
            </p>
          </section>

          {/* Section 9 */}
          <section className="terms-section">
            <h2 className="section-title">9. Governing Law</h2>
            <p>
              These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in our city.
            </p>
          </section>

          {/* Section 10 - Contact Cards */}
          <section className="terms-section contact-section">
            <h2 className="section-title">10. Contact Us</h2>
            <p className="contact-subtitle">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            
            <div className="contact-cards-grid">
              {/* Phone Card */}
              <div className="contact-card">
                <div className="contact-icon-wrapper">
                  <Phone className="contact-icon" />
                </div>
                <div>
                  <div className="contact-label">Phone</div>
                  <div className="contact-value">+91 1234567890</div>
                </div>
              </div>

              {/* Email Card */}
              <div className="contact-card">
                <div className="contact-icon-wrapper">
                  <Mail className="contact-icon" />
                </div>
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-value">info@schoolname.edu.in</div>
                </div>
              </div>

              {/* Address Card */}
              <div className="contact-card">
                <div className="contact-icon-wrapper">
                  <MapPin className="contact-icon" />
                </div>
                <div>
                  <div className="contact-label">Address</div>
                  <div className="contact-value">123 School Road, Your City, State - PIN</div>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Footer */}
        <footer className="terms-footer">
          © 2025 Your School Name. All rights reserved.
        </footer>

      </div>
    </div>
  );
};

export default conditionandterm;