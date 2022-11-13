const Pokemon = require('../models/model-pokemon');
const { success } = require('../helper');
  
module.exports = (app) => {
    app.delete('/api/pokemon/:id', (req, res) => {
        const id = parseInt(req.params.id);
        let message = '';
        Pokemon.findById(id).then(pokemon => {
            if(!pokemon) {
                message = 'Erreur 404 : Aucun pokémon possède cet identifiant dans le pokédex.';
                return res.status(404).json({message});
            }
            Pokemon.findByIdAndDelete(id).then(pkm => {
                message = `Le pokémon ${pkm.name} a bien été supprimé du pokédex.`;
                return res.json(success(message, pkm));
            }).catch(() => {
                message = 'Erreur 500 : Vous ne pouvez pas supprimer de pokémon pour l\'instant. Réessayez plus tard.';
                return res.status(500).json({message});
            });
        }).catch(() => {
            message = 'Erreur 500 : Vous ne pouvez pas supprimer de pokémon pour l\'instant. Réessayez plus tard.';
            return res.status(500).json({message});
        });
    });
}
