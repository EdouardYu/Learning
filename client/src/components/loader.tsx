import { FunctionComponent, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Loader: FunctionComponent = () => {
  const [error, setError] = useState(false);

  useEffect(() => {
    // un timeout pour changer le template après 2 secondes (2000 millisecondes)
    const timer = setTimeout(() => {
      setError(true);
    }, 2000);

    // nettoyage du timeout si le composant est démonté avant que le timeout soit terminé
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {!error ? (
        <div className="preloader-wrapper big active" style={{ top: "20px" }}>
          <div className="spinner-layer spinner-blue">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h4 className="center">Ce pokémon n'existe pas !</h4>
          <Link to="/" className="waves-effect waves-teal btn-flat">
            Retour à la liste de pokémons
          </Link>
        </div>
      )}
    </div>
  );
};

export default Loader;
