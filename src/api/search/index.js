import { request } from '@/api/request'

// 说明：调用此接口可获取默认搜索关键词
export function getSearchDefault() {
    return request({
        url: '/search/default',
    })
}

// 说明：调用此接口可获取热门搜索列表
export function getSearchHot() {
    return request({
        url: '/search/hot',
    })
}

// 说明：通过关键词获取歌曲信息
export function searchByKeyword(keyword) {
    return request({
        url: '/search?keywords=' + keyword,
    })
}
