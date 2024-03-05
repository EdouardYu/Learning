import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

const PageNotFound: FunctionComponent = () => {
  return (
    <div className="center">
      <img
        src="http://assets.pokemon.com/assets/cms2/img/pokedex/full/050.png"
        alt="Page non trouvée"
      />
      <h4>
        Hey jeune dresseur/dresseuse, il semblerait que tu t'es perdu(e) sur la
        route 404 !
      </h4>
      <Link to="/" className="waves-effect waves-teal btn-flat">
        Utiliser la capacité Vol
      </Link>
    </div>
  );
};

export default PageNotFound;
