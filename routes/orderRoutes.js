const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  createOrder,
  getUserOrders,
  getOrder,
  updateOrderStatus,
  getAllOrders
} = require('../controllers/orderController');

// All routes are protected
router.use(protect);

// User routes
router
  .route('/')
  .get(getUserOrders)
  .post(createOrder);

router
  .route('/:id')
  .get(getOrder);

// Admin routes
router.use(authorize('admin'));

router
  .route('/admin/orders')
  .get(getAllOrders);

router
  .route('/:id/status')
  .put(updateOrderStatus);

module.exports = router; 