const mongoose = require('mongoose');

const { Schema } = mongoose;

const foodSchema = new Schema(
  {
    nameDisplay: { type: String, required: true, unique: true },
    Description: { type: String },
    BeerStyle: { type: String },
    cal: { type: Number } /* Alcohol By Volume */,
    image: { type: String },
    brand: { type: String },
    countryOrigin: { type: String },
    productionYear: { type: Number },
    pairingBeer: [{ type: Schema.Types.ObjectId, ref: 'Beer' }],
    ingredients: [{ name: { type: String }, qty: { type: Number } }],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const Food = mongoose.model('food', foodSchema);

module.exports = Food;
