<!-- 搜索界面 -->
<template>
    <div class="searchPage">
        <!-- 输入框 -->
        <SearchInput @search="search" @suggest="suggest" />
        <!-- 加载动画 -->
        <Loading v-if="loading" />
        <!-- 搜索页面内容区 -->
        <div class="content" v-show="!loading">
            <div class="defaultSearchPage" v-show="searchKeyword === ''">
                <!-- 搜索历史 -->
                <SearchHistory @search="search" />
                <!-- 热搜榜 -->
                <SearchHotList
                    :data="detailSearchHot"
                    :mvData="detailSearchMvHot"
                    @search="search"
                />
                <!-- 音乐专区 -->
                <SearchMusicZone />
            </div>
            <div class="searchSuggest" v-show="searchKeyword">
                <div
                    class="searchSuggestItem"
                    v-for="(item, id) in searchSuggest"
                    :key="id"
                    @click="search(item.keyword)"
                >
                    <span class="iconfont icon-sousuo"></span>
                    <span class="text">{{ item.keyword }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SearchInput from "./SearchInput.vue";
import SearchHistory from "./SearchHistory.vue";
import SearchHotList from "./SearchHotList.vue";
import SearchMusicZone from "./SearchMusicZone.vue";
import Loading from "@/components/Loading.vue";
import {
    getDetailSearchHot,
    getDetailSearchMvHot,
    getSearchSuggest,
} from "@/api/search/index.js";
import { reactive, toRefs, computed, onActivated, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

export default {
    name: "SearchPage",
    components: {
        SearchInput,
        Loading,
        SearchHistory,
        SearchHotList,
        SearchMusicZone,
    },

    beforeRouteEnter(to, from, next) {
        if (from.name == "Home") {
            to.meta.isBack = false;
        } else if (from.name == "SearchResult") {
            to.meta.isBack = true;
        }
        next();
    },

    setup() {
        const state = reactive({
            searchInput: "", // 绑定搜索框实现聚焦功能
            placeholder: "", // 搜索框默认内容
            searchKeyword: "", // 搜索关键词
            detailSearchHot: [], // 热搜榜
            detailSearchMvHot: [], // mv榜
            searchSuggest: [], // 搜索建议
        });

        const store = useStore();
        const route = useRoute();
        const router = useRouter();

        state.searchKeyword = computed(() => store.state.search.searchKeyword);

        onMounted(async () => {
            store.commit("search/setSearchKeyword", "");
            store.commit("setLoading", true);
            await getDetailSearchHot().then((res) => {
                state.detailSearchHot = res.data.data;
            });
            await getDetailSearchMvHot().then((res) => {
                state.detailSearchMvHot = res.data.data;
                store.commit("setLoading", false);
            });
        });

        onActivated(async () => {
            store.commit("search/setSearchKeyword", "");
            if (route.meta.isBack === false) {
                store.commit("setLoading", true);
                await getDetailSearchHot().then((res) => {
                    state.detailSearchHot = res.data.data;
                });
                await getDetailSearchMvHot().then((res) => {
                    state.detailSearchMvHot = res.data.data;
                    store.commit("setLoading", false);
                });
            }
            route.meta.isBack = true;
        });

        // 搜索歌曲
        const search = (searchKeyword) => {
            store.commit("search/setSearchKeyword", searchKeyword);
            router.push({
                path: "/search",
                query: { keyword: searchKeyword },
            });
        };

        // 搜索建议
        const suggest = async (keyword) => {
            if (keyword !== undefined) {
                if (keyword === "") {
                    store.commit("search/setSearchKeyword", keyword);
                } else {
                    store.commit("search/setSearchKeyword", keyword);
                    store.commit("setLoading", true);
                    await getSearchSuggest(keyword).then((res) => {
                        if (res.data.result.allMatch) {
                            state.searchSuggest = res.data.result.allMatch;
                        }
                        store.commit("setLoading", false);
                    });
                }
            }
        };

        return {
            ...toRefs(state),
            search,
            suggest,
            loading: computed(() => store.state.loading),
        };
    },
};
</script>

<style scoped lang='scss'>
.searchPage {
    overflow: scroll;
    height: 100vh;
    padding: $padding;
    background: $color-background;
    .loading {
        margin-top: 40px;
    }
    .content {
        .searchSuggest {
            .searchSuggestItem {
                display: flex;
                margin-bottom: 18px;
                .iconfont {
                    margin-top: 2px;
                    margin-right: 8px;
                    color: grey;
                    font-size: 14px;
                }
                .text {
                    flex: 1;
                    padding-bottom: 14px;
                    border-bottom: 1px solid rgb(224, 224, 224);
                    font-size: 16px;
                }
            }
        }
    }
}
</style>
