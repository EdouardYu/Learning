<script setup>
//import { useRoute, useRouter, RouterView } from 'vue-router'
import { useRoute, RouterLink, RouterView } from 'vue-router'
import { ref, onBeforeMount } from 'vue'
import cars from '../data.json'

let car = ref(null)
let route = useRoute()
//let router = useRouter()
let { id } = route.params

onBeforeMount(() => {
    car.value = cars.find(c => c.id === parseInt(id))
})

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
            <RouterLink :to="`/car/${car.id}/dealer`">
                <button>
                    Concessionnaire
                </button>
            </RouterLink>
            <RouterLink :to="`/car/${car.id}/manufactorer`">
                <button>
                    Constructeur
                </button>
            </RouterLink>
        </div>
        <div v-else>
            <h1>Aucune voiture n'a été trouvée</h1>
        </div>
        <!-- button @click="router.back()">Revenir en arrière</button -->
        <RouterLink to="/">
            <button>
                Revenir à la page d'accueil
            </button>
        </RouterLink>
    </div>
</template>

<style scoped>
button {
    margin: 10px 20px 0 0;
}
</style>