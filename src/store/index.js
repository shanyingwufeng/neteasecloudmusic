import { createStore } from "vuex";
import play from "./modules/play.js";
import bottom from "./modules/bottom.js";
import user from "./modules/user.js";
import search from "./modules/search.js";

export default createStore({
    modules: {
        play,
        bottom,
        user,
        search,
    },

    state: {
        // 加载等待
        loading: false,
        loadingContent: false,
        searchResult: false,
        searchHistory: [], // 搜索历史
        isSearchHistoryShow: false, // 是否显示搜索历史页面
        searchKeyword: "", // 搜索关键词
    },

    // getters 只会依赖 state 中的成员去更新
    getters: {
        searchHistory: (state) => state.searchHistory,
        isSearchHistoryShow: (state) => state.isSearchHistoryShow,
        searchResult: (state) => state.searchResult,
    },

    mutations: {
        setLoading(state, value) {
            state.loading = value;
        },

        showLoadingContent(state) {
            state.loadingContent = true;
        },

        hiddenLoadingContent(state) {
            state.loadingContent = false;
        },

        setSearchKeyword(state, value) {
            state.searchKeyword = value;
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

        setSearchHistory(state, value) {
            state.searchHistory = value;
            state.isSearchHistoryShow = true;
        },
    },

    actions: {},
});
