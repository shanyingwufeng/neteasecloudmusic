import { createRouter, createWebHistory } from "vue-router";
import $store from "@/store/index.js";

const routes = [
    {
        // 首页
        path: "/",
        name: "Home",
        component: () => import("@/views/home/Home.vue"),
        meta: {
            keepAlive: true,
        },
    },
    {
        path: "/home",
        redirect: "/",
    },
    {
        // 搜索页面
        path: "/searchpage",
        name: "SearchPage",
        component: () => import("@/views/search/SearchPage.vue"),
        meta: {
            keepAlive: true,
            isBack: true,
            hiddenBottomTabBar: true,
        },
    },
    {
        // 搜索结果页面
        path: "/search",
        name: "SearchResult",
        component: () => import("@/views/search/searchresult/SearchResult.vue"),
        meta: {
            hiddenBottomTabBar: true,
        },
    },
    {
        // 歌单
        path: "/playlist",
        name: "PlayList",
        component: () => import("@/views/playlist/PlayList.vue"),
        meta: {
            hiddenBottomTabBar: true,
        },
    },
    {
        // 播放页面
        path: "/playpage",
        name: "PlayPage",
        component: () => import("@/components/PlayPage.vue"),
        meta: {
            hiddenBottom: true,
        },
    },
    {
        // 个人中心
        path: "/me",
        name: "Me",
        component: () => import("@/views/profile/Me.vue"),
        // 路由守卫
        // beforeEnter: (to, from, next) => {
        //     if ($store.state.user.isLogin) {
        //         next();
        //     } else {
        //         next("/login");
        //     }
        // },
    },
    {
        // 登录页面
        path: "/login",
        name: "Login",
        component: () => import("@/views/login/Login.vue"),
        meta: {
            hiddenBottom: true,
        },
    },
    {
        path: "/phonelogin",
        name: "PhoneLogin",
        component: () => import("@/views/login/PhoneLogin.vue"),
        meta: {
            hiddenBottom: true,
        },
    },
    {
        path: "/emailLogin",
        name: "EmailLogin",
        component: () => import("@/views/login/EmailLogin.vue"),
        meta: {
            hiddenBottom: true,
        },
    },
    {
        path: "/boke",
        name: "Boke.vue",
        component: () => import("@/views/podcast/BoKe.vue"),
    },
    {
        path: "/k",
        name: "K",
        component: () => import("@/views/ktv/K.vue"),
    },
    {
        path: "/friends",
        name: "Friends",
        component: () => import("@/views/cloudvillage/CloudVillage.vue"),
    },
    {
        path: "/recommendeddaily", // 每日推荐
        name: "RecommendedDaily",
        component: () =>
            import(
                "@/views/home/homecenternav/HomeCenterNavRecommendedDaily.vue"
            ),
        meta: {
            hiddenBottomTabBar: true,
        },
    },
    {
        path: "/playlistsquare", // 歌单广场
        name: "PlayListSquare",
        component: () =>
            import(
                "@/views/home/homecenternav/HomeCenterNavPlayListSquare.vue"
            ),
        meta: {
            hiddenBottomTabBar: true,
        },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,

    // scrollBehavior(to, from, savedPosition) {
    //     console.log(savedPosition);
    //     if (savedPosition) {
    //         return savedPosition;
    //     } else {
    //         return {
    //             x: 0,
    //             y: 0,
    //         };
    //     }
    // },
});

export default router;
