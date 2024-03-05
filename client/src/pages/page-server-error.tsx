import { FunctionComponent } from "react";

const PageServerError: FunctionComponent = () => {
  return (
    <div className="center">
      <img
        src="http://assets.pokemon.com/assets/cms2/img/pokedex/full/067.png"
        alt="Page non trouvée"
      />
      <h4>
        Hey jeune dresseur/dresseuse, il semblerait que ton pokedex soit cassé,
        confie-la-nous, nous allons le réparer dans les plus brefs délais
      </h4>
    </div>
  );
};

export default PageServerError;
