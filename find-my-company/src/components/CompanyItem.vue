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
    <h3 class="speciality">{{ speciality }}</h3>
    <p class="name"><strong>{{ name }}</strong></p>
    <div class="location">
      <p class="city">Ville : {{ city }}</p>
      <p class="pc">Code Postal : {{ pc }}</p>
    </div>
    <p class="more">Cliquer pour plus d'informations</p>
  </div>
</template>

<style scoped>
.company-item {
  background-color: var(--red-esigelec);
  color: var(--white);
  border-radius: 8px;
  padding: 12px 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  overflow: hidden;
  gap: 6px;
}

.company-item:hover {
  transform: translateY(-2px);
  cursor: pointer;
}

.speciality {
  font-size: 1.1em;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.name {
  margin: 0;
  font-weight: bold;
  color: var(--white);

}

.location {
  display: flex;
  justify-content: space-between;
  font-size: 0.95em;
  gap: 20px;
}

.city, .pc {
  margin: 0;
}

.more {
  font-style: italic;
  font-size: 0.85em;
  color: var(--gray-light);
  margin: 0;
  padding-top: 4px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
