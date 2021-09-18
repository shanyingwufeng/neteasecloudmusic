<!-- 歌单封面 -->
<template>
    <div class="playList-cover" @click="goBack()">
        <div class="bg-box" @click.stop="goBack()">
            <img
                class="bg"
                :style="{
                    'background-image':
                        'url(' + playListCover.coverImgUrl + ')',
                }"
            />
        </div>
        <div class="center">
            <div class="img" @click.stop="goBack()">
                <img :src="playListCover.coverImgUrl" alt="" />
                <span class="name">{{ playListCover.name }}</span>
            </div>
            <div class="tag" @click.stop="goBack()">
                <span>标签：</span>
                <span
                    v-for="(item, id) in playListCover.tags"
                    :key="id"
                    class="item"
                >
                    {{ item }}
                </span>
            </div>
            <div class="description" @click.stop="goBack()">
                {{ playListCover.description }}
            </div>
        </div>
        <div class="save-cover">保存封面</div>
    </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import $store from "@/store/index.js";

export default {
    name: "PlayListCover",
    setup() {
        const router = useRouter();

        onMounted(() => {
            $store.commit("hiddenBottom");
        });

        const goBack = () => {
            $store.commit("showBottom");
            router.go(-1);
        };

        return {
            goBack,
            playListCover: computed(() => $store.state.playListCover),
        };
    },
};
</script>

<style scoped lang='scss'>
.playList-cover {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
    height: 100%;
    padding-bottom: 30px;
    color: #fff;
    .bg-box {
        overflow: hidden;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        z-index: -1;
        .bg {
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            transform: scale(1.2);
            filter: blur(40px) contrast(0.8) brightness(0.8);
        }
    }
    .center {
        width: 100%;
        .img {
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
                width: 200px;
                height: 200px;
                margin: 80px 0 10px 0;
                border-radius: 12px;
            }
            .name {
                font-size: 16px;
            }
        }
        .tag {
            margin-top: 30px;
            padding: 0 20px;
            font-size: 12px;
            .item {
                margin-right: 10px;
                padding: 2px 8px;
                background-color: rgba(grey, 0.3);
                border-radius: 8px;
            }
        }
        .description {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            margin-top: 20px;
            padding: 0 20px;
            font-size: 10px;
            line-height: 1.8;
        }
    }
    .save-cover {
        width: 70px;
        padding: 2px 10px;
        border: 1px solid #fff;
        border-radius: 12px;
        font-size: 12px;
    }
}
</style>