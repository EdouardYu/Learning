import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',

})
export class ListPokemonComponent implements OnInit {
  pokemonList: Pokemon[];
  //pokemonSelected: Pokemon|undefined;
    // Recherche de flux dans le temps et permet de piloter les observables :
  searchTerms = new Subject<string>(); //Subject appartient à RxJS
  pokemons$: Observable<Pokemon[]>;
  noTerm: boolean = true;

  ngOnInit(): void {
    this.pokemonService.getPokemonList().subscribe(pokemonList => this.pokemonList = pokemonList); //on récupère pokemonList et on la pousse dans this.pokemonList
    //this.pokemonList = this.pokemonService.getPokemonList();
    console.table(this.pokemonList);
    this.pokemons$ = this.searchTerms.pipe(
      debounceTime(300), // (RxJS) On attend 300 ms avant d'envoyer une requête au serveur pour consommer moins de ressources
      distinctUntilChanged(), //(RxJS) On s'assure que les requêtes successives ne sont pas identiques avant d'envoyer une requête
      //map((term) => this.pokemonService.searchPokemonList(term)), Renvoie un observable 
      //Si on veut pas l'observable mais juste l'objet à l'intérieur :
      //concatMap ou mergeMap ou switchMap
      //Si la requête précédente n'est pas terminé mais qu'on a fondamentalement pas besoin
      //et qu'on veut seulement la requête la plus récente, on peut utiliser switchMap
      switchMap((term) => this.pokemonService.searchPokemonList(term)
      )
    );
  }
 /*
  Méthodes recherche avec une barre de recherche :
  selectPokemon(event : MouseEvent){
    const index: number = +(event.target as HTMLInputElement).value;
    console.log(`Vous avez sélectioné ${this.pokemonList[index].name}.`);
    //ou
    // console.log('Vous avez sélectioné ' + pokemonList[index].name +'.');
  }
  selectPokemon(pokemonId: string){
    const id = +pokemonId;
    const pokemon: Pokemon|undefined = this.pokemonList.find(pokemon => pokemon.id == +pokemonId)
    if(pokemon){
      console.log(`Vous avez demandé ${pokemon.name}.`);
      this.pokemonSelected = pokemon;
    } else {
      console.log(`Vous avez demandé un pokémon qui n'existe pas.`);
      this.pokemonSelected = pokemon;
    } 
  }
  */
  selectPokemon(pokemonName: string){
      console.log(`Vous avez sélectioné ${pokemonName}.`);
  }

  constructor(private router: Router, private pokemonService: PokemonService) {}

  goToPokemon(pokemon: Pokemon) {
    this.router.navigate(['pokemon/', pokemon.name]);
  }

  search(term: string) {
    this.searchTerms.next(term);
    if(term) {
      this.noTerm = false;
    } else {
      this.noTerm = true;
    }
  }
}
