<!-- 首页-轮播图 -->
<template>
    <div class="homeSlideShow">
        <van-swipe
            ref="swiper"
            class="homeSwipe"
            indicator-color="#fff"
            :autoplay="7000"
            :touchable="true"
            :lazy-render="true"
        >
            <van-swipe-item
                v-for="item in list"
                :key="item"
                @click="onClick(item)"
            >
                <img v-lazy="item.pic" />
                <span class="typeTitle" :class="item.titleColor">{{
                    item.typeTitle
                }}</span>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
import { onActivated, onDeactivated, onMounted, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { getHomePageBanner } from "@/api/home/index.js";

export default {
    name: "HomeSlideShow",
    setup() {
        const state = reactive({
            list: [{ pic: require("@/assets/slideshow/home-swiper.jpg") }],
            swiper: null,
        });

        const router = useRouter();

        onMounted(() => {
            getHomePageBanner().then((res) => {
                state.list = res.data.banners;
            });
        });

        onActivated(() => {});

        onDeactivated(() => {});

        const onClick = (item) => {
            if (item.url) {
                window.location.href = item.url;
            } else {
                if (item.targetType === "新歌首发") {
                    router.push(`/playpage?id=${item.targetId}`);
                } else if (item.typeTitle === "新碟首发") {
                    router.push({
                        path: "/album",
                        query: { id: item.targetId },
                    });
                }
            }
        };

        return { ...toRefs(state), onClick };
    },
};
</script>

<style lang='scss'>
.homeSlideShow {
    padding: 0 $padding;
    background: linear-gradient(
        to bottom,
        #f0f0f0,
        #f3f3f3,
        #f6f6f6,
        #f9f9f9,
        #fff
    );
    .homeSwipe {
        border-radius: 10px;
        .van-swipe-item {
            overflow: hidden;
            position: relative;
            img {
                display: block;
                width: 347px;
                height: 135px;
                border-radius: 10px;
            }
            .typeTitle {
                position: absolute;
                right: 0;
                bottom: 0;
                padding: 4px 6px 3px 6px;
                background: transparent;
                color: #fff;
                border-top-left-radius: 10px;
                border-bottom-right-radius: 10px;
                &.red {
                    background-color: rgba($color: red, $alpha: 0.9);
                }
                &.blue {
                    background-color: rgba($color: #0784e4, $alpha: 0.9);
                }
            }
        }
        .van-swipe__indicators {
            bottom: 6px;
            .van-swipe__indicator {
                width: 8px;
                height: 2px;
                margin: 0 2px;
                background-color: rgba($color: #8b8b8b, $alpha: 0.8);
                border-radius: 4px;
            }
        }
    }
}
</style>
