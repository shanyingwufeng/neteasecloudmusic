<!-- 底部播放控制和导航 -->
<template>
    <div class="bottom" v-if="bottomShow">
        <!-- 底部播放控制区 -->
        <div class="playControl" v-if="playSong.id">
            <router-link
                class="left"
                :to="{
                    path: '/playpage',
                    query: { id: playSong.id, from: 'bottom' },
                }"
            >
                <div class="recode">
                    <img src="@/assets/disc.png" class="cd" />
                    <img
                        class="songImg"
                        :class="{
                            songImgRoute: play,
                            pause: !playState,
                        }"
                        v-lazy="playSong.imgUrl"
                    />
                </div>
                <div class="songAndAuthor">
                    <span class="title"> {{ playSong.name }} - </span>
                    <span class="author">
                        {{ playSong.author }}
                    </span>
                </div>
            </router-link>
            <div class="right">
                <!-- 播放按钮 -->
                <span
                    v-if="!playState"
                    class="iconfont icon-bofang6 bofang"
                    @click="play(playState)"
                ></span>
                <!-- 暂停按钮 -->
                <span
                    v-else
                    class="iconfont icon-zantingtingzhi bofang"
                    @click="play(playState)"
                ></span>
                <!-- 更多歌曲 -->
                <span class="iconfont icon-bofangliebiao more"></span>
            </div>
        </div>
        <div class="tabBar" v-if="!$route.meta.hiddenTabBar">
            <router-link class="item" to="/">
                <span class="iconfont icon-home"></span>
                <span class="title">发现</span>
            </router-link>
            <router-link class="item" to="/boke">
                <span class="iconfont icon-a-ziyuan8"></span>
                <span class="title">播客</span>
            </router-link>
            <router-link class="item" to="/me">
                <span class="iconfont icon-wode-copy"></span>
                <span class="title">我的</span>
            </router-link>
            <router-link class="item" to="/k">
                <span class="iconfont icon-Kgeriji"></span>
                <span class="title">k歌</span>
            </router-link>
            <router-link class="item" to="/friends">
                <span class="iconfont icon-pengyou"></span>
                <span class="title">云村</span>
            </router-link>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";

export default {
    name: "Bottom",
    setup() {
        const state = reactive({
            play: true,
        });

        const store = useStore();

        const play = (playState) => {
            if (playState) {
                store.commit("play/setPlayState", false);
            } else {
                store.commit("play/setPlayState", true);
            }
        };

        return {
            ...toRefs(state),
            play,
            bottomShow: computed(() => store.state.bottom.visible),
            playState: computed(() => store.state.play.playState),
            playSong: computed(() => store.getters["play/getPlaySong"]),
        };
    },
};
</script>

<style scoped lang='scss'>
@keyframes rotation {
    from {
        transform: rotateZ(0deg);
    }
    to {
        transform: rotateZ(360deg);
    }
}

.bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    line-height: 1.2;
    background-color: #fff;
    z-index: 999;
    .playControl {
        position: relative;
        padding: 12px 14px;
        background-color: #fff;
        border-top: 1px solid rgba(210, 210, 210, 0.2);
        border-bottom: 1px solid rgba(210, 210, 210, 0.2);
        .left {
            display: flex;
            align-items: center;
            width: 80%;
            .recode {
                position: absolute;
                top: -7px;
                left: 14px;
                .cd {
                    width: 44px;
                    height: 44px;
                }
                .songImg {
                    position: absolute;
                    top: 8px;
                    left: 8px;
                    width: 28px;
                    height: 28px;
                    margin-right: 8px;
                    border-radius: 50%;
                }
                .songImgRoute {
                    animation: rotation 40s linear infinite;
                }
                .pause {
                    animation-play-state: paused;
                }
            }
            .songAndAuthor {
                margin-left: 54px;
                @include ellipsis1();
                .title {
                    font-size: 14px;
                }
                .author {
                    color: grey;
                    font-size: 12px;
                }
            }
        }
        .right {
            display: flex;
            align-items: center;
            position: absolute;
            top: 0;
            right: 10px;
            height: 100%;
            z-index: 999;
            .bofang {
                font-size: 14px;
            }
            .more {
                margin-left: 14px;
                font-size: 20px;
            }
        }
    }
    .tabBar {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 6px 0 4px 0;
        background-color: #fff;
        .item {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0 14px;
            .iconfont {
                margin-bottom: 2px;
                font-size: 20px;
            }
            .title {
                margin-top: 2px;
                font-size: 8px;
            }
        }
        .router-link-active {
            color: #d63b2b;
        }
    }
}
</style>
