<!-- 搜索-输入框 -->
<template>
    <div class="searchInput">
        <span class="iconfont icon-jiantou-xia" @click="$router.go(-1)"></span>
        <input
            ref="searchInput"
            type="text"
            :placeholder="placeholder"
            @keydown.enter="search"
            v-model="searchKeyword"
        />
    </div>
</template>

<script>
export default {
    name: "SearchInput",
    components: {},
};
</script>

<style scoped lang='scss'>
</style>
