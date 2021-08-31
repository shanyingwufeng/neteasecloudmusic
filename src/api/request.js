import axios from 'axios';

export function request(config) {
    const instance = axios.create({
        baseURL: "http://121.40.61.216:3000",
        timeout: 5000,
    })
    return instance(config)
}