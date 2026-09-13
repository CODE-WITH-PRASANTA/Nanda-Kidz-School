import React, { useState } from "react";
import "./Shopdetails.css";

import {
  FaStar,
  FaRegStar,
  FaTimes,
} from "react-icons/fa";

import Swal from "sweetalert2";

// =========================================================
// AXIOS API
// =========================================================

import API from "../../api/axios";

// =========================================================
// PRODUCT / ACTIVITY IMAGES
// =========================================================

import img1 from "../../assets/shop1.webp";
import img2 from "../../assets/shop2.webp";
import img3 from "../../assets/shop3.webp";
import img4 from "../../assets/shop4.webp";
import img5 from "../../assets/shop5.webp";
import img6 from "../../assets/shop6.webp";
import img7 from "../../assets/shop7.webp";
import img8 from "../../assets/shop8.webp";
import img9 from "../../assets/shop9.webp";
import img10 from "../../assets/shop10.webp";
import img11 from "../../assets/shop11.webp";
import img12 from "../../assets/shop12.webp";

// =========================================================
// PRODUCTS
// =========================================================

const products = [
  {
    id: 1,
    title: "Creative Arts",
    image: img1,
    price: "₹499",
    onSale: false,
  },
  {
    id: 2,
    title: "Discovery Lab",
    image: img2,
    originalPrice: "₹999",
    price: "₹599",
    onSale: true,
    rating: 4,
  },
  {
    id: 3,
    title: "Fine Motor",
    image: img3,
    price: "₹749",
    onSale: false,
  },
  {
    id: 4,
    title: "Groove Fitness",
    image: img4,
    price: "₹499",
    onSale: false,
  },
  {
    id: 5,
    title: "Group Work",
    image: img5,
    originalPrice: "₹899",
    price: "₹399",
    onSale: true,
  },
  {
    id: 6,
    title: "Language Fun",
    image: img6,
    originalPrice: "₹1,499",
    price: "₹899",
    onSale: true,
  },
  {
    id: 7,
    title: "Little Scientists",
    image: img7,
    price: "₹399",
    onSale: false,
  },
  {
    id: 8,
    title: "Logic Games",
    image: img8,
    price: "₹999",
    onSale: false,
  },
  {
    id: 9,
    title: "Motor Skills",
    image: img9,
    price: "₹499",
    onSale: false,
  },
  {
    id: 10,
    title: "Nature Explorers",
    image: img10,
    price: "₹749",
    onSale: false,
  },
  {
    id: 11,
    title: "Puzzle Play",
    image: img11,
    originalPrice: "₹950",
    price: "₹799",
    onSale: true,
  },
  {
    id: 12,
    title: "Sensory Playtime",
    image: img12,
    price: "₹1,199",
    onSale: false,
  },
];

// =========================================================
// COMPONENT
// =========================================================

const Shopdetails = () => {
  // =======================================================
  // STATE
  // =======================================================

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [formData, setFormData] = useState({
    studentName: "",
    age: "",
    phone: "",
    size: "",
    address: "",
  });

  const [submitting, setSubmitting] = useState(false);

  // =======================================================
  // RESET FORM
  // =======================================================

  const resetForm = () => {
    setFormData({
      studentName: "",
      age: "",
      phone: "",
      size: "",
      address: "",
    });
  };

  // =======================================================
  // OPEN MODAL
  // =======================================================

  const handleOpenModal = (product) => {
    setSelectedProduct(product);

    resetForm();
  };

  // =======================================================
  // CLOSE MODAL
  // =======================================================

  const handleCloseModal = () => {
    if (submitting) {
      return;
    }

    setSelectedProduct(null);

    resetForm();
  };

  // =======================================================
  // INPUT CHANGE
  // =======================================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // =======================================================
  // SUBMIT ORDER
  // =======================================================

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!selectedProduct) {
      return;
    }

    // =====================================================
    // FRONTEND VALIDATION
    // =====================================================

    const studentName = formData.studentName.trim();
    const age = Number(formData.age);
    const phone = formData.phone.trim();
    const size = formData.size.trim();
    const address = formData.address.trim();

    if (!studentName) {
      Swal.fire({
        icon: "warning",
        title: "Student Name Required",
        text: "Please enter student's name.",
        confirmButtonColor: "#0066ff",
      });

      return;
    }

    if (!age || age < 1 || age > 12) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Age",
        text: "Age must be between 1 and 12.",
        confirmButtonColor: "#0066ff",
      });

      return;
    }

    if (!size) {
      Swal.fire({
        icon: "warning",
        title: "Size / Grade Required",
        text: "Please enter size / grade.",
        confirmButtonColor: "#0066ff",
      });

      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Mobile Number",
        text: "Please enter a valid 10-digit mobile number.",
        confirmButtonColor: "#0066ff",
      });

      return;
    }

    if (!address) {
      Swal.fire({
        icon: "warning",
        title: "Address Required",
        text: "Please enter delivery / home address.",
        confirmButtonColor: "#0066ff",
      });

      return;
    }

    // =====================================================
    // SAVE ORDER TO BACKEND
    // =====================================================

    try {
      setSubmitting(true);

      const orderData = {
        productId: selectedProduct.id,
        productTitle: selectedProduct.title,
        price: selectedProduct.price,

        studentName: studentName,
        age: age,
        size: size,
        phone: phone,
        address: address,
      };

      console.log("Sending Order:", orderData);

      // ===================================================
      // POST REQUEST
      // http://localhost:5000/api/orders
      // ===================================================

      const response = await API.post(
        "/orders",
        orderData
      );

      console.log(
        "Order API Response:",
        response.data
      );

      // ===================================================
      // GET SAVED ORDER
      // ===================================================

      const savedOrder = response.data?.order;

      if (!savedOrder) {
        throw new Error(
          "Order was not returned by the server."
        );
      }

      // ===================================================
      // CLOSE POPUP AUTOMATICALLY
      // AFTER SUCCESSFUL DATABASE SAVE
      // ===================================================

      setSelectedProduct(null);

      // ===================================================
      // RESET FORM
      // ===================================================

      resetForm();

      // ===================================================
      // STOP SUBMITTING STATE
      // ===================================================

      setSubmitting(false);

      // ===================================================
      // THANK YOU MESSAGE
      // ===================================================

      await Swal.fire({
        icon: "success",
        title: "Thank You! 🎉",
        html: `
          <div style="
            font-size: 16px;
            line-height: 1.7;
          ">
            <p style="margin-bottom: 8px;">
              Your order has been submitted successfully.
            </p>

            <p style="margin: 0;">
              <strong>Order ID:</strong>
              ${savedOrder.orderId || ""}
            </p>

            <p style="margin-top: 8px;">
              We have received your request and will
              contact you shortly.
            </p>
          </div>
        `,
        confirmButtonText: "Done",
        confirmButtonColor: "#0066ff",
        allowOutsideClick: false,
      });
    } catch (error) {
      console.error(
        "Order submission error:",
        error
      );

      // ===================================================
      // BACKEND ERROR
      // ===================================================

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to submit order. Please try again.";

      setSubmitting(false);

      Swal.fire({
        icon: "error",
        title: "Order Failed",
        text: errorMessage,
        confirmButtonText: "Try Again",
        confirmButtonColor: "#0066ff",
      });
    }
  };

  // =======================================================
  // RATING
  // =======================================================

  const renderRating = (rating) => {
    return (
      <div
        className="Shopdetails-rating"
        aria-label={`${rating} out of 5 stars`}
      >
        {[...Array(5)].map((_, index) =>
          index < rating ? (
            <FaStar
              key={index}
              className="Shopdetails-star-filled"
            />
          ) : (
            <FaRegStar
              key={index}
              className="Shopdetails-star-empty"
            />
          )
        )}
      </div>
    );
  };

  // =======================================================
  // RETURN
  // =======================================================

  return (
    <section className="Shopdetails">
      <div className="Shopdetails-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="Shopdetails-header">

          <span className="Shopdetails-eyebrow">
            Learning Through Play
          </span>

          <h1 className="Shopdetails-title">
            play school near khandagiri, bhubaneswar
          </h1>

          <div className="Shopdetails-title-line"></div>

          <p className="Shopdetails-description">
            At Nanda Kidz, children learn best when
            they are given the freedom to explore,
            create and enjoy every new experience.
            Our activities are designed to make
            early learning active, enjoyable and
            meaningful for little learners.
          </p>

          <p className="Shopdetails-description secondary">
            If you are looking for the{" "}
            <strong>
              best play school in bhubaneswar
            </strong>
            , Nanda Kidz offers a caring environment
            where children can build confidence,
            develop new skills and learn naturally
            through play.
          </p>

        </div>

        {/* =================================================
            PRODUCTS GRID
        ================================================= */}

        <div className="Shopdetails-grid">

          {products.map((item) => (

            <article
              className="Shopdetails-card"
              key={item.id}
            >

              {/* IMAGE */}

              <div className="Shopdetails-image-wrapper">

                <img
                  src={item.image}
                  alt={`${item.title} activity at Nanda Kidz`}
                  className="Shopdetails-image"
                  loading="lazy"
                />

                {item.onSale && (
                  <span className="Shopdetails-sale-badge">
                    Sale!
                  </span>
                )}

              </div>

              {/* INFO */}

              <div className="Shopdetails-info">

                <h2 className="Shopdetails-card-title">
                  {item.title}
                </h2>

                {item.rating &&
                  renderRating(item.rating)}

                {/* PRICE */}

                <div className="Shopdetails-price-wrapper">

                  {item.originalPrice && (
                    <span className="Shopdetails-original-price">
                      {item.originalPrice}
                    </span>
                  )}

                  <span
                    className={`Shopdetails-price ${
                      item.originalPrice
                        ? "Shopdetails-sale-price"
                        : ""
                    }`}
                  >
                    {item.price}
                  </span>

                </div>

                {/* ADD TO CART / ORDER */}

                <button
                  type="button"
                  className="Shopdetails-btn"
                  onClick={() =>
                    handleOpenModal(item)
                  }
                >
                  ADD TO CART
                </button>

              </div>

            </article>

          ))}

        </div>

        {/* =================================================
            BOTTOM SEO CONTENT
        ================================================= */}

        <div className="Shopdetails-bottom-content">

          <span className="Shopdetails-bottom-label">
            A joyful start to learning
          </span>

          <h2>
            Learning, Playing and Growing Together
          </h2>

          <p>
            Every child has their own way of
            discovering the world. That is why our
            learning activities encourage creativity,
            communication, movement, problem-solving
            and social interaction in a relaxed and
            friendly setting.
          </p>

          <p>
            At Nanda Kidz – The Little Kingdom, we
            want children to look forward to coming
            to school every day. Our approach combines
            playful activities with early learning so
            that children can grow with curiosity,
            confidence and joy.
          </p>

        </div>

      </div>

      {/* ===================================================
          STUDENT ORDER MODAL
      =================================================== */}

      {selectedProduct !== null && (

        <div
          className="shop-modal-overlay"
          onClick={handleCloseModal}
        >

          <div
            className="shop-modal-container"
            onClick={(e) =>
              e.stopPropagation()
            }
            role="dialog"
            aria-modal="true"
            aria-labelledby="shop-modal-title"
          >

            {/* CLOSE BUTTON */}

            <button
              type="button"
              className="shop-modal-close"
              onClick={handleCloseModal}
              aria-label="Close modal"
              disabled={submitting}
            >
              <FaTimes />
            </button>

            {/* MODAL HEADER */}

            <div className="shop-modal-header">

              <span className="shop-modal-badge">
                Student Order Form
              </span>

              <h3 id="shop-modal-title">
                {selectedProduct?.title}
              </h3>

              <p className="shop-modal-price">
                {selectedProduct?.price}
              </p>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmitOrder}
              className="shop-modal-form"
            >

              {/* STUDENT NAME */}

              <div className="shop-modal-field">

                <label htmlFor="studentName">
                  Student Name *
                </label>

                <input
                  id="studentName"
                  type="text"
                  name="studentName"
                  required
                  placeholder="Enter student's full name"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  disabled={submitting}
                />

              </div>

              {/* AGE + SIZE */}

              <div className="shop-modal-row">

                <div className="shop-modal-field">

                  <label htmlFor="age">
                    Age *
                  </label>

                  <input
                    id="age"
                    type="number"
                    name="age"
                    min="1"
                    max="12"
                    required
                    placeholder="e.g. 4"
                    value={formData.age}
                    onChange={handleInputChange}
                    disabled={submitting}
                  />

                </div>

                <div className="shop-modal-field">

                  <label htmlFor="size">
                    Size / Grade *
                  </label>

                  <input
                    id="size"
                    type="text"
                    name="size"
                    required
                    placeholder="e.g. S, Medium, Age 4-5, LKG"
                    value={formData.size}
                    onChange={handleInputChange}
                    disabled={submitting}
                  />

                </div>

              </div>

              {/* PHONE */}

              <div className="shop-modal-field">

                <label htmlFor="phone">
                  Parent Mobile Number *
                </label>

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  required
                  pattern="[0-9]{10}"
                  maxLength="10"
                  inputMode="numeric"
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={submitting}
                />

              </div>

              {/* ADDRESS */}

              <div className="shop-modal-field">

                <label htmlFor="address">
                  Delivery / Home Address *
                </label>

                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  required
                  placeholder="House / Flat no, Street, Landmark, Area"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={submitting}
                ></textarea>

              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                className="shop-modal-submit-btn"
                disabled={submitting}
              >

                {submitting ? (
                  <>
                    <span
                      className="shop-modal-submit-spinner"
                      aria-hidden="true"
                    ></span>

                    Submitting...
                  </>
                ) : (
                  <>
                    Confirm Order
                  </>
                )}

              </button>

            </form>

          </div>

        </div>

      )}

    </section>
  );
};

export default Shopdetails;