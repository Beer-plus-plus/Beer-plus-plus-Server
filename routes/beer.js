const express = require('express');

const router = express.Router();
const Beer = require('../models/Beer');

/* get a list o beer on db */

router.get('/', async (req, res, next) => {
  try {
    const beer = await Beer.find();
    console.log(beer);
  } catch (err) {
    next(err);
  }
});
/* get detail o beer */
/* Update a beer */
/* Delete a beer */
/* Create a beer */
router.post('/new', async (req, res, next) => {
  const {
    nameDisplay,
    Description,
    beerStyle,
    ingredients,
    ABV,
    IBU,
    cal,
    origin,
    image,
    brand,
    productionYear,
    servingTemperature,
  } = req.body;
  try {
    const newBeer = await Beer.create({
      nameDisplay,
      Description,
      beerStyle,
      ingredients,
      ABV,
      IBU,
      cal,
      origin,
      image,
      brand,
      productionYear,
      servingTemperature,
    });
    res.json(newBeer);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
