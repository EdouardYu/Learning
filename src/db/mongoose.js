const mongoose = require('mongoose');
//const pokemons = require('./mock-pokemon');
//const Pokemon = require('../models/model-pokemon');
//const User = require('../models/model-user')
//const bcrypt = require('bcrypt')

let user = "EdouardY";
let pwd = "Pokemon";
let dbName = "Pokedex";

mongoose.connect(
    `mongodb+srv://${user}:${pwd}@pokedex.0x0ypzs.mongodb.net/${dbName}?retryWrites=true&w=majority`
).then(() => console.log(`Connexion à la base de données : ${dbName} avec succès`)
).catch(error => console.log(error));

//Pour créer les tables des 12 pokémons et d'un utilisateur sur la basse de données (à utiliser que si la collection n'existe pas):
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

bcrypt.hash('Pokemon', 10).then(hash => {
  user = User.create({
    _id: 1,
    username: 'EdouardY',
    password: hash
  });
});
*/


