<script setup>
import { RouterLink } from "vue-router";

const { quizQuestionsLength, numberOfCorrectAnswers } = defineProps(['quizQuestionsLength', 'numberOfCorrectAnswers'])
</script>

<template>
    <div class="result">
        <p>Votre résultat...</p>
        <h1>{{ numberOfCorrectAnswers }}/{{ quizQuestionsLength }}</h1>
        <RouterLink to="/">Revenir à la page de quizes</RouterLink>
    </div>
</template>

<style scoped>
.result {
    text-align: center;
    padding: 100px 0;
}

p {
    font-size: 25px;
}

h1 {
    font-size: 80px;
}
</style>