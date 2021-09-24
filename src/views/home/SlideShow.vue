<!-- 首页-轮播图 -->
<template>
    <div class="slideShow">
        <div class="swiper-container slideShow-swiper">
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
import { onUpdated, onMounted, reactive, toRefs } from "vue";
import { Swiper } from "swiper";

export default {
    name: "SlideShow",
    props: ["data"],
    setup(props) {
        const state = reactive({
            list: [
                { pic: require("@/assets/slideshow/swiper1.jpg") },
                { pic: require("@/assets/slideshow/swiper2.jpg") },
                { pic: require("@/assets/slideshow/swiper3.jpg") },
                { pic: require("@/assets/slideshow/swiper4.jpg") },
            ],
            isSwiperKeep: false,
        });

        onUpdated(() => {
            state.list = props.data.extInfo.banners;
            new Swiper(".slideShow-swiper", {
                autoplay: {
                    delay: 5000,
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

        return { ...toRefs(state) };
    },
};
</script>

<style lang='scss'>
.slideShow {
    display: flex;
    padding: 0 var(--padding);
    background: linear-gradient(
        to bottom,
        var(--color-home-topbarandslideshow-background),
        #fff
    );
    .swiper-container {
        position: relative;
        border-radius: 8px;
        .swiper-wrapper {
            .swiper-slide {
                img {
                    display: block;
                    width: 100%;
                    border-radius: 8px;
                }
            }
        }
        .swiper-pagination {
            position: absolute;
            bottom: 4px;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            text-align: center;
            transition: 300ms opacity;
            z-index: 10;
            .swiper-pagination-bullet {
                display: inline-block;
                width: 8px;
                height: 3px;
                margin: 0 3px;
                border-radius: 4px;
                background-color: #000;
                opacity: 0.2;
            }
            .swiper-pagination-bullet-active {
                background-color: #fff;
                opacity: 1;
            }
        }
    }
}
</style>
