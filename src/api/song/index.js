import { request } from "@/api/request";
import { Toast } from "vant";

// 说明 : 调用此接口 , 传入音乐 id(支持多个 id, 用 , 隔开), 可获得歌曲详情
export function getSongDetail(id) {
    return request({
        url: "/song/detail?ids=" + id,
    }).catch(() => {
        Toast("获取歌曲失败！");
    });
}

// 说明 : 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
export function getLyric(id) {
    return request({
        url: "/lyric?id=" + id,
    });
}

// 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该音乐的所有评论 ( 不需要登录 )
export function getMusicComment(id) {
    return request({
        url: `/comment/music?id=${id}`,
    });
}
