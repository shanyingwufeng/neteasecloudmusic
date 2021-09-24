<!-- 搜索用户-->
<template>
    <div class="searchUser">
        <TitleBar titleBarName="用户" />
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
import { onMounted, reactive, toRefs } from "vue";
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

        onMounted(() => {
            state.list = props.data.users;
            state.moreText = props.data.moreText;
        });

        return { ...toRefs(state), changeValue };
    },
};
</script>

<style scoped lang='scss'>
.searchUser {
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
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
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