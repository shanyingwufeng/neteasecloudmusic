<!-- 搜索结果 -->
<template>
    <div class="searchResult">
        <div class="songList">
            <TitleBar titleBarName="单曲" />
            <div class="list">
                <router-link
                    class="item"
                    v-for="(item, id) in songList"
                    :key="id"
                    :to="{
                        path: '/playpage',
                        query: { id: item.id },
                    }"
                >
                    <div class="left">
                        <div class="title">{{ item.name }}</div>
                        <div class="bottom">
                            <span class="author">
                                {{ item.artists[0].name }}
                            </span>
                        </div>
                    </div>
                    <div class="right">
                        <span class="iconfont icon-bofang"></span>
                        <span class="iconfont icon-gengduo"></span>
                    </div>
                </router-link>
            </div>
            <div class="watchAll">
                <span>查看全部{{ songCount }}首单曲</span>
                <div>
                    <span class="iconfont icon-youjiantou"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TitleBar from "@/components/TitleBar.vue";
import { toRefs, reactive, onMounted } from "vue";

export default {
    name: "SearchResult",
    components: { TitleBar },
    props: ["data"],
    setup(props) {
        const state = reactive({
            songList: [],
            songCount: 0,
        });

        onMounted(() => {
            state.songList = props.data.slice(0, 5);
            state.songCount = props.data.length;
        });

        return { ...toRefs(state) };
    },
};
</script>

<style scoped lang='scss'>
.searchResult {
    margin-top: 14px;
    background-color: #fff;
    border-radius: 10px;
    .list {
        padding: 0 var(--padding);
        .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 0;
            border-top: 1px solid rgba(228, 228, 228, 0.5);
            color: grey;
            .left {
                display: flex;
                flex-direction: column;
                .title {
                    color: #333;
                    font-size: 14px;
                }

                .bottom {
                    color: #999;
                    font-size: 10px;
                }
            }
            .right {
                display: flex;
                .iconfont {
                    margin-left: 14px;
                    font-size: 18px;
                }
            }
        }
    }
    .watchAll {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--padding) 0;
        border-top: 1px solid rgba(228, 228, 228, 0.5);
        color: grey;
        font-size: 14px;
        .iconfont {
            font-size: 10px;
        }
    }
}
</style>