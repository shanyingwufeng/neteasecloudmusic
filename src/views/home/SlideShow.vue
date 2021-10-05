<!-- 首页-轮播图 -->
<template>
    <div class="slideShow">
        <div class="swiper-container slideShow-swiper" v-if="isSwiperKeep">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, id) in list" :key="id">
                    <a :href="item.url">
                        <img :src="item.pic" />
                    </a>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>

<script>
import { reactive, onActivated, onDeactivated, toRefs } from "vue";
import { getHomePageBanner } from "@/api/home/index.js";
import { Swiper } from "swiper";

export default {
    name: "SlideShow",
    setup() {
        const state = reactive({
            list: [
                { pic: require("@/assets/slideshow/swiper1.jpg") },
                { pic: require("@/assets/slideshow/swiper2.jpg") },
            ],
            isSwiperKeep: true,
        });

        onActivated(() => {
            state.isSwiperKeep = true;
            getHomePageBanner().then((res) => {
                state.list = res.data.banners;
                new Swiper(".slideShow-swiper", {
                    autoplay: {
                        delay: 6000,
                        disableOnInteraction: false,
                    },
                    loop: true,
                    speed: 400,
                    observeParents: true,
                    observer: true,
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true,
                    },
                });
            });
        });

        onDeactivated(() => {
            state.isSwiperKeep = false;
        });

        return { ...toRefs(state) };
    },
};
</script>

<style lang='scss'>
.slideShow {
    display: flex;
    padding: 0 $padding;
    background: linear-gradient(
        to bottom,
        rgb(240, 240, 240),
        rgb(248, 248, 248),
        $color-white-background
    );
    .swiper-container {
        position: relative;
        border-radius: 8px;
        .swiper-wrapper {
            .swiper-slide {
                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    border-radius: 8px;
                }
            }
        }
        .swiper-pagination {
            position: absolute;
            bottom: 2px;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            text-align: center;
            transition: 300ms opacity;
            z-index: 10;
            .swiper-pagination-bullet {
                display: inline-block;
                width: 8px;
                height: 4px;
                margin: 0 4px;
                background-color: rgb(0, 0, 0);
                border-radius: 4px;
                opacity: 0.2;
            }
            .swiper-pagination-bullet-active {
                background-color: $color-white-background;
                opacity: 1;
            }
        }
    }
}
</style>
