import { ChangeEvent, FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import Pokemon from "../models/pokemon";
import PokemonService from "../services/pokemon-service";

const PokemonSearch: FunctionComponent = () => {
  const [term, setTerm] = useState<string>("");
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value;
    setTerm(term);

    // On n'effectue pas de recherche s'il y a moins de deux caractères
    if (term.length < 2) {
      setPokemons([]);
      return;
    }

    PokemonService.searchPokemons(term).then((response) => {
      if (response.data) {
        const pokemons: Pokemon[] = response.data.map((pokemon: Pokemon) => {
          return { ...pokemon, ...{ created: new Date(pokemon.created) } };
        });
        setPokemons(pokemons);
      }
    });
  };

  return (
    <div className="row">
      <div className="col s12 m6 offset-m3">
        <div className="card">
          <div className="card-content">
            <div className="input-field">
              <input
                type="text"
                placeholder="Rechercher un pokémon"
                value={term}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="collection">
              {pokemons.map((pokemon) => (
                <Link
                  key={pokemon.name}
                  to={`/pokemons/${pokemon.name}`}
                  className="collection-item"
                >
                  {pokemon.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonSearch;
