const express = require('express');

const beerConnect = require('../middlewares/beerConnect.js');

const router = express.Router();

const Beer = require('../models/Beer');
const User = require('../models/User');

const { checkIfLoggedIn } = require('../middlewares');

/* Create a beer or add one is the same function */

router.post('/new', checkIfLoggedIn, async (req, res, next) => {
  const { beer } = req.body;
  console.log('la birra tiene', req.body.beer);
  try {
    if (beer.id) {
      const aBeer = await Beer.find({ idBrewerydb: beer.id });
      if (aBeer.idBrewerydb === beer.id) {
        return res.status(404).json('error');
      }
    }
    const {
      nameDisplay,
      description: Description,
      style: { name: beerStyle },

      abv: ABV,
      ibu: IBU,
      origin,
      labels: { medium: image },
      brand,
      productionYear,
      id: idBrewerydb,
    } = req.body.beer;
    const { userId } = req.body;
    const { ingredients } = req.body;
    const newBeer = await Beer.create({
      nameDisplay,
      Description,
      beerStyle,
      ingredients,
      ABV,
      IBU,
      origin,
      image,
      brand,
      productionYear,
      idBrewerydb,
      creatorId: userId,
    });
    console.log(newBeer);
    const modifiedUser = await User.findByIdAndUpdate(newBeer.creatorId, { $push: { preferredBeers: newBeer._id   }} );
    console.log(newBeer);
    return res.json(modifiedUser);
  } catch (error) {
    console.log(error);
  }
});

/* Delete a beer added from de api or created */

router.delete('/:id', checkIfLoggedIn, async (req, res, nex) => {
  const { id } = req.params;
  try {
    const beer = await Beer.findByIdAndDelete({ _id: id });
    return res.json(beer);
  } catch (error) {
    console.log(error);
  }
});

/* get a beer detail */

router.get('/beerdetail/:id', checkIfLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await beerConnect.getABeer(id);
    const {
      data: { data: beer },
    } = data;

    return res.json(beer);
  } catch (error) {
    console.log(error);
  }
});

router.get('/beeringredients/:id', checkIfLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await beerConnect.getABeerIngredients(id);
    if (data.data) {
      const {
        data: { data: ingredients },
      } = data;
      return res.json(ingredients);
    }
    const data2 = { ingredients: ['Not available'] };
    return res.json(data2);
  } catch (error) {
    console.log(error);
  }
});

/* get a list o beer on db */

router.get('/:page', checkIfLoggedIn, async (req, res, next) => {
  const { page } = req.params;
  try {
    const allBeers = await beerConnect.getAllBeers(page);
    const {
      data: { data: beers, numberOfPages },
    } = allBeers;
    /* Here try to look if a beer exist in the database and say to user if is preferrered por him/his to lock de button to preferred beer*/
    
    return res.status(200).json({ beers, numberOfPages });
  } catch (error) {
    next(error);
  }
});

/* Update a beer */

module.exports = router;
