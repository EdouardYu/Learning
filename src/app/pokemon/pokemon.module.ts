import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPokemonComponent } from './list-pokemon/list-pokemon.component';
import { DetailPokemonComponent } from './detail-pokemon/detail-pokemon.component';
import { BorderCardDirective } from './border-card.directive';
import { PokemonTypeColorPipe } from './pokemon-type-color.pipe';
import { RouterModule, Routes } from '@angular/router';
import { PokemonService } from './pokemon.service';
import { FormsModule } from '@angular/forms';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import { EditPokemonComponent } from './edit-pokemon/edit-pokemon.component';


const pokemonRoutes: Routes = [
  { path: 'edit/pokemon/:name', component: EditPokemonComponent },
  { path: 'pokemons', component: ListPokemonComponent },
  { path: 'pokemon/:name', component: DetailPokemonComponent }, // :quelque-chose -> url en paramètre
];

@NgModule({
  declarations: [
    ListPokemonComponent,
    DetailPokemonComponent,
    PokemonFormComponent,
    BorderCardDirective,
    PokemonTypeColorPipe,
    EditPokemonComponent
  ],
  imports: [
    CommonModule, //pour les *ngIf et les *ngFor
    FormsModule,
    RouterModule.forChild(pokemonRoutes)
  ],
  providers : [PokemonService] // Services disponible que dans ce module
})
export class PokemonModule { }
