<!-- 个人中心-中间导航 -->
<template>
    <div class="centerNav">
        <div class="item" v-for="(item, id) in list" :key="id">
            <span class="iconfont" :class="item.className"> </span>
            <span class="title">{{ item.title }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "CenterNav",
    setup() {
        const list = [
            { id: 1, className: "icon-yinleyule", title: "本地/下载" },
            { id: 2, className: "icon-yunpan1", title: "云盘" },
            { id: 3, className: "icon-yigou", title: "已购" },
            { id: 4, className: "icon-24gf-playCircle", title: "最近播放" },
            { id: 5, className: "icon-wodehaoyou", title: "我的好友" },
            { id: 6, className: "icon-bg-collection", title: "收藏和赞" },
            { id: 7, className: "icon-a-ziyuan8", title: "我的播客" },
            { id: 8, className: "icon-icon-test", title: "音乐应用" },
        ];

        return { list };
    },
};
</script>

<style scoped lang='scss'>
.centerNav {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 14px;
    padding: 20px 0;
    background-color: #fff;
    border-radius: 10px;
    .item {
        flex: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .iconfont {
            margin-bottom: 4px;
            color: #EB4D45;
            font-size: 28px;
        }
        .title {
            color: #555;
        }
        &:nth-child(-n+4) {
            margin-bottom: 28px;
        }
        &:last-child {
            .iconfont {
                color: grey;
            }
        }
    }
}
</style>
