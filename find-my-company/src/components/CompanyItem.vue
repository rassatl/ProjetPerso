<script setup>
defineProps({
  speciality: String,
  name: String,
  city: String,
  pc: String,
})
</script>

<template>
  <div class="company-item">
    <h3>{{ speciality }}</h3>
    <p>{{ name }}</p>
    <p>Ville : {{ name }}</p>
    <p>Code Postal : {{ city }}</p>
    <p>Cliquer pour plus d'informations</p>
  </div>
</template>

<style scoped>
.company-item {
  background-color: #2e8b57;
  color: white;
  border-radius: 4px;
  padding: 10px;
}
</style>
