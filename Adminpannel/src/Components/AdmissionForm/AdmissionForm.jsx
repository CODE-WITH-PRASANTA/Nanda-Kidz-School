import React, { useState, useRef } from 'react';
import {
  FaArrowLeft,
  FaUserFriends,
  FaBus,
  FaUserGraduate,
  FaBookOpen,
  FaCheckCircle,
  FaUpload,
  FaEdit,
  FaEye,
  FaInfoCircle,
  FaShieldAlt,
  FaRegSave
} from 'react-icons/fa';
import './AdmissionForm.css';

// Import image for right side banner
import schoolHeroImg from '../../assets/nan1.png';

const AdmissionForm = () => {
  // Stepper State
  const [currentStep, setCurrentStep] = useState(1);

  // File Upload State for Documents Checklist
  const [uploadedFiles, setUploadedFiles] = useState({
    birthCertificate: null,
    aadhaarCard: null,
    addressProof: null,
    passportPhoto: null,
    previousTc: null
  });

  // File Input References
  const fileInputRefs = {
    birthCertificate: useRef(null),
    aadhaarCard: useRef(null),
    addressProof: useRef(null),
    passportPhoto: useRef(null),
    previousTc: useRef(null)
  };

  // Form Fields State
  const [formData, setFormData] = useState({
    fatherName: 'Ramesh Kumar',
    motherName: 'Sunita Kumari',
    email: 'ramesh.kumar@example.com',
    mobile: '9876543210',
    altMobile: '',
    occupation: '',
    address: '123, Green Street, Patna',
    city: 'Patna',
    state: 'Bihar',
    pincode: '800001',
    parentStatus: 'Father',
    annualIncome: '5 - 10 Lakh',

    transportRequired: 'Yes',
    pickupLocation: 'Green Street',
    dropLocation: 'Nanda Kidz School',
    routeBus: 'Route 3 / Bus 12',
    pickupTime: '08:00 AM',
    dropTime: '02:30 PM',

    studentName: 'Aarav Kumar',
    dob: '2020-08-15',
    gender: 'Male',
    bloodGroup: 'B+',
    aadhaar: '[Aadhaar Redacted]',
    nationality: 'Indian',
    religion: 'Hindu',
    caste: 'General',
    specialNeeds: 'No',

    admissionClass: 'Nursery',
    session: '2025-2026',
    medium: 'English',
    admissionDate: '2025-06-01',
    previousSchool: 'Little Learners Play School',
    lastClassCompleted: 'Not Applicable',

    notes: ''
  });

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // File select handler
  const handleFileChange = (e, docKey) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds maximum limit of 2MB.');
        return;
      }
      setUploadedFiles((prev) => ({ ...prev, [docKey]: file.name }));
    }
  };

  // Trigger click on corresponding file input
  const triggerFileUpload = (docKey) => {
    if (fileInputRefs[docKey] && fileInputRefs[docKey].current) {
      fileInputRefs[docKey].current.click();
    }
  };

  // Save & Next Navigation
  const handleSaveAndNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    } else {
      alert('You have reached the final review step!');
    }
  };

  const handleBackToStudents = () => {
    window.history.back();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Admission form saved & submitted successfully!');
  };

  return (
    <div className="admission-container">
      {/* TOP HEADER / STEPPER (Image 1 with hover interactions) */}
      <div className="admission-header-card">
        <button className="back-btn" onClick={handleBackToStudents}>
          <FaArrowLeft /> Back to Students
        </button>

        <div className="stepper-wrapper">
          {/* Step 1 */}
          <div
            className={`step-item ${currentStep === 1 ? 'active' : ''}`}
            onClick={() => setCurrentStep(1)}
          >
            <div className="step-icon-bg purple">
              <FaUserFriends />
            </div>
            <div className="step-text">
              <span className="step-num">1</span>
              <span className="step-label">Parent Info</span>
            </div>
          </div>
          <span className="step-arrow">→</span>

          {/* Step 2 */}
          <div
            className={`step-item ${currentStep === 2 ? 'active' : ''}`}
            onClick={() => setCurrentStep(2)}
          >
            <div className="step-icon-bg green-bus">
              <FaBus />
            </div>
            <div className="step-text">
              <span className="step-num">2</span>
              <span className="step-label">Transport Info</span>
            </div>
          </div>
          <span className="step-arrow">→</span>

          {/* Step 3 */}
          <div
            className={`step-item ${currentStep === 3 ? 'active' : ''}`}
            onClick={() => setCurrentStep(3)}
          >
            <div className="step-icon-bg orange-student">
              <FaUserGraduate />
            </div>
            <div className="step-text">
              <span className="step-num">3</span>
              <span className="step-label">Student Details</span>
            </div>
          </div>
          <span className="step-arrow">→</span>

          {/* Step 4 */}
          <div
            className={`step-item ${currentStep === 4 ? 'active' : ''}`}
            onClick={() => setCurrentStep(4)}
          >
            <div className="step-icon-bg blue-book">
              <FaBookOpen />
            </div>
            <div className="step-text">
              <span className="step-num">4</span>
              <span className="step-label">Class Admission</span>
            </div>
          </div>
          <span className="step-arrow">→</span>

          {/* Step 5 */}
          <div
            className={`step-item ${currentStep === 5 ? 'active' : ''}`}
            onClick={() => setCurrentStep(5)}
          >
            <div className="step-icon-bg green-check">
              <FaCheckCircle />
            </div>
            <div className="step-text">
              <span className="step-num">5</span>
              <span className="step-label">Review & Submit</span>
            </div>
          </div>
        </div>
      </div>

      {/* TWO COLUMN SPLIT BODY */}
      <div className="admission-body-grid">
        {/* LEFT COLUMN: Form Sections */}
        <div className="admission-left-scroll-pane">
          <form onSubmit={handleSubmit}>
            {/* Image 2: Parent Information */}
            <div className="form-section-card">
              <div className="section-title">
                <FaUserFriends className="title-icon purple" />
                <h3>Parent Information</h3>
              </div>
              <div className="form-grid-3">
                <div className="input-group">
                  <label>Father's Name <span>*</span></label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    placeholder="Enter father's full name"
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Mother's Name <span>*</span></label>
                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    placeholder="Enter mother's full name"
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Email Address <span>*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    required
                  />
                </div>
              </div>

              <div className="form-grid-3">
                <div className="input-group">
                  <label>Mobile Number <span>*</span></label>
                  <div className="phone-prefix-input">
                    <select><option>+91</option></select>
                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter mobile number"
                      required
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label>Alternate Number</label>
                  <div className="phone-prefix-input">
                    <select><option>+91</option></select>
                    <input
                      type="text"
                      name="altMobile"
                      value={formData.altMobile}
                      onChange={handleChange}
                      placeholder="Enter alternate number"
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label>Occupation</label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder="Enter occupation"
                  />
                </div>
              </div>

              <div className="form-grid-span">
                <div className="input-group span-2">
                  <label>Address <span>*</span></label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter full address"
                    required
                  />
                </div>
                <div className="input-group">
                  <label>City <span>*</span></label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    required
                  />
                </div>
                <div className="input-group">
                  <label>State <span>*</span></label>
                  <select name="state" value={formData.state} onChange={handleChange}>
                    <option value="Bihar">Bihar</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Maharashtra">Maharashtra</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-3">
                <div className="input-group">
                  <label>Pincode <span>*</span></label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Enter pincode"
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Parent Status <span>*</span></label>
                  <div className="radio-inline-group">
                    <label>
                      <input
                        type="radio"
                        name="parentStatus"
                        value="Father"
                        checked={formData.parentStatus === 'Father'}
                        onChange={handleChange}
                      /> Father
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="parentStatus"
                        value="Mother"
                        checked={formData.parentStatus === 'Mother'}
                        onChange={handleChange}
                      /> Mother
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="parentStatus"
                        value="Guardian"
                        checked={formData.parentStatus === 'Guardian'}
                        onChange={handleChange}
                      /> Guardian
                    </label>
                  </div>
                </div>
                <div className="input-group">
                  <label>Annual Income</label>
                  <select name="annualIncome" value={formData.annualIncome} onChange={handleChange}>
                    <option value="5 - 10 Lakh">5 - 10 Lakh</option>
                    <option value="10 - 15 Lakh">10 - 15 Lakh</option>
                    <option value="Above 15 Lakh">Above 15 Lakh</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Image 3: Transport Information */}
            <div className="form-section-card yellow-accent">
              <div className="section-title flex-between">
                <div className="title-left">
                  <FaBus className="title-icon orange" />
                  <h3>Transport Information</h3>
                </div>
                <span className="bus-illustration">🚌</span>
              </div>
              <div className="form-grid-3">
                <div className="input-group">
                  <label>Transport Required? <span>*</span></label>
                  <div className="radio-inline-group">
                    <label>
                      <input
                        type="radio"
                        name="transportRequired"
                        value="Yes"
                        checked={formData.transportRequired === 'Yes'}
                        onChange={handleChange}
                      /> Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="transportRequired"
                        value="No"
                        checked={formData.transportRequired === 'No'}
                        onChange={handleChange}
                      /> No
                    </label>
                  </div>
                </div>
                <div className="input-group">
                  <label>Pickup Location <span>*</span></label>
                  <select name="pickupLocation" value={formData.pickupLocation} onChange={handleChange}>
                    <option value="Green Street">Green Street</option>
                    <option value="Central Avenue">Central Avenue</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Drop Location <span>*</span></label>
                  <select name="dropLocation" value={formData.dropLocation} onChange={handleChange}>
                    <option value="Nanda Kidz School">Nanda Kidz School</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-3">
                <div className="input-group">
                  <label>Route / Bus Number</label>
                  <input
                    type="text"
                    name="routeBus"
                    value={formData.routeBus}
                    onChange={handleChange}
                    placeholder="Select route / bus"
                  />
                </div>
                <div className="input-group">
                  <label>Pickup Time</label>
                  <input
                    type="text"
                    name="pickupTime"
                    value={formData.pickupTime}
                    onChange={handleChange}
                    placeholder="Select pickup time"
                  />
                </div>
                <div className="input-group">
                  <label>Drop Time</label>
                  <input
                    type="text"
                    name="dropTime"
                    value={formData.dropTime}
                    onChange={handleChange}
                    placeholder="Select drop time"
                  />
                </div>
              </div>
            </div>

            {/* Image 4: Student Details */}
            <div className="form-section-card">
              <div className="section-title">
                <FaUserGraduate className="title-icon green" />
                <h3>Student Details</h3>
              </div>
              <div className="form-grid-3">
                <div className="input-group">
                  <label>Student's Name <span>*</span></label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    placeholder="Enter student's full name"
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Date of Birth <span>*</span></label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Gender <span>*</span></label>
                  <div className="radio-inline-group">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === 'Male'}
                        onChange={handleChange}
                      /> Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === 'Female'}
                        onChange={handleChange}
                      /> Female
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Other"
                        checked={formData.gender === 'Other'}
                        onChange={handleChange}
                      /> Other
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-grid-3">
                <div className="input-group">
                  <label>Blood Group</label>
                  <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
                    <option value="B+">B+</option>
                    <option value="A+">A+</option>
                    <option value="O+">O+</option>
                    <option value="AB+">AB+</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Aadhaar Number</label>
                  <input
                    type="text"
                    name="aadhaar"
                    value={formData.aadhaar}
                    onChange={handleChange}
                    placeholder="Enter aadhaar number"
                  />
                </div>
                <div className="input-group">
                  <label>Nationality</label>
                  <select name="nationality" value={formData.nationality} onChange={handleChange}>
                    <option value="Indian">Indian</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-3">
                <div className="input-group">
                  <label>Religion</label>
                  <select name="religion" value={formData.religion} onChange={handleChange}>
                    <option value="Hindu">Hindu</option>
                    <option value="Muslim">Muslim</option>
                    <option value="Sikh">Sikh</option>
                    <option value="Christian">Christian</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Caste</label>
                  <select name="caste" value={formData.caste} onChange={handleChange}>
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC/ST">SC/ST</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Special Needs / Medical Condition</label>
                  <input
                    type="text"
                    name="specialNeeds"
                    value={formData.specialNeeds}
                    onChange={handleChange}
                    placeholder="Enter if any"
                  />
                </div>
              </div>
            </div>

            {/* Image 5: Class Admission Details & Documents */}
            <div className="form-section-card">
              <div className="section-title">
                <FaBookOpen className="title-icon blue" />
                <h3>Class Admission Details</h3>
              </div>
              <div className="form-grid-3">
                <div className="input-group">
                  <label>Admission For Class <span>*</span></label>
                  <select name="admissionClass" value={formData.admissionClass} onChange={handleChange}>
                    <option value="Nursery">Nursery</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>
                    <option value="Class 1">Class 1</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Session <span>*</span></label>
                  <select name="session" value={formData.session} onChange={handleChange}>
                    <option value="2025-2026">2025-2026</option>
                    <option value="2026-2027">2026-2027</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Medium <span>*</span></label>
                  <select name="medium" value={formData.medium} onChange={handleChange}>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-3">
                <div className="input-group">
                  <label>Admission Date <span>*</span></label>
                  <input
                    type="date"
                    name="admissionDate"
                    value={formData.admissionDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group">
                  <label>Previous School (if any)</label>
                  <input
                    type="text"
                    name="previousSchool"
                    value={formData.previousSchool}
                    onChange={handleChange}
                    placeholder="Enter previous school name"
                  />
                </div>
                <div className="input-group">
                  <label>Last Class Completed</label>
                  <select name="lastClassCompleted" value={formData.lastClassCompleted} onChange={handleChange}>
                    <option value="Not Applicable">Not Applicable</option>
                    <option value="Playgroup">Playgroup</option>
                  </select>
                </div>
              </div>

              {/* Working Documents Checklist File Upload */}
              <div className="checklist-subcard">
                <div className="section-title pink-title">
                  <span className="doc-icon">📄</span>
                  <h3>Documents Checklist</h3>
                </div>

                <div className="documents-upload-grid">
                  {/* Birth Certificate */}
                  <div className="upload-box-item">
                    <span>Birth Certificate <span>*</span></span>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      ref={fileInputRefs.birthCertificate}
                      style={{ display: 'none' }}
                      onChange={(e) => handleFileChange(e, 'birthCertificate')}
                    />
                    <button
                      type="button"
                      className="upload-btn"
                      onClick={() => triggerFileUpload('birthCertificate')}
                    >
                      <FaUpload /> Upload
                    </button>
                    <span className="file-size-text">
                      {uploadedFiles.birthCertificate ? (
                        <strong className="file-uploaded-name">✓ {uploadedFiles.birthCertificate}</strong>
                      ) : (
                        'Max size 2MB'
                      )}
                    </span>
                  </div>

                  {/* Aadhaar Card */}
                  <div className="upload-box-item">
                    <span>Aadhaar Card <span>*</span></span>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      ref={fileInputRefs.aadhaarCard}
                      style={{ display: 'none' }}
                      onChange={(e) => handleFileChange(e, 'aadhaarCard')}
                    />
                    <button
                      type="button"
                      className="upload-btn"
                      onClick={() => triggerFileUpload('aadhaarCard')}
                    >
                      <FaUpload /> Upload
                    </button>
                    <span className="file-size-text">
                      {uploadedFiles.aadhaarCard ? (
                        <strong className="file-uploaded-name">✓ {uploadedFiles.aadhaarCard}</strong>
                      ) : (
                        'Max size 2MB'
                      )}
                    </span>
                  </div>

                  {/* Address Proof */}
                  <div className="upload-box-item">
                    <span>Address Proof</span>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      ref={fileInputRefs.addressProof}
                      style={{ display: 'none' }}
                      onChange={(e) => handleFileChange(e, 'addressProof')}
                    />
                    <button
                      type="button"
                      className="upload-btn"
                      onClick={() => triggerFileUpload('addressProof')}
                    >
                      <FaUpload /> Upload
                    </button>
                    <span className="file-size-text">
                      {uploadedFiles.addressProof ? (
                        <strong className="file-uploaded-name">✓ {uploadedFiles.addressProof}</strong>
                      ) : (
                        'Max size 2MB'
                      )}
                    </span>
                  </div>

                  {/* Passport Photo */}
                  <div className="upload-box-item">
                    <span>Passport Photo <span>*</span></span>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRefs.passportPhoto}
                      style={{ display: 'none' }}
                      onChange={(e) => handleFileChange(e, 'passportPhoto')}
                    />
                    <button
                      type="button"
                      className="upload-btn"
                      onClick={() => triggerFileUpload('passportPhoto')}
                    >
                      <FaUpload /> Upload
                    </button>
                    <span className="file-size-text">
                      {uploadedFiles.passportPhoto ? (
                        <strong className="file-uploaded-name">✓ {uploadedFiles.passportPhoto}</strong>
                      ) : (
                        'Max size 2MB'
                      )}
                    </span>
                  </div>

                  {/* Previous School TC */}
                  <div className="upload-box-item">
                    <span>Previous School TC</span>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      ref={fileInputRefs.previousTc}
                      style={{ display: 'none' }}
                      onChange={(e) => handleFileChange(e, 'previousTc')}
                    />
                    <button
                      type="button"
                      className="upload-btn"
                      onClick={() => triggerFileUpload('previousTc')}
                    >
                      <FaUpload /> Upload
                    </button>
                    <span className="file-size-text">
                      {uploadedFiles.previousTc ? (
                        <strong className="file-uploaded-name">✓ {uploadedFiles.previousTc}</strong>
                      ) : (
                        'Max size 2MB'
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Notes Field */}
              <div className="input-group margin-top-15">
                <label>Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Add any additional notes here..."
                  rows="2"
                />
              </div>

              {/* Action Buttons with Save & Next logic */}
              <div className="form-action-footer">
                <button type="button" className="btn-cancel" onClick={handleBackToStudents}>
                  Cancel
                </button>
                <div className="right-action-btns">
                  <button type="button" className="btn-save-next" onClick={handleSaveAndNext}>
                    <FaRegSave /> Save & Next Step ({currentStep}/5)
                  </button>
                  <button type="submit" className="btn-save-submit">
                    <FaCheckCircle /> Save & Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Live Preview Cards */}
        <div className="admission-right-pane">
          <div className="preview-container-card">
            <div className="preview-header">
              <FaEye className="eye-icon" />
              <h3>Preview Admission Details</h3>
            </div>

            <div className="preview-body">
              {/* Banner with imported image */}
              <div className="school-hero-banner">
                <img
                  src={schoolHeroImg}
                  alt="Nanda Kidz School Banner"
                  className="hero-img"
                />
                <div className="school-title-text">
                  <h2>Nanda Kidz School</h2>
                  <p>Admission Preview</p>
                </div>
              </div>

              {/* Parent Info Preview Summary */}
              <div className="preview-block">
                <div className="preview-block-header">
                  <div className="title-with-icon">
                    <FaUserFriends className="purple" />
                    <h4>Parent Information</h4>
                  </div>
                  <button className="edit-link" onClick={() => setCurrentStep(1)}>
                    <FaEdit /> Edit
                  </button>
                </div>
                <ul className="preview-data-list">
                  <li><span>Father's Name</span> <strong>{formData.fatherName}</strong></li>
                  <li><span>Mother's Name</span> <strong>{formData.motherName}</strong></li>
                  <li><span>Email Address</span> <strong>{formData.email}</strong></li>
                  <li><span>Mobile Number</span> <strong>+91 {formData.mobile}</strong></li>
                  <li><span>Address</span> <strong>{formData.address}</strong></li>
                  <li>
                    <span>City</span> <strong>{formData.city}</strong>
                    <span className="inline-label">State</span> <strong>{formData.state}</strong>
                  </li>
                  <li><span>Pincode</span> <strong>{formData.pincode}</strong></li>
                  <li><span>Parent Status</span> <strong>{formData.parentStatus}</strong></li>
                  <li><span>Annual Income</span> <strong>{formData.annualIncome}</strong></li>
                </ul>
              </div>

              {/* Transport Info Preview Summary */}
              <div className="preview-block">
                <div className="preview-block-header">
                  <div className="title-with-icon">
                    <FaBus className="orange" />
                    <h4>Transport Information</h4>
                  </div>
                  <button className="edit-link" onClick={() => setCurrentStep(2)}>
                    <FaEdit /> Edit
                  </button>
                </div>
                <ul className="preview-data-list">
                  <li><span>Transport Required</span> <strong>{formData.transportRequired}</strong></li>
                  <li><span>Pickup Location</span> <strong>{formData.pickupLocation}</strong></li>
                  <li><span>Drop Location</span> <strong>{formData.dropLocation}</strong></li>
                  <li><span>Route / Bus Number</span> <strong>{formData.routeBus}</strong></li>
                  <li><span>Pickup Time</span> <strong>{formData.pickupTime}</strong></li>
                  <li><span>Drop Time</span> <strong>{formData.dropTime}</strong></li>
                </ul>
              </div>

              {/* Student Details Summary */}
              <div className="preview-block">
                <div className="preview-block-header">
                  <div className="title-with-icon">
                    <FaUserGraduate className="green" />
                    <h4>Student Details</h4>
                  </div>
                  <button className="edit-link" onClick={() => setCurrentStep(3)}>
                    <FaEdit /> Edit
                  </button>
                </div>
                <ul className="preview-data-list">
                  <li><span>Student's Name</span> <strong>{formData.studentName}</strong></li>
                  <li><span>Date of Birth</span> <strong>{formData.dob}</strong></li>
                  <li><span>Gender</span> <strong>{formData.gender}</strong></li>
                  <li><span>Blood Group</span> <strong>{formData.bloodGroup}</strong></li>
                  <li><span>Aadhaar Number</span> <strong>{formData.aadhaar}</strong></li>
                  <li><span>Nationality</span> <strong>{formData.nationality}</strong></li>
                  <li><span>Religion</span> <strong>{formData.religion}</strong></li>
                  <li><span>Caste</span> <strong>{formData.caste}</strong></li>
                  <li><span>Special Needs</span> <strong>{formData.specialNeeds}</strong></li>
                </ul>
              </div>

              {/* Class Admission Details Summary */}
              <div className="preview-block">
                <div className="preview-block-header">
                  <div className="title-with-icon">
                    <FaBookOpen className="blue" />
                    <h4>Class Admission Details</h4>
                  </div>
                  <button className="edit-link" onClick={() => setCurrentStep(4)}>
                    <FaEdit /> Edit
                  </button>
                </div>
                <ul className="preview-data-list">
                  <li><span>Admission For Class</span> <strong>{formData.admissionClass}</strong></li>
                  <li><span>Session</span> <strong>{formData.session}</strong></li>
                  <li><span>Medium</span> <strong>{formData.medium}</strong></li>
                  <li><span>Admission Date</span> <strong>{formData.admissionDate}</strong></li>
                  <li><span>Previous School</span> <strong>{formData.previousSchool}</strong></li>
                  <li><span>Last Class Completed</span> <strong>{formData.lastClassCompleted}</strong></li>
                </ul>
              </div>

              {/* Documents Status & Verification Notice */}
              <div className="preview-block">
                <div className="preview-block-header">
                  <div className="title-with-icon">
                    <span className="doc-icon">📄</span>
                    <h4>Documents</h4>
                  </div>
                </div>
                <div className="documents-status-grid">
                  <div className="doc-status-item">
                    <span>Birth Certificate</span>
                    <span className={`status-tag ${uploadedFiles.birthCertificate ? 'uploaded' : 'pending'}`}>
                      <FaCheckCircle /> {uploadedFiles.birthCertificate ? 'Uploaded' : 'Pending'}
                    </span>
                  </div>
                  <div className="doc-status-item">
                    <span>Aadhaar Card</span>
                    <span className={`status-tag ${uploadedFiles.aadhaarCard ? 'uploaded' : 'pending'}`}>
                      <FaCheckCircle /> {uploadedFiles.aadhaarCard ? 'Uploaded' : 'Pending'}
                    </span>
                  </div>
                  <div className="doc-status-item">
                    <span>Address Proof</span>
                    <span className={`status-tag ${uploadedFiles.addressProof ? 'uploaded' : 'pending'}`}>
                      <FaCheckCircle /> {uploadedFiles.addressProof ? 'Uploaded' : 'Pending'}
                    </span>
                  </div>
                  <div className="doc-status-item">
                    <span>Passport Photo</span>
                    <span className={`status-tag ${uploadedFiles.passportPhoto ? 'uploaded' : 'pending'}`}>
                      <FaCheckCircle /> {uploadedFiles.passportPhoto ? 'Uploaded' : 'Pending'}
                    </span>
                  </div>
                  <div className="doc-status-item">
                    <span>Previous School TC</span>
                    <span className={`status-tag ${uploadedFiles.previousTc ? 'uploaded' : 'pending'}`}>
                      <FaCheckCircle /> {uploadedFiles.previousTc ? 'Uploaded' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="verify-notice-bar">
                <div className="notice-left">
                  <FaInfoCircle className="info-icon" />
                  <span>Please verify all details before submission.</span>
                </div>
                <FaShieldAlt className="shield-icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionForm;