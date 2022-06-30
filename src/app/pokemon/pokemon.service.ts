import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { POKEMONS } from './mock-pokemon-list';
import { Pokemon } from './pokemon';

@Injectable(
  //{providedIn: 'root' rend les services disponibles à l'ensemble de l'application}
  )
export class PokemonService {
  //Pour retourner un observable (asynchrone):

  constructor(private http: HttpClient) {}

  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]> ('api/pokemons').pipe( //api/pokemon est l'URL demandé
      tap((pokemonList) => console.table(pokemonList)), //tap est un cosole.log adapté à un observable
      catchError((error) => {
        console.log(error);
        return of([]); //on retourne un tableau vide plutôt qu'un undefined
      })
    )//un flux qui contient une liste de pokémon ou un échec
  }

  getPokemonByName(pokemonName: string): Observable<Pokemon|undefined> {
    let pokemonId = POKEMONS.find(ponkemon => ponkemon.name == pokemonName)?.id;
    return this.http.get<Pokemon> (`api/pokemons/${pokemonId}`).pipe( //Permet d'accèder qu'à partir de l'ID
      tap((pokemon) => console.log(pokemon)), 
      catchError((error) => this.handleError(error, undefined))
    )
  }

  updatePokemon(pokemon: Pokemon): Observable<null> {
    const httpOptions = {
      headers : new HttpHeaders({ 'Content-Type': 'application/json' }) //permet de dire qu'on envoie les requêtes en json
    };
    return this.http.put('api/pokemons/', pokemon, httpOptions).pipe(
      tap((response) => console.log(response)), 
      catchError((error) => this.handleError(error, null))
    )
  }

   addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    const httpOptions = {
      headers : new HttpHeaders({ 'Content-Type': 'application/json' }) 
    };
    return this.http.post<Pokemon>('api/pokemons/', pokemon, httpOptions).pipe(
      tap((response) => console.log(response)), 
      catchError((error) => this.handleError(error, undefined))
    )
  }

  deletePokemonByName(pokemonName : string): Observable<null> {
    let pokemonId = POKEMONS.find(ponkemon => ponkemon.name == pokemonName)?.id;
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe( //Supprime qu'à partir de l'ID
      tap((response) => console.log(response)), 
      catchError((error) => this.handleError(error, null))
    )
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue); 
  }

  searchPokemonList(term: string): Observable<Pokemon[]> {
    if(term.length < 1) {
      return of([]);
     }
    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe( 
    tap((response) => console.log(response)), 
    catchError((error) => this.handleError(error, []))
    )
  }
  getPokemonTypeList(): string[] {
    return [
      'Normal',
      'Feu',
      'Eau',
      'Plante',
      'Electrik',
      'Glace',
      'Combat',
      'Poison',
      'Sol',
      'Vol',
      'Psy',
      'Insecte',
      'Roche',
      'Spectre',
      'Dragon',
      'Ténèbre',
      'Acier',
      'Fée'
    ];
  }

  //Pour retourner une constante (synchrone):

  /*getPokemonList(): Pokemon[] { 
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
  */
}
