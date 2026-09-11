const express = require('express');
const router = express.Router();
const {
  getInquiries,
  createInquiry,
  updateInquiry,
  deleteInquiry
} = require('../controllers/inquiryController');

router.get('/', getInquiries);
router.post('/', createInquiry);
router.put('/:sr', updateInquiry);
router.delete('/:sr', deleteInquiry);

module.exports = router;
