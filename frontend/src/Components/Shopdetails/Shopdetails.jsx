import React, { useEffect, useState } from "react";
import "./Shopdetails.css";

import {
  FaStar,
  FaRegStar,
  FaTimes,
} from "react-icons/fa";

import Swal from "sweetalert2";

import API, { IMG_URL } from "../../api/axios";

// =========================================================
// IMAGE URL HELPER
// =========================================================

const getImageUrl = (image) => {
  if (!image) {
    return "";
  }

  if (
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }

  return `${IMG_URL}${image.startsWith("/") ? "" : "/"}${image}`;
};

// =========================================================
// PRICE HELPER
// =========================================================

const getNumericPrice = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return 0;
  }

  if (typeof value === "number") {
    return value;
  }

  const cleanedValue = String(value)
    .replace(/[₹,\s]/g, "")
    .replace(/[^\d.]/g, "");

  const numberValue = Number(cleanedValue);

  return Number.isFinite(numberValue)
    ? numberValue
    : 0;
};

// =========================================================
// COMPONENT
// =========================================================

const Shopdetails = () => {
  // =======================================================
  // SHOP PRODUCTS
  // =======================================================

  const [products, setProducts] = useState([]);

  const [loadingProducts, setLoadingProducts] =
    useState(true);

  const [productError, setProductError] =
    useState("");

  // =======================================================
  // SELECTED PRODUCT
  // =======================================================

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  // =======================================================
  // ORDER FORM
  // =======================================================

  const [formData, setFormData] = useState({
    studentName: "",
    age: "",
    phone: "",
    size: "",
    address: "",
  });

  const [submitting, setSubmitting] =
    useState(false);

  // =======================================================
  // FETCH SHOP PRODUCTS
  // =======================================================

  const fetchShopProducts = async () => {
    try {
      setLoadingProducts(true);
      setProductError("");

      const response = await API.get("/shop-images");

      console.log(
        "Shop Images API Response:",
        response.data
      );

      const backendData =
        response.data?.data;

      if (!Array.isArray(backendData)) {
        setProducts([]);
        return;
      }

      const backendProducts =
        backendData.map((item, index) => {
          const originalPrice =
            getNumericPrice(item.price);

          const discountPrice =
            item.discountPrice !== null &&
            item.discountPrice !== undefined &&
            item.discountPrice !== ""
              ? getNumericPrice(
                  item.discountPrice
                )
              : null;

          const hasDiscount =
            discountPrice !== null &&
            discountPrice > 0 &&
            discountPrice < originalPrice;

          const finalPrice =
            hasDiscount
              ? discountPrice
              : originalPrice;

          const priceDisplay =
            `₹${finalPrice.toLocaleString(
              "en-IN"
            )}`;

          const originalPriceDisplay =
            hasDiscount
              ? `₹${originalPrice.toLocaleString(
                  "en-IN"
                )}`
              : "";

          return {
            // MongoDB ID
            _id: item._id,

            /*
             * Keep Mongo ID separately.
             * This is useful if backend later changes
             * productId to String/ObjectId.
             */
            mongoId: item._id,

            /*
             * If your shop API has a numeric ID,
             * use it. Otherwise create a numeric
             * fallback based on array position.
             */
            id:
              Number.isFinite(
                Number(item.id)
              )
                ? Number(item.id)
                : index + 1,

            title:
              item.title ||
              "Shop Item",

            image:
              getImageUrl(item.image),

            // Customer display price
            price:
              priceDisplay,

            // Numeric price for order API
            numericPrice:
              finalPrice,

            // Original display price
            originalPrice:
              originalPriceDisplay,

            rating:
              Number(item.rating) || 0,

            onSale:
              hasDiscount,
          };
        });

      console.log(
        "Mapped Shop Products:",
        backendProducts
      );

      setProducts(
        backendProducts
      );
    } catch (error) {
      console.error(
        "FETCH SHOP PRODUCTS ERROR:",
        error
      );

      console.error(
        "Shop backend response:",
        error.response?.data
      );

      setProducts([]);

      setProductError(
        error.response?.data?.message ||
          "Failed to load shop products."
      );
    } finally {
      setLoadingProducts(false);
    }
  };

  // =======================================================
  // LOAD PRODUCTS
  // =======================================================

  useEffect(() => {
    fetchShopProducts();
  }, []);

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
    console.log(
      "Selected Shop Product:",
      product
    );

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
    const {
      name,
      value,
    } = e.target;

    setFormData(
      (previousData) => ({
        ...previousData,
        [name]: value,
      })
    );
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
    // FORM VALUES
    // =====================================================

    const studentName =
      formData.studentName.trim();

    const age =
      Number(formData.age);

    const phone =
      formData.phone.trim();

    const size =
      formData.size.trim();

    const address =
      formData.address.trim();

    // =====================================================
    // VALIDATION
    // =====================================================

    if (!studentName) {
      Swal.fire({
        icon: "warning",
        title: "Student Name Required",
        text: "Please enter student's name.",
        confirmButtonColor: "#0066ff",
      });

      return;
    }

    if (
      !age ||
      age < 1 ||
      age > 12
    ) {
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

    if (
      !/^[0-9]{10}$/.test(phone)
    ) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Mobile Number",
        text:
          "Please enter a valid 10-digit mobile number.",
        confirmButtonColor: "#0066ff",
      });

      return;
    }

    if (!address) {
      Swal.fire({
        icon: "warning",
        title: "Address Required",
        text:
          "Please enter delivery / home address.",
        confirmButtonColor: "#0066ff",
      });

      return;
    }

    // =====================================================
    // PREPARE ORDER
    // =====================================================

    /*
     * IMPORTANT:
     *
     * Do NOT send Mongo _id here if your existing
     * Order model expects productId:Number.
     *
     * The frontend now keeps a numeric `id`.
     */

    const productId =
      Number(selectedProduct.id);

    const price =
      Number(
        selectedProduct.numericPrice
      );

    if (
      !Number.isFinite(productId)
    ) {
      Swal.fire({
        icon: "error",
        title: "Invalid Product",
        text:
          "The selected product does not have a valid product ID.",
        confirmButtonColor: "#0066ff",
      });

      return;
    }

    if (
      !Number.isFinite(price) ||
      price <= 0
    ) {
      Swal.fire({
        icon: "error",
        title: "Invalid Product Price",
        text:
          "The selected product does not have a valid price.",
        confirmButtonColor: "#0066ff",
      });

      return;
    }

    // =====================================================
    // ORDER PAYLOAD
    // =====================================================

    const orderData = {
      productId:
        productId,

      productTitle:
        selectedProduct.title,

      /*
       * Numeric price.
       *
       * If your Order schema uses Number,
       * this prevents Mongoose CastError.
       */
      price:
        price,

      studentName:
        studentName,

      age:
        age,

      size:
        size,

      phone:
        phone,

      address:
        address,
    };

    console.log(
      "================================"
    );

    console.log(
      "SENDING ORDER"
    );

    console.log(
      "Product:",
      selectedProduct
    );

    console.log(
      "Order Data:",
      orderData
    );

    console.log(
      "productId type:",
      typeof orderData.productId
    );

    console.log(
      "price type:",
      typeof orderData.price
    );

    console.log(
      "================================"
    );

    // =====================================================
    // POST ORDER
    // =====================================================

    try {
      setSubmitting(true);

      const response =
        await API.post(
          "/orders",
          orderData
        );

      console.log(
        "Order API Response:",
        response.data
      );

      // ===================================================
      // SAVED ORDER
      // ===================================================

      const savedOrder =
        response.data?.order;

      if (!savedOrder) {
        throw new Error(
          "Order was not returned by the server."
        );
      }

      // ===================================================
      // CLOSE MODAL
      // ===================================================

      setSelectedProduct(null);

      resetForm();

      setSubmitting(false);

      // ===================================================
      // SUCCESS
      // ===================================================

      await Swal.fire({
        icon: "success",

        title:
          "Thank You! 🎉",

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

        confirmButtonText:
          "Done",

        confirmButtonColor:
          "#0066ff",

        allowOutsideClick:
          false,
      });
    } catch (error) {
      console.error(
        "================================"
      );

      console.error(
        "ORDER SUBMISSION ERROR"
      );

      console.error(
        error
      );

      console.error(
        "Backend Response:",
        error.response?.data
      );

      console.error(
        "Backend Status:",
        error.response?.status
      );

      console.error(
        "Backend Headers:",
        error.response?.headers
      );

      console.error(
        "================================"
      );

      setSubmitting(false);

      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.response?.data?.details ||
        error.response?.data?.errors;

      let errorMessage =
        "Failed to submit order. Please try again.";

      if (
        typeof backendMessage ===
        "string"
      ) {
        errorMessage =
          backendMessage;
      } else if (
        backendMessage &&
        typeof backendMessage ===
          "object"
      ) {
        errorMessage =
          JSON.stringify(
            backendMessage
          );
      } else if (
        error.message
      ) {
        errorMessage =
          error.message;
      }

      Swal.fire({
        icon: "error",

        title:
          "Order Failed",

        text:
          errorMessage,

        confirmButtonText:
          "Try Again",

        confirmButtonColor:
          "#0066ff",
      });
    }
  };

  // =======================================================
  // RATING
  // =======================================================

  const renderRating = (
    rating
  ) => {
    const numericRating =
      Number(rating) || 0;

    return (
      <div
        className="Shopdetails-rating"
        aria-label={`${numericRating} out of 5 stars`}
      >
        {[...Array(5)].map(
          (_, index) =>
            index <
            Math.round(
              numericRating
            ) ? (
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

        {/* HEADER */}

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

        {/* LOADING */}

        {loadingProducts && (
          <div className="Shopdetails-loading">

            <div className="Shopdetails-loading-spinner"></div>

            <p>
              Loading shop items...
            </p>

          </div>
        )}

        {/* ERROR */}

        {!loadingProducts &&
          productError && (
            <div className="Shopdetails-error">

              <p>
                {productError}
              </p>

              <button
                type="button"
                onClick={
                  fetchShopProducts
                }
              >
                Try Again
              </button>

            </div>
          )}

        {/* EMPTY */}

        {!loadingProducts &&
          !productError &&
          products.length === 0 && (
            <div className="Shopdetails-empty">

              <h3>
                No shop items available
              </h3>

              <p>
                Shop activities will appear
                here once they are added
                from the admin panel.
              </p>

            </div>
          )}

        {/* PRODUCTS */}

        {!loadingProducts &&
          !productError &&
          products.length > 0 && (

            <div className="Shopdetails-grid">

              {products.map(
                (item) => (

                  <article
                    className="Shopdetails-card"
                    key={
                      item._id ||
                      item.id
                    }
                  >

                    {/* IMAGE */}

                    <div className="Shopdetails-image-wrapper">

                      {item.image ? (

                        <img
                          src={
                            item.image
                          }
                          alt={`${item.title} activity at Nanda Kidz`}
                          className="Shopdetails-image"
                          loading="lazy"
                          onError={(
                            e
                          ) => {
                            e.currentTarget.style.display =
                              "none";
                          }}
                        />

                      ) : (

                        <div className="Shopdetails-image-placeholder">
                          No Image
                        </div>

                      )}

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

                      {item.rating > 0 &&
                        renderRating(
                          item.rating
                        )}

                      <div className="Shopdetails-price-wrapper">

                        {item.onSale &&
                          item.originalPrice && (

                            <span className="Shopdetails-original-price">
                              {
                                item.originalPrice
                              }
                            </span>

                          )}

                        <span
                          className={`Shopdetails-price ${
                            item.onSale
                              ? "Shopdetails-sale-price"
                              : ""
                          }`}
                        >
                          {
                            item.price
                          }
                        </span>

                      </div>

                      <button
                        type="button"
                        className="Shopdetails-btn"
                        onClick={() =>
                          handleOpenModal(
                            item
                          )
                        }
                      >
                        ADD TO CART
                      </button>

                    </div>

                  </article>

                )
              )}

            </div>
          )}

        {/* SEO CONTENT */}

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
          ORDER MODAL
      =================================================== */}

      {selectedProduct !== null && (

        <div
          className="shop-modal-overlay"
          onClick={
            handleCloseModal
          }
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

            {/* CLOSE */}

            <button
              type="button"
              className="shop-modal-close"
              onClick={
                handleCloseModal
              }
              aria-label="Close modal"
              disabled={
                submitting
              }
            >
              <FaTimes />
            </button>

            {/* HEADER */}

            <div className="shop-modal-header">

              <span className="shop-modal-badge">
                Student Order Form
              </span>

              <h3 id="shop-modal-title">
                {
                  selectedProduct?.title
                }
              </h3>

              <p className="shop-modal-price">
                {
                  selectedProduct?.price
                }
              </p>

            </div>

            {/* FORM */}

            <form
              onSubmit={
                handleSubmitOrder
              }
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
                  value={
                    formData.studentName
                  }
                  onChange={
                    handleInputChange
                  }
                  disabled={
                    submitting
                  }
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
                    value={
                      formData.age
                    }
                    onChange={
                      handleInputChange
                    }
                    disabled={
                      submitting
                    }
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
                    value={
                      formData.size
                    }
                    onChange={
                      handleInputChange
                    }
                    disabled={
                      submitting
                    }
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
                  value={
                    formData.phone
                  }
                  onChange={
                    handleInputChange
                  }
                  disabled={
                    submitting
                  }
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
                  value={
                    formData.address
                  }
                  onChange={
                    handleInputChange
                  }
                  disabled={
                    submitting
                  }
                ></textarea>

              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                className="shop-modal-submit-btn"
                disabled={
                  submitting
                }
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
                  "Confirm Order"
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