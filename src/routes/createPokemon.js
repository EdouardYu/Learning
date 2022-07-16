const Pokemon = require('../models/model-pokemon');
const { success, getUniqueId } = require('../helper');
  
module.exports = (app) => {
    app.post('/api/pokemons', (req, res) => {
        Pokemon.find().then(pokemons => {
            const id = getUniqueId(pokemons);
            Pokemon.create({ ...req.body, ...{_id: id}}) ////On ajoute _id  dans notre requête depuis ici et le reste se trouve directement dans la collection
            .then(pokemon => {
                const message = `Le pokémon ${req.body.name} a bien été créé`;
                res.json(success(message, pokemon));
            });
        });
    });
}