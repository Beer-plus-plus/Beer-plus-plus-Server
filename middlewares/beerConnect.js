const axios = require('axios');

class BeerConnect {
  constructor() {
    this.beerConnect = axios.create({
      baseURL: 'https://sandbox-api.brewerydb.com/v2',
      headers: { 'Content-Type': 'application/json' },
    });
    this.header = { headers: { 'Content-Type': 'application/json' } };
  }

  async getAllBeers(page) {
    const data = await this.beerConnect.get(`/beers/?key=${process.env.SAND_BREWERYDB_KEY}&p=${page}`, this.header);
    return data;
  }

  async getABeer(id) {
    const data = await this.beerConnect.get(`/beer/${id}/?key=${process.env.SAND_BREWERYDB_KEY}`, this.header);
    const { data: { data: {data: beer } } = data;
    console.log(beer);
    return data;
  }
}

const beerConnect = new BeerConnect();


module.exports = beerConnect;
