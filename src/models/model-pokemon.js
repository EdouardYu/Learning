const mongoose = require('mongoose');

const pokemon = mongoose.Schema({
    _id: {
        type: Number,
        required: true,
        min: 0,
        validate : Number.isInteger
      },
    name: {
        type: String,
        required: [true, 'Veuillez renseigner le nom du pokémon.'],
        match: [/^([A-ZÆŒ]{1})([A-Za-z0-9éàèùâêîôûäëïöüÿçæœ.: -]{0,24})$/, 
              'Le nom du pokémon doit commencer par une lettre en Majuscule et contenir entre 1 et 25 caractères.']
      },
      hp: {
        type: Number,
        required: [true, 'Veuillez renseigner les points de vie du pokémon.'],
        min: [1, 'Les points de vie du pokémon doivent être un entier compris entre 1 et 255.'],
        max: [255, 'Les points de vie du pokémon doivent être un entier compris entre 1 et 255.'],
        validate : [Number.isInteger, 'Les points de vie du pokémon doivent être un entier compris entre 1 et 255.']
      },
      cp: {
        type: Number,
        required: [true, 'Veuillez renseigner les points d\'attaque du pokémon.'],
        min: [1, 'Les points d\'attaque du pokémon doivent être un entier compris entre 1 et 255.'],
        max: [255, 'Les points d\'attaque du pokémon doivent être un entier compris entre 1 et 255.'],
        validate : [Number.isInteger, 'Les points d\'attaque du pokémon doivent être un entier compris entre 1 et 255.']
      },
      picture: {
        type: String,
        required: [true, 'Veuillez mettre une image de pokémon.'],
        match: [/^(https:\/\/assets\.pokemon\.com\/assets\/cms2\/img\/pokedex\/detail\/)([0-9]{3})(\.png)$/,
              'Veuillez renseigner une URL valide']
      },
      types: {
        type: [{
                type: String,
                require: true
              }],
        required: [true, 'Le pokémon doit posséder un au moins un type et au maximum deux types'],
        enum: {
          values: ['Normal', 'Feu', 'Eau', 'Plante', 'Electrik', 'Glace', 'Combat', 'Poison', 'Sol', 'Vol', 'Psy', 'Insecte', 'Roche', 'Spectre', 'Dragon', 'Fée'],
          message: '{VALUE} n\'est pas un type de pokémon'
        },
        validate: [pokemonTypes, 'Le pokémon doit posséder un au moins un type et au maximum deux types']
      },
      created: {
        type: Date,
        default: Date.now
      } 
}, { versionKey: false });

module.exports = mongoose.model('Pokemon',pokemon);

function pokemonTypes(val) {
  return val.length > 0 && val.length <= 2;
}