// 首页模块

const state = () => ({
    homePageRefresh: false,
});

// 相当于计算属性
const getters = {};

// 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的
const mutations = {
    setHomePageRefresh(state, value) {
        state.homePageRefresh = value;
    },
};

// 所有异步逻辑封装在 action 里面
const actions = {};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
