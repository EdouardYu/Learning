<script setup>
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import QuizHeader from "../components/QuizHeader.vue";
import Question from "../components/Question.vue";
import Result from "../components/Result.vue";
import quizes from "../data/quizes.json";

const route = useRoute();

const quizName = route.params.name;
const currentQuestionIndex = ref(0);
const quiz = quizes.find(q => q.name === quizName);

// Ce n'est pas parce que l'instance currentQuestionIndex évolue que questionStatus évolue également.
// Deux choix s'offre à nous :
// utiliser la méthode ref + watch.
// const questionStatus = ref(`${currentQuestionIndex.value + 1}/${quiz.questions.length}`);

// watch(() => currentQuestionIndex.value, () => {
//     questionStatus.value = `${currentQuestionIndex.value + 1}/${quiz.questions.length}`;
// });
// ou
// utiliser la méthode computed (meilleur choix).
// coputed crée une instance à chaque fois que l'état de la source change.
const questionStatus = computed(() => {
    if (currentQuestionIndex.value < quiz.questions.length) {
        return `${currentQuestionIndex.value + 1}/${quiz.questions.length}`;
    }
    return `${currentQuestionIndex.value}/${quiz.questions.length}`;
});
const barPercentage = computed(() => `${currentQuestionIndex.value * 100 / quiz.questions.length}%`);

const numberOfCorrectAnswers = ref(0);
const showResult = ref(false);

const onOptionSelected = (isCorrect) => {
    if (isCorrect) {
        numberOfCorrectAnswers.value++;
    }

    if (currentQuestionIndex.value === quiz.questions.length - 1) {
        showResult.value = true;
    }
    currentQuestionIndex.value++;
};
</script>

<template>
    <div>
        <QuizHeader :questionStatus="questionStatus" :barPercentage="barPercentage" />
        <div>
            <!-- selectOption est la clé issue de defineEmits de composante Question.vue, on récupère sa valeur -->
            <Question v-if="!showResult" :question="quiz.questions[currentQuestionIndex]"
                @selectOption="onOptionSelected" />
            <Result v-else :quizQuestionsLength="quiz.questions.length" :numberOfCorrectAnswers="numberOfCorrectAnswers" />
        </div>
    </div>
</template>