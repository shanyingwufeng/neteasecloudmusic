<!-- 个人中心-创建歌单 -->
<template>
    <div class="createPlayList">
        <div class="createPlayListTopBar">
            <div class="left">
                <span>创建歌单</span>
                <span v-if="list.length">({{ list.length - 1 }}个)</span>
            </div>
            <div class="right">
                <span class="iconfont icon-jia"></span>
                <span class="iconfont icon-more"></span>
            </div>
        </div>
        <div class="content">
            <div class="list" v-for="(item, id) in list" :key="id">
                <div class="item" v-if="!(id === 0)">
                    <router-link
                        class="left"
                        :to="{
                            path: '/playlist',
                            query: { id: item.id },
                        }"
                    >
                        <img :src="item.coverImgUrl" />
                        <div class="title">
                            <span class="name">{{ item.name }}</span>
                            <span class="trackCount"
                                >{{ item.trackCount }}首</span
                            >
                        </div>
                    </router-link>
                    <div class="right">
                        <span
                            class="iconfont icon-more"
                            @click.stop="showPopup"
                        >
                        </span>
                        <van-popup
                            v-model:show="show"
                            round
                            position="bottom"
                            :style="{ height: '30%' }"
                        >
                            <div class="top">
                                <span>歌单：{{ item.name }}</span>
                            </div>
                            <div class="options">
                                <div class="options-item">
                                    <span class="iconfont icon-xiazai2"></span>
                                    <span class="name">下载</span>
                                </div>
                                <div class="options-item">
                                    <span class="iconfont icon-fenxiang"></span>
                                    <span class="name">分享</span>
                                </div>
                                <div class="options-item">
                                    <span class="iconfont icon-bianji"></span>
                                    <span class="name">编辑歌单信息</span>
                                </div>
                                <div class="options-item">
                                    <span class="iconfont icon-shanchu"></span>
                                    <span class="name">删除</span>
                                </div>
                            </div>
                        </van-popup>
                    </div>
                </div>
            </div>
            <div class="import">
                <div class="left">
                    <span class="iconfont icon-daoru"></span>
                </div>
                <span class="right">一键导入外部音乐</span>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
    name: "CreatePlayList",
    components: {},
    props: ["list"],
    setup() {
        const state = reactive({
            show: false,
        });

        const showPopup = () => {
            state.show = true;
        };

        return { ...toRefs(state), showPopup };
    },
};
</script>

<style lang='scss'>
.createPlayList {
    margin-top: 20px;
    padding: $padding;
    background-color: $color-white-background;
    border-radius: 10px;
    .createPlayListTopBar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        .left {
            color: grey;
            font-size: 12px;
        }
        .right {
            .iconfont {
                margin-left: 16px;
                color: grey;
                font-size: 18px;
            }
        }
    }
    .content {
        display: flex;
        flex-direction: column;
        .list {
            margin-bottom: 8px;
            .item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left {
                    display: flex;
                    align-items: center;
                    padding-right: 30px;
                    img {
                        display: block;
                        width: 50px;
                        height: 50px;
                        margin-right: 10px;
                        border-radius: 6px;
                    }
                    .title {
                        display: flex;
                        flex-direction: column;
                        .name {
                            @include ellipsis1();
                            margin-bottom: 4px;
                            font-size: 14px;
                        }
                        .trackCount {
                            color: grey;
                        }
                    }
                }
                .right {
                    .iconfont {
                        color: grey;
                        font-size: 18px;
                    }
                }
                .van-overlay {
                    background-color: rgba(46, 46, 46, 0.3);
                }
                .van-popup {
                    .top {
                        display: flex;
                        align-items: center;
                        height: 20%;
                        padding: 0 $padding;
                        border-bottom: 1px solid
                            rgba($color: #999999, $alpha: 0.2);
                        color: #555;
                        font-size: 14px;
                    }
                    .options {
                        display: flex;
                        flex-direction: column;
                        height: 80%;
                        padding: 0 18px;
                        .options-item {
                            flex: 1;
                            display: flex;
                            align-items: center;
                            .iconfont {
                                margin-right: 18px;
                                font-size: 18px;
                            }
                            .name {
                                font-size: 14px;
                            }
                        }
                    }
                }
            }
        }
        .import {
            display: flex;
            align-items: center;
            .left {
                width: 50px;
                height: 50px;
                line-height: 50px;
                margin-right: 10px;
                background-color: rgb(236, 236, 236);
                border-radius: 6px;
                text-align: center;
                .iconfont {
                    font-size: 24px;
                }
            }
            .right {
                font-size: 14px;
            }
        }
    }
}
</style>
