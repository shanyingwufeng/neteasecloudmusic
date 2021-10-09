// 搜索模块
import { login } from "@/api/login/index.js";

const state = () => ({
    searchKeyword: "", // 搜索关键词
    searchHistory: [], // 搜索历史
    isSearchHistoryShow: false, // 是否显示搜索历史
    searchResult: false, // 搜索结果
});

// 相当于计算属性
const getters = {};

// 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的
const mutations = {
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
};

// 所有异步逻辑封装在 action 里面
const actions = {
    // 登录（手机密码登录、手机验证码登录、邮箱登录）
    async login({ commit, state }, payload) {
        const result = await login(payload);
        if (result.data.code == 200) {
            localStorage.cookie = encodeURIComponent(result.data.cookie);
            state.user.isLogin = true;
            state.user.id = result.data.profile.userId;
            state.user.nickName = result.data.profile.nickname;
            state.user.picUrl = result.data.profile.avatarUrl;
            state.user.userDetail = result.data.profile;
            localStorage.userLoginInfo = JSON.stringify(state.user);
        }
        return result;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
