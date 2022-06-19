import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-edit-pokemon',
  template: `
    <h2 class="center" style="font-weight:bold;">Editer {{ pokemon?.name }}</h2>
    <p *ngIf="pokemon" class="center">
      <img [src]="pokemon.picture"/>
    </p>
    <app-pokemon-form *ngIf="pokemon" [pokemon]="pokemon"></app-pokemon-form> 
    <!--balise personalisé selector avec comme paramètre le nom du pokémon sélectionné-->
    <!--le fait de séparer form et edit permet au cas où on veut réutiliser le pokemon-form,
     on a pas besoin de le recréer comme par exemple pour un ajout de pokémon-->
  `,
})
export class EditPokemonComponent implements OnInit {
  pokemon: Pokemon|undefined;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    const pokemonName: string|null = this.route.snapshot.paramMap.get('name');
    if(pokemonName) {
      this.pokemon = this.pokemonService.getPokemonByName(pokemonName);
    } else {
      this.pokemon = undefined;
    }
  }

}
