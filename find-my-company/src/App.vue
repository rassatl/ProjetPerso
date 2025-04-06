<script setup>
import { ref, watch } from 'vue'
import ListeDeroulante from './components/ListeDeroulante.vue'
import MapComponent from './components/MapView.vue'

// État centralisé pour l'ouverture de la sidebar
const isOpen = ref(true)

// Watcher pour logger les changements
watch(isOpen, (newVal) => {
  console.log('🧭 isOpen value changed:', newVal)
})
</script>


<template>
  <ListeDeroulante :isOpen="isOpen" @toggle="isOpen = !isOpen" />
  <!-- <MapComponent :isOpen="isOpen" /> -->
</template>
 