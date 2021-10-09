<!-- 个人中心-为你推荐 -->
<template>
    <div class="recommendForYou" v-if="recommendForYouShow">
        <div class="top">
            <span class="left">为你推荐</span>
            <div
                class="right"
                @click="recommendForYouShow = !recommendForYouShow"
            >
                <span class="iconfont icon-cha-copy"></span>
            </div>
        </div>
        <div class="list">
            <router-link
                class="item"
                v-for="(item, index) in list"
                :key="index"
                :to="{
                    path: '/playlist',
                    query: { id: item.id },
                }"
            >
                <img v-lazy="item.coverImgUrl" />
                <span class="title">{{ item.name }}</span>
                <PlayCount :playCount="item.playCount" :point="1" />
            </router-link>
        </div>
        <div class="bottom">
            <span class="more">更多推荐歌单</span>
        </div>
    </div>
</template>

<script>
import { getTopList } from "@/api/playlist/index.js";
import { onMounted, reactive, toRefs } from "vue";
import PlayCount from "@/components/PlayCount.vue";

export default {
    name: "RecommendForYou",
    components: { PlayCount },
    setup() {
        const state = reactive({
            list: [],
            recommendForYouShow: true,
        });

        onMounted(() => {
            getTopList().then(async (res) => {
                state.list = res.data.list.slice(0, 6);
            });
        });

        return { ...toRefs(state) };
    },
};
</script>

<style scoped lang='scss'>
.recommendForYou {
    margin-top: 20px;
    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 14px;
        .left {
            font-size: 18px;
        }
        .right {
            width: 30px;
            height: 30px;
            line-height: 20px;
            padding: 5px;
            background-color: rgb(226, 226, 226);
            border-radius: 50%;
            text-align: center;
            .iconfont {
                font-size: 12px;
            }
        }
    }
    .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        .item {
            position: relative;
            margin-bottom: 20px;
            img {
                display: block;
                width: 108px;
                height: 108px;
                margin-bottom: 2px;
                border-radius: 8px;
            }
        }
    }
    .bottom {
        text-align: center;
        .more {
            padding: 4px 10px;
            border: 1px solid rgba($color: #cacaca, $alpha: 0.7);
            border-radius: 14px;
            color: #333;
            font-size: 12px;
        }
    }
}
</style>