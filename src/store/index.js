import { createStore } from 'vuex'
import { phoneLogin, userDetail } from "@/api/index.js";

export default createStore({
    state: {
        // 播放列表
        playlist: '',

        // 底部播放控制信息
        playControl: {
            songId: localStorage.getItem("songId"), // 歌曲id
            songImgUrl: localStorage.getItem("songImgUrl"), // 歌曲图片地址
            songName: localStorage.getItem("songName"), // 歌曲名
        },

        playState: false, // 歌曲播放状态（播放还是暂停）

        // 歌单封面
        playListCover: {
            coverImgUrl: '',
            name: '',
            tags: [],
            description: '',
        },

        // 登录用户
        user: {
            isLogin: false,
            account: {},
            userDetail: {},
            nickName: '',
        },

        // 加载等待
        loading: false,

        // 底部导航栏
        footerTabBarShow: true,

        // 底部栏
        bottomShow: true,
    },

    mutations: {
        setPlayList(state, value) {
            state.playlist = value;
        },

        setUser(state, value) {
            state.user = value;
        },
        showLoading(state) {
            state.loading = true;
        },
        hideLoading(state) {
            state.loading = false;
        },
        showBottom(state) {
            state.bottomShow = true;
        },
        hiddenBottom(state) {
            state.bottomShow = false;
        },
        setPlayListCover(state, value) {
            state.playListCover = value;
        },

        setPlayControl(state, value) {
            console.log(value);
            localStorage.setItem("songId", value.id);
            localStorage.setItem("songImgUrl", value.al.picUrl);
            localStorage.setItem("songName", value.name);
            state.playControl.songId = localStorage.getItem("songId");
            state.playControl.songImgUrl = localStorage.getItem("songImgUrl");
            state.playControl.songName = localStorage.getItem("songName");
            state.playState = true;
        },

        setPlayState(state, value) {
            state.playState = value;
        },
    },

    // getters 只会依赖 state 中的成员去更新
    getters: {
        songId: (state) => state.playControl.songId,
        songImgUrl: (state) => state.playControl.songImgUrl,
        songName: (state) => state.playControl.songName,
    },

    actions: {
        async login(content, payload) {
            // console.log(payload);
            let result = await phoneLogin(payload.username, payload.password);
            if (result.data.code == 200) {
                content.state.user.isLogin = true;
                content.state.user.account = result.data.account;
                let userInfo = await userDetail(result.data.account.id);
                content.state.user.nickName = result.data.profile.nickname;
                content.state.user.userDetail = userInfo.data;
                localStorage.userLoginInfo = JSON.stringify(content.state.user);
                content.commit("setUser", content.state.user);
            }
            return result;
        }
    },
})
