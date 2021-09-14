<!-- 播放次数 -->
<template>
    <div class="play-count">
        <div class="icon">
            <span class="iconfont icon-bofangsanjiaoxing"></span>
        </div>
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
    padding: 0 4px;
    background-color: rgba($color: #464545, $alpha: 0.8);
    border-radius: 6px;
    color: #fff;
    font-size: 10px;
    opacity: 0.8;
    .iconfont {
        margin-right: 2px;
        font-size: 12px;
    }
}
</style>
