<!--数字专辑-->
<template>
    <div class="digtalAlbum">
        <div class="list">
            <div class="swiper-container digtalAlbum-swiper">
                <div class="swiper-wrapper">
                    <div
                        class="swiper-slide"
                        v-for="(item, id) in list"
                        :key="id"
                    >
                        <div
                            class="item"
                            v-for="(sonItem, id) in item.resources"
                            :key="id"
                        >
                            <div class="image">
                                <img
                                    v-lazy="sonItem.uiElement.image.imageUrl"
                                />
                            </div>
                            <div class="content">
                                <div class="top">
                                    <span class="mainTitle">{{
                                        sonItem.uiElement.mainTitle.title
                                    }}</span>
                                    <span class="author"
                                        >-
                                        {{
                                            sonItem.resourceExtInfo.artists[0]
                                                .name
                                        }}</span
                                    >
                                </div>
                                <span class="subTitle">{{
                                    sonItem.uiElement.subTitle.title
                                        ? sonItem.uiElement.subTitle.title
                                        : "..."
                                }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { watch, onUpdated, ref } from "vue";
import { Swiper } from "swiper";

export default {
    name: "digtalAlbum",
    props: ["data"],
    setup(props) {
        const list = ref([]);

        watch(
            () => props.data,
            (newValue) => {
                list.value = newValue;
            }
        );

        onUpdated(() => {
            new Swiper(".digtalAlbum-swiper", {
                slidesPerView: 1,
                spaceBetween: 14,
            });
        });

        return { list };
    },
};
</script>

<style scoped lang='scss'>
.digtalAlbum {
    padding: $padding;
    padding-top: 8px;
    padding-right: 0;
    background-color: $color-white-background;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    .list {
        .swiper-container {
            padding-right: 28px;
            .swiper-wrapper {
                display: flex;
                .swiper-slide {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    .item {
                        display: flex;
                        align-items: center;
                        .image {
                            flex: 1;
                            img {
                                display: block;
                                width: 54px;
                                height: 54px;
                                margin-right: 10px;
                                border-radius: 10px;
                            }
                        }
                        .content {
                            flex: 8;
                            display: flex;
                            flex-direction: column;
                            padding: 16px 0;
                            padding-right: 14px;
                            border-bottom: 1px solid rgba(234, 234, 234, 0.5);
                            .top {
                                display: flex;
                                align-items: center;
                                margin-bottom: 4px;
                                .mainTitle {
                                    @include ellipsis1();
                                    margin-right: 4px;
                                    font-size: 16px;
                                }
                                .author {
                                    @include ellipsis1();
                                    color: grey;
                                    font-size: 12px;
                                }
                            }
                            .subTitle {
                                @include ellipsis1();
                                color: grey;
                                font-size: 12px;
                            }
                        }
                        &:last-child {
                            .content {
                                border-bottom: 0;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
