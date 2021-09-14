<!-- 歌单顶部 -->
<template>
    <div class="playList-top">
        <div class="bg-box">
            <img
                class="bg"
                :style="{
                    'background-image': 'url(' + playlist.coverImgUrl + ')',
                }"
            />
        </div>
        <div class="topBar">
            <div class="left">
                <span
                    class="iconfont icon-arrowLeft-fill"
                    @click="$router.go(-1)"
                ></span>
                <span class="title">歌单</span>
            </div>
            <div class="right">
                <span
                    class="iconfont icon-sousuo"
                    @click="$router.push('/search')"
                ></span>
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
                        <span class="title">{{ playlist.name }}</span>
                        <div class="author">
                            <img class="header" v-lazy="author.avatarUrl" />
                            <span class="nickname">{{ author.nickname }}</span>
                            <div class="icon">
                                <span class="iconfont icon-youjiantou"></span>
                            </div>
                        </div>
                    </div>
                    <router-link
                        to="/playlistcover"
                        class="description"
                        @click="jumpCover()"
                    >
                        <span>{{ playlist.description }}</span>
                        <div class="icon">
                            <span class="iconfont icon-youjiantou"></span>
                        </div>
                    </router-link>
                </div>
            </div>
            <!-- 收藏数、评论数和分享数 -->
            <div class="playList-info">
                <div class="item">
                    <span class="iconfont icon-shoucanggedan"></span>
                    <span>{{ changeValue(playlist.subscribedCount, 1) }}</span>
                </div>
                <div class="item">
                    <span class="iconfont icon-pinglun"></span>
                    <span>{{ changeValue(playlist.commentCount, 1) }}</span>
                </div>
                <div class="item">
                    <span class="iconfont icon-fenxiang"></span>
                    <span>{{ changeValue(playlist.shareCount, 1) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PlayCount from "@/components/PlayCount.vue";
import $store from "@/store/index.js";
import { changeValue } from "@/utils/index.js";

export default {
    name: "PlayListTop",
    components: {
        PlayCount,
    },
    props: ["playlist", "author"],
    setup(props) {
        const jumpCover = () => {
            // console.log(props.playlist.coverImgUrl);
            // console.log(props.playlist.name);
            // console.log(props.playlist.description);
            // console.log(props.playlist.tags);
            // console.log($store.state.playListCover);
            let { coverImgUrl, name, description, tags } = props.playlist;
            // state.coverImgUrl = coverImgUrl;
            // state.name = name;
            // state.description = description;
            // state.tags = tags;
            $store.commit("setPlayListCover", {
                coverImgUrl,
                name,
                description,
                tags,
            });
        };
        return { changeValue, jumpCover };
    },
};
</script>

<style scoped lang='scss'>
.playList-top {
    position: relative;
    padding: 10px;
    .bg-box {
        overflow: hidden;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: #fff;
        z-index: -1;
        .bg {
            width: 100%;
            height: 50%;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            transform: scale(1.2);
            filter: blur(40px) contrast(0.8) brightness(0.8);
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
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6px 0;
        color: #fff;
        .left {
            display: flex;
            align-items: center;
            font-size: 16px;
            .iconfont {
                margin-right: 16px;
                font-size: 22px;
            }
            .title {
                font-size: 20px;
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
            margin: 30px 0 40px 0;
            padding-right: 10px;
            .top-left {
                position: relative;
                display: flex;
                align-items: center;
                margin-right: 12px;
                img {
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
                        font-size: 13px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .author {
                        display: flex;
                        align-items: center;
                        color: rgb(216, 216, 216);
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
        .playList-info {
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