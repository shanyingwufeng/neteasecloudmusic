<!-- 个人中心-收藏歌单 -->
<template>
    <div class="collectPlayList">
        <div class="topBar">
            <span class="left">收藏歌单</span>
            <div class="right">
                <span class="iconfont icon-more"></span>
            </div>
        </div>
        <div class="content">
            <span class="name">暂无收藏的歌单</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "CollectPlayList",
    components: {},
};
</script>

<style scoped lang='scss'>
.collectPlayList {
    margin-top: 20px;
    padding: $padding;
    background-color: $color-white-background;
    border-radius: 10px;
    .topBar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        .left {
            color: grey;
            font-size: 12px;
        }
        .right {
            .iconfont {
                color: grey;
                font-size: 18px;
            }
        }
    }
    .content {
        padding: 14px 0;
        text-align: center;
        .name {
            color: grey;
            font-size: 14px;
        }
    }
}
</style>