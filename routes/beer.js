const express = require('express');
const axios = require('axios');

const router = express.Router();

const Beer = require('../models/Beer');
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

/* get a list o beer on db */

router.get('/:page', async (req, res, next) => {
  console.log('hola')
  const { page } = req.params;
  try {
    const allBeers = await axios.get(
      `https://sandbox-api.brewerydb.com/v2/beers/?key=${process.env.SAND_BREWERYDB_KEY}&p=${page}`,
      { headers: { 'Content-Type': 'application/json' } },
    );
    const { data: { data: beers, numberOfPages } } = allBeers;
    console.log(beers);
    return res.json({ beers, numberOfPages });
  } catch (error) {
    next(error);
  }
});


/* Update a beer */
/* Delete a beer */
/* Create a beer */

module.exports = router;
