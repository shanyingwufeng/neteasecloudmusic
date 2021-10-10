<!-- 搜索界面 -->
<template>
    <div class="searchPage">
        <!-- 输入框 -->
        <SearchInput @search="search" />
        <!-- 加载动画 -->
        <Loading v-if="loading" />
        <!-- 搜索页面内容区 -->
        <div class="content" v-show="!loading">
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
        </div>
    </div>
</template>

<script>
import SearchInput from "./SearchInput.vue";
import SearchHistory from "./SearchHistory.vue";
import HotSearchList from "./HotSearchList.vue";
import MusicZone from "./MusicZone.vue";
import Loading from "@/components/Loading.vue";
import {
    getDetailSearchHot,
    getDetailSearchMvHot,
} from "@/api/search/index.js";
import { reactive, toRefs, computed, onActivated, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

export default {
    name: "SearchPage",
    components: {
        SearchInput,
        SearchHistory,
        HotSearchList,
        MusicZone,
        Loading,
    },

    beforeRouteEnter(to, from, next) {
        if (from.name == "Home") {
            to.meta.isBack = false;
        } else if (from.name == "SearchResult") {
            to.meta.isBack = false;
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
        });

        const store = useStore();
        const route = useRoute();
        const router = useRouter();

        // 搜索歌曲
        const search = (searchKeyword) => {
            router.push({
                path: "/search",
                query: { keyword: searchKeyword },
            });
        };

        onMounted(async () => {
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

        return {
            ...toRefs(state),
            search,
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
}
</style>
