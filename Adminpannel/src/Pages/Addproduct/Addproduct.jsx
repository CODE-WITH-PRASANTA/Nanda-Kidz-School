import React, { useState, useRef } from 'react';
import "./Addproduct.css";

const AddProduct = () => {
  // Form State
  const initialFormState = {
    productName: '',
    sku: '',
    category: '',
    subCategory: '',
    type: 'Physical',
    brand: '',
    shortDescription: '',
    fullDescription: '',
    price: '',
    salePrice: '',
    costPrice: '',
    stockQuantity: '0',
    lowStockAlert: '5',
    unit: '',
    trackInventory: true,
    status: 'Active',
    featuredProduct: false,
    bestSeller: false,
    newArrival: true,
    allowReviews: true,
    requiresShipping: 'Yes',
    weight: '0.00',
    length: '',
    width: '',
    height: '',
    metaTitle: '',
    metaDescription: '',
  };

  const [formData, setFormData] = useState(initialFormState);

  // Image Upload States
  const [mainImage, setMainImage] = useState(null);
  const [extraImages, setExtraImages] = useState([null, null, null, null]);
  
  const mainFileInputRef = useRef(null);
  const extraFileInputRefs = useRef([]);

  // UI Interactive States
  const [previewMode, setPreviewMode] = useState('desktop'); 
  const [activeDropdown, setActiveDropdown] = useState(null); 
  const [toastMessage, setToastMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = (msg, isDanger = false) => {
    setToastMessage({ msg, isDanger });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSelectOption = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setActiveDropdown(null);
  };

  // Image Upload Handlers
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setMainImage(imageUrl);
      showToast('Main image uploaded successfully!');
    }
  };

  const handleExtraImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const updatedImages = [...extraImages];
      updatedImages[index] = imageUrl;
      setExtraImages(updatedImages);
      showToast(`Gallery image ${index + 1} added!`);
    }
  };

  const handleRemoveMainImage = (e) => {
    e.stopPropagation();
    setMainImage(null);
    showToast('Main image removed', true);
  };

  const handleRemoveExtraImage = (e, index) => {
    e.stopPropagation();
    const updatedImages = [...extraImages];
    updatedImages[index] = null;
    setExtraImages(updatedImages);
    showToast('Gallery image removed', true);
  };

  // Save / Action Handlers
  const handleSave = (statusType) => {
    if (!formData.productName.trim()) {
      showToast('Please enter a Product Name', true);
      return;
    }
    if (!formData.sku.trim()) {
      showToast('Please enter a SKU/Product code', true);
      return;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      showToast('Please enter a valid Price', true);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast(`Product successfully ${statusType === 'publish' ? 'published' : 'saved as draft'}!`);
    }, 600);
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    setMainImage(null);
    setExtraImages([null, null, null, null]);
    showToast('Form reset / Changes discarded', true);
  };

  return (
    <div className="add-product-page">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`ap-toast ${toastMessage.isDanger ? 'ap-toast-danger' : ''}`}>
          <span>{toastMessage.msg}</span>
        </div>
      )}

      {/* Top Header Actions */}
      <div className="ap-top-action-bar">
        <div>
          <h2>Add New Product</h2>
          <p className="ap-muted small">Create and configure a new item for your storefront inventory.</p>
        </div>
        <div className="ap-top-buttons">
          <button type="button" className="ap-btn" onClick={handleCancel}>Cancel</button>
          <button type="button" className="ap-btn" onClick={() => handleSave('draft')}>Save as Draft</button>
          <button type="button" className="ap-btn ap-btn-primary" onClick={() => handleSave('publish')} disabled={isSubmitting}>
            {isSubmitting ? <span className="ap-spinner"></span> : null}
            Save & Publish
          </button>
        </div>
      </div>

      {/* Main 3-Column Grid Layout */}
      <div className="ap-main-grid">
        
        {/* ================= COLUMN 1: Information, Images, Pricing ================= */}
        <div className="ap-col-left">
          
          {/* Product Information Panel */}
          <div className="ap-panel">
            <div className="ap-panel-title">
              <i className="ap-icon-box">📦</i> Product Information
            </div>
            
            <div className="ap-form-grid">
              <div className="ap-field">
                <label>Product Name *</label>
                <input
                  type="text"
                  name="productName"
                  placeholder="Enter product name"
                  value={formData.productName}
                  onChange={handleChange}
                />
              </div>
              <div className="ap-field">
                <label>SKU / Product Code *</label>
                <input
                  type="text"
                  name="sku"
                  placeholder="Enter unique SKU or product code"
                  value={formData.sku}
                  onChange={handleChange}
                />
              </div>

              {/* Category Dropdown */}
              <div className="ap-field ap-dropdown-container">
                <label>Category *</label>
                <div 
                  className="ap-dropdown-select"
                  onClick={() => setActiveDropdown(activeDropdown === 'category' ? null : 'category')}
                >
                  <span className={formData.category ? '' : 'ap-placeholder'}>
                    {formData.category || 'Select Category'}
                  </span>
                  <i>▼</i>
                </div>
                {activeDropdown === 'category' && (
                  <div className="ap-dropdown-menu">
                    {['Bags', 'Electronics', 'Clothing & Apparel', 'Home & Kitchen', 'Books & Stationery'].map((cat) => (
                      <button key={cat} type="button" onClick={() => handleSelectOption('category', cat)}>
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Sub Category Dropdown */}
              <div className="ap-field ap-dropdown-container">
                <label>Sub Category</label>
                <div 
                  className="ap-dropdown-select"
                  onClick={() => setActiveDropdown(activeDropdown === 'subCategory' ? null : 'subCategory')}
                >
                  <span className={formData.subCategory ? '' : 'ap-placeholder'}>
                    {formData.subCategory || 'Select Sub Category'}
                  </span>
                  <i>▼</i>
                </div>
                {activeDropdown === 'subCategory' && (
                  <div className="ap-dropdown-menu">
                    {['School Backpacks', 'Travel Bags', 'Laptop Sleeves', 'Handbags'].map((sub) => (
                      <button key={sub} type="button" onClick={() => handleSelectOption('subCategory', sub)}>
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Type selector */}
            <div className="ap-field ap-mt-14">
              <label>Type *</label>
              <div className="ap-type-pills">
                {[
                  { id: 'Physical', icon: '📦' },
                  { id: 'Variable', icon: '🔀' },
                  { id: 'Digital', icon: '💻' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`ap-type-pill ${formData.type === t.id ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, type: t.id })}
                  >
                    <span>{t.icon}</span> {t.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand */}
            <div className="ap-field ap-mt-14">
              <label>Brand (Optional)</label>
              <input
                type="text"
                name="brand"
                placeholder="Enter brand name"
                value={formData.brand}
                onChange={handleChange}
              />
            </div>

            {/* Short Description */}
            <div className="ap-field ap-mt-14">
              <label>Short Description *</label>
              <div className="ap-textarea-wrap">
                <textarea
                  name="shortDescription"
                  rows="3"
                  maxLength="160"
                  placeholder="Enter short description about product..."
                  value={formData.shortDescription}
                  onChange={handleChange}
                ></textarea>
                <span className="ap-char-count">{formData.shortDescription.length}/160</span>
              </div>
            </div>

            {/* Full Description */}
            <div className="ap-field ap-mt-14">
              <label>Full Description</label>
              <div className="ap-rich-editor">
                <div className="ap-editor-toolbar">
                  <select defaultValue="Paragraph">
                    <option>Paragraph</option>
                    <option>Heading 1</option>
                    <option>Heading 2</option>
                  </select>
                  <div className="ap-toolbar-divider"></div>
                  <button type="button"><b>B</b></button>
                  <button type="button"><i>I</i></button>
                  <button type="button"><u>U</u></button>
                  <button type="button">≡</button>
                  <button type="button">☰</button>
                  <button type="button">🔗</button>
                  <button type="button">🖼️</button>
                  <button type="button">▶️</button>
                </div>
                <textarea
                  name="fullDescription"
                  rows="4"
                  placeholder="Write product description here..."
                  value={formData.fullDescription}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

          </div>

          {/* Product Images Panel */}
          <div className="ap-panel">
            <div className="ap-panel-title">Product Images *</div>
            <div className="ap-images-grid">
              
              {/* Main Image Upload Box */}
              <input 
                type="file" 
                ref={mainFileInputRef} 
                onChange={handleMainImageChange} 
                accept="image/png, image/jpeg, image/webp" 
                style={{ display: 'none' }} 
              />
              <div 
                className="ap-img-upload-box main-upload"
                onClick={() => mainFileInputRef.current.click()}
              >
                {mainImage ? (
                  <div className="ap-uploaded-preview-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <img src={mainImage} alt="Main Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                    <button 
                      type="button" 
                      className="ap-remove-img-btn" 
                      onClick={(e) => handleRemoveMainImage(e)}
                      style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer' }}
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="ap-upload-content">
                    <span className="ap-upload-icon">☁️</span>
                    <strong>Upload Main Image</strong>
                    <p>Drag & drop or click to browse</p>
                    <span className="ap-file-meta">JPG, PNG, WEBP (Max. 5MB)</span>
                  </div>
                )}
              </div>

              {/* Extra Gallery Images Boxes */}
              {extraImages.map((img, idx) => (
                <React.Fragment key={idx}>
                  <input 
                    type="file" 
                    ref={(el) => (extraFileInputRefs.current[idx] = el)} 
                    onChange={(e) => handleExtraImageChange(e, idx)} 
                    accept="image/png, image/jpeg, image/webp" 
                    style={{ display: 'none' }} 
                  />
                  <div 
                    className="ap-img-upload-box"
                    onClick={() => extraFileInputRefs.current[idx].click()}
                  >
                    {img ? (
                      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <img src={img} alt={`Extra ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                        <button 
                          type="button" 
                          onClick={(e) => handleRemoveExtraImage(e, idx)}
                          style={{ position: 'absolute', top: '3px', right: '3px', background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', fontSize: '10px' }}
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="ap-plus-icon">+</span>
                        <span>Add Image</span>
                      </>
                    )}
                  </div>
                </React.Fragment>
              ))}

            </div>
          </div>

          {/* Pricing & Inventory Panel */}
          <div className="ap-panel">
            <div className="ap-panel-title">
              <i className="ap-icon-box">📊</i> Pricing & Inventory
            </div>
            
            <div className="ap-form-grid three-cols">
              <div className="ap-field">
                <label>Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <div className="ap-field">
                <label>Sale Price (₹)</label>
                <input
                  type="number"
                  name="salePrice"
                  placeholder="0.00"
                  value={formData.salePrice}
                  onChange={handleChange}
                />
                <span className="ap-field-hint">Leave empty if no sale</span>
              </div>
              <div className="ap-field">
                <label>Cost Price (₹)</label>
                <input
                  type="number"
                  name="costPrice"
                  placeholder="0.00"
                  value={formData.costPrice}
                  onChange={handleChange}
                />
                <span className="ap-field-hint">For inventory calculation</span>
              </div>
            </div>

            <div className="ap-form-grid two-cols ap-mt-14">
              <div className="ap-field">
                <label>Stock Quantity *</label>
                <input
                  type="number"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                />
              </div>
              <div className="ap-field">
                <label>Low Stock Alert</label>
                <input
                  type="number"
                  name="lowStockAlert"
                  value={formData.lowStockAlert}
                  onChange={handleChange}
                />
                <span className="ap-field-hint">Alert when stock is below this</span>
              </div>
            </div>

            <div className="ap-field ap-mt-14 ap-dropdown-container">
              <label>Unit</label>
              <div 
                className="ap-dropdown-select"
                onClick={() => setActiveDropdown(activeDropdown === 'unit' ? null : 'unit')}
              >
                <span className={formData.unit ? '' : 'ap-placeholder'}>
                  {formData.unit || 'Select Unit'}
                </span>
                <i>▼</i>
              </div>
              {activeDropdown === 'unit' && (
                <div className="ap-dropdown-menu">
                  {['Pieces (pc)', 'Kilograms (kg)', 'Grams (g)', 'Packets', 'Boxes'].map((u) => (
                    <button key={u} type="button" onClick={() => handleSelectOption('unit', u)}>
                      {u}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="ap-checkbox-field ap-mt-14">
              <label className="ap-checkbox-label">
                <input
                  type="checkbox"
                  name="trackInventory"
                  checked={formData.trackInventory}
                  onChange={handleChange}
                />
                <span>Track inventory for this product</span>
              </label>
            </div>

          </div>

        </div>

        {/* ================= COLUMN 2: Status, Settings, Shipping, SEO ================= */}
        <div className="ap-col-middle">
          
          {/* Product Status */}
          <div className="ap-panel">
            <div className="ap-panel-title">Product Status</div>
            <div className="ap-radio-group">
              {[
                { id: 'Active', desc: 'Product will be visible on the website' },
                { id: 'Inactive', desc: 'Product will be hidden from store' },
                { id: 'Draft', desc: 'Save as draft for later' },
              ].map((st) => (
                <label
                  key={st.id}
                  className={`ap-radio-card ${formData.status === st.id ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, status: st.id })}
                >
                  <input
                    type="radio"
                    name="status"
                    checked={formData.status === st.id}
                    onChange={() => {}}
                  />
                  <div>
                    <strong>{st.id}</strong>
                    <p>{st.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Product Settings */}
          <div className="ap-panel">
            <div className="ap-panel-title">Product Settings</div>
            <div className="ap-settings-toggles">
              {[
                { key: 'featuredProduct', title: 'Featured Product', sub: 'Show in featured section', icon: '⭐' },
                { key: 'bestSeller', title: 'Best Seller', sub: 'Mark as best seller', icon: '🔥' },
                { key: 'newArrival', title: 'New Arrival', sub: 'Show as new arrival', icon: '✨' },
                { key: 'allowReviews', title: 'Allow Reviews', sub: 'Allow customers to review', icon: '💬' },
              ].map((item) => (
                <div key={item.key} className="ap-toggle-row">
                  <div className="ap-toggle-info">
                    <span className="ap-setting-icon">{item.icon}</span>
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.sub}</p>
                    </div>
                  </div>
                  <label className="ap-switch">
                    <input
                      type="checkbox"
                      checked={formData[item.key]}
                      onChange={(e) => setFormData({ ...formData, [item.key]: e.target.checked })}
                    />
                    <span className="ap-slider round"></span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping & Delivery */}
          <div className="ap-panel">
            <div className="ap-panel-title">Shipping & Delivery</div>
            
            <div className="ap-field">
              <label>Requires Shipping</label>
              <select
                name="requiresShipping"
                value={formData.requiresShipping}
                onChange={handleChange}
                className="ap-native-select"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="ap-field ap-mt-14">
              <label>Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>

            <div className="ap-field ap-mt-14">
              <label>Dimensions (cm)</label>
              <div className="ap-dim-grid">
                <input
                  type="text"
                  name="length"
                  placeholder="Length"
                  value={formData.length}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="width"
                  placeholder="Width"
                  value={formData.width}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="height"
                  placeholder="Height"
                  value={formData.height}
                  onChange={handleChange}
                />
              </div>
            </div>

          </div>

          {/* SEO Settings */}
          <div className="ap-panel">
            <div className="ap-panel-title">SEO Settings</div>
            
            <div className="ap-field">
              <label>Meta Title</label>
              <div className="ap-textarea-wrap">
                <input
                  type="text"
                  name="metaTitle"
                  maxLength="60"
                  placeholder="Enter meta title (max 60 characters)"
                  value={formData.metaTitle}
                  onChange={handleChange}
                />
                <span className="ap-char-count-inline">{formData.metaTitle.length}/60</span>
              </div>
            </div>

            <div className="ap-field ap-mt-14">
              <label>Meta Description</label>
              <div className="ap-textarea-wrap">
                <textarea
                  name="metaDescription"
                  rows="3"
                  maxLength="160"
                  placeholder="Enter meta description (max 160 characters)"
                  value={formData.metaDescription}
                  onChange={handleChange}
                ></textarea>
                <span className="ap-char-count">{formData.metaDescription.length}/160</span>
              </div>
            </div>

          </div>

        </div>

        {/* ================= COLUMN 3: Live Preview & Tips ================= */}
        <div className="ap-col-right">
          
          {/* Product Preview Card */}
          <div className="ap-panel ap-preview-panel">
            <div className="ap-preview-header">
              <span>Product Preview</span>
              <div className="ap-preview-viewports">
                <button
                  type="button"
                  className={previewMode === 'desktop' ? 'active' : ''}
                  onClick={() => setPreviewMode('desktop')}
                >
                  🖥️
                </button>
                <button
                  type="button"
                  className={previewMode === 'tablet' ? 'active' : ''}
                  onClick={() => setPreviewMode('tablet')}
                >
                  tablet
                </button>
                <button
                  type="button"
                  className={previewMode === 'mobile' ? 'active' : ''}
                  onClick={() => setPreviewMode('mobile')}
                >
                  📱
                </button>
              </div>
            </div>

            <div className={`ap-preview-card-box mode-${previewMode}`}>
              <div className="ap-preview-img-container" style={{ position: 'relative', overflow: 'hidden' }}>
                <span className="ap-preview-discount">-10%</span>
                <span className="ap-preview-fav">♡</span>
                {mainImage ? (
                  <img src={mainImage} alt="Preview Display" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                ) : (
                  <div className="ap-mock-backpack-img">🎒</div>
                )}
              </div>

              <div className="ap-preview-details">
                <h4>{formData.productName || 'School Backpack'}</h4>
                <p className="ap-preview-cat">{formData.subCategory || formData.category || 'Bags'}</p>
                
                <div className="ap-preview-price-row">
                  <div>
                    <span className="ap-current-price">₹{formData.price ? formData.price : '899.00'}</span>
                    <span className="ap-old-price">₹999.00</span>
                  </div>
                  <span className="ap-stock-badge">In Stock</span>
                </div>

                <p className="ap-preview-desc">
                  {formData.shortDescription || 'Durable and comfortable school backpack with multiple compartments. Perfect for daily school use.'}
                </p>

                <div className="ap-preview-tags">
                  <span>✨ Quality Material</span>
                  <span>🛡️ Water Resistant</span>
                  <span>⭐ 1 Year Warranty</span>
                </div>

                <div className="ap-preview-cart-row">
                  <div className="ap-qty-selector">
                    <button type="button">-</button>
                    <span>1</span>
                    <button type="button">+</button>
                  </div>
                  <button type="button" className="ap-preview-add-btn" onClick={() => showToast('Added to cart preview!')}>
                    🛒 Add to Cart
                  </button>
                </div>

                <div className="ap-preview-share">
                  <span>Share:</span>
                  <div className="ap-share-icons">
                    <span>f</span>
                    <span>t</span>
                    <span>w</span>
                    <span>✉</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tips Panel */}
          <div className="ap-panel ap-tips-panel">
            <div className="ap-panel-title">
              <span>💡 Tips</span>
            </div>
            <ul className="ap-tips-list">
              <li>Use high quality images for better sales</li>
              <li>Write clear and detailed product description</li>
              <li>Set appropriate price and stock levels</li>
              <li>Choose correct category for easy search</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AddProduct;