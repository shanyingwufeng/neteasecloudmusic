<!-- 首页-广播电台-24小时播客 -->
<template>
    <div class="podCast24 home-playList">
        <div class="top">
            <div class="title">
                <span>{{ title }}</span>
            </div>
        </div>
        <div class="list">
            <div class="swiper-container podCast24-swiper">
                <div class="swiper-wrapper">
                    <div
                        class="swiper-slide"
                        v-for="(item, id) in list"
                        :key="id"
                    >
                        <img v-lazy="item.uiElement.image.imageUrl" />
                        <span class="iconfont icon-bofang3"></span>
                        <span class="name">{{
                            item.uiElement.mainTitle.title
                        }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onUpdated, ref } from "vue";
import { Swiper } from "swiper";

export default {
    name: "PodCast24",
    props: ["data"],
    setup(props) {
        const list = ref();
        const title = ref();

        onUpdated(() => {
            list.value = props.data.creatives;
            title.value = props.data.uiElement.subTitle.title;
            new Swiper(".podCast24-swiper", {
                slidesPerView: 3,
                spaceBetween: 14,
            });
        });
        return { list, title };
    },
};
</script>

<style scoped lang='scss'>
.podCast24 {
    padding-right: 0;
    .top {
        display: flex;
        padding: var(--padding);
        justify-content: space-between;
        align-items: center;
        .title {
            font-size: 18px;
        }
    }
    .list {
        padding-left: var(--padding);
        padding-bottom: var(--padding);
        .swiper-container {
            padding-right: 36px;
            .swiper-wrapper {
                display: flex;
                justify-content: space-between;
                .swiper-slide {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    height: 100%;
                    border-radius: 10px;
                    img {
                        width: 84%;
                        margin-bottom: 4px;
                        border-radius: 50%;
                    }
                    .iconfont {
                        position: absolute;
                        top: 32%;
                        left: 52%;
                        transform: translateX(-50%);
                        color: rgba($color: #fff, $alpha: .7);
                        font-size: 20px;
                    }
                    .name {
                        overflow: hidden;
                        -webkit-line-clamp: 2;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        font-size: 14px;
                        line-height: 1.4;
                    }
                }
            }
        }
    }
}
</style>