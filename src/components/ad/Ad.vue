<!-- 广告栏 -->
<template>
    <div class="ad">
        <span class="left">{{ adLeft }}</span>
        <div class="right">
            <span>{{ adRight }}</span>
            <div>
                <span class="iconfont icon-youjiantou"></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Ad",
    props: ["adLeft", "adRight"],
};
</script>

<style scoped lang='scss'>
.ad {
    display: flex;
    justify-content: space-between;
    margin: 0 14px;
    padding: 6px 8px;
    border: 1px solid #f4f4f4;
    border-radius: 10px;
    .left {
        font-size: 14px;
    }
    .right {
        display: flex;
        align-items: center;
        color: grey;
        .iconfont {
            font-size: 12px;
        }
    }
}
</style>
