<!-- 标题栏 -->
<template>
    <div class="titleBar">
        <span class="name">{{ name }}</span>
        <div class="more" v-if="rightText !== ''">
            <div v-if="rightText == '播放'">
                <span class="iconfont icon-bofang3"></span>
            </div>
            <span>{{ rightText }}</span>
            <div v-if="rightText == '更多'">
                <span class="iconfont icon-youjiantou"></span>
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
        display: flex;
        align-items: center;
        padding: 2px 4px;
        border: 1px solid rgb(219, 219, 219);
        border-radius: 12px;
        font-size: 8px;
        .icon-bofang3 {
            margin-right: 1px;
            color: #555;
        }
        .icon-youjiantou {
            margin-left: 1px;
        }
        .iconfont {
            font-size: 8px;
        }
    }
}
</style>
