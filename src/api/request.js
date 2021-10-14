import axios from "axios";

export function request(config) {
    const instance = axios.create({
        // withCredentials: true,
        // baseURL: "http://localhost:3000",
        // baseURL: "http://121.40.61.216:3000",
        // baseURL: "http://7a98ga.natappfree.cc",
        baseURL: "https://lianghj.top:3000",
        // baseURL: "https://cloudmusicapi.shanyingwufeng.com",
        // baseURL: "/api",
        timeout: 30000,
    });
    return instance(config);
}
