import { request } from "./request";

// 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户详情
export function getUserDetail(id) {
    return request({
        url: `/user/detail?uid=${id}&cookie=${localStorage.getItem("cookie")}`,
    });
}

// 说明 : 登录后调用此接口 , 获取用户信息 , 歌单，收藏，mv, dj 数量
export function getUserSubCount(id) {
    return request({
        url: `/user/subcount?cookie=${localStorage.getItem("cookie")}`,
    });
}

// 说明 : 登录后调用此接口 , 可以获取用户等级信息,包含当前登录天数,听歌次数,下一等级需要的登录天数和听歌次数,当前等级进度
export function getUserLevel() {
    return request({
        url: `/user/level?cookie=${localStorage.getItem("cookie")}`,
    });
}

// 登录后调用此接口 , 传入用户 id, 可以获取用户歌单
export function getUserPlayList(id) {
    return request({
        url: `/user/playlist?uid=${id}&cookie=${localStorage.getItem(
            "cookie"
        )}`,
    });
}

// 说明 : 调用此接口,可获取所有榜单
export function getTopList() {
    return request({
        url: "/toplist",
    });
}

// 说明 : 收藏歌手列表
export function getsublist() {
    return request({
        url: `/user/account?cookie=${localStorage.getItem("cookie")}`,
    });
}
