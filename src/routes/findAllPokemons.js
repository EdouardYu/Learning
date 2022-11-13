const Pokemon = require('../models/model-pokemon');
const { success, pluralize } = require('../helper');
  
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    let message = '';
    if(req.query.name) {
      const name = req.query.name;
      const limit = parseInt(req.query.limit) || 5;
      if(name.length < 2) {
        message = 'Le terme de recherche doit contenir au moins 2 caractères.';
        return res.status(400).json({message});
      };
      Pokemon.find({name: { $regex: '.*' + name + '.*', $options: 'i' }}).sort({name: 'asc'}).limit(limit).then(pokemons => {
        if(pokemons.length == 0) {
          message = `Aucun pokémon correspond au terme de la recherche '${name}', essayez un autre nom.`;
          return res.json({message});
        }
        Pokemon.countDocuments({name: { $regex: '.*' + name + '.*', $options: 'i' }}).then(count => {
          message = `Une liste de ${pluralize(count, 'pokémon', 'pokémons')} correspond au terme de la recherche '${name}'.`;
          return res.json(success(message, pokemons));
        }).catch(() => {
          message = 'Erreur 500 : Aucune liste de pokémons n\'a pu être récupérée. Réessayez plus tard.';
          return res.status(500).json({message});
        });
      }).catch(() => {
        message = 'Erreur 500 : Aucune liste de pokémons n\'a pu être récupérée. Réessayez plus tard.';
        return res.status(500).json({message});
      });
    } else {
      Pokemon.find().sort({_id: 'asc'}).then(pokemons => {
        message = `Une liste de ${pluralize(pokemons.length, 'pokémon', 'pokémons')} a bien été récupérée.`;
        return res.json(success(message, pokemons));
      }).catch(() => {
        message = 'Erreur 500 : Aucune liste de pokémons n\'a pu être récupérée. Réessayez plus tard.';
        return res.status(500).json({message});
      });
    }
  });
}