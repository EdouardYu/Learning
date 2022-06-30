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
import { AddPokemonComponent } from './add-pokemon/add-pokemon.component';
import { LoaderComponent } from './loader/loader.component';
import { AuthGuard } from '../auth.guard';


const pokemonRoutes: Routes = [
  { path: 'pokemon/:name/edit', component: EditPokemonComponent, canActivate: [AuthGuard] }, //canActivate est un boolean qui permet d'aller suur cette page ou non
  { path: 'pokemon/add', component: AddPokemonComponent, canActivate: [AuthGuard] },
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
    EditPokemonComponent,
    AddPokemonComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule, //pour les *ngIf et les *ngFor
    FormsModule,
    RouterModule.forChild(pokemonRoutes)
  ],
  providers : [PokemonService] // Services disponible que dans ce module
})
export class PokemonModule { }
