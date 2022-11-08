const Pokemon = require('../models/model-pokemon');
const { success } = require('../helper');
  
module.exports = (app) => {
    app.put('/api/pokemon/:id', (req, res) => {
        const id = parseInt(req.params.id);
        let message = '';
        Pokemon.findById(id).then(pokemon => { 
            if(!pokemon) {
                message = 'Erreur 404 : Aucun pokémon possède cet identifiant dans le pokédex. Vous pouvez l\'ajouter dans le pokédex';
                return res.status(404).json({message});
            }
            Pokemon.findByIdAndUpdate(id, req.body, { runValidators: true }).then(() => {
                Pokemon.findById(id).then(pkm => {
                    message = `Le pokémon n°${pkm.id} a bien été modifié`;
                    res.json(success(message, pkm));
                }).catch(() => {
                    message = 'Erreur 500 : Vous ne pouvez pas modifier de pokémon pour l\'instant. Réessayez plus tard';
                    res.status(500).json({message});
                });
            }).catch(error => {
                if (error.name === 'ValidationError'){
                    return res.status(400).json(success(`Erreur 400 : ${error.message}`, error))
                };
                message = 'Erreur 500 : Vous ne pouvez pas modifier de pokémon pour l\'instant. Réessayez plus tard';
                res.status(500).json({message});
            });
        }).catch(() => {
            message = 'Erreur 500 : Vous ne pouvez pas modifier de pokémon pour l\'instant. Réessayez plus tard';
            res.status(500).json({message});
        });
    });
}