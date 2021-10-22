<!-- 等待开发 -->
<template>
    <div class="waitingDevelopment">{{ data }}等待开发...</div>
</template>

<script>
export default {
    name: "WaitingDevelopment",
    props: ["data"],
};
</script>

<style scoped lang='scss'>
.waitingDevelopment {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    font-size: 20px;
}
</style>
