<!-- 搜索页-搜索历史 -->
<template>
    <div class="searchHistory" v-if="$store.getters.isSearchHistoryShow">
        <span class="left">历史</span>
        <div class="searchHistoryList center">
            <span
                class="item"
                v-for="(item, id) in $store.getters.searchHistory"
                :key="id"
                @click="search(item)"
            >
                {{ item }}
            </span>
        </div>
        <div class="right" @click="deleteSearchHistory()">
            <span class="iconfont icon-shanchu1"></span>
        </div>
    </div>
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
import { Dialog } from "vant";

export default {
    name: "SearchHistory",
    setup(props, { emit }) {
        const store = useStore();

        const search = (searchWord) => {
            emit("search", searchWord);
        };

        // 删除搜索历史
        const deleteSearchHistory = () => {
            Dialog.confirm({
                message: "确定清除全部历史记录？",
            })
                .then(() => {
                    store.commit("hiddenSearchHistory");
                    localStorage.removeItem("searchHistory");
                })
                .catch(() => {});
        };

        onMounted(() => {
            if (localStorage.getItem("searchHistory")) {
                store.state.isSearchHistoryShow = true;
                store.commit(
                    "setSearchHistory",
                    JSON.parse(localStorage.getItem("searchHistory"))
                );
            } else {
                store.state.isSearchHistoryShow = false;
            }
        });

        return {
            deleteSearchHistory,
            search,
        };
    },
};
</script>

<style scoped lang='scss'>
.searchHistory {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    .left {
        font-size: 12px;
    }
    .center {
        overflow-x: auto;
        white-space: nowrap;
        display: -webkit-box;
        -webkit-overflow-scrolling: touch;
        position: absolute;
        top: 54%;
        left: 0;
        transform: translateY(-50%);
        width: 82%;
        height: 30px;
        line-height: 30px;
        margin-left: 34px;
        .item {
            margin-right: 10px;
            padding: 4px 10px;
            background-color: rgba($color: #e6e6e6, $alpha: 1);
            border-radius: 12px;
        }
        &::-webkit-scrollbar {
            display: none;
        }
    }
    .right {
        .iconfont {
            color: rgb(151, 151, 151);
            font-size: 12px;
        }
    }
}
</style>
