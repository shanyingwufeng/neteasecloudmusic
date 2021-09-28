import { request } from "./request";
import $store from "@/store/index.js";
 
// 获取歌单详情
export function getPlayListDetail(id) {
    return request({
        url: '/playlist/detail?id=' + id,
    })
}

// 获取歌曲详情
export function getSongDetail(id) {
    return request({
        url: '/song/detail?ids=' + id,
    })
}

// 邮箱登录
export function emailLogin(email, password) {
    return request({
        url: `/login?email=${email}&password=${password}`
    })
}

// 获取用户详情
export function userDetail(id) {
    return request({
        url: `/user/detail?uid=` + id,
    })
}

// 说明 : 调用此接口,可获取所有榜单
export function getTopList() {
    return request({
        url: '/toplist',
    })
}

// 说明 : 收藏歌手列表
export function getsublist() {
    return request({
        url: `/user/account?cookie=${localStorage.getItem("cookie")}`,
    })
}
