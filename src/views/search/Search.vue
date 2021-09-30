<!-- 搜索界面 -->
<template>
    <div class="search">
        <!-- 顶部输入框 -->
        <div class="searchInput">
            <span class="iconfont icon-jiantou-xia back" @click="back()"></span>
            <input
                ref="searchInput"
                type="text"
                :placeholder="placeholder"
                v-model="searchKeyword"
                @keydown.enter="search(searchKeyword)"
            />
            <span
                class="iconfont icon-cha-copy fork"
                v-if="searchResult"
                @click="fork()"
            ></span>
        </div>

        <!-- 加载动画 -->
        <Loading v-if="loading" />

        <!-- 搜索内容 -->
        <div class="content" v-if="loadingContent">
            <!-- 搜索历史 -->
            <SearchHistory @search="search" />
            <!-- 热搜榜 -->
            <HotSearchList
                :data="detailSearchHot"
                :mvData="detailSearchMvHot"
                @search="search"
            />
            <!-- 音乐专区 -->
            <MusicZone />
            <!-- 推荐活动 -->
            <!-- <RecommendedActivities /> -->
        </div>

        <!-- 搜索结果 -->
        <SearchResult
            :data="searchSongs"
            v-if="searchResult"
            @search="search"
        />
    </div>
</template>

<script>
import SearchTop from "./SearchTop.vue";
import SearchHistory from "./SearchHistory.vue";
import HotSearchList from "./HotSearchList.vue";
import MusicZone from "./MusicZone.vue";
import RecommendedActivities from "./RecommendedActivities.vue";
import SearchResult from "./searchresult/SearchResult.vue";
import Loading from "@/components/Loading.vue";
import { searchByKeyword } from "@/api/search/index.js";
import {
    getSearchDefault,
    getDetailSearchHot,
    getDetailSearchMvHot,
} from "@/api/search/index.js";
import { reactive, toRefs, computed, onActivated, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

export default {
    name: "Search",
    components: {
        SearchTop,
        SearchHistory,
        HotSearchList,
        MusicZone,
        RecommendedActivities,
        SearchResult,
        Loading,
    },

    beforeRouteEnter(to, from, next) {
        if (from.name == "Home") {
            to.meta.isBack = false;
        }
        next();
    },

    setup() {
        const state = reactive({
            searchInput: "", // 绑定搜索框实现聚焦功能
            placeholder: "", // 搜索框默认内容
            searchKeyword: "", // 搜索关键词
            searchHistory: [], // 搜索历史（存储本地）
            searchSongs: "", // 搜索获取的歌曲信息
            songCount: 0, // 搜索获取的歌曲数量
            detailSearchHot: [], // 热搜榜
            detailSearchMvHot: [], // mv榜
        });

        const store = useStore();
        const router = useRouter();
        const route = useRoute();

        // 返回判断
        const back = () => {
            if (store.getters.searchResult) {
                state.searchKeyword = "";
                store.commit("hiddenSearchResult");
                store.commit("showLoadingContent");
            } else {
                router.go(-1);
            }
        };

        // 点击输入框右边叉
        const fork = () => {
            state.searchKeyword = "";
            state.searchInput.focus();
            store.commit("hiddenSearchResult");
            store.commit("showLoadingContent");
        };

        onMounted(async () => {
            store.commit("hiddenLoadingContent");
            store.commit("showLoading");
            store.commit("hiddenSearchResult");
            await getSearchDefault().then((res) => {
                state.searchInput.focus();
                state.placeholder = res.data.data.showKeyword;
            });
            await getDetailSearchHot().then((res) => {
                state.detailSearchHot = res.data.data;
            });
            await getDetailSearchMvHot().then((res) => {
                state.detailSearchMvHot = res.data.data;
                store.commit("hiddenLoading");
                store.commit("showLoadingContent");
            });
        });

        onActivated(async () => {
            if (route.meta.isBack == false) {
                store.commit("hiddenLoadingContent");
                store.commit("showLoading");
                store.commit("hiddenSearchResult");
                await getSearchDefault().then((res) => {
                    state.searchInput.focus();
                    state.placeholder = res.data.data.showKeyword;
                });
                await getDetailSearchHot().then((res) => {
                    state.detailSearchHot = res.data.data;
                    store.commit("hiddenLoading");
                    store.commit("showLoadingContent");
                });
            }
            route.meta.isBack = true;
        });

        // 搜索歌曲
        const search = async (searchWord) => {
            store.commit("showLoading");
            store.commit("hiddenLoadingContent");
            store.commit("hiddenSearchResult");
            state.searchKeyword = searchWord;
            store.commit("setSearchKeyword", searchWord);
            // 通过关键词搜索歌曲
            await searchByKeyword(1018, state.searchKeyword).then(
                async (res) => {
                    // console.log(res.data.result);
                    // state.songCount = res.data.result.songCount;
                    state.searchSongs = res.data.result;
                    store.commit("hiddenLoading");
                    store.commit("showSearchResult");
                }
            );

            if (localStorage.getItem("searchHistory")) {
                state.searchHistory = JSON.parse(
                    localStorage.getItem("searchHistory")
                );

                if (state.searchHistory.includes(searchWord)) {
                    const index = state.searchHistory.indexOf(searchWord);
                    state.searchHistory.splice(index, 1);
                }

                state.searchHistory.reverse();
                state.searchHistory.push(state.searchKeyword);
                state.searchHistory.reverse();
                // state.searchHistory = Array.from(new Set(state.searchHistory));
                localStorage.searchHistory = JSON.stringify(
                    state.searchHistory
                );
            } else {
                state.searchHistory = [];
                state.searchHistory.push(state.searchKeyword);
                localStorage.setItem(
                    "searchHistory",
                    JSON.stringify(state.searchHistory)
                );
            }

            store.commit(
                "setSearchHistory",
                JSON.parse(localStorage.getItem("searchHistory"))
            );
        };

        return {
            ...toRefs(state),
            back,
            fork,
            search,
            loading: computed(() => store.state.loading),
            loadingContent: computed(() => store.state.loadingContent),
            searchResult: computed(() => store.state.searchResult),
        };
    },
};
</script>

<style scoped lang='scss'>
.search {
    overflow: scroll;
    height: 100vh;
    padding: $padding;
    background: $color-background;
    .searchInput {
        position: relative;
        display: flex;
        align-items: center;
        .back {
            margin-right: 12px;
            color: rgb(68, 68, 68);
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
        .fork {
            position: absolute;
            top: 6px;
            right: 6px;
            font-size: 16px;
        }
    }

    .loading {
        margin-top: 40px;
    }
}
</style>
