<script setup>
import { onMounted, ref, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapContainer = ref(null)
const props = defineProps({
  isOpen: Boolean // on récupère l'état de la sidebar
})

let map = null

onMounted(() => {
  map = L.map(mapContainer.value).setView([46.656066, 0.364419], 5)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  L.marker([46.656066, 0.364419])
    .addTo(map)
    .bindPopup('ESIGELEC - Poitiers')
    .openPopup()

  // L.marker([49.383201, 1.076818])
  //   .addTo(map)
  //   .bindPopup('ESIGELEC - Rouen')
  //   .openPopup()
})

// À chaque changement de la sidebar, on redimensionne la carte
watch(() => props.isOpen, () => {
  setTimeout(() => { map.invalidateSize()}, 400)
})
</script>

<template>
  <div id="map" ref="mapContainer" class="map-container" :class="{ full: !isOpen }"></div>
</template>

<style scoped>
.map-container {
  height: 100vh;
  transition: width 0.3s ease;
  margin-left: 220px; /* largeur sidebar */
}
.map-container.full {
  margin-left: 0;
  width: 100vw;
}
</style>
