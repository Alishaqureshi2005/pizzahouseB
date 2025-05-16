const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Public routes
router
  .route('/')
  .get(getProducts);

router
  .route('/:id')
  .get(getProduct);

// Admin routes
router.use(protect);
router.use(authorize('admin'));

router
  .route('/')
  .post(createProduct);

router
  .route('/:id')
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router; 