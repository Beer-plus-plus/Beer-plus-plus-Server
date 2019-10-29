const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    name: { type: String },
    lastName: { type: String },
    location: { latitude: { type: Number }, longitude: { type: Number }, },
    img: { name: { type: String }, description: { type: String }, imageUrl: { type: String } },
    preferredBeers: [{ type: Schema.Types.ObjectId, ref: 'Beer' }],
    preferredFoods: [{ type: Schema.Types.ObjectId, ref: 'Food' }],
    preferredSites: [{ type: Schema.Types.ObjectId, ref: 'Site' }],
    preferredUsers: [{ type: Schema.Types.ObjectId, ref: 'Site' }],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
