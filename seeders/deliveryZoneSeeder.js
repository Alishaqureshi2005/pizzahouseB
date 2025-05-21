const DeliveryZone = require('../models/DeliveryZone');

// Helper function to generate time slots
const generateTimeSlots = (startHour, endHour, slotDuration = 30) => {
  const slots = [];
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += slotDuration) {
      const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const endMinute = (minute + slotDuration) % 60;
      const endHour = minute + slotDuration >= 60 ? hour + 1 : hour;
      const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
      
      slots.push({
        startTime,
        endTime,
        maxOrders: 5,
        isAvailable: true
      });
    }
  }
  return slots;
};

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

const deliveryZones = [
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
  }
];

const importData = async () => {
  try {
    await DeliveryZone.deleteMany({});
    await DeliveryZone.insertMany(deliveryZones);
    console.log('Delivery Zones Imported!');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

const destroyData = async () => {
  try {
    await DeliveryZone.deleteMany({});
    console.log('Delivery Zones Destroyed!');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

module.exports = {
  importData,
  destroyData
}; 