import { request } from '@/api/request'

// 说明：调用此接口,可获取热门搜索列表
export function getSearchDefault() {
    return request({
        url: '/search/hot',
    })
}
