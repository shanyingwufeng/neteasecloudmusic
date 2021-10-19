<!-- 搜索用户-->
<template>
    <div class="searchUser">
        <TitleBar>
            <template v-slot:left>
                <div class="left">
                    <span class="titleName">用户</span>
                </div>
            </template>
        </TitleBar>
        <div class="list">
            <div class="item" v-for="(item, id) in list" :key="id">
                <div class="left">
                    <img v-lazy="item.avatarUrl" />
                    <div class="content">
                        <span class="name">{{ item.nickname }}</span>
                        <span class="signature">{{ item.signature }}</span>
                    </div>
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
    name: "SearchUser",
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
                state.list = newValue.users;
                state.moreText = newValue.moreText;
            }
        );

        return { ...toRefs(state), changeValue };
    },
};
</script>

<style scoped lang='scss'>
.searchUser {
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
                width: 70%;
                img {
                    display: block;
                    width: 54px;
                    margin-right: 12px;
                    border-radius: 50%;
                }
                .content {
                    display: flex;
                    flex-direction: column;
                    width: 80%;
                    .name {
                        margin-bottom: 4px;
                        font-size: 16px;
                    }
                    .signature {
                        @include ellipsis1();
                        color: grey;
                        font-size: 10px;
                    }
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