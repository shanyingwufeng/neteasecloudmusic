<!-- 个人中心-创建歌单 -->
<template>
    <div class="createPlayList">
        <div class="topBar">
            <span class="left">创建歌单</span>
            <div class="right">
                <span class="iconfont icon-jia"></span>
                <span class="iconfont icon-more"></span>
            </div>
        </div>
        <div class="content">
            <div class="import">
                <span class="iconfont icon-daoru"></span>
            </div>
            <span class="name">一键导入外部音乐</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "CreatePlayList",
    components: {},
};
</script>

<style scoped lang='scss'>
.createPlayList {
    margin-top: 20px;
    padding: var(--padding);
    background-color: #fff;
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
                margin-left: 16px;
                color: grey;
                font-size: 18px;
            }
        }
    }
    .content {
        display: flex;
        align-items: center;
        .import {
            margin-right: 16px;
            padding: 12px;
            background-color: rgba(231, 231, 231, 0.7);
            border-radius: 6px;
            .iconfont {
                font-size: 20px;
            }
        }
        .name {
            font-size: 14px;
        }
    }
}
</style>