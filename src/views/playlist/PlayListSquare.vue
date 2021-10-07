<!-- 歌单广场 -->
<template>
    <div class="playListSquare">
        <div class="top">
            <span
                class="iconfont icon-zuojiantou"
                @click="$router.go(-1)"
            ></span>
            <span class="title">歌单广场</span>
        </div>
        <div class="content">
            <van-tabs v-model:active="active">
                <van-tab
                    v-for="(item, index) in list"
                    :title="item.title"
                    :key="index"
                    @click="setPlayLists(item.title)"
                >
                    <div class="playListDetail">
                        <router-link
                            class="playListItem"
                            v-for="(item, i) in item.playlists"
                            :key="i"
                            :to="{
                                path: '/playlist',
                                query: { id: item.id },
                            }"
                        >
                            <img v-lazy="item.coverImgUrl" />
                            <div class="name">{{ item.name }}</div>
                            <PlayCount :playCount="item.playCount" :point="1" />
                        </router-link>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import { getPlayLists } from "@/api/playlist/index.js";
import { onMounted, reactive, toRefs } from "vue";
import PlayCount from "@/components/PlayCount.vue";

export default {
    name: "PlayListSquare",
    components: { PlayCount },
    setup() {
        const state = reactive({
            active: 3,
            list: [
                { title: "推荐", playlists: "" },
                { title: "官方", playlists: "" },
                { title: "精品", playlists: "" },
                { title: "华语", playlists: "" },
                { title: "民谣", playlists: "" },
                { title: "流行", playlists: "" },
                { title: "轻音乐", playlists: "" },
                { title: "摇滚", playlists: "" },
            ],
        });

        const setPlayLists = (title) => {
            console.log(title);
        };

        onMounted(() => {
            getPlayLists(state.list[3].title).then((res) => {
                // console.log(res.data);
                state.list[3].playlists = res.data.playlists;
            });
        });

        return { ...toRefs(state), setPlayLists };
    },
};
</script>

<style lang='scss'>
.playListSquare {
    overflow: scroll;
    padding: $padding;
    padding-bottom: 40px;
    .top {
        display: flex;
        align-items: center;
        .iconfont {
            display: flex;
            margin-right: 12px;
            font-size: 24px;
        }
        .title {
            font-size: 16px;
        }
    }
    .content {
        .van-tabs {
            .van-tabs__wrap {
                .van-tabs__nav {
                    padding-left: 0;
                    padding-bottom: 0;
                    .van-tab {
                        margin-right: 16px;
                        padding-left: 4px;
                        padding-right: 4px;
                    }
                    .van-tabs__line {
                        bottom: 10px;
                        width: 30px !important;
                        height: 4px;
                        background-color: rgba($color: red, $alpha: 0.7);
                    }
                }
            }
            .van-tabs__content {
                .playListDetail {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    margin-top: 16px;
                    .playListItem {
                        position: relative;
                        width: 30%;
                        display: flex;
                        flex-direction: column;
                        margin-bottom: 20px;
                        img {
                            display: block;
                            width: 104px;
                            height: 104px;
                            margin-bottom: 4px;
                            border-radius: 8px;
                        }
                        .name {
                            @include ellipsis2();
                        }
                    }
                }
            }
        }
    }
}
</style>
