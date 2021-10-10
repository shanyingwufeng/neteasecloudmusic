// 搜索模块
import { searchByKeyword } from "@/api/search/index.js";

const state = () => ({
    searchKeyword: "", // 搜索关键词
    searchResult: "", // 搜索结果
    searchHistory: [], // 搜索历史
});

// 相当于计算属性
const getters = {};

// 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的
const mutations = {
    setSearchKeyword(state, value) {
        state.searchKeyword = value;
    },

    setSearchResult(state, value) {
        state.searchResult = value;
    },

    setSearchHistory(state, value) {
        state.searchHistory = value;
    },
};

// 所有异步逻辑封装在 action 里面
const actions = {
    async getSearchResult({ commit, state }, payload) {
        commit("setSearchKeyword", payload);
        commit("setLoading", true, { root: true });
        const result = await searchByKeyword(1018, payload);
        if (result.data.code == 200) {
            commit("setSearchResult", result.data.result);
            if (localStorage.getItem("searchHistory")) {
                state.searchHistory = JSON.parse(
                    localStorage.getItem("searchHistory")
                );
                if (state.searchHistory.includes(state.searchKeyword)) {
                    const index = state.searchHistory.indexOf(
                        state.searchKeyword
                    );
                    state.searchHistory.splice(index, 1);
                }
                state.searchHistory.reverse();
                state.searchHistory.push(state.searchKeyword);
                state.searchHistory.reverse();
                localStorage.searchHistory = JSON.stringify(
                    state.searchHistory
                );
            } else {
                state.searchHistory = [];
                state.searchHistory.push(state.searchKeyword);
                localStorage.setItem(
                    "searchHistory",
                    JSON.stringify(state.searchHistory)
                );
            }

            commit(
                "setSearchHistory",
                JSON.parse(localStorage.getItem("searchHistory"))
            );
            commit("setLoading", false, { root: true });
        }
        return result.data.result;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
