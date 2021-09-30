<!-- 底部播放控制和导航 -->
<template>
    <div class="bottom" v-if="bottomShow">
        <!-- 底部播放控制区 -->
        <div class="playControl" v-if="playSong.id">
            <router-link class="left" to="/playpage">
                <img class="songImg" v-lazy="playSong.imgUrl" />
                <span class="title">
                    {{ playSong.name }}
                </span>
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
        <!-- 底部导航栏 -->
        <div class="tabBar" v-if="!$route.meta.hiddenTabBar">
            <router-link
                class="tab-bar-item"
                v-for="(item, index) in tabBarData"
                :key="index"
                :to="item.path"
            >
                <span class="iconfont" :class="item.className"></span>
                <span class="title">{{ item.title }}</span>
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
            tabBarData: [
                { className: "icon-home", title: "发现", path: "/" },
                { className: "icon-a-ziyuan8", title: "播客", path: "/boke" },
                { className: "icon-wode-copy", title: "我的", path: "/me" },
                { className: "icon-Kgeriji", title: "k歌", path: "/k" },
                { className: "icon-pengyou", title: "云村", path: "/friends" },
            ],
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
            bottomShow: computed(() => store.state.bottom.isShow),
            playState: computed(() => store.state.play.playState),
            playSong: computed(() => store.getters["play/getPlaySong"]),
        };
    },
};
</script>

<style scoped lang='scss'>
.bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    line-height: 1.2;
    background-color: $color-white-background;
    z-index: 99;
    .playControl {
        position: relative;
        padding: 8px 10px;
        background-color: $color-white-background;
        border-top: 1px solid rgba(210, 210, 210, 0.2);
        border-bottom: 1px solid rgba(210, 210, 210, 0.2);
        .left {
            display: flex;
            align-items: center;
            width: 70%;
            .songImg {
                width: 32px;
                height: 32px;
                margin-right: 6px;
                border-radius: 50%;
            }
            .title {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 14px;
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
        background-color: $color-white-background;
        .tab-bar-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            .iconfont {
                margin-bottom: 2px;
                font-size: 18px;
            }
            .title {
                margin-top: 2px;
                font-size: 12px;
            }
        }
        .router-link-active {
            color: #d63b2b;
        }
    }
}
</style>