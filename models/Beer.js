const mongoose = require('mongoose');

const { Schema } = mongoose;

const BeerSchema = new Schema(
  {
    nameDisplay: { type: String, required: true, unique: true },
    
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