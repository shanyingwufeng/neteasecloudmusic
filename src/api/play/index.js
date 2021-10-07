import { request } from "@/api/request";
import { Toast } from "vant";

// 说明 : 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
export function getLyric(id) {
    return request({
        url: "/lyric?id=" + id,
    });
}

// 获取歌曲详情
export function getSongDetail(id) {
    return request({
        url: "/song/detail?ids=" + id,
    });
}

// 获取歌单详情
export function getPlayListDetail(id) {
    return request({
        url: `/playlist/detail?id=${id}`,
    });
}

// 获取歌单详情（登录后）
export function getMyPlayListDetail(id) {
    return request({
        url: `/playlist/detail?id=${id}&cookie=${localStorage.getItem(
            "cookie"
        )}`,
    });
}

// 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该音乐的所有评论 ( 不需要登录 )
export function getMusicComment(id) {
    return request({
        url: `/comment/music?id=${id}`,
    });
}
