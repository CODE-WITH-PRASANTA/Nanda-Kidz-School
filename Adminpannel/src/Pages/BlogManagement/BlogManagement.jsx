import React, { useState } from 'react';
import './BlogManagement.css';
import {
  FileText,
  CheckCircle,
  Clock,
  Folder,
  Search,
  Filter,
  Plus,
  Eye,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Link,
  Image as ImageIcon,
  Code,
  Maximize2,
  Upload,
  X,
  Lightbulb
} from 'lucide-react';

const BlogManagement = () => {
  // Initial Mock Data for Blogs
  const initialBlogs = [
    {
      id: 1,
      title: 'Importance of Early Education for Kids',
      snippet: 'Early education plays a vital role...',
      category: 'Education',
      author: 'Admin User',
      authorImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      status: 'Published',
      date: '28 Jul 2025',
      time: '10:30 AM',
      thumb: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&auto=format&fit=crop&q=80',
      content: 'Early education plays a vital role in a child\'s overall development. It helps children develop social skills, creativity, and a love for learning.'
    },
    {
      id: 2,
      title: 'Fun Learning Activities for Nursery Kids',
      snippet: 'Play-based learning helps children...',
      category: 'Activities',
      author: 'Admin User',
      authorImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      status: 'Published',
      date: '26 Jul 2025',
      time: '09:15 AM',
      thumb: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&auto=format&fit=crop&q=80',
      content: 'Play-based learning helps children explore new concepts through interactive activities.'
    },
    {
      id: 3,
      title: 'How to Build Confidence in Children',
      snippet: 'Building confidence in children is...',
      category: 'Development',
      author: 'Admin User',
      authorImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      status: 'Published',
      date: '24 Jul 2025',
      time: '11:45 AM',
      thumb: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=300&auto=format&fit=crop&q=80',
      content: 'Building confidence in children requires continuous encouraging actions from parents and teachers.'
    },
    {
      id: 4,
      title: 'Annual Sports Day 2025 Highlights',
      snippet: 'Our Annual Sports Day was filled...',
      category: 'Events',
      author: 'Admin User',
      authorImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      status: 'Draft',
      date: '22 Jul 2025',
      time: '03:20 PM',
      thumb: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=300&auto=format&fit=crop&q=80',
      content: 'Our Annual Sports Day was filled with grand celebrations, race contests, and energetic physical events.'
    },
    {
      id: 5,
      title: 'Benefits of Story Reading for Kids',
      snippet: 'Reading stories improves imagination...',
      category: 'Education',
      author: 'Admin User',
      authorImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      status: 'Published',
      date: '20 Jul 2025',
      time: '08:40 AM',
      thumb: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&auto=format&fit=crop&q=80',
      content: 'Reading stories improves imagination and vocabulary skills in early childhood.'
    }
  ];

  // Dynamic Categories State
  const [categories, setCategories] = useState([
    { id: 1, name: 'Education', count: 12, bg: '#f3e8ff', color: '#7c3aed' },
    { id: 2, name: 'Activities', count: 8, bg: '#dcfce7', color: '#15803d' },
    { id: 3, name: 'Development', count: 7, bg: '#fef3c7', color: '#b45309' },
    { id: 4, name: 'Events', count: 6, bg: '#dbeafe', color: '#1d4ed8' },
    { id: 5, name: 'School News', count: 5, bg: '#e0f2fe', color: '#0369a1' },
    { id: 6, name: 'Parenting Tips', count: 4, bg: '#fae8ff', color: '#a21caf' }
  ]);

  // Component States
  const [blogs, setBlogs] = useState(initialBlogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [currentPage, setCurrentPage] = useState(1);

  // Add Category Modal States
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Form State
  const [editingId, setEditingId] = useState(1);
  const [formTitle, setFormTitle] = useState('Importance of Early Education for Kids');
  const [formCategory, setFormCategory] = useState('Education');
  const [formStatus, setFormStatus] = useState('Published');
  const [formContent, setFormContent] = useState(
    'Early education plays a vital role in a child\'s overall development. It helps children develop social skills, creativity, and a love for learning.\n\nAt our school, we focus on providing a safe, fun, and engaging environment where every child can grow and shine.'
  );
  const [formImage, setFormImage] = useState('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&auto=format&fit=crop&q=80');

  // Filter Blogs
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All Categories' || blog.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // Action: Add New Category
  const handleAddCategorySubmit = (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    const colorPairs = [
      { bg: '#f3e8ff', color: '#7c3aed' },
      { bg: '#dcfce7', color: '#15803d' },
      { bg: '#fef3c7', color: '#b45309' },
      { bg: '#dbeafe', color: '#1d4ed8' },
      { bg: '#ffe4e6', color: '#be123c' },
      { bg: '#e0f2fe', color: '#0369a1' }
    ];
    const randomColor = colorPairs[Math.floor(Math.random() * colorPairs.length)];

    const newCatObj = {
      id: Date.now(),
      name: newCategoryName.trim(),
      count: 0,
      bg: randomColor.bg,
      color: randomColor.color
    };

    setCategories([...categories, newCatObj]);
    setNewCategoryName('');
    setIsCategoryModalOpen(false);
    alert('नई कैटेगरी सफलता से जुड़ गई है!');
  };

  // Action Handlers
  const handleDelete = (id) => {
    if (window.confirm('क्या आप इस ब्लॉग को हटाना चाहते हैं?')) {
      setBlogs(blogs.filter((b) => b.id !== id));
    }
  };

  const handleView = (blog) => {
    alert(`शीर्षक: ${blog.title}\nकैटेगरी: ${blog.category}\nविवरण: ${blog.content}`);
  };

  const handleEdit = (blog) => {
    setEditingId(blog.id);
    setFormTitle(blog.title);
    setFormCategory(blog.category);
    setFormStatus(blog.status);
    setFormContent(blog.content);
    setFormImage(blog.thumb);
  };

  const handleSaveBlog = (e) => {
    e.preventDefault();
    if (editingId) {
      setBlogs(
        blogs.map((b) =>
          b.id === editingId
            ? {
                ...b,
                title: formTitle,
                category: formCategory,
                status: formStatus,
                content: formContent,
                thumb: formImage
              }
            : b
        )
      );
      alert('ब्लॉग सफलतापूर्वक अपडेट हो गया!');
    } else {
      const newBlog = {
        id: Date.now(),
        title: formTitle,
        snippet: formContent.substring(0, 30) + '...',
        category: formCategory,
        author: 'Admin User',
        authorImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        status: formStatus,
        date: 'Today',
        time: 'Just now',
        thumb: formImage,
        content: formContent
      };
      setBlogs([newBlog, ...blogs]);
      alert('नया ब्लॉग सफलतापूर्वक जोड़ा गया!');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormImage(imageUrl);
    }
  };

  const handleAddNewClick = () => {
    setEditingId(null);
    setFormTitle('');
    setFormCategory('Education');
    setFormStatus('Published');
    setFormContent('');
    setFormImage('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&auto=format&fit=crop&q=80');
  };

  return (
    <div className="blog-management-container">
      {/* Header */}
      <div className="breadcrumb-header">
        Dashboard &nbsp;&gt;&nbsp; <span>Blog Management</span>
      </div>

      {/* Top Stats */}
      <div className="stats-grid">
        <div className="stat-card card-purple-bg">
          <div className="stat-icon-bg"><FileText size={22} /></div>
          <div className="stat-info">
            <p>Total Blogs</p>
            <h3>42</h3>
            <span className="stat-subtext">↑ 8 this month</span>
          </div>
        </div>

        <div className="stat-card card-green-bg">
          <div className="stat-icon-bg"><CheckCircle size={22} /></div>
          <div className="stat-info">
            <p>Published</p>
            <h3>36</h3>
            <span className="stat-subtext" style={{ color: '#64748b' }}>85.7% of total</span>
          </div>
        </div>

        <div className="stat-card card-yellow-bg">
          <div className="stat-icon-bg"><Clock size={22} /></div>
          <div className="stat-info">
            <p>Drafts</p>
            <h3>4</h3>
            <span className="stat-subtext" style={{ color: '#64748b' }}>9.5% of total</span>
          </div>
        </div>

        <div className="stat-card card-pink-bg">
          <div className="stat-icon-bg"><Folder size={22} /></div>
          <div className="stat-info">
            <p>Categories</p>
            <h3>{categories.length}</h3>
            <span className="stat-subtext" style={{ color: '#64748b' }}>Active categories</span>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="main-layout-grid">
        <div className="left-column">
          {/* All Blogs Table */}
          <div className="section-card">
            <div className="table-header-controls">
              <h2 className="table-title">All Blogs</h2>
              <div className="filter-actions-group">
                <select
                  className="category-dropdown"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option>All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>

                <div className="search-input-box">
                  <Search className="search-icon-pos" size={16} />
                  <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <button className="btn-filter">
                  <Filter size={14} /> Filter
                </button>

                <button className="btn-add-new" onClick={handleAddNewClick}>
                  <Plus size={16} /> Add New Blog
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="table-responsive">
              <table className="blogs-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Author</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog, idx) => (
                      <tr key={blog.id}>
                        <td>{idx + 1}</td>
                        <td>
                          <div className="blog-title-cell">
                            <img src={blog.thumb} alt="thumb" className="blog-thumb-img" />
                            <div>
                              <div className="blog-title-text">{blog.title}</div>
                              <div className="blog-snippet-text">{blog.snippet}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="badge-category badge-dynamic">
                            {blog.category}
                          </span>
                        </td>
                        <td>
                          <div className="author-cell">
                            <img src={blog.authorImg} alt="author" className="author-avatar" />
                            {blog.author}
                          </div>
                        </td>
                        <td>
                          <span className={`badge-status status-${blog.status.toLowerCase()}`}>
                            {blog.status}
                          </span>
                        </td>
                        <td>
                          <div className="date-cell">
                            {blog.date}
                            <span>{blog.time}</span>
                          </div>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="action-btn btn-view" title="View" onClick={() => handleView(blog)}>
                              <Eye size={18} />
                            </button>
                            <button className="action-btn btn-edit" title="Edit" onClick={() => handleEdit(blog)}>
                              <Edit2 size={18} />
                            </button>
                            <button className="action-btn btn-delete" title="Delete" onClick={() => handleDelete(blog.id)}>
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>
                        कोई ब्लॉग नहीं मिला!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="pagination-container">
              <div>Showing 1 to {filteredBlogs.length} of 42 entries</div>
              <div className="pagination-controls">
                <button
                  className="page-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <ChevronLeft size={16} />
                </button>
                <button className={`page-btn ${currentPage === 1 ? 'active' : ''}`} onClick={() => setCurrentPage(1)}>1</button>
                <button className={`page-btn ${currentPage === 2 ? 'active' : ''}`} onClick={() => setCurrentPage(2)}>2</button>
                <button className={`page-btn ${currentPage === 3 ? 'active' : ''}`} onClick={() => setCurrentPage(3)}>3</button>
                <button className={`page-btn ${currentPage === 4 ? 'active' : ''}`} onClick={() => setCurrentPage(4)}>4</button>
                <button className={`page-btn ${currentPage === 5 ? 'active' : ''}`} onClick={() => setCurrentPage(5)}>5</button>
                <span style={{ margin: '0 4px', color: '#94a3b8' }}>...</span>
                <button className="page-btn" onClick={() => setCurrentPage(9)}>9</button>
                <button className="page-btn" onClick={() => setCurrentPage(currentPage + 1)}>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="section-card">
            <h2 className="table-title" style={{ marginBottom: '16px' }}>
              {editingId ? 'Add / Edit Blog' : 'Add New Blog'}
            </h2>

            <form onSubmit={handleSaveBlog}>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Blog Title <span>*</span></label>
                  <input
                    type="text"
                    className="form-input"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category <span>*</span></label>
                  <select
                    className="form-select"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Status <span>*</span></label>
                  <select
                    className="form-select"
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value)}
                  >
                    <option>Published</option>
                    <option>Draft</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label>Content <span>*</span></label>
                  <div className="editor-container">
                    <div className="editor-toolbar">
                      <select className="form-select" style={{ padding: '4px 8px', fontSize: '12px' }}>
                        <option>Paragraph</option>
                        <option>Heading 1</option>
                        <option>Heading 2</option>
                      </select>
                      <button type="button" className="toolbar-btn"><Bold size={14} /></button>
                      <button type="button" className="toolbar-btn"><Italic size={14} /></button>
                      <button type="button" className="toolbar-btn"><Underline size={14} /></button>
                      <button type="button" className="toolbar-btn"><List size={14} /></button>
                      <button type="button" className="toolbar-btn"><ListOrdered size={14} /></button>
                      <button type="button" className="toolbar-btn"><Quote size={14} /></button>
                      <button type="button" className="toolbar-btn"><Link size={14} /></button>
                      <button type="button" className="toolbar-btn"><ImageIcon size={14} /></button>
                      <button type="button" className="toolbar-btn"><Code size={14} /></button>
                      <button type="button" className="toolbar-btn"><Maximize2 size={14} /></button>
                    </div>
                    <textarea
                      className="editor-textarea"
                      value={formContent}
                      onChange={(e) => setFormContent(e.target.value)}
                      required
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="form-action-buttons">
                <button type="button" className="btn-cancel" onClick={handleAddNewClick}>Cancel</button>
                <button type="submit" className="btn-submit">Update Blog</button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="right-column">
          <div className="section-card">
            <div className="sidebar-header">
              <h2 className="table-title" style={{ fontSize: '16px' }}>Blog Categories</h2>
              <button
                className="btn-add-new"
                style={{ padding: '4px 8px', fontSize: '11px' }}
                onClick={() => setIsCategoryModalOpen(true)}
              >
                <Plus size={12} /> Add Category
              </button>
            </div>

            <div className="category-list">
              {categories.map((cat) => (
                <div key={cat.id} className="category-item">
                  <div className="cat-left">
                    <div className="cat-icon-box" style={{ backgroundColor: cat.bg, color: cat.color }}>
                      <Folder size={16} />
                    </div>
                    <span>{cat.name}</span>
                  </div>
                  <span className="cat-badge-count">{cat.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="section-card">
            <div className="quick-tips-box">
              <div className="quick-tips-title">
                <Lightbulb size={18} color="#f59e0b" /> Quick Tips
              </div>
              <ul className="tips-list">
                <li>Use attractive images to make your blog more engaging.</li>
                <li>Add relevant categories to help users find your blog easily.</li>
                <li>Keep your content short, simple, and useful for parents.</li>
                <li>Publish regularly to keep your website active.</li>
              </ul>
            </div>
          </div>

          <div className="section-card">
            <h2 className="table-title" style={{ fontSize: '16px', marginBottom: '12px' }}>
              Blog Thumbnail
            </h2>

            <div className="thumbnail-box">
              <img src={formImage} alt="Thumbnail Preview" className="thumbnail-preview-img" />
              <button
                type="button"
                onClick={() => setFormImage('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&auto=format&fit=crop&q=80')}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  padding: '4px',
                  cursor: 'pointer'
                }}
              >
                <X size={14} />
              </button>
            </div>

            <label className="btn-upload-img">
              <Upload size={16} /> Change Image
              <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            </label>
          </div>
        </div>
      </div>

      {/* Add Category Modal Popup */}
      {isCategoryModalOpen && (
        <div className="modal-overlay" onClick={() => setIsCategoryModalOpen(false)}>
          <div className="category-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Category</h3>
              <button className="close-btn" onClick={() => setIsCategoryModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddCategorySubmit}>
              <div className="form-group" style={{ margin: '16px 0' }}>
                <label>Category Name <span>*</span></label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Sports, Art & Craft"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="form-action-buttons">
                <button type="button" className="btn-cancel" onClick={() => setIsCategoryModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;