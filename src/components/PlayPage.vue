<!-- 歌曲播放页面 -->
<template>
    <div class="playPage">
        <img class="bg" :src="playdetail.al.picUrl" />
        <div class="top">
            <span
                class="iconfont icon-jiantou9 back"
                @click="$emit('back')"
            ></span>
            <span class="song-name">
                {{ playdetail.al.name }}
            </span>
            <span class="iconfont icon-fenxiang share"></span>
        </div>
        <div class="center">
            <!-- 控制杆子 -->
            <img
                src="@/assets/needle-ab.png"
                class="control-lever"
                :class="{ active: paused }"
            />
            <!-- 唱碟（歌曲图片外部黑色圈圈） -->
            <img src="@/assets/disc.png" class="cd" />
            <!-- 歌曲图片 -->
            <img
                v-lazy="playdetail.al.picUrl"
                class="song-img"
                :class="{
                    songImgRoute: isPlay,
                    pause: isPaused,
                }"
            />
        </div>
        <div class="bottom">
            <div class="btn-list">
                <span class="iconfont icon-shoucang"></span>
                <span class="iconfont icon-iconset0425"></span>
                <span class="iconfont icon-changpian"></span>
                <span class="iconfont icon-58pinglun"></span>
                <span class="iconfont icon-gengduo"></span>
            </div>
            <div class="play-control">
                <span class="iconfont icon-suijibofang"></span>
                <span class="iconfont icon-shangyiqu"></span>
                <span
                    v-if="paused"
                    class="iconfont icon-bofang playandstop"
                    @click="
                        play();
                        musicPlay();
                    "
                ></span>
                <span
                    v-else
                    class="iconfont icon-zantingtingzhi21 playandstop"
                    @click="
                        play();
                        musicPause();
                    "
                ></span>
                <span class="iconfont icon-xiayiqu"></span>
                <span class="iconfont icon-bofangliebiao"></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PlayPage",
    props: ["playdetail", "paused", "play"],
    data() {
        return {
            isPaused: false,
            isPlay: false,
        };
    },
    methods: {
        musicPlay() {
            this.isPlay = true;
            this.isPaused = false;
        },
        musicPause() {
            this.isPaused = true;
        },
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
    background-color: #fff;
    z-index: 1000;
    .bg {
        position: absolute;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        transform: scale(1.2);
        filter: blur(20px) contrast(.8) brightness(.8);
        z-index: -1;
    }
    .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 4px;
        padding: 10px;
        margin-bottom: 14px;
        color: #fff;
        .song-name {
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
        .control-lever {
            position: absolute;
            top: 0;
            left: 47%;
            width: 92px;
            transform-origin: 8px 0;
            transition: all 1s;
            z-index: 1;
        }
        .control-lever.active {
            transform: rotate(-24deg);
        }
        .cd {
            position: absolute;
            top: 90px;
            left: 50%;
            transform: translateX(-50%);
            width: 300px;
        }
        .song-img {
            width: 194px;
            margin-top: 144px;
            border-radius: 50%;
        }
        .songImgRoute {
            animation: rotation 20s linear infinite;
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
        .btn-list {
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-bottom: 30px;
            .iconfont {
                color: rgb(223, 223, 223);
                font-size: 20px;
            }
        }
        .play-control {
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