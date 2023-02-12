import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import CarView from "../views/CarView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import DealerView from "../views/DealerView.vue";
import ManufactorerView from "../views/ManufactorerView.vue";

const router = createRouter({ //Permet de créer les routes de l'application.
    history: createWebHistory(import.meta.env.BASE_URL),
    /*
    Un historique utilise l'URL pour simuler un URL complet 
    et ainsi ne pas recharger la page quand l'URL change.
    Mode HTML5 : Permet d'avoir un beau URL.
    Attention à configurer correctement les chemins sur le serveur 
    sinon les utilisateurs obtiendront une erreur 404 
    s'ils accèdent indirectement à une autre page que la page d'accueil
    car Vue est une application côté client d'une seule page.
    */
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView
        },
        {
            path: "/about",
            name: "about",
            component: AboutView
        },
        {
            path: "/car/:id",
            name: "car",
            component: CarView,
            children: [ // Les routes filles où seule la route parente à accès ici : /car/:id/...
                {
                    path: "dealer",
                    component: DealerView
                },
                {
                    path: "manufactorer",
                    component: ManufactorerView
                }
            ]
        },
        {
            path: "/:pathMatch(.*)*", // Si l'URL ne correspond à aucun élément, l'utilisateur sera redirigé sur cette page.
            name: "notFound",
            component: NotFoundView
        }
    ]
});

export default router;