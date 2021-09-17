<!-- 搜索页-搜索历史 -->
<template>
    <div class="searchHistory" v-if="$store.getters.isSearchHistoryShow">
        <div class="top">
            <span class="left">历史</span>
            <div class="right" @click="deleteSearchHistory">
                <span class="iconfont icon-shanchu1"></span>
            </div>
        </div>
        <div class="searchHistoryList">
            <span
                class="item"
                v-for="(item, id) in $store.getters.searchHistory"
                :key="id"
                @click="searchBySearchHistory(item)"
            >
                {{ item }}
            </span>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { Dialog } from "vant";

export default {
    name: "SearchHistory",
    setup() {
        const store = useStore();

        // 删除搜索历史
        const deleteSearchHistory = () => {
            Dialog.confirm({
                message: "确定清除全部历史记录？",
            })
                .then(() => {
                    localStorage.removeItem("searchHistory");
                    location.reload();
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
        };
    },
};
</script>

<style scoped lang='scss'>
.searchHistory {
    margin-top: 20px;
    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
            font-size: 14px;
        }
        .right {
            .iconfont {
                font-size: 12px;
            }
        }
    }
    .searchHistoryList {
        display: flex;
        flex-wrap: wrap;
        margin-top: 14px;
        .item {
            margin-right: 10px;
            margin-bottom: 14px;
            padding: 2px 10px;
            background-color: #fff;
            border-radius: 8px;
        }
    }
}
</style>
