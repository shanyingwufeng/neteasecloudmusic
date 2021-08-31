<!-- 首页-精品歌单 -->
<template>
    <div class="boutique-play-list">
        <div class="top">
            <div class="title">
                <span>精品歌单</span>
            </div>
            <div class="more">
                <span>更多</span>
                <span class="iconfont icon-youjiantou"></span>
            </div>
        </div>
        <div class="list">
            <div class="swiper-container boutique-play-list-swiper">
                <div class="swiper-wrapper">
                    <router-link
                        class="swiper-slide"
                        v-for="(item, id) in list"
                        :key="id"
                        :to="{ path: '/listview', query: { id: item.id } }"
                    >
                        <img v-lazy="item.coverImgUrl" />
                        <span class="name">{{ item.name }}</span>
                        <div class="count">
                            <span
                                class="iconfont icon-bofangsanjiaoxing"
                            ></span>
                            <span class="playCount">{{
                                changeValue(item.playCount)
                            }}</span>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onUpdated } from "vue";
import { getHighQualityPlayList } from "@/api/index";

export default {
    name: "BoutiquePlayList",
    setup() {
        let list = ref([]);
        const changeValue = (num) => {
            let res = 0;
            if (num > 100000000) {
                res = num / 100000000;
                res = res.toFixed(2) + "亿";
            } else if (num > 10000) {
                res = num / 10000;
                res = res.toFixed(2) + "万";
            }
            return res;
        };
        onMounted(() => {
            getHighQualityPlayList().then((res) => {
                list.value = res.data.playlists;
            });
        });
        onUpdated(() => {
            new Swiper(".boutique-play-list-swiper", {
                slidesPerView: 3,
                spaceBetween: 14,
            });
        });
        return {
            list,
            changeValue,
        };
    },
};
</script>

<style scoped lang='scss'>
.boutique-play-list {
    margin-bottom: 10px;
    padding: 0 10px 10px 10px;
    background-color: #fff;
    .top {
        display: flex;
        padding: 10px 0;
        justify-content: space-between;
        align-items: center;
        .title {
            font-size: 18px;
        }
        .more {
            padding: 2px 6px;
            border: 1px solid rgb(221, 219, 219);
            border-radius: 10px;
            font-size: 8px;
            .iconfont {
                font-size: 8px;
            }
        }
    }
    .list {
        .swiper-container {
            padding-right: 30px;
            .swiper-wrapper {
                display: flex;
                justify-content: space-between;
                .swiper-slide {
                    position: relative;
                    display: flex;
                    border-radius: 10px;
                    flex-direction: column;
                    img {
                        width: 100%;
                        margin-bottom: 4px;
                        border-radius: 10px;
                    }
                    .name {
                        // 文字限制2行，超出部分使用...省略号代替
                        overflow: hidden;
                        -webkit-line-clamp: 2;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        font-size: 12px;
                        line-height: 1.4;
                    }
                    .count {
                        display: flex;
                        position: absolute;
                        top: 4px;
                        right: 4px;
                        padding: 0 4px;
                        background-color: rgb(78, 78, 78);
                        border-radius: 6px;
                        color: #fff;
                        font-size: 10px;
                        align-items: center;
                        opacity: 0.7;
                        .iconfont {
                            margin-right: 2px;
                            font-size: 12px;
                        }
                    }
                }
            }
        }
    }
}
</style>