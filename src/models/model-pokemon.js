const mongoose = require('mongoose');

const pokemon = mongoose.Schema({
    _id: {
        type: Number,
        required: true,
        min: 0
      },
    name: {
        type: String,
        required: true,
        match: /^([A-ZÆŒ]{1})([A-Za-z0-9éàèùâêîôûäëïöüÿçæœ.: -]{0,24})$/
      },
      hp: {
        type: Number,
        required: true,
        min: 1,
        max: 255
      },
      cp: {
        type: Number,
        required: true,
        min: 1,
        max: 255
      },
      picture: {
        type: String,
        required: true,
        match: /^(https:\/\/assets\.pokemon\.com\/assets\/cms2\/img\/pokedex\/detail\/)([0-9]{3})(\.png)$/
      },
      types: {
        type: [String],
        required: true,
        enum: ['Normal', 'Feu', 'Eau', 'Plante', 'Electrik', 'Glace', 'Combat', 'Poison', 'Sol', 'Vol', 'Psy', 'Insecte', 'Roche', 'Spectre', 'Dragon', 'Fée']
      },
      created: {
        type: Date,
        default: Date.now
      } 
}, { versionKey: false });

module.exports = mongoose.model('Pokemon',pokemon);

