import { request } from '@/api/request'

// 默认搜索关键词
// 说明：调用此接口可获取默认搜索关键词
export function getSearchDefault() {
    return request({
        url: '/search/default',
    })
}