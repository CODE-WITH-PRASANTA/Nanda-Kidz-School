const express = require('express');
const router = express.Router();
const { 
  getSubjects, 
  createSubject, 
  updateSubject, 
  updateSubjectStatus, 
  deleteSubject 
} = require('../controllers/subjectController');

router.get('/', getSubjects);
router.post('/', createSubject);
router.put('/:id', updateSubject);
router.patch('/:id/status', updateSubjectStatus);
router.delete('/:id', deleteSubject);

module.exports = router;