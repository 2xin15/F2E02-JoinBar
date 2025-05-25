<script setup>
import { ref } from 'vue';
import axios from '@/api/axios'; // 根據後端設定待調整
import { defineEmits } from 'vue'
const emit = defineEmits(['submit'])

const eventName = ref('');
const eventLocation = ref('');
const eventDate = ref('');
const eventTime = ref('');
const eventHashtags = ref('');


async function handleSubmit() {
  const eventData = {
    name: eventName.value,
    location: eventLocation.value,
    date: eventDate.value,
    time: eventTime.value,
    hashtags: eventHashtags.value,
  };
    try {
    const response = await axios.post('/events', eventData);
    const createdEventId = response.data.id;
    emit('submit', createdEventId);
  } catch (error) {
    console.error('新增活動失敗：', error);
  }
}
</script>

<template>
  <section class="event-form" id="new-event">
    <div class="form-header">建立新活動</div>

    <div class="form-container">

      <div class="form-image-upload">
        <div class="event-image-placeholder">點擊更換活動圖</div>
      </div>

      <div class="form-layout">
      
        <div class="form-left">
          <div class="form-row">
            <label for="event-name">活動名稱</label>
            <input type="text" id="event-name" v-model="eventName" placeholder="請輸入活動名稱" />
          </div>
          <div class="form-row">
            <label for="event-location">活動地點</label>
            <input type="text" id="event-location" v-model="eventLocation" placeholder="請輸入活動地點" />
          </div>
          <div class="form-row">
            <label for="event-date">活動日期</label>
            <input type="date" id="event-date" v-model="eventDate" />
          </div>
          <div class="form-row">
            <label for="event-time">活動時間</label>
            <input type="time" id="event-time" v-model="eventTime" />
          </div>

          <div class="form-row">
            <label for="event-hastags">特色標籤</label>
            <input type="text" id="event-hastags" v-model="eventHashtags" />

          </div>
        </div>

        <div class="form-right">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7229.173346458024!2d121.51834929155645!3d25.048097281079027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a971b0535025%3A0x6dd059bb00faacf6!2z5Y-w5YyX5Zac5L6G55m75aSn6aOv5bqX77yN5aSn5buz6YWS5ZCnIFRoZSBMb3VuZ2U!5e0!3m2!1szh-TW!2stw!4v1747884507892!5m2!1szh-TW!2stw" width="100%" height="100%" style="border:0;" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>

      </div>
      
      <div class="form-submit">
        <button type="button" @click="handleSubmit">發佈</button>
      </div>

    </div>
  </section>
</template>

<style scoped>

.page {
  padding: 2rem;
  text-align: center;
}
.event-form{
  z-index: 99;
}

.form-header{
  display: flex-box;
  width: 140px;
  height: 45px;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: 0 auto;
  font-size: 1rem;
  padding-top: 10px;
  margin-bottom: -10px;
  border-radius: 10px;
  color: #fff;
  background-color: var(--color-primary-red);
}

.form-container {
  margin: 0 auto;
  max-width: 800px;
  /* padding: 2rem; */
  border-radius: 20px;
  background-color: #ccc;
}

.form-image-upload{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;
  font-size: 20px;
  color:#b1b1b1;
  margin-bottom: 20px;
  border-radius: 20px 20px 0 0;
  background-color: #e6e6e6;
}

.form-layout{
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1.5fr 1fr ; 
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}


.form-left {
  justify-content: center;
  align-items: center;
  font-size: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 100px 1fr; 
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
}

.form-row label {
  font-size: 20px;
  text-align: center;
}
.form-row input,textarea {
  height: 30px;
  padding: 5px;
  font-size: 18px;
  border: 3px solid #b9b9b9;
  border-radius: 15px;
}

.form-submit{
  padding-bottom: 1rem;
}

.form-submit button {
  display: block;
  margin: 0 auto;
  padding: 0.5rem 1rem;
  width: 200px;
  height: 45px;
  font-size: 20px;
  color: white;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  background-color: var(--color-primary-red);
}

</style>