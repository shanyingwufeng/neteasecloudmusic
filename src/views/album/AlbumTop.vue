<!-- 歌单顶部 -->
<template>
    <div class="playListTop">
        <div class="bg-box">
            <img
                class="bg"
                :style="{
                    'background-image': 'url(' + album.blurPicUrl + ')',
                }"
            />
        </div>
        <div class="topBar" :class="{ scroll: scroll }">
            <div
                class="img"
                :class="{ scroll: scroll }"
                :style="{
                    backgroundImage:
                        scroll == true ? 'url(' + album.blurPicUrl + ')' : '',
                }"
            ></div>
            <div class="left">
                <span
                    class="iconfont icon-arrowLeft-fill"
                    @click="$router.go(-1)"
                ></span>
                <span class="title" :class="{ scroll: scroll }">专辑</span>
                <span class="name" :class="{ scroll: scroll }">{{
                    album.name
                }}</span>
            </div>
            <div class="right">
                <span class="iconfont icon-gengduo"></span>
            </div>
        </div>
        <div class="content">
            <div class="top">
                <div class="top-left">
                    <img class="img" v-lazy="album.picUrl" />
                    <img class="imgBackground" src="@/assets/playlistcovertop.png" />
                </div>
                <div class="top-right">
                    <div class="info">
                        <span class="title">{{ album.name }}</span>
                        <div class="artist" v-if="album.artist">
                            <span class="name"
                                >歌手：{{ album.artist.name }}</span
                            >
                            <span class="iconfont icon-youjiantou2"></span>
                        </div>
                        <span class="time">
                            发行时间：{{ moment(album.publishTime).format("YYYY.MM.DD") }}
                        </span>
                    </div>
                    <div v-if="album.description" class="description">
                        <span>{{ album.description }}</span>
                        <span class="iconfont icon-youjiantou"></span>
                    </div>
                </div>
            </div>
            <!-- 收藏数、评论数和分享数 -->
            <div class="playListInfo">
                <div class="item">
                    <span class="iconfont icon-shoucanggedan"></span>
                    <span>收藏</span>
                </div>
                <div class="item">
                    <span class="iconfont icon-pinglun"></span>
                    <span v-if="album.info">{{
                        album.info.commentCount === 0
                            ? "评论"
                            : changeValue(album.info.commentCount, 1)
                    }}</span>
                </div>
                <div class="item">
                    <span class="iconfont icon-fenxiang"></span>
                    <span v-if="album.info">{{
                        album.info.shareCount === 0
                            ? "分享"
                            : changeValue(album.info.shareCount, 1)
                    }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { changeValue } from "@/utils/index.js";
import { onMounted, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import moment from "moment";

export default {
    name: "PlayListTop",
    components: {},
    props: ["album"],
    setup() {
        const state = reactive({
            scroll: false,
        });

        const router = useRouter();

        onMounted(() => {
            window.addEventListener("scroll", windowScroll);
        });

        const searchPage = () => {
            router.push({
                name: "SearchPage",
            });
        };

        const windowScroll = () => {
            // 滚动条距离页面顶部的距离
            var scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            if (scrollTop !== 0) {
                state.scroll = true;
            } else {
                state.scroll = false;
            }
        };

        return { ...toRefs(state), changeValue, searchPage, moment };
    },
};
</script>

<style scoped lang='scss'>
.playListTop {
    position: relative;
    padding: $padding;
    padding-top: 20px;
    .bg-box {
        overflow: hidden;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        z-index: -1;
        .bg {
            width: 100%;
            height: 34%;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            transform: scale(1.2);
            filter: blur(10px) contrast(0.5) brightness(0.5);
        }
        .bg::after {
            content: "";
            display: block;
            width: 100%;
            height: 400px;
            background: rgba(17, 17, 17, 0.2);
            z-index: 1;
        }
    }
    .topBar {
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        color: #fff;
        z-index: 999;
        &.scroll {
            position: fixed;
            top: 0;
            left: 0;
            height: 54px;
            padding: 6px $padding;
        }
        .img {
            display: none;
            &.scroll {
                position: absolute;
                top: 0;
                left: 0;
                display: block;
                width: 100%;
                height: 54px;
                background-size: cover;
                background-position: top;
                background-repeat: no-repeat;
                transform: scale(1.2);
                filter: blur(5px) contrast(0.5) brightness(0.5);
                z-index: -1;
            }
        }
        .left {
            display: flex;
            align-items: center;
            flex-wrap: nowrap;
            font-size: 16px;
            .iconfont {
                margin-right: 12px;
                font-size: 22px;
            }
            .title {
                font-size: 20px;
                &.scroll {
                    display: none;
                }
            }
            .name {
                display: none;
                &.scroll {
                    display: block;
                    width: 230px;
                    font-size: 14px;
                    @include ellipsis1();
                }
            }
        }
        .right {
            display: flex;
            align-items: center;
            .icon-sousuo {
                margin-right: 20px;
            }
            .iconfont {
                font-size: 18px;
            }
        }
    }
    .content {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .top {
            display: flex;
            margin: 28px 0 34px 0;
            .top-left {
                position: relative;
                display: flex;
                align-items: center;
                margin-right: 18px;
                .img {
                    display: block;
                    width: 120px;
                    height: 120px;
                    border-radius: 8px;
                }
                .imgBackground {
                    position: absolute;
                    top: -14px;
                    left: -8px;
                    width: 140px;
                    height: 14px;
                }
            }
            .top-right {
                overflow: hidden;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .info {
                    display: flex;
                    flex-direction: column;
                    .title {
                        @include ellipsis2();
                        line-height: 1.5;
                        margin-bottom: 4px;
                        color: #fff;
                        font-size: 16px;
                        font-weight: 700;
                    }
                    .artist {
                        display: flex;
                        align-items: center;
                        margin: 8px 0 4px 0;
                        color: rgba(241, 241, 241, 0.8);
                        font-size: 12px;
                        font-weight: 700;
                        .iconfont {
                            font-size: 14px;
                        }
                    }
                    .time {
                        color: rgba(241, 241, 241, 0.5);
                    }
                }
                .description {
                    display: flex;
                    align-items: center;
                    color: rgb(216, 216, 216);
                    font-size: 10px;
                    span:first-child {
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .iconfont {
                        font-size: 12px;
                    }
                }
            }
        }
        .playListInfo {
            display: flex;
            justify-content: space-between;
            position: absolute;
            left: 50%;
            bottom: -30px;
            transform: translateX(-50%);
            width: 88%;
            padding: 10px;
            background-color: #fff;
            box-shadow: 1px 1px 1px rgba(209, 209, 209, 0.5);
            border-radius: 20px;
            .item {
                display: flex;
                justify-content: center;
                font-size: 14px;
                height: 22px;
                line-height: 22px;
                flex: 1;
                .iconfont {
                    margin-right: 6px;
                    font-size: 18px;
                }
            }
            .item:nth-child(2) {
                border-left: 1px solid rgb(212, 212, 212);
                border-right: 1px solid rgb(212, 212, 212);
            }
        }
    }
}
</style>
