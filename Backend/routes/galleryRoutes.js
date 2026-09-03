const express = require('express');
const router = express.Router();
const { getData, createItem, updateItem, deleteItem, createAlbum } = require('../controllers/galleryController');

router.get('/', getData);
router.item = router.post('/item', createItem);
router.put('/item/:id', updateItem);
router.delete('/item/:id', deleteItem);
router.post('/album', createAlbum);

module.exports = router;