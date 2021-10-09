import { request } from "@/api/request";

// 说明 : 调用此接口 , 可获取 APP 首页信息
// 可选参数 =>
// 1、refresh: 是否刷新数据,默认为 false
// 2、cursor: 上一条数据返回的 cursor
export function getHomePageInfo() {
    return request({
        url: "/homepage/block/page",
    });
}

// 说明 : 调用此接口 , 可获取首页 banner( 轮播图 ) 数据
// type(0: pc   1: android   2: iphone   3: ipad)
export function getHomePageBanner(type = 1) {
    return request({
        url: "/banner?type=" + type,
    });
}

// 说明 : 调用此接口 , 可获取 APP 首页圆形图标入口列表
export function getHomePageDragonBall() {
    return request({
        url: "/homepage/dragon/ball",
    });
}
