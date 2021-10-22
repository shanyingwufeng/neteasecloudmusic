<!-- 底部播放控制和导航 -->
<template>
    <div class="bottom" v-if="!$route.meta.hiddenBottom">
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
        <!-- 底部导航 -->
        <div class="tabBar" v-if="!$route.meta.hiddenBottomTabBar">
            <router-link class="item" to="/">
                <span class="iconfont icon-home"></span>
                <span class="title">发现</span>
            </router-link>
            <router-link class="item" to="/podcast">
                <span class="iconfont icon-wangluobokeneironghezuo"></span>
                <span class="title">播客</span>
            </router-link>
            <router-link class="item" to="/me">
                <span class="iconfont icon-yinle1"></span>
                <span class="title">我的</span>
            </router-link>
            <router-link class="item" to="/follow">
                <span
                    class="iconfont icon-dilanxianxingiconyihuifu_huabanfuben"
                ></span>
                <span class="title">关注</span>
            </router-link>
            <router-link class="item" to="/village">
                <span class="iconfont icon-cunzhuangshenbao"></span>
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
            playState: computed(() => store.state.play.playState),
            bottomShow: computed(() => store.state.bottom.visible),
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
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #fff;
    z-index: 99;
    .playControl {
        position: relative;
        height: 40px;
        line-height: 40px;
        padding: 0 $padding;
        background-color: #fff;
        border-top: 1px solid #f8f8f8;
        .left {
            display: flex;
            align-items: center;
            width: 80%;
            .recode {
                position: absolute;
                top: -5px;
                left: 14px;
                .cd {
                    width: 42px;
                    height: 42px;
                }
                .songImg {
                    position: absolute;
                    top: 7px;
                    left: 7px;
                    width: 28px;
                    height: 28px;
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
                margin-left: 50px;
                @include ellipsis1();
                .title {
                    font-size: 14px;
                }
                .author {
                    color: grey;
                    font-size: 10px;
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
        align-items: center;
        height: 56px;
        background-color: #fff;
        box-shadow: 0 3px 14px 2px rgb(0 0 0 / 12%);
        .item {
            flex: 1;
            text-align: center;
            .iconfont {
                display: block;
                margin-bottom: 2px;
                margin-left: 1px;
                font-size: 24px;
            }
        }
        .router-link-active {
            .iconfont {
                &::before {
                    padding: 4px;
                    background-color: red;
                    border-radius: 50%;
                    color: #fff;
                    font-size: 20px;
                }
            }
            .title {
                color: red;
            }
        }
    }
}
</style>
