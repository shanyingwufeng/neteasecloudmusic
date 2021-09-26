<!-- 搜索结果 -->
<template>
    <div class="searchResult">
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
</template>

<script>
import SearchSingle from "./SearchSingle.vue";
import SearchPlayList from "./SearchPlayList.vue";
import SearchArtist from "./SearchArtist.vue";
import SearchAlbum from "./SearchAlbum.vue";
import SearchSimQuery from "./SearchSimQuery.vue";
import SearchUser from "./SearchUser.vue";
import { toRefs, reactive, onMounted } from "vue";

export default {
    name: "SearchResult",
    components: {
        SearchSingle,
        SearchPlayList,
        SearchArtist,
        SearchAlbum,
        SearchSimQuery,
        SearchUser,
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
        });

        const search = (searchWord) => {
            emit("search", searchWord);
        };

        // console.log(props.data.sim_query);
        state.single = props.data.song;
        state.playList = props.data.playList;
        state.newMlog = props.data.new_mlog;
        state.artist = props.data.artist;
        state.album = props.data.album;
        state.simQuery = props.data.sim_query;
        state.user = props.data.user;

        onMounted(() => {
            state.single = props.data.song;
            state.playList = props.data.playList;
            state.newMlog = props.data.new_mlog;
            state.artist = props.data.artist;
            state.album = props.data.album;
            state.simQuery = props.data.sim_query;
            state.user = props.data.user;
        });

        return { ...toRefs(state), search };
    },
};
</script>

<style scoped lang='scss'>
.searchResult {
    margin-top: 14px;
    padding-bottom: 60px;
}
</style>
