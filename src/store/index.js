import { createStore } from "vuex";
import { emailLogin } from "@/api/index.js";
import play from "./modules/play.js";
import bottom from "./modules/bottom.js";

export default createStore({
    modules: {
        play,
        bottom,
    },

    state: {
        // 播放歌单
        playlist: "",

        // 歌曲播放状态（播放还是暂停)
        playState: false,

        // 歌单封面
        playListCover: {
            coverImgUrl: "",
            name: "",
            tags: [],
            description: "",
        },

        // 登录用户
        user: {
            isLogin: localStorage.getItem("userLoginInfo")
                ? JSON.parse(localStorage.getItem("userLoginInfo")).isLogin
                : false,
            id: 0,
            nickName: localStorage.getItem("userLoginInfo")
                ? JSON.parse(localStorage.getItem("userLoginInfo")).nickName
                : "",
            picUrl: "",
            userDetail: "",
        },

        // 加载等待
        loading: false,

        // 底部栏
        bottomShow: true,

        loadingContent: false,

        searchResult: false,

        searchHistory: [], // 搜索历史

        isSearchHistoryShow: false, // 是否显示搜索历史页面

        searchKeyword: "", // 搜索关键词
    },

    // getters 只会依赖 state 中的成员去更新
    getters: {
        songId: (state) => state.playControl.songId,
        songImgUrl: (state) => state.playControl.songImgUrl,
        songName: (state) => state.playControl.songName,
        playState: (state) => state.playState,
        searchHistory: (state) => state.searchHistory,
        isSearchHistoryShow: (state) => state.isSearchHistoryShow,
        searchResult: (state) => state.searchResult,
    },

    mutations: {
        setSearchKeyword(state, value) {
            state.searchKeyword = value;
        },

        setPlayList(state, value) {
            state.playlist = value;
        },

        setUser(state, value) {
            state.user = value;
        },

        showLoading(state) {
            state.loading = true;
        },

        hiddenLoading(state) {
            state.loading = false;
        },

        showLoadingContent(state) {
            state.loadingContent = true;
        },

        hiddenLoadingContent(state) {
            state.loadingContent = false;
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

        setPlayListCover(state, value) {
            state.playListCover = value;
        },

        setSearchHistory(state, value) {
            state.searchHistory = value;
            state.isSearchHistoryShow = true;
        },
    },

    actions: {
        // 邮箱登录
        async emailLogin(content, payload) {
            const result = await emailLogin(payload.email, payload.password);
            if (result.data.code == 200) {
                console.log(
                    `邮箱登录成功！欢迎您！${result.data.profile.nickname}`
                );
                localStorage.cookie = encodeURIComponent(result.data.cookie);
                content.state.user.isLogin = true;
                content.state.user.id = result.data.profile.userId;
                content.state.user.nickName = result.data.profile.nickname;
                content.state.user.picUrl = result.data.profile.avatarUrl;
                content.state.user.userDetail = result.data.profile;
                localStorage.userLoginInfo = JSON.stringify(content.state.user);
            }
            return result;
        },
    },
});
