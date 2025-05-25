import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const sampleProducts = [
    {
      id: 1,
      name: '精釀啤酒｜琥珀艾爾',
      price: 120,
      spec: '330ml 瓶裝',
      quantity: 2,
      image: 'https://placehold.co/80x80?text=Beer',
    },
    {
      id: 2,
      name: '威士忌｜格蘭菲迪 12 年',
      price: 980,
      spec: '700ml 原裝',
      quantity: 1,
      image: 'https://placehold.co/80x80?text=Whisky',
    },
  ]

  const loadFromStorage = () => {
    const saved = localStorage.getItem('cart')
    items.value = saved ? JSON.parse(saved) : sampleProducts
  }

  watch(items, (val) => localStorage.setItem('cart', JSON.stringify(val)), { deep: true })

  const addItem = (item) => {
    const existing = items.value.find((i) => i.id === item.id)
    existing ? (existing.quantity += item.quantity) : items.value.push({ ...item })
  }

  const removeItem = (id) => (items.value = items.value.filter((i) => i.id !== id))
  const increase = (item) => item.quantity++
  const decrease = (item) => {
    if (item.quantity > 1) item.quantity--
  }
  const clearCart = () => (items.value = [])

  return { items, loadFromStorage, addItem, removeItem, increase, decrease, clearCart }
})
