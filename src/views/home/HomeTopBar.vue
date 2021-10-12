<!-- 首页-顶部栏 -->
<template>
    <div class="homeTopBar" :class="{ scroll: scroll }">
        <div class="left">
            <span
                @click="showSideBar"
                class="iconfont icon-icon-"
                :class="{ scroll: scroll }"
            >
            </span>
            <van-popup
                v-model:show="sideBarShow"
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
        <router-link
            class="center"
            :class="{ scroll: scroll }"
            :to="{ name: 'SearchPage', params: { path: urlPath } }"
        >
            <span class="iconfont icon-sousuo1"></span>
            <!-- 搜索热词-关键词 -->
            <div class="searchKeyword">
                <van-swipe
                    vertical
                    :autoplay="5000"
                    :duration="1000"
                    :show-indicators="false"
                >
                    <van-swipe-item v-for="item in searchKeyword" :key="item">
                        <span class="text">{{ item.first }}</span>
                    </van-swipe-item>
                </van-swipe>
            </div>
        </router-link>
        <div class="right">
            <span class="iconfont icon-changge"></span>
        </div>
    </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import { getSearchHot } from "@/api/search/index";
import { reactive, onMounted, onActivated, toRefs } from "vue";
import { useRoute } from "vue-router";

export default {
    name: "HomeTopBar",
    components: { SideBar },
    setup() {
        const state = reactive({
            scroll: false,
            searchKeyword: [],
            sideBarShow: false,
            urlPath: "",
        });

        const route = useRoute();
        state.urlPath = route.path;

        const showSideBar = () => {
            state.sideBarShow = true;
        };

        const windowScroll = () => {
            // 滚动条距离页面顶部的距离
            let scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            if (scrollTop !== 0) {
                state.scroll = true;
            } else {
                state.scroll = false;
            }
        };

        onMounted(() => {
            window.addEventListener("scroll", windowScroll);
        });

        onActivated(() => {
            getSearchHot()
                .then((res) => {
                    state.searchKeyword = res.data.result.hots;
                })
                .catch(() => {
                    state.searchKeyword = [];
                });
        });

        return { ...toRefs(state), showSideBar };
    },
};
</script>

<style scoped lang='scss'>
.homeTopBar {
    position: fixed;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 58px;
    padding: $padding;
    background-color: #f0f0f0;
    z-index: 999;
    &.scroll {
        padding-bottom: 8px;
        background-color: $color-white-background;
    }

    .left {
        .icon-icon- {
            font-size: $font-size-medium;
        }
    }

    .center {
        display: flex;
        align-items: center;
        width: 82%;
        height: 30px;
        padding: 0 14px;
        background-color: $color-white-background;
        border-radius: 14px;
        &.scroll {
            background-color: rgba(235, 235, 235, 0.5);
        }
        .icon-sousuo1 {
            display: flex;
            margin-right: 6px;
            color: #333;
            font-size: 16px;
        }
        .searchKeyword {
            overflow: hidden;
            height: 30px;
            line-height: 30px;
            .van-swipe {
                height: 40px;
                .text {
                    color: rgb(145, 145, 145);
                    font-size: 14px;
                }
            }
        }
    }

    .right {
        .iconfont {
            font-size: $font-size-medium;
        }
    }
}
</style>
