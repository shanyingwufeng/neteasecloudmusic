import { createStore } from "vuex";
import play from "./modules/play.js";
import bottom from "./modules/bottom.js";
import user from "./modules/user.js";

export default createStore({
    modules: {
        play,
        bottom,
        user,
    },

    state: {
        // 加载等待
        loading: false,

        // 底部栏
        bottomShow: true,

        loadingContent: false,

        searchResult: false,

        searchHistory: [], // 搜索历史

        isSearchHistoryShow: false, // 是否显示搜索历史页面

        searchKeyword: "", // 搜索关键词
    },

    // getters 只会依赖 state 中的成员去更新
    getters: {
        playState: (state) => state.playState,
        searchHistory: (state) => state.searchHistory,
        isSearchHistoryShow: (state) => state.isSearchHistoryShow,
        searchResult: (state) => state.searchResult,
    },

    mutations: {
        setSearchKeyword(state, value) {
            state.searchKeyword = value;
        },

        setPlayList(state, value) {
            state.playlist = value;
        },

        setUser(state, value) {
            state.user = value;
        },

        setLoading(state, value) {
            state.loading = value;
        },

        showLoading(state) {
            state.loading = true;
        },

        hiddenLoading(state) {
            state.loading = false;
        },

        showLoadingContent(state) {
            state.loadingContent = true;
        },

        hiddenLoadingContent(state) {
            state.loadingContent = false;
        },

        showSearchResult(state) {
            state.searchResult = true;
        },

        hiddenSearchResult(state) {
            state.searchResult = false;
        },

        showSearchHistory(state) {
            state.isSearchHistoryShow = true;
        },

        hiddenSearchHistory(state) {
            state.isSearchHistoryShow = false;
        },

        setPlayListCover(state, value) {
            state.playListCover = value;
        },

        setSearchHistory(state, value) {
            state.searchHistory = value;
            state.isSearchHistoryShow = true;
        },
    },

    actions: {},
});
