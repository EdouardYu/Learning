import { FunctionComponent, useState, useEffect, useRef } from "react";
import { RouteComponentProps } from "react-router-dom";
import PokemonForm from "../components/pokemon-form";
import Pokemon from "../models/pokemon";
import PokemonService from "../services/pokemon-service";
import Loader from "../components/loader";

type Params = { name: string };

const PokemonEdit: FunctionComponent<RouteComponentProps<Params>> = ({
  match,
}) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const flag = useRef(false);

  useEffect(() => {
    if (flag.current === false) {
      PokemonService.getPokemon(match.params.name).then((response) => {
        if (response.data) {
          const pokemon: Pokemon = {
            ...response.data,
            ...{ created: new Date(response.data.created) },
          };
          setPokemon(pokemon);
        }
      });
    }

    return () => {
      flag.current = true;
    };
  }, [match.params.name]);

  return (
    <div>
      {pokemon ? (
        <div className="row">
          <h2 className="header center">Éditer {pokemon.name}</h2>
          <PokemonForm pokemon={pokemon} isEditForm={true}></PokemonForm>
        </div>
      ) : (
        <div className="center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default PokemonEdit;
