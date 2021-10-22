<!-- 搜索单曲 -->
<template>
    <div class="searchSingle">
        <TitleBar>
            <template v-slot:left>单曲</template>
            <template v-slot:right>
                <span class="iconfont icon-bofangqi-bofang"></span>
                <span class="text">播放</span>
            </template>
        </TitleBar>
        <div class="list">
            <router-link
                class="item"
                v-for="(item, id) in list"
                :key="id"
                :to="{
                    path: '/playpage',
                    query: { id: item.id },
                }"
            >
                <div class="left">
                    <div
                        class="title"
                        :style="{
                            color:
                                item.name == searchKeyword ? '#5779a6' : '#000',
                        }"
                    >
                        {{ item.name }}
                    </div>
                    <div class="bottom">
                        <span class="author">
                            {{ item.ar[0].name }}
                        </span>
                        <span class="album" v-if="item.al.name">
                            - {{ item.al.name }}</span
                        >
                    </div>
                </div>
                <div class="right">
                    <span class="iconfont icon-bofangshu"></span>
                    <span class="iconfont icon-gengduo"></span>
                </div>
            </router-link>
        </div>
        <div class="more">
            <span>{{ moreText }}</span>
            <div>
                <span class="iconfont icon-youjiantou"></span>
            </div>
        </div>
    </div>
</template>

<script>
import TitleBar from "@/components/TitleBar.vue";
import { computed, reactive, toRefs, watch } from "vue";
import { useStore } from "vuex";

export default {
    name: "SearchSingle",
    components: { TitleBar },
    props: ["data"],
    setup(props) {
        const state = reactive({
            list: [],
            moreText: "",
        });

        const store = useStore();

        watch(
            () => props.data,
            (newValue) => {
                state.list = newValue.songs;
                state.moreText = newValue.moreText;
            }
        );

        return {
            ...toRefs(state),
            searchKeyword: computed(() => store.state.search.searchKeyword),
        };
    },
};
</script>

<style scoped lang='scss'>
.searchSingle {
    margin-bottom: 14px;
    background-color: #fff;
    border-radius: 10px;
    .titleBar {
        .right {
            .iconfont {
                font-size: 14px;
            }
            .text {
                margin-right: 6px;
            }
        }
    }
    .list {
        padding: 0 $padding;
        .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 0;
            border-top: 1px solid rgba(228, 228, 228, 0.5);
            .left {
                display: flex;
                flex-direction: column;
                width: 74%;
                .title {
                    @include ellipsis1();
                    margin-bottom: 6px;
                    font-size: 14px;
                }
                .bottom {
                    @include ellipsis1();
                    color: rgb(158, 158, 158);
                    font-size: 12px;
                    .status {
                        margin-right: 4px;
                        padding: 2px 4px;
                        background-color: red;
                        border-radius: 4px;
                        color: #fff;
                        font-size: 8px;
                    }
                }
            }
            .right {
                display: flex;
                align-items: center;
                .iconfont {
                    margin-left: 14px;
                    color: rgb(158, 158, 158);
                    font-size: 18px;
                    &:first-child {
                        font-size: 22px;
                    }
                }
            }
        }
    }
    .more {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px 0;
        border-top: 1px solid rgba(228, 228, 228, 0.5);
        color: grey;
        font-size: 12px;
        .iconfont {
            font-size: 14px;
        }
    }
}
</style>