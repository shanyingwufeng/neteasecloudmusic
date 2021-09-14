import { createRouter, createWebHistory } from 'vue-router'
import $store from "@/store/index.js"

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/home/Home.vue'),
        meta: {
            playControllerShow: true,
            keepAlive: true,
        }
    },
    {
        // 歌单
        path: '/listview',
        name: 'ListView',
        component: () => import('@/views/playlist/PlayList.vue'),
        meta: {
            playControllerShow: true,
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
            if ($store.state.user.isLogin) {
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
        component: () => import('@/views/login/Login.vue'),
        meta: {
            playControllerShow: false
        }
    },
    {
        path: '/phoneLogin',
        name: 'PhoneLogin',
        component: () => import('@/views/login/PhoneLogin.vue'),
        meta: {
            playControllerShow: false
        }
    },
    {
        path: '/emailLogin',
        name: 'EmailLogin',
        component: () => import('@/views/login/EmailLogin.vue'),
        meta: {
            playControllerShow: false
        }
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
