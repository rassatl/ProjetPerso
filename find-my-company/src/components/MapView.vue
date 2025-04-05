<template>
    <div id="map" ref="mapContainer" class="map-container"></div>
</template>
  
<script setup>
  import { onMounted, ref } from 'vue'
  import L from 'leaflet'
  import 'leaflet/dist/leaflet.css'
  
  const mapContainer = ref(null)
  
  onMounted(() => {
    const map = L.map(mapContainer.value).setView([46.656066, 0.364419], 8) // Paris par défaut
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map)
  
    L.marker([46.656066, 0.364419])
      .addTo(map)
      .bindPopup('ESIGELEC - Poitiers')
      .openPopup()

    L.marker([49.383201, 1.076818])
      .addTo(map)
      .bindPopup('ESIGELEC - Rouen')
      .openPopup()
  })
</script>
  
<style scoped>
  .map-container {
    height: 100vh;
    width: 100vw;
  }
</style>
  