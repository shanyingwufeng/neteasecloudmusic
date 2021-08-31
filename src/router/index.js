import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store/index.js"

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/home/Home.vue'),
        meta: {
            playControllerShow: false
        }
    },
    {
        path: '/listview',
        name: 'ListView',
        component: () => import('@/views/ListView.vue'),
        meta: {
            playControllerShow: true
        }
    },
    {
        path: '/search',
        name: 'Search',
        component: () => import('@/views/search/Search.vue'),
        meta: {
            playControllerShow: false
        }
    },
    {
        path: '/me',
        name: 'Me',
        component: () => import('@/views/profile/Me.vue'),
        // 路由守卫
        beforeEnter: (to, from, next) => {
            if (store.state.user.isLogin) {
                next();
            } else {
                next("/login");
            }
        },
        meta: {
            playControllerShow: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
        meta: {
            playControllerShow: false
        }
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
