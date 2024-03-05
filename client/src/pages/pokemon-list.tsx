import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import usePokemons from "../hooks/pokemon.hook";
import PokemonCard from "../components/pokemon-card/pokemon-card";
import PokemonSearch from "../components/pokemon-search";

const PokemonList: FunctionComponent = () => {
  // Ceci est un hook personnalisé
  const pokemons = usePokemons();

  return (
    <div>
      <h1 className="center">Pokédex</h1>
      <div className="container">
        <div className="row">
          <PokemonSearch />
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
        <Link
          className="btn-floating btn-large waves-effect waves-light z-depth-3"
          style={{ position: "fixed", bottom: "25px", right: "25px" }}
          to="/pokemons/add"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default PokemonList;
