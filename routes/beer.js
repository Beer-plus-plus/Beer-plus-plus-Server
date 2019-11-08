const express = require('express');

const beerConnect = require('../middlewares/beerConnect.js');

const router = express.Router();

const Beer = require('../models/Beer');

const { checkIfLoggedIn } = require('../middlewares');

/* Create a beer or add one is the same function */

router.get('/', checkIfLoggedIn, async (req, res, next) => {
  const totalBeers = [];
  let totalPages = 1;
  try {
    for (let actualPage = 1; actualPage <= totalPages; actualPage += 1) {
      const allBeers = await beerConnect.getAllBeers(actualPage);
      const { data: { data, numberOfPages } } = allBeers;
      totalPages = numberOfPages; /* number of pages in the api */
      for (let beerCounter = 1; beerCounter <= data.length; beerCounter += 1) {
        totalBeers.push(data[beerCounter]);
      }
 /* Here read all beers from the api */
  
 
    //   nameDisplay: { type: String, required: true, unique: true },
    // Description: { type: String },
    // beerStyle: { type: String },
    // ingredients: [{ name: { type: String } }],
    // ABV: { type: Number }, /* Alcohol By Volume */
    // IBU: { type: Number }, /* International Bitterness Units */
    // cal: { type: Number },
    // origin: { type: String }, /* (International Bitterness Units */
    // image: { type: String },
    // brand: { type: String },
    // productionYear: { type: Number },
    // servingTemperature: { type: Number }, /* Degrees */
    // idBrewerydb: { type: String },
    }
    console.log(totalBeers);
    return res.status(200).json(totalBeers);
  } catch (error) {
    next(error);
  }
});

router.post('/new', checkIfLoggedIn, async (req, res, next) => {
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
    idBrewerydb,
  } = req.body;
  try {
    const existIdBreweryDb = await Beer.find({ idBrewerydb });
    //     if (existIdBreweryDb) {
    //       return res.status(204).json('error this beers already exist! from Api');
    //     }
    // console.log(existIdBreweryDb);
    const existByName = await Beer.find({ nameDisplay });
    if (existByName) {
      console.log(existByName);
      return res.status(204).json({ error: 'error this beers already exist!' });
    }
    const newBeer = await Beer.create({
      nameDisplay,
      Description,
      beerStyle,
      $push: { ingredients },
      ABV,
      IBU,
      cal,
      origin,
      image,
      brand,
      productionYear,
      idBrewerydb,
    });
    return res.json(newBeer);
  } catch (error) {
    console.log(error);
  }
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
    const { data: { data: beer } } = data;
    return res.json(beer);
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
