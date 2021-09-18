<!-- 搜索界面 -->
<template>
    <div class="search">
        <!-- 顶部输入框 -->
        <SearchTop :data="defaultSearchKeyword" />

        <!-- 加载动画 -->
        <Loading v-show="loading" />

        <!-- 搜索历史 -->
        <SearchHistory v-if="!loading" />

        <!-- 热搜榜 -->
        <HotSearchList :data="detailSearchHot" v-if="!loading" />

        <!-- 音乐专区 -->
        <MusicZone v-if="!loading" />

        <!-- 推荐活动 -->
        <RecommendedActivities v-if="!loading" />
    </div>
</template>

<script>
import SearchTop from "./SearchTop.vue";
import SearchHistory from "./SearchHistory.vue";
import HotSearchList from "./HotSearchList.vue";
import MusicZone from "./MusicZone.vue";
import RecommendedActivities from "./RecommendedActivities.vue";
import Loading from "@/components/Loading.vue";
import { getSearchDefault, getDetailSearchHot } from "@/api/search/index.js";
import { onMounted, reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";

export default {
    name: "Search",
    components: {
        SearchTop,
        SearchHistory,
        HotSearchList,
        MusicZone,
        RecommendedActivities,
        Loading,
    },
    setup() {
        const state = reactive({
            defaultSearchKeyword: "",
            detailSearchHot: [],
        });

        const store = useStore();

        onMounted(async () => {
            store.commit("showLoading");
            await getSearchDefault().then((res) => {
                state.defaultSearchKeyword = res.data.data.showKeyword;
            });
            await getDetailSearchHot().then((res) => {
                state.detailSearchHot = res.data.data;
                store.commit("hiddenLoading");
            });
        });

        return {
            ...toRefs(state),
            loading: computed(() => store.state.loading),
        };
    },
};
</script>

<style scoped lang='scss'>
.search {
    overflow: scroll;
    height: 100%;
    padding: var(--padding);
    background-color: #f4f4f4;
    .loading {
        margin-top: 40px;
    }
}
</style>
