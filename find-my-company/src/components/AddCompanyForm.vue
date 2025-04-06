<script setup>
import { ref } from 'vue';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const emit = defineEmits(['refresh']);

const speciality = ref('');
const name = ref('');
const city = ref('');
const pc = ref('');

const submitForm = async () => {
  try {
    await addDoc(collection(db, 'companies'), {
      speciality: speciality.value,
      name: name.value,
      city: city.value,
      pc: pc.value,
    });
    speciality.value = '';
    name.value = '';
    city.value = '';
    pc.value = '';
    emit('refresh');
    emit('close');
  } catch (e) {
    console.error('Erreur lors de l\'ajout de l\'entreprise : ', e);
  }
};
</script>

<template>
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
      <label for="city">Ville</label>
      <input id="city" v-model="city" required />
    </div>
    <div class="form-group">
      <label for="pc">Code Postal</label>
      <input id="pc" v-model="pc" required />
    </div>
    <button type="submit" class="submit-button">Ajouter l'entreprise</button>
  </form>
</template>

<style scoped>
select {
  width: 100%;
  padding: 8px 12px;
  border: 2px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  background-color: white;
  transition: border 0.2s;
}

select:focus {
  border-color: #d20a11;
  outline: none;
}

.form-container {
  background: #ffffff;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-width: 500px;
  margin: 0 auto;
  font-family: 'Segoe UI', sans-serif;
}

h2 {
  color: #d20a11;
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
  color: #444;
}

input {
  width: 90%;
  padding: 8px 12px;
  border: 2px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  transition: border 0.2s;
}

input:focus {
  border-color: #d20a11;
  outline: none;
}

.submit-button {
  background-color: #d20a11;
  color: white;
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
  background-color: #a3080d;
}
</style>
