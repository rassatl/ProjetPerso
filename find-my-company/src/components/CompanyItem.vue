<script setup>
defineProps({
  speciality: String,
  name: String,
  city: String,
  country: String,
  pc: String,
})
</script>

<template>
  <!-- Composant d'affichage d'une entreprise -->
  <div class="company-item">
    <div class="top">
      <div class="left">
        <h3 class="speciality">{{ speciality === "Développement Logiciel, Tests et Qualité" ? "Dev Logiciel" : speciality }}</h3>
        <p class="name"><strong>{{ name }}</strong></p>
      </div>
      <div class="right">
        <p class="city">Ville : {{ city }}</p>
        <p class="country">Pays : {{ country }}</p>
        <p class="pc">Code Postal : {{ pc }}</p>
      </div>
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
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  transition: transform 0.2s;
}

.company-item:hover {
  transform: translateY(-2px);
  cursor: pointer;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.left, .right {
  flex: 1;
}

.left p, h3 {
  color: var(--white);
  text-align: left;
}

.right p{
  margin: 0;
  font-size: 0.9em;
  color: var(--white);
  text-align: right;
}

.speciality {
  font-size: 1.1em;
  font-weight: 600;
  margin: 0 0 5px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.name {
  margin: 0;
  font-weight: bold;
  color: var(--white);
}

.city, .pc {
  margin: 0;
  font-size: 0.95em;
}

.more {
  font-style: italic;
  font-size: 0.85em;
  color: var(--gray-light);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  padding-top: 6px;
  text-align: center;
  margin: 0;
}
</style>
