const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');

router.get('/dashboard', schoolController.getDashboardData);
router.put('/:id/status', schoolController.updateSchoolStatus);
router.get('/', schoolController.getAllSchools);
router.post('/', schoolController.createSchool);

// NEW PATH: DELETE /api/superadmin/schools/:id
router.delete('/:id', schoolController.deleteSchool);

module.exports = router;