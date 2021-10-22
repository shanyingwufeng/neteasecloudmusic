import { request } from "@/api/request";

// 说明 : 调用此接口可获取默认搜索关键词
export function getSearchDefault() {
    return request({
        url: "/search/default",
    });
}

// 说明 : 调用此接口可获取热门搜索列表
export function getSearchHot() {
    return request({
        url: "/search/hot",
    });
}

// 说明 : 调用此接口可获取热门搜索列表（详细信息）
export function getDetailSearchHot() {
    return request({
        url: "/search/hot/detail",
    });
}

// 说明 : 调用此接口可获取搜索列表的视频榜（mv排行）
export function getDetailSearchMvHot() {
    return request({
        url: "/top/mv?limit=20",
    });
}

// 说明 : 通过关键词获取歌曲信息
// type: 搜索类型；默认为 1 即单曲 ,
// 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单,
// 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
export function searchByKeyword(type, keyword) {
    return request({
        url: `/search?type=${type}&keywords=${keyword}`,
    });
}

// 说明 : 调用此接口 , 传入搜索关键词可获得搜索建议 , 搜索结果同时包含单曲 , 歌手 , 歌单 ,mv 信息
export function getSearchSuggest(keyword, terminal = "mobile") {
    return request({
        url: `/search/suggest?keywords=${keyword}&type=${terminal}`,
    });
}
