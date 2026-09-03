const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['photo', 'video'], required: true },
  url: { type: String, required: true },
  album: { type: String, required: true },
  size: { type: String, default: '0 MB' },
  mediaType: { type: String, default: 'Images' }, // Images, GIFs, or YouTube
  views: { type: Number, default: 0 },
  date: { type: Date, default: Date.now }
});

const albumSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  icon: { type: String, default: '📁' },
  count: { type: Number, default: 0 }
});

module.exports = {
  GalleryItem: mongoose.model('GalleryItem', galleryItemSchema),
  Album: mongoose.model('Album', albumSchema)
};