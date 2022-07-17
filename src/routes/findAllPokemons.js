const Pokemon = require('../models/model-pokemon');
const { success, pluralize } = require('../helper');
  
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    let message = '';
    Pokemon.find().then(pokemons => {
        message = `Une liste de ${pluralize(pokemons.length, 'pokémon', 'pokémons')} a bien été récupérée`;
        res.json(success(message, pokemons));
      }).catch(() => {
        message = 'Erreur 500 : Aucune liste de pokémons n\'a pu être récupérée. Réessayez plus tard';
        res.status(500).json({message});
      });
  });
}