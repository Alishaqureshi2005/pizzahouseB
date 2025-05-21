const DeliveryZone = require('../models/DeliveryZone');
const asyncHandler = require('express-async-handler');

// @desc    Get all delivery zones
// @route   GET /api/delivery-zones
// @access  Public
const getAllDeliveryZones = asyncHandler(async (req, res) => {
  const zones = await DeliveryZone.find({});
  console.log(zones)
  res.json(zones);
});

// @desc    Get delivery zone by ID
// @route   GET /api/delivery-zones/:id
// @access  Public
const getDeliveryZoneById = asyncHandler(async (req, res) => {
  const zone = await DeliveryZone.findById(req.params.id);
  if (zone) {
    res.json(zone);
  } else {
    res.status(404);
    throw new Error('Delivery zone not found');
  }
});

// @desc    Check delivery availability for a location
// @route   POST /api/delivery-zones/check-availability
// @access  Public
const checkDeliveryAvailability = asyncHandler(async (req, res) => {
  const { coordinates, orderAmount } = req.body;

  if (!coordinates || !coordinates.latitude || !coordinates.longitude) {
    res.status(400);
    throw new Error('Please provide valid coordinates');
  }

  const location = [coordinates.longitude, coordinates.latitude];
  
  // Find all available zones
  const availableZones = await DeliveryZone.find({ isAvailable: true });
  
  // Check which zone the location falls into
  const matchingZone = availableZones.find(zone => zone.isLocationInZone(location));
  
  if (!matchingZone) {
    res.json({
      isAvailable: false,
      message: 'Sorry, delivery is not available at this location'
    });
    return;
  }

  // Check minimum order amount
  if (orderAmount < matchingZone.minimumOrderAmount) {
    res.json({
      isAvailable: true,
      message: `Minimum order amount of $${matchingZone.minimumOrderAmount} required`,
      minimumOrderAmount: matchingZone.minimumOrderAmount,
      deliveryCharge: matchingZone.calculateDeliveryCharge(location)
    });
    return;
  }

  // Get available time slots
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const availableSlots = matchingZone.getAvailableSlots(today);

  res.json({
    isAvailable: true,
    zone: {
      name: matchingZone.name,
      description: matchingZone.description,
      estimatedDeliveryTime: matchingZone.estimatedDeliveryTime,
      deliveryCharge: matchingZone.calculateDeliveryCharge(location),
      minimumOrderAmount: matchingZone.minimumOrderAmount
    },
    availableSlots,
    message: 'Delivery is available at this location'
  });
});

// @desc    Create a delivery zone
// @route   POST /api/delivery-zones
// @access  Private/Admin
const createDeliveryZone = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    distanceRange,
    deliveryCharge,
    minimumOrderAmount,
    estimatedDeliveryTime,
    timeSlots,
    operatingHours,
    deliverySettings,
    restaurantLocation
  } = req.body;

  const zone = await DeliveryZone.create({
    name,
    description,
    distanceRange,
    deliveryCharge,
    minimumOrderAmount,
    estimatedDeliveryTime,
    timeSlots,
    operatingHours,
    deliverySettings,
    restaurantLocation,
    lastModifiedBy: req.user._id
  });

  res.status(201).json(zone);
});

// @desc    Update a delivery zone
// @route   PUT /api/delivery-zones/:id
// @access  Private/Admin
const updateDeliveryZone = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    distanceRange,
    deliveryCharge,
    minimumOrderAmount,
    estimatedDeliveryTime,
    isAvailable,
    timeSlots,
    operatingHours,
    deliverySettings,
    restaurantLocation,
    adminNotes,
    priority
  } = req.body;

  const zone = await DeliveryZone.findById(req.params.id);

  if (zone) {
    zone.name = name || zone.name;
    zone.description = description || zone.description;
    zone.distanceRange = distanceRange || zone.distanceRange;
    zone.deliveryCharge = deliveryCharge ?? zone.deliveryCharge;
    zone.minimumOrderAmount = minimumOrderAmount ?? zone.minimumOrderAmount;
    zone.estimatedDeliveryTime = estimatedDeliveryTime ?? zone.estimatedDeliveryTime;
    zone.isAvailable = isAvailable ?? zone.isAvailable;
    zone.timeSlots = timeSlots || zone.timeSlots;
    zone.operatingHours = operatingHours || zone.operatingHours;
    zone.deliverySettings = deliverySettings || zone.deliverySettings;
    zone.restaurantLocation = restaurantLocation || zone.restaurantLocation;
    zone.adminNotes = adminNotes || zone.adminNotes;
    zone.priority = priority ?? zone.priority;
    zone.lastModifiedBy = req.user._id;

    const updatedZone = await zone.save();
    res.json(updatedZone);
  } else {
    res.status(404);
    throw new Error('Delivery zone not found');
  }
});

// @desc    Delete a delivery zone
// @route   DELETE /api/delivery-zones/:id
// @access  Private/Admin
const deleteDeliveryZone = asyncHandler(async (req, res) => {
  const zone = await DeliveryZone.findById(req.params.id);

  if (zone) {
    await zone.deleteOne();
    res.json({ message: 'Delivery zone removed' });
  } else {
    res.status(404);
    throw new Error('Delivery zone not found');
  }
});

// @desc    Get available time slots for a zone
// @route   GET /api/delivery-zones/:id/time-slots
// @access  Public
const getTimeSlots = asyncHandler(async (req, res) => {
  const zone = await DeliveryZone.findById(req.params.id);
  
  if (!zone) {
    res.status(404);
    throw new Error('Delivery zone not found');
  }

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const availableSlots = zone.getAvailableSlots(today);

  res.json({
    zone: zone.name,
    availableSlots
  });
});

// @desc    Update time slot availability
// @route   PUT /api/delivery-zones/:id/time-slots
// @access  Private/Admin
const updateTimeSlot = asyncHandler(async (req, res) => {
  const { startTime, endTime, isAvailable, maxOrders } = req.body;

  const zone = await DeliveryZone.findById(req.params.id);
  
  if (!zone) {
    res.status(404);
    throw new Error('Delivery zone not found');
  }

  const slotIndex = zone.timeSlots.findIndex(
    slot => slot.startTime === startTime && slot.endTime === endTime
  );

  if (slotIndex === -1) {
    res.status(404);
    throw new Error('Time slot not found');
  }

  if (isAvailable !== undefined) {
    zone.timeSlots[slotIndex].isAvailable = isAvailable;
  }
  if (maxOrders !== undefined) {
    zone.timeSlots[slotIndex].maxOrders = maxOrders;
  }

  zone.lastModifiedBy = req.user._id;
  const updatedZone = await zone.save();

  res.json(updatedZone.timeSlots[slotIndex]);
});

// @desc    Restore default delivery zones
// @route   POST /api/delivery-zones/restore
// @access  Private/Admin
const restoreDefaultZones = asyncHandler(async (req, res) => {
  // Standard operating hours
  const standardOperatingHours = {
    monday: { open: '11:00', close: '22:00' },
    tuesday: { open: '11:00', close: '22:00' },
    wednesday: { open: '11:00', close: '22:00' },
    thursday: { open: '11:00', close: '22:00' },
    friday: { open: '11:00', close: '23:00' },
    saturday: { open: '11:00', close: '23:00' },
    sunday: { open: '11:00', close: '22:00' }
  };

  // Restaurant's central location (example coordinates for NYC)
  const restaurantLocation = {
    type: 'Point',
    coordinates: [-73.935242, 40.730610] // Example coordinates for NYC
  };

  // Generate time slots for a day
  const generateTimeSlots = (startHour, endHour) => {
    const slots = [];
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push({
        startTime: `${hour.toString().padStart(2, '0')}:00`,
        endTime: `${(hour + 1).toString().padStart(2, '0')}:00`,
        maxOrders: 5,
        isAvailable: true
      });
    }
    return slots;
  };

  const defaultZones = [
    // Zone 1: 0-5km (Free Delivery)
    {
      name: 'Free Delivery Zone',
      description: 'Free delivery within 5km radius',
      distanceRange: {
        min: 0,
        max: 5
      },
      deliveryCharge: 0,
      minimumOrderAmount: 15.00,
      estimatedDeliveryTime: 20,
      isAvailable: true,
      timeSlots: generateTimeSlots(11, 22),
      operatingHours: standardOperatingHours,
      deliverySettings: {
        maxOrdersPerSlot: 5,
        advanceBookingHours: 24,
        slotDuration: 30
      },
      restaurantLocation,
      adminNotes: 'High priority zone - Free delivery to encourage local orders',
      priority: 1
    },

    // Zone 2: 5-10km
    {
      name: 'Standard Delivery Zone',
      description: 'Standard delivery charges for 5-10km radius',
      distanceRange: {
        min: 5,
        max: 10
      },
      deliveryCharge: 2.99,
      minimumOrderAmount: 20.00,
      estimatedDeliveryTime: 35,
      isAvailable: true,
      timeSlots: generateTimeSlots(11, 22),
      operatingHours: standardOperatingHours,
      deliverySettings: {
        maxOrdersPerSlot: 4,
        advanceBookingHours: 24,
        slotDuration: 30
      },
      restaurantLocation,
      adminNotes: 'Standard delivery zone - Moderate traffic areas',
      priority: 2
    },

    // Zone 3: 10-15km
    {
      name: 'Extended Delivery Zone',
      description: 'Extended delivery area with higher charges',
      distanceRange: {
        min: 10,
        max: 15
      },
      deliveryCharge: 4.99,
      minimumOrderAmount: 25.00,
      estimatedDeliveryTime: 45,
      isAvailable: true,
      timeSlots: generateTimeSlots(11, 22),
      operatingHours: standardOperatingHours,
      deliverySettings: {
        maxOrdersPerSlot: 3,
        advanceBookingHours: 24,
        slotDuration: 30
      },
      restaurantLocation,
      adminNotes: 'Extended delivery zone - Higher delivery charges apply',
      priority: 3
    },

    // Zone 4: 15-20km
    {
      name: 'Premium Delivery Zone',
      description: 'Premium delivery service for distant locations',
      distanceRange: {
        min: 15,
        max: 20
      },
      deliveryCharge: 6.99,
      minimumOrderAmount: 30.00,
      estimatedDeliveryTime: 60,
      isAvailable: true,
      timeSlots: generateTimeSlots(11, 22),
      operatingHours: standardOperatingHours,
      deliverySettings: {
        maxOrdersPerSlot: 2,
        advanceBookingHours: 48,
        slotDuration: 45
      },
      restaurantLocation,
      adminNotes: 'Premium delivery zone - Limited slots available',
      priority: 4
    }
  ];

  try {
    // Clear existing delivery zones
    await DeliveryZone.deleteMany({});

    // Create new delivery zones
    const zones = await DeliveryZone.insertMany(defaultZones);

    res.status(201).json({
      success: true,
      message: 'Default delivery zones have been restored',
      count: zones.length,
      data: zones
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error restoring delivery zones',
      error: error.message
    });
  }
});

module.exports = {
  getAllDeliveryZones,
  getDeliveryZoneById,
  checkDeliveryAvailability,
  createDeliveryZone,
  updateDeliveryZone,
  deleteDeliveryZone,
  getTimeSlots,
  updateTimeSlot,
  restoreDefaultZones
}; 