<!-- 搜索-热搜榜 -->
<template>
    <div class="searchHotList">
        <van-tabs v-model:active="active" class="hotSearch" animated swipeable>
            <van-tab title="热搜榜">
                <div class="list">
                    <div
                        class="item"
                        v-for="(item, id) in list"
                        :key="id"
                        @click="search(item.searchWord)"
                    >
                        <div v-if="id < showId" class="content">
                            <span class="id" :class="{ hot: id < 3 }">{{
                                id + 1
                            }}</span>
                            <div class="right">
                                <span class="searchWord">{{
                                    item.searchWord
                                }}</span>
                                <img
                                    class="iconUrl"
                                    v-if="item.iconUrl"
                                    v-lazy="item.iconUrl"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="more" @click="action" v-if="moreShow">
                        <span class="name">展开更多热搜</span>
                        <span class="iconfont icon-jiantou9"></span>
                    </div>
                    <div class="more" @click="action" v-if="!moreShow">
                        <span class="name">隐藏更多热搜</span>
                        <span class="iconfont icon--up"></span>
                    </div>
                </div>
            </van-tab>
            <van-tab title="视频榜">
                <div class="list">
                    <div class="item" v-for="(item, id) in mvList" :key="id">
                        <div v-if="id < showId" class="content">
                            <span class="id" :class="{ hot: id < 3 }">{{
                                id + 1
                            }}</span>
                            <div class="right">
                                <span class="searchWord">{{ item.name }}</span>
                                <img
                                    class="iconUrl"
                                    v-if="item.iconUrl"
                                    v-lazy="item.iconUrl"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="more" @click="action" v-if="moreShow">
                        <span class="name">展开更多热搜</span>
                        <span class="iconfont icon-jiantou9"></span>
                    </div>
                    <div class="more" @click="action" v-if="!moreShow">
                        <span class="name">隐藏更多热搜</span>
                        <span class="iconfont icon--up"></span>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { reactive, toRefs, watch } from "vue";

export default {
    name: "SearchHotList",
    props: ["data", "mvData"],
    setup(props, { emit }) {
        const state = reactive({
            list: [],
            mvList: [],
            showId: 10,
            moreShow: true,
            active: 0,
        });

        const search = (searchWord) => {
            emit("search", searchWord);
        };

        const action = () => {
            if (state.moreShow == true) {
                state.showId = state.list.length;
            } else {
                state.showId = 10;
            }
            state.moreShow = !state.moreShow;
        };

        watch(props, (newProps) => {
            state.list = newProps.data;
            state.mvList = newProps.mvData;
        });

        return { ...toRefs(state), action, search };
    },
};
</script>

<style lang='scss'>
.searchHotList {
    margin-top: 14px;
    .van-tabs {
        .van-tabs__wrap {
            .van-tabs__nav {
                display: flex;
                align-items: center;
                padding-top: 0;
                padding-left: 0;
                background-color: $color-background;
                .van-tab {
                    display: block;
                    flex: 0.2;
                    font-size: 16px;
                }
                .van-tab--active {
                    color: #000;
                    font-weight: 700;
                }
                .van-tabs__line {
                    display: none;
                }
            }
        }
        .van-tabs__content {
            border-radius: 8px;
            .list {
                position: relative;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                padding: $padding;
                padding-top: 10px;
                background-color: $color-white-background;
                border-radius: 8px;
                box-shadow: 2px 2px 10px rgb(236, 236, 236);
                .item {
                    overflow: hidden;
                    flex: 50%;
                    padding-right: 10px;
                    .content {
                        display: flex;
                        align-items: center;
                        flex-wrap: nowrap;
                        width: 100%;
                        padding: 8px 0;
                        .id {
                            width: 18%;
                            color: grey;
                            font-size: 16px;
                            &.hot {
                                color: red;
                            }
                        }
                        .right {
                            display: flex;
                            align-items: center;
                            width: 80%;
                            .searchWord {
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                margin-right: 6px;
                                color: #444;
                                font-size: 16px;
                            }
                            .iconUrl {
                                height: 10px;
                            }
                        }
                    }
                }
                .more {
                    margin-top: 10px;
                    color: grey;
                    text-align: center;
                    .name {
                        font-size: 12px;
                    }
                    .iconfont {
                        margin-left: 4px;
                        font-size: 10px;
                    }
                }
            }
        }
    }
}
</style>
