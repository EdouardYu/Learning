<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
// defineProps permet d'avoir accès aux propriétés déclarées dans sa balise dans App.vue
const { quiz } = defineProps(['quiz']);

const navigateToQuiz = () => {
    router.push(`/quiz/${quiz.name}`);
};
</script>

<template>
    <div class="card" @click="navigateToQuiz">
        <img :src="quiz.img">
        <div class="card-text">
            <h2>{{ quiz.name }}</h2>
            <p>{{ quiz.questions.length }} questions</p>
        </div>
    </div>
</template>

<style scoped>
.card {
    width: 310px;
    overflow: hidden;
    border-radius: 2%;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 35px;
    margin-right: 25px;
    cursor: pointer;
}

.card img {
    width: 100%;
    height: 190px;
    margin: 0;
}

.card .card-text {
    padding: 0 5px;
}

.card .card-text h2 {
    font-weight: bold;
}
</style>