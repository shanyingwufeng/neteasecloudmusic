import axios from 'axios';

export function request(config) {
    const instance = axios.create({
        // baseURL: "http://localhost:3000",
        // baseURL: "http://121.40.61.216:3000",
        // baseURL: "https://lianghj.top:3000",
        // baseURL: "http://7a98ga.natappfree.cc/",
        baseURL: "https://cloudmusicapi.shanyingwufeng.com",
        timeout: 100000,
        // withCredentials: true,
    })
    return instance(config)
}
