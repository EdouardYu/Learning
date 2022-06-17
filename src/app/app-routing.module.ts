import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  // En haut routes les plus spécifiques
  { path: '', redirectTo: 'pokemons', pathMatch: 'full' }, //route par défaut
  { path : '**', component: PageNotFoundComponent } //le reste des routes non intercepté avant ou non déclaré
  // En bas les routes les plus globales
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
