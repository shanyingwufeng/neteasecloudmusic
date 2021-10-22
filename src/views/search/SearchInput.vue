<!-- 搜索-输入框 -->
<template>
    <div class="searchInput">
        <span class="iconfont icon-jiantou-xia back" @click="back()"></span>
        <input
            ref="searchInput"
            type="text"
            :placeholder="placeholder"
            v-model="searchKeyword"
            @keydown.enter="search(searchKeyword)"
            @input="inputValue()"
        />
        <span
            class="iconfont icon-cha-copy fork"
            v-if="searchKeyword"
            @click="fork()"
        ></span>
    </div>
</template>

<script>
import { toRefs, reactive, watch, onActivated } from "vue";
import { getSearchDefault } from "@/api/search/index.js";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
    name: "SearchInput",
    setup(props, { emit }) {
        const state = reactive({
            searchInput: null, // 绑定搜索框实现聚焦功能
            placeholder: "", // 搜索框默认内容
            searchKeyword: "", // 搜索关键词
            path: "",
        });

        const store = useStore();
        const route = useRoute();
        const router = useRouter();

        state.searchKeyword = route.query.keyword;

        // 当参数更改时获取信息
        watch(
            () => route.query,
            async (newParams) => {
                if (newParams.keyword) {
                    state.searchKeyword = newParams.keyword;
                } else {
                    state.searchKeyword = "";
                }
            }
        );

        onActivated(async () => {
            if (route.params.path !== undefined) {
                state.path = route.params.path;
            }
            state.searchInput.focus();
            await getSearchDefault().then((res) => {
                state.placeholder = res.data.data.showKeyword;
            });
        });

        // input输入事件
        const inputValue = () => {
            emit("suggest", state.searchKeyword);
        };

        // 返回操作
        const back = () => {
            if (state.searchKeyword) {
                state.searchKeyword = "";
                store.commit("search/setSearchKeyword", "");
                router.push("/searchpage");
            } else if (state.path) {
                router.push(state.path);
            } else {
                router.push("/");
            }
        };

        // 点击输入框右边叉
        const fork = () => {
            state.searchKeyword = "";
            store.commit("search/setSearchKeyword", "");
            router.push("/searchpage");
        };

        const search = (searchWord) => {
            if (searchWord) {
                emit("search", searchWord);
            } else {
                searchWord = state.placeholder;
                emit("search", searchWord);
            }
        };

        return { ...toRefs(state), inputValue, back, fork, search };
    },
};
</script>

<style scoped lang='scss'>
.searchInput {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .back {
        display: flex;
        margin-right: 10px;
        color: rgb(68, 68, 68);
        font-size: 24px;
    }
    input {
        width: 100%;
        padding-bottom: 2px;
        background-color: $color-background;
        border: 0;
        border-bottom: 1px solid rgba(161, 161, 161, 0.6);
        font-size: 16px;
        outline: none;
        caret-color: red;
    }
    .fork {
        display: flex;
        position: absolute;
        top: 4px;
        right: 6px;
        font-size: 14px;
    }
}
</style>
