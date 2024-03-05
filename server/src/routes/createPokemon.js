const Pokemon = require('../models/model-pokemon');
const { success, getUniqueId } = require('../helper');
const auth = require('../auth/auth');
  
module.exports = (app) => {
    app.post('/api/pokemons', auth, (req, res) => {
        Pokemon.find().then(pokemons => {
            const id = getUniqueId(pokemons);
            Pokemon.create({ ...req.body, ...{_id: id}}) ////On ajoute _id  dans notre requête depuis ici et le reste se trouve directement dans la collection
            .then(pokemon => {
                const message = `Le pokémon ${req.body.name} a bien été ajouté.`;
                return res.json(success(message, pokemon));
            }).catch(error => {
                if (error.name === 'ValidationError'){
                    return res.status(400).json(success(`Erreur 400 : ${error.message}`, error))
                };
                if (error.name === 'MongoServerError'){
                    message = 'Ce pokémon a déjà été enregistré dans le pokédex, veuillez renseigner un autre pokémon [nom (et / ou) image du pokémon déjà pris(ent)].'
                    return res.status(400).json({message});
                };
                message = 'Erreur 500 : Vous ne pouvez pas ajouter de nouveau pokémon pour l\'instant. Réessayez plus tard.';
                return res.status(500).json({message});
            });
        }).catch(() => {
            message = 'Erreur 500 : Vous ne pouvez pas ajouter de nouveau pokémon pour l\'instant. Réessayez plus tard.';
            return res.status(500).json({message});
        });
    });
}