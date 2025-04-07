<script setup>
import { ref, watch, onMounted } from 'vue';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';

const emit = defineEmits(['refresh']);
const speciality = ref('');
const name = ref('');
const adress = ref('');
const city = ref('');
const pc = ref('');
const country = ref('');
const x = ref('');
const y = ref('');

let map = null;
let marker = null;
const mapContainer = ref(null);

onMounted(() => {
 
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


  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);



});

watch([x, y], ([newX, newY]) => {
  if (!newX || !newY || isNaN(newX) || isNaN(newY)) return;
  const latLng = [parseFloat(newX), parseFloat(newY)];

  if (!marker) {
    marker = L.marker(latLng).addTo(map);
  } else {
    marker.setLatLng(latLng);
  }

  map.setView(latLng, 10);
});

const submitForm = async () => {
  // Vérifie que tous les champs sont renseignés
  if (!speciality.value || !name.value || !adress.value || !city.value || country.value || !pc.value || !x.value || !y.value) {
    alert("Tous les champs sont obligatoires !");
    return;
  }

  try {
    await addDoc(collection(db, 'companies'), {
      speciality: speciality.value,
      name: name.value,
      adress: adress.value,
      city: city.value,
      country: country.value,
      pc: pc.value,
      x: x.value,
      y: y.value
    });

    // Réinitialisation des champs
    speciality.value = '';
    name.value = '';
    adress.value = '';
    city.value = '';
    country.value = '';
    pc.value = '';
    x.value = '';
    y.value = '';

    emit('refresh');
    emit('close');
  } catch (e) {
    console.error("Erreur lors de l'ajout de l'entreprise : ", e);
  }
};

</script>

<template>
  <div class="form-map-wrapper">
    <form class="form-container" @submit.prevent="submitForm">
      <h2>Ajouter une entreprise</h2>
      <div class="form-group">
          <label for="speciality">Spécialité</label>
          <select id="speciality" v-model="speciality" required>
              <option disabled value="">-- Sélectionner une spécialité --</option>
              <option value="Développement Logiciel, Tests et Qualité">Développement Logiciel, Tests et Qualité</option>
              <option value="IA & Big Data">IA & Big Data</option>
          </select>
      </div>
      <div class="form-group">
        <label for="name">Nom</label>
        <input id="name" v-model="name" required />
      </div>
      <div class="form-group">
        <label for="country">Pays</label>
        <input id="country" v-model="country" required />
      </div>
      <div class="form-group">
        <label for="adress">Adresse</label>
        <input id="adress" v-model="adress" required />
      </div>
      <div class="form-group">
        <label for="city">Ville</label>
        <input id="city" v-model="city" required />
      </div>
      <div class="form-group">
        <label for="pc">Code Postal</label>
        <input id="pc" v-model="pc" required />
      </div>
      <button type="submit" class="submit-button">Ajouter l'entreprise</button>
    </form>
    <div class="mini-map" ref="mapContainer"></div>
  </div>
</template>

<style scoped>

.form-map-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 50px;
}

select {
  width: 100%;
  padding: 8px 12px;
  border: 2px solid var(--gray-white-light);
  border-radius: 6px;
  font-size: 14px;
  background-color: var(--white);
  transition: border 0.2s;
}

.form-container {
  background: var(--white);
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-width: 500px;
  margin: 0 auto;
  font-family: 'Segoe UI', sans-serif;
}

h2 {
  color: var(--red-esigelec);
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: var(--gray-dark);
}

input {
  width: 90%;
  padding: 8px 12px;
  border: 2px solid var(--gray-white-light);
  border-radius: 6px;
  font-size: 14px;
  transition: border 0.2s;
  background-color: var(--white);
  color: var(--gray-dark);
}

input:focus {
  border-color: var(--red-esigelec);
  outline: none;
}

.submit-button {
  background-color: var(--red-esigelec);
  color: var(--white);
  border: none;
  border-radius: 6px;
  padding: 10px;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submit-button:hover {
  background-color: var(--red-btn-hover);
}

.mini-map {
  width: 600px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  flex-shrink: 0;
}
</style>
