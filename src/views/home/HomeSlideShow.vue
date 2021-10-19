<!-- 首页-轮播图 -->
<template>
    <div class="homeSlideShow">
        <van-swipe
            class="homeSwipe"
            indicator-color="#fff"
            :autoplay="6000"
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
import { ref, onActivated } from "vue";
import { getHomePageBanner } from "@/api/home/index.js";
import { useRouter } from "vue-router";

export default {
    name: "HomeSlideShow",
    setup() {
        const list = ref([
            { pic: require("@/assets/slideshow/home-swiper.jpg") },
        ]);

        const router = useRouter();

        onActivated(() => {
            getHomePageBanner().then((res) => {
                list.value = res.data.banners;
            });
        });

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

        return { list, onClick };
    },
};
</script>

<style lang='scss'>
.homeSlideShow {
    padding: 0 $padding;
    background: linear-gradient(
        to bottom,
        #e3e6eb,
        #eaeded,
        #eef0ef,
        #f9fafb,
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
