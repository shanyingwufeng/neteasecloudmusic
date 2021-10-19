<!-- 首页-顶部栏 -->
<template>
    <div class="homeTopBar">
        <TopBar :class="{ scroll: scroll }">
            <template v-slot:left>
                <div class="left">
                    <LeftMenuBtn />
                </div>
            </template>
            <template v-slot:center>
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
                            <van-swipe-item
                                v-for="item in searchKeyword"
                                :key="item"
                            >
                                <span class="text">{{ item.first }}</span>
                            </van-swipe-item>
                        </van-swipe>
                    </div>
                </router-link>
            </template>
            <template v-slot:right>
                <div class="right">
                    <span class="iconfont icon-tinggeshiqu40x40"></span>
                </div>
            </template>
        </TopBar>
    </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import LeftMenuBtn from "@/components/LeftMenuBtn.vue";
import { reactive, onActivated, toRefs, onDeactivated } from "vue";
import { useRoute } from "vue-router";
import { getSearchHot } from "@/api/search/index";

export default {
    name: "HomeTopBar",
    components: { TopBar, LeftMenuBtn },
    setup() {
        const state = reactive({
            scroll: false,
            searchKeyword: [],
            urlPath: "",
        });

        const route = useRoute();
        state.urlPath = route.path;

        onActivated(() => {
            window.addEventListener("scroll", windowScroll);
            getSearchHot()
                .then((res) => {
                    state.searchKeyword = res.data.result.hots;
                })
                .catch(() => {
                    state.searchKeyword = [];
                });
        });

        onDeactivated(() => {
            window.removeEventListener("scroll", windowScroll);
        });

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

        return { ...toRefs(state) };
    },
};
</script>

<style lang='scss'>
.homeTopBar {
    height: 60px;
    .topBar {
        background-color: #E3E6EB;
        transition: all 0.3s ease-out;
        &.scroll {
            background-color: #fff;
        }
        .left {
            .leftMenuBtn {
                .menuIcon {
                    font-size: $font-size-medium;
                }
            }
        }
        .center {
            display: flex;
            align-items: center;
            width: 82%;
            height: 30px;
            padding: 0 14px;
            background-color: #fff;
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
}
</style>
