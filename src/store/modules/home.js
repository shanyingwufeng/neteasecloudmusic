// 首页模块
import { getHomePageInfo } from "@/api/home/index.js";

const state = () => ({
    // 首页数据
    homeData: "",

    // 首页刷新
    homePageRefresh: false,
});

// 相当于计算属性
const getters = {};

// 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的
const mutations = {
    // 设置首页数据
    setHomeData(state, value) {
        state.homeData = value;
        // console.log(value);
    },

    setHomePageRefresh(state, value) {
        state.homePageRefresh = value;
    },
};

// 所有异步逻辑封装在 action 里面
const actions = {
    // 获取首页数据
    getHomeData({ commit }) {
        getHomePageInfo().then((res) => {
            commit("setHomeData", res.data.data.blocks);
        });
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
