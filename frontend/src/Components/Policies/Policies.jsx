import React from 'react';
import './Policies.css'; // Make sure this CSS file is in the same folder

const Policies = () => {
  return (
    <div className="policy-wrapper">
      <div 
    
      >
        <div className="policy-inner-padding">
          
          {/* Main Title */}
          <h1 className="policy-main-title">Privacy Policy</h1>

          {/* Introductory Paragraph */}
          <p className="policy-paragraph policy-intro-text">
            At our school, the privacy and security of our students, parents, and guardians are very important to us. This Privacy Policy explains how we collect, use, protect, and share personal information.
          </p>

          {/* Section 1 */}
          <div className="policy-section">
            <h2 className="policy-section-title">1. Information We Collect</h2>
            <p className="policy-paragraph">
              We collect personal information that you provide to us, such as the student’s name, date of birth, address, contact details, health information, academic records, and emergency contacts.
            </p>
          </div>

          {/* Section 2 */}
          <div className="policy-section">
            <h2 className="policy-section-title">2. How We Use Information</h2>
            <p className="policy-paragraph">
              We use the information to provide quality education, communicate with parents and guardians, ensure student safety, maintain records, and improve our school services and overall learning experience.
            </p>
          </div>

          {/* Section 3 */}
          <div className="policy-section">
            <h2 className="policy-section-title">3. Information Protection</h2>
            <p className="policy-paragraph">
              We take appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. We keep student and parent data confidential and use it only for legitimate school purposes.
            </p>
          </div>

          {/* Section 4 */}
          <div className="policy-section">
            <h2 className="policy-section-title">4. Information Sharing</h2>
            <p className="policy-paragraph">
              We do not sell or rent your personal information. We may share information only with trusted third parties who assist us in operating our school, such as educational service providers, and only when necessary and subject to confidentiality obligations or as required by law.
            </p>
          </div>

          {/* Section 5 */}
          <div className="policy-section">
            <h2 className="policy-section-title">5. Your Rights</h2>
            <p className="policy-paragraph">
              You have the right to access, update, or request the deletion of your personal information. If you have any questions or concerns about your data, please contact us.
            </p>
          </div>

          {/* Section 6 */}
          <div className="policy-section">
            <h2 className="policy-section-title">6. Policy Updates</h2>
            <p className="policy-paragraph">
              We may update this Privacy Policy from time to time. Any changes will be posted on our website or communicated to you, and will be effective immediately.
            </p>
          </div>

          {/* Closing Sentence */}
          <p className="policy-paragraph policy-closing-text">
            Your trust means a lot to us. We are committed to keeping your information safe and secure.
          </p>

        </div>
      </div>
    </div>
  );
};

export default Policies;