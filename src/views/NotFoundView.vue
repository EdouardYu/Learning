<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="container">
        <h1>
            404 - Cette page n'existe pas
        </h1>
        <RouterLink to="/">
            <button>
                Revenir à la page d'accueil
            </button>
        </RouterLink>
    </div>
</template>

<style scoped>
button {
    margin: 10px;
}
</style>