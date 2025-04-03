<script setup>
import { ref } from 'vue';

const items = ref([
  { message: 'Foo' },
  { message: 'Bar' }
]);
</script>

<template>
  <ul>
    <li v-for="item in items" :key="item.message">
      {{ item.message }}
    </li>
  </ul>
</template>

<style scoped>
ul {
  position: fixed;
  top: 0;
  left: 0;
  width: 15%;
  height: 100%;
  background-color: grey;
  padding: 10px;
  margin: 0;
  list-style-type: none;
}

li {
  margin: 10px 0;
}
</style>
