<!-- 首页-顶部栏 -->
<template>
    <div class="top-bar">
        <div class="left">
            <van-cell @click="showPopup" class="iconfont icon-icon-"></van-cell>
            <van-popup
                v-model:show="show"
                position="left"
                :style="{
                    width: '80vw',
                    height: '100%',
                    padding: '10px',
                    background: 'rgb(243, 240, 240)',
                }"
            >
                <SideBar></SideBar>
            </van-popup>
        </div>
        <div class="center" @click="$router.push('/search')">
            <span class="iconfont icon-sousuo"></span>
            <span class="search-recommend">大家都在听 赵雷</span>
        </div>
        <div class="right">
            <span class="iconfont icon-iconset0222"></span>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import SideBar from "./SideBar.vue";

export default {
    name: "TopBar",
    components: {
        SideBar,
    },
    setup() {
        const show = ref(false);
        const showPopup = () => {
            show.value = true;
        };
        return {
            show,
            showPopup,
        };
    },
};
</script>

<style scoped lang='scss'>
.top-bar {
    display: flex;
    padding: 14px 10px;
    background-color: rgb(243, 240, 240);
    justify-content: space-between;
    align-items: center;
    .left {
        display: flex;
        align-items: center;
        .van-cell {
            padding: 0;
            background-color: rgb(243, 240, 240);
            &:before {
                color: #555;
                font-size: 20px;
            }
        }
    }
    .center {
        display: flex;
        align-items: center;
        width: 80%;
        padding: 6px 12px;
        background-color: #fff;
        border-radius: 14px;
        font-size: 14px;
        .iconfont {
            color: #666;
            font-size: 16px;
        }
        .search-recommend {
            margin-left: 6px;
            color: #999;
        }
    }
    .right {
        display: flex;
        align-items: center;
        .iconfont {
            color: #555;
            font-size: 20px;
        }
    }
}
</style>