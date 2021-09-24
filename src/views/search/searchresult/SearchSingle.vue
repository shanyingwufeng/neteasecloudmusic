<!-- 搜索单曲 -->
<template>
    <div class="searchSingle">
        <TitleBar titleBarName="单曲" rightText="播放" />
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
import { computed, onMounted, reactive, toRefs } from "vue";
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

        onMounted(() => {
            state.list =
                props.data.songs.length > 5
                    ? props.data.songs.slice(0, 5)
                    : props.data.songs;
            state.moreText = props.data.moreText;
        });

        return {
            ...toRefs(state),
            searchKeyword: computed(() => store.state.searchKeyword),
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
        padding-top: 20px;
        font-size: 16px;
    }
    .list {
        padding: 0 var(--padding);
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
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    margin-bottom: 4px;
                    font-size: 16px;
                }
                .bottom {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
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