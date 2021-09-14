import { request } from "@/api/request";

// 获取APP首页信息
export function getHomePageInfo() {
    return request({
        url: '/homepage/block/page',
    })
}

// 调用此接口可获取APP首页圆形图标入口列表
export function getHomePageDragonBall() {
    return request({
        url: '/homepage/dragon/ball',
    })
}

// 获取推荐歌单
export function getRecommendPlayList() {
    return request({
        url: '/personalized?limit=6',
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
