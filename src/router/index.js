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
        meta: {
            hiddenTabBar: true,
        }
    },
    {
        // 播放页面
        path: '/playpage',
        name: 'PlayPage',
        component: () => import('@/components/PlayPage.vue'),
    },
    {
        // 搜索页面
        path: '/search',
        name: 'Search',
        component: () => import('@/views/search/Search.vue'),
        meta: {
            keepAlive: true,
            hiddenTabBar: true,
            isBack: true,
        }
    },
    {
        // 搜索结果页面
        path: '/searchresult',
        name: 'SearchResult',
        component: () => import('@/views/search/searchresult/SearchResult.vue'),
        meta: {
            hiddenTabBar: true,
        }
    },
    {
        // 个人中心
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
        // 登录页面
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
        meta: {
            hiddenBottom: true,
        }
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
