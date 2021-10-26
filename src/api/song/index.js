import { request } from "@/api/request";
import { Toast } from "vant";

const cookie = localStorage.getItem("cookie");

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

// 说明 : 调用此接口 , 传入音乐 id, 可喜欢该音乐
export function like(id, like = true) {
    return request({
        url: `/like?id=${id}&like=${like}&cookie=${cookie}`,
    });
}

// 说明 : 调用此接口 , 传入用户 id, 可获取已喜欢音乐id列表(id数组)
export function getLikeList(uid) {
    return request({
        url: `/likelist?uid=${uid}&cookie=${cookie}&timestamp=${Date.parse(
            new Date()
        )}`,
    });
}
