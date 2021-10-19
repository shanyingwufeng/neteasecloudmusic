<!-- 个人中心 -->
<template>
    <div class="me" :style="{ paddingBottom: playSong.id ? '130px' : '80px' }">
        <!-- 顶部 -->
        <TopBar>
            <template v-slot:left>
                <div class="left">
                    <LeftMenuBtn />
                </div>
            </template>
            <template v-slot:right>
                <router-link
                    class="right"
                    :to="{ name: 'SearchPage', params: { path: urlPath } }"
                >
                    <span class="iconfont icon-sousuo"></span>
                </router-link>
            </template>
        </TopBar>
        <!-- 立即登录 -->
        <div class="logo">
            <router-link class="user" to="/login">
                <span class="iconfont icon-user" v-if="!user.picUrl"></span>
                <img :src="user.picUrl" class="img" v-if="user.picUrl" />
                <span class="username">{{
                    user.nickName ? user.nickName : "立即登录"
                }}</span>
                <span class="iconfont icon-youjiantou"></span>
            </router-link>
        </div>
        <!-- 中间导航 -->
        <CenterNav />
        <!-- 我喜欢的音乐 -->
        <MyLoveMusic :data="playlist[0]" />
        <!-- 创建和收藏歌单 -->
        <div class="createAndCollectPlayList">
            <div class="title">
                <span
                    class="create item"
                    :class="{ redLine: create }"
                    @click="createClick()"
                    >创建歌单</span
                >
                <span
                    class="collect item"
                    :class="{ redLine: collect }"
                    @click="collectClick()"
                    >收藏歌单</span
                >
            </div>
        </div>
        <!-- 创建歌单 -->
        <CreatePlayList :list="playlist" />
        <!-- 收藏 -->
        <CollectPlayList />
        <!-- 为你推荐 -->
        <RecommendForYou />
    </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import LeftMenuBtn from "@/components/LeftMenuBtn.vue";
import CenterNav from "@/views/profile/CenterNav.vue";
import MyLoveMusic from "@/views/profile/MyLoveMusic.vue";
import CreatePlayList from "@/views/profile/CreatePlayList.vue";
import CollectPlayList from "@/views/profile/CollectPlayList.vue";
import RecommendForYou from "@/views/profile/RecommendForYou.vue";
import { computed, onMounted, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { getUserPlayList } from "@/api/user/index.js";

export default {
    name: "Me",
    components: {
        TopBar,
        LeftMenuBtn,
        CenterNav,
        MyLoveMusic,
        CreatePlayList,
        CollectPlayList,
        RecommendForYou,
    },
    setup() {
        const state = reactive({
            create: true,
            collect: false,
            playlist: [],
            urlPath: "",
        });

        const createClick = () => {
            state.create = true;
            state.collect = false;
        };

        const collectClick = () => {
            state.create = false;
            state.collect = true;
        };

        const store = useStore();
        const route = useRoute();
        state.urlPath = route.path;

        onMounted(() => {
            store.commit("bottom/setVisible", true);
            if (localStorage.getItem("cookie")) {
                store.commit(
                    "user/setUser",
                    JSON.parse(localStorage.getItem("userLoginInfo"))
                );
                getUserPlayList(store.state.user.user.id).then((res) => {
                    state.playlist = res.data.playlist;
                });
            }
        });

        return {
            ...toRefs(state),
            createClick,
            collectClick,
            playSong: computed(() => store.state.play.playSong),
            user: computed(() => store.state.user.user),
        };
    },
};
</script>

<style lang='scss'>
.me {
    padding: $padding;
    background-color: #f5f5f5;
    .topBar {
        background: $color-background;
        .left {
            .leftMenuBtn {
                .menuIcon {
                    font-size: $font-size-medium;
                }
            }
        }
        .right {
            .iconfont {
                font-size: $font-size-medium;
            }
        }
    }

    .logo {
        margin-top: 50px;
        margin-bottom: 16px;
        padding: 0 10px;
        .user {
            display: flex;
            align-items: center;
            .icon-user {
                margin-right: 10px;
                color: rgb(243, 54, 54);
                font-size: 36px;
            }
            .img {
                margin-right: 12px;
                width: 44px;
                height: 44px;
                border-radius: 50%;
            }
            .username {
                margin-right: 2px;
                font-size: 16px;
            }
            .icon-youjiantou {
                font-size: 12px;
            }
        }
    }

    .createAndCollectPlayList {
        padding-top: 26px;
        .title {
            position: relative;
            display: flex;
            align-items: center;
            .item {
                position: relative;
                flex: 1;
                font-size: 14px;
                text-align: center;
                &.redLine {
                    font-weight: 700;
                }
                &.redLine::before {
                    content: "";
                    position: absolute;
                    bottom: -6px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 60px;
                    height: 4px;
                    background: linear-gradient(
                        to right,
                        #ea4e46,
                        #ec6862,
                        #ee7d78
                    );
                    border-radius: 10px;
                }
            }
            &::before {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translateX(-50%) translateY(-50%);
                width: 1px;
                height: 10px;
                background-color: rgb(161, 161, 161);
            }
        }
    }
}
</style>
