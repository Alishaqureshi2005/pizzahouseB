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
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Apply authentication and authorization middleware to all routes
router.use(protect);
router.use(authorize('admin'));

// Category routes
router
  .route('/categories')
  .get(getCategories)
  .post(createCategory);

router
  .route('/categories/:id')
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

// Product routes
router
  .route('/products')
  .get(getProducts)
  .post(createProduct);

router
  .route('/products/:id')
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router; 