export class Pokemon {
    id: number;
    hp: number
    cp: number;
    name: string;
    picture: string;
    types: string[];
    created: Date;
  
    constructor(
      name: string = 'entrer un nom',
      hp: number = 0,
      cp: number = 0,
      picture: string = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/xxx.png',
      types: string[] = ['Normal'],
      created: Date = new Date()
      ) {
      this.hp = hp;
      this.cp = cp;
      this.name = name;
      this.picture = picture;
      this.types = types;
      this.created = created;
    }
  }