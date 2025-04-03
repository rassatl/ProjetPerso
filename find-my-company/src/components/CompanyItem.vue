<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div class="card">
    <h3>{{ msg }}</h3>
    <p>Nom de l'entreprise</p>
    <p>Ville : Poitiers</p>
    <p>Code Postal : Poitiers</p>
    <p>Cliquer pour plus d'imformations</p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
  background-color: red;
}
.card {
    background-color: green;
}
</style>
