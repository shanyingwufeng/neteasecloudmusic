<!-- 首页-广播电台和24小时播客 -->
<template>
    <div class="broadCastAndPodCast24 home-card">
        <van-tabs v-model:active="active">
            <van-tab title="广播电台">
                <div class="list">
                    <div class="swiper-container broadCast-swiper">
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
                    <div class="swiper-container podCast24-swiper">
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
import { onUpdated, ref } from "vue";
import { Swiper } from "swiper";

export default {
    name: "BroadCastAndPodCast24",
    props: ["data"],
    setup(props) {
        const broadCastList = ref();
        const podCast24List = ref();
        const active = ref(0);

        onUpdated(() => {
            broadCastList.value = props.data.creatives[0].resources;
            podCast24List.value = props.data.creatives[1].resources;
            new Swiper(".broadCast-swiper", {
                slidesPerView: 3,
                spaceBetween: 14,
                observeParents: true,
                observer: true,
            });
            new Swiper(".podCast24-swiper", {
                slidesPerView: 3,
                spaceBetween: 14,
                observeParents: true,
                observer: true,
            });
        });

        return { broadCastList, podCast24List, active };
    },
};
</script>

<style lang='scss'>
.broadCastAndPodCast24 {
    padding-top: 8px;
    .van-tabs__nav {
        display: flex;
        align-items: center;
        padding-bottom: 0;
        padding-left: $padding;
        border-radius: 10px;
        .van-tab {
            display: block;
            flex: 0.24;
            font-size: 16px;
            &::before {
                content: "";
                position: absolute;
                top: 50%;
                right: 10px;
                transform: translateY(-50%);
                width: 1px;
                height: 80%;
                background-color: rgb(204, 201, 201);
            }
            &:nth-last-child(2) {
                flex: 0.28;
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
                padding-left: 5px;
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
                        border-radius: 10px;
                        text-align: center;
                        &::before {
                            content: "";
                            position: absolute;
                            top: 0;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 90px;
                            height: 90px;
                            background-color: rgba(
                                $color: #524949,
                                $alpha: 0.4
                            );
                            border-radius: 50%;
                        }
                        img {
                            display: block;
                            width: 90px;
                            height: 90px;
                            margin-bottom: 8px;
                            border-radius: 50%;
                        }
                        .iconfont {
                            position: absolute;
                            top: 52%;
                            left: 50%;
                            transform: translateX(-40%) translateY(-100%);
                            color: rgba(
                                $color: rgb(235, 235, 235),
                                $alpha: 0.8
                            );
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