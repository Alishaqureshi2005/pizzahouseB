const mongoose = require('mongoose');

const deliveryZoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a zone name'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  distanceRange: {
    min: {
      type: Number,
      required: [true, 'Please provide minimum distance'],
      min: 0
    },
    max: {
      type: Number,
      required: [true, 'Please provide maximum distance'],
      min: 0
    }
  },
  deliveryCharge: {
    type: Number,
    required: [true, 'Please provide delivery charge'],
    min: 0
  },
  minimumOrderAmount: {
    type: Number,
    required: [true, 'Please provide minimum order amount'],
    min: 0
  },
  estimatedDeliveryTime: {
    type: Number,
    required: [true, 'Please provide estimated delivery time in minutes'],
    min: 0
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  timeSlots: [{
    startTime: {
      type: String,
      required: true,
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide a valid time in HH:MM format']
    },
    endTime: {
      type: String,
      required: true,
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide a valid time in HH:MM format']
    },
    maxOrders: {
      type: Number,
      default: 5,
      min: 1
    },
    isAvailable: {
      type: Boolean,
      default: true
    }
  }],
  operatingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  deliverySettings: {
    maxOrdersPerSlot: {
      type: Number,
      default: 5,
      min: 1
    },
    advanceBookingHours: {
      type: Number,
      default: 24,
      min: 1
    },
    slotDuration: {
      type: Number,
      default: 30,
      min: 15
    }
  },
  restaurantLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function(v) {
          return v.length === 2 && 
                 v[0] >= -180 && v[0] <= 180 && 
                 v[1] >= -90 && v[1] <= 90;
        },
        message: 'Please provide valid coordinates [longitude, latitude]'
      }
    }
  },
  adminNotes: {
    type: String,
    trim: true
  },
  priority: {
    type: Number,
    default: 0,
    min: 0
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Create geospatial index
deliveryZoneSchema.index({ restaurantLocation: '2dsphere' });

// Method to check if a location is within the zone
deliveryZoneSchema.methods.isLocationInZone = function(location) {
  const distance = this.calculateDistance(location);
  return distance >= this.distanceRange.min && distance <= this.distanceRange.max;
};

// Method to calculate distance between two points
deliveryZoneSchema.methods.calculateDistance = function(location) {
  const R = 6371; // Earth's radius in km
  const lat1 = this.restaurantLocation.coordinates[1] * Math.PI / 180;
  const lat2 = location[1] * Math.PI / 180;
  const deltaLat = (location[1] - this.restaurantLocation.coordinates[1]) * Math.PI / 180;
  const deltaLon = (location[0] - this.restaurantLocation.coordinates[0]) * Math.PI / 180;

  const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;

  return distance;
};

// Method to calculate delivery charge based on distance
deliveryZoneSchema.methods.calculateDeliveryCharge = function(location) {
  const distance = this.calculateDistance(location);
  if (distance <= this.distanceRange.min) {
    return 0;
  }
  return this.deliveryCharge;
};

// Method to get available time slots for a day
deliveryZoneSchema.methods.getAvailableSlots = function(day) {
  const operatingHours = this.operatingHours[day.toLowerCase()];
  if (!operatingHours) {
    return [];
  }

  return this.timeSlots.filter(slot => {
    const slotStart = new Date(`2000-01-01T${slot.startTime}`);
    const slotEnd = new Date(`2000-01-01T${slot.endTime}`);
    const openTime = new Date(`2000-01-01T${operatingHours.open}`);
    const closeTime = new Date(`2000-01-01T${operatingHours.close}`);

    return slot.isAvailable && 
           slotStart >= openTime && 
           slotEnd <= closeTime;
  });
};

module.exports = mongoose.models.DeliveryZone || mongoose.model('DeliveryZone', deliveryZoneSchema); 