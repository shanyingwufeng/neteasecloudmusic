<!-- 播放页面 -->
<template>
    <div class="playPage">
        <img class="bg" v-lazy="$store.getters.songImgUrl" />
        <div class="top">
            <span class="iconfont icon-jiantou9" @click="$router.go(-1)"></span>
            <span class="songName">
                {{ $store.getters.songName }}
            </span>
            <span class="iconfont icon-fenxiang"></span>
        </div>
        <div class="center">
            <!-- 控制杆子 -->
            <img
                src="@/assets/needle-ab.png"
                class="controlLever"
                :class="{ active: !playState }"
            />
            <!-- 唱碟（歌曲图片外部黑色圈圈） -->
            <img src="@/assets/disc.png" class="cd" />
            <!-- 歌曲图片 -->
            <img
                v-lazy="$store.getters.songImgUrl"
                class="songImg"
                :class="{
                    songImgRoute: play,
                    pause: !playState,
                }"
            />
        </div>
        <div class="bottom">
            <div class="btnList">
                <span class="iconfont icon-shoucang"></span>
                <span class="iconfont icon-iconset0425"></span>
                <span class="iconfont icon-changpian"></span>
                <span class="iconfont icon-58pinglun"></span>
                <span class="iconfont icon-gengduo"></span>
            </div>
            <div class="playControl">
                <span class="iconfont icon-suijibofang"></span>
                <span class="iconfont icon-shangyiqu"></span>
                <span
                    v-if="!playState"
                    class="iconfont icon-bofang playandstop"
                    @click="musicPlay()"
                ></span>
                <span
                    v-else
                    class="iconfont icon-zantingtingzhi21 playandstop"
                    @click="musicPause()"
                ></span>
                <span class="iconfont icon-xiayiqu"></span>
                <span class="iconfont icon-bofangliebiao"></span>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { getSongDetail } from "@/api/index.js";

export default {
    name: "PlayPage",
    setup() {
        const store = useStore();
        const route = useRoute();
        const id = route.query.id;

        const state = reactive({
            play: true,
            isPaused: false,
        });

        const musicPlay = () => {
            state.play = true;
            state.isPaused = false;
            store.commit("setPlayState", true);
        };

        const musicPause = () => {
            state.isPaused = true;
            store.commit("setPlayState", false);
        };

        onMounted(async () => {
            if (id) {
                store.commit("setPlayState", false);
                await getSongDetail(id).then((res) => {
                    store.commit("setPlayControl", res.data.songs[0]);
                });
                store.commit("setPlayState", true);
            }
        });

        return {
            ...toRefs(state),
            musicPause,
            musicPlay,
            playState: computed(() => store.state.playState),
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

.playPage {
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #555;
    z-index: 100;
    .bg {
        position: absolute;
        height: 100%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        transform: scale(1.2);
        filter: blur(20px) contrast(0.8) brightness(0.8);
        z-index: -1;
    }
    .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 4px;
        margin-bottom: 14px;
        padding: 10px;
        color: #fff;
        .songName {
            overflow: hidden;
            padding: 0 20px;
            font-size: 18px;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .iconfont {
            font-size: 20px;
        }
    }
    .center {
        position: absolute;
        top: 50px;
        left: 0;
        width: 100%;
        text-align: center;
        .controlLever {
            position: absolute;
            top: 0;
            left: 46%;
            width: 96px;
            transform-origin: 8px 0;
            transition: all 0.6s;
            z-index: 1;
        }
        .controlLever.active {
            transform: rotate(-24deg);
        }
        .cd {
            position: absolute;
            top: 88px;
            left: 50%;
            transform: translateX(-50%);
            width: 270px;
        }
        .songImg {
            width: 168px;
            margin-top: 140px;
            border-radius: 50%;
        }
        .songImgRoute {
            animation: rotation 30s linear infinite;
        }
        .pause {
            animation-play-state: paused;
        }
    }
    .bottom {
        position: absolute;
        bottom: 54px;
        width: 100%;
        padding: 0 30px;
        .btnList {
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-bottom: 30px;
            .iconfont {
                color: rgb(223, 223, 223);
                font-size: 20px;
            }
        }
        .playControl {
            display: flex;
            justify-content: space-around;
            align-items: center;
            .iconfont {
                color: #fff;
                font-size: 24px;
                opacity: 0.8;
            }
            .playandstop {
                font-size: 40px;
            }
        }
    }
}
</style>