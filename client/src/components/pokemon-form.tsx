import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import { useHistory } from "react-router-dom";
import Pokemon from "../models/pokemon";
import formatType from "../helpers/format-type";
import PokemonService from "../services/pokemon-service";

type Props = {
  pokemon: Pokemon;
  isEditForm: boolean;
};

type Field = {
  value: any;
  error?: string;
  isValid?: boolean;
};

type Form = {
  picture: Field;
  name: Field;
  hp: Field;
  cp: Field;
  types: Field;
};

const PokemonForm: FunctionComponent<Props> = ({ pokemon, isEditForm }) => {
  const [form, setForm] = useState<Form>({
    picture: {
      value: +pokemon.picture.slice(pokemon.picture.lastIndexOf("/") + 1, -4),
      isValid: true,
    },
    name: { value: pokemon.name, isValid: true },
    hp: { value: pokemon.hp, isValid: true },
    cp: { value: pokemon.cp, isValid: true },
    types: { value: pokemon.types, isValid: true },
  });

  const history = useHistory();

  const types: string[] = [
    "Normal",
    "Feu",
    "Eau",
    "Plante",
    "Électrick",
    "Glace",
    "Combat",
    "Poison",
    "Sol",
    "Vol",
    "Psy",
    "Insecte",
    "Roche",
    "Spectre",
    "Dragon",
    "Ténèbre",
    "Acier",
    "Fée",
  ];

  const hasType = (type: string): boolean => {
    return form.types.value.includes(type);
  };

  // pour faire la communication bidirrectionnel en utilisant onChange et value (cf. plus bas)
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // name de la balise input
    const fieldName: string = e.target.name;
    // value de la balise input
    const fieldValue: string = e.target.value;
    const newField = {
      [fieldName]: { value: fieldValue },
    };

    // Il faut renseigner un state complet
    setForm({ ...form, ...newField });
  };

  const selectType = (type: string, e: ChangeEvent<HTMLInputElement>): void => {
    const checked = e.target.checked;
    let newField: Field;

    if (checked) {
      // Si l'utilisateur coche un type, on l'ajoute à la liste des types du pokémon
      const newTypes: string[] = form.types.value.concat([type]);
      newField = { value: newTypes };
    } else {
      // Si l'utilisateur décoche un type, on le retire de la liste des types du pokémon
      const newTypes: string[] = form.types.value.filter(
        (currentType: string) => currentType !== type
      );
      newField = { value: newTypes };
    }

    setForm({ ...form, ...{ types: newField } });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // Pour éviter la soumission classique du formulaire
    e.preventDefault();

    const url: string = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${form.picture.value
      .toString()
      .padStart(3, "0")}.png`;

    const isFormValid = validateForm(url);

    if (isFormValid) {
      pokemon.picture = url;
      pokemon.name = form.name.value;
      pokemon.hp = form.hp.value;
      pokemon.cp = form.cp.value;
      pokemon.types = form.types.value;

      console.log(pokemon);

      isEditForm ? updatePokemon() : addPokemon();
    }
  };

  const validateForm = (url: string) => {
    let newForm: Form = form;

    // Validator picture
    if (
      !/^https:\/\/assets.pokemon.com\/assets\/cms2\/img\/pokedex\/detail\/[0-9]{3,4}\.png$/.test(
        url
      ) ||
      +form.picture.value <= 0 ||
      +form.picture.value > 1025
    ) {
      const errorMsg: string =
        "Le numéro de pokémon n'est pas répertorié dans le pokédex national (1-1025)";
      const newField: Field = {
        value: form.picture.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ picture: newField } };
    } else {
      const newField: Field = {
        value: form.picture.value,
        error: "",
        isValid: true,
      };
      newForm = { ...newForm, ...{ picture: newField } };
    }

    // Validator name
    if (
      !/^[A-Za-z0-9ÉÀÈÆŒÂÙÂÊÎÔÛÄËÏÖÜŸÇÆŒéàèùâêîôûäëïöüÿçæœ.: -]{1,25}$/.test(
        form.name.value
      )
    ) {
      const errorMsg: string = "Le nom du pokémon est requis (1-25)";
      const newField: Field = {
        value: form.name.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ name: newField } };
    } else {
      const newField: Field = {
        value: form.name.value,
        error: "",
        isValid: true,
      };
      newForm = { ...newForm, ...{ name: newField } };
    }

    // Validator hp
    if (
      !/^[0-9]{1,3}$/.test(form.hp.value) ||
      +form.hp.value <= 0 ||
      +form.hp.value > 255
    ) {
      const errorMsg: string =
        "Les points de vie du pokémon sont compris entre 1 et 255";
      const newField: Field = {
        value: form.hp.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ hp: newField } };
    } else {
      const newField: Field = {
        value: form.hp.value,
        error: "",
        isValid: true,
      };
      newForm = { ...newForm, ...{ hp: newField } };
    }

    // Validator cp
    if (
      !/^[0-9]{1,3}$/.test(form.cp.value) ||
      +form.cp.value <= 0 ||
      +form.cp.value > 255
    ) {
      const errorMsg: string =
        "Les dégâts du pokémon sont compris entre 1 et 255";
      const newField: Field = {
        value: form.cp.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ cp: newField } };
    } else {
      const newField: Field = {
        value: form.cp.value,
        error: "",
        isValid: true,
      };
      newForm = { ...newForm, ...{ cp: newField } };
    }

    setForm(newForm);
    return (
      newForm.name.isValid &&
      newForm.hp.isValid &&
      newForm.cp.isValid &&
      newForm.picture.isValid
    );
  };

  const isTypesValid = (type: string): boolean => {
    // Empêche de déselectionner un type si celui-ci est l'unique type du
    //  mais on n'empêche pas de sélectionner un autre type
    if (form.types.value.length === 1 && hasType(type)) {
      return false;
    }

    // Empêche de sélectionner un nouveau type si le pokémon possède déjà deux types
    // mais on n'empêche pas de déselectionner un des deux types du pokémon
    if (form.types.value.length >= 2 && !hasType(type)) {
      return false;
    }

    return true;
  };

  const addPokemon = () => {
    PokemonService.addPokemon(pokemon).then(() => history.push("/pokemons"));
  };

  const updatePokemon = () => {
    PokemonService.updatePokemon(pokemon).then(() =>
      history.push(`/pokemons/${pokemon.name}`)
    );
  };

  const deletePkemon = () => {
    PokemonService.deletePokemon(pokemon).then(() => history.push("/pokemons"));
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable">
            {isEditForm && (
              <div className="card-image">
                <img
                  src={pokemon.picture}
                  alt={pokemon.name}
                  style={{ width: "250px", margin: "0 auto" }}
                />
                <span className="btn-floating halfway-fab waves-effect waves-light">
                  <i onClick={deletePkemon} className="material-icons">
                    delete
                  </i>
                </span>
              </div>
            )}
            <div className="card-stacked">
              <div className="card-content">
                {/* Pokemon picture */}
                <div className="form-group">
                  <label htmlFor="name">
                    Numéro de pokémon dans le pokédex national
                  </label>
                  <input
                    id="picture"
                    name="picture"
                    type="number"
                    className="form-control"
                    value={form.picture.value}
                    onChange={(e) => handleInputChange(e)}
                  ></input>
                  {form.picture.error && (
                    <div className="card-panel red accent-1">
                      {form.picture.error}
                    </div>
                  )}
                </div>
                {/* Pokemon name */}
                <div className="form-group">
                  <label htmlFor="name">Nom</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-control"
                    value={form.name.value}
                    onChange={(e) => handleInputChange(e)}
                  ></input>
                  {form.name.error && (
                    <div className="card-panel red accent-1">
                      {form.name.error}
                    </div>
                  )}
                </div>
                {/* Pokemon hp */}
                <div className="form-group">
                  <label htmlFor="hp">Points de vie</label>
                  <input
                    id="hp"
                    name="hp"
                    type="number"
                    className="form-control"
                    value={form.hp.value}
                    onChange={(e) => handleInputChange(e)}
                  ></input>
                  {form.hp.error && (
                    <div className="card-panel red accent-1">
                      {form.hp.error}
                    </div>
                  )}
                </div>
                {/* Pokemon cp */}
                <div className="form-group">
                  <label htmlFor="cp">Dégâts</label>
                  <input
                    id="cp"
                    name="cp"
                    type="number"
                    className="form-control"
                    value={form.cp.value}
                    onChange={(e) => handleInputChange(e)}
                  ></input>
                  {form.cp.error && (
                    <div className="card-panel red accent-1">
                      {form.cp.error}
                    </div>
                  )}
                </div>
                {/* Pokemon types */}
                <div className="form-group">
                  <label>Types</label>
                  {types.map((type) => (
                    <div key={type} style={{ marginBottom: "10px" }}>
                      <label>
                        <input
                          id={type}
                          type="checkbox"
                          className="filled-in"
                          value={type}
                          disabled={!isTypesValid(type)}
                          checked={hasType(type)}
                          onChange={(e) => selectType(type, e)}
                        ></input>
                        <span>
                          <p className={formatType(type)}>{type}</p>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-action center">
                {/* Submit button */}
                <button type="submit" className="btn">
                  Valider
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PokemonForm;
