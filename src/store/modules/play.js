// 播放模块
const state = () => ({
    // 播放状态
    playState: false,

    // 播放歌单
    playList: null,

    // 播放歌曲
    playSong: {
        id: 0, // 歌曲id
        name: "", // 歌曲名称
        author: "", // 歌曲作者
        imgUrl: "", // 歌曲图片地址
    },
});

// 相当于计算属性
const getters = {
    // 获取播放歌曲
    getPlaySong: (state) => {
        if (localStorage.getItem("playSong")) {
            state.playSong = JSON.parse(localStorage.getItem("playSong"));
        }
        return state.playSong;
    },
};

// 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的
const mutations = {
    // 设置播放状态
    setPlayState(state, value) {
        state.playState = value;
    },

    // 设置播放歌单
    setPlayList(state, value) {
        state.playList = value;
    },

    // 设置播放歌曲
    setPlaySong(state, payload) {
        localStorage.setItem("playSong", JSON.stringify(payload));
        state.playSong = payload;
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
