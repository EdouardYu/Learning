import { Component} from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div class='center'>
      <img src="http://assets.pokemon.com/assets/cms2/img/pokedex/full/035.png"/>
      <h1 style="font-weight: bold; font-size: 24px">Hey jeune dresseur/dresseuse, il semblerait que tu t'es perdu(e) sur la route 404 !</h1>
      <a routerLink="/pokemons" class="waves-effect waves-teal btn-flat">
       Utiliser CS Vol sur mon roucool 
      </a>
    </div>
  `
})
export class PageNotFoundComponent {}
