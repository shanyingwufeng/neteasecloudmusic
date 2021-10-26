<!-- 加载组件 -->
<template>
    <div class="loading">
        <!-- <van-loading type="spinner" color="red" text-color="#999" size="20px"
            >正在加载...</van-loading
        > -->
        <div></div>
        <div></div>
        <div></div>
        <!-- <img src="@/assets/loading.gif" />
        <span>正在加载...</span> -->
    </div>
</template>

<script>
export default {
    name: "Loading",
};
</script>

<style scoped lang='scss'>
// .loading {
// position: absolute;
// top: 0;
// left: 0;
// width: 100%;
// height: 100%;
// background-color: #fff;
// z-index: 999;
// .van-loading {
// position: absolute;
// left: 50%;
// top: 50%;
// transform: translateX(-50%) translateY(-50%);
// }
// }
@keyframes loading {
    to {
        opacity: 0.1;
        transform: translate3d(0, -6px, 0);
    }
}
.loading {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    // img {
    //     width: 20px;
    //     margin-right: 4px;
    // }
    div {
        width: 8px;
        height: 8px;
        margin: 10px 4px;
        background: red;
        border-radius: 50%;
        animation: loading 0.6s infinite alternate;
    }
    div:nth-child(2) {
        animation-delay: 0.2s;
    }
    div:nth-child(3) {
        animation-delay: 0.4s;
    }
}
</style>
