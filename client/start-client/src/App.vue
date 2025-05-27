<script setup>
import Navbar from './components/Navbar.vue'
import MapView from './views/map/MapView_2.vue'
</script>

<template>
  <div>
    <Navbar />
    <router-view />
    <MapView />
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.home {
  padding: 2rem;
  text-align: center;
}
</style>

