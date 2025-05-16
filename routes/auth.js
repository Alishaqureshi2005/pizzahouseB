const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {
  register,
  login,
  getMe,
  updateDetails,
  updatePassword
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Register route
router.post(
  '/register',
  [
    check('name')
      .trim()
      .notEmpty().withMessage('Name is required')
      .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
    
    check('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Please enter a valid email')
      .normalizeEmail(),
    
    check('password')
      .trim()
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
      .matches(/\d/).withMessage('Password must contain at least one number')
      .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter'),
    
    check('confirmPassword')
      .trim()
      .notEmpty().withMessage('Please confirm your password')
      .custom((value, { req }) => {
        if (!value) {
          throw new Error('Please confirm your password');
        }
        if (value !== req.body.password) {
          throw new Error('Passwords do not match');
        }
        return true;
      }),
    
    check('phone')
      .optional()
      .trim()
      .matches(/^\+?[\d\s-]{10,}$/).withMessage('Please enter a valid phone number')
  ],
  register
);

// Login route
router.post(
  '/login',
  [
    check('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Please enter a valid email')
      .normalizeEmail(),
    
    check('password')
      .trim()
      .notEmpty().withMessage('Password is required')
  ],
  login
);

// Get current user
router.get('/me', protect, getMe);

// Update user details
router.put('/updatedetails', protect, updateDetails);

// Update password
router.put('/updatepassword', protect, updatePassword);

module.exports = router; 