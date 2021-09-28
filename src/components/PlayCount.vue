<!-- 播放次数 -->
<template>
    <div class="play-count">
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
.play-count {
    display: flex;
    align-items: center;
    position: absolute;
    top: 4px;
    right: 4px;
    padding: 1px 4px;
    background-color: rgb(85, 85, 85);
    border-radius: 6px;
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
