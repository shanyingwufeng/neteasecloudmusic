<!-- 歌单歌曲 -->
<template>
    <div class="playListSong">
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
        <van-sticky :offset-top="50">
            <div class="top" v-if="playlist.length !== 0">
                <div class="top-left">
                    <span class="iconfont icon-bofang"></span>
                    <span class="playAll">播放全部</span>
                    <span class="playListCount">
                        ({{ playlist.trackIds.length }})
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
    </div>
</template>

<script>
import { useRouter } from "vue-router";
import { reactive, toRefs } from "vue";

export default {
    name: "PlayListSong",
    props: ["playlist", "songList"],
    setup() {
        const state = reactive({
            idArr: [],
        });

        const router = useRouter();

        const play = (id) => {
            router.push(`/playpage?id=${id}`);
        };

        return {
            ...toRefs(state),
            play,
        };
    },
};
</script>

<style scoped lang='scss'>
.playListSong {
    padding: 0 10px;
    padding-top: 24px;
    padding-bottom: 54px;
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
        padding: 14px 0;
        background-color: #fff;
        .top-left {
            display: flex;
            align-items: center;
            .iconfont {
                display: block;
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
    .detail {
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
                    display: flex;
                    flex-direction: column;
                    width: 90%;
                    padding-right: 20px;
                    color: #333;
                    font-size: 14px;
                    .title {
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
}
</style>
