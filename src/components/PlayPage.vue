<!-- 播放页面 -->
<template>
    <div class="playPage">
        <img class="bg" v-lazy="playSong.imgUrl" />
        <div class="top">
            <span class="iconfont icon-jiantou9" @click="$router.go(-1)"></span>
            <div class="songInfo">
                <span class="songName">{{ playSong.name }}</span>
                <span class="songAuthor">{{ playSong.author }}</span>
            </div>
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
                v-lazy="playSong.imgUrl"
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
                    class="iconfont icon-bofang7 playandstop"
                    @click="musicPlay()"
                ></span>
                <span
                    v-else
                    class="
                        iconfont
                        icon-pcduanbizhixiazaicishutubiao
                        playandstop
                    "
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
            store.commit("play/setPlayState", true);
        };

        const musicPause = () => {
            state.isPaused = true;
            store.commit("play/setPlayState", false);
        };

        onMounted(async () => {
            if (id) {
                store.commit("play/setPlayState", false);
                await getSongDetail(id).then((res) => {
                    console.log(res.data);
                    const playSong = {
                        id: 0,
                        name: "",
                        author: "",
                        imgUrl: "",
                    };
                    playSong.id = res.data.songs[0].id;
                    playSong.name = res.data.songs[0].name;
                    playSong.author = res.data.songs[0].ar[0].name;
                    playSong.imgUrl = res.data.songs[0].al.picUrl;
                    store.commit("play/setPlaySong", playSong);
                });
                store.commit("play/setPlayState", true);
            }
        });

        return {
            ...toRefs(state),
            musicPause,
            musicPlay,
            playState: computed(() => store.state.play.playState),
            playSong: computed(() => store.state.play.playSong),
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
        transform: scale(5);
        filter: blur(50px) contrast(0.8) brightness(0.8);
        z-index: -1;
    }
    .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: $padding 20px;
        color: #fff;
        .songInfo {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 80%;
            .songName {
                @include ellipsis1();
                padding: 0 20px;
                font-size: 14px;
            }
            .songAuthor {
                @include ellipsis1();
                color: rgb(190, 190, 190);
                font-size: 12px;
            }
        }
        .iconfont {
            font-size: 20px;
        }
    }
    .center {
        position: absolute;
        top: 64px;
        left: 0;
        width: 100%;
        height: 440px;
        text-align: center;
        .controlLever {
            position: absolute;
            top: 0;
            left: 46%;
            width: 90px;
            transform-origin: 8px 0;
            transition: all 0.6s;
            z-index: 1;
        }
        .controlLever.active {
            transform: rotate(-26deg);
        }
        .cd {
            position: absolute;
            top: 84px;
            left: 50%;
            transform: translateX(-50%);
            width: 280px;
        }
        .songImg {
            width: 176px;
            margin-top: 136px;
            border-radius: 50%;
        }
        .songImgRoute {
            animation: rotation 40s linear infinite;
        }
        .pause {
            animation-play-state: paused;
        }
    }
    .bottom {
        position: absolute;
        bottom: 30px;
        width: 100%;
        padding: 0 30px;
        .btnList {
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-bottom: 30px;
            .iconfont {
                color: rgb(233, 233, 233);
                font-size: 20px;
            }
        }
        .playControl {
            display: flex;
            justify-content: space-around;
            align-items: center;
            .iconfont {
                color: #fff;
                font-size: 22px;
                opacity: 0.8;
            }
            .playandstop {
                font-size: 40px;
            }
        }
    }
}
</style>