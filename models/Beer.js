const mongoose = require('mongoose');

const { Schema } = mongoose;

const beerSchema = new Schema(
  {
    nameDisplay: { type: String, },
    Description: { type: String },
    beerStyle: { type: String },
    ingredients: { type: String },
    ABV: { type: Number } /* Alcohol By Volume */,
    IBU: { type: Number } /* International Bitterness Units */,
    origin: { type: String },
    image: { type: String },
    brand: { type: String },
    productionYear: { type: Number },
    servingTemperature: { type: Number } /* Degrees */,
    idBrewerydb: { type: String },
    creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
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
