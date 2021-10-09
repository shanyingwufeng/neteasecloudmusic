<!-- 搜索页-顶部 -->
<template>
    <div class="searchTop">
        <div class="searchInput">
            <span class="iconfont icon-jiantou-xia" @click="$router.go(-1)"></span>
            <input
                ref="searchInput"
                type="text"
                :placeholder="placeholder"
                @keydown.enter="search"
                v-model="searchKeyword"
            />
        </div>
        <!-- <div class="playList" v-if="!loading">
            <div class="detail">
                <router-link
                    class="item"
                    v-for="(item, id) in searchSongs"
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
        </div> -->
    </div>
</template>

<script>
import { searchByKeyword } from "@/api/search/index.js";
import { onMounted, onUpdated, reactive, computed, toRefs } from "vue";
import { useStore } from "vuex";

export default {
    name: "SearchTop",

    props: ["data"],

    setup(props) {
        const state = reactive({
            searchInput: "", // 绑定搜索框实现聚焦功能
            placeholder: "", // 搜索框默认内容
            searchKeyword: "", // 搜索关键词
            searchHistory: [], // 搜索历史（存储本地）
            searchSongs: [], // 搜索获取的歌曲信息
            songCount: 0, // 搜索获取的歌曲数量
        });

        const store = useStore();

        // 搜索歌曲
        const search = async () => {
            store.commit("hiddenSearchContent");
            store.commit("setLoading", true);

            const result = await searchByKeyword(state.searchKeyword);
            console.log(result);
            state.songCount = result.data.result.songCount;
            state.searchSongs = result.data.result.songs;

            if (localStorage.getItem("searchHistory")) {
                state.searchHistory = JSON.parse(
                    localStorage.getItem("searchHistory")
                );
                state.searchHistory.push(state.searchKeyword);
                state.searchHistory = Array.from(new Set(state.searchHistory));
                localStorage.searchHistory = JSON.stringify(
                    state.searchHistory
                );
                store.commit("setLoading", false);
            } else {
                state.searchHistory.push(state.searchKeyword);
                localStorage.setItem(
                    "searchHistory",
                    JSON.stringify(state.searchHistory)
                );
                store.commit("setLoading", false);
            }

            store.commit(
                "setSearchHistory",
                JSON.parse(localStorage.getItem("searchHistory"))
            );
        };

        // 通过搜索历史进行查询
        const historySearch = (keyword) => {
            this.searchKeyword = keyword;
            this.saveKeyWord();
        };

        onMounted(() => {
            state.searchInput.focus();
            state.placeholder = props.data;
        });

        onUpdated(() => {
            state.searchInput.focus();
            state.placeholder = props.data;
        });

        return {
            ...toRefs(state),
            search,
            loading: computed(() => store.state.loading),
        };
    },
};
</script>

<style scoped lang='scss'>
.searchTop {
    .searchInput {
        display: flex;
        align-items: center;
        .iconfont {
            margin-right: 12px;
            color: rgb(104, 104, 104);
            font-size: 22px;
        }
        input {
            width: 100%;
            margin-top: 5px;
            padding-bottom: 4px;
            background-color: $color-background;
            border: 0;
            border-bottom: 1px solid rgba(161, 161, 161, 0.6);
            font-size: 16px;
            outline: none;
            caret-color: red;
        }
    }
    .playList {
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
        }
        .detail {
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
}
</style>
