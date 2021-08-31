<!-- 歌曲播放页面 -->
<template>
    <div class="playPage">
        <img class="bg" :src="playdetail.al.picUrl" />
        <div class="top">
            <span class="iconfont icon-jiantou9" @click="$emit('back')"></span>
            <div class="center">
                <div class="title">
                    {{ playdetail.al.name }}
                </div>
            </div>
            <span class="iconfont icon-fenxiang"></span>
        </div>
        <div
            class="content"
            v-show="!isLyricShow"
            @click="isLyricShow = !isLyricShow"
        >
            <div class="playControl">
                <img
                    src="@/assets/needle-ab.png"
                    class="control"
                    :class="{ active: paused }"
                />
                <img src="@/assets/disc.png" class="play" />
                <img :src="playdetail.al.picUrl" class="songImg" />
            </div>
        </div>
        <div
            class="lyric"
            v-show="isLyricShow"
            @click="isLyricShow = !isLyricShow"
        >
            <!-- <p v-for="(item, i) in $store.state.lyric.split(/\n/gis)" :key="i">
                {{ item }}
            </p> -->
        </div>
        <div class="bottom">
            <div class="btnList">
                <span class="iconfont icon-shoucang"></span>
                <span class="iconfont icon-iconset0425"></span>
                <span class="iconfont icon-changpian"></span>
                <span class="iconfont icon-58pinglun"></span>
                <span class="iconfont icon-gengduo"></span>
            </div>
        </div>
        <div class="playFooter">
            <span class="iconfont icon-suijibofang"></span>
            <span class="iconfont icon-shangyiqu"></span>
            <span
                v-if="paused"
                class="iconfont icon-bofang playandstop"
                @click="play"
            ></span>
            <span
                v-else
                class="iconfont icon-icon_bofang playandstop"
                @click="play"
            ></span>
            <span class="iconfont icon-xiayiqu"></span>
            <span class="iconfont icon-bofangliebiao"></span>
        </div>
    </div>
</template>

<script>
export default {
    name: "PlayPage",
    components: {},
    props: ["playdetail", "paused", "play"],
    data() {
        return {
            isLyricShow: false,
        };
    },
};
</script>

<style scoped lang='scss'>
.playPage {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #fff;
    .bg {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: -1;
        filter: blur(70px);
        background-position: center;
    }
    .top {
        display: flex;
        width: 100%;
        padding: 0.2rem;
        color: #fff;
        justify-content: space-between;
        align-items: center;
        .center {
            display: flex;
            text-align: center;
            flex-direction: column;
            .title {
                font-size: 0.32rem;
            }
            .author {
                color: rgb(117, 115, 115);
            }
        }
        .iconfont {
            font-size: 0.48rem;
        }
    }
    .content {
        width: 100%;
        height: 7.5rem;
        text-align: center;
        .playControl {
            .control {
                position: absolute;
                left: 46%;
                width: 23%;
                transform-origin: 0.18rem 0;
                z-index: 1;
                transition: all 1s;
            }
            .control.active {
                transform: rotate(-27deg);
            }
            .play {
                position: absolute;
                top: 2.4rem;
                left: 50%;
                transform: translateX(-50%);
                width: 75%;
                border-radius: 50%;
            }
            .songImg {
                position: absolute;
                top: 3.46rem;
                left: 50%;
                transform: translateX(-50%);
                width: 3.54rem;
                border-radius: 50%;
            }
        }
    }
    .lyric {
        width: 100%;
        height: 7.5rem;
        text-align: center;
    }
    .bottom {
        position: fixed;
        bottom: 1.6rem;
        width: 100%;
        color: #fff;
        .btnList {
            display: flex;
            width: 100%;
            padding: 0 0.5rem;
            justify-content: space-around;
            .iconfont {
                font-size: 0.4rem;
            }
        }
    }
    .playFooter {
        display: flex;
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 1rem;
        padding: 0 0.5rem;
        color: #fff;
        justify-content: space-around;
        align-items: center;
        .iconfont {
            font-size: 0.38rem;
        }
        .playandstop {
            font-size: 0.8rem;
        }
    }
}
</style>