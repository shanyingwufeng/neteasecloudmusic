export function changeValue(num, point = 0) {
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

export function getRandomArrayValue(arr, num) {
    var sData = arr.slice(0), i = arr.length, min = i - num, item, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        item = sData[index];
        sData[index] = sData[i];
        sData[i] = item;
    }
    return sData.slice(min);
}


