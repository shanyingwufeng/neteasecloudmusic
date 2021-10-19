// 播放模块
import { getLyric, getSongDetail, getMusicComment } from "@/api/song/index.js";
import { getPlayListDetail } from "@/api/playlist/index.js";
import { getAlbum } from "@/api/album/index.js";
import { Toast } from "vant";

const state = () => ({
    // 播放状态
    playState: false,

    // 播放歌曲当前时间
    playCurrentTime: 0,

    // 播放歌曲信息
    playSong: {
        id: 0, // 歌曲id
        name: "", // 歌曲名称
        author: "", // 歌曲作者
        imgUrl: "", // 歌曲图片地址
        lyric: "", // 歌曲歌词
    },

    // 播放歌单
    playList: "",

    // 专辑
    album: "",

    // 歌单歌曲列表
    songList: "",

    // 所有歌单歌曲id
    songIds: "",
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

    // 获取播放歌单
    getPlayList: (state) => {
        if (localStorage.getItem("playList")) {
            state.playList = JSON.parse(localStorage.getItem("playList"));
        }
        return state.playList;
    },

    // 获取播放状态
    getPlayState: (state) => {
        return state.playState;
    },

    // 获取播放状态
    getSongIds: (state) => {
        return state.songIds;
    },
};

// 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的
const mutations = {
    // 设置播放状态
    setPlayState(state, value) {
        state.playState = value;
    },

    // 设置播放歌曲歌词
    setPlaySongLyric(state, value) {
        state.playSong.lyric = value;
    },

    // 设置播放歌曲
    setPlaySong(state, payload) {
        localStorage.setItem("playSong", JSON.stringify(payload));
        state.playSong = payload;
    },

    // 设置播放歌曲当前时间
    setPlayCurrentTime(state, value) {
        state.playCurrentTime = value;
    },

    // 设置播放歌单
    setPlayList(state, payload) {
        state.playList = payload;
    },

    // 设置专辑
    setAlbum(state, payload) {
        state.album = payload;
    },

    // 设置歌单歌曲列表
    setSongList(state, value) {
        state.songList = value;
    },

    // 设置所有歌曲id
    setSongIds(state, value) {
        state.songIds = value;
    },
};

// 所有异步逻辑封装在 action 里面
const actions = {
    // 获取播放歌曲歌词
    async getLyric({ commit }, id) {
        await getLyric(id).then((res) => {
            commit("setPlaySongLyric", res.data.lrc.lyric);
        });
    },

    // 获取歌单详情
    async setPlayList({ commit }, id) {
        await getPlayListDetail(id).then((res) => {
            commit("setPlayList", res.data.playlist);
            commit(
                "setSongIds",
                res.data.playlist.trackIds.map((x) => {
                    return x.id;
                })
            );
        });
    },

    // 获取专辑详情
    async setAlbum({ commit }, id) {
        await getAlbum(id).then((res) => {
            commit("setAlbum", res.data.album);
            commit(
                "setSongIds",
                res.data.songs.map((x) => {
                    return x.id;
                })
            );
        });
    },

    // 播放歌曲详情
    async setPlaySongInfo({ commit }, id) {
        await getSongDetail(id).then(async (res) => {
            const playSong = {
                id: 0,
                name: "",
                author: "",
                imgUrl: "",
                lyric: "",
                comments: 0,
            };
            playSong.id = res.data.songs[0].id;
            playSong.name = res.data.songs[0].name;
            playSong.author = res.data.songs[0].ar[0].name;
            playSong.imgUrl = res.data.songs[0].al.picUrl;
            playSong.lyric = await getLyric(id).then((res) => {
                if (res.data.lrc) {
                    return res.data.lrc.lyric;
                } else {
                    return "";
                }
            });
            playSong.comments = await getMusicComment(id).then((res) => {
                return res.data.total;
            });
            commit("setPlaySong", playSong);
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
