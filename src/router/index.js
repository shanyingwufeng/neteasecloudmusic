import {
    createRouter,
    createWebHistory,
    createWebHashHistory,
} from "vue-router";
import $store from "@/store/index.js";

const routes = [
    {
        // 首页
        path: "/",
        name: "Home",
        component: () => import("@/views/home"),
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
        component: () => import("@/views/search"),
        meta: {
            keepAlive: true,
            isBack: true,
            hiddenBottomTabBar: true,
        },
    },
    {
        // 搜索结果页面
        path: "/search",
        name: "Search",
        component: () => import("@/views/search/searchresult"),
        meta: {
            hiddenBottomTabBar: true,
        },
    },
    {
        // 歌单
        path: "/playlist",
        name: "PlayList",
        component: () => import("@/views/playlist"),
        meta: {
            hiddenBottomTabBar: true,
        },
    },
    {
        // 专辑
        path: "/album",
        name: "Album",
        component: () => import("@/views/album"),
        meta: {
            hiddenBottomTabBar: true,
        },
    },
    {
        // 播放页面
        path: "/playpage",
        name: "PlayPage",
        component: () => import("@/components/playpage"),
        meta: {
            hiddenBottom: true,
        },
    },
    {
        // 个人中心
        path: "/me",
        name: "Me",
        component: () => import("@/views/profile"),
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
        component: () => import("@/views/login"),
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
        path: "/podcast",
        name: "Podcast",
        component: () => import("@/views/podcast"),
    },
    {
        path: "/follow",
        name: "Follow",
        component: () => import("@/views/follow"),
    },
    {
        path: "/village",
        name: "Village",
        component: () => import("@/views/village"),
    },
    {
        path: "/recommendeddaily", // 首页中间导航每日推荐
        name: "RecommendedDaily",
        component: () =>
            import("@/views/home/centernav/HomeCenterNavRecommendedDaily.vue"),
        meta: {
            hiddenBottomTabBar: true,
        },
    },
    {
        path: "/playlistsquare", // 首页中间导航歌单广场
        name: "PlayListSquare",
        component: () =>
            import("@/views/home/centernav/HomeCenterNavPlaylist.vue"),
        meta: {
            hiddenBottomTabBar: true,
        },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    // history: createWebHashHistory(),
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
