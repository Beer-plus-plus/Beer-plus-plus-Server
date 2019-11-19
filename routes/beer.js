const express = require('express');

const beerConnect = require('../middlewares/beerConnect.js');

const router = express.Router();

const Beer = require('../models/Beer');
const User = require('../models/User');

const { checkIfLoggedIn } = require('../middlewares');

/* Create a beer or add one is the same function */

router.post('/new', checkIfLoggedIn, async (req, res, next) => {
  const { beer } = req.body;
  const { ingredients } = req.body;
  console.log('contents of ingredients tururur', req.body.ingredients);
  console.log('conteido de beer', beer);
  try {
    if (beer.id) {
      /*  if beer id exist the beer cames from api */
      const aBeer = await Beer.findOne({ idBrewerydb: beer.id });
      console.log('imprimo a aBeer', aBeer);
      if (aBeer) {
        if (aBeer.idBrewerydb === beer.id) {
          console.log('beer exist from api');
          console.log(aBeer._id);
          return res.status(200).json(aBeer._id);
        }
      }
    } else {
      const aBeer = await Beer.findOne({ nameDisplay: beer.nameDisplay });

      if (aBeer) {
        if (aBeer.length > 0) {
          console.log('eeeeoooo');
          console.log('beer exist data base');
          return res.status(204).json(aBeer._id);
        }
      }
    }
    console.log('continuo con la creacion');
    console.log('contenido de beer,style', req.body.beer.style);

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
    nameDisplay, console.log('%c%s', 'color: #00e600', newBeer);
    return res.status(200).json(newBeer._id);
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
    const userBeers = await User.findById({ _id: req.session.currentUser._id }).populate('preferredBeers');

    if (userBeers.preferredBeers.length > 0) {
      const { preferredBeers } = userBeers;
      for (let i = 0; i < preferredBeers.length; i += 1) {
        if (preferredBeers[i].idBrewerydb !== 'none') {
          if (preferredBeers[i].idBrewerydb === beer.id) {
            beer.state = 'lock';
            beer.idbplusplus = preferredBeers[i].id;
          }
        }
      }
    }
    return res.json(beer);
  } catch (error) {
    console.log(error);
  }
});

router.get('/beeringredients/:id', checkIfLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await beerConnect.getABeerIngredients(id);
    console.log('ingredients', data);
    if (data) {
      if (data.data) {
        const {
          data: { data: ingredients },
        } = data;
        if (ingredients) {
          let ingredients2 = '';
          for (let i = 0; i < ingredients.length; i += 1) {
            ingredients2 = `${ingredients2}, ${ingredients[i].name}`;
          }
          return res.json(ingredients2);
        }
      }
    }
    const data2 = 'No ingredients added.';
    return res.json(data2);
  } catch (error) {
    console.log(error);
  }
});

/* get a list o beer on db */

router.get('/:page/:user', checkIfLoggedIn, async (req, res, next) => {
  const { page, user } = req.params;
  try {
    const allBeers = await beerConnect.getAllBeers(page);
    const {
      data: { data: beers, numberOfPages },
    } = allBeers;
    const beersPreferred = await User.findById({ _id: user }).populate('preferredBeers');
    const { preferredBeers } = beersPreferred; /* List of user preferredBeers; */
    if (preferredBeers.length > 0) {
      for (let i = 0; i < preferredBeers.length; i += 1) {
        for (let j = 0; j < beers.length; j += 1) {
          if (preferredBeers[i].idBrewerydb !== 'none') {
            if (preferredBeers[i].idBrewerydb === beers[j].id) {
              beers[j].state = 'lock';
            }
          }
        }
      }
    }

    return res.status(200).json({ beers, numberOfPages });
  } catch (error) {
    next(error);
  }
});

/* Update a beer */

module.exports = router;
