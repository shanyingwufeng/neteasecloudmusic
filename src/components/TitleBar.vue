<!-- 标题栏 -->
<template>
    <div class="titleBar">
        <div class="left">
            <span class="titleName">
                <slot name="left"></slot>
            </span>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "TitleBar",
    components: {},
};
</script>

<style lang='scss'>
.titleBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $padding;
    .left {
        .titleName {
            font-size: 20px;
            font-weight: 700;
        }
    }
    .right {
        display: flex;
        align-items: center;
        padding: 1px 4px 1px 8px;
        border: 1px solid #eaeaea;
        border-radius: 14px;
        .iconfont {
            display: flex;
            margin-left: -2px;
            font-size: 14px;
        }
        .text.refresh {
            margin-right: 4px;
        }
    }
}
</style>
