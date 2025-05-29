import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/home/Home.vue'
import MapView from '../views/map/MapView.vue'
import Reviews from '../views/reviews/Reviews.vue'
import Events from '../views/events/Events.vue'
import Subscription from '../views/sub/Subscription.vue'
import Member from '../views/member/Member.vue'
import Cart from '../views/cart/Cart.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/map', name: 'Map',component: MapView },
  { path: '/reviews', component: Reviews },
  { path: '/events', component: Events },
  { path: '/subscription', component: Subscription },
  { path: '/member', component: Member },
  { path: '/cart', component: Cart },
]

const router = createRouter({
  history: createWebHistory(),
  routes,

})

export default router