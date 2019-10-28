const mongoose = require('mongoose');

const { Schema } = mongoose;

const beerSchema = new Schema(
  {
    nameDisplay: { type: String, required: true, unique: true },
    Description: { type: String },
    BeerStyle: { type: String },
    ABV: { type: Number }, /* Alcohol By Volume */
    IBU: { type: Number }, /* (International Bitterness Units */
    image: { type: String },
    brand: { type: String },
    productionYear: { type: Number },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;
