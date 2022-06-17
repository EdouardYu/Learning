import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  // providers: [PokemonService] permet au component detail d'avoir son service unique, généralement sans intérêt
})
export class DetailPokemonComponent implements OnInit {
  pokemon: Pokemon|undefined;

  constructor(private route: ActivatedRoute, private router: Router, private pokemonService: PokemonService) {
    //On instancie jamais un service
  }

  ngOnInit(): void {
    const pokemonName: string|null = this.route.snapshot.paramMap.get('name'); //snapshot -> A l'instant T, paramMap -> tableau avec tous les tableaux d'une URL
    if(pokemonName) {
      this.pokemon = this.pokemonService.getPokemonByName(pokemonName);
    }
  }

  goToPokemonList() {
    this.router.navigate(['pokemons']);
  }
}
