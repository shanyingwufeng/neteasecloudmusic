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
    var sData = arr.slice(0),
        i = arr.length,
        min = i - num,
        item,
        index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        item = sData[index];
        sData[index] = sData[i];
        sData[i] = item;
    }
    return sData.slice(min);
}

// 设置歌曲歌词信息
export function getLyricList(lyric) {
    if (lyric) {
        let arr = lyric.split(/\n/gis).map((item, i, arr) => {
            let min = parseInt(item.slice(1, 3));
            let sec = parseInt(item.slice(4, 6));
            let ms = parseInt(item.slice(7, 10));
            return {
                lyric: item.slice(11, item.length),
                time: ms / 1000 + sec + min * 60,
            };
        });
        arr.forEach((item, i) => {
            if (i < arr.length - 1) {
                item.next = arr[i + 1].time;
            } else {
                item.next = arr[i - 1].time;
            }
        });
        return arr;
    }
}

// 将数组分割成每n个为一组
export function spArr(arr, n) {
    let newArr = [];
    for (let i = 0; i < arr.length; i += n) {
        newArr.push(arr.slice(i, i + n));
    }
    return newArr;
}
