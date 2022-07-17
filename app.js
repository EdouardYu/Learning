console.log('Hello World!');

const express = require('express'); //créer la dépendance du fichier au fichier express
const favicon = require('serve-favicon');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('./src/db/mongoose');

const app = express(); // créer une instance de l'application express, c'est un serveur web
const port = 3000;

//On renvoie le middleware d'application de l'URL dans le terminal :
/*
app.use((req, res, next) => {
    console.log(`URL : ${req.url}`);
    next();
});
*/
//Ou
app.use(favicon(__dirname + '/pokeball.ico')).use(morgan('dev')).use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!')); // coeur de express : '/' est la route par défaut vers l'application 
// et la suite donne la réponse qu'on souhaite, l'argument req permet de récuper un objet request et correspond à la requête reçu en entrée, et res est la reponse  

app.get('/api/pokemon/:id/:name', (req, res) => {
    const id = req.params.id; //récupérer l'ID (string) via le champs de navigation
    const name = req.params.name; //récupérer le nom (string) via le champs de navigation
    res.send(`Pokémon numéro ${id} est ${name}`);
});

/*
app.get('/api/pokemon/:id', (req, res) => {
    const id = parseInt(req.params.id); // on doit convertir en int sinon erreur ici car l'id passé est un string 
    // car express rend qu'un string
    // or son identifiant n'est de base pas un string mais un number d'où l'erreur dans la navigation
    const pokemon = pokemons.find(pokemon => pokemon.id === id);
    res.json(pokemon); // permet de renvoyé une réponse http sous format json et de type MIME Content-Type : application/json
});
*/

require('./src/routes/findAllPokemons')(app);
require('./src/routes/findPokemonByName')(app);

//Ajout de pokémon :
/*
app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons);
    const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}};  //id et created sont deux propriété qu'on ajoute dans notre requête depuis ici
    pokemons.push(pokemonCreated); //enfaite on renvoie toute la liste de pokémon avec l'ajout
    const message = `Le pokémon ${pokemonCreated.name} a bien été créé`;
    res.json(success(message, pokemonCreated));
});*/

require('./src/routes/createPokemon')(app);

//Modification de  pokémon :
/*
app.put('/api/pokemon/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonUpdated = { ...req.body, id: id };
    pokemons = pokemons.map(pokemon => { return pokemon.id === id ? pokemonUpdated : pokemon }); //enfaite on renvoie toute la liste de pokémon avec les modifications
    const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié`;
    res.json(success(message, pokemonUpdated));
});
*/

require('./src/routes/updatePokemon')(app);

//Suppression d'un pokémon :
/*
app.delete('/api/pokemon/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id);
    pokemons = pokemons.filter(pokemon => pokemon.id !== id); //enfaite on renvoie toute la liste de pokémon avec la supression
    const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé`;
    res.json(success(message, pokemonDeleted));
});
*/

require('./src/routes/deletePokemon')(app);

//Page error 404 :
app.use(({res}) => {
    const message = 'Erreur 404 : Impossible de trouver la ressource demandée ! Vous pouvez essayer une auutre URL';
    res.status(404).json({message});
});

app.listen(port, () => console.log(`L'application Node est démarrée sur : http://localhost:${port}`));//au démarrage de l'application
// On ne peut pas rafréchir la page si on ajoute uun élément, il faut couper et redémarrer l'application