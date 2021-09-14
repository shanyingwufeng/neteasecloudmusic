import { request } from "./request";

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

// 搜索歌曲
export function search(keyword) {
    return request({
        url: '/search?keywords=' + keyword,
    })
}

// 手机登录
export function phoneLogin(phone, password) {
    return request({
        url: `/login/cellphone?phone=${phone}&password=${password}`
    })
}

// 获取用户详情
export function userDetail(id) {
    return request({
        url: `/user/detail?uid=` + id,
    })
}
