const express = require('express');
const bcrypt = require('bcryptjs'); /* Use to change de password */

const bcryptSalt = 10;

const User = require('../models/User');

const router = express.Router();

/* Get user detail */

router.get('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (user) {
      return res.json(user);
    }
    return res.json({});
  } catch (err) {
    next(err);
  }
});

/* To change or update de user password */

router.put('/:userId/changepass', async (req, res, next) => {
  const { userId } = req.params;
  const { oldPass, newPass } = req.body;
  if (oldPass === newPass) {
    return res.status(404).json({ error: 'Old password and New Password cannot be de same.' });
  }
  try {
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(404).json({ code: 'not-found' });
    }
    if (bcrypt.compareSync(oldPass, user.hashedPassword)) {
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashedPassword = bcrypt.hashSync(newPass, salt);
      const userfinal = await User.findByIdAndUpdate(
        {
          _id: userId,
        },
        {
          $set: {
            hashedPassword,
          },
        },
      );
      return res.json(userfinal);
    }
    return res.status(500).json({ err: 'User not found' });
  } catch (err) {
    next(err);
  }
});

/* Update user data except password */

router.put('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  const {
    email, name, lastName, latitude, longitude,
  } = req.body;

  try {
    const users = await User.find(email);
    if (users.legth > 0) {
      for (let i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].id !== userId) {
          return res.setTimeout(500).json({ error: 'This email exist' });
        }
      }
    }
    const user = await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      {
        $set: {
          email,
          name,
          lastName,
          'location.latitude': latitude,
          'location.longitude': longitude,
        },
      },
    );
    req.session.currentUser = username;
    res.json(user);
  } catch (err) {
    next(err);
  }
});

/* Add profile Image */
/* List Preferred Beer */
/* List Preferred Food */
/* List Preferred Sites */

module.exports = router;
