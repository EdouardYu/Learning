const Pokemon = require('../models/model-pokemon');
const { success } = require('../helper');
  
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    Pokemon.find().then(pokemons => {
        const message = `Une liste de ${pokemons.length} pokémons a bien été récupérée`;
        res.json(success(message, pokemons));
      });
  });
}