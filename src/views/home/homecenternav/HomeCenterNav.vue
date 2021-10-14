<!-- 首页-中间导航 -->
<template>
    <div class="homeCenterNavRecommendedDaily">
        <div class="swiper-container center-nav-swiper">
            <div class="swiper-wrapper">
                <div
                    class="swiper-slide"
                    v-for="(item, id) in list"
                    :key="id"
                    @click="jump(id)"
                >
                    <div class="icon">
                        <img :src="item.iconUrl" />
                        <span class="date" v-if="id === 0">{{
                            new Date().getDate()
                        }}</span>
                    </div>
                    <span class="title">{{ item.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive, toRefs, onUpdated } from "vue";
import { Swiper } from "swiper";
import { useRouter } from "vue-router";
import { getHomePageDragonBall } from "@/api/home/index.js";

export default {
    name: "HomeCenterNavRecommendedDaily",
    setup() {
        const state = reactive({
            list: [],
        });

        const router = useRouter();

        const jump = (id) => {
            if (id === 0) {
                router.push("/recommendeddaily");
            }
            if (id === 2) {
                router.push("/playlistsquare");
            }
        };

        onMounted(() => {
            getHomePageDragonBall().then((res) => {
                state.list = res.data.data;
            });
        });

        onUpdated(() => {
            new Swiper(".center-nav-swiper", {
                slidesPerView: 5,
                spaceBetween: 12,
            });
        });

        return { ...toRefs(state), jump };
    },
};
</script>

<style scoped lang='scss'>
.homeCenterNavRecommendedDaily {
    background-color: #fff;
    border-bottom: 1px solid rgb(240, 240, 240);
    .swiper-container {
        padding: $padding;
        padding-right: 30px;
        .swiper-wrapper {
            .swiper-slide {
                display: flex;
                flex-direction: column;
                align-items: center;
                .icon {
                    position: relative;
                    img {
                        width: 44px;
                        height: 44px;
                        margin-bottom: 2px;
                        background-color: red;
                        border-radius: 50%;
                    }
                    .date {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translateX(-50%) translateY(-50%);
                        color: red;
                        font-size: 14px;
                        font-weight: 700;
                    }
                }
            }
        }
    }
}
</style>
