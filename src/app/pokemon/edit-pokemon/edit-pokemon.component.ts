import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-edit-pokemon',
  template: `
    <h2 *ngIf="pokemon" class="center" style="font-weight:bold; cursor: default;">Editer {{ pokemon?.name }}</h2>
    <p *ngIf="pokemon" class="center">
      <img [src]="pokemon.picture"/>
    </p>
    <app-pokemon-form *ngIf="pokemon" [pokemon]="pokemon"></app-pokemon-form> 
    <!--balise personalisé selector avec comme paramètre le nom du pokémon sélectionné-->
    <!--le fait de séparer form et edit permet au cas où on veut réutiliser le pokemon-form,
     on a pas besoin de le recréer comme par exemple pour un ajout de pokémon-->
    <h4 *ngIf="!pokemon" class="center">
      <app-loader></app-loader>
    </h4>
  `,
})
export class EditPokemonComponent implements OnInit {
  pokemon: Pokemon|undefined;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    const pokemonName: string|null = this.route.snapshot.paramMap.get('name');
    if(pokemonName) {
      this.pokemonService.getPokemonByName(pokemonName).subscribe(pokemon => this.pokemon = pokemon);
      //this.pokemon = this.pokemonService.getPokemonByName(pokemonName);
    } else {
      this.pokemon = undefined;
    }
  }

}
