const Pokemon = require('../models/model-pokemon');
const { success } = require('../helper');
  
module.exports = (app) => {
  app.get('/api/pokemon/:name', (req, res) => {
    const name = req.params.name;
    let message = '';
    Pokemon.findOne({name: name}).then(pokemon => {
        if(!pokemon) {
            message = 'Erreur 404 : Ce pokémon n\'est pas encore répertorié. Vous pouvez l\'ajouter dans le pokédex.';
            return res.status(404).json({message});
        }
        message = 'Un pokémon a bien été trouvé.';
        return res.json(success(message, pokemon));
      }).catch(() => {
        message = 'Erreur 500 : Aucun pokémon n\'a pu être récupérée. Réessayez plus tard.';
        return res.status(500).json({message});
      });
  });
}