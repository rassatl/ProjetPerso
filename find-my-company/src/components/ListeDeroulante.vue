<script setup>
import { onMounted, ref, computed  } from 'vue'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import CompanyItem from './CompanyItem.vue'

// Props et événements
const props = defineProps({isOpen: Boolean})
const emit = defineEmits(['toggle'])

const companies = ref([])
const selectedSpeciality = ref('Toutes')

const allSpecialities = computed(() => {
  const list = companies.value.map(c => c.speciality).flat()
  const unique = [...new Set(list)]
  return ['Toutes', ...unique]
})
const filteredCompanies = computed(() => {
  if (selectedSpeciality.value === 'Toutes') return companies.value
  return companies.value.filter(c =>
    c.speciality.includes(selectedSpeciality.value)
  )
})

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'companies'))
  companies.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
})

function toggleSideBar() {
  // console.log de l'état de la sidebar, le ! est important car on fait la modif de la value avant l'appel de toggleMenu
  console.log('Sidebar is now', !props.isOpen ? 'open ' + !props.isOpen : 'closed ' + !props.isOpen )
  emit('toggle')
}

function onPlusClick() {
  console.log('🆕 Bouton + cliqué') // Tu pourras remplacer ça par une modale, un formulaire, etc.
}

</script>

<template>
  <div>
    <div
      class="sidebar"
      :class="{ closed: !isOpen }"
      :style="{ width: isOpen ? '400px' : '0' }">
      <div class="top-right-action" v-if="isOpen">
        <button @click="onPlusClick" class="plus-button" aria-label="Ajouter">+</button>
      </div>

      <hr class="separator" />
      <h1>Find My Company</h1>
      <hr class="separator" />
      <h2 v-if="isOpen">Liste des entreprises</h2>

      <div v-if="isOpen" class="filter-bar">
        <label for="speciality-select">Spécialité :</label>
        <select id="speciality-select" v-model="selectedSpeciality">
          <option v-for="spec in allSpecialities" :key="spec" :value="spec">
            {{ spec }}
          </option>
        </select>
      </div>

      <!-- Affiche la liste des entreprises si la sidebar est visible -->
      <ul v-if="isOpen">
        <li v-for="company in filteredCompanies" :key="company.id">
          <CompanyItem
            :speciality="company.speciality"
            :name="company.name"
            :city="company.city"
            :pc="company.pc.toString()"
          />
        </li>
      </ul>
    </div>

    <!-- Bouton Ouverture/Fermeture sidebar -->
    <button
      class="toggle-button"
      @click="toggleSideBar"
      :class="{ closed: !isOpen }"
      :style="{ left: isOpen ? '400px' : '0' }"
    >
      <!-- Flèche pour savoir dans quel sens la sidebar va aller si on clique sur le bouton -->
      <span><i :class="['arrow', isOpen ? 'left' : 'right']"></i></span> 
    </button>
  </div>
</template>

<style scoped>
h1{
  font-size: 2rem;
  margin-bottom: 1rem;
}
.separator {
  border: none;
  height: 4px;
  background-color: var(--red-esigelec);
  margin: 10px 0;
  width: 100%;
}

h2 {
  color: var(--red-esigelec);
  margin-bottom: 1rem;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  background-color: var(--background-white);
  padding: 20px;
  overflow-y: auto;
  transition: transform 0.3s ease, width 0.3s ease;
  box-sizing: border-box;
  z-index: 1000;
}
.sidebar.closed {
  transform: translateX(-100%);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  margin-bottom: 12px;
}

.toggle-button {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 35px;
  height: 60px;
  background-color: var(--red-esigelec);
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: left 0.3s ease;
  z-index: 1001;
}
.toggle-button:hover {
  background-color: var(--red-btn-hover);
}

.arrow {
  border: solid var(--white);;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 5px;
}
.right {
  transform: rotate(-45deg);
}
.left {
  transform: rotate(135deg);
}

.filter-bar {
  margin-bottom: 1rem;
  color: var(--red-esigelec);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

select {
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
}

.top-right-action {
  position: absolute;
  top: 0px;
  right: 0px;
}

.plus-button {
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  font-size: 30px;
  font-weight: bold;
  color: var(--red-esigelec);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease, transform 0.2s ease;
  padding: 0;
  border-radius: 4px; /* Optionnel : coin doux */
  outline: none;
}
.plus-button:focus {
  outline: none;
  box-shadow: none;
}
.plus-button:focus:not(:focus-visible) {
  outline: none;
}
.plus-button:hover {
  color: #a3080d;
  transform: scale(1.2);
}




</style>
