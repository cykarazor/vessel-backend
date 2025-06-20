const mongoose = require('mongoose');

const CargoSchema = new mongoose.Schema({
  type: String,
  quantityUnit: { type: String, enum: ['MT', 'KG'] },
  total: Number,
  rateUSD: Number
});

const VoyageSchema = new mongoose.Schema({
  vesselName: String,
  voyageNumber: String,
  departureDate: Date,
  departurePort: String,
  arrivalDate: Date,
  arrivalPort: String,
  cargo: CargoSchema,
  remarks: String
});

module.exports = mongoose.model('Voyage', VoyageSchema);
