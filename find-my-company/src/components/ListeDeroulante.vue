<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import CompanyItem from './CompanyItem.vue'

const companies = ref([])
const isOpen = ref(true)
const sidebarWidth = ref(220) // largeur par défaut

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'companies'))
  companies.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
})

// Redimensionnement
let isResizing = false

function startResize(e) {
  isResizing = true
  document.addEventListener('mousemove', resize)
  document.addEventListener('mouseup', stopResize)
}

function resize(e) {
  if (isResizing) {
    sidebarWidth.value = Math.max(150, e.clientX)
  }
}

function stopResize() {
  isResizing = false
  document.removeEventListener('mousemove', resize)
  document.removeEventListener('mouseup', stopResize)
}

function toggleMenu() {
  isOpen.value = !isOpen.value
}

onBeforeUnmount(() => {
  stopResize()
})
</script>

<template>
  <div>
    <div
      class="sidebar"
      :class="{ closed: !isOpen }"
      :style="{ width: sidebarWidth + 'px' }"
    >
      <h2>Liste des entreprises</h2>
      <ul v-if="isOpen">
        <li v-for="company in companies" :key="company.id">
          <CompanyItem :speciality="company.speciality" :name="company.name" :city="company.city" :pc="company.pc"/>
        </li>
      </ul>
      <div class="resizer" @mousedown="startResize"></div>
    </div>
    <button class="toggle-button" @click="toggleMenu" :class="{ closed: !isOpen }" :style="{ left: (isOpen ? sidebarWidth : 0) + 'px' }" >
      <span><i :class="['arrow', isOpen ? 'left' : 'right']"></i></span>
    </button>
  </div>
</template>

<style scoped>
.arrow {
  border: solid white;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 5px;
  box-sizing: border-box;
}
.right {
  transform: rotate(-45deg);
}
.left {
  transform: rotate(135deg);
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #444;
  padding: 15px;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  z-index: 1000;
  box-sizing: border-box;
  min-width: 15%; 
}

.sidebar.closed {
  transform: translateX(-100%);
}

.resizer {
  width: 5px;
  background: #888;
  cursor: ew-resize;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  margin: 10px 0;
}

.toggle-button {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 60px;
  background-color: #888;
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
  background-color: #aaa;
}
.toggle-button.closed {
  border-radius: 0 5px 5px 0;
}
</style>
