// 位置信息
const state = () => ({
    cache: {},
});
const getters = {
    getCache(state) {
        return state.cache;
    },
};
const actions = {};
const mutations = {
    setCache(state, { name, position }) {
        state.cache[name] = position;
    },
};
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
