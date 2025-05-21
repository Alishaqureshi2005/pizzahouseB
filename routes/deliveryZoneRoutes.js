const express = require('express');
const router = express.Router();
const {
  getAllDeliveryZones,
  getDeliveryZoneById,
  checkDeliveryAvailability,
  createDeliveryZone,
  updateDeliveryZone,
  deleteDeliveryZone,
  getTimeSlots,
  updateTimeSlot,
  restoreDefaultZones
} = require('../controllers/deliveryZoneController');
const { protect, authorize } = require('../middleware/auth');
// Public routes
router.get('/', getAllDeliveryZones);
router.get('/:id', getDeliveryZoneById);
router.post('/check-availability', checkDeliveryAvailability);
router.get('/:id/time-slots', getTimeSlots);

router.use(authorize('admin'));
// Admin routes
router.post('/', protect,  createDeliveryZone);
router.post('/restore', protect, restoreDefaultZones);
router.put('/:id', protect, updateDeliveryZone);
router.delete('/:id', protect,  deleteDeliveryZone);
router.put('/:id/time-slots', protect,  updateTimeSlot);

module.exports = router; 