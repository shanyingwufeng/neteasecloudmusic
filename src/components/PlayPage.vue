<!-- 播放页面 -->
<template>
    <div class="playPage">
        <img class="bg" :src="playSong.imgUrl" />
        <div class="top">
            <span class="iconfont icon-jiantou9" @click="$router.go(-1)"></span>
            <div class="songInfo">
                <span class="songName">{{ playSong.name }}</span>
                <span class="songAuthor">{{ playSong.author }}</span>
            </div>
            <span class="iconfont icon-fenxiang"></span>
        </div>
        <div class="content">
            <div
                class="center"
                @click="showLyric = !showLyric"
                v-show="!showLyric"
            >
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
            <div
                class="lyric"
                @click="showLyric = !showLyric"
                v-show="showLyric"
            >
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
                    <span>纯音乐，请欣赏</span>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="btnList">
                <span class="iconfont icon-shoucang"></span>
                <span class="iconfont icon-iconset0425"></span>
                <span class="iconfont icon-changpian"></span>
                <div>
                    <div class="comment" v-if="playSong.comments >= 100000">
                        <span class="iconfont icon-pinglun_youpinglun_"></span>
                        <span class="total w10">10w+</span>
                    </div>
                    <div class="comment" v-else-if="playSong.comments >= 10000">
                        <span class="iconfont icon-pinglun_youpinglun_"></span>
                        <span class="total w1">1w+</span>
                    </div>
                    <div class="comment" v-else-if="playSong.comments >= 1000">
                        <span class="iconfont icon-pinglun_youpinglun_"></span>
                        <span class="total g999">999+</span>
                    </div>
                    <div class="comment" v-else-if="playSong.comments >= 100">
                        <span class="iconfont icon-pinglun_youpinglun_"></span>
                        <span class="total g100">{{ playSong.comments }}</span>
                    </div>
                    <div class="comment" v-else-if="playSong.comments >= 10">
                        <span class="iconfont icon-pinglun_youpinglun_"></span>
                        <span class="total g10">{{ playSong.comments }}</span>
                    </div>
                    <div
                        class="comment"
                        v-else-if="
                            playSong.comments > 0 && playSong.comments <= 10
                        "
                    >
                        <span class="iconfont icon-pinglun_youpinglun_"></span>
                        <span class="total g0">{{ playSong.comments }}</span>
                    </div>
                    <div class="comment" v-else-if="playSong.comments == 0">
                        <span class="iconfont icon-58pinglun"></span>
                    </div>
                </div>
                <span class="iconfont icon-gengduo"></span>
            </div>
            <div class="progressBar">
                <div class="startTime">
                    {{ addZero(startTimeMin) }}:{{ addZero(startTimeSec) }}
                </div>
                <van-progress
                    pivot-color="red"
                    color="#fff"
                    :percentage="10"
                    stroke-width="1px"
                    :show-pivot="true"
                />
                <div class="endTime">
                    <van-count-down
                        ref="countDown"
                        format="mm:ss"
                        :auto-start="false"
                        :time="time"
                    />
                </div>
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
            startTime: 0,
            startTimeMin: 0,
            startTimeSec: 0,
            endTime: 0,
            endTimeMin: 0,
            endTimeSec: 0,
            time: 0,
            countDown: null,
            startTimer: null,
        });

        const store = useStore();
        const route = useRoute();
        const id = route.query.id;
        const from = route.query.from;

        const addZero = (num) => {
            if (num < 10) {
                num = "0" + num;
            }
            return num;
        };

        const timer = () => {
            state.startTimeSec++;
            if (state.startTimeSec > 60) {
                state.startTimeSec = 0;
                state.startTimeMin = state.startTimeMin + 1;
            }
        };

        const musicPlay = () => {
            state.play = true;
            state.isPaused = false;
            store.commit("play/setPlayState", true);
            state.startTimer = setInterval(timer, 1000);
            state.countDown.start();
        };

        const musicPause = () => {
            state.isPaused = true;
            store.commit("play/setPlayState", false);
            clearInterval(state.startTimer);
            state.countDown.pause();
        };

        const preSong = () => {
            if (store.getters["play/getSongIds"]) {
                state.zuoyi = true;
                store.commit("play/setPlayState", false);
                setTimeout(async () => {
                    if (state.index == 0) {
                        state.index = state.songIds.length - 1;
                        await store.dispatch(
                            "play/setPlaySongInfo",
                            state.songIds[state.index]
                        );
                        state.lyric = getLyricList(
                            store.state.play.playSong.lyric
                        );
                        store.commit("play/setPlayState", true);
                    } else {
                        state.index = state.index - 1;
                        await store.dispatch(
                            "play/setPlaySongInfo",
                            state.songIds[state.index]
                        );
                        state.lyric = getLyricList(
                            store.state.play.playSong.lyric
                        );
                        store.commit("play/setPlayState", true);
                        state.zuoyi = false;
                    }
                }, 500);
            }
        };

        const nextSong = () => {
            if (store.getters["play/getSongIds"]) {
                state.youyi = true;
                store.commit("play/setPlayState", false);
                setTimeout(async () => {
                    if (state.index == state.songIds.length - 1) {
                        state.index = 0;
                        await store.dispatch(
                            "play/setPlaySongInfo",
                            state.songIds[state.index]
                        );
                        state.lyric = getLyricList(
                            store.state.play.playSong.lyric
                        );
                        store.commit("play/setPlayState", true);
                    } else {
                        state.index = state.index + 1;
                        await store.dispatch(
                            "play/setPlaySongInfo",
                            state.songIds[state.index]
                        );
                        state.lyric = getLyricList(
                            store.state.play.playSong.lyric
                        );
                        store.commit("play/setPlayState", true);
                        state.youyi = false;
                    }
                }, 500);
            }
        };

        const computeTime = () => {
            let lyricString = store.state.play.playSong.lyric;
            let regex = /\[(.+?)\]/g;
            if (lyricString.match(regex)) {
                let result = lyricString.match(regex);
                state.endTime = result[result.length - 1]
                    .replace(/\[|]/g, "")
                    .split(".")[0];
                state.endTimeMin = Number(state.endTime.split(":")[0]);
                state.endTimeSec = Number(state.endTime.split(":")[1]);
                state.time =
                    state.endTimeMin * 60 * 1000 + state.endTimeSec * 1000;
            }
        };

        onMounted(async () => {
            if (id) {
                if (from === "bottom") {
                    await store.dispatch("play/setPlaySongInfo", id);
                    state.songIds = store.state.play.songIds;
                    state.index = state.songIds.indexOf(Number(id));
                    state.lyric = getLyricList(store.state.play.playSong.lyric);
                    computeTime();
                } else {
                    store.commit("play/setPlayState", false);
                    await store.dispatch("play/setPlaySongInfo", id);
                    state.songIds = store.state.play.songIds;
                    state.index = state.songIds.indexOf(Number(id));
                    state.lyric = getLyricList(store.state.play.playSong.lyric);
                    computeTime();
                    store.commit("play/setPlayState", true);
                }
            }
            state.countDown.start();
            state.startTimer = setInterval(timer, 1000);
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
            addZero,
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

<style lang='scss'>
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
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    .bg {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: center no-repeat cover;
        transform: scale(5);
        filter: blur(50px) contrast(0.8) brightness(0.8);
        z-index: -1;
    }
    .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: $padding;
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
    .content {
        overflow: hidden;
        height: 74%;
        padding: 10px 0;
        .center {
            position: relative;
            height: 100%;
            text-align: center;
            .controlLever {
                position: absolute;
                top: 4px;
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
                top: 92px;
                left: 50%;
                transform: translateX(-50%);
                width: 280px;
            }
            .songImg {
                position: absolute;
                top: 142px;
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
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            .hasLyric {
                overflow: scroll;
                overflow-x: hidden;
                width: 100%;
                height: 100%;
                transition: all 0.8s linear;
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
    }
    .bottom {
        padding: 14px 0;
        .btnList {
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 0 36px;
            .iconfont {
                color: rgb(233, 233, 233);
                font-size: 24px;
            }
            .comment {
                position: relative;
                color: #fff;
                .total {
                    position: absolute;
                    top: 1px;
                    right: 0;
                    font-size: 8px;
                    &.w10 {
                        right: -22px;
                    }
                    &.w1 {
                        right: -14px;
                    }
                    &.g999 {
                        right: -22px;
                    }
                    &.g100 {
                        right: -14px;
                    }
                    &.g10 {
                        right: -5px;
                    }
                    &.g0 {
                        right: -2px;
                    }
                }
            }
        }
        .progressBar {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 50px;
            .startTime,
            .endTime {
                position: absolute;
                top: 50%;
                color: #fff;
                transform: translateY(-50%);
            }
            .startTime {
                left: 12px;
            }
            .van-progress {
                width: 70%;
                background: rgb(167, 167, 167);
                .van-progress__pivot {
                    min-width: 0;
                    height: 10px;
                    background-color: #fff !important;
                    border-radius: 50%;
                    font-size: 0;
                }
            }
            .endTime {
                right: 12px;
                .van-count-down {
                    color: #fff;
                    font-size: 12px;
                }
            }
        }
        .playControl {
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 0 34px;
            .iconfont {
                color: #fff;
                font-size: 26px;
                opacity: 0.8;
            }
            .playandstop {
                font-size: 44px;
            }
        }
    }
}
</style>
