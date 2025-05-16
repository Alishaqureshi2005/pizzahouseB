const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

// Public routes
router
  .route('/')
  .get(getCategories);

router
  .route('/:id')
  .get(getCategory);

// Admin routes
router.use(protect);
router.use(authorize('admin'));

router
  .route('/')
  .post(createCategory);

router
  .route('/:id')
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router; 