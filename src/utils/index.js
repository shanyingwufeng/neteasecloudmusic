// 说明：歌曲或歌单播放次数，根据播放次数使用亿或万结尾，设置小数点，小数点默认为0
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

// 说明：从数组中随机取出几个元素组成新的数组
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
