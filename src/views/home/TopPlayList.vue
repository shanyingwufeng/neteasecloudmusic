<!--首页-华语精品-->
<template>
    <div class="top-play-list">
        <div class="list-top">
            <div class="title">
                <span>华语精品</span>
            </div>
            <div class="more">
                <span class="iconfont icon-bofangsanjiaoxing"></span>
                <span>播放</span>
            </div>
        </div>
        <div class="list">
            <div
                class="list-item"
                v-for="(item, i) in songList"
                :key="i"
                @click="setPlayCurrentIndex(i)"
            >
                <div class="item-left">
                    <img :src="item.al.picUrl" class="image" />
                    <span class="title">{{ item.name }}</span>
                    <span class="author">- {{ item.ar[0].name }}</span>
                    <!-- <span class="desc">{{
                        item.alia[0] ? item.alia[0] : item.name
                    }}</span> -->
                </div>
                <div class="item-right">
                    <span class="iconfont icon-bofang"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, onUpdated, reactive, toRefs } from "vue";
import { getTopPlayList, getPlayListDetail } from "@/api/index";
import { mapMutations } from "vuex";

export default {
    name: "TopPlayList",
    setup() {
        let state = reactive({
            list: [],
            id: 0,
            songList: [],
        });
        onMounted(() => {
            getTopPlayList().then((res) => {
                state.id = res.data.playlists[0].id;
                getPlayListDetail(state.id).then((res) => {
                    state.songList = res.data.playlist.tracks.slice(0, 3);
                });
                state.list = res.data.playlists;
            });
        });
        onUpdated(() => {
            new Swiper(".mySwiper", {
                slidesPerView: 3,
                spaceBetween: 14,
            });
        });
        return {
            ...toRefs(state),
            ...mapMutations(["setPlayCurrentIndex"]),
        };
    },
};
</script>

<style scoped lang='scss'>
.top-play-list {
    // margin-bottom: 10px;
    padding: 0 10px 20px 10px;
    background-color: #fff;
    .list-top {
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
        .list-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 8px;
            .item-left {
                position: relative;
                display: flex;
                align-items: center;
                width: 80%;
                .image {
                    width: 40px;
                    height: 40px;
                    margin-right: 6px;
                }
                .title {
                    font-size: 14px;
                }
                .author {
                    color: grey;
                    font-size: 12px;
                }
            }
            .item-right {
                color: grey;
                .iconfont {
                    margin-right: 8px;
                    font-size: 20px;
                }
            }
        }
    }
}
</style>