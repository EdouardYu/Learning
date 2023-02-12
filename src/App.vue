<!-- L'attribut "setups" permet au script de s'exécuter à chaque fois qu'une instance du composant est créée. -->
<script setup>
import { RouterView, RouterLink } from "vue-router"
/*
RouterView permet d'afficher les composants de Vue à l'endroit on a appelé la balise.
Pour celà, il faut bien configurer le main.js et le router index.js.
*/
/*
RouterView permet de remplacer les balises <a href=""></a> dans une application d'une seule page.
Cela évite de recharger la page quand on click sur un lien.
*/
</script>

<template>
  <main>
    <div class="links">
      <!-- l'active-class est appelé que quand la balise est active. -->
      <RouterLink active-class="active" to="/">Page d'accueil</RouterLink>
      <RouterLink active-class="active" to="/about">A propos</RouterLink>
    </div>
    <RouterView/>
  </main>
</template>

<!-- L'attribut "scoped" permet de limiter le CSS à ce composant uniquement. -->
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