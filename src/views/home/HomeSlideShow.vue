<!-- 首页-轮播图 -->
<template>
    <div class="homeSlideShow">
        <!-- <div class="swiper-container slideShow-swiper" v-if="isSwiperKeep">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, id) in list" :key="id">
                    <a :href="item.url">
                        <img :src="item.pic" />
                    </a>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div> -->

        <van-swipe
            class="homeSwipe"
            :autoplay="6000"
            indicator-color="#fff"
            lazy-render
            :touchable="false"
        >
            <van-swipe-item v-for="item in list" :key="item">
                <a :href="item.url">
                    <img :src="item.pic" />
                </a>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
import { reactive, onActivated, onDeactivated, toRefs } from "vue";
import { getHomePageBanner } from "@/api/home/index.js";
// import { Swiper } from "swiper";

export default {
    name: "HomeSlideShow",
    setup() {
        const state = reactive({
            list: [{ pic: require("@/assets/slideshow/home-swiper.jpg") }],
            // isSwiperKeep: true,
        });

        onActivated(() => {
            // state.isSwiperKeep = true;
            getHomePageBanner().then((res) => {
                state.list = res.data.banners;
                // new Swiper(".slideShow-swiper", {
                //     autoplay: {
                //         delay: 6000,
                //         disableOnInteraction: false,
                //     },
                //     loop: true,
                //     speed: 400,
                //     observeParents: true,
                //     observer: true,
                //     pagination: {
                //         el: ".swiper-pagination",
                //         clickable: true,
                //     },
                // });
            });
        });

        // onDeactivated(() => {
        //     state.isSwiperKeep = false;
        // });

        return { ...toRefs(state) };
    },
};
</script>

<style lang='scss'>
.homeSlideShow {
    margin-top: 58px;
    padding: 0 $padding;
    background: linear-gradient(to bottom, #f0f0f0, #f3f3f3, #fff);
    // .swiper-container {
    //     position: relative;
    //     border-radius: 8px;
    //     .swiper-wrapper {
    //         .swiper-slide {
    //             a {
    //                 display: block;
    //                 img {
    //                     display: block;
    //                     width: 100%;
    //                     border-radius: 8px;
    //                 }
    //             }
    //         }
    //     }
    //     .swiper-pagination {
    //         position: absolute;
    //         bottom: 4px;
    //         left: 50%;
    //         transform: translateX(-50%);
    //         width: 100%;
    //         text-align: center;
    //         transition: 300ms opacity;
    //         z-index: 10;
    //         .swiper-pagination-bullet {
    //             display: inline-block;
    //             width: 8px;
    //             height: 4px;
    //             margin: 0 4px;
    //             background-color: rgb(0, 0, 0);
    //             border-radius: 4px;
    //             opacity: 0.2;
    //         }
    //         .swiper-pagination-bullet-active {
    //             background-color: #fff;
    //             opacity: 1;
    //         }
    //     }
    // }

    .homeSwipe {
        border-radius: 8px;
        .van-swipe-item {
            a {
                display: block;
                img {
                    display: block;
                    width: 100%;
                    border-radius: 8px;
                }
            }
        }
        .van-swipe__indicators {
            bottom: 6px;
            .van-swipe__indicator {
                width: 8px;
                height: 4px;
                margin: 0 4px;
                background-color: #000;
                border-radius: 4px;
            }
        }
    }
}
</style>
