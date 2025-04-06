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
    <p><strong>{{ name }}</strong></p>
    <p>Ville : {{ city }}</p>
    <p>Code Postal : {{ pc }}</p>
    <p class="more">Cliquer pour plus d'informations</p>
  </div>
</template>

<style scoped>
.company-item {
  background-color: var(--red-esigelec);
  color: var(--white);
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}
.company-item:hover {
  transform: translateY(-2px);
  cursor: pointer;
}
.more {
  font-style: italic;
  font-size: 0.85em;
  color: var(--gray-light);
}
</style>
