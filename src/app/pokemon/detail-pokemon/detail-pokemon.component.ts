import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  // providers: [PokemonService] permet au component detail d'avoir son service unique, généralement sans intérêt
})
export class DetailPokemonComponent implements OnInit {
  pokemon: Pokemon|undefined;
  auth: AuthService;

  constructor(private route: ActivatedRoute, private router: Router, private pokemonService: PokemonService, private authService: AuthService) {
    //On instancie jamais un service
  }

  ngOnInit(): void {
    const pokemonName: string|null = this.route.snapshot.paramMap.get('name'); //snapshot -> A l'instant T, paramMap -> tableau avec tous les tableaux d'une URL
    if(pokemonName) {
      this.pokemonService.getPokemonByName(pokemonName).subscribe(pokemon => this.pokemon = pokemon); //par observable
      //this.pokemon = this.pokemonService.getPokemonByName(pokemonName); //standard
    }
    this.auth = this.authService;
  }

  goToPokemonList() {
    this.router.navigate(['pokemons']);
  }

  goToEditPokemon(pokemon: Pokemon) {
    this.router.navigate(['pokemon/', pokemon.name, 'edit']);
  }

  deletePokemon(pokemon: Pokemon) {
    if(this.auth.isLoggedIn) {
      this.pokemonService.deletePokemonByName(pokemon.name).subscribe(() => this.goToPokemonList());
    } else {
      this.router.navigate(['login']);
    }
  }
}
