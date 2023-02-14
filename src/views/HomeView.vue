<script setup>
import carsData from '../data.json';
import { ref, watch, onMounted } from 'vue';
/*
L'attribut "ref" remplace dans Vue, le getElementById qui est déconseillé car cela crée des problèmes de performances.
Il permet de référencer un élément ou un élément enfant du DOM dans l'instance Vue de manière plus efficace.
On pourra sélectionner l'élément DOM; c'est un attribut en lecture seule et renvoie un objet.
Elle permet également de garder l'état de la variable comme une instance et ainsi pouvoir manipuler la variable.
Ex : const count = 0; on pourra faire un count.value++; sans le "ref" c'est imposible.
Dans un "ref", pour accéder à la valeur, il faut appelé sa propriété value; 
mais dans le template cela est inutile car il l'appelle automatiquement.
*/
//"watch" permet de déclencher une fonction chaque fois qu'une propriété réactive change.
/*
"onMounted" est appelé après le montage du composant et est est généralement utilisé
pour effectuer des effets secondaires qui nécessitent un accès au DOM rendu du composant
ou pour limiter le code lié au DOM au client, il ne communique donc pas avec le serveur.
*/
//import { RouterLink, useRoute } from 'vue-router';
import { useRouter, useRoute } from 'vue-router';
// La "route" est l'URL du composant actuelle.
// Le "router" permet de mettre en place un système de navigation basé sur les URLs de ../router/index.js.

const router = useRouter();
const route = useRoute();
const cars = ref(carsData);
const make = ref("Tous");
const makes = [...new Set(carsData.map((c => c.make)))].sort();
// Cette fonction permet de prendre les valeurs distinctes de la propiété make des objets json de carsData.
const handleChange = () => {
  router.push({query: {make: make.value}});
};
// Cette fonction permet d'ajouter un query params à la "route" actuelle.

onMounted(() => {
  if(route.query.make){
    make.value = route.query.make;
  };
});
/*
Cette fonction permet de modifier la valeur de l'instance make
qui est la balise select du composant lorsqu'une propriété réactive change.
*/

watch(make,() => {
  if(make.value){
    if(make.value === "Tous"){
      cars.value = carsData;
    }else{
      cars.value = carsData.filter(c => c.make === make.value);
    };
  }
});
// Cette fonction permet de filtrer les éléments de la carsData en fonction de la marque sélectionnée.
</script>

<template>
  <main class="container">
    <h1>Nos Voitures</h1>
    <!-- @ est équivalent à v-on: , la syntaxe plus courte donc à privilégier. -->
    <!--
      Le v-model sert à deux choses :
      - l'affectation d'une valeur dans la balise select.
      - une communication bi-directionnel entre le select et la variable JS :
        ainsi si la valeur du select change, la variable change également.
    -->
    <select @change="handleChange" v-model="make">
      <option value="Tous">Tous</option>
      <option v-for="make in makes" :key="make">{{ make }}</option>
      <!-- : permet au paramètre de la balise d'avoir une variable JS comme valeur. -->
      <!--
        L'attribut key est principalement utilisé comme indice pour l'algorithme DOM virtuel de Vue
        afin d'identifier les vnodes lors de la comparaison de la nouvelle liste de nœuds avec l'ancienne liste.
        Ainsi on évite de recharger les éléments déjà présents dans le composant quand on ajoute un nouvel élément.
        Par ailleurs, cela peut également substituer le paramètre value de la balise.
      -->
    </select>
    <div class="cards">
      <!--RouterLink :to="`/car/${car.id}`" v-for="car in cars" :key="car.id" class="card"-->
      <div v-for="car in cars" :key="car.id" class="card" @click="router.push(`/car/${car.id}`)">
        <h2>{{ car.make }}</h2>
        <p>{{ car.body }}</p>
        <p>{{ car.price }} €</p>
      </div>
      <!--/RouterLink-->
    </div>
  </main>
</template>

<style scoped>
.cards {
  display: flex;
  width: 1000px;
  flex-wrap: wrap;
  margin-top: 50px;
  justify-content: center;
}

.card {
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.207);
  padding: 15px;
  width: 150px;
  margin-right: 15px;
  cursor: pointer;
  margin-bottom: 20px;
}
</style>
