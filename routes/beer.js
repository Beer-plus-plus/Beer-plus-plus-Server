const express = require('express');

const beerConnect = require('../middlewares/beerConnect.js');

const router = express.Router();

const Beer = require('../models/Beer');

const { checkIfLoggedIn } = require('../middlewares');

/* Create a beer or add one is the same function */

router.post('/new', checkIfLoggedIn, async (req, res, next) => {
  const { beer } = req.body;
  if (!beer.description) {
    beer.description = 'Description, not available.';
  }
  if (!beer.style.name) {
    beer.style.name = 'Style, not available.';
  }
  if (!beer.ingredients) {
    beer.ingredients = [{ name: 'No ingredients added.' }];
  }
  console.log(beer.ingredients);

  if (!beer.abv) {
    beer.abv = -1;
  }
  console.log(beer.abv);

  if (!beer.ibu) {
    beer.ibu = -1;
  }

  if (!beer.origin) {
    beer.origin = 'Origin, not available.';
  }
  console.log(beer.origin);

  if (!beer.labels) {
    beer.labels = { medium: '/images/na.svg' };
  }
  console.log(beer.labels.medium);

  if (!beer.brand) {
    beer.brand = 'Brand, not available.';
  }
  console.log(beer.brand);

  if (!beer.productionYear) {
    beer.productionYear = -1;
  }
  console.log(beer.productionYear);

  if (!beer.id) {
    beer.id = 'na';
  }
  console.log(beer.id);
  const { nameDisplay, description: Description, style: { name: beerStyle } } = req.body.beer;

  try {
    const newBeer = await Beer.create({ nameDisplay, Description, beerStyle });
  } catch (error) {
    console.log(error);
  }


  //   nameDisplay,
  //   description,
  //   beerStyle: style.name,
  //   ingredients,
  //   abv: ABV,
  //   ibu: IBU,
  //   origin,
  //   image,
  //   brand,
  //   productionYear,
  //   idBrewerydb,
  // });
  // const {
  //   nameDisplay,
  //   Description,
  //   beerStyle,
  //   ingredients,
  //   ABV,
  //   IBU,
  //   origin,
  //   image,
  //   brand,
  //   productionYear,
  //   idBrewerydb,
  // } = req.body;
  // try {
  //   const existIdBreweryDb = await Beer.find({ idBrewerydb });
  //  ;
  //   const existByName = await Beer.find({ nameDisplay });
  //   if (existByName) {
  //     console.log(existByName);
  //     return res.status(204).json({ error: 'error this beers already exist!' });
  //   }
  //   const newBeer = await Beer.create({
  //     nameDisplay,
  //     Description,
  //     beerStyle,
  //     $push: { ingredients },
  //     ABV,
  //     IBU,
  //     origin,
  //     image,
  //     brand,
  //     productionYear,
  //     idBrewerydb,
  //   });
  //   return res.json(newBeer);
  // } catch (error) {
  //   console.log(error);
  // }
});

/* Delete a beer added from de api or created */

router.delete('/:id', checkIfLoggedIn, async (req, res, nex) => {
  const { id } = req.params;
  console.log(id);
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
      console.log('hello ', ingredients);
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
    return res.status(200).json({ beers, numberOfPages });
  } catch (error) {
    next(error);
  }
});

/* Update a beer */

module.exports = router;
