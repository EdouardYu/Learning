<script setup>
import carsData from '../data.json'
import { ref, watch, onMounted } from 'vue'
//import { RouterLink, useRoute } from 'vue-router'
import { useRouter, useRoute } from 'vue-router'

let router = useRouter()
let route = useRoute()
let cars = ref(carsData)
let make = ref("Tous")
let makes = [...new Set(carsData.map((c => c.make)))].sort()
let handleChange = () => {
  router.push({query: {make: make.value}})
}

onMounted(() => {
  if(route.query.make){
    make.value = route.query.make
  }
})

watch(make,() => {
  if(make.value){
    if(make.value === "Tous"){
      cars.value = carsData
    }else{
      cars.value = carsData.filter(c => c.make === make.value)
    }
  }
})
</script>

<template>
  <main class="container">
    <h1>Nos Voitures</h1>
    <select @change="handleChange" v-model="make">
      <option value="Tous">Tous</option>
      <option v-for="make in makes" :value="make">{{ make }}</option>
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
