const formatType = (type: string): string => {
  let color: string;

  switch (type) {
    case "Normal":
      color = "grey lighten-1";
      break;
    case "Feu":
      color = "orange darken-1";
      break;
    case "Eau":
      color = "blue";
      break;
    case "Plante":
      color = "green";
      break;
    case "Électrik":
      color = "yellow";
      break;
    case "Glace":
      color = "blue lighten-4";
      break;
    case "Combat":
      color = "deep-orange darken-4";
      break;
    case "Poison":
      color = "purple";
      break;
    case "Sol":
      color = "orange accent-1";
      break;
    case "Vol":
      color = "indigo accent-1";
      break;
    case "Psy":
      color = "pink lighten-1";
      break;
    case "Insecte":
      color = "lime darken-2";
      break;
    case "Roche":
      color = "lime darken-4";
      break;
    case "Spectre":
      color = "deep-purple darken-3";
      break;
    case "Dragon":
      color = " deep-purple accent-4";
      break;
    case "Ténèbre":
      color = "brown darken-4";
      break;
    case "Acier":
      color = "blue-grey lighten-3";
      break;
    case "Fée":
      color = "pink lighten-2";
      break;
    default:
      color = "grey lighten-1";
      break;
  }

  return `chip ${color}`;
};

export default formatType;
