<!-- 我喜欢的音乐 -->
<template>
    <div class="myLoveMusic">
        <div class="left" v-if="!playlist">
            <img src="@/assets/default.jpg" />
            <div class="content">
                <span class="title">我喜欢的音乐</span>
                <span class="count">0首</span>
            </div>
        </div>
        <router-link
            class="left"
            v-if="playlist"
            :to="{
                path: '/playlist',
                query: { id: playlist.id },
            }"
        >
            <img v-lazy="playlist.coverImgUrl" />
            <div class="content">
                <span class="title">我喜欢的音乐</span>
                <span class="count">{{ playlist.trackCount }}首</span>
            </div>
        </router-link>
        <div class="right">
            <span class="iconfont icon-xindong"></span>
            <span class="model">心动模式</span>
        </div>
    </div>
</template>

<script>
import { onUpdated, reactive, toRefs } from "vue";

export default {
    name: "MyLoveMusic",
    components: {},
    props: ["data"],
    setup(props) {
        const state = reactive({
            playlist: "",
        });

        onUpdated(() => {
            // console.log(props.data);
            state.playlist = props.data;
        });

        return { ...toRefs(state) };
    },
};
</script>

<style scoped lang='scss'>
.myLoveMusic {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $padding;
    background-color: $color-white-background;
    border-radius: 10px;
    .left {
        display: flex;
        align-items: center;
        img {
            display: block;
            width: 44px;
            height: 44px;
            margin-right: 10px;
            border-radius: 6px;
        }
        .content {
            display: flex;
            flex-direction: column;
            .title {
                font-size: 14px;
            }
            .count {
                margin-top: 6px;
                color: grey;
                font-size: 10px;
            }
        }
    }
    .right {
        display: flex;
        align-items: center;
        padding: 4px 6px;
        border: 1px solid rgb(236, 236, 236);
        border-radius: 14px;
        .iconfont {
            margin-right: 4px;
            color: red;
            font-size: 10px;
        }
        .model {
            font-size: 10px;
        }
    }
}
</style>