import { useState, useEffect, useRef } from "react";
//import { useHistory } from "react-router-dom";
import Pokemon from "../models/pokemon";
import PokemonService from "../services/pokemon-service";

// Ceci est un hook personnalisé
const usePokemons = () => {
  //const history = useHistory();

  // ce hook personnalisé comporte d'autres hooks (useState et useEffect ici)
  // les crochets servent pour le destructuring d'es6
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  // Au lieu de :
  // const pokemonsStateVariable = useState<Pokemon[]>([]);
  // const pokemons = pokemonsStateVariable[0];
  // const setPokemons = pokemonsStateVariable[1];
  // Pour récupérer seulement les pokémons, on peut faire :
  // const [pokemons] = useState<Pokemon[]>(POKEMONS);

  const flag = useRef(false);

  useEffect(() => {
    if (flag.current === false) {
      PokemonService.getPokemons().then((response) => {
        if (response.data) {
          const pokemons: Pokemon[] = response.data.map((pokemon: Pokemon) => ({
            ...pokemon,
            ...{ created: new Date(pokemon.created) },
          }));
          setPokemons(pokemons);
        }
      });
    }

    return () => {
      flag.current = true;
    };
  }, []);
  // le tableau vide en argument permet d'éviter de déclencher
  // le hook d'effet à chaque modification du composant
  // il se déclenche que lors du premier rendu
  // Si on ajoute des dépendances au tableau, le hook se déclenchera aussi
  // lors de des modifications de ses dépendances
  // Si, on ne met rien, le hook s'active à chaque modification du composant
  return pokemons;
};

export default usePokemons;
