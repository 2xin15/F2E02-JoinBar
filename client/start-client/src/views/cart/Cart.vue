<template>
  <section class="cart-container">
    <h2 class="cart-title">🛒 購物車</h2>

    <div class="cart-header">
      <div>商品</div>
      <div>單價</div>
      <div>數量</div>
      <div>小計</div>
      <div>操作</div>
    </div>

    <div v-for="item in cartItems" :key="item.id" class="cart-row">
      <div class="product">
        <img
          class="product-img"
          :src="item.image || 'https://placehold.co/80x80?text=No+Image'"
          alt="商品圖片"
        />
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
        <button class="remove-btn" @click="removeItem(item.id)">刪除</button>
      </div>
    </div>

    <div class="total-bar">
      <p class="total-label">總金額：<strong>${{ totalPrice }}</strong></p>
      <button class="checkout-btn">去買單</button>
    </div>
  </section>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'
import { onMounted, computed } from 'vue'

const cart = useCartStore()

onMounted(() => {
  cart.loadFromStorage()
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
body {
  background-color: #f8f9fa;
  font-family: "Segoe UI", "Noto Sans TC", sans-serif;
  color: #333;
}

.cart-container {
  max-width: 1240px;
  margin: 3rem auto;
  padding: 2.5rem 3rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.04);
}

.cart-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.cart-header,
.cart-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
}

.cart-header {
  background-color: #f1f3f5;
  font-weight: bold;
  font-size: 15px;
  color: #555;
  border-bottom: 1px solid #ddd;
}

.cart-header > div,
.cart-row > div {
  flex-basis: 18%;
  text-align: center;
}

.cart-header > div:first-child,
.cart-row > div:first-child {
  flex-basis: 28%;
}

.cart-row {
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;
}

.cart-row:hover {
  background-color: #fafafa;
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
  border-radius: 8px;
  background-color: #e9ecef;
  border: 1px solid #ddd;
}

.product-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.product-name {
  font-weight: 600;
  font-size: 16px;
  margin: 0;
  line-height: 1.4;
}

.price,
.subtotal {
  font-weight: 600;
  font-size: 15px;
  color: #222;
}

.qty-box {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
}

.qty-box button {
  width: 32px;
  height: 32px;
  border: 1px solid #bbb;
  border-radius: 6px;
  background-color: #fff;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.qty-box button:hover {
  background-color: #dee2e6;
}

.qty-box span {
  width: 32px;
  text-align: center;
  font-weight: 500;
  font-size: 15px;
}

.actions {
  display: flex;
  justify-content: center;
}

.remove-btn {
  height: 32px;
  border: 1px solid #dc3545;
  color: #dc3545;
  background: white;
  padding: 0 12px;
  font-size: 13px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.remove-btn:hover {
  background-color: #dc3545;
  color: white;
}

.total-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2.5rem;
  padding-right: 0.5rem;
}

.total-label {
  font-size: 1.25rem;
}

.checkout-btn {
  background-color: #f44;
  color: white;
  border: none;
  padding: 0.7rem 1.6rem;
  font-size: 15px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.25s;
}

.checkout-btn:hover {
  background-color: #c62828;
}
</style>
