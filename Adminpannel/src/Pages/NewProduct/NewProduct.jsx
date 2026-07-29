
import React, { useState } from "react";
import {
  FiBox,
  FiUpload,
  FiCheck,
  FiBell,
  FiChevronDown,
  FiMonitor,
  FiBookOpen,
  FiSmartphone,
  FiHeart,
  FiMinus,
  FiPlus,
  FiShoppingCart,
  FiFacebook,
  FiTwitter,
  FiShare2,
  FiMail,
  FiInfo,
  FiSend,
  FiExternalLink,
} from "react-icons/fi";
import "./NewProduct.css";

const NewProduct = () => {
  const [productType, setProductType] = useState("Physical");
  const [productStatus, setProductStatus] = useState("Active");

  const [featured, setFeatured] = useState(false);
  const [bestSeller, setBestSeller] = useState(false);
  const [newArrival, setNewArrival] = useState(true);
  const [allowReviews, setAllowReviews] = useState(true);

  const [qty, setQty] = useState(1);

  const productTypes = [
    { name: "Physical", icon: <FiBox /> },
    { name: "Variable", icon: <FiBookOpen /> },
    { name: "Digital", icon: <FiSmartphone /> },
  ];

  const statusOptions = [
    {
      name: "Active",
      description: "Product will be visible on the website",
    },
    {
      name: "Inactive",
      description: "Product will be hidden from store",
    },
    {
      name: "Draft",
      description: "Save as draft for later",
    },
  ];

  const settings = [
    {
      title: "Featured Product",
      description: "Show in featured section",
      value: featured,
      setter: setFeatured,
    },
    {
      title: "Best Seller",
      description: "Mark as best seller",
      value: bestSeller,
      setter: setBestSeller,
    },
    {
      title: "New Arrival",
      description: "Show as new arrival",
      value: newArrival,
      setter: setNewArrival,
    },
    {
      title: "Allow Reviews",
      description: "Allow customers to review",
      value: allowReviews,
      setter: setAllowReviews,
    },
  ];

  const tips = [
    "Use high quality images for better sales",
    "Write clear and detailed product description",
    "Set appropriate price and stock levels",
    "Choose correct category for easy search",
  ];

  return (
    <div className="anp-admin-container">

      {/* ==================== HEADER ==================== */}
      <header className="anp-top-header">
        <div className="anp-breadcrumb-area">
          <h1 className="anp-page-title">Add New Product</h1>

          <p className="anp-breadcrumbs">
            Dashboard
            <span className="anp-separator">&gt;</span>
            Shop
            <span className="anp-separator">&gt;</span>
            Products
            <span className="anp-separator">&gt;</span>
            Add New Product
          </p>
        </div>

        <div className="anp-header-actions">
          <button
            type="button"
            className="anp-visit-website-btn"
          >
            <FiExternalLink />
            <span>Visit Website</span>
          </button>

          <button
            type="button"
            className="anp-notification-icon"
            aria-label="Notifications"
          >
            <FiBell />
            <span className="anp-badge-dot">5</span>
          </button>

          <button
            type="button"
            className="anp-admin-profile"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
              alt="Admin profile"
            />

            <span>Admin</span>
            <FiChevronDown />
          </button>
        </div>
      </header>


      {/* ==================== MAIN GRID ==================== */}
      <main className="anp-main-content-grid">

        {/* ==================== LEFT FORM COLUMN ==================== */}
        <section className="anp-form-column">

          {/* PRODUCT INFORMATION */}
          <div className="anp-card">

            <div className="anp-card-header">
              <span className="anp-card-icon purple-bg">
                <FiBox />
              </span>

              <h2>Product Information</h2>
            </div>


            {/* Product Name / SKU */}
            <div className="anp-form-row two-col">

              <div className="anp-form-group">
                <label>
                  Product Name <span>*</span>
                </label>

                <input
                  type="text"
                  placeholder="Enter product name"
                  defaultValue="School Backpack"
                />
              </div>


              <div className="anp-form-group">
                <label>
                  SKU / Product Code <span>*</span>
                </label>

                <input
                  type="text"
                  placeholder="Enter unique SKU or product code"
                  defaultValue="BP-SCH-001"
                />
              </div>

            </div>


            {/* Category / Sub Category */}
            <div className="anp-form-row two-col">

              <div className="anp-form-group">
                <label>
                  Category <span>*</span>
                </label>

                <div className="anp-select-wrapper">
                  <select defaultValue="Bags">
                    <option value="Bags">Bags</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Shoes">Shoes</option>
                  </select>

                  <FiChevronDown className="select-arrow" />
                </div>
              </div>


              <div className="anp-form-group">
                <label>Sub Category</label>

                <div className="anp-select-wrapper">
                  <select defaultValue="School Bags">
                    <option value="School Bags">
                      School Bags
                    </option>

                    <option value="Travel Bags">
                      Travel Bags
                    </option>

                    <option value="Laptop Bags">
                      Laptop Bags
                    </option>
                  </select>

                  <FiChevronDown className="select-arrow" />
                </div>
              </div>

            </div>


            {/* Product Type / Brand */}
            <div className="anp-form-row two-col">

              <div className="anp-form-group">
                <label>
                  Type <span>*</span>
                </label>

                <div className="anp-type-selector">

                  {productTypes.map((type) => (
                    <button
                      key={type.name}
                      type="button"
                      className={
                        productType === type.name
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setProductType(type.name)
                      }
                    >
                      {type.icon}
                      <span>{type.name}</span>
                    </button>
                  ))}

                </div>
              </div>


              <div className="anp-form-group">
                <label>Brand</label>

                <input
                  type="text"
                  placeholder="Enter brand name"
                  defaultValue="Safari"
                />
              </div>

            </div>


            {/* Short Description */}
            <div className="anp-form-group">

              <label>
                Short Description <span>*</span>
              </label>

              <textarea
                rows="3"
                maxLength="160"
                placeholder="Enter short description about product..."
                defaultValue="Durable and comfortable school backpack with multiple compartments. Perfect for daily school use."
              />

              <span className="anp-char-count">
                99/160
              </span>

            </div>


            {/* Full Description */}
            <div className="anp-form-group">

              <label>Full Description</label>

              <div className="anp-description-editor">

                <div className="anp-editor-toolbar">

                  <button type="button">
                    <b>B</b>
                  </button>

                  <button type="button">
                    <i>I</i>
                  </button>

                  <button type="button">
                    <u>U</u>
                  </button>

                  <span className="anp-editor-divider" />

                  <button type="button">
                    <FiUpload />
                  </button>

                  <button type="button">
                    <FiPlus />
                  </button>

                  <button type="button">
                    <FiChevronDown />
                  </button>

                </div>

                <textarea
                  rows="7"
                  placeholder="Write product description here..."
                  defaultValue="Crafted with high-grade, water-resistant polyester fabric, this school backpack ensures maximum durability and longevity. Features padded ergonomic shoulder straps, spacious dual compartments, side mesh pockets for bottles, and a vibrant artistic layout designed specially for students."
                />

              </div>

            </div>

          </div>


          {/* ==================== PRODUCT IMAGES ==================== */}
          <div className="anp-card">

            <div className="anp-card-header">
              <span className="anp-card-icon purple-bg">
                <FiUpload />
              </span>

              <h2>
                Product Images <span>*</span>
              </h2>
            </div>


            <div className="anp-images-grid-container">

              <div className="anp-upload-box main-upload">

                <FiUpload className="upload-cloud-icon" />

                <strong>
                  Upload Main Image
                </strong>

                <small>
                  Drag & drop or click to browse
                </small>

                <small>
                  JPG, PNG, WEBP (Max. 5MB)
                </small>

              </div>


              {[1, 2, 3, 4].map((item) => (
                <div
                  className="anp-upload-box"
                  key={item}
                >
                  <FiPlus className="plus-icon" />

                  <span>
                    Add Image
                  </span>
                </div>
              ))}

            </div>

          </div>


          {/* ==================== PRICING ==================== */}
          <div className="anp-card">

            <div className="anp-card-header">
              <span className="anp-card-icon green-bg">
                <FiBox />
              </span>

              <h2>
                Pricing & Inventory
              </h2>
            </div>


            <div className="anp-form-row three-col">

              <div className="anp-form-group">
                <label>
                  Price (₹) <span>*</span>
                </label>

                <input
                  type="number"
                  defaultValue="899.00"
                />
              </div>


              <div className="anp-form-group">
                <label>
                  Sale Price (₹)
                </label>

                <input
                  type="number"
                  defaultValue="999.00"
                />

                <span className="anp-input-hint">
                  Leave empty if no sale
                </span>
              </div>


              <div className="anp-form-group">
                <label>
                  Cost Price (₹)
                </label>

                <input
                  type="number"
                  defaultValue="600.00"
                />

                <span className="anp-input-hint">
                  For inventory calculation
                </span>
              </div>

            </div>


            <div className="anp-form-row three-col">

              <div className="anp-form-group">
                <label>
                  Stock Quantity <span>*</span>
                </label>

                <input
                  type="number"
                  defaultValue="45"
                />
              </div>


              <div className="anp-form-group">
                <label>
                  Low Stock Alert
                </label>

                <input
                  type="number"
                  defaultValue="5"
                />

                <span className="anp-input-hint">
                  Alert when stock is below this
                </span>
              </div>


              <div className="anp-form-group">
                <label>
                  Unit
                </label>

                <div className="anp-select-wrapper">

                  <select defaultValue="Piece">
                    <option value="Piece">
                      Piece
                    </option>

                    <option value="Kg">
                      Kg
                    </option>

                    <option value="Box">
                      Box
                    </option>
                  </select>

                  <FiChevronDown className="select-arrow" />

                </div>

              </div>

            </div>


            <label className="anp-checkbox-group">

              <input
                type="checkbox"
                defaultChecked
              />

              <span>
                Track inventory for this product
              </span>

            </label>

          </div>


          {/* ==================== STATUS ==================== */}
          <div className="anp-card">

            <div className="anp-card-header">

              <span className="anp-card-icon green-bg">
                <FiCheck />
              </span>

              <h2>
                Product Status
              </h2>

            </div>


            <div className="anp-radio-group-container">

              {statusOptions.map((status) => (

                <label
                  key={status.name}
                  className={`anp-radio-box ${
                    productStatus === status.name
                      ? "selected"
                      : ""
                  }`}
                >

                  <input
                    type="radio"
                    name="product-status"
                    checked={
                      productStatus === status.name
                    }
                    onChange={() =>
                      setProductStatus(status.name)
                    }
                  />

                  <div className="radio-content">

                    <span className="radio-title">

                      {status.name}

                      {status.name === "Active" && (
                        <span className="status-pill active-pill">
                          Visible
                        </span>
                      )}

                    </span>

                    <span className="radio-desc">
                      {status.description}
                    </span>

                  </div>

                </label>

              ))}

            </div>

          </div>


          {/* ==================== SETTINGS ==================== */}
          <div className="anp-card">

            <div className="anp-card-header">

              <span className="anp-card-icon purple-bg">
                <FiBox />
              </span>

              <h2>
                Product Settings
              </h2>

            </div>


            {settings.map((setting) => (

              <div
                className="anp-toggle-row"
                key={setting.title}
              >

                <div className="toggle-info">

                  <span className="toggle-title">
                    {setting.title}
                  </span>

                  <span className="toggle-desc">
                    {setting.description}
                  </span>

                </div>


                <label className="anp-switch">

                  <input
                    type="checkbox"
                    checked={setting.value}
                    onChange={() =>
                      setting.setter(!setting.value)
                    }
                  />

                  <span className="slider round" />

                </label>

              </div>

            ))}

          </div>


          {/* ==================== SHIPPING ==================== */}
          <div className="anp-card">

            <div className="anp-card-header">

              <span className="anp-card-icon green-bg">
                <FiBox />
              </span>

              <h2>
                Shipping & Delivery
              </h2>

            </div>


            <div className="anp-form-group">

              <label>
                Requires Shipping
              </label>

              <div className="anp-select-wrapper">

                <select defaultValue="Yes">

                  <option value="Yes">
                    Yes
                  </option>

                  <option value="No">
                    No
                  </option>

                </select>

                <FiChevronDown className="select-arrow" />

              </div>

            </div>


            <div className="anp-form-row two-col">

              <div className="anp-form-group">

                <label>
                  Weight (kg)
                </label>

                <input
                  type="number"
                  defaultValue="0.65"
                />

              </div>


              <div className="anp-form-group">

                <label>
                  Dimensions (cm)
                </label>

                <div className="dimension-inputs">

                  <input
                    placeholder="Length"
                    defaultValue="30"
                  />

                  <input
                    placeholder="Width"
                    defaultValue="15"
                  />

                  <input
                    placeholder="Height"
                    defaultValue="42"
                  />

                </div>

              </div>

            </div>

          </div>


          {/* ==================== SEO ==================== */}
          <div className="anp-card">

            <div className="anp-card-header">

              <span className="anp-card-icon purple-bg">
                <FiBox />
              </span>

              <h2>
                SEO Settings
              </h2>

            </div>


            <div className="anp-form-group">

              <label>
                Meta Title
              </label>

              <input
                type="text"
                maxLength="60"
                placeholder="Enter meta title"
                defaultValue="Buy School Backpack Online - Best Quality Bags"
              />

              <span className="anp-char-count">
                48/60
              </span>

            </div>


            <div className="anp-form-group">

              <label>
                Meta Description
              </label>

              <textarea
                rows="3"
                maxLength="160"
                placeholder="Enter meta description"
                defaultValue="Shop durable and comfortable school backpacks with multiple compartments at the best price. Free shipping available!"
              />

              <span className="anp-char-count">
                115/160
              </span>

            </div>

          </div>


          {/* ==================== ACTIONS ==================== */}
          <div className="anp-bottom-actions">

            <button
              type="button"
              className="anp-btn-cancel"
            >
              Cancel
            </button>

            <button
              type="button"
              className="anp-btn-draft"
            >
              Save as Draft
            </button>

            <button
              type="button"
              className="anp-btn-publish"
            >
              <FiSend />
              Save & Publish
            </button>

          </div>

        </section>


        {/* ==================== RIGHT PREVIEW ==================== */}
        <aside className="anp-preview-column">

          <div className="anp-preview-sticky-wrapper">

            {/* PREVIEW CARD */}
            <div className="anp-card anp-preview-card">

              <div className="anp-preview-header">

                <h3>
                  Product Preview
                </h3>


                <div className="anp-preview-device-switch">

                  <button
                    type="button"
                    className="active"
                  >
                    <FiMonitor />
                  </button>

                  <button type="button">
                    <FiBookOpen />
                  </button>

                  <button type="button">
                    <FiSmartphone />
                  </button>

                </div>

              </div>


              <div className="anp-live-product-box">

                <span className="anp-discount-tag">
                  -10%
                </span>


                <button
                  type="button"
                  className="anp-wishlist-btn"
                  aria-label="Add to wishlist"
                >
                  <FiHeart />
                </button>


                <div className="anp-live-img-container">

                  <img
                    src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
                    alt="School Backpack"
                    className="anp-preview-bag-img"
                  />

                </div>


                <div className="anp-live-details">

                  <h4 className="live-product-title">
                    School Backpack
                  </h4>


                  <span className="live-product-category">
                    Bags
                  </span>


                  <div className="live-price-row">

                    <span className="current-price">
                      ₹899.00
                    </span>

                    <span className="original-price">
                      ₹999.00
                    </span>

                    <span className="stock-badge">
                      In Stock
                    </span>

                  </div>


                  <p className="live-description">
                    Durable and comfortable school backpack
                    with multiple compartments. Perfect for
                    daily school use.
                  </p>


                  <div className="live-features-row">

                    <span className="feat-chip">
                      Quality Material
                    </span>

                    <span className="feat-chip">
                      Water Resistant
                    </span>

                    <span className="feat-chip">
                      1 Year Warranty
                    </span>

                  </div>


                  <div className="live-cart-actions">

                    <div className="qty-selector">

                      <button
                        type="button"
                        onClick={() =>
                          setQty(
                            Math.max(1, qty - 1)
                          )
                        }
                      >
                        <FiMinus />
                      </button>

                      <span>
                        {qty}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          setQty(qty + 1)
                        }
                      >
                        <FiPlus />
                      </button>

                    </div>


                    <button
                      type="button"
                      className="add-to-cart-btn"
                    >
                      <FiShoppingCart />
                      Add to Cart
                    </button>

                  </div>


                  <div className="live-share-row">

                    <span>
                      Share:
                    </span>

                    <div className="share-icons">

                      <a
                        href="#facebook"
                        aria-label="Facebook"
                      >
                        <FiFacebook />
                      </a>

                      <a
                        href="#twitter"
                        aria-label="Twitter"
                      >
                        <FiTwitter />
                      </a>

                      <a
                        href="#share"
                        aria-label="Share"
                      >
                        <FiShare2 />
                      </a>

                      <a
                        href="#mail"
                        aria-label="Email"
                      >
                        <FiMail />
                      </a>

                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* TIPS */}
            <div className="anp-card anp-tips-card">

              <div className="anp-card-header">

                <span className="anp-card-icon purple-bg">
                  <FiInfo />
                </span>

                <h2>
                  Tips
                </h2>

              </div>


              <ul className="anp-tips-list">

                {tips.map((tip) => (

                  <li key={tip}>

                    <FiCheck className="tip-check" />

                    <span>
                      {tip}
                    </span>

                  </li>

                ))}

              </ul>

            </div>

          </div>

        </aside>

      </main>

    </div>
  );
};

export default NewProduct;

