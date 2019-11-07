const express = require('express');

const beerConnect = require('../middlewares/beerConnect.js');

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
  const dupla = Beer.find({ nameDisplay });
  // if (dupla) {
  //   res.status().json
  // }
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

/* get a beer detail */

router.get('/beerdetail/:id', async (req, res, next) => {
  const { id } = req.params;
  const beer = await beerConnect.getABeer(id);
  console.log(beer);
});

/* get a list o beer on db */

router.get('/:page', async (req, res, next) => {
  const { page } = req.params;
  try {
    const allBeers = await beerConnect.getAllBeers(page);
    const {
      data: { data: beers, numberOfPages },
    } = allBeers;
    return res.status(200).json({ beers, numberOfPages });
  } catch (error) {
    next(error);
  }
});

/* Update a beer */
/* Delete a beer */
/* Create a beer */

module.exports = router;
