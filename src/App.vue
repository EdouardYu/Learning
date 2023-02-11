<script setup>
import { RouterView, RouterLink } from "vue-router"
</script>

<template>
  <main>
    <div class="links">
      <RouterLink active-class="active" to="/">Page d'accueil</RouterLink>
      <RouterLink active-class="active" to="/about">A propos</RouterLink>
    </div>
    <RouterView/>
  </main>
</template>

<style scoped>
.links {
  padding: 20px
}
.links a {
  margin: 0 5px
}

.active {
  font-weight: bold;
  color: green;
  pointer-events: none !important;
}
</style>