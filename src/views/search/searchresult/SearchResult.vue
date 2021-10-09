<!-- 搜索结果 -->
<template>
    <div class="searchResult">
        <!-- 顶部输入框 -->
        <SearchInput @search="search" />
        <!-- 加载动画 -->
        <Loading v-if="loading" />
        <div class="content" v-show="!loading">
            <!-- 单曲 -->
            <SearchSingle :data="single" />
            <!-- 歌单 -->
            <SearchPlayList :data="playList" />
            <!-- 艺人 -->
            <SearchArtist :data="artist" />
            <!-- 专辑 -->
            <SearchAlbum :data="album" />
            <!-- 相关搜索 -->
            <SearchSimQuery :data="simQuery" @search="search" />
            <!-- 用户 -->
            <SearchUser :data="user" />
        </div>
    </div>
</template>

<script>
import SearchInput from "../SearchInput.vue";
import Loading from "@/components/Loading.vue";
import SearchSingle from "./SearchSingle.vue";
import SearchPlayList from "./SearchPlayList.vue";
import SearchArtist from "./SearchArtist.vue";
import SearchAlbum from "./SearchAlbum.vue";
import SearchSimQuery from "./SearchSimQuery.vue";
import SearchUser from "./SearchUser.vue";
import { toRefs, reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { searchByKeyword } from "@/api/search/index.js";

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
    props: ["data"],
    emits: ["search"],
    setup(props, { emit }) {
        const state = reactive({
            single: "", // 单曲
            playList: "", // 歌单
            newMlog: "", // 视频
            artist: "", // 艺人
            album: "", // 专辑
            simQuery: "", // 相关搜索
            user: "", // 用户
            searchSongs: "",
            searchHistory: [],
        });

        const store = useStore();
        const route = useRoute();
        const searchKeyword = route.query.keyword;

        const search = (searchWord) => {
            emit("search", searchWord);
        };

        onMounted(async () => {
            store.commit("search/setSearchKeyword", searchKeyword);
            store.commit("setLoading", true);

            // 通过关键词搜索歌曲
            await searchByKeyword(1018, searchKeyword).then((res) => {
                state.searchSongs = res.data.result;
                state.single = state.searchSongs.song;
                state.playList = state.searchSongs.playList;
                state.newMlog = state.searchSongs.new_mlog;
                state.artist = state.searchSongs.artist;
                state.album = state.searchSongs.album;
                state.simQuery = state.searchSongs.sim_query
                    ? state.searchSongs.sim_query
                    : "";
                state.user = state.searchSongs.user
                    ? state.searchSongs.user
                    : "";
            });

            if (localStorage.getItem("searchHistory")) {
                state.searchHistory = JSON.parse(
                    localStorage.getItem("searchHistory")
                );
                if (state.searchHistory.includes(searchKeyword)) {
                    const index = state.searchHistory.indexOf(searchKeyword);
                    state.searchHistory.splice(index, 1);
                }
                state.searchHistory.reverse();
                state.searchHistory.push(searchKeyword);
                state.searchHistory.reverse();
                localStorage.searchHistory = JSON.stringify(
                    state.searchHistory
                );
            } else {
                state.searchHistory = [];
                state.searchHistory.push(searchKeyword);
                localStorage.setItem(
                    "searchHistory",
                    JSON.stringify(state.searchHistory)
                );
            }

            store.commit(
                "setSearchHistory",
                JSON.parse(localStorage.getItem("searchHistory"))
            );

            store.commit("setLoading", false);
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
