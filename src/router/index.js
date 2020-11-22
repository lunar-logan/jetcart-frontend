import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/search',
        name: 'SearchView',
        component: () => import('../views/SearchView.vue')
    },
    {
        path: '/jetcart',
        name: 'JetcartApp',
        component: () => import('../views/JetcartApp.vue')
    },
    {
        path: '/product/:id',
        name: 'ProductDescriptionView',
        component: () => import('../views/ProductDescriptionView.vue')
    },
    {
        path: '/cart',
        name: 'CheckoutView',
        component: () => import('../views/CheckoutView.vue')
    },
    {
        path: '/checkout/:id',
        name: 'CheckoutAddressStepView',
        component: () => import('../views/CheckoutAddressStepView')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
