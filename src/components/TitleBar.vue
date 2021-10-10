<!-- 标题栏 -->
<template>
    <div class="titleBar">
        <span class="name">{{ name }}</span>
        <div class="more" v-if="rightText !== ''">
            <div v-if="rightText == '更多'" class="item item1">
                <span class="text">{{ rightText }}</span>
                <span class="iconfont icon-gengduo2"></span>
            </div>
            <div v-else-if="rightText == '播放'" class="item item2">
                <span class="text">{{ rightText }}</span>
                <span class="iconfont icon-bofang4"></span>
            </div>
            <div v-else-if="rightText == '换一批'" class="item item3">
                <span class="iconfont icon-shuaxin"></span>
                <span class="text">{{ rightText }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onUpdated, onMounted } from "vue";

export default {
    name: "TitleBar",
    components: {},
    props: ["titleBarName", "rightText"],
    setup(props) {
        const name = ref();
        const rightText = ref();
        onMounted(() => {
            name.value = props.titleBarName;
            rightText.value = props.rightText ? props.rightText : "";
        });
        onUpdated(() => {
            name.value = props.titleBarName;
            rightText.value = props.rightText ? props.rightText : "";
        });
        return { name, rightText };
    },
};
</script>

<style scoped lang='scss'>
.titleBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $padding;
    .name {
        font-size: $font-size-medium;
    }
    .more {
        padding: 2px 6px;
        border: 1px solid rgba($color: #000000, $alpha: 0.2);
        border-radius: 14px;
        .item {
            display: flex;
            align-items: center;
            .text {
                font-size: 12px;
            }
            .iconfont {
                display: flex;
                align-items: center;
                font-size: 10px;
            }
        }
        .item3 {
            .iconfont {
                margin-right: 2px;
            }
        }
    }
}
</style>
