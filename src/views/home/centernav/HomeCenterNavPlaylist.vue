<!-- 歌单广场 -->
<template>
    <div class="homeCenterNavPlaylist">
        <van-sticky>
            <div class="top">
                <span
                    class="iconfont icon-zuojiantou"
                    @click="$router.go(-1)"
                ></span>
                <span class="title">歌单广场</span>
            </div>
        </van-sticky>
        <div class="content">
            <van-tabs
                v-model:active="active"
                animated
                @click-tab="setPlayLists"
            >
                <van-tab
                    v-for="(item, index) in list"
                    :title="item.title"
                    :key="index"
                >
                    <Loading v-if="loading" />
                    <div class="playListDetail" v-if="!loading">
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
import { getPlayLists, getHighQualityPlayList } from "@/api/playlist/index.js";
import { onMounted, reactive, toRefs, computed } from "vue";
import PlayCount from "@/components/PlayCount.vue";
import Loading from "@/components/Loading.vue";
import { useStore } from "vuex";

export default {
    name: "HomeCenterNavPlaylist",
    components: { PlayCount, Loading },
    setup() {
        const state = reactive({
            active: 1,
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
            vanLoading: false,
            finished: false,
            updateTime: 0, // 下一页数据
        });

        const store = useStore();

        const setPlayLists = async ({ title }) => {
            store.commit("setLoading", true);
            if (title === "精品") {
                await getHighQualityPlayList(50).then((res) => {
                    state.list[2].playlists = res.data.playlists;
                    store.commit("setLoading", false);
                });
            } else {
                await getPlayLists(title).then((res) => {
                    const obj = state.list.filter(
                        (item) => item.title == title
                    );
                    obj[0].playlists = res.data.playlists;
                    store.commit("setLoading", false);
                });
            }
        };

        const getPlayListData = async (list) => {
            await getPlayLists(list.title).then((res) => {
                list.playlists = res.data.playlists;
                store.commit("setLoading", false);
            });
        };

        // 加载歌单广场时候默认显示官方歌单
        onMounted(async () => {
            store.commit("setLoading", true);
            getPlayListData(state.list[1]);
        });

        return {
            ...toRefs(state),
            setPlayLists,
            loading: computed(() => store.state.loading),
        };
    },
};
</script>

<style lang='scss'>
.homeCenterNavPlaylist {
    padding-bottom: 40px;
    .top {
        display: flex;
        align-items: center;
        padding: 20px $padding;
        background-color: #fff;
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
        padding: 0 $padding;
        .van-tabs {
            .van-tabs__wrap {
                position: fixed;
                top: 56px;
                z-index: 999;
                .van-tabs__nav {
                    padding-left: 0;
                    padding-bottom: 0;
                    .van-tab {
                        height: 40px;
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
                padding-top: 30px;
                .van-tab__pane {
                    .loading {
                        margin: 20px;
                    }
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
                            &:last-child:nth-child(4n - 2) {
                                margin-right: calc(33% + 8% / 3);
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
