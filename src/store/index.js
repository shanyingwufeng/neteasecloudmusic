import { createStore } from 'vuex'
import { phoneLogin, userDetail } from "@/api/index.js";

export default createStore({
    state: {
        // 播放列表
        playlist: [
            { al: {} }
        ],

        // 歌单封面
        playListCover: {
            coverImgUrl: '',
            name: '',
            tags: [],
            description: '',
        },

        // 播放索引
        playCurrentIndex: 0,

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

        playControlPosition: '',

        // 底部栏
        bottomShow: true,
    },

    mutations: {
        // 设置播放列表
        setPlayList(state, value) {
            state.playlist = value;
        },
        setPlayCurrentIndex(state, value) {
            state.playCurrentIndex = value;
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
        showFooterTabBar(state) {
            state.footerTabBarShow = true;
        },
        hiddenFooterTabBar(state) {
            state.footerTabBarShow = false;
        },
        setPlayControlPosition(state, value) {
            state.playControlPosition = value;
        },
        showBottom(state) {
            state.bottomShow = true;
        },
        hiddenBottom(state) {
            state.bottomShow = false;
        },
        setPlayListCover(state, value) {
            state.playListCover = value;
        }
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
