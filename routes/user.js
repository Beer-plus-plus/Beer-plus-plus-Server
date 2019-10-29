const express = require('express');

const User = require('../models/User');

const router = express.Router();

/* Get user detail */

router.get('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  console.log('Estoy aqui');
  try {
    const user = await User.findById(userId);
    if (user) { res.json(user); } else res.json({});
  } catch (err) {
    next(err);
  }
});

module.exports = router;
