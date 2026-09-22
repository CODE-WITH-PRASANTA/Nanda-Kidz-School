import React, { useRef, useState } from 'react';
import {
  FaArrowLeft,
  FaUserFriends,
  FaBus,
  FaUserGraduate,
  FaBookOpen,
  FaCheckCircle,
  FaUpload,
  FaChevronDown,
  FaRegSave,
  FaFileAlt,
  FaDownload
} from 'react-icons/fa';

import './AdmissionForm.css';

const AdmissionForm = () => {
  /* =========================
     ACCORDION STATE
  ========================= */
  const [openSections, setOpenSections] = useState({
    studentDetails: false,
    customField: false,
    parentDetails: false,
    otherDetails: false,
    documents: false
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  /* =========================
     FORM STATE
  ========================= */
  const [formData, setFormData] = useState({
    studentName: '',
    dob: '',
    gender: '',
    bloodGroup: '',
    aadhaar: '',
    nationality: 'Indian',
    religion: '',
    caste: '',
    specialNeeds: '',

    customField: '',

    fatherName: '',
    motherName: '',
    email: '',
    mobile: '',
    altMobile: '',
    occupation: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    parentStatus: 'Father',
    annualIncome: '',

    transportRequired: 'No',
    pickupLocation: '',
    dropLocation: '',
    routeBus: '',
    pickupTime: '',
    dropTime: '',

    admissionClass: '',
    session: '',
    medium: 'English',
    admissionDate: '',
    previousSchool: '',
    lastClassCompleted: '',

    notes: ''
  });

  /* =========================
     FILE STATE
  ========================= */
  const [uploadedFiles, setUploadedFiles] = useState({
    birthCertificate: null,
    aadhaarCard: null,
    addressProof: null,
    passportPhoto: null,
    previousTc: null
  });

  const fileInputRefs = {
    birthCertificate: useRef(null),
    aadhaarCard: useRef(null),
    addressProof: useRef(null),
    passportPhoto: useRef(null),
    previousTc: useRef(null)
  };

  /* =========================
     INPUT HANDLER
  ========================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  /* =========================
     FILE HANDLER
  ========================= */
  const handleFileChange = (e, key) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('File size must not exceed 2MB.');
      e.target.value = '';
      return;
    }

    setUploadedFiles((prev) => ({
      ...prev,
      [key]: file
    }));
  };

  const triggerFileUpload = (key) => {
    fileInputRefs[key]?.current?.click();
  };

  /* =========================
     BUTTON HANDLERS
  ========================= */
  const handleBack = () => {
    window.history.back();
  };

  const handleDownload = () => {
    window.print();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert('Admission form submitted successfully!');

    console.log('Form Data:', formData);
    console.log('Uploaded Files:', uploadedFiles);
  };

  /* =========================
     ACCORDION COMPONENT
  ========================= */
  const AccordionHeader = ({
    id,
    icon,
    title,
    subtitle,
    iconClass = ''
  }) => {
    const isOpen = openSections[id];

    return (
      <button
        type="button"
        className={`accordion-header ${isOpen ? 'active' : ''}`}
        onClick={() => toggleSection(id)}
        aria-expanded={isOpen}
      >
        <div className="accordion-header-left">
          <div className={`accordion-icon ${iconClass}`}>
            {icon}
          </div>

          <div className="accordion-title-area">
            <h3>{title}</h3>
            {subtitle && <p>{subtitle}</p>}
          </div>
        </div>

        <div className={`accordion-chevron ${isOpen ? 'rotate' : ''}`}>
          <FaChevronDown />
        </div>
      </button>
    );
  };

  return (
    <div className="admission-page">

      {/* =========================
          PAGE HEADER
      ========================= */}
      <div className="admission-top-card">

        <div className="page-heading-area">
          <button
            type="button"
            className="back-button"
            onClick={handleBack}
          >
            <FaArrowLeft />
            <span>Back to Students</span>
          </button>

          <div className="page-heading">
            <div className="heading-icon">
              <FaUserGraduate />
            </div>

            <div>
              <h1>Student Admission</h1>
              <p>
                Complete the admission details below
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="download-form-btn"
          onClick={handleDownload}
        >
          <FaDownload />
          <span>Download Form</span>
        </button>
      </div>

      {/* =========================
          FORM
      ========================= */}
      <form
        className="admission-form"
        onSubmit={handleSubmit}
      >

        {/* =====================================================
            1. STUDENT DETAILS
        ===================================================== */}
        <section className="accordion-card">

          <AccordionHeader
            id="studentDetails"
            icon={<FaUserGraduate />}
            title="Student Details"
            subtitle="Basic information about the student"
            iconClass="student-icon"
          />

          <div
            className={`accordion-content-wrapper ${
              openSections.studentDetails ? 'open' : ''
            }`}
          >
            <div className="accordion-content">

              <div className="form-grid-3">

                <div className="input-group">
                  <label>
                    Student's Name <span>*</span>
                  </label>

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
                  <label>
                    Date of Birth <span>*</span>
                  </label>

                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>
                    Gender <span>*</span>
                  </label>

                  <div className="radio-group">
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === 'Male'}
                        onChange={handleChange}
                      />
                      <span>Male</span>
                    </label>

                    <label className="radio-option">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === 'Female'}
                        onChange={handleChange}
                      />
                      <span>Female</span>
                    </label>

                    <label className="radio-option">
                      <input
                        type="radio"
                        name="gender"
                        value="Other"
                        checked={formData.gender === 'Other'}
                        onChange={handleChange}
                      />
                      <span>Other</span>
                    </label>
                  </div>
                </div>

              </div>

              <div className="form-grid-3">

                <div className="input-group">
                  <label>Blood Group</label>

                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                  >
                    <option value="">Select blood group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>Aadhaar Number</label>

                  <input
                    type="text"
                    name="aadhaar"
                    value={formData.aadhaar}
                    onChange={handleChange}
                    placeholder="Enter Aadhaar number"
                    maxLength="12"
                  />
                </div>

                <div className="input-group">
                  <label>Nationality</label>

                  <select
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                  >
                    <option value="Indian">Indian</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

              </div>

              <div className="form-grid-3">

                <div className="input-group">
                  <label>Religion</label>

                  <select
                    name="religion"
                    value={formData.religion}
                    onChange={handleChange}
                  >
                    <option value="">Select religion</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Muslim">Muslim</option>
                    <option value="Christian">Christian</option>
                    <option value="Sikh">Sikh</option>
                    <option value="Buddhist">Buddhist</option>
                    <option value="Jain">Jain</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>Caste</label>

                  <select
                    name="caste"
                    value={formData.caste}
                    onChange={handleChange}
                  >
                    <option value="">Select category</option>
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>
                    Special Needs / Medical Condition
                  </label>

                  <input
                    type="text"
                    name="specialNeeds"
                    value={formData.specialNeeds}
                    onChange={handleChange}
                    placeholder="Enter if applicable"
                  />
                </div>

              </div>

            </div>
          </div>

        </section>

        {/* =====================================================
            2. CUSTOM FIELD
        ===================================================== */}
        <section className="accordion-card">

          <AccordionHeader
            id="customField"
            icon={<FaFileAlt />}
            title="Custom Field"
            subtitle="Additional information"
            iconClass="custom-icon"
          />

          <div
            className={`accordion-content-wrapper ${
              openSections.customField ? 'open' : ''
            }`}
          >
            <div className="accordion-content">

              <div className="form-grid-2">

                <div className="input-group">
                  <label>Custom Field</label>

                  <input
                    type="text"
                    name="customField"
                    value={formData.customField}
                    onChange={handleChange}
                    placeholder="Enter custom information"
                  />
                </div>

                <div className="input-group">
                  <label>Notes</label>

                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Add additional notes..."
                    rows="3"
                  />
                </div>

              </div>

            </div>
          </div>

        </section>

        {/* =====================================================
            3. PARENT / GUARDIAN DETAILS
        ===================================================== */}
        <section className="accordion-card">

          <AccordionHeader
            id="parentDetails"
            icon={<FaUserFriends />}
            title="Parent / Guardian Details"
            subtitle="Parent and contact information"
            iconClass="parent-icon"
          />

          <div
            className={`accordion-content-wrapper ${
              openSections.parentDetails ? 'open' : ''
            }`}
          >
            <div className="accordion-content">

              <div className="form-grid-3">

                <div className="input-group">
                  <label>
                    Father's Name <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    placeholder="Enter father's name"
                    required
                  />
                </div>

                <div className="input-group">
                  <label>
                    Mother's Name <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    placeholder="Enter mother's name"
                    required
                  />
                </div>

                <div className="input-group">
                  <label>
                    Email Address <span>*</span>
                  </label>

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
                  <label>
                    Mobile Number <span>*</span>
                  </label>

                  <div className="phone-input">
                    <select defaultValue="+91">
                      <option value="+91">+91</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                    </select>

                    <input
                      type="tel"
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

                  <div className="phone-input">
                    <select defaultValue="+91">
                      <option value="+91">+91</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                    </select>

                    <input
                      type="tel"
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

              <div className="form-grid-address">

                <div className="input-group address-field">
                  <label>
                    Address <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter complete address"
                    required
                  />
                </div>

                <div className="input-group">
                  <label>
                    City <span>*</span>
                  </label>

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
                  <label>
                    State <span>*</span>
                  </label>

                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  >
                    <option value="">Select state</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Bihar">Bihar</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                  </select>
                </div>

              </div>

              <div className="form-grid-3">

                <div className="input-group">
                  <label>
                    Pincode <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Enter pincode"
                    maxLength="6"
                    required
                  />
                </div>

                <div className="input-group">
                  <label>
                    Parent Status <span>*</span>
                  </label>

                  <div className="radio-group parent-radio">

                    <label className="radio-option">
                      <input
                        type="radio"
                        name="parentStatus"
                        value="Father"
                        checked={formData.parentStatus === 'Father'}
                        onChange={handleChange}
                      />
                      <span>Father</span>
                    </label>

                    <label className="radio-option">
                      <input
                        type="radio"
                        name="parentStatus"
                        value="Mother"
                        checked={formData.parentStatus === 'Mother'}
                        onChange={handleChange}
                      />
                      <span>Mother</span>
                    </label>

                    <label className="radio-option">
                      <input
                        type="radio"
                        name="parentStatus"
                        value="Guardian"
                        checked={formData.parentStatus === 'Guardian'}
                        onChange={handleChange}
                      />
                      <span>Guardian</span>
                    </label>

                  </div>
                </div>

                <div className="input-group">
                  <label>Annual Income</label>

                  <select
                    name="annualIncome"
                    value={formData.annualIncome}
                    onChange={handleChange}
                  >
                    <option value="">Select income</option>
                    <option value="Below 5 Lakh">
                      Below 5 Lakh
                    </option>
                    <option value="5 - 10 Lakh">
                      5 - 10 Lakh
                    </option>
                    <option value="10 - 15 Lakh">
                      10 - 15 Lakh
                    </option>
                    <option value="Above 15 Lakh">
                      Above 15 Lakh
                    </option>
                  </select>
                </div>

              </div>

              {/* TRANSPORT */}
              <div className="nested-section">

                <div className="nested-title">
                  <FaBus />
                  <span>Transport Information</span>
                </div>

                <div className="form-grid-3">

                  <div className="input-group">
                    <label>Transport Required?</label>

                    <div className="radio-group">
                      <label className="radio-option">
                        <input
                          type="radio"
                          name="transportRequired"
                          value="Yes"
                          checked={
                            formData.transportRequired === 'Yes'
                          }
                          onChange={handleChange}
                        />
                        <span>Yes</span>
                      </label>

                      <label className="radio-option">
                        <input
                          type="radio"
                          name="transportRequired"
                          value="No"
                          checked={
                            formData.transportRequired === 'No'
                          }
                          onChange={handleChange}
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Pickup Location</label>

                    <select
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleChange}
                    >
                      <option value="">Select pickup location</option>
                      <option value="Green Street">
                        Green Street
                      </option>
                      <option value="Central Avenue">
                        Central Avenue
                      </option>
                      <option value="Market Road">
                        Market Road
                      </option>
                    </select>
                  </div>

                  <div className="input-group">
                    <label>Drop Location</label>

                    <select
                      name="dropLocation"
                      value={formData.dropLocation}
                      onChange={handleChange}
                    >
                      <option value="">Select drop location</option>
                      <option value="Nanda Kidz School">
                        Nanda Kidz School
                      </option>
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
                      placeholder="Enter route / bus"
                    />
                  </div>

                  <div className="input-group">
                    <label>Pickup Time</label>

                    <input
                      type="time"
                      name="pickupTime"
                      value={formData.pickupTime}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-group">
                    <label>Drop Time</label>

                    <input
                      type="time"
                      name="dropTime"
                      value={formData.dropTime}
                      onChange={handleChange}
                    />
                  </div>

                </div>

              </div>

            </div>
          </div>

        </section>

        {/* =====================================================
            4. OTHER DETAILS
        ===================================================== */}
        <section className="accordion-card">

          <AccordionHeader
            id="otherDetails"
            icon={<FaBookOpen />}
            title="Other Details"
            subtitle="Class and admission information"
            iconClass="other-icon"
          />

          <div
            className={`accordion-content-wrapper ${
              openSections.otherDetails ? 'open' : ''
            }`}
          >
            <div className="accordion-content">

              <div className="form-grid-3">

                <div className="input-group">
                  <label>
                    Admission For Class <span>*</span>
                  </label>

                  <select
                    name="admissionClass"
                    value={formData.admissionClass}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select class</option>
                    <option value="Nursery">Nursery</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>
                    <option value="Class 1">Class 1</option>
                    <option value="Class 2">Class 2</option>
                    <option value="Class 3">Class 3</option>
                    <option value="Class 4">Class 4</option>
                    <option value="Class 5">Class 5</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>
                    Session <span>*</span>
                  </label>

                  <select
                    name="session"
                    value={formData.session}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select session</option>
                    <option value="2025-2026">2025-2026</option>
                    <option value="2026-2027">2026-2027</option>
                    <option value="2027-2028">2027-2028</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>
                    Medium <span>*</span>
                  </label>

                  <select
                    name="medium"
                    value={formData.medium}
                    onChange={handleChange}
                    required
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Odia">Odia</option>
                  </select>
                </div>

              </div>

              <div className="form-grid-3">

                <div className="input-group">
                  <label>
                    Admission Date <span>*</span>
                  </label>

                  <input
                    type="date"
                    name="admissionDate"
                    value={formData.admissionDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Previous School</label>

                  <input
                    type="text"
                    name="previousSchool"
                    value={formData.previousSchool}
                    onChange={handleChange}
                    placeholder="Enter previous school"
                  />
                </div>

                <div className="input-group">
                  <label>Last Class Completed</label>

                  <select
                    name="lastClassCompleted"
                    value={formData.lastClassCompleted}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select last class
                    </option>
                    <option value="Not Applicable">
                      Not Applicable
                    </option>
                    <option value="Playgroup">Playgroup</option>
                    <option value="Nursery">Nursery</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>
                    <option value="Class 1">Class 1</option>
                  </select>
                </div>

              </div>

            </div>
          </div>

        </section>

        {/* =====================================================
            5. UPLOAD DOCUMENTS
        ===================================================== */}
        <section className="accordion-card">

          <AccordionHeader
            id="documents"
            icon={<FaUpload />}
            title="Upload Documents"
            subtitle="Upload required admission documents"
            iconClass="document-icon"
          />

          <div
            className={`accordion-content-wrapper ${
              openSections.documents ? 'open' : ''
            }`}
          >
            <div className="accordion-content">

              <div className="documents-grid">

                {/* Birth Certificate */}
                <div className="document-card">

                  <div className="document-card-icon">
                    <FaFileAlt />
                  </div>

                  <h4>
                    Birth Certificate
                    <span>*</span>
                  </h4>

                  <p>
                    PDF, JPG or PNG
                  </p>

                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    ref={fileInputRefs.birthCertificate}
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        'birthCertificate'
                      )
                    }
                  />

                  <button
                    type="button"
                    className="upload-button"
                    onClick={() =>
                      triggerFileUpload(
                        'birthCertificate'
                      )
                    }
                  >
                    <FaUpload />
                    {uploadedFiles.birthCertificate
                      ? 'Change File'
                      : 'Upload File'}
                  </button>

                  {uploadedFiles.birthCertificate && (
                    <div className="uploaded-file">
                      <FaCheckCircle />
                      <span>
                        {uploadedFiles.birthCertificate.name}
                      </span>
                    </div>
                  )}

                  <small>Maximum size 2MB</small>
                </div>

                {/* Aadhaar */}
                <div className="document-card">

                  <div className="document-card-icon">
                    <FaFileAlt />
                  </div>

                  <h4>
                    Aadhaar Card
                    <span>*</span>
                  </h4>

                  <p>PDF, JPG or PNG</p>

                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    ref={fileInputRefs.aadhaarCard}
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        'aadhaarCard'
                      )
                    }
                  />

                  <button
                    type="button"
                    className="upload-button"
                    onClick={() =>
                      triggerFileUpload(
                        'aadhaarCard'
                      )
                    }
                  >
                    <FaUpload />
                    {uploadedFiles.aadhaarCard
                      ? 'Change File'
                      : 'Upload File'}
                  </button>

                  {uploadedFiles.aadhaarCard && (
                    <div className="uploaded-file">
                      <FaCheckCircle />
                      <span>
                        {uploadedFiles.aadhaarCard.name}
                      </span>
                    </div>
                  )}

                  <small>Maximum size 2MB</small>
                </div>

                {/* Address Proof */}
                <div className="document-card">

                  <div className="document-card-icon">
                    <FaFileAlt />
                  </div>

                  <h4>Address Proof</h4>

                  <p>PDF, JPG or PNG</p>

                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    ref={fileInputRefs.addressProof}
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        'addressProof'
                      )
                    }
                  />

                  <button
                    type="button"
                    className="upload-button"
                    onClick={() =>
                      triggerFileUpload(
                        'addressProof'
                      )
                    }
                  >
                    <FaUpload />
                    {uploadedFiles.addressProof
                      ? 'Change File'
                      : 'Upload File'}
                  </button>

                  {uploadedFiles.addressProof && (
                    <div className="uploaded-file">
                      <FaCheckCircle />
                      <span>
                        {uploadedFiles.addressProof.name}
                      </span>
                    </div>
                  )}

                  <small>Maximum size 2MB</small>
                </div>

                {/* Passport */}
                <div className="document-card">

                  <div className="document-card-icon">
                    <FaFileAlt />
                  </div>

                  <h4>
                    Passport Photo
                    <span>*</span>
                  </h4>

                  <p>JPG or PNG</p>

                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRefs.passportPhoto}
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        'passportPhoto'
                      )
                    }
                  />

                  <button
                    type="button"
                    className="upload-button"
                    onClick={() =>
                      triggerFileUpload(
                        'passportPhoto'
                      )
                    }
                  >
                    <FaUpload />
                    {uploadedFiles.passportPhoto
                      ? 'Change File'
                      : 'Upload File'}
                  </button>

                  {uploadedFiles.passportPhoto && (
                    <div className="uploaded-file">
                      <FaCheckCircle />
                      <span>
                        {uploadedFiles.passportPhoto.name}
                      </span>
                    </div>
                  )}

                  <small>Maximum size 2MB</small>
                </div>

                {/* TC */}
                <div className="document-card">

                  <div className="document-card-icon">
                    <FaFileAlt />
                  </div>

                  <h4>Previous School TC</h4>

                  <p>PDF, JPG or PNG</p>

                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    ref={fileInputRefs.previousTc}
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        'previousTc'
                      )
                    }
                  />

                  <button
                    type="button"
                    className="upload-button"
                    onClick={() =>
                      triggerFileUpload(
                        'previousTc'
                      )
                    }
                  >
                    <FaUpload />
                    {uploadedFiles.previousTc
                      ? 'Change File'
                      : 'Upload File'}
                  </button>

                  {uploadedFiles.previousTc && (
                    <div className="uploaded-file">
                      <FaCheckCircle />
                      <span>
                        {uploadedFiles.previousTc.name}
                      </span>
                    </div>
                  )}

                  <small>Maximum size 2MB</small>
                </div>

              </div>

            </div>
          </div>

        </section>

        {/* =========================
            SUBMIT AREA
        ========================= */}
        <div className="form-footer">

          <button
            type="button"
            className="cancel-button"
            onClick={handleBack}
          >
            Cancel
          </button>

          <div className="footer-actions">

            <button
              type="button"
              className="save-button"
            >
              <FaRegSave />
              Save Draft
            </button>

            <button
              type="submit"
              className="submit-button"
            >
              <FaCheckCircle />
              Submit Admission
            </button>

          </div>

        </div>

      </form>
    </div>
  );
};

export default AdmissionForm;