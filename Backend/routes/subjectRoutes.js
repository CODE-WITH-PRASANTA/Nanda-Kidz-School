const express = require('express');
const router = express.Router();
const {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
  updateSubjectStatus,
} = require('../controllers/subjectController');

router.route('/')
  .get(getSubjects)
  .post(createSubject);

router.route('/:id')
  .put(updateSubject)
  .delete(deleteSubject);

router.patch('/:id/status', updateSubjectStatus);

module.exports = router;