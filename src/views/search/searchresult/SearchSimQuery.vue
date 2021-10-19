<!-- 相关搜索 -->
<template>
    <div class="searchSimQuery">
        <TitleBar>
            <template v-slot:left>
                <div class="left">
                    <span class="titleName">相关搜索</span>
                </div>
            </template>
        </TitleBar>
        <div class="list">
            <span
                class="item"
                v-for="(item, id) in list"
                :key="id"
                @click="search(item.keyword)"
                >{{ item.keyword }}</span
            >
        </div>
    </div>
</template>

<script>
import { watch, reactive, toRefs } from "vue";
import TitleBar from "@/components/TitleBar.vue";

export default {
    name: "SearchSimQuery",
    components: { TitleBar },
    props: ["data"],
    setup(props, { emit }) {
        const state = reactive({
            list: [],
        });

        const search = (searchKeyword) => {
            emit("search", searchKeyword);
        };

        watch(
            () => props.data,
            (newValue) => {
                state.list = newValue.sim_querys;
            }
        );

        return { ...toRefs(state), search };
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
