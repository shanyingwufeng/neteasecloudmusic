<!-- 底部导航和播放控制 -->
<template>
    <div class="bottom">
        <div class="play-control" v-if="$route.meta.playControllerShow">
            <div class="left" @click="playPageShow">
                <img
                    class="song-img"
                    :src="
                        playlist[playCurrentIndex].al.picUrl
                            ? playlist[playCurrentIndex].al.picUrl
                            : 'https://www.mi.com/favicon.ico'
                    "
                />
                <span class="title">
                    {{
                        playlist[playCurrentIndex].name
                            ? playlist[playCurrentIndex].name
                            : "网易云音乐"
                    }}
                </span>
            </div>
            <div class="right">
                <span
                    v-if="paused"
                    class="iconfont icon-bofang play"
                    @click="play"
                ></span>
                <span
                    v-else
                    class="iconfont icon-zantingtingzhi21 play"
                    @click="play"
                ></span>
                <span class="iconfont icon-bofangliebiao more"></span>
            </div>
            <play-page
                v-show="isPlayPageShow"
                :playdetail="playlist[playCurrentIndex]"
                @back="back()"
                :paused="paused"
                :play="play"
                ref="playpage"
            ></play-page>
            <audio
                v-if="playlist[playCurrentIndex].id"
                ref="audio"
                :src="`https://music.163.com/song/media/outer/url?id=${playlist[playCurrentIndex].id}.mp3`"
            ></audio>
        </div>
        <div class="tab-bar" v-if="footerTabBarShow">
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
import { toRefs, computed, reactive } from "vue";
import { mapState } from "vuex";
import $store from "@/store/index.js";
import PlayPage from "@/components/PlayPage.vue";

export default {
    name: "Bottom",
    components: { PlayPage },
    setup() {
        const state = reactive({
            tabBarData: [
                { className: "icon-yemian-copy-copy-copy-copy", title: "发现", path: "/" },
                { className: "icon-a-ziyuan8", title: "播客", path: "/boke" },
                { className: "icon-wode-copy", title: "我的", path: "/me" },
                { className: "icon-Kgeriji", title: "k歌", path: "/k" },
                { className: "icon-pengyou", title: "云村", path: "/friends" },
            ],
        });
        return {
            ...toRefs(state),
            footerTabBarShow: computed(() => $store.state.footerTabBarShow),
        };
    },
    data() {
        return {
            paused: true,
            isPlayPageShow: false,
        };
    },
    computed: {
        ...mapState(["playlist", "playCurrentIndex", "playControlPosition", "bottomShow"]),
    },
    methods: {
        play() {
            if (this.$refs.audio.paused) {
                this.paused = false;
                this.$refs.audio.play();
                this.$refs.playpage.isPaused = false;
                this.$refs.playpage.isPlay = true;
            } else {
                this.paused = true;
                this.$refs.audio.pause();
                this.$refs.playpage.isPaused = true;
            }
        },
        playPageShow() {
            this.isPlayPageShow = !this.isPlayPageShow;
            $store.commit("hiddenFooterTabBar");
        },
        back() {
            this.isPlayPageShow = !this.isPlayPageShow;
            $store.commit("showFooterTabBar");
        },
    },
};
</script>

<style scoped lang='scss'>
.bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    z-index: 1000;
    .play-control {
        position: relative;
        padding: 8px 10px;
        background-color: #fff;
        border-top: 1px solid rgba(77, 32, 32, 0.2);
        .left {
            display: flex;
            align-items: center;
            width: 70%;
            .song-img {
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
            .iconfont {
                font-size: 24px;
            }
            .more {
                margin-left: 14px;
            }
        }
    }
    .tab-bar {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 6px 0 4px 0;
        background-color: #fff;
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
