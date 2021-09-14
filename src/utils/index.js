export function changeValue(num, point) {
    let result = 0;
    if (num > 100000000) {
        result = num / 100000000;
        result = result.toFixed(point) + "亿";
    } else if (num > 100000) {
        result = num / 100000;
        result = result.toFixed(point) + "万";
    } else {
        result = num;
    }
    return result;
}
