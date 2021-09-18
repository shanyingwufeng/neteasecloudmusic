<!-- 搜索界面-热门活动 -->
<template>
    <div class="recommendedActivities">
        <div class="name">推荐活动</div>
        <div class="list">
            <div class="item" v-for="(item, id) in list" :key="id">
                <img v-lazy="item.imgUrl" />
                <span class="title">{{ item.title }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from "vue";

export default {
    name: "RecommendedActivities",
    setup() {
        const list = reactive([
            {
                id: 1,
                imgUrl: require("@/assets/logo.png"),
                title: "邀请福利：速领现金券+VIP月卡！",
            },
            {
                id: 2,
                imgUrl: require("@/assets/logo.png"),
                title: "说唱人物志Vol.6：Travis Scott的奇妙游乐园",
            },
        ]);

        return { list };
    },
};
</script>

<style scoped lang='scss'>
.recommendedActivities {
    margin-top: 20px;
    .name {
        margin-bottom: 10px;
        font-size: 14px;
    }
    .list {
        .item {
            display: flex;
            align-items: center;
            margin-bottom: 14px;
            color: #555;
            img {
                width: 40px;
                margin-right: 14px;
            }
            .title {
                text-overflow: ellipsis;
                overflow-x: hidden;
                white-space: nowrap;
                font-size: 14px;
            }
        }
        .item:last-child {
            margin-bottom: 0;
        }
    }
}
</style>
