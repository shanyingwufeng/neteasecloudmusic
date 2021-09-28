<!-- 搜索页-音乐专区 -->
<template>
    <div class="musicZone">
        <div class="name">音乐专区</div>
        <div class="list">
            <div
                :class="{ item: isItemShow(id) }"
                v-for="(item, id) in list"
                :key="id"
                :style="{ background: item.background }"
            >
                <div
                    class="content"
                    :class="{
                        hasSubtitle: item.subTitle,
                        noSubtitle: !item.subTitle,
                    }"
                    v-if="id < showId"
                >
                    <div class="top">
                        <div class="title">{{ item.title }}</div>
                        <div>
                            <span :class="item.className"></span>
                        </div>
                    </div>
                    <span class="bottom">{{ item.subTitle }}</span>
                </div>
            </div>
            <div class="more" @click="action" v-if="moreShow">
                <span class="name">展开更多专区</span>
                <span class="iconfont icon-jiantou9"></span>
            </div>
            <div class="more" @click="action" v-if="!moreShow">
                <span class="name">隐藏更多专区</span>
                <span class="iconfont icon--up"></span>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
    name: "MusicZone",
    setup() {
        const state = reactive({
            list: [
                {
                    id: 1,
                    title: "歌手分类",
                    background: "linear-gradient(to right,#8A7C75,#DACCC5)",
                    className: "iconfont icon-ttpodicon",
                },
                {
                    id: 2,
                    title: "曲风分类",
                    subTitle: "查查你的专属曲风偏好",
                    background: "linear-gradient(to right,#E65342,#F4AFA1)",
                    className: "iconfont icon-qufeng",
                },
                {
                    id: 3,
                    title: "影视原声专区",
                    subTitle: "听歌追剧好时光",
                    background: "linear-gradient(to right,#BA5029,#EABA8B)",
                    className: "iconfont icon-iconweibiaoti2zhuanhuan",
                },
                {
                    id: 4,
                    title: "电音专区",
                    subTitle: "全球热门电音嗨翻现场",
                    background: "linear-gradient(to right,#4D3DEC,#8BCFEE)",
                    className: "iconfont icon-qufeng",
                },
                {
                    id: 5,
                    title: "说唱专区",
                    subTitle: "说唱人物志Vol.6 Travis Scott",
                    background: "linear-gradient(to right,#E74C29,#F5BC78)",
                    className: "iconfont icon-RAP",
                },
                {
                    id: 6,
                    title: "摇滚专区",
                    subTitle: "国摇新声势力等你来听",
                    background: "linear-gradient(to right,#220771,#953097)",
                    className: "iconfont icon-yaogun",
                },
                {
                    id: 7,
                    title: "古典专区",
                    subTitle: "大咖来了Vol.2:古典VS流行",
                    background: "linear-gradient(to right,#8B5149,#E7C4AE)",
                    className: "iconfont icon-gangqin-copy",
                },
                {
                    id: 8,
                    title: "ACG专区",
                    subTitle: "测测你的ACG大粉头吗",
                    background: "linear-gradient(to right,#D85E74,#F6C9C7)",
                    className: "iconfont icon-weibiaoti-1",
                },
                {
                    id: 9,
                    title: "DJ专区",
                    subTitle: "潮流网络热歌一网打尽",
                    background: "linear-gradient(to right,#7856D3,#CBAEED)",
                    className: "iconfont icon-dj",
                },
                {
                    id: 10,
                    title: "亲子专区",
                    subTitle: "陪伴宝贝快乐成长",
                    background: "linear-gradient(to right,#DB9457,#EBD2A6)",
                    className: "iconfont icon-qinzi",
                },
                {
                    id: 11,
                    title: "中国特色专区",
                    subTitle: "了解中国传统音乐文化",
                    background: "linear-gradient(to right,#CA375E,#E58995)",
                    className: "iconfont icon-pipa",
                },
                {
                    id: 12,
                    title: "经典专区",
                    subTitle: "致敬时代 留住经典",
                    background: "linear-gradient(to right,#BA9D54,#E1D0A4)",
                    className: "iconfont icon-cidai1-copy",
                },
            ],
            showId: 6,
            moreShow: true,
        });

        const isItemShow = (id) => {
            if (id < state.showId) {
                return true;
            }
        };

        const action = () => {
            if (state.moreShow == true) {
                state.showId = state.list.length;
            } else {
                state.showId = 6;
            }
            state.moreShow = !state.moreShow;
        };

        return { ...toRefs(state), action, isItemShow };
    },
};
</script>

<style scoped lang='scss'>
.musicZone {
    margin-top: 20px;
    padding-bottom: 60px;
    .name {
        margin-bottom: 10px;
        font-size: 14px;
    }
    .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        .item {
            flex: 40%;
            display: flex;
            margin-right: 10px;
            margin-bottom: 10px;
            background-color: $color-white-background;
            border-radius: 6px;
            .content.hasSubtitle {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding: 8px 10px;
                color: #fff;
                .top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 6px;
                    border-bottom: 1px solid
                        rgba($color: rgb(223, 223, 223), $alpha: 0.1);
                    .title {
                        font-size: 14px;
                    }
                    .iconfont {
                        font-size: 16px;
                        font-weight: 700;
                    }
                }
                .bottom {
                    margin-top: 6px;
                    color: rgba($color: #fff, $alpha: 0.6);
                    font-size: 8px;
                }
            }
            .content.noSubtitle {
                flex: 1;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px 10px;
                .top {
                    flex: 1;
                    display: flex;
                    justify-content: space-between;
                    color: #fff;
                    font-size: 14px;
                    .iconfont {
                        font-size: 16px;
                        font-weight: 700;
                    }
                }
            }
            &:nth-child(even) {
                margin-right: 0;
            }
        }
        .more {
            margin-top: 6px;
            color: grey;
            text-align: center;
            .name {
                font-size: 12px;
            }
            .iconfont {
                margin-left: 4px;
                font-size: 10px;
            }
        }
    }
}
</style>
