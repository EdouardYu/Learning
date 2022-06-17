import { Injectable } from '@angular/core';
import { POKEMONS } from './mock-pokemon-list';
import { Pokemon } from './pokemon';

@Injectable(
  //{providedIn: 'root' rend les services disponibles à l'ensemble de l'application}
  )
export class PokemonService {
  getPokemonList(): Pokemon[] {
    return POKEMONS;
  }

  getPokemonByName(pokemonName: string): Pokemon|undefined {
    return POKEMONS.find(ponkemon => ponkemon.name == pokemonName);
  }

  getPokemonTypeList(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Vol',
      'Electrik',
      'Sol',
      'Fée',
      'Poison'];
  }
}
