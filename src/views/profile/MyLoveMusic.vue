<!-- 我喜欢的音乐 -->
<template>
    <div class="myLoveMusic">
        <div class="left">
            <img src="@/assets/default.jpg" />
            <div class="content">
                <span class="title">我喜欢的音乐</span>
                <span class="count">1首</span>
            </div>
        </div>
        <div class="right">
            <span class="iconfont icon-xindong"></span>
            <span class="model">心动模式</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "MyLoveMusic",
    components: {},
};
</script>

<style scoped lang='scss'>
.myLoveMusic {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $padding;
    background-color: $color-white-background;
    border-radius: 10px;
    .left {
        display: flex;
        align-items: center;
        img {
            display: block;
            width: 44px;
            height: 44px;
            margin-right: 10px;
            border-radius: 6px;
        }
        .content {
            display: flex;
            flex-direction: column;
            .title {
                margin-bottom: 2px;
                font-size: 14px;
            }
            .count {
                color: grey;
                font-size: 10px;
            }
        }
    }
    .right {
        padding: 2px 6px;
        border: 1px solid rgba($color: rgb(219, 219, 219), $alpha: 0.6);
        border-radius: 14px;
        .iconfont {
            margin-right: 4px;
            color: red;
            font-size: 10px;
        }
        .model {
            font-size: 10px;
        }
    }
}
</style>