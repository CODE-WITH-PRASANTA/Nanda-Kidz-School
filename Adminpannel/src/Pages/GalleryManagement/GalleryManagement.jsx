import React, { useState, useMemo } from 'react';
import './GalleryManagement.css';

// Standard Feather Icons from react-icons/fi
import { 
  FiExternalLink as IconExternalLink, 
  FiBell as IconBell, 
  FiUploadCloud as IconUploadCloud, 
  FiPlus as IconPlus, 
  FiChevronRight as IconChevronRight, 
  FiEye as IconEye, 
  FiEdit2 as IconEdit2, 
  FiTrash2 as IconTrash2, 
  FiSearch as IconSearch, 
  FiFilter as IconFilter, 
  FiGrid as IconGrid, 
  FiList as IconList, 
  FiChevronLeft as IconChevronLeft,
  FiImage as IconImage,
  FiFolder as IconFolder,
  FiVideo as IconVideo,
  FiFileText as IconFileText,
  FiCheck as IconCheck
} from 'react-icons/fi';

// FontAwesome Icon from react-icons/fa
import { FaLightbulb as IconLightbulb } from 'react-icons/fa';

// Initial Mock Data matching the UI
const initialAlbums = [
  { id: 1, name: 'Annual Day 2025', count: 45, icon: '🎉' },
  { id: 2, name: 'Sports Day 2025', count: 32, icon: '🏃' },
  { id: 3, name: 'Classroom Activities', count: 28, icon: '👨‍🏫' },
  { id: 4, name: 'School Events', count: 22, icon: '🎈' },
  { id: 5, name: 'Art & Craft', count: 18, icon: '🎨' },
  { id: 6, name: 'Science Exhibition', count: 15, icon: '🔬' },
  { id: 7, name: 'Trips & Excursions', count: 12, icon: '🚌' },
  { id: 8, name: 'Graduation Day', count: 10, icon: '⭐' }
];

const initialPhotos = [
  {
    id: 1,
    title: 'Drawing Competition',
    category: 'Classroom Activities',
    date: '28 May 2025',
    status: 'Published',
    type: 'Photo',
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 2,
    title: 'Art & Craft Activity',
    category: 'Classroom Activities',
    date: '27 May 2025',
    status: 'Published',
    type: 'Photo',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 3,
    title: 'Science Experiment',
    category: 'Classroom Activities',
    date: '26 May 2025',
    status: 'Published',
    type: 'Photo',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 4,
    title: 'Group Learning',
    category: 'Classroom Activities',
    date: '25 May 2025',
    status: 'Published',
    type: 'Photo',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 5,
    title: 'Story Time',
    category: 'Classroom Activities',
    date: '24 May 2025',
    status: 'Published',
    type: 'Photo',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 6,
    title: 'Playing & Learning',
    category: 'Classroom Activities',
    date: '23 May 2025',
    status: 'Published',
    type: 'Photo',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 7,
    title: 'Writing Practice',
    category: 'Classroom Activities',
    date: '22 May 2025',
    status: 'Published',
    type: 'Photo',
    image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 8,
    title: 'Student Artwork',
    category: 'Art & Craft',
    date: '21 May 2025',
    status: 'Published',
    type: 'Photo',
    image: 'https://images.unsplash.com/photo-1560421683-6856ea585c78?auto=format&fit=crop&w=500&q=80'
  }
];

const GalleryManagement = () => {
  // State variables
  const [activeTab, setActiveTab] = useState('photo'); // 'photo' or 'video'
  const [albums, setAlbums] = useState(initialAlbums);
  const [selectedAlbum, setSelectedAlbum] = useState('Classroom Activities');
  const [photos, setPhotos] = useState(initialPhotos);
  
  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [albumFilter, setAlbumFilter] = useState('All Albums');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [sortOrder, setSortOrder] = useState('Newest First');
  const [currentPage, setCurrentPage] = useState(1);

  // Modal / Add Album State
  const [isAddingAlbum, setIsAddingAlbum] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState('');

  // File Upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newEntries = files.map((file, idx) => ({
      id: Date.now() + idx,
      title: file.name.split('.')[0] || 'Uploaded Photo',
      category: selectedAlbum || 'Classroom Activities',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Published',
      type: file.type.includes('video') ? 'Video' : 'Photo',
      image: URL.createObjectURL(file)
    }));

    setPhotos(prev => [...newEntries, ...prev]);
  };

  // Add New Album Function
  const handleAddAlbum = () => {
    if (!newAlbumName.trim()) return;
    const newAlbum = {
      id: Date.now(),
      name: newAlbumName.trim(),
      count: 0,
      icon: '📁'
    };
    setAlbums(prev => [...prev, newAlbum]);
    setNewAlbumName('');
    setIsAddingAlbum(false);
  };

  // Delete Photo Function
  const handleDeletePhoto = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setPhotos(prev => prev.filter(photo => photo.id !== id));
    }
  };

  // Edit Photo Title Function
  const handleEditPhoto = (photo) => {
    const newTitle = prompt('Edit title:', photo.title);
    if (newTitle && newTitle.trim()) {
      setPhotos(prev =>
        prev.map(p => (p.id === photo.id ? { ...p, title: newTitle.trim() } : p))
      );
    }
  };

  // Filter and Search Logic
  const filteredPhotos = useMemo(() => {
    return photos.filter(photo => {
      const matchesSearch = photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            photo.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAlbum = albumFilter === 'All Albums' || photo.category === albumFilter;
      const matchesType = typeFilter === 'All Types' || photo.type === typeFilter;
      const matchesTab = activeTab === 'photo' ? photo.type === 'Photo' : photo.type === 'Video';

      return matchesSearch && matchesAlbum && matchesType && matchesTab;
    });
  }, [photos, searchTerm, albumFilter, typeFilter, activeTab]);

  return (
    <div className="GalleryManagement">
      {/* Top Header */}
      <header className="GalleryManagement-header">
        <div className="GalleryManagement-header-left">
          <h1>
            Gallery Management <span className="GalleryManagement-badge-icon">🏫</span>
          </h1>
          <p>Manage photos and videos gallery of your school</p>
        </div>

        <div className="GalleryManagement-header-right">
          <button className="GalleryManagement-visit-btn">
            Visit Website <IconExternalLink className="GalleryManagement-icon-sm" />
          </button>
          
          <div className="GalleryManagement-notification">
            <IconBell />
            <span className="GalleryManagement-notif-badge">5</span>
          </div>

          <div className="GalleryManagement-admin-profile">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
              alt="Admin" 
            />
            <span>Admin</span>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="GalleryManagement-breadcrumb">
        <span>Dashboard</span> &gt; <span className="active">Gallery Management</span>
      </div>

      {/* Stats Cards & Top Tab Navigation */}
      <div className="GalleryManagement-top-row">
        <div className="GalleryManagement-tabs">
          <button 
            className={`GalleryManagement-tab-btn ${activeTab === 'photo' ? 'active' : ''}`}
            onClick={() => setActiveTab('photo')}
          >
            <IconImage /> Photo Gallery
          </button>
          <button 
            className={`GalleryManagement-tab-btn ${activeTab === 'video' ? 'active' : ''}`}
            onClick={() => setActiveTab('video')}
          >
            <IconVideo /> Video Gallery
          </button>
        </div>

        <div className="GalleryManagement-stats-grid">
          <div className="GalleryManagement-stat-card purple">
            <div className="GalleryManagement-stat-icon"><IconImage /></div>
            <div className="GalleryManagement-stat-info">
              <span className="label">Photos</span>
              <h3>256</h3>
              <span className="sub">Total Photos</span>
            </div>
          </div>

          <div className="GalleryManagement-stat-card orange">
            <div className="GalleryManagement-stat-icon"><IconFolder /></div>
            <div className="GalleryManagement-stat-info">
              <span className="label">Albums</span>
              <h3>18</h3>
              <span className="sub">Total Albums</span>
            </div>
          </div>

          <div className="GalleryManagement-stat-card pink">
            <div className="GalleryManagement-stat-icon"><IconVideo /></div>
            <div className="GalleryManagement-stat-info">
              <span className="label">Videos</span>
              <h3>42</h3>
              <span className="sub">Total Videos</span>
            </div>
          </div>

          <div className="GalleryManagement-stat-card blue">
            <div className="GalleryManagement-stat-icon"><IconEye /></div>
            <div className="GalleryManagement-stat-info">
              <span className="label">Total Views</span>
              <h3>18,542</h3>
              <span className="sub">Across Gallery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="GalleryManagement-body-grid">
        {/* Left Sidebar */}
        <aside className="GalleryManagement-sidebar">
          {/* Upload Area */}
          <div className="GalleryManagement-upload-card">
            <div className="GalleryManagement-upload-icon">
              <IconUploadCloud />
            </div>
            <h4>Upload Photos</h4>
            <p>Drag & drop photos here or</p>
            
            <label htmlFor="file-upload" className="GalleryManagement-browse-btn">
              Browse Files
            </label>
            <input 
              id="file-upload" 
              type="file" 
              multiple 
              accept="image/*,video/*" 
              onChange={handleFileUpload} 
              style={{ display: 'none' }} 
            />

            <span className="GalleryManagement-file-note">JPG, PNG, GIF up to 10MB each</span>
          </div>

          {/* Albums List */}
          <div className="GalleryManagement-albums-card">
            <div className="GalleryManagement-albums-header">
              <h3>Albums</h3>
              <button 
                className="GalleryManagement-add-album-btn"
                onClick={() => setIsAddingAlbum(true)}
              >
                <IconPlus /> Add Album
              </button>
            </div>

            {/* Modal/Input to Add Album */}
            {isAddingAlbum && (
              <div className="GalleryManagement-add-album-input">
                <input 
                  type="text" 
                  placeholder="Album name..." 
                  value={newAlbumName}
                  onChange={(e) => setNewAlbumName(e.target.value)}
                />
                <button onClick={handleAddAlbum}>Save</button>
                <button className="cancel" onClick={() => setIsAddingAlbum(false)}>X</button>
              </div>
            )}

            <ul className="GalleryManagement-albums-list">
              {albums.map((album) => (
                <li 
                  key={album.id}
                  className={`GalleryManagement-album-item ${selectedAlbum === album.name ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedAlbum(album.name);
                    setAlbumFilter(album.name);
                  }}
                >
                  <span className="album-title">
                    <span className="icon">{album.icon}</span> {album.name}
                  </span>
                  <span className="album-count">{album.count}</span>
                </li>
              ))}
            </ul>

            <button className="GalleryManagement-view-all-albums">
              View All Albums <IconChevronRight />
            </button>
          </div>
        </aside>

        {/* Main Gallery View */}
        <main className="GalleryManagement-main">
          {/* Filter Bar */}
          <div className="GalleryManagement-filter-bar">
            <div className="GalleryManagement-search-box">
              <IconSearch />
              <input 
                type="text" 
                placeholder="Search photos by title, album..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select 
              value={albumFilter} 
              onChange={(e) => setAlbumFilter(e.target.value)}
              className="GalleryManagement-select"
            >
              <option value="All Albums">All Albums</option>
              {albums.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
            </select>

            <select 
              value={typeFilter} 
              onChange={(e) => setTypeFilter(e.target.value)}
              className="GalleryManagement-select"
            >
              <option value="All Types">All Types</option>
              <option value="Photo">Photos Only</option>
              <option value="Video">Videos Only</option>
            </select>

            <select 
              value={sortOrder} 
              onChange={(e) => setSortOrder(e.target.value)}
              className="GalleryManagement-select"
            >
              <option value="Newest First">Newest First</option>
              <option value="Oldest First">Oldest First</option>
            </select>

            <button className="GalleryManagement-filter-btn">
              <IconFilter /> Filter
            </button>

            <div className="GalleryManagement-view-toggle">
              <button className="active"><IconGrid /></button>
              <button><IconList /></button>
            </div>
          </div>

          {/* Photos Cards Grid */}
          <div className="GalleryManagement-cards-grid">
            {filteredPhotos.map((photo) => (
              <div key={photo.id} className="GalleryManagement-photo-card">
                <div className="GalleryManagement-card-media">
                  <img src={photo.image} alt={photo.title} />
                </div>

                <div className="GalleryManagement-card-body">
                  <h4>{photo.title}</h4>
                  <p className="category">{photo.category}</p>

                  <div className="GalleryManagement-card-footer">
                    <span className="date">{photo.date}</span>
                    <span className="status-badge">{photo.status}</span>
                  </div>

                  <div className="GalleryManagement-card-actions">
                    <button title="View" onClick={() => alert(`Viewing ${photo.title}`)}>
                      <IconEye />
                    </button>
                    <button title="Edit" onClick={() => handleEditPhoto(photo)}>
                      <IconEdit2 />
                    </button>
                    <button title="Delete" onClick={() => handleDeletePhoto(photo.id)}>
                      <IconTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Footer */}
          <div className="GalleryManagement-pagination">
            <span className="showing-text">
              Showing 1 to {filteredPhotos.length} of 256 photos
            </span>

            <div className="GalleryManagement-page-numbers">
              <button className="nav-btn" disabled={currentPage === 1}>
                <IconChevronLeft />
              </button>
              {[1, 2, 3, 4, 5].map((pageNum) => (
                <button 
                  key={pageNum}
                  className={`num-btn ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              ))}
              <span className="dots">...</span>
              <button className="num-btn">22</button>
              <button className="nav-btn"><IconChevronRight /></button>
            </div>
          </div>
        </main>
      </div>

      {/* Bottom Information Row */}
      <div className="GalleryManagement-bottom-row">
        {/* Storage Card */}
        <div className="GalleryManagement-info-card storage">
          <h4>Gallery Storage</h4>
          <div className="storage-details">
            <span>2.45 GB of 10 GB Used</span>
            <span className="percent">24.5%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '24.5%' }}></div>
          </div>
        </div>

        {/* Formats Card */}
        <div className="GalleryManagement-info-card formats">
          <h4>Allowed Formats</h4>
          <ul>
            <li>
              <IconImage /> Images: JPG, PNG, GIF, WEBP
            </li>
            <li>
              <IconVideo /> Videos: MP4, MOV, AVI, WMV
            </li>
          </ul>
        </div>

        {/* Quick Tips Card */}
        <div className="GalleryManagement-info-card tips">
          <h4><IconLightbulb className="tip-icon" /> Quick Tips</h4>
          <ul>
            <li><IconCheck className="check-icon" /> Upload high quality images for best results.</li>
            <li><IconCheck className="check-icon" /> Organize photos in appropriate albums.</li>
            <li><IconCheck className="check-icon" /> Video size should not exceed 100MB.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GalleryManagement;