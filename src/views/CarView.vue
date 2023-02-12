<script setup>
//import { useRoute, useRouter, RouterView } from 'vue-router';
import { useRoute, RouterLink, RouterView } from 'vue-router';
import { ref, onBeforeMount } from 'vue';
/*
"onBeforeMount" est appelé entre le moment où le composant a fini de configurer son état réactif 
et le montage du composant (quand aucun nœud DOM n'a encore été créé).
Il est est utilisé pour finaliser le rendu DOM pour la première fois.
*/
import cars from '../data.json';

const car = ref(null);
const route = useRoute();
//const router = useRouter();
const { id } = route.params;

onBeforeMount(() => {
    car.value = cars.find(c => c.id === parseInt(id));
});
// Cete fonction permet de chercher l'élément par l'id de la route dans carsData.
</script>

<template>
    <div class="container">
        <div v-if="car">
            <h1>La Voiture</h1>
            <p>Marque : {{ car.make }}</p>
            <p>Modèle : {{ car.body }}</p>
            <p>Prix : {{ car.price }}  €</p>
            <p>Année : {{ car.year }}</p>
            <RouterView/>
            <!-- Le RouterView permet ici d'afficher les composants filles de ce composant. -->
            <RouterLink :to="`/car/${car.id}/dealer`">
                <button>Concessionnaire</button>
            </RouterLink>
            <RouterLink :to="`/car/${car.id}/manufactorer`">
                <button>Constructeur</button>
            </RouterLink>
        </div>
        <div v-else>
            <h1>Aucune voiture n'a été trouvée</h1>
        </div>
        <!-- button @click="router.back()">Revenir en arrière</button -->
        <RouterLink to="/">
            <button>Revenir à la page d'accueil</button>
        </RouterLink>
    </div>
</template>

<style scoped>
button {
    margin: 10px 20px 0 0;
}
</style>