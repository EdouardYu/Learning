const Pokemon = require('../models/model-pokemon');
const { success } = require('../helper');
  
module.exports = (app) => {
  app.get('/api/pokemon/:name', (req, res) => {
    const name = req.params.name;
    Pokemon.findOne({name: name}).then(pokemon => {
        let message = '';
        if(pokemon){
            message = 'Un pokémon a bien été trouvé';
        } else {
            message = 'Ce pokémon n\'existe pas';
        }
        res.json(success(message, pokemon));
      });
  });
}