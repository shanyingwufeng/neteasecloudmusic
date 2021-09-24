<!-- 搜索专辑-->
<template>
    <div class="searchAlbum">
        <TitleBar titleBarName="专辑" />
        <div class="list">
            <div class="item" v-for="(item, id) in list" :key="id">
                <div class="left">
                    <img v-lazy="item.blurPicUrl" />
                    <div class="content">
                        <span
                            class="name"
                            :style="{
                                color:
                                    item.name == searchKeyword
                                        ? '#5779a6'
                                        : '#000',
                            }"
                            >{{ item.name }}</span
                        >
                        <span class="author">{{ item.artists[0].name }}</span>
                    </div>
                </div>
            </div>
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
import { onMounted, reactive, toRefs, computed } from "vue";
import { changeValue } from "@/utils/index.js";
import {useStore} from "vuex";

export default {
    name: "SearchAlbum",
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
                props.data.albums.length > 5
                    ? props.data.albums.slice(0, 5)
                    : props.data.albums;
            state.moreText = props.data.moreText;
        });

        return {
            ...toRefs(state),
            changeValue,
            searchKeyword: computed(() => store.state.searchKeyword),
        };
    },
};
</script>

<style scoped lang='scss'>
.searchAlbum {
    margin-bottom: 14px;
    background-color: #fff;
    border-radius: 10px;
    .titleBar {
        font-size: 16px;
    }
    .list {
        padding: 0 var(--padding);
        .item {
            display: flex;
            align-items: center;
            margin-bottom: 14px;
            .left {
                display: flex;
                align-items: center;
                img {
                    display: block;
                    width: 54px;
                    margin-right: 16px;
                    border-radius: 14px;
                }
                .content {
                    display: flex;
                    flex-direction: column;
                    .name {
                        margin-bottom: 4px;
                        font-size: 16px;
                    }
                    .author {
                        color: grey;
                        font-size: 10px;
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