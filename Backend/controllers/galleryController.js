const { GalleryItem, Album } = require('../models/GalleryItem');

// Get all items & albums
exports.getData = async (req, res) => {
  try {
    const items = await GalleryItem.find().sort({ date: -1 });
    const albums = await Album.find();
    res.status(200).json({ items, albums });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create Item (Photo/Video upload or YouTube)
exports.createItem = async (req, res) => {
  try {
    const { title, type, url, album, size, mediaType } = req.body;
    const newItem = new GalleryItem({ title, type, url, album, size, mediaType });
    await newItem.save();

    // Increment Album Count
    await Album.findOneAndUpdate({ name: album }, { $inc: { count: 1 } });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Item
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await GalleryItem.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Item
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await GalleryItem.findByIdAndDelete(id);
    if (item) {
      await Album.findOneAndUpdate({ name: item.album }, { $inc: { count: -1 } });
    }
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create Album
exports.createAlbum = async (req, res) => {
  try {
    const { name, icon } = req.body;
    const newAlbum = new Album({ name, icon: icon || '📁' });
    await newAlbum.save();
    res.status(201).json(newAlbum);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};