import Pokemon from "../models/pokemon";

type Response = {
  message: string;
  data: any;
};

const baseURL: string = "http://localhost:3001/api";

export default class PokemonService {
  static getPokemons(): Promise<Response> {
    return fetch(`${baseURL}/pokemons?limit=20`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static getPokemon(name: string): Promise<Response> {
    return fetch(`${baseURL}/pokemon/${name}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static updatePokemon(pokemon: Pokemon): Promise<Response> {
    return fetch(`${baseURL}/pokemon/${pokemon._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(pokemon),
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static deletePokemon(pokemon: Pokemon): Promise<Response> {
    return fetch(`${baseURL}/pokemon/${pokemon._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static addPokemon(pokemon: Pokemon): Promise<Response> {
    return fetch(`${baseURL}/pokemons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(pokemon),
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static searchPokemons(term: string): Promise<Response> {
    return fetch(`${baseURL}/pokemons?name=${term}&limit=20`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static handleError(error: Error): void {
    console.log(error);
    window.location = "/server/error" as unknown as Location;
    // window.location : sert pour la navigation en dehors du react,
    // attention si on manipule des states ou storages, on les perd car javascript rafraichi la page
  }

  // Permet de vérifier si l'objet est vide
  /*
  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }
  */
}
