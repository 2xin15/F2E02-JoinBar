<script setup>
import { ref } from 'vue'
import FormSet from './FormSet.vue'
import FormUpdate from './FormUpdate.vue'

const showForm = ref(false)
const formStatus = ref('create')
const currentEventId = ref('');

function openForm() {
  showForm.value = true
}

function handleCreate(eventId) {
  console.log('新建立的活動 ID:', eventId)
  showForm.value = false
  formStatus.value = 'update'
  currentEventId.value = eventId  // 傳給 FormUpdate 使用
}

function handleUpdate() {
  showForm.value = false
}

function handleDelete() {
  showForm.value = false
  formStatus.value = 'create'
}


</script>

<template>
  <div class="event-form-wrapper">
    <button @click="openForm" class="btn-form-toggle">
      {{ formStatus === 'create' ? '建立活動' : '編輯活動' }}
    </button>

    <transition name="popup">
      <div v-if="showForm" class="popup-overlay">
        <FormSet 
          v-if="formStatus === 'create'" 
          class="form-popup" 
          @submit="handleCreate"
        />
        <FormUpdate 
          v-if="formStatus === 'update'" 
          class="form-popup"
          :eventId="currentEventId" 
          @update="handleUpdate"
          @delete="handleDelete"
        />
      </div>
    </transition>
  </div>
</template>



<style scoped>
.btn-form-toggle {
  background-color: #d4624e;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-popup {
  border-radius: 20px;
  padding: 0;
  max-height: 90vh;
  overflow-y: auto;
}
</style>
