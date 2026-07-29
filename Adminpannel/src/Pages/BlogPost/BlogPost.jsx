import React, { useState, useRef } from 'react';
import './BlogPost.css';
import {
  Save,
  Eye,
  Send,
  Calendar as CalendarIcon,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
  Link,
  Image as ImageIcon,
  Code,
  Undo,
  Redo,
  Upload,
  Heart,
  MessageSquare,
  Share2,
  Monitor,
  Tablet,
  Smartphone,
  ChevronDown,
  X
} from 'lucide-react';

const BlogPost = () => {
  // Device View State
  const [deviceView, setDeviceView] = useState('desktop');

  // Form & Live Preview State
  const [blogTitle, setBlogTitle] = useState('Why Early Education is Important for Kids');
  const [blogSlug, setBlogSlug] = useState('why-early-education-is-important-for-kids');
  const [category, setCategory] = useState('Education');
  const [author, setAuthor] = useState('Admin User');
  const [status, setStatus] = useState('Publish');

  // Calendar Date & Time State
  const [publishDate, setPublishDate] = useState('2025-05-29');
  const [publishTime, setPublishTime] = useState('10:30');

  // Tags State
  const [tags, setTags] = useState(['education', 'kids', 'learning', 'earlyeducation']);
  const [tagInput, setTagInput] = useState('');

  // Featured Image State
  const [featuredImage, setFeaturedImage] = useState(
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80'
  );

  // Content Text Editor Ref & State
  const editorRef = useRef(null);
  const [contentHTML, setContentHTML] = useState(
    'Early education lays the foundation for a child\'s future success. It helps in the overall development of cognitive skills, social behavior, and emotional well-being.<br/><br/>At our school, we focus on providing a safe, fun, and engaging environment where every child can grow and shine.'
  );

  // Likes Counter
  const [likesCount, setLikesCount] = useState(12);
  const [isLiked, setIsLiked] = useState(false);

  // TEXT EDITOR FORMAT COMMAND HANDLER
  const executeCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setContentHTML(editorRef.current.innerHTML);
    }
  };

  const handleEditorInput = () => {
    if (editorRef.current) {
      setContentHTML(editorRef.current.innerHTML);
    }
  };

  // Tags Handler
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim().toLowerCase())) {
        setTags([...tags, tagInput.trim().toLowerCase()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Featured Image Upload Handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFeaturedImage(imageUrl);
    }
  };

  // Auto Generate Slug
  const handleTitleChange = (e) => {
    const val = e.target.value;
    setBlogTitle(val);
    setBlogSlug(
      val
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
    );
  };

  const handleSaveDraft = () => {
    alert('ड्राफ्ट सफलतापूर्वक सेव कर लिया गया!');
  };

  const handlePublish = () => {
    alert(`ब्लॉग सफलतापूर्वक ${status === 'Scheduled' ? 'शेड्यूल' : 'पब्लिश'} हो गया!`);
  };

  return (
    <div className="blog-create-container">
      {/* Top Header Bar */}
      <div className="top-action-header">
        <div className="breadcrumb-path">
          Dashboard &nbsp;&gt;&nbsp; Blog Management &nbsp;&gt;&nbsp; <span>Add New Blog</span>
        </div>
        <div className="top-buttons-group">
          <button className="btn-secondary" onClick={handleSaveDraft}>
            <Save size={15} /> Save as Draft
          </button>
          <button className="btn-secondary">
            <Eye size={15} /> Preview
          </button>
          <button className="btn-primary" onClick={handlePublish}>
            <Send size={15} /> Publish Blog
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="blog-grid-layout">
        {/* Left Form Column */}
        <div className="left-form-column">
          <div className="form-section-card">
            <h2 className="section-heading">Blog Information</h2>

            {/* Title */}
            <div className="form-group">
              <label>
                Blog Title <span className="req">*</span>
                <span className="char-count">{blogTitle.length}/100</span>
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter an attractive title for your blog..."
                value={blogTitle}
                onChange={handleTitleChange}
                maxLength={100}
              />
            </div>

            {/* Slug & Category */}
            <div className="form-row">
              <div className="form-group">
                <label>Slug (URL) <span className="req">*</span></label>
                <div className="slug-input-wrapper">
                  <span className="slug-prefix">https://yourschool.com/blog/</span>
                  <input
                    type="text"
                    value={blogSlug}
                    onChange={(e) => setBlogSlug(e.target.value)}
                  />
                </div>
                <span className="input-helper-text">Use lowercase letters, numbers and hyphens only.</span>
              </div>

              <div className="form-group">
                <label>Category <span className="req">*</span></label>
                <select
                  className="select-field"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Education">Education</option>
                  <option value="Activities">Activities</option>
                  <option value="Development">Development</option>
                  <option value="Events">Events</option>
                </select>
              </div>
            </div>

            {/* Image & Tags */}
            <div className="form-row">
              <div className="form-group">
                <label>Featured Image <span className="req">*</span></label>
                <label className="upload-drop-zone">
                  <div className="upload-icon-box">
                    <Upload size={20} />
                  </div>
                  <span className="upload-title">Click to upload or drag & drop</span>
                  <span className="upload-subtitle">Recommended size: 1200x628px (16:9)</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                </label>
              </div>

              <div className="form-group">
                <label>Tags</label>
                <div className="tags-input-container">
                  {tags.map((tag, i) => (
                    <span key={i} className="tag-badge">
                      #{tag}
                      <button type="button" onClick={() => removeTag(tag)}><X size={12} /></button>
                    </span>
                  ))}
                  <input
                    type="text"
                    className="tag-input-text"
                    placeholder="Add tags (e.g. education, kids)"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                  />
                </div>
                <span className="input-helper-text">Press Enter to add multiple tags</span>
              </div>
            </div>

            {/* FULLY FUNCTIONAL RICH TEXT EDITOR */}
            <div className="form-group">
              <label>Content <span className="req">*</span></label>
              <div className="editor-box">
                <div className="editor-toolbar">
                  <select
                    className="select-field"
                    style={{ padding: '4px 8px', fontSize: '12px' }}
                    onChange={(e) => executeCommand('formatBlock', e.target.value)}
                  >
                    <option value="p">Paragraph</option>
                    <option value="h1">Heading 1</option>
                    <option value="h2">Heading 2</option>
                    <option value="h3">Heading 3</option>
                  </select>
                  <button type="button" className="toolbar-btn" onClick={() => executeCommand('bold')} title="Bold"><Bold size={14} /></button>
                  <button type="button" className="toolbar-btn" onClick={() => executeCommand('italic')} title="Italic"><Italic size={14} /></button>
                  <button type="button" className="toolbar-btn" onClick={() => executeCommand('underline')} title="Underline"><Underline size={14} /></button>
                  <button type="button" className="toolbar-btn" onClick={() => executeCommand('strikeThrough')} title="Strikethrough"><Strikethrough size={14} /></button>
                  <button type="button" className="toolbar-btn" onClick={() => executeCommand('insertUnorderedList')} title="Bullet List"><List size={14} /></button>
                  <button type="button" className="toolbar-btn" onClick={() => executeCommand('insertOrderedList')} title="Numbered List"><ListOrdered size={14} /></button>
                  <button type="button" className="toolbar-btn" onClick={() => executeCommand('justifyLeft')} title="Align Left"><AlignLeft size={14} /></button>
                  <button type="button" className="toolbar-btn" onClick={() => executeCommand('justifyCenter')} title="Align Center"><AlignCenter size={14} /></button>
                  <button type="button" className="toolbar-btn" onClick={() => executeCommand('justifyRight')} title="Align Right"><AlignRight size={14} /></button>
                  <button type="button" className="toolbar-btn" onClick={() => executeCommand('formatBlock', 'blockquote')} title="Quote"><Quote size={14} /></button>
                  <button type="button" className="toolbar-btn" onClick={() => executeCommand('undo')} title="Undo"><Undo size={14} /></button>
                  <button type="button" className="toolbar-btn" onClick={() => executeCommand('redo')} title="Redo"><Redo size={14} /></button>
                </div>

                <div
                  ref={editorRef}
                  className="editor-content-editable"
                  contentEditable
                  suppressContentEditableWarning
                  onInput={handleEditorInput}
                  dangerouslySetInnerHTML={{ __html: contentHTML }}
                />

                <div className="editor-footer">
                  <span>Characters: {contentHTML.replace(/<[^>]*>/g, '').length}</span>
                  <span>POWERED BY TINY</span>
                </div>
              </div>
            </div>

            {/* SEO Settings */}
            <div className="accordion-bar" style={{ borderTop: 'none', marginTop: '16px' }}>
              <span>SEO Settings</span>
              <ChevronDown size={16} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Meta Title</label>
                <input type="text" className="input-field" placeholder="Enter meta title (max 60 characters)" />
              </div>
              <div className="form-group">
                <label>Meta Description</label>
                <input type="text" className="input-field" placeholder="Enter meta description (max 160 characters)" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Preview & Publish Settings */}
        <div className="right-preview-column">
          {/* Live Preview Box */}
          <div className="form-section-card">
            <div className="section-heading">
              <span>Live Preview</span>
              <div className="device-switcher">
                <button
                  className={`device-btn ${deviceView === 'desktop' ? 'active' : ''}`}
                  onClick={() => setDeviceView('desktop')}
                >
                  <Monitor size={14} />
                </button>
                <button
                  className={`device-btn ${deviceView === 'tablet' ? 'active' : ''}`}
                  onClick={() => setDeviceView('tablet')}
                >
                  <Tablet size={14} />
                </button>
                <button
                  className={`device-btn ${deviceView === 'mobile' ? 'active' : ''}`}
                  onClick={() => setDeviceView('mobile')}
                >
                  <Smartphone size={14} />
                </button>
              </div>
            </div>

            <div className={`preview-card-wrapper view-${deviceView}`}>
              <div className="preview-blog-container">
                <div>
                  <span className="preview-category-badge">{category}</span>
                  <span className="preview-read-time">• 5 min read</span>
                  <span className="preview-date-top">
                    <CalendarIcon size={12} /> {new Date(publishDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </div>

                <h3 className="preview-blog-title">{blogTitle || 'Blog Title Preview'}</h3>

                <div className="preview-author-row">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Author"
                    className="preview-author-avatar"
                  />
                  <span>By {author}</span>
                </div>

                {featuredImage && (
                  <img src={featuredImage} alt="Featured Preview" className="preview-featured-img" />
                )}

                <div
                  className="preview-blog-body"
                  dangerouslySetInnerHTML={{ __html: contentHTML }}
                />

                <div className="preview-tags-row">
                  {tags.map((t, idx) => (
                    <span key={idx} className="preview-tag-item">#{t}</span>
                  ))}
                </div>

                <div className="preview-actions-bar">
                  <div
                    className="action-item"
                    onClick={() => {
                      setIsLiked(!isLiked);
                      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
                    }}
                  >
                    <Heart size={14} fill={isLiked ? '#7c3aed' : 'none'} color={isLiked ? '#7c3aed' : '#64748b'} />
                    <span>{likesCount}</span>
                  </div>
                  <div className="action-item">
                    <MessageSquare size={14} />
                    <span>3</span>
                  </div>
                  <div className="action-item" style={{ marginLeft: 'auto' }}>
                    <Share2 size={14} />
                    <span>Share</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Publish Settings Box */}
          <div className="form-section-card">
            <h2 className="section-heading" style={{ fontSize: '16px' }}>Publish Settings</h2>

            <div className="form-group">
              <label>Status</label>
              <div className="radio-options-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="status"
                    checked={status === 'Draft'}
                    onChange={() => setStatus('Draft')}
                  />
                  Draft
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="status"
                    checked={status === 'Publish'}
                    onChange={() => setStatus('Publish')}
                  />
                  Publish
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="status"
                    checked={status === 'Scheduled'}
                    onChange={() => setStatus('Scheduled')}
                  />
                  Scheduled
                </label>
              </div>
            </div>

            {/* Calendar & Time Picker */}
            <div className="form-group">
              <label>Publish Date & Time</label>
              <div className="date-time-row">
                <input
                  type="date"
                  className="date-picker-input"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                />
                <input
                  type="time"
                  className="time-picker-input"
                  value={publishTime}
                  onChange={(e) => setPublishTime(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Author</label>
              <select
                className="select-field"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              >
                <option value="Admin User">Admin User</option>
                <option value="John Doe">John Doe</option>
                <option value="Jane Smith">Jane Smith</option>
              </select>
            </div>

            <div className="accordion-bar">
              <span>Social Media Preview</span>
              <ChevronDown size={16} />
            </div>

            <div className="accordion-bar">
              <span>Advanced Options</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;