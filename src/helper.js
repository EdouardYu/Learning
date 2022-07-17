exports.success = (message, data) => {
    return { message, data }
}

exports.getUniqueId = (pokemons) => {
    if(pokemons.length > 0) {
        const pokemonsIds = pokemons.map(pokemon => pokemon._id); //Map marche comme un boucle for qui retourne un nouveau tableau
        const maxId = pokemonsIds.reduce((a,b) => Math.max(a, b)); //On compare deux éléments deux à deux du map et on retourne l'id le plus grand
        const uniqueId = maxId + 1;
        return uniqueId;
    }
    return 1;
}

exports.pluralize = (count, singular, plural) => {
    const correctStringVersion = count <= 1 ? singular : plural;
    const correctString = count + ' ' + correctStringVersion
    return correctString;
}