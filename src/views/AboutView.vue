<script setup>
import { ref } from 'vue';

const count = ref(0);
</script>

<template>
    <main class="container">
        <h1>A propos</h1>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            In sapiente iure quisquam natus itaque delectus quibusdam sit
            voluptatem consequuntur fugiat animi asperiores omnis,
            quos accusantium quia totam quae. Obcaecati, dolorem.
        </p>
        <div>
            <h3>Le décompte actuel est ...</h3>
            <h1>{{ count }}</h1>
            <button @click="count--">-</button>
            <button @click="count++">+</button>
        </div>
    </main>
</template>

<style scoped>
p {
    text-align: center;
}

main {
    display: flex;
    justify-content: center;
    align-items: center;
}

div {
    padding: 20px;
    text-align: center;
}
</style>
