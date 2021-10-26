<!-- 搜索结果 -->
<template>
    <div class="searchResult">
        <!-- 顶部输入框 -->
        <SearchInput @search="search" />
        <!-- 加载动画 -->
        <Loading v-if="loading" />
        <div class="content" v-show="!loading">
            <!-- 单曲 -->
            <SearchSingle
                :data="searchResult.song ? searchResult.song : ''"
                v-show="searchResult.song"
            />
            <!-- 歌单 -->
            <SearchPlayList
                :data="searchResult.playList ? searchResult.playList : ''"
                v-show="searchResult.playList"
            />
            <!-- 艺人 -->
            <SearchArtist
                :data="searchResult.artist ? searchResult.artist : ''"
                v-show="searchResult.artist"
            />
            <!-- 专辑 -->
            <SearchAlbum
                :data="searchResult.album ? searchResult.album : ''"
                v-show="searchResult.album"
            />
            <!-- 相关搜索 -->
            <SearchSimQuery
                :data="searchResult.sim_query ? searchResult.sim_query : ''"
                v-show="searchResult.sim_query"
                @search="search"
            />
            <!-- 用户 -->
            <SearchUser
                :data="searchResult.user ? searchResult.user : ''"
                v-show="searchResult.user"
            />
        </div>
    </div>
</template>

<script>
import SearchInput from "../SearchInput.vue";
import SearchSingle from "./SearchSingle.vue";
import SearchPlayList from "./SearchPlayList.vue";
import SearchArtist from "./SearchArtist.vue";
import SearchAlbum from "./SearchAlbum.vue";
import SearchSimQuery from "./SearchSimQuery.vue";
import SearchUser from "./SearchUser.vue";
import Loading from "@/components/Loading.vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { toRefs, reactive, onMounted, computed, watch } from "vue";

export default {
    name: "SearchResult",
    components: {
        SearchInput,
        SearchSingle,
        SearchPlayList,
        SearchArtist,
        SearchAlbum,
        SearchSimQuery,
        SearchUser,
        Loading,
    },
    setup() {
        const state = reactive({
            searchHistory: [],
            searchKeyword: "",
        });

        const store = useStore();
        const route = useRoute();
        const router = useRouter();

        state.searchKeyword = route.query.keyword;

        onMounted(() => {
            store.dispatch("search/getSearchResult", state.searchKeyword);
            document.addEventListener("plusready", function () {
                var webview = plus.webview.currentWebview();
                plus.key.addEventListener("backbutton", function () {
                    webview.canBack(function (e) {
                        if (e.canBack) {
                            webview.back();
                        } else {
                            store.commit("search/setSearchKeyword", "");
                        }
                    });
                });
            });
        });

        // 当参数更改时获取信息
        watch(
            () => route.query,
            async (newParams) => {
                if (newParams.keyword) {
                    await store.dispatch(
                        "search/getSearchResult",
                        newParams.keyword
                    );
                }
            }
        );

        const search = (searchKeyword) => {
            router.push({
                path: "/search",
                query: { keyword: searchKeyword },
            });
        };

        return {
            ...toRefs(state),
            search,
            loading: computed(() => store.state.loading),
            searchResult: computed(() => store.state.search.searchResult),
        };
    },
};
</script>

<style scoped lang='scss'>
.searchResult {
    overflow: scroll;
    height: 100vh;
    padding: $padding;
    padding-bottom: 60px;
    background: $color-background;
    .loading {
        margin-top: 30px;
    }
}
</style>
