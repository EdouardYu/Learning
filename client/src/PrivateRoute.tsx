import { Route, Redirect } from "react-router-dom";
import AuthenticationService from "./services/authentication-service";

// Le composant PrivateRoute est une surcouche personalisée de l'élément root de React
// component: Component permet de réccupérer le composent de la route, ex: PokemonList
// ...rest va réccupérer le reste des informations de la route, ex: { exact: true, path="/" }
const PrivateRoute = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    // render permet de redéfinir le comportement du composant Route ici
    render={(props) => {
      const isAuthenticated = AuthenticationService.isAuthenticated();
      if (!isAuthenticated) {
        return <Redirect to={{ pathname: "/login" }} />;
      }

      return <Component {...props} />;
    }}
  />
);

export default PrivateRoute;
