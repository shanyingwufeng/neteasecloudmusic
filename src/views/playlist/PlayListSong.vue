<!-- 歌单歌曲 -->
<template>
    <div class="playList-song">
        <div class="ad" v-if="!$store.state.user.isLogin">
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
            <router-link
                class="item"
                v-for="(item, i) in tracks"
                :key="i"
                :to="{
                    path: '/playpage',
                    query: { id: item.id },
                }"
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
                                <span class="vip">VIP</span>
                                <span class="sq">SQ</span>
                            </div>
                            <div v-if="item.fee == 8">
                                <span class="sq">SQ</span>
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
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "PlayListSong",
    props: ["playlist", "tracks"],
};
</script>

<style scoped lang='scss'>
.playList-song {
    padding: 0 10px;
    padding-top: 40px;
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
                font-size: 18px;
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
                    padding-right: 20px;
                    color: #333;
                    font-size: 14px;
                    .title {
                        @include ellipsis1();
                        margin-bottom: 4px;
                    }
                    .bottom {
                        display: flex;
                        align-items: center;
                        color: #999;
                        font-size: 10px;
                        .authorAndAl {
                            @include ellipsis1();
                        }
                        .vip {
                            margin-right: 4px;
                            padding: 0 0.4px;
                            border: 1px solid rgb(255, 45, 45);
                            border-radius: 4px;
                            color: rgb(255, 45, 45);
                            font-size: 8px;
                        }
                        .sq {
                            margin-right: 4px;
                            padding: 0 0.4px;
                            border: 1px solid red;
                            border-radius: 4px;
                            color: red;
                            font-size: 8px;
                        }
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
