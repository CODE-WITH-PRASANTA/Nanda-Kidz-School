import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  FiImage, 
  FiVideo, 
  FiFolder, 
  FiEye, 
  FiSearch, 
  FiFilter, 
  FiGrid, 
  FiList, 
  FiPlus, 
  FiUploadCloud, 
  FiChevronLeft, 
  FiChevronRight,
  FiCheckCircle,
  FiPlay,
  FiTrash2,
  FiEdit
} from 'react-icons/fi';
import './GalleryManagement.css';

const GalleryManagement = () => {
  const [activeTab, setActiveTab] = useState('photo');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlbumFilter, setSelectedAlbumFilter] = useState('Annual Day 2025');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('All Types');
  const [sortBy, setSortBy] = useState('Newest First');
  const [viewMode, setViewMode] = useState('grid');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [albums, setAlbums] = useState([]);
  const [items, setItems] = useState([]);

  const [showAllAlbumsModal, setShowAllAlbumsModal] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState('');
  const [isAddAlbumOpen, setIsAddAlbumOpen] = useState(false);

  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [videoTitleInput, setVideoTitleInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitleInput, setEditTitleInput] = useState('');

  const fileInputRef = useRef(null);

  // Fetch Data from Backend API on Load
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/gallery');
      const data = await res.json();
      setItems(data.items || []);
      setAlbums(data.albums || []);
      if (data.albums?.length > 0 && !selectedAlbumFilter) {
        setSelectedAlbumFilter(data.albums[0].name);
      }
    } catch (err) {
      console.error('Failed to fetch gallery data', err);
    }
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  // Add Album Handler
  const handleAddAlbumSubmit = async (e) => {
    e.preventDefault();
    if (!newAlbumName.trim()) return;
    try {
      const res = await fetch('http://localhost:5000/api/gallery/album', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newAlbumName.trim() })
      });
      const newAlbum = await res.json();
      setAlbums([...albums, newAlbum]);
      setNewAlbumName('');
      setIsAddAlbumOpen(false);
    } catch (err) {
      console.error('Error adding album', err);
    }
  };

  // File Upload Handler (Photos & Videos)
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    for (let file of files) {
      const formData = new FormData();
      formData.append('title', file.name);
      formData.append('type', activeTab);
      formData.append('url', URL.createObjectURL(file)); // In production, upload to S3/Cloudinary via backend multer
      formData.append('album', selectedAlbumFilter);
      formData.append('size', (file.size / (1024 * 1024)).toFixed(2) + ' MB');
      formData.append('mediaType', file.type.includes('gif') ? 'GIFs' : 'Images');

      try {
        const res = await fetch('http://localhost:5000/api/gallery/item', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: file.name,
            type: activeTab,
            url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500',
            album: selectedAlbumFilter,
            size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
            mediaType: file.type.includes('gif') ? 'GIFs' : 'Images'
          })
        });
        const savedItem = await res.json();
        setItems(prev => [savedItem, ...prev]);
      } catch (err) {
        console.error('Upload failed', err);
      }
    }
    fetchData(); // Refresh counts
  };

  // Add YouTube Video Handler
  const handleAddVideoUrl = async (e) => {
    e.preventDefault();
    if (!videoUrlInput.trim() || !videoTitleInput.trim()) return;
    
    try {
      const res = await fetch('http://localhost:5000/api/gallery/item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: videoTitleInput,
          type: 'video',
          url: videoUrlInput,
          album: selectedAlbumFilter,
          mediaType: 'YouTube'
        })
      });
      const savedVid = await res.json();
      setItems(prev => [savedVid, ...prev]);
      setVideoUrlInput('');
      setVideoTitleInput('');
      fetchData();
    } catch (err) {
      console.error('Failed to add video', err);
    }
  };

  // Delete Item Handler
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/gallery/item/${id}`, { method: 'DELETE' });
      setItems(items.filter(item => item._id !== id));
      fetchData();
    } catch (err) {
      console.error('Failed to delete item', err);
    }
  };

  // Edit Item Title Handler
  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/gallery/item/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitleInput })
      });
      const updated = await res.json();
      setItems(items.map(item => item._id === id ? updated : item));
      setEditingId(null);
      setEditTitleInput('');
    } catch (err) {
      console.error('Failed to update', err);
    }
  };

  // Filtered & Sorted Data Calculations
  const filteredData = useMemo(() => {
    let data = items.filter(item => item.type === activeTab);

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      data = data.filter(item => 
        item.title.toLowerCase().includes(query) || item.album.toLowerCase().includes(query)
      );
    }

    if (selectedAlbumFilter && selectedAlbumFilter !== 'All Albums') {
      data = data.filter(item => item.album === selectedAlbumFilter);
    }

    if (activeTab === 'photo' && selectedTypeFilter !== 'All Types') {
      data = data.filter(item => item.mediaType === selectedTypeFilter);
    }

    data.sort((a, b) => {
      if (sortBy === 'Newest First') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'Oldest First') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'Most Viewed') return b.views - a.views;
      return 0;
    });

    return data;
  }, [items, activeTab, searchQuery, selectedAlbumFilter, selectedTypeFilter, sortBy]);

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="GalleryManagement">
      <div className="GalleryManagement-header-section">
        <div className="GalleryManagement-tabs">
          <button className={`GalleryManagement-tab-btn ${activeTab === 'photo' ? 'active' : ''}`} onClick={() => { setActiveTab('photo'); setCurrentPage(1); }}>
            <FiImage size={18} /> Photo Gallery
          </button>
          <button className={`GalleryManagement-tab-btn ${activeTab === 'video' ? 'active' : ''}`} onClick={() => { setActiveTab('video'); setCurrentPage(1); }}>
            <FiVideo size={18} /> Video Gallery
          </button>
        </div>

        <div className="GalleryManagement-stats-grid">
          <div className="GalleryManagement-stat-card">
            <div className="GalleryManagement-stat-icon photo-bg"><FiImage size={22} /></div>
            <div className="GalleryManagement-stat-info">
              <span className="GalleryManagement-stat-label">Photos</span>
              <h3 className="GalleryManagement-stat-value">{items.filter(i => i.type === 'photo').length}</h3>
            </div>
          </div>
          <div className="GalleryManagement-stat-card">
            <div className="GalleryManagement-stat-icon album-bg"><FiFolder size={22} /></div>
            <div className="GalleryManagement-stat-info">
              <span className="GalleryManagement-stat-label">Albums</span>
              <h3 className="GalleryManagement-stat-value">{albums.length}</h3>
            </div>
          </div>
          <div className="GalleryManagement-stat-card">
            <div className="GalleryManagement-stat-icon video-bg"><FiVideo size={22} /></div>
            <div className="GalleryManagement-stat-info">
              <span className="GalleryManagement-stat-label">Videos</span>
              <h3 className="GalleryManagement-stat-value">{items.filter(i => i.type === 'video').length}</h3>
            </div>
          </div>
          <div className="GalleryManagement-stat-card">
            <div className="GalleryManagement-stat-icon views-bg"><FiEye size={22} /></div>
            <div className="GalleryManagement-stat-info">
              <span className="GalleryManagement-stat-label">Total Views</span>
              <h3 className="GalleryManagement-stat-value">18,542</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="GalleryManagement-body-grid">
        <div className="GalleryManagement-sidebar-panel">
          <div className="GalleryManagement-upload-box">
            <div className="GalleryManagement-upload-icon-circle"><FiUploadCloud size={24} /></div>
            <h4 className="GalleryManagement-upload-title">{activeTab === 'photo' ? 'Upload Photos' : 'Upload Videos'}</h4>
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} multiple accept={activeTab === 'photo' ? "image/*" : "video/*"} onChange={handleFileChange} />
            <button className="GalleryManagement-browse-btn" onClick={() => fileInputRef.current.click()}>Browse Files</button>
          </div>

          {activeTab === 'video' && (
            <div className="GalleryManagement-youtube-box">
              <h4 className="GalleryManagement-upload-title">Add YouTube Video</h4>
              <form onSubmit={handleAddVideoUrl} className="GalleryManagement-youtube-form">
                <input type="text" placeholder="Video Title" value={videoTitleInput} onChange={(e) => setVideoTitleInput(e.target.value)} className="GalleryManagement-input" />
                <input type="text" placeholder="Paste YouTube URL..." value={videoUrlInput} onChange={(e) => setVideoUrlInput(e.target.value)} className="GalleryManagement-input" />
                <button type="submit" className="GalleryManagement-browse-btn">Add YouTube Video</button>
              </form>
            </div>
          )}

          <div className="GalleryManagement-albums-section">
            <div className="GalleryManagement-albums-header">
              <h3 className="GalleryManagement-albums-heading">Albums</h3>
              <button className="GalleryManagement-add-album-btn" onClick={() => setIsAddAlbumOpen(true)}><FiPlus size={14} /> Add Album</button>
            </div>

            {isAddAlbumOpen && (
              <form onSubmit={handleAddAlbumSubmit} className="GalleryManagement-add-album-form">
                <input type="text" placeholder="Album Name..." value={newAlbumName} onChange={(e) => setNewAlbumName(e.target.value)} className="GalleryManagement-input" autoFocus />
                <div className="GalleryManagement-form-actions">
                  <button type="submit" className="GalleryManagement-save-btn">Save</button>
                  <button type="button" className="GalleryManagement-cancel-btn" onClick={() => setIsAddAlbumOpen(false)}>Cancel</button>
                </div>
              </form>
            )}

            <div className="GalleryManagement-albums-list">
              {albums.map((album) => (
                <div key={album._id || album.id} className={`GalleryManagement-album-item ${selectedAlbumFilter === album.name ? 'active' : ''}`} onClick={() => { setSelectedAlbumFilter(album.name); setCurrentPage(1); }}>
                  <span className="GalleryManagement-album-name">{album.icon} {album.name}</span>
                  <span className="GalleryManagement-album-count">{album.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="GalleryManagement-workspace">
          <div className="GalleryManagement-filters-bar">
            <div className="GalleryManagement-search-wrapper">
              <FiSearch className="GalleryManagement-search-icon" size={16} />
              <input type="text" placeholder="Search by title, album..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="GalleryManagement-search-input" />
            </div>

            <div className="GalleryManagement-dropdowns-group">
              <select value={selectedAlbumFilter} onChange={(e) => { setSelectedAlbumFilter(e.target.value); setCurrentPage(1); }} className="GalleryManagement-select">
                {albums.map(a => <option key={a._id || a.id} value={a.name}>{a.name}</option>)}
              </select>

              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="GalleryManagement-select">
                <option>Newest First</option>
                <option>Oldest First</option>
                <option>Most Viewed</option>
              </select>

              <div className="GalleryManagement-view-toggle">
                <button className={`GalleryManagement-view-icon-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}><FiGrid size={16} /></button>
                <button className={`GalleryManagement-view-icon-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}><FiList size={16} /></button>
              </div>
            </div>
          </div>

          <div className="GalleryManagement-results-info">
            <span>Showing {totalItems === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} items</span>
          </div>

          <div className="GalleryManagement-media-container">
            <div className={`GalleryManagement-media-grid ${viewMode}`}>
              {currentItems.map(item => {
                const embedUrl = item.type === 'video' ? getYouTubeEmbedUrl(item.url) : null;
                return (
                  <div key={item._id} className="GalleryManagement-media-card">
                    {item.type === 'photo' ? (
                      <img src={item.url} alt={item.title} className="GalleryManagement-media-img" />
                    ) : embedUrl ? (
                      <div className="GalleryManagement-iframe-wrapper">
                        <iframe src={embedUrl} title={item.title} frameBorder="0" allowFullScreen></iframe>
                      </div>
                    ) : (
                      <div className="GalleryManagement-video-placeholder"><FiPlay size={32} color="#fff" /></div>
                    )}
                    <div className="GalleryManagement-media-details">
                      {editingId === item._id ? (
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <input type="text" value={editTitleInput} onChange={(e) => setEditTitleInput(e.target.value)} className="GalleryManagement-input" />
                          <button onClick={() => handleUpdate(item._id)} className="GalleryManagement-save-btn">Save</button>
                        </div>
                      ) : (
                        <span className="GalleryManagement-media-title">{item.title}</span>
                      )}
                      <span className="GalleryManagement-media-sub">Album: {item.album}</span>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                        <FiEdit size={14} style={{ cursor: 'pointer', color: '#4F46E5' }} onClick={() => { setEditingId(item._id); setEditTitleInput(item.title); }} />
                        <FiTrash2 size={14} style={{ cursor: 'pointer', color: '#EF4444' }} onClick={() => handleDelete(item._id)} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryManagement;