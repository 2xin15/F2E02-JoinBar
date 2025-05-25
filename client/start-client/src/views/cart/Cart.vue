<template>
  <div class="cart-container">
    <h2>購物車</h2>

    <!-- Loading 效果 -->
    <div v-if="isLoading" class="loading-box">
      <div class="spinner"></div>
      <p>載入中，請稍候...</p>
    </div>

    <!-- 購物車內容 -->
    <div v-else>
      <div class="cart-header">
        <div>商品</div>
        <div>單價</div>
        <div>數量</div>
        <div>小計</div>
        <div>操作</div>
      </div>

      <div v-for="item in cartItems" :key="item.id" class="cart-row">
        <div class="product">
          <img class="product-img" :src="item.image || 'https://placehold.co/80x80?text=No+Image'" />
          <div class="product-info">
            <p class="product-name">{{ item.name }}</p>
          </div>
        </div>

        <div class="price">${{ item.price }}</div>

        <div class="qty-box">
          <button @click="decreaseQty(item)">−</button>
          <span>{{ item.quantity }}</span>
          <button @click="increaseQty(item)">+</button>
        </div>

        <div class="subtotal">${{ calcSubtotal(item) }}</div>

        <div class="actions">
          <button @click="removeItem(item.id)">刪除</button>
        </div>
      </div>

      <div class="total-bar">
        <p class="total-label">
          總金額：<strong>${{ totalPrice }}</strong>
        </p>
        <button class="checkout-btn">去買單</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const router = useRouter()
const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    cart.loadFromStorage()
    isLoading.value = false
  }, 600) // 可調整時間或改為等待 API
})

const cartItems = computed(() => cart.items)
const increaseQty = (item) => cart.increase(item)
const decreaseQty = (item) => cart.decrease(item)
const removeItem = (id) => cart.removeItem(id)
const calcSubtotal = (item) => (item.price * item.quantity).toFixed(0)

const totalPrice = computed(() =>
  cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0)
)
</script>

<style scoped>
.cart-container {
  max-width: 1280px;
  margin: 3rem auto;
  padding: 2.5rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.05);
  font-size: 15px;
}

.loading-box {
  text-align: center;
  padding: 3rem 0;
  color: #666;
}

.spinner {
  margin: 1rem auto;
  width: 40px;
  height: 40px;
  border: 4px solid #eee;
  border-top: 4px solid #f44;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.cart-header {
  display: flex;
  padding: 1rem 0;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
}

.cart-header > div {
  flex: 1;
  text-align: center;
}

.cart-header > div:first-child {
  flex: 2;
  text-align: left;
}

.cart-row {
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}

.cart-row:hover {
  background-color: #fafafa;
}

.cart-row > div {
  flex: 1;
  text-align: center;
}

.cart-row > div:first-child {
  flex: 2;
  text-align: left;
}

.product {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.product-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  background-color: #f0f0f0;
}

.product-name {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.qty-box {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.qty-box button {
  width: 32px;
  height: 32px;
  border: 1px solid #bbb;
  border-radius: 4px;
  background-color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.qty-box button:hover {
  background-color: #eee;
}

.qty-box span {
  width: 36px;
  text-align: center;
  font-weight: 500;
}

.actions button {
  border: 1px solid #dc3545;
  color: #dc3545;
  background: white;
  padding: 6px 12px;
  font-size: 13px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.actions button:hover {
  background-color: #dc3545;
  color: white;
}

.total-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;
}

.total-label {
  font-size: 1.2rem;
}

.checkout-btn {
  background-color: #f44;
  color: white;
  border: none;
  padding: 0.6rem 1.5rem;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.checkout-btn:hover {
  background-color: #d32f2f;
}
</style>
