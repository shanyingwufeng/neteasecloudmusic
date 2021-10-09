<!-- 相关搜索 -->
<template>
    <div class="searchSimQuery">
        <TitleBar titleBarName="相关搜索" />
        <div class="list">
            <span
                class="item"
                v-for="(item, index) in list"
                :key="index"
                @click="search(item.keyword)"
                >{{ item.keyword }}</span
            >
        </div>
    </div>
</template>

<script>
import { onUpdated, reactive, toRefs } from "vue";
import TitleBar from "@/components/TitleBar.vue";

export default {
    name: "SearchSimQuery",
    components: { TitleBar },
    props: ["data"],
    emits: ["search"],
    setup(props, { emit }) {
        const state = reactive({
            list: "",
        });

        const search = (searchWord) => {
            emit("search", searchWord);
        };

        onUpdated(() => {
            if (state.list == "") {
                state.list = props.data.sim_querys;
            }
        });

        return {
            ...toRefs(state),
            search,
        };
    },
};
</script>

<style scoped lang='scss'>
.searchSimQuery {
    margin-bottom: 14px;
    padding-bottom: 6px;
    background-color: $color-white-background;
    border-radius: 10px;
    .titleBar {
        font-size: 16px;
    }
    .list {
        display: flex;
        flex-wrap: wrap;
        padding: 0 $padding;
        .item {
            margin-right: 12px;
            margin-bottom: 12px;
            padding: 6px 12px;
            background-color: rgba(224, 224, 224, 0.5);
            border-radius: 20px;
        }
    }
}
</style>
