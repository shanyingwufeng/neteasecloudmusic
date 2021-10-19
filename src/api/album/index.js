import { request } from "@/api/request.js";

// 说明 : 调用此接口 , 传入专辑 id, 可获得专辑内容
export function getAlbum(id) {
    return request({
        url: `/album/?id=${id}`,
    });
}
