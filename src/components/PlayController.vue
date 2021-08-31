<!-- 播放控件 -->
<template>
    <div class="playController" v-if="$route.meta.playControllerShow">
        <div class="left" @click="isPlayPageShow = !isPlayPageShow">
            <img
                :src="
                    playlist[playCurrentIndex].al.picUrl
                        ? playlist[playCurrentIndex].al.picUrl
                        : 'https://www.mi.com/favicon.ico'
                "
            />
            <div class="content">
                <span class="title">
                    {{
                        playlist[playCurrentIndex].name
                            ? playlist[playCurrentIndex].name
                            : "网易云音乐"
                    }}
                </span>
                <span class="desc">横划可以切换上下首哦</span>
            </div>
        </div>
        <div class="right">
            <span
                class="iconfont icon-bofang play"
                @click="play"
                v-if="paused"
            ></span>
            <span
                v-else
                class="iconfont icon-icon_bofang play"
                @click="play"
            ></span>
            <span class="iconfont icon-bofangliebiao"></span>
        </div>
        <play-page
            v-show="isPlayPageShow"
            :playdetail="playlist[playCurrentIndex]"
            @back="isPlayPageShow = !isPlayPageShow"
            :paused="paused"
            :play="play"
        ></play-page>
        <audio
            ref="audio"
            :src="`https://music.163.com/song/media/outer/url?id=${playlist[playCurrentIndex].id}.mp3`"
        ></audio>
    </div>
</template>

<script>
import { mapState } from "vuex";
import PlayPage from "@/components/PlayPage.vue";
export default {
    name: "PlayController",
    components: {
        PlayPage,
    },
    data() {
        return {
            paused: true,
            isPlayPageShow: false,
        };
    },
    computed: {
        ...mapState(["playlist", "playCurrentIndex"]),
    },
    methods: {
        play() {
            if (this.$refs.audio.paused) {
                this.paused = false;
                this.$refs.audio.play();
            } else {
                this.paused = true;
                this.$refs.audio.pause();
            }
        },
    },
};
</script>

<style scoped lang='scss'>
.playController {
    display: flex;
    position: fixed;
    bottom: 50px;
    left: 0;
    width: 100%;
    padding: 2px 10px;
    background-color: #fff;
    border-top: 1px solid rgba(204, 203, 203, 0.3);
    justify-content: space-between;
    align-items: center;
    z-index: 1000;
    .left {
        display: flex;
        height: 1rem;
        align-items: center;
        img {
            width: 30px;
            height: 30px;
            margin-right: 4px;
            border-radius: 50%;
        }
        .content {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .title {
                font-size: 0.24rem;
            }
            .desc {
                color: #999;
                font-size: 0.05rem;
            }
        }
    }
    .right {
        display: flex;
        .iconfont {
            margin-left: 10px;
            font-size: 22px;
        }
    }
}
</style>