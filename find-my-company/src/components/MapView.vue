<script setup>
import { onMounted, ref, watch } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const mapContainer = ref(null);
const props = defineProps({ isOpen: Boolean });

let map = null;

var redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

onMounted(async () => {
  // Initialiser la carte
  map = L.map(mapContainer.value, {
    center: [46.656066, 0.364419],
    zoom: 5,
    minZoom: 3,
    maxBounds: [
      [-90, -180],
      [90, 180],
    ],
    worldCopyJump: false,
  });

  // Ajouter une couche de tuiles OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  L.marker([46.656066, 0.364419], {icon: redIcon})
    .addTo(map)
    .bindPopup('ESIGELEC - Poitiers')
    .openPopup()

  // Récupérer les entreprises depuis Firestore et ajouter des marqueurs
  await fetchCompaniesAndAddMarkers();
});

// Fonction pour récupérer les entreprises et ajouter des marqueurs
const fetchCompaniesAndAddMarkers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'companies'));
    querySnapshot.forEach((doc) => {
      const company = doc.data();
      const { x, y, name } = company;
      if (x && y && name) {
        const marker = L.marker([x, y], {icon: redIcon}).addTo(map);
        marker.bindPopup(name);
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des entreprises:', error);
  }
};

// Redimensionner la carte lorsque la sidebar change d'état
watch(
  () => props.isOpen,
  () => {
    setTimeout(() => {
      map.invalidateSize();
    }, 400);
  }
);
</script>

<template>
  <div
    id="map"
    ref="mapContainer"
    class="map-container"
    :class="{ 'sidebar-open': isOpen, 'sidebar-closed': !isOpen }"
  ></div>
</template>

<style scoped>
.map-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  transition: all 0.3s ease;
  z-index: 0;
  overflow: hidden;
}
</style>
