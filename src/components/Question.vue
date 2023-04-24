<script setup>
const { question } = defineProps(['question']);

// defineEmits, comme defineProps, il permet une communication 
// entre la composante fille (Question.vue) et la composante mère (QuizView.vue).
// Mais, contrairement à l'autre, c'est la composante mère qui va lire les évênement issues de la composante fille.
const emit = defineEmits(['selectOption']);

// le premier paramètre représente la clé qu'on va récupérée dans la composante mère
// le second paramètre est la valeur récupérée
const emitSelectedOption = (isCorrect) => {
    emit("selectOption", isCorrect);
};
</script>

<template>
    <div class="question-container">
        <h1 class="question">{{ question.text }}</h1>
    </div>
    <div class="options-container">
        <div v-for="option in question.options" :key="option.id" class="option"
            @click="emitSelectedOption(option.isCorrect)">
            <p class="option-label">{{ option.label }}</p>
            <div class="option-value">{{ option.text }}</div>
        </div>
    </div>
</template>

<style scoped>
.question-container {
    margin-top: 20px;
}

.question {
    font-size: 40px;
    margin-bottom: 20px;
}

.option {
    display: flex;
    margin-bottom: 20px;
    cursor: pointer;
}

.option-label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    font-size: 30px;
    background-color: bisque;
}

.option-value {
    width: 100%;
    padding: 0 20px;
    font-size: 30px;
    background-color: #F4EFEF;
}
</style>