<!-- 首页-中间导航 -->
<template>
    <div class="centerNav">
        <div class="swiper-container center-nav-swiper">
            <div class="swiper-wrapper">
                <div
                    class="item swiper-slide"
                    v-for="(item, id) in list"
                    :key="id"
                >
                    <span class="iconfont" :class="item.className">
                        <span class="date" v-if="item.date">{{ nowDate }}</span>
                    </span>
                    <span class="title">{{ item.title }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { Swiper } from "swiper";

export default {
    name: "CenterNav",
    setup() {
        const list = [
            {
                id: 1,
                className: "icon-meirituijian1",
                title: "每日推荐",
                date: true,
            },
            { id: 2, className: "icon-sirenfm-copy-copy", title: "私人FM" },
            { id: 3, className: "icon-gedan4", title: "歌单" },
            { id: 4, className: "icon-paihangbang2", title: "排行榜" },
            {
                id: 5,
                className: "icon-zhibobofangshexiangjitianxianxianxing",
                title: "直播",
            },
            { id: 6, className: "icon-zhuanji", title: "数字专辑" },
            {
                id: 7,
                className: "icon-tubiaozhizuomoban-",
                title: "专注冥想",
            },
            { id: 8, className: "icon-fangjian", title: "歌房" },
            { id: 9, className: "icon-rwjl", title: "游戏专区" },
        ];
        const nowDate = ref(Number);
        onMounted(() => {
            nowDate.value = new Date().getDate();
            new Swiper(".center-nav-swiper", {
                slidesPerView: 5,
                spaceBetween: 12,
            });
        });
        return { list, nowDate };
    },
};
</script>

<style scoped lang='scss'>
.centerNav {
    display: flex;
    padding: 14px 0;
    padding-left: 8px;
    background-color: #fff;
    border-bottom: 1px solid rgb(241, 239, 239);
    justify-content: space-around;
    .swiper-container {
        padding-right: 30px;
        .item {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            .iconfont {
                position: relative;
                width: 44px;
                height: 44px;
                line-height: 44px;
                background-color: #f8eaec;
                color: #dd342b;
                font-size: 26px;
                font-weight: 700;
                border-radius: 50%;
                .date {
                    position: absolute;
                    top: 3px;
                    left: 50%;
                    transform: translateX(-48%);
                    color: #fff;
                    font-size: 12px;
                }
            }
            .title {
                margin-top: 6px;
                color: #444;
                font-size: 10px;
            }
        }
    }
}
</style>
