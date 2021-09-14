<!-- 广告栏 -->
<template>
    <div class="ad">
        <span class="left">{{ adLeft }}</span>
        <div class="right">
            <span>{{ adRight }}</span>
            <div>
                <span class="iconfont icon-youjiantou"></span>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onUpdated } from "vue";

export default {
    name: "Ad",
    props: ["adLeft", "adRight"],
    setup(props) {
        const adLeft = ref();
        const adRight = ref();

        onMounted(() => {
            adLeft.value = props.adLeft;
            adRight.value = props.adRight;
        });

        onUpdated(() => {
            adLeft.value = props.adLeft;
            adRight.value = props.adRight;
        });

        return { adLeft, adRight };
    },
};
</script>

<style scoped lang='scss'>
.ad {
    display: flex;
    justify-content: space-between;
    margin: 0 14px;
    padding: 6px 8px;
    border: 1px solid #f4f4f4;
    border-radius: 10px;
    .left {
        font-size: 14px;
    }
    .right {
        display: flex;
        align-items: center;
        color: grey;
        .iconfont {
            font-size: 12px;
        }
    }
}
</style>
