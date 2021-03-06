import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css'], //pour mettre un fichier css
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon: Pokemon; //Contrat avec l'interface pour avoir un pokémon
  types: string[];
  isAddForm: boolean;
  static id: any;

  constructor(private pokemonService: PokemonService, private router: Router) { }

  ngOnInit(): void {
    this.types = this.pokemonService.getPokemonTypeList();
    this.isAddForm = this.router.url.includes('add');
  }

  hasType(type: string): boolean{
    return this.pokemon.types.includes(type); //includes permet de savoir s'il possède type
  }

  selectType($event: Event, type: string){
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;
    if(isChecked) {
      this.pokemon.types.push(type); //ajouter un type au pokémon
    } else {
      const index: number = this.pokemon.types.indexOf(type);
      this.pokemon.types.splice(index, 1); //retir un type au pokémon
    }
  }

  isTypesValid(type: string): boolean {
    if(this.pokemon.types.length == 1 && this.hasType(type)) {
      return false;
    } else if(this.pokemon.types.length == 2 && !this.hasType(type)) {
      return false;
    } else {
      return true;
    }
  }

  onSubmit(){
    if(this.isAddForm) {
      this.pokemonService.addPokemon(this.pokemon).subscribe((pokemon: Pokemon) => this.router.navigate(['pokemon/', pokemon.name]));
    } else {
      this.pokemonService.updatePokemon(this.pokemon).subscribe(() => this.router.navigate(['pokemon/', this.pokemon.name]));
    }
  }  
}
