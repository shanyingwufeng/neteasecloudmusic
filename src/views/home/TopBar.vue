<!-- 首页-顶部栏 -->
<template>
    <div class="top-bar">
        <div class="left">
            <van-cell
                @click="showSideBar"
                class="iconfont icon-icon-"
            ></van-cell>
            <!-- 侧边栏 -->
            <van-popup
                v-model:show="isSideBarShow"
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
            <span class="search-keyword">{{ searchKeyword }}</span>
        </div>
        <div class="right">
            <span class="iconfont icon-tinggeshiqu"></span>
        </div>
    </div>
</template>

<script>
import { toRefs, reactive, onMounted } from "vue";
import SideBar from "./SideBar.vue";
import { getSearchDefault } from "@/api/search/index";

export default {
    name: "TopBar",
    components: {
        SideBar,
    },
    setup() {
        const state = reactive({
            isSideBarShow: false,
            searchKeyword: "",
        });
        const showSideBar = () => {
            state.isSideBarShow = true;
        };
        onMounted(() => {
            getSearchDefault().then((res) => {
                state.searchKeyword = res.data.data.showKeyword;
            });
        });
        return { ...toRefs(state), showSideBar };
    },
};
</script>

<style scoped lang='scss'>
.top-bar {
    display: flex;
    padding: 14px 10px;
    background-color: var(--color-home-topbarandslideshow-background);
    justify-content: space-between;
    align-items: center;
    .left {
        .van-cell {
            padding: 0;
            background-color: var(--color-home-topbarandslideshow-background);
            &:before {
                color: #555;
                font-size: 18px;
            }
        }
    }
    .center {
        width: 80%;
        padding: 6px 12px;
        background-color: #fff;
        border-radius: 14px;
        font-size: 14px;
        .iconfont {
            color: #666;
            font-size: 14px;
            vertical-align: middle;
        }
        .search-keyword {
            margin-left: 6px;
            color: #999;
            font-size: 12px;
        }
    }
    .right {
        display: flex;
        .iconfont {
            color: #555;
            font-size: 20px;
        }
    }
}
</style>