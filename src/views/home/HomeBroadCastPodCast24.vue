<!-- 首页-广播电台和24小时播客 -->
<template>
    <div class="homeBroadCastPodCast24 home-card">
        <van-tabs v-model:active="active">
            <van-tab title="广播电台">
                <div class="list">
                    <div
                        class="
                            swiper-container
                            homeBroadCastAndPodCast24-swiper
                        "
                    >
                        <div class="swiper-wrapper">
                            <div
                                class="swiper-slide"
                                v-for="(item, id) in broadCastList"
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
            </van-tab>
            <van-tab title="24小时播客">
                <div class="list">
                    <div
                        class="
                            swiper-container
                            homeBroadCastAndPodCast24-swiper
                        "
                    >
                        <div class="swiper-wrapper">
                            <div
                                class="swiper-slide"
                                v-for="(item, id) in podCast24List"
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
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { onUpdated, ref, watch } from "vue";
import { Swiper } from "swiper";

export default {
    name: "HomeBroadCastPodCast24",
    props: ["data"],
    setup(props) {
        const broadCastList = ref();
        const podCast24List = ref();
        const active = ref(0);

        watch(
            () => props.data,
            (newValue) => {
                broadCastList.value = newValue.creatives[0].resources;
                podCast24List.value = newValue.creatives[1].resources;
            }
        );

        onUpdated(() => {
            new Swiper(".homeBroadCastAndPodCast24-swiper", {
                slidesPerView: 3,
                spaceBetween: 14,
            });
        });

        return { broadCastList, podCast24List, active };
    },
};
</script>

<style lang='scss'>
.homeBroadCastPodCast24 {
    padding-top: 8px;
    .van-tabs__nav {
        display: flex;
        align-items: center;
        padding-bottom: 0;
        padding-left: $padding;
        border-radius: 10px;
        .van-tab {
            display: block;
            flex: 0.26;
            color: #858585;
            font-size: 18px;
            &::before {
                content: "";
                position: absolute;
                top: 50%;
                right: 8px;
                transform: translateY(-50%);
                width: 1px;
                height: 80%;
                background-color: rgb(204, 201, 201);
            }
            &:nth-last-child(2) {
                flex: 0.34;
            }
            &:nth-last-child(2)::before {
                width: 0;
            }
        }

        .van-tab--active {
            color: #000;
            font-weight: 700;
        }

        .van-tabs__line {
            display: none;
        }
    }

    .van-tabs__content {
        padding: 8px 0 16px 0;
        .list {
            padding-left: var(--padding);
            padding-bottom: var(--padding);
            .swiper-container {
                padding-left: 12px;
                padding-right: 30px;
                .swiper-wrapper {
                    display: flex;
                    justify-content: space-between;
                    .swiper-slide {
                        position: relative;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        height: 100%;
                        text-align: center;
                        border-radius: 10px;
                        &::before {
                            content: "";
                            position: absolute;
                            top: 0;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 96px;
                            height: 96px;
                            background-color: rgba(
                                $color: #524949,
                                $alpha: 0.3
                            );
                            border-radius: 50%;
                        }
                        img {
                            display: block;
                            width: 96px;
                            height: 96px;
                            margin-bottom: 8px;
                            border-radius: 50%;
                        }
                        .iconfont {
                            position: absolute;
                            top: 52%;
                            left: 50%;
                            transform: translateX(-40%) translateY(-100%);
                            color: rgba($color: #fff, $alpha: 0.9);
                            font-size: 20px;
                        }
                        .name {
                            @include ellipsis1();
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }
}
</style>