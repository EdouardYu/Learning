const Pokemon = require('../models/model-pokemon');
const { success } = require('../helper');
  
module.exports = (app) => {
    app.put('/api/pokemon/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Pokemon.findById(id).then(pokemon => {
            let message = '';
            if(pokemon){
                Pokemon.findByIdAndUpdate(id, req.body).then(() => {
                    Pokemon.findById(id).then(pokemon => {
                        message = `Le pokémon ${pokemon.name} a bien été modifié`;
                        res.json(success(message, pokemon));
                    });
                });
            } else {
                message = 'Aucun pokémon possède cet identifiant dans la collection';
                res.json(success(message, pokemon));
            }
        });
    });
}