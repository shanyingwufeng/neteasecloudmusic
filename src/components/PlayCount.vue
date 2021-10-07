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
        playCount: Number,
        point: Number,
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
    top: 5px;
    right: 5px;
    padding: 1px 4px;
    background-color: rgba(73, 73, 73, 0.7);
    border-radius: 8px;
    color: #fff;
    opacity: 0.8;
    .iconfont {
        margin-right: 2px;
        font-size: 8px;
    }
    .number {
        font-size: 8px;
    }
}
</style>
