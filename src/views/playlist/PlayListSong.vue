<!-- 歌单歌曲 -->
<template>
    <div
        class="playListSong"
        :style="{ paddingBottom: playSong.id ? '54px' : '12px' }"
    >
        <!-- <div class="ad" v-if="!$store.state.user.isLogin">
            <div class="left">
                <span class="iconfont icon-xiaohongshuicon"></span>
                <span>微胖女生显胖瘦裤分享</span>
            </div>
            <div class="right">
                <span>广告</span>
                <span class="iconfont icon-youjiantou"></span>
            </div>
        </div>
        <div class="ad" v-if="$store.state.user.isLogin">
            <div class="left">
                <span class="iconfont icon-jingyunyinxiaopt"></span>
                <span>畅想酷炫鲸云音效</span>
            </div>
            <div class="right">
                <span>开启视觉盛宴</span>
                <span class="iconfont icon-youjiantou"></span>
            </div>
        </div> -->

        <van-sticky :offset-top="54">
            <div class="top" v-if="playList.length !== 0">
                <div class="top-left">
                    <span class="iconfont icon-bofang"></span>
                    <span class="playAll">播放全部</span>
                    <span class="playListCount">
                        ({{ playList.trackIds.length }})
                    </span>
                </div>
                <div class="top-right">
                    <span class="iconfont icon-xiazai1"></span>
                    <span class="iconfont icon-xiazaiwancheng"></span>
                </div>
            </div>
        </van-sticky>

        <div class="detail">
            <div
                class="item"
                v-for="(item, i) in songList"
                :key="i"
                @click="play(item.id)"
            >
                <div class="left">
                    <div class="id">{{ i + 1 }}</div>
                    <div class="content">
                        <div class="title">
                            <span>{{ item.name }}</span>
                            <span
                                v-if="item.alia.length !== 0"
                                style="color: rgb(156, 156, 156)"
                                >（{{ item.alia[0] }}）</span
                            >
                        </div>
                        <div class="bottom">
                            <div v-if="item.fee == 1">
                                <span class="iconfont icon-vip3 vip"></span>
                                <span
                                    class="iconfont icon-wusunyinzhi sq"
                                ></span>
                            </div>
                            <div v-if="item.fee == 8">
                                <span
                                    class="iconfont icon-wusunyinzhi sq"
                                ></span>
                            </div>
                            <div class="authorAndAl">
                                <span>{{ item.ar[0].name }}</span>
                                <span
                                    >-{{
                                        item.al.name ? item.al.name : item.name
                                    }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <span class="iconfont icon-bofang"></span>
                    <span class="iconfont icon-gengduo"></span>
                </div>
            </div>
        </div>

        <van-loading v-if="playListLoading">正在加载...</van-loading>
    </div>
</template>

<script>
import { reactive, toRefs, watch, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { getSongDetail } from "@/api/song/index.js";
import { spArr } from "@/utils/index.js";

export default {
    name: "PlayListSong",
    props: ["playList"],
    setup(props) {
        const state = reactive({
            playList: "",
            songList: [], // 歌单所有歌曲列表
            ids: [], // 歌单所有歌曲id
            idArry: [], // 歌单所有歌曲的id以20为一组组成新的数组
            page: 0, // 当前是第几页，默认是第一页
            isRefreshBool: true, // 是否刷新标志
        });

        const store = useStore();
        const router = useRouter();

        watch(
            () => props.playList,
            (newValue) => {
                state.playList = newValue;
                state.ids = newValue.trackIds.map((x) => {
                    return x.id;
                });
                if (state.ids.length <= 20) {
                    getSongList(state.ids);
                } else {
                    state.idArry = spArr(state.ids, 20);
                    getSongList(state.idArry[state.page]);
                }
                window.addEventListener("scroll", handleScroll, true);
            }
        );

        onMounted(() => {
            store.commit("setLoading", true);
        });

        onUnmounted(() => {
            window.removeEventListener("scroll", handleScroll, true);
        });

        // 滚动处理
        const handleScroll = () => {
            var scrollTop = document.documentElement.scrollTop;
            var clientHeight = document.documentElement.clientHeight;
            var scrollHeight = document.body.scrollHeight;
            // console.log(scrollTop + "-" + clientHeight + "-" + scrollHeight);
            if (
                scrollTop + clientHeight >= scrollHeight - 100 &&
                state.isRefreshBool === true
            ) {
                state.isRefreshBool = false;
                refresh();
            }
        };

        // 加载更多更趋信息
        const refresh = async () => {
            if (state.idArry.length > 1) {
                store.commit("setPlayListLoading", true);
                state.page = state.page + 1;
                if (state.page < state.idArry.length) {
                    await getSongList(state.idArry[state.page]);
                    state.isRefreshBool = true;
                }
                store.commit("setPlayListLoading", false);
            }
        };

        // 获取歌曲列表
        const getSongList = async (arry) => {
            await getSongDetail(arry.toString())
                .then((res) => {
                    if (state.songList.length === 0) {
                        state.songList = res.data.songs;
                    } else {
                        state.songList = state.songList.concat(res.data.songs);
                    }
                })
                .catch(() => {
                    store.commit("setLoading", false);
                });
            store.commit("setLoading", false);
        };

        const play = (id) => {
            router.push(`/playpage?id=${id}`);
        };

        return {
            ...toRefs(state),
            play,
            playListLoading: computed(() => store.state.playListLoading),
            playSong: computed(() => store.state.play.playSong),
        };
    },
};
</script>

<style lang='scss'>
.playListSong {
    padding: 24px 0 50px 0;
    background-color: #fff;
    .ad {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        padding: 10px 8px;
        border: 1px solid #f4f4f4;
        border-radius: 10px;
        font-size: 14px;
        .left {
            display: flex;
            align-items: center;
            .iconfont {
                margin-right: 6px;
                color: red;
                font-size: 16px;
            }
        }
        .right {
            display: flex;
            align-items: center;
            color: grey;
            font-size: 12px;
            .iconfont {
                font-size: 12px;
            }
        }
    }
    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 44px;
        line-height: 44px;
        padding: 0 $padding;
        background-color: #fff;
        .top-left {
            display: flex;
            align-items: center;
            .iconfont {
                display: block;
                margin-top: 2px;
                margin-right: 14px;
                color: red;
                font-size: 22px;
            }
            .playAll {
                margin-right: 6px;
                font-size: 18px;
                font-weight: 700;
            }
            .playListCount {
                color: grey;
                font-size: 14px;
            }
        }
        .top-right {
            padding-right: 4px;
            .iconfont {
                font-size: 16px;
            }
            .iconfont:first-child {
                margin-right: 18px;
            }
        }
    }
    .van-sticky.van-sticky--fixed {
        .top {
            border-bottom: 1px solid rgba(210, 210, 210, 0.3);
        }
    }
    .detail {
        margin-bottom: 10px;
        padding: 0 10px;
        .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 10px;
            padding: 4px 0;
            color: grey;
            .left {
                display: flex;
                align-items: center;
                .id {
                    width: 24px;
                    margin-right: 16px;
                    color: grey;
                    font-size: 18px;
                    text-align: center;
                }
                .content {
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    width: 88%;
                    padding-right: 20px;
                    color: #333;
                    font-size: 14px;
                    .title {
                        display: flex;
                        width: 200px;
                        margin-bottom: 2px;
                        @include ellipsis1();
                    }
                    .bottom {
                        display: flex;
                        align-items: center;
                        color: #999;
                        font-size: 10px;
                        .vip {
                            background-color: #333;
                            margin-right: 4px;
                            color: rgb(255, 187, 0);
                            font-size: 16px;
                        }
                        .sq {
                            margin-right: 4px;
                            color: red;
                            font-size: 20px;
                        }
                        .authorAndAl {
                            @include ellipsis1();
                        }
                    }
                }
            }
            .right {
                display: flex;
                .iconfont {
                    margin-left: 14px;
                    color: rgb(161, 161, 161);
                    font-size: 20px;
                }
            }
        }
    }
    .van-loading {
        padding-top: 30px;
        padding-bottom: 40px;
        text-align: center;
    }
}
</style>
