import { request } from "@/api/request.js";

// 说明 : 调用此接口 , 可获取网友精选碟歌单，通过标签获取所有歌单
export function getPlayLists(title) {
    return request({
        url: `/top/playlist?limit=30&cat=${title}`,
    });
}
