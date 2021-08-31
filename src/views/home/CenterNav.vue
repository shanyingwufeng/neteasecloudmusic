<!-- 首页-中间导航 -->
<template>
    <div class="center-nav">
        <div class="item" v-for="(item, id) in list" :key="id">
            <span class="iconfont" :class="item.className"></span>
            <span class="title">{{ item.title }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "CenterNav",
    setup() {
        const list = [
            { id: 1, className: "icon-tuijian", title: "每日推荐" },
            { id: 2, className: "icon-FM_weixuanze", title: "私人FM" },
            { id: 3, className: "icon-gedan", title: "歌单" },
            { id: 4, className: "icon-_huabanfuben", title: "排行榜" },
            { id: 5, className: "icon-zhibo", title: "直播" },
        ];
        return { list };
    },
};
</script>

<style scoped lang='scss'>
.center-nav {
    display: flex;
    padding: 2px 0 10px 0;
    background-color: #fff;
    border-bottom: 1px solid rgb(241, 239, 239);
    justify-content: space-around;
    .item {
        display: flex;
        text-align: center;
        flex-direction: column;
        align-items: center;
        .iconfont {
            width: 44px;
            height: 44px;
            line-height: 44px;
            background-color: rgb(252, 232, 232);
            color: red;
            font-size: 22px;
            font-weight: 700;
            border-radius: 50%;
        }
        .title {
            margin-top: 6px;
            color: #444;
            font-size: 12px;
        }
    }
}
</style>