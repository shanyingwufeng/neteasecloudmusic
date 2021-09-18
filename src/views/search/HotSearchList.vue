<!-- 搜索-热搜榜 -->
<template>
    <div class="hotSearchList">
        <div class="topBar">
            <div class="left">
                <span class="hotSearch">热搜榜</span>
                <span class="hotVideo">视频榜</span>
            </div>
            <div class="right">
                <div>
                    <span class="iconfont icon-bofang6"></span>
                </div>
                <span>播放</span>
            </div>
        </div>
        <div class="list">
            <div class="item" v-for="(item, id) in list" :key="id">
                <div v-if="id < showId" class="content">
                    <span class="id" :class="{ hot: id < 3 }">{{
                        id + 1
                    }}</span>
                    <span class="searchWord">{{ item.searchWord }}</span>
                    <img
                        class="iconUrl"
                        v-if="item.iconUrl"
                        v-lazy="item.iconUrl"
                    />
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
    </div>
</template>

<script>
import { onMounted, onUpdated, reactive, toRefs } from "vue";

export default {
    name: "HotSearchList",
    props: ["data"],
    setup(props) {
        const state = reactive({
            list: [],
            showId: 10,
            moreShow: true,
            active: 1,
        });

        const action = () => {
            if (state.moreShow == true) {
                state.showId = state.list.length;
            } else {
                state.showId = 10;
            }
            state.moreShow = !state.moreShow;
        };

        onMounted(() => {
            state.list = props.data;
        });

        onUpdated(() => {
            state.list = props.data;
        });

        return {
            ...toRefs(state),
            action,
        };
    },
};
</script>

<style scoped lang='scss'>
.hotSearchList {
    margin-top: 24px;
    .topBar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        .left {
            color: rgb(152, 152, 152);
            font-size: 14px;
            .hotSearch {
                margin-right: 20px;
                color: black;
            }
        }
        .right {
            display: flex;
            align-items: center;
            padding: 1px 6px;
            border: 1px solid rgba($color: rgb(170, 170, 170), $alpha: 0.7);
            border-radius: 12px;
            font-size: 10px;
            .iconfont {
                margin-right: 2px;
                color: rgb(117, 117, 117);
                font-size: 8px;
            }
        }
    }
    .list {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding: 10px 14px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 2px 2px 10px rgb(236, 236, 236);
        .item {
            overflow: hidden;
            flex: 50%;
            .content {
                display: flex;
                align-items: center;
                padding: 8px 0;
                .id {
                    color: grey;
                    font-size: 16px;
                    &.hot {
                        color: red;
                    }
                }
                .searchWord {
                    color: #444;
                    font-size: 14px;
                    margin: 0 6px 0 10px;
                }
                .iconUrl {
                    height: 12px;
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
</style>