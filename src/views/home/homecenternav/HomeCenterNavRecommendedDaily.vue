<!-- 每日推荐 -->
<template>
    <div
        class="recommendedDaily"
        :style="{ paddingBottom: playSong.id ? '40px' : '12px' }"
    >
        <div class="top">
            <span
                class="iconfont icon-jiantou-xia back"
                @click="$router.go(-1)"
            ></span>
            <div class="date">
                <span class="day">{{ day }}</span>
                <span class="slash">/</span>
                <span class="month">{{ month }}</span>
            </div>
            <div class="historyRecommend">
                <div class="left">
                    <span>历史日推</span>
                    <span class="iconfont icon-VIP"></span>
                </div>
                <div class="right">
                    <span>查看今日运势</span>
                    <span class="iconfont icon-gengduo1"></span>
                </div>
            </div>
        </div>
        <Loading v-if="loading" />
        <div class="detail" v-if="!loading">
            <div class="titleBar">
                <div class="left">
                    <span class="iconfont icon-24gf-playCircle"></span>
                    <span class="title">播放全部</span>
                </div>
                <div class="right">
                    <span class="iconfont icon-xiazai"></span>
                </div>
            </div>
            <div class="list">
                <router-link
                    class="item"
                    v-for="(item, index) in list"
                    :key="index"
                    :to="{
                        path: '/playpage',
                        query: { id: item.id },
                    }"
                >
                    <div class="left">
                        <div class="img">
                            <img v-lazy="item.al.picUrl" />
                        </div>
                        <div class="content">
                            <div class="title">
                                <span>{{ item.name }}</span>
                                <span
                                    v-if="item.alia.length !== 0"
                                    style="color: rgb(156, 156, 156)"
                                    >（{{ item.alia[0] }}）</span
                                >
                            </div>
                            <div class="bottom">
                                <div v-if="item.fee == 1">
                                    <span class="iconfont icon-vip3 vip"></span>
                                    <span
                                        class="iconfont icon-wusunyinzhi sq"
                                    ></span>
                                </div>
                                <div v-if="item.fee == 8">
                                    <span
                                        class="iconfont icon-wusunyinzhi sq"
                                    ></span>
                                </div>
                                <div class="authorAndAl">
                                    <span>{{ item.ar[0].name }}</span>
                                    <span
                                        >-{{
                                            item.al.name
                                                ? item.al.name
                                                : item.name
                                        }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <span class="iconfont icon-bofang"></span>
                        <span class="iconfont icon-gengduo"></span>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import { computed, onMounted, reactive, toRefs } from "vue";
import { getTopListDetail } from "@/api/playlist/index.js";
import { getPlayListDetail } from "@/api/playlist/index.js";
import { useStore } from "vuex";

export default {
    name: "RecommendedDaily",
    components: { Loading },
    setup() {
        const state = reactive({
            list: "",
            cover: "",
            day: 0,
            month: 0,
        });

        const store = useStore();

        onMounted(async () => {
            const date = new Date();
            state.day = ("0" + date.getDate().toString()).slice(-2);
            state.month = ("0" + (date.getMonth() + 1).toString()).slice(-2);
            store.commit("setLoading", true);
            await getTopListDetail().then(async (res) => {
                let newArray = [];
                for (let i in res.data.list) {
                    if (res.data.list[i].name === "热歌榜") {
                        newArray = res.data.list[i];
                    }
                }
                await getPlayListDetail(newArray.id).then((res) => {
                    state.list = res.data.playlist.tracks.slice(0, 20);
                    state.cover = state.list[0].al.picUrl;
                });
                store.commit("setLoading", false);
            });
        });

        return {
            ...toRefs(state),
            loading: computed(() => store.state.loading),
            playSong: computed(() => store.state.play.playSong),
        };
    },
};
</script>

<style scoped lang='scss'>
.recommendedDaily {
    overflow: scroll;
    padding-bottom: 60px;
    .top {
        position: relative;
        width: 100%;
        height: 240px;
        padding: $padding;
        z-index: 2;
        &::after {
            content: "";
            position: absolute;
            left: -40%;
            top: 0;
            width: 180%;
            height: 240px;
            background: rgb(255, 62, 28);
            // background: rgb(255, 115, 0);
            border-radius: 0 0 50% 50%;
            z-index: -1;
        }
        .back {
            color: #fff;
            font-size: 24px;
        }
        .date {
            display: flex;
            align-items: flex-start;
            position: absolute;
            right: 20px;
            bottom: 60px;
            color: #fff;
            font-weight: 700;
            .day {
                font-size: 50px;
            }
            .slash {
                margin: 18px 4px 0 4px;
                font-size: 12px;
            }
            .month {
                margin-top: 12px;
                font-size: 20px;
            }
        }
        .historyRecommend {
            position: absolute;
            bottom: 26px;
            left: 0;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            color: #fff;
            font-size: 14px;
            .left {
                display: flex;
                align-items: center;
                .iconfont {
                    display: flex;
                    margin-left: 2px;
                    color: black;
                    font-size: 24px;
                }
            }
            .right {
                display: flex;
                align-items: center;
            }
        }
    }
    // .top {
    //     width: 100%;
    //     height: 200px;
    //     padding: $padding;
    //     background-size: 100% 100%;
    //     background-repeat: no-repeat;
    //     background-position: center;
    //     .back {
    //         color: #fff;
    //         font-size: 24px;
    //     }
    // }
    .loading {
        margin: 40px;
    }
    .detail {
        padding: $padding;
        .titleBar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left {
                display: flex;
                align-items: center;
                font-size: 16px;
                .iconfont {
                    margin-right: 14px;
                    color: red;
                    font-size: 24px;
                }
                .title {
                    font-weight: 700;
                }
            }
            .right {
                .iconfont {
                    font-size: 20px;
                }
            }
        }
        .list {
            .item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 14px;
                padding: 4px 0;
                color: grey;
                .left {
                    display: flex;
                    align-items: center;
                    .img {
                        margin-right: 10px;
                        img {
                            display: block;
                            width: 50px;
                            height: 50px;
                            border-radius: 10px;
                        }
                    }
                    .content {
                        padding-right: 20px;
                        color: #333;
                        font-size: 14px;
                        .title {
                            @include ellipsis1();
                            margin-bottom: 4px;
                        }
                        .bottom {
                            display: flex;
                            align-items: center;
                            color: #999;
                            font-size: 10px;
                            .vip {
                                background-color: #333;
                                margin-right: 4px;
                                color: rgb(255, 187, 0);
                                font-size: 16px;
                            }
                            .sq {
                                margin-right: 4px;
                                color: red;
                                font-size: 20px;
                            }
                            .authorAndAl {
                                @include ellipsis1();
                            }
                        }
                    }
                }
                .right {
                    display: flex;
                    align-items: center;
                    .iconfont {
                        margin-left: 16px;
                        color: rgb(179, 179, 179);
                        font-size: 20px;
                    }
                }
            }
        }
    }
}
</style>