import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonTypeColor'
})
export class PokemonTypeColorPipe implements PipeTransform {

  transform(type: string): string {
    let color: string;
  
    switch (type) {
      case 'Feu':
        color = 'orange darken-1';
        break;
      case 'Eau':
        color = 'blue';
        break;
      case 'Plante':
        color = 'green';
        break;
      case 'Insecte':
        color = 'lime darken-2';
        break;
      case 'Normal':
        color = 'grey lighten-1';
        break;
      case 'Vol':
        color = 'indigo accent-1';
        break;
      case 'Poison':
        color = 'purple';
        break;
      case 'Fée':
        color = 'pink lighten-2';
        break;
      case 'Electrik':
        color = 'yellow';
        break;
      case 'Sol':
        color = 'orange accent-1';
        break;
      default:
        color = 'grey lighten-1';
        break;
    }
  
    return 'chip ' + color
  }
}
