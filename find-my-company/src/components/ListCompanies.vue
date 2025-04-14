<script setup>
import CompanyItem from './CompanyItem.vue'
import { defineProps } from 'vue'

const props = defineProps({
  companies: {
    type: Array,
    required: true
  }
});
</script>

<template>
    <ul>
      <li v-for="company in companies" :key="company.id">
        <CompanyItem
          :speciality="company.speciality"
          :name="company.name"
          :city="company.city"
          :country="company.country"
          :pc="company.pc.toString()"
        />
      </li>
    </ul>
</template>
  
  

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  margin-bottom: 12px;
}
</style>
