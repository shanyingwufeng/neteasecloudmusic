// 用户模块
import { login } from "@/api/login/index.js";
import { getUserPlayList } from "@/api/user/index.js";

const state = () => ({
    user: {
        isLogin: false,
        id: 0,
        nickName: "",
        picUrl: "",
        allPlaylistIds: [], // 个人所有歌单id
        userDetail: "",
    },
});

// 相当于计算属性
const getters = {
    getAllPlaylistIds(state) {
        if (state.user.allPlaylistIds.length === 0) {
            getUserPlayList(state.user.id).then((res) => {
                const result = [];
                res.data.playlist.map((x) => {
                    result.push(x.id);
                    state.user.allPlaylistIds = Array.from(new Set(result));
                });
            });
        }
        return state.user.allPlaylistIds;
    },
};

// 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的
const mutations = {
    setUser(state, payload) {
        state.user.isLogin = payload.isLogin;
        state.user.id = payload.id;
        state.user.nickName = payload.nickName;
        state.user.picUrl = payload.picUrl;
        state.user.userDetail = payload.userDetail;
    },
};

// 所有异步逻辑封装在 action 里面
const actions = {
    // 登录（手机密码登录、手机验证码登录、邮箱登录）
    async login({ commit, state }, payload) {
        const result = await login(payload);
        if (result.data.code == 200) {
            localStorage.cookie = encodeURIComponent(result.data.cookie);
            state.user.isLogin = true;
            state.user.id = result.data.profile.userId;
            state.user.nickName = result.data.profile.nickname;
            state.user.picUrl = result.data.profile.avatarUrl;
            state.user.userDetail = result.data.profile;
            state.user;
            localStorage.userLoginInfo = JSON.stringify(state.user);
        }
        return result;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
