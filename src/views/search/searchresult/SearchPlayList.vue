<!-- 搜索歌单-->
<template>
    <div class="searchPlayList">
        <TitleBar titleBarName="歌单" />
        <div class="list">
            <router-link
                class="item"
                v-for="(item, id) in list"
                :key="id"
                :to="{
                    path: '/listview',
                    query: { id: item.id },
                }"
            >
                <div class="left">
                    <img v-lazy="item.coverImgUrl" />
                </div>
                <div class="right">
                    <span class="title">{{ item.name }}</span>
                    <div class="bottom">
                        <span class="trackCount">
                            {{ item.trackCount }}首，by
                        </span>
                        <span class="nickname">
                            {{ item.creator.nickname }}，</span
                        >
                        <span class="playCount"
                            >播放{{ changeValue(item.playCount) }}次</span
                        >
                    </div>
                </div>
            </router-link>
        </div>
        <div class="more">
            <span>{{ moreText }}</span>
            <div>
                <span class="iconfont icon-youjiantou"></span>
            </div>
        </div>
    </div>
</template>

<script>
import TitleBar from "@/components/TitleBar.vue";
import { onMounted, reactive, toRefs } from "vue";
import { changeValue } from "@/utils/index.js";

export default {
    name: "SearchSingle",
    components: { TitleBar },
    props: ["data"],
    setup(props) {
        const state = reactive({
            list: [],
            moreText: "",
        });

        onMounted(() => {
            state.list =
                props.data.playLists.length > 5
                    ? props.data.playLists.slice(0, 5)
                    : props.data.playLists;
            state.moreText = props.data.moreText;
        });

        return { ...toRefs(state), changeValue };
    },
};
</script>

<style scoped lang='scss'>
.searchPlayList {
    margin-bottom: 14px;
    background-color: #fff;
    border-radius: 10px;
    .titleBar {
        padding-top: 20px;
        font-size: 16px;
    }
    .list {
        padding: 0 var(--padding);
        .item {
            display: flex;
            align-items: center;
            margin-bottom: 14px;
            .left {
                margin-right: 10px;
                img {
                    display: block;
                    width: 60px;
                    border-radius: 10px;
                }
            }
            .right {
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: 74%;
                .title {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    font-size: 16px;
                }
                .bottom {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    color: grey;
                    font-size: 10px;
                }
            }
        }
    }
    .more {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px 0;
        border-top: 1px solid rgba(228, 228, 228, 0.5);
        color: grey;
        font-size: 12px;
        .iconfont {
            font-size: 14px;
        }
    }
}
</style>