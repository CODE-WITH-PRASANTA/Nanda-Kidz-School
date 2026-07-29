import React, { useState } from "react";
import {
  FiBox,
  FiUpload,
  FiCheck,
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

  return (
    <div className="np-admin-container">

      {/* Page Header - Top Right Header Removed */}
      <header className="np-page-header">
        <div className="np-breadcrumb-area">
          <h1 className="np-page-title">Add New Product</h1>

          <p className="np-breadcrumbs">
            Dashboard
            <span>&gt;</span>
            Shop
            <span>&gt;</span>
            Products
            <span>&gt;</span>
            Add New Product
          </p>
        </div>
      </header>

      {/* Main Layout */}
      <div className="np-main-grid">

        {/* ================= LEFT 50% ================= */}
        <div className="np-left-column">

          {/* Product Information */}
          <div className="np-card">
            <div className="np-card-header">
              <span className="np-card-icon np-purple-bg">
                <FiBox />
              </span>
              <h2>Product Information</h2>
            </div>

            <div className="np-form-row np-two-col">

              <div className="np-form-group">
                <label>
                  Product Name <span>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  defaultValue="School Backpack"
                />
              </div>

              <div className="np-form-group">
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

            <div className="np-form-row np-two-col">

              <div className="np-form-group">
                <label>
                  Category <span>*</span>
                </label>

                <div className="np-select-wrapper">
                  <select defaultValue="Bags">
                    <option value="Bags">Bags</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                  </select>
                  <FiChevronDown className="np-select-arrow" />
                </div>
              </div>

              <div className="np-form-group">
                <label>Sub Category</label>

                <div className="np-select-wrapper">
                  <select defaultValue="School Bags">
                    <option value="School Bags">School Bags</option>
                    <option value="Travel Bags">Travel Bags</option>
                  </select>
                  <FiChevronDown className="np-select-arrow" />
                </div>
              </div>

            </div>

            <div className="np-form-row np-two-col">

              <div className="np-form-group">
                <label>
                  Type <span>*</span>
                </label>

                <div className="np-type-selector">

                  <button
                    type="button"
                    className={productType === "Physical" ? "active" : ""}
                    onClick={() => setProductType("Physical")}
                  >
                    <FiBox />
                    Physical
                  </button>

                  <button
                    type="button"
                    className={productType === "Variable" ? "active" : ""}
                    onClick={() => setProductType("Variable")}
                  >
                    <FiBookOpen />
                    Variable
                  </button>

                  <button
                    type="button"
                    className={productType === "Digital" ? "active" : ""}
                    onClick={() => setProductType("Digital")}
                  >
                    <FiSmartphone />
                    Digital
                  </button>

                </div>
              </div>

              <div className="np-form-group">
                <label>Brand (Optional)</label>
                <input
                  type="text"
                  placeholder="Enter brand name"
                  defaultValue="Safari"
                />
              </div>

            </div>

            <div className="np-form-group">
              <label>
                Short Description <span>*</span>
              </label>

              <textarea
                rows="3"
                placeholder="Enter short description about product..."
                defaultValue="Durable and comfortable school backpack with multiple compartments. Perfect for daily school use."
              />

              <span className="np-char-count">99/160</span>
            </div>

            <div className="np-form-group">
              <label>Full Description</label>

              <div className="np-editor">
                <div className="np-toolbar">

                  <span className="np-toolbar-dropdown">
                    Paragraph
                    <FiChevronDown />
                  </span>

                  <div className="np-toolbar-divider" />

                  <button type="button"><b>B</b></button>
                  <button type="button"><i>I</i></button>
                  <button type="button"><u>U</u></button>

                  <div className="np-toolbar-divider" />

                  <button type="button">≡</button>
                  <button type="button">≡</button>
                  <button type="button">≡</button>

                  <div className="np-toolbar-divider" />

                  <button type="button">
                    <FiUpload />
                  </button>

                  <button type="button">⋯</button>

                </div>

                <textarea
                  className="np-editor-textarea"
                  placeholder="Write product description here..."
                  defaultValue="Crafted with high-grade, water-resistant polyester fabric, this school backpack ensures maximum durability and longevity. Features padded ergonomic shoulder straps, spacious dual compartments, side mesh pockets for bottles, and a vibrant artistic layout designed specially for students."
                />
              </div>
            </div>
          </div>

          {/* Product Images */}
          <div className="np-card">

            <div className="np-card-header">
              <span className="np-card-icon np-purple-bg">
                <FiUpload />
              </span>
              <h2>
                Product Images <span>*</span>
              </h2>
            </div>

            <div className="np-images-grid">

              <div className="np-upload-box np-main-upload">
                <FiUpload className="np-upload-icon" />
                <strong>Upload Main Image</strong>
                <span>Drag & drop or click to browse</span>
                <small>JPG, PNG, WEBP (Max. 5MB)</small>
              </div>

              <div className="np-upload-box">
                <FiPlus />
                <span>Add Image</span>
              </div>

              <div className="np-upload-box">
                <FiPlus />
                <span>Add Image</span>
              </div>

              <div className="np-upload-box">
                <FiPlus />
                <span>Add Image</span>
              </div>

              <div className="np-upload-box">
                <FiPlus />
                <span>Add Image</span>
              </div>

            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="np-card">

            <div className="np-card-header">
              <span className="np-card-icon np-green-bg">
                <FiBox />
              </span>
              <h2>Pricing & Inventory</h2>
            </div>

            <div className="np-form-row np-three-col">

              <div className="np-form-group">
                <label>Price (₹) *</label>
                <input type="text" defaultValue="899.00" />
              </div>

              <div className="np-form-group">
                <label>Sale Price (₹)</label>
                <input type="text" defaultValue="999.00" />
                <small>Leave empty if no sale</small>
              </div>

              <div className="np-form-group">
                <label>Cost Price (₹)</label>
                <input type="text" defaultValue="600.00" />
                <small>For inventory calculation</small>
              </div>

            </div>

            <div className="np-form-row np-three-col">

              <div className="np-form-group">
                <label>Stock Quantity *</label>
                <input type="number" defaultValue="45" />
              </div>

              <div className="np-form-group">
                <label>Low Stock Alert</label>
                <input type="number" defaultValue="5" />
              </div>

              <div className="np-form-group">
                <label>Unit</label>

                <div className="np-select-wrapper">
                  <select defaultValue="Piece">
                    <option>Piece</option>
                    <option>Kg</option>
                    <option>Box</option>
                  </select>
                  <FiChevronDown className="np-select-arrow" />
                </div>
              </div>

            </div>

            <label className="np-checkbox">
              <input type="checkbox" defaultChecked />
              <span>Track inventory for this product</span>
            </label>

          </div>

          {/* Bottom Actions */}
          <div className="np-bottom-actions">
            <button className="np-cancel-btn">Cancel</button>
            <button className="np-draft-btn">Save as Draft</button>
            <button className="np-publish-btn">
              <FiSend />
              Save & Publish
            </button>
          </div>

        </div>

        {/* ================= MIDDLE 25% ================= */}
        <div className="np-middle-column">

          {/* Product Status */}
          <div className="np-card">

            <div className="np-card-header">
              <span className="np-card-icon np-green-bg">
                <FiCheck />
              </span>
              <h2>Product Status</h2>
            </div>

            <div className="np-status-list">

              {["Active", "Inactive", "Draft"].map((status) => (
                <label
                  key={status}
                  className={`np-status-box ${
                    productStatus === status ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="product-status"
                    checked={productStatus === status}
                    onChange={() => setProductStatus(status)}
                  />

                  <div>
                    <strong>
                      {status}
                      {status === "Active" && (
                        <span className="np-visible-pill">Visible</span>
                      )}
                    </strong>

                    <small>
                      {status === "Active"
                        ? "Product will be visible on the website"
                        : status === "Inactive"
                        ? "Product will be hidden from store"
                        : "Save as draft for later"}
                    </small>
                  </div>
                </label>
              ))}

            </div>
          </div>

          {/* Product Settings */}
          <div className="np-card">

            <div className="np-card-header">
              <span className="np-card-icon np-purple-bg">
                <FiBox />
              </span>
              <h2>Product Settings</h2>
            </div>

            {[
              ["Featured Product", "Show in featured section", featured, setFeatured],
              ["Best Seller", "Mark as best seller", bestSeller, setBestSeller],
              ["New Arrival", "Show as new arrival", newArrival, setNewArrival],
              ["Allow Reviews", "Allow customers to review", allowReviews, setAllowReviews],
            ].map(([title, desc, value, setter]) => (

              <div className="np-toggle-row" key={title}>

                <div>
                  <strong>{title}</strong>
                  <small>{desc}</small>
                </div>

                <label className="np-switch">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => setter(!value)}
                  />
                  <span />
                </label>

              </div>

            ))}

          </div>

          {/* Shipping & Delivery BELOW Product Settings */}
          <div className="np-card">

            <div className="np-card-header">
              <span className="np-card-icon np-green-bg">
                <FiBox />
              </span>
              <h2>Shipping & Delivery</h2>
            </div>

            <div className="np-form-group">
              <label>Requires Shipping</label>

              <div className="np-select-wrapper">
                <select defaultValue="Yes">
                  <option>Yes</option>
                  <option>No</option>
                </select>
                <FiChevronDown className="np-select-arrow" />
              </div>
            </div>

            <div className="np-form-row np-two-col">

              <div className="np-form-group">
                <label>Weight (kg)</label>
                <input type="text" defaultValue="0.65" />
              </div>

              <div className="np-form-group">
                <label>Dimensions (cm)</label>

                <div className="np-dimensions">
                  <input type="text" defaultValue="30" placeholder="L" />
                  <input type="text" defaultValue="15" placeholder="W" />
                  <input type="text" defaultValue="42" placeholder="H" />
                </div>
              </div>

            </div>

          </div>

          {/* SEO Settings BELOW Shipping */}
          <div className="np-card">

            <div className="np-card-header">
              <span className="np-card-icon np-purple-bg">
                <FiBox />
              </span>
              <h2>SEO Settings</h2>
            </div>

            <div className="np-form-group">
              <label>Meta Title</label>

              <input
                type="text"
                defaultValue="Buy School Backpack Online - Best Quality Bags"
                placeholder="Enter meta title"
              />

              <span className="np-char-count">48/60</span>
            </div>

            <div className="np-form-group">
              <label>Meta Description</label>

              <textarea
                rows="4"
                defaultValue="Shop durable and comfortable school backpacks with multiple compartments at the best price. Free shipping available!"
                placeholder="Enter meta description"
              />

              <span className="np-char-count">115/160</span>
            </div>

          </div>

        </div>

        {/* ================= RIGHT 25% ================= */}
        <div className="np-right-column">

          {/* Product Overview */}
          <div className="np-card np-overview-card">

            <div className="np-preview-header">
              <h2>Product Overview</h2>

              <div className="np-device-switch">
                <button className="active">
                  <FiMonitor />
                </button>
                <button>
                  <FiBookOpen />
                </button>
                <button>
                  <FiSmartphone />
                </button>
              </div>
            </div>

            <div className="np-product-preview">

              <span className="np-discount">-10%</span>

              <button className="np-wishlist">
                <FiHeart />
              </button>

              <div className="np-product-image">
                <img
                  src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
                  alt="School Backpack"
                />
              </div>

              <h3>School Backpack</h3>

              <span className="np-category">Bags</span>

              <div className="np-price-row">
                <strong>₹899.00</strong>
                <del>₹999.00</del>
              </div>

              <span className="np-stock">In Stock</span>

              <p>
                Durable and comfortable school backpack with multiple
                compartments. Perfect for daily school use.
              </p>

              <div className="np-feature-chips">
                <span>🛡 Quality Material</span>
                <span>💧 Water Resistant</span>
                <span>⭐ 1 Year Warranty</span>
              </div>

              <div className="np-cart-row">

                <div className="np-quantity">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                  >
                    <FiMinus />
                  </button>

                  <span>{qty}</span>

                  <button onClick={() => setQty(qty + 1)}>
                    <FiPlus />
                  </button>
                </div>

                <button className="np-cart-btn">
                  <FiShoppingCart />
                  Add to Cart
                </button>

              </div>

              <div className="np-share-row">
                <span>Share:</span>

                <a href="#facebook">
                  <FiFacebook />
                </a>

                <a href="#twitter">
                  <FiTwitter />
                </a>

                <a href="#share">
                  <FiShare2 />
                </a>

                <a href="#mail">
                  <FiMail />
                </a>
              </div>

            </div>
          </div>

          {/* Product Tips - Only Tips in Third Column */}
          <div className="np-card np-tips-card">

            <div className="np-card-header">
              <span className="np-card-icon np-purple-bg">
                <FiInfo />
              </span>
              <h2>Product Tips</h2>
            </div>

            <ul className="np-tips-list">

              <li>
                <FiCheck />
                Use high quality images for better sales
              </li>

              <li>
                <FiCheck />
                Write clear and detailed product description
              </li>

              <li>
                <FiCheck />
                Set appropriate price and stock levels
              </li>

              <li>
                <FiCheck />
                Choose correct category for easy search
              </li>

            </ul>

          </div>

        </div>

      </div>
    </div>
  );
};

export default NewProduct;