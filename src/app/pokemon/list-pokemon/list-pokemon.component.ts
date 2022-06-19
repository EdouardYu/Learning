import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',

})
export class ListPokemonComponent implements OnInit {
  pokemonList: Pokemon[];
  //pokemonSelected: Pokemon|undefined;

  ngOnInit(): void {
    this.pokemonList = this.pokemonService.getPokemonList();
    console.table(this.pokemonList);
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
}
