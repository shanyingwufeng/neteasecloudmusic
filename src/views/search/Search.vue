<!-- 搜索页 -->
<template>
    <div class="search">
        <SearchTop :data="defaultSearchKeyword" />
        <SearchHistory />
    </div>
</template>

<script>
import SearchTop from "./SearchTop.vue";
import SearchHistory from "./SearchHistory.vue";
import { getSearchDefault } from "@/api/search/index.js";
import { onMounted, reactive, toRefs } from "vue";

export default {
    name: "Search",
    components: { SearchTop, SearchHistory },
    setup() {
        const state = reactive({
            defaultSearchKeyword: "",
        });

        onMounted(() => {
            getSearchDefault().then((res) => {
                state.defaultSearchKeyword = res.data.data.showKeyword;
            });
        });

        return { ...toRefs(state) };
    },
};
</script>

<style scoped lang='scss'>
.search {
    height: 100%;
    padding: var(--padding);
    background-color: #f4f4f4;
}
</style>
