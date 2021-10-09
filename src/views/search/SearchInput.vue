<!-- 搜索-输入框 -->
<template>
    <div class="searchInput">
        <span
            class="iconfont icon-jiantou-xia back"
            @click="$router.go(-1)"
        ></span>
        <input
            ref="searchInput"
            type="text"
            :placeholder="placeholder"
            v-model="searchKeyword"
            @keydown.enter="search(searchKeyword)"
        />
        <span
            class="iconfont icon-cha-copy fork"
            v-if="searchKeyword"
            @click="fork()"
        ></span>
    </div>
</template>

<script>
import { toRefs, reactive, onMounted } from "vue";
import { getSearchDefault } from "@/api/search/index.js";
import { useRoute } from "vue-router";

export default {
    name: "SearchInput",
    components: {},
    setup(props, { emit }) {
        const state = reactive({
            searchInput: "", // 绑定搜索框实现聚焦功能
            placeholder: "", // 搜索框默认内容
            searchKeyword: "", // 搜索关键词
            detailSearchHot: [], // 热搜榜
            detailSearchMvHot: [], // mv榜
        });

        const route = useRoute();
        state.searchKeyword = route.query.keyword;

        // 点击输入框右边叉
        const fork = () => {
            state.searchKeyword = "";
            state.searchInput.focus();
        };

        const search = (searchWord) => {
            emit("search", searchWord);
        };

        onMounted(async () => {
            await getSearchDefault().then((res) => {
                state.searchInput.focus();
                state.placeholder = res.data.data.showKeyword;
            });
        });

        return {
            ...toRefs(state),
            fork,
            search,
        };
    },
};
</script>

<style scoped lang='scss'>
.searchInput {
    position: relative;
    display: flex;
    align-items: center;
    .back {
        display: flex;
        margin-right: 12px;
        color: rgb(68, 68, 68);
        font-size: 24px;
    }
    input {
        width: 100%;
        padding-bottom: 2px;
        background-color: $color-background;
        border: 0;
        border-bottom: 1px solid rgba(161, 161, 161, 0.6);
        font-size: 14px;
        outline: none;
        caret-color: red;
    }
    .fork {
        display: flex;
        position: absolute;
        top: 8px;
        right: 6px;
        font-size: 14px;
    }
}
</style>
