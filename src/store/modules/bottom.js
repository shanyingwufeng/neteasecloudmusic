// 底部播放控制和导航

const state = () => ({
    // 显示状态（默认显示）
    visible: true,
});

// 相当于计算属性
const getters = {};

// 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的
const mutations = {
    // 设置显示状态
    setVisible(state, value) {
        state.visible = value;
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
