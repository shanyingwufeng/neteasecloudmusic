<!-- 首页-顶部轮播图 -->
<template>
    <div class="slideShow">
        <swiper
            :autoplay="swiper_options.autoplay"
            :loop="swiper_options.loop"
            :speed="swiper_options.speed"
            :pagination="swiper_options.pagination"
        >
            <swiper-slide v-for="(item, i) in imgs" :key="i"
                ><img :src="item.pic"
            /></swiper-slide>
        </swiper>
    </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { getBanner } from "@/api/index";

export default {
    name: "SlideShow",
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        let imgs = ref([
            { pic: require("@/assets/banner/swiper1.jpg") },
            { pic: require("@/assets/banner/swiper2.jpg") },
            { pic: require("@/assets/banner/swiper3.jpg") },
            { pic: require("@/assets/banner/swiper4.jpg") },
        ]);
        onMounted(() => {
            getBanner(1).then((res) => {
                imgs.value = res.data.banners;
            });
        });
        // swiper相关配置属性放在swiper_options这个变量里
        let swiper_options = reactive({
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            loop: true,
            speed: 400,
            pagination: {
                clickable: true,
            },
        });
        // 将swiper_options返回给模板中的swiper组件使用
        return { swiper_options, imgs };
    },
};
</script>

<style lang='scss'>
.slideShow {
    padding: 0 10px;
    background: linear-gradient(to bottom, rgb(240, 240, 240), #fff);
    .swiper-container {
        .swiper-slide {
            img {
                width: 100%;
                border-radius: 8px;
            }
        }
        .swiper-pagination {
            position: absolute;
            left: 50%;
            bottom: 10px;
            transform: translateX(-50%);
            .swiper-pagination-bullet {
                width: 8px;
                height: 3px;
                margin: 0 2px;
                border-radius: 4px;
            }
            .swiper-pagination-bullet-active {
                background-color: #fff;
            }
        }
    }
}
</style>