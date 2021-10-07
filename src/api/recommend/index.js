import { request } from "@/api/request.js";

// 说明 : 调用此接口 , 可获得每日推荐歌曲
export function getRecommendSongs() {
    return request({
        url: `/recommend/songs`,
    });
}
