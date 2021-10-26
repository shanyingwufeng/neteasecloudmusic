<!-- 播放次数 -->
<template>
    <div class="playCount">
        <span class="iconfont icon-bofangsanjiaoxing"></span>
        <span class="number">{{ changeValue(playCount, point) }}</span>
    </div>
</template>

<script>
import { changeValue } from "@/utils/index.js";

export default {
    name: "PlayCount",
    props: {
        playCount: {
            type: Number,
            default: 0,
        },
        point: {
            type: Number,
            default: 0,
        },
    },
    setup() {
        return { changeValue };
    },
};
</script>

<style scoped lang='scss'>
.playCount {
    display: flex;
    align-items: center;
    position: absolute;
    top: 4px;
    right: 1px;
    padding: 0 6px;
    background-color: rgba(83, 83, 83, 0.6);
    border-radius: 8px;
    color: #fff;
    transform: scale(0.8);
}
</style>
