import { createStore } from "vuex";
import home from "./modules/home.js";
import play from "./modules/play.js";
import bottom from "./modules/bottom.js";
import user from "./modules/user.js";
import search from "./modules/search.js";

export default createStore({
    modules: {
        home,
        play,
        bottom,
        user,
        search,
    },

    state: {
        // 加载等待
        loading: false,

        // 歌单歌曲加载等待
        playListLoading: false,
    },

    // getters 只会依赖 state 中的成员去更新
    getters: {},

    mutations: {
        setLoading(state, value) {
            state.loading = value;
        },
        setPlayListLoading(state, value) {
            state.playListLoading = value;
        },
    },

    actions: {},
});
