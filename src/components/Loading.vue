<!-- 加载组件 -->
<template>
    <div class="loading">
        <van-loading type="spinner" color="red" text-color="#999" size="24px">正在加载...</van-loading>
    </div>
</template>

<script>
import { toRefs, reactive, onMounted } from "vue";

export default {
    name: "Loading",
    components: {},
    setup() {
        const reactiveData = reactive({});
        onMounted(() => {});
        return {
            ...toRefs(reactiveData),
        };
    },
};
</script>

<style scoped lang='scss'>
.loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 99;
    .van-loading {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
}
</style>