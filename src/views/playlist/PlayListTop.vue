<!-- 歌单顶部 -->
<template>
    <div class="playListTop">
        <div class="bg-box">
            <img
                class="bg"
                :style="{
                    'background-image': 'url(' + playlist.coverImgUrl + ')',
                }"
            />
        </div>
        <div class="topBar" :class="{ scroll: scroll }">
            <div
                class="img"
                :class="{ scroll: scroll }"
                :style="{
                    backgroundImage:
                        scroll == true
                            ? 'url(' + playlist.coverImgUrl + ')'
                            : '',
                }"
            ></div>
            <div class="left">
                <span
                    class="iconfont icon-arrowLeft-fill"
                    @click="$router.go(-1)"
                ></span>
                <span class="title" :class="{ scroll: scroll }">歌单</span>
                <span class="name" :class="{ scroll: scroll }">{{
                    playlist.name
                }}</span>
            </div>
            <div class="right">
                <span class="iconfont icon-sousuo" @click="searchPage()"></span>
                <span class="iconfont icon-gengduo"></span>
            </div>
        </div>
        <div class="content">
            <div class="top">
                <div class="top-left">
                    <img v-lazy="playlist.coverImgUrl" />
                    <PlayCount :playCount="playlist.playCount" />
                </div>
                <div class="top-right">
                    <div class="play-list-name">
                        <span
                            class="title"
                            :class="{ hasDescription: !playlist.description }"
                            >{{ playlist.name }}</span
                        >
                        <div class="author" v-if="author">
                            <img class="header" v-lazy="author.avatarUrl" />
                            <span class="nickname">{{ author.nickname }}</span>
                            <div>
                                <span class="iconfont icon-youjiantou"></span>
                            </div>
                        </div>
                    </div>
                    <div
                        v-if="playlist.description"
                        class="description"
                        @click="showPlayListCover()"
                    >
                        <span>{{ playlist.description }}</span>
                        <span class="iconfont icon-youjiantou"></span>
                    </div>
                </div>
            </div>
            <!-- 收藏数、评论数和分享数 -->
            <div class="playListInfo">
                <div
                    class="item"
                    v-if="$store.state.user.nickName === author.nickname"
                    style="color: grey"
                >
                    <span class="iconfont icon-zhengque"></span>
                    <span>{{
                        playlist.subscribedCount === 0
                            ? "收藏"
                            : changeValue(playlist.subscribedCount, 1)
                    }}</span>
                </div>
                <div class="item" v-else>
                    <span class="iconfont icon-shoucanggedan"></span>
                    <span>{{
                        playlist.subscribedCount === 0
                            ? "收藏"
                            : changeValue(playlist.subscribedCount, 1)
                    }}</span>
                </div>
                <div class="item">
                    <span class="iconfont icon-pinglun"></span>
                    <span>{{
                        playlist.subscribedCount === 0
                            ? "评论"
                            : changeValue(playlist.commentCount, 1)
                    }}</span>
                </div>
                <div class="item">
                    <span class="iconfont icon-fenxiang"></span>
                    <span>{{
                        playlist.subscribedCount === 0
                            ? "分享"
                            : changeValue(playlist.shareCount, 1)
                    }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PlayCount from "@/components/PlayCount.vue";
import { changeValue } from "@/utils/index.js";
import { onMounted, reactive, toRefs, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
    name: "PlayListTop",
    components: { PlayCount },
    props: ["playlist"],
    setup(props, { emit }) {
        const state = reactive({
            author: "",
            scroll: false,
        });

        const store = useStore();
        const router = useRouter();

        const searchPage = () => {
            router.push({
                name: "SearchPage",
            });
        };

        // 显示歌单封面
        const showPlayListCover = () => {
            let { coverImgUrl, name, description, tags } = props.playlist;
            store.commit("setPlayListCover", {
                coverImgUrl,
                name,
                description,
                tags,
            });
            emit("showPlayListCover");
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

        onMounted(() => {
            window.addEventListener("scroll", windowScroll);
        });

        watch(
            () => props.playlist,
            (newValue) => {
                state.author = newValue.creator;
            }
        );

        return {
            ...toRefs(state),
            changeValue,
            searchPage,
            showPlayListCover,
        };
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
            overflow: hidden;
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
        height: 26px;
        color: #fff;
        transition: height 0.3s ease-out;
        z-index: 999;
        &.scroll {
            overflow: hidden;
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
            margin: 24px 0 34px 0;
            .top-left {
                position: relative;
                display: flex;
                align-items: center;
                margin-right: 12px;
                img {
                    display: block;
                    width: 120px;
                    border-radius: 8px;
                }
            }
            .top-right {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                overflow: hidden;
                .play-list-name {
                    display: flex;
                    flex-direction: column;
                    .title {
                        overflow: hidden;
                        margin-bottom: 4px;
                        color: #fff;
                        font-size: 14px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        &.hasDescription {
                            margin-bottom: 34px;
                        }
                    }
                    .author {
                        display: flex;
                        align-items: center;
                        color: rgb(226, 226, 226);
                        font-size: 12px;
                        font-weight: 700;
                        .header {
                            width: 24px;
                            height: 24px;
                            margin: 4px 0;
                            border-radius: 50%;
                        }
                        .nickname {
                            margin: 0 4px 0 8px;
                        }
                        .iconfont {
                            font-size: 10px;
                        }
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
            padding: 14px;
            background-color: #fff;
            box-shadow: 1px 1px 1px rgba(209, 209, 209, 0.5);
            border-radius: 20px;
            .item {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 14px;
                line-height: 1;
                flex: 1;
                .iconfont {
                    vertical-align: middle;
                    margin-right: 6px;
                    font-size: 14px;
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
