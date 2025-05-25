<script setup>
// import FormSet from './FormSet.vue'
// import FormUpdate from './FormUpdate.vue'
import EventForm from './EventForm.vue'
</script>

<template>

  <div class="page">
    <h1>酒吧活動</h1>
    <p>探索附近的酒吧活動。</p>
  </div>

  <EventForm />
  <FormSet />
  <FormUpdate />

</template>


<style scoped>
.page {
  padding: 2rem;
  text-align: center;
  background-color: var(--color-black);
  color: white;
}
</style>