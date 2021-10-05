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
        <div class="center" @click="showLyric = !showLyric" v-show="!showLyric">
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
                ref="songImg"
                v-lazy="playSong.imgUrl"
                class="songImg"
                :class="{
                    songImgRoute: play,
                    pause: !playState,
                    zuoyi: zuoyi,
                    youyi: youyi,
                }"
            />
        </div>
        <div class="lyric" @click="showLyric = !showLyric" v-show="showLyric">
            <div v-if="lyric" class="hasLyric" ref="playLyric">
                <p
                    class="item"
                    :class="{
                        active:
                            playCurrentTime >= parseInt(item.time) &&
                            playCurrentTime < parseInt(item.next),
                    }"
                    v-for="(item, id) in lyric"
                    :key="id"
                >
                    {{ item.lyric }}
                </p>
            </div>
            <div v-else class="noLyric">
                <span>暂无歌词，如有请告知我们，谢谢！</span>
            </div>
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
                <span class="iconfont icon-shangyiqu" @click="preSong()"></span>
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
                <span class="iconfont icon-xiayiqu" @click="nextSong()"></span>
                <span class="iconfont icon-bofangliebiao"></span>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, reactive, watch, toRefs } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { getLyricList } from "@/utils/index.js";

export default {
    name: "PlayPage",
    setup() {
        const state = reactive({
            play: true,
            isPaused: false,
            showLyric: false,
            lyric: "",
            songIds: "",
            index: 0,
            zuoyi: false,
            youyi: false,
            playLyric: null,
            playCurrentTime: 0,
        });

        const store = useStore();
        const route = useRoute();
        const id = route.query.id;

        const musicPlay = () => {
            state.play = true;
            state.isPaused = false;
            store.commit("play/setPlayState", true);
        };

        const musicPause = () => {
            state.isPaused = true;
            store.commit("play/setPlayState", false);
        };

        const preSong = () => {
            state.zuoyi = true;
            store.commit("play/setPlayState", false);
            setTimeout(async () => {
                if (state.index == 0) {
                    state.index = state.songIds.length - 1;
                    await store.dispatch(
                        "play/setPlaySongInfo",
                        state.songIds[state.index]
                    );
                    state.lyric = getLyricList(store.state.play.playSong.lyric);
                    store.commit("play/setPlayState", true);
                } else {
                    state.index = state.index - 1;
                    await store.dispatch(
                        "play/setPlaySongInfo",
                        state.songIds[state.index]
                    );
                    state.lyric = getLyricList(store.state.play.playSong.lyric);
                    store.commit("play/setPlayState", true);
                    state.zuoyi = false;
                }
            }, 500);
        };

        const nextSong = () => {
            state.youyi = true;
            store.commit("play/setPlayState", false);
            setTimeout(async () => {
                if (state.index == state.songIds.length - 1) {
                    state.index = 0;
                    await store.dispatch(
                        "play/setPlaySongInfo",
                        state.songIds[state.index]
                    );
                    state.lyric = getLyricList(store.state.play.playSong.lyric);
                    store.commit("play/setPlayState", true);
                } else {
                    state.index = state.index + 1;
                    await store.dispatch(
                        "play/setPlaySongInfo",
                        state.songIds[state.index]
                    );
                    state.lyric = getLyricList(store.state.play.playSong.lyric);
                    store.commit("play/setPlayState", true);
                    state.youyi = false;
                }
            }, 500);
        };

        onMounted(async () => {
            if (id) {
                store.commit("play/setPlayState", false);
                await store.dispatch("play/setPlaySongInfo", id);
                state.songIds = store.state.play.songIds;
                state.index = state.songIds.indexOf(Number(id));
                state.lyric = getLyricList(store.state.play.playSong.lyric);
                store.commit("play/setPlayState", true);
            }
        });

        state.playCurrentTime = computed(() => {
            return store.state.play.playCurrentTime;
        });

        watch(state, (newValue) => {
            // console.log(newValue.playCurrentTime);
            // console.log([state.playLyric]);
            // let item = document.querySelector(".lyric");
            // console.log(state.playLyric.offsetHeight);
            let p = document.querySelector("p.active");
            if (p !== null) {
                let offsetTop = p.offsetTop;
                let h = state.playLyric.offsetHeight;
                // console.log(offsetTop + "--" + h);
                if (offsetTop > h) {
                    state.playLyric.scrollTop = offsetTop;
                }
            }
        });

        return {
            ...toRefs(state),
            musicPause,
            musicPlay,
            preSong,
            nextSong,
            playSong: computed(() => store.state.play.playSong),
            playState: computed(() => store.state.play.playState),
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
                color: rgb(219, 219, 219);
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
        height: 480px;
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
            position: absolute;
            top: 135px;
            left: 26%;
            width: 179px;
            border-radius: 50%;
            transition: all 0.5s linear;
            &.youyi {
                left: 110%;
            }
            &.zuoyi {
                left: -50%;
            }
        }
        .songImgRoute {
            animation: rotation 40s linear infinite;
        }
        .pause {
            animation-play-state: paused;
        }
    }
    .lyric {
        position: absolute;
        top: 80px;
        left: 0;
        width: 100%;
        height: 460px;
        .hasLyric {
            overflow: scroll;
            overflow-x: hidden;
            height: 100%;
            transition: all 1s linear;
            .item {
                color: #fff;
                line-height: 2;
                text-align: center;
                &.active {
                    color: rgb(221, 14, 14);
                    transform: scale(1.3);
                    transition: all 1.5s linear;
                }
            }
        }
        .noLyric {
            color: #fff;
        }
    }
    .bottom {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 120px;
        padding: $padding 20px;
        .btnList {
            display: flex;
            justify-content: space-around;
            align-items: center;
            .iconfont {
                color: rgb(233, 233, 233);
                font-size: 20px;
            }
        }
        .playControl {
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-top: 14px;
            .iconfont {
                color: #fff;
                font-size: 22px;
                opacity: 0.8;
            }
            .playandstop {
                font-size: 38px;
            }
        }
    }
}
</style>