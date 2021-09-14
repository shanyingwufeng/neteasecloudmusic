<!-- 歌单歌曲 -->
<template>
    <div class="playList-song">
        <div class="ad">
            <div class="left">
                <span class="iconfont icon-xiaohongshuicon"></span>
                <span>微胖女生显胖瘦裤分享</span>
            </div>
            <div class="right">
                <span>广告</span>
                <div>
                    <span class="iconfont icon-youjiantou"></span>
                </div>
            </div>
        </div>
        <div class="top" v-show="playlist.length !== 0">
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
        <div class="detail">
            <div class="item" v-for="(item, i) in tracks" :key="i">
                <div class="left">
                    <div class="id">{{ i + 1 }}</div>
                    <div class="content">
                        <div class="title">{{ item.name }}</div>
                        <div class="bottom">
                            <span class="author">
                                <span>{{ item.ar[0].name }} - </span>
                            </span>
                            <span>{{
                                item.alia[0] ? item.alia[0] : item.name
                            }}</span>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <span
                        class="iconfont icon-bofang"
                        @click="setPlayCurrentIndex(i)"
                    ></span>
                    <span class="iconfont icon-gengduo"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
    name: "PlayListSong",
    props: ["playlist", "tracks"],
    setup() {
        return { ...mapMutations(["setPlayCurrentIndex"]) };
    },
};
</script>

<style scoped lang='scss'>
.playList-song {
    padding: 0 10px;
    padding-top: 40px;
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
        padding: 4px 0;
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
                margin-right: 4px;
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
                font-size: 18px;
            }
            .iconfont:first-child {
                margin-right: 12px;
            }
        }
    }
    .detail {
        padding-bottom: 50px;
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
                    padding-right: 20px;
                    color: #333;
                    font-size: 14px;
                    .title {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                    }
                    .bottom {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        color: #999;
                        font-size: 10px;
                    }
                }
            }
            .right {
                display: flex;
                .iconfont {
                    margin-left: 6px;
                    font-size: 18px;
                }
            }
        }
    }
}
</style>
