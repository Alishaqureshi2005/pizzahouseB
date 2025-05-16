const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updateUserRole
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

// Protect all routes
router.use(protect);
// Restrict to admin role
router.use(authorize('admin'));

router.route('/users')
  .get(getUsers);

router.route('/users/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

router.route('/users/:id/role')
  .put(updateUserRole);

module.exports = router; 