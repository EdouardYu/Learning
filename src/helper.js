exports.success = (message, data) => {
    return { message, data }
}

exports.getUniqueId = (pokemons) => {
    const pokemonsIds = pokemons.map(pokemon => pokemon._id); //Map marche comme un boucle for qui retourne un nouveau tableau
    const maxId = pokemonsIds.reduce((a,b) => Math.max(a, b)); //On compare deux éléments deux à deux du map et on retourne l'id le plus grand
    const uniqueId = maxId + 1;
    return uniqueId;
}