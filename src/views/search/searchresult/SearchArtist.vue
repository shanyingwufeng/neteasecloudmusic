<!-- 搜索艺人-->
<template>
    <div class="searchArtist">
        <TitleBar titleBarName="艺人" />
        <div class="list">
            <div class="item" v-for="(item, id) in list" :key="id">
                <div class="left">
                    <img v-lazy="item.img1v1Url" />
                    <span class="name">{{ item.name }}</span>
                </div>
                <div class="right">
                    <div>
                        <span class="iconfont icon-jia"></span>
                    </div>
                    <span>关注</span>
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
import { watch, reactive, toRefs } from "vue";
import { changeValue } from "@/utils/index.js";

export default {
    name: "SearchArtist",
    components: { TitleBar },
    props: ["data"],
    setup(props) {
        const state = reactive({
            list: [],
            moreText: "",
        });

        watch(
            () => props.data,
            (newValue) => {
                state.list = newValue.artists;
                state.moreText = newValue.moreText;
            }
        );

        return { ...toRefs(state), changeValue };
    },
};
</script>

<style scoped lang='scss'>
.searchArtist {
    margin-bottom: 14px;
    background-color: $color-white-background;
    border-radius: 10px;
    .titleBar {
        font-size: 16px;
    }
    .list {
        padding: 0 $padding;
        .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 14px;
            .left {
                display: flex;
                align-items: center;
                img {
                    display: block;
                    width: 54px;
                    margin-right: 12px;
                    border-radius: 50%;
                }
                .name {
                    @include ellipsis1();
                    font-size: 16px;
                }
            }
            .right {
                display: flex;
                align-items: center;
                padding: 2px 8px;
                border: 1px solid red;
                border-radius: 12px;
                color: red;
                .iconfont {
                    margin-right: 2px;
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