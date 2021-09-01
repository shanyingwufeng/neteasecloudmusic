import { createStore } from 'vuex'
import { phoneLogin, userDetail } from "@/api/index.js";

export default createStore({
    state: {
        playlist: [
            {
                al: { }
            }
        ],
        playCurrentIndex: 0,
        user: {
            isLogin: false,
            account: { },
            userDetail: { },
            nickName: '',
        },
    },
    mutations: {
        setPlayList(state, value) {
            state.playlist = value;
        },
        setPlayCurrentIndex(state, value) {
            state.playCurrentIndex = value;
        },
        setUser(state, value) {
            state.user = value;
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
    modules: {
    }
})
