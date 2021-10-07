<!-- 首页-音乐日历 -->
<template>
    <div class="musicCalendar home-card">
        <TitleBar titleBarName="音乐日历" rightText="更多" />
        <Ad adLeft="领取你的今日好运" adRight="查看运势解读" />
        <div class="detail">
            <div
                class="list"
                v-for="(item, id) in list"
                :key="id"
                @click="go(item.resources[0].resourceId)"
            >
                <div class="left">
                    <span class="date">{{
                        isNowDayOrTrailer(
                            item.resources[0].uiElement.mainTitle.title
                        )
                    }}</span>
                    <span class="title">{{
                        item.resources[0].uiElement.mainTitle.title
                    }}</span>
                </div>
                <div class="right">
                    <div class="clock">
                        <span class="iconfont icon-tixing"></span>
                    </div>
                    <img v-lazy="item.resources[0].uiElement.image.imageUrl" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, onUpdated, toRefs } from "vue";
import TitleBar from "@/components/TitleBar.vue";
import Ad from "@/components/Ad.vue";

export default {
    name: "MusicCalendar",
    components: { TitleBar, Ad },
    props: ["data"],
    setup(props) {
        const state = reactive({
            list: [],
            titleBarName: "",
        });

        const isNowDayOrTrailer = (text) => {
            if (text.indexOf("预告")) {
                return "今天";
            } else {
                return "预告";
            }
        };

        const go = (url) => {
            window.location.href = url;
        };

        onUpdated(() => {
            // console.log(props.data);
            state.titleBarName = props.data.uiElement.subTitle.title;
            state.list = props.data.creatives;
        });

        return { ...toRefs(state), go, isNowDayOrTrailer };
    },
};
</script>

<style scoped lang='scss'>
.musicCalendar {
    .detail {
        padding: $padding;
        .list {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: $padding;
            border-bottom: 1px solid
                rgba($color: rgb(221, 221, 221), $alpha: 0.4);
            .left {
                .title {
                    @include ellipsis1();
                    margin-top: 4px;
                    font-size: 14px;
                }
            }
            .right {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: 20px;
                .clock {
                    width: 30px;
                    height: 30px;
                    margin-right: 14px;
                    border: 1px solid
                        rgba($color: rgb(167, 167, 167), $alpha: 0.3);
                    border-radius: 50%;
                    .iconfont {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100%;
                        border-radius: 50%;
                        font-size: 14px;
                    }
                }
                img {
                    display: block;
                    width: 50px;
                    height: 50px;
                    border-radius: 8px;
                }
            }
            &:last-child {
                padding-top: $padding;
                padding-bottom: 0;
                border-bottom: 0;
            }
        }
    }
}
</style>
