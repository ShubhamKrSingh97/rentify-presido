const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  place: { type: String, required: true },
  area: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  hospitalsNearby: { type: Boolean, default: false },
  collegesNearby: { type: Boolean, default: false },
  // Add more fields as needed
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Property', propertySchema);
