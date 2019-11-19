const express = require('express');
const bcrypt = require('bcrypt'); /* Use to change de password */
const uploader = require('../config/cloudinary');
const {
  checkIfLoggedIn,
  checkUsernameAndPasswordNotEmpty,
  checkUsernameAndPasswordAndEmailNotEmpty,
} = require('../middlewares');

const bcryptSalt = 10;

const User = require('../models/User');

const router = express.Router();

/* Get user detail */

router.get('/:userId', checkIfLoggedIn, async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById({ _id: userId });
    if (user) {
      return res.json(user);
    }
    return res.json({});
  } catch (err) {
    next(err);
  }
});

/* Change the password */

router.put('/:userId/changepass', checkIfLoggedIn, async (req, res, next) => {
  const { userId } = req.params;
  const { oldPass, newPass } = req.body;
  try {
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(404).json({ code: 'not-found' });
    }
    if (bcrypt.compareSync(oldPass, user.hashedPassword)) {
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashedPassword = bcrypt.hashSync(newPass, salt);
      const userFinal = await User.findByIdAndUpdate(
        {
          _id: userId,
        },
        {
          $set: {
            hashedPassword,
          },
        },
      );
      return res.json(userFinal);
    }
    return res.status(500).json({ err: "User Pass isn't correct" });
  } catch (err) {
    next(err);
  }
});

/* Add profile Image */

router.put('/:id/upload', checkIfLoggedIn, uploader.single('imageUrl'), async (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
  }
  try {
    const user = await User.findByIdAndUpdate(req.body.id, {
      $set: { 'img.description': req.body.description, 'img.imageUrl': req.file.secure_url },
    });
    console.log(user);
    return res.json({ secure_url: req.file.secure_url });
  } catch (err) {
    next(err);
  }
});

// /* Update user data except password */

router.put('/:userId', checkIfLoggedIn, async (req, res, next) => {
  const { userId } = req.params;
  const { email, name, lastName, latitude, longitude } = req.body;
  try {
    const users = await User.find({ email });
    if (users.length > 0) {
      for (let i = 0; i < users.length; i += 1) {
        if (users[i].email === email && users[i].id !== userId) {
          return res.status(422).json({ error: 'This mail exist' });
        }
      }
    }
    const user = await User.findByIdAndUpdate(userId, {
      $set: {
        name,
        lastName,
        email,
        'location.latitude': latitude,
        'location.longitude': longitude,
      },
    });
    // req.session.currentUser = user;
    return res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put('/:id/unpreferredBeer', checkIfLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  const { beerId } = req.body;
  try {
    const unpreferredBeer = await User.findByIdAndUpdate(
      { _id: id },
      {
        $pull: {
          preferredBeers: beerId
        },
      },
    );
  
    return res.status(200).json();
  } catch (error) {
    console.log(error);
  }
});

router.put('/:id/preferredBeer', checkIfLoggedIn, async (req, res, next) => {
  const { id } = req.params;

  const { beerId } = req.body;

  try {
    const preferredBeer = await User.findByIdAndUpdate(id, { $push: { preferredBeers: [beerId] } });
    console.log('llego hasta aqui a la salida de user preferred beer');
    return res.status(200).json(preferredBeer);
  } catch (error) {
    console.log(error);
  }
});
/* List Preferred Beer */
/* List Preferred Food */
/* List Preferred Sites */

module.exports = router;
