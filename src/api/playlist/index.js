import { request } from "@/api/request.js";
import { Toast } from "vant";

const cookie = localStorage.getItem("cookie");

/* 说明 : 歌单能看到歌单名字, 但看不到具体歌单内容 , 调用此接口 ,
   传入歌单 id 可以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单,登录后是完整的)，
   但是返回的 trackIds 是完整的，tracks 则是不完整的，
   可拿全部 trackIds 请求一次 song/detail 接口获取所有歌曲的详情 */
// 必选参数 : id (歌单 id)
export function getPlayListDetail(id) {
    return request({
        url: `/playlist/detail?id=${id}&cookie=${cookie ? cookie : ""}`,
    }).catch(() => {
        Toast("歌单加载失败");
    });
}

// 说明 : 调用此接口 , 可获取网友精选碟歌单，通过标签获取所有歌单
export function getPlayLists(title) {
    return request({
        url: `/top/playlist?limit=48&cat=${title}`,
    });
}

// 说明 : 调用此接口 , 可获取推荐歌单
export function getRecommendPlayList() {
    return request({
        url: "/personalized",
    });
}

// 说明 : 调用此接口 , 可获取网友精选碟歌单
export function getTopPlayList(limit = 1, cat = "华语") {
    return request({
        url: `top/playlist?limit=${limit}&cat=${cat}`,
    });
}

// 说明 : 调用此接口 , 可获取精品歌单
export function getHighQualityPlayList(limit = 6) {
    return request({
        url: `/top/playlist/highquality?limit=${limit}`,
    });
}

// 说明 : 调用此接口,可获取所有榜单
export function getTopList() {
    return request({
        url: "/toplist",
    });
}

// 说明 : 获取所有榜单内容摘要
export function getTopListDetail() {
    return request({
        url: `/toplist/detail`,
    });
}
