import { FunctionComponent } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import PokemonList from "./pages/pokemon-list";
import PokemonAdd from "./pages/pokemon-add";
import PokemonsDetail from "./pages/pokemon-detail";
import PageNotFound from "./pages/page-not-found";
import PokemonEdit from "./pages/pokemon-edit";
import PageServerError from "./pages/page-server-error";
import Login from "./pages/login";
import PrivateRoute from "./PrivateRoute";
import AuthenticationService from "./services/authentication-service";

const App: FunctionComponent = () => {
  // Comme on ne gère pas la durée de connexion, on se déconnecte à chaque refresh de l'application
  AuthenticationService.logout();

  return (
    // BrowserRouter permet de mettre en place le système de navigation
    <Router>
      <div>
        {/* La barre de navigation commun à toutes les pages */}
        <nav>
          <div className="nav-wrapper teal">
            <Link to="/" className="brand-logo center">
              Pokédex
            </Link>
          </div>
        </nav>
        {/* 
        Le système de gestion des routes de l'application
        Switch permet d'afficher le contenu d'une seule route à la fois
        */}
        <Switch>
          {/* 
          Route permet de décrire chaque route de l'application,
          exact permet de dire que l'URL doit correspondre exactement au chemin indiqué
          et qu'il ne s'agit pas d'un préfixe
          */}
          <PrivateRoute exact path="/" component={PokemonList} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/pokemons" component={PokemonList} />
          <PrivateRoute exact path="/pokemons/add" component={PokemonAdd} />
          <PrivateRoute
            exact
            path="/pokemons/edit/:name"
            component={PokemonEdit}
          />
          <PrivateRoute path="/pokemons/:name" component={PokemonsDetail} />
          {/* 
          permet d'intercepter les routes inexistantes
          Attention, l'ordre de déclaration des routes est importante
          */}
          <Route exact path="/server/error" component={PageServerError} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
