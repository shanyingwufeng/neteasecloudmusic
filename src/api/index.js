import { request } from "./request";

// 获取轮播图api type:资源类型,对应以下类型,默认为 0 即PC
// (0: pc) (1: android) (2: iphone) (3: ipad)
export function getBanner(type = 1) {
    return request({
        url: '/banner?type=' + type,
    })
}

// 获取好歌单api 说明:调用此接口可获取推荐歌单
export function getRecommendMusicList() {
    return request({
        url: '/personalized',
    })
}

// 获取歌单详情
export function getPlayListDetail(id) {
    return request({
        url: '/playlist/detail?id=' + id,
    })
}

// 获取歌单评论
export function getPlayListComment(id) {
    return request({
        url: '/comment/playlist?id=' + id,
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

// 获取精品歌单
export function getHighQualityPlayList() {
    return request({
        url: `/top/playlist/highquality?limit=6`
    })
}

// 获取精选歌单
export function getTopPlayList(limit = 1, cat = "华语") {
    return request({
        url: `top/playlist?limit=${limit}&cat=${cat}`
    })
}