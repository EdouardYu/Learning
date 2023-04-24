<script setup>
import q from "../data/quizes.json";
import { ref, watch } from "vue";
import Card from "../components/Card.vue";

const quizes = ref(q);
const search = ref("");

watch(search, () => {
    quizes.value = q.filter(quiz => quiz.name.toLowerCase().includes(search.value.toLocaleLowerCase()));
});
</script>

<template>
    <header>
        <h1>Quizes</h1>
        <input v-model.trim="search" type="text" placeholder="Rechercher...">
    </header>
    <div class="options-container">
        <Card v-for="quiz in quizes" :key="quiz.id" :quiz="quiz" />
        <!-- Card est une balise créée grâce au composant Card qui a été importé -->
        <!-- on définit une propiété :quiz="quiz" afin d'avoir accès aux données de chaque quiz
            dans notre composant Card grâce à defineProps, par ailleurs, on peut déclaré autant 
            de propriété qu'on veut :prop1="prop1" :prop2="prop2" -->
    </div>
</template>

<style scoped>
header {
    margin-top: 30px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
}

header h1 {
    font-weight: bold;
    margin-right: 30px;
}

header input {
    border: none;
    background-color: rgba(128, 128, 128, 0.1);
    padding: 10px;
    border-radius: 5px;
}

.options-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
}
</style>
