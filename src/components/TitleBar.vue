<!-- 标题栏 -->
<template>
    <div class="titleBar">
        <span class="name">{{ name }}</span>
        <div class="more">
            <span>{{ rightText }}</span>
            <div>
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
            rightText.value = props.rightText ? props.rightText : "更多";
        });
        onUpdated(() => {
            name.value = props.titleBarName;
            rightText.value = props.rightText ? props.rightText : "更多";
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
    padding: var(--padding);
    .name {
        font-size: 18px;
    }
    .more {
        display: flex;
        align-items: center;
        padding: 0 6px;
        border: 1px solid rgb(221, 219, 219);
        border-radius: 10px;
        font-size: 10px;
        .iconfont {
            font-size: 8px;
        }
    }
}
</style>
