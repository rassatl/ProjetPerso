<script setup>
import { onMounted, ref, watch } from 'vue'
import { nextTick } from 'vue';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapContainer = ref(null)
const props = defineProps({isOpen: Boolean})

let map = null

onMounted(() => {
  map = L.map(mapContainer.value, {
  center: [46.656066, 0.364419],
  zoom: 5,
  minZoom: 3, // Limite de zoom arrière
  maxBounds: [
    [-90, -180],
    [90, 180]
  ], // Garde l'utilisateur dans les limites du monde réel
  worldCopyJump: false, // Empêche l'effet de copie du monde
});

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  L.marker([46.656066, 0.364419])
    .addTo(map)
    .bindPopup('ESIGELEC - Poitiers')
    .openPopup()
})


// À chaque changement de la sidebar, on redimensionne la carte
watch(() => props.isOpen, () => {
  nextTick(() => {
    map.invalidateSize();
  });
});
</script>

<template>
  <div id="map" ref="mapContainer" class="map-container" :class="{'sidebar-open': isOpen, 'sidebar-closed': !isOpen}"></div>
</template>

<style scoped>
.map-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: calc(100%);
  transition: all 0.3s ease;
  z-index: 0;
  overflow: hidden;
}

.map-container.full {
  width: 100vw; /* sidebar fermée */
  margin-left: 0;
}


</style>
