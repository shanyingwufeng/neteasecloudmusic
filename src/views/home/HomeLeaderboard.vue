<!-- 首页-排行榜 -->
<template>
    <div class="homeLeaderboard home-card">
        <TitleBar>
            <template v-slot:left>排行榜</template>
            <template v-slot:right>
                <span class="text">更多</span>
                <van-icon name="arrow" />
            </template>
        </TitleBar>
        <div class="swiper-container topList-swiper home-card-swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, id) in list" :key="id">
                    <div class="top">
                        <span class="title">{{ item.name }}</span>
                        <span class="iconfont icon-gengduo2"></span>
                    </div>
                    <div class="bottom" @click="setPlayList(item.id)">
                        <div
                            class="item"
                            v-for="(song, i) in item.tracks"
                            :key="i"
                            @click="play(song.id)"
                        >
                                <div class="img">
                                    <img v-lazy="song.imgUrl" />
                                    <span class="iconfont icon-bofang3"></span>
                                </div>
                                <span class="id">{{ i + 1 }}</span>
                                <div class="content">
                                    <span class="name">{{ song.first }} </span>
                                    <span class="author">
                                        - {{ song.second }}</span
                                    >
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TitleBar from "@/components/TitleBar.vue";
import PlayListSwiper from "@/components/PlayListSwiper.vue";
import { Swiper } from "swiper";
import { onUpdated, onMounted, reactive, toRefs } from "vue";
import { getTopListDetail } from "@/api/playlist/index.js";
import { searchByKeyword } from "@/api/search/index.js";
import { getSongDetail } from "@/api/song/index.js";
import { getRandomArrayValue } from "@/utils/index.js";
import { useStore } from "vuex";

export default {
    name: "homeLeaderboard",
    components: { TitleBar, PlayListSwiper },
    setup() {
        const state = reactive({
            list: "",
        });

        const store = useStore();

        const setPlayList = (id) => {
            store.dispatch("play/setPlayList", id);
        };

        const getImgUrlByNameAndAuthor = async (name) => {
            const songInfo = {
                id: 0,
                imgUrl: "",
            };
            await searchByKeyword(1, name).then(async (res) => {
                songInfo.id = res.data.result.songs[0].id;
                await getSongDetail(songInfo.id).then((res) => {
                    songInfo.imgUrl = res.data.songs[0].al.picUrl;
                });
            });
            return songInfo;
        };

        const play = async (id) => {
            store.commit("play/setPlayState", false);
            await store.dispatch("play/setPlaySongInfo", id);
            store.commit("play/setPlayState", true);
        };

        onMounted(() => {
            getTopListDetail().then((res) => {
                var newArray = [];
                var j = 0;
                for (let i in res.data.list) {
                    if (res.data.list[i].tracks.length === 3) {
                        newArray[j++] = res.data.list[i];
                    }
                }
                state.list = getRandomArrayValue(newArray, 4);
                state.list.forEach((element) => {
                    element.tracks.forEach((e) => {
                        getImgUrlByNameAndAuthor(e.first).then((res) => {
                            e["id"] = res.id;
                            e["imgUrl"] = res.imgUrl;
                        });
                    });
                });
            });
        });

        onUpdated(() => {
            new Swiper(".topList-swiper", {
                slidesPerView: 1,
                spaceBetween: 14,
                observeParents: true,
                observer: true,
            });
        });

        return {
            ...toRefs(state),
            getImgUrlByNameAndAuthor,
            setPlayList,
            play,
        };
    },
};
</script>

<style scoped lang='scss'>
.homeLeaderboard {
    .swiper-container {
        padding-right: 40px;
        .swiper-wrapper {
            .swiper-slide {
                padding: $padding;
                border: 1px solid rgba($color: #ebebeb, $alpha: 0.7);
                border-radius: 6px;
                .top {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 20px;
                    font-size: 16px;
                    .iconfont {
                        display: flex;
                        align-items: center;
                    }
                }
                .bottom {
                    display: flex;
                    flex-direction: column;
                    .item {
                        display: flex;
                        align-items: center;
                        margin-bottom: 14px;
                        &:last-child {
                            margin-bottom: 0;
                        }
                        .img {
                            position: relative;
                            img {
                                display: block;
                                width: 50px;
                                height: 50px;
                                margin-right: 14px;
                                border-radius: 6px;
                            }
                            .iconfont {
                                display: flex;
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translateX(-90%) translateY(-40%);
                                color: rgba($color: #ffffff, $alpha: 0.8);
                                font-size: 14px;
                            }
                        }
                        .id {
                            margin-right: 8px;
                            font-size: 14px;
                            font-weight: 700;
                        }
                        .content {
                            display: flex;
                            align-items: center;
                            flex-wrap: nowrap;
                            width: 80%;
                            .name {
                                @include ellipsis1();
                                margin: 4px;
                                font-size: 16px;
                            }
                            .author {
                                @include ellipsis1();
                                color: grey;
                                font-size: 10px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
