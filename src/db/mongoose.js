const mongoose = require('mongoose');
//const pokemons = require('./mock-pokemon');
const Pokemon = require('../models/model-pokemon');

let user = "EdouardY";
let pwd = "Azerty";
let dbName = "pokedex";

mongoose.connect(
    `mongodb+srv://${user}:${pwd}@pokedex.teywrbz.mongodb.net/${dbName}?retryWrites=true&w=majority`
).then(() => console.log(`Connexion à la base de données : ${dbName} avec succès`)
).catch(error => console.log(error));

//Pour créer la base des 12 pokémons sur la basse de données (à utiliser que si la collection n'existe pas):
/*
pokemons.map(pokemon => {
  pokemon = Pokemon.create({
    _id: pokemon.id,
    name: pokemon.name,
    hp: pokemon.hp,
    cp: pokemon.cp,
    picture: pokemon.picture,
    types: pokemon.types
  });
});
*/


