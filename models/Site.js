const mongoose = require('mongoose');

const { Schema } = mongoose;

const siteSchema = new Schema(
  {
    nameDisplay: { type: String, required: true, unique: true },
    breweryStyle: { type: String },
    Address: {
      street: { type: String },
      number: { type: String },
      zipcode: { type: String },
      longitude: { type: Number },
      latitude: { type: Number },
    },
    image: { type: String },
    brand: { type: String },
    beers: [{ type: Schema.Types.ObjectId, ref: 'Beer' }],
    foods: [{ type: Schema.Types.ObjectId, ref: 'Food' }],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const Site = mongoose.model('site', siteSchema);

module.exports = Site;
