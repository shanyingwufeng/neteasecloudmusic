<!-- 个人中心 -->
<template>
    <!-- {{ $store.state.user.account.userName }} -->
    <div class="me" :style="{ paddingBottom: pb() }">
        <!-- 顶部 -->
        <div class="topBar">
            <div class="left">
                <van-cell
                    @click="showSideBar"
                    class="iconfont icon-icon-"
                ></van-cell>
                <van-popup
                    v-model:show="isSideBarShow"
                    position="left"
                    :style="{
                        width: '80vw',
                        height: '100%',
                        padding: '12px',
                        background: 'rgb(240, 240, 240)',
                    }"
                >
                    <SideBar />
                </van-popup>
            </div>
            <div class="right">
                <span class="iconfont icon-sousuo"></span>
            </div>
        </div>

        <!-- 立即登录 -->
        <div class="logo">
            <router-link class="user" to="/login">
                <span class="iconfont icon-user"></span>
                <span class="username">{{
                    $store.state.user.nickName
                        ? $store.state.user.nickName
                        : "立即登录"
                }}</span>
                <div>
                    <span class="iconfont icon-youjiantou"></span>
                </div>
            </router-link>
        </div>

        <!-- 中间导航 -->
        <CenterNav />

        <!-- 我喜欢的音乐 -->
        <MyLoveMusic />

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
        <CreatePlayList />

        <!-- 收藏 -->
        <CollectPlayList />

        <!-- 为你推荐 -->
        <RecommendForYou />
    </div>
</template>

<script>
import SideBar from "@/views/home/SideBar.vue";
import CenterNav from "@/views/profile/CenterNav.vue";
import MyLoveMusic from "@/views/profile/MyLoveMusic.vue";
import CreatePlayList from "@/views/profile/CreatePlayList.vue";
import CollectPlayList from "@/views/profile/CollectPlayList.vue";
import RecommendForYou from "@/views/profile/RecommendForYou.vue";
import { reactive, toRefs } from "vue";
import {useStore} from "vuex"

export default {
    name: "Me",
    components: {
        SideBar,
        CenterNav,
        MyLoveMusic,
        CreatePlayList,
        CollectPlayList,
        RecommendForYou,
    },
    setup() {
        const state = reactive({
            isSideBarShow: false,
            create: true,
            collect: false,
        });

        const createClick = () => {
            state.create = true;
            state.collect = false;
        };

        const collectClick = () => {
            state.create = false;
            state.collect = true;
        };

        const showSideBar = () => {
            state.isSideBarShow = true;
        };

        const store = useStore();

        // padding-bottom根据有没有本地存储的音乐而变化
        const pb = () => {
            return store.state.playControl.songName ? "120px" : "80px";
        };

        return {
            ...toRefs(state),
            showSideBar,
            createClick,
            collectClick,
            pb,
        };
    },
};
</script>

<style scoped lang='scss'>
.me {
    overflow: scroll;
    height: 100%;
    padding: 0 var(--padding);
    background-color: #f5f5f5;
    .topBar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 0;
        .left {
            .van-cell {
                padding: 0;
                background-color: #f5f5f5;
                font-size: 20px;
            }
        }
        .right {
            .iconfont {
                font-size: 20px;
            }
        }
    }

    .logo {
        margin-bottom: 16px;
        padding: 0 10px;
        .user {
            display: flex;
            align-items: center;
            .icon-user {
                margin-right: 10px;
                color: rgb(243, 54, 54);
                font-size: 30px;
            }
            .username {
                font-size: 16px;
            }
            .icon-youjiantou {
                font-size: 16px;
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
                    bottom: 0;
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
