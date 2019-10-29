const express = require('express');

const User = require('../models/User');

const router = express.Router();

/* Get user detail */

router.get('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (user) {
      res.json(user);
    } else res.json({});
  } catch (err) {
    next(err);
  }
});

/* Update user data */

router.put('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  const {
    username,
    email,
    name,
    lastName,
    location: { latitude, longitude },
  } = req.body;
  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, {
      username, email, name, lastName, 'location.latitude': latitude, 'location.longitude': longitude,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
