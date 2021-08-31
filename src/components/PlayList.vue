<!-- 歌单播放列表 -->
<template>
    <div class="playList">
        <div class="top" v-show="playlist.length !== 0">
            <div class="top-left">
                <span class="iconfont icon-bofang"></span>
                <span class="playAll">播放全部</span>
                <span class="playListCount"
                    >(共{{ playlist.trackIds.length }}首)</span
                >
            </div>
            <div class="top-right">
                <span class="iconfont icon-jia"></span>
                <span>收藏 ({{ playlist.subscribedCount }})</span>
            </div>
        </div>
        <div class="detail">
            <div class="item" v-for="(item, i) in tracks" :key="i">
                <div class="left">
                    <div class="id">{{ i + 1 }}</div>
                    <div class="content">
                        <div class="title">{{ item.name }}</div>
                        <div class="bottom">
                            <span class="author">
                                <span>{{ item.ar[0].name }} - </span>
                            </span>
                            <span>{{
                                item.alia[0] ? item.alia[0] : item.name
                            }}</span>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <span
                        class="iconfont icon-bofang"
                        @click="setPlayCurrentIndex(i)"
                    ></span>
                    <span class="iconfont icon-gengduo"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    name: "PlayList",
    components: {},
    props: ["playlist", "tracks"],
    setup() {
        const changeValue = (num) => {
            let res = 0;
            if (num > 100000000) {
                res = num / 100000000;
                res = res.toFixed(2) + "亿";
            } else if (num > 10000) {
                res = num / 10000;
                res = res.toFixed(2) + "万";
            }
            return res;
        };
        return { changeValue, ...mapMutations(["setPlayCurrentIndex"]) };
    },
};
</script>

<style scoped lang='scss'>
.playList {
    margin-bottom: 40px;
    padding: 10px;
    background-color: #fff;
    border-radius: 12px;
    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4px 0;
        .top-left {
            display: flex;
            align-items: center;
            .iconfont {
                margin-right: 14px;
                font-size: 18px;
            }
            .playAll {
                font-size: 16px;
                font-weight: 700;
            }
            .playListCount {
                color: grey;
                font-size: 12px;
            }
        }
        .top-right {
            padding: 4px;
            background-color: red;
            border-radius: 12px;
            color: #fff;
            font-size: 12px;
        }
    }
    .detail {
        margin-bottom: 50px;
        .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 10px;
            padding: 4px 0;
            color: grey;
            .left {
                display: flex;
                align-items: center;
                .id {
                    width: 14px;
                    margin-right: 18px;
                    color: grey;
                    font-size: 20px;
                }
                .content {
                    color: #333;
                    font-size: 14px;
                    .bottom {
                        color: #999;
                        font-size: 12px;
                    }
                }
            }
            .right {
                display: flex;
                .iconfont {
                    margin-left: 6px;
                    font-size: 18px;
                }
            }
        }
    }
}
</style>
