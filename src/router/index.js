import { createRouter, createWebHistory } from 'vue-router'
import $store from "@/store/index.js"

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/home/Home.vue'),
        meta: {
            keepAlive: true,
        }
    },
    {
        // 歌单
        path: '/listview',
        name: 'ListView',
        component: () => import('@/views/playlist/PlayList.vue'),
    },
    {
        // 播放页面
        path: '/playpage',
        name: 'PlayPage',
        component: () => import('@/components/PlayPage.vue'),
    },
    {
        path: '/search',
        name: 'Search',
        component: () => import('@/views/search/Search.vue'),
    },
    {
        path: '/me',
        name: 'Me',
        component: () => import('@/views/profile/Me.vue'),
        // 路由守卫
        beforeEnter: (to, from, next) => {
            if ($store.state.user.isLogin) {
                next();
            } else {
                next("/login");
            }
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/Login.vue'),

    },
    {
        path: '/phoneLogin',
        name: 'PhoneLogin',
        component: () => import('@/views/login/PhoneLogin.vue'),
    },
    {
        path: '/emailLogin',
        name: 'EmailLogin',
        component: () => import('@/views/login/EmailLogin.vue'),
    },
    {
        path: '/boke',
        name: 'Boke.vue',
        component: () => import('@/views/podcast/BoKe.vue'),
    },
    {
        path: '/k',
        name: 'K',
        component: () => import('@/views/ktv/K.vue'),
    },
    {
        path: '/friends',
        name: 'Friends',
        component: () => import('@/views/cloudvillage/CloudVillage.vue'),
    },
    {
        // 歌单封面
        path: '/playlistcover',
        name: 'PlayListCover',
        component: () => import('@/views/playlist/PlayListCover.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
