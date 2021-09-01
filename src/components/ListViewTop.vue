<!--  -->
<template>
    <div class="listVueTop">
        <div class="bg-box">
            <img
                class="bg"
                :style="{
                    'background-image': 'url(' + playlist.coverImgUrl + ')',
                }"
            />
        </div>
        <div class="listViewTopNav">
            <div class="left">
                <span
                    class="iconfont icon-arrowLeft-fill"
                    @click="$router.push('/')"
                ></span>
                <span class="title">歌单</span>
            </div>
            <div class="right">
                <span
                    class="iconfont icon-sousuo"
                    @click="$router.push('/search')"
                ></span>
                <span class="iconfont icon-gengduo"></span>
            </div>
        </div>
        <div class="content">
            <div class="top">
                <div class="top-left">
                    <img v-lazy="playlist.coverImgUrl" />
                    <div class="count">
                        <span class="iconfont icon-bofang"></span>
                        <span class="playCount">{{
                            changeValue(playlist.playCount)
                        }}</span>
                    </div>
                </div>
                <div class="top-right">
                    <span class="title">{{ playlist.name }}</span>
                    <div class="author">
                        <img class="header" v-lazy="author.avatarUrl" />
                        <span class="nickname">{{ author.nickname }}</span>
                        <span class="iconfont icon-youjiantou"></span>
                    </div>
                    <div class="description">{{ playlist.description }}</div>
                </div>
            </div>
            <div class="bottom">
                <div class="bottomItem">
                    <span class="iconfont icon-pinglun"></span>
                    <span>{{ playlist.commentCount }}</span>
                </div>
                <div class="bottomItem">
                    <span class="iconfont icon-fenxiang"></span>
                    <span>{{ playlist.shareCount }}</span>
                </div>
                <div class="bottomItem">
                    <span class="iconfont icon-xiazai"></span>
                    <span>下载</span>
                </div>
                <div class="bottomItem">
                    <span class="iconfont icon-duoxuan"></span>
                    <span>多选</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ListViewTop",
    components: {},
    props: ["playlist", "author"],
    setup() {
        const changeValue = (num) => {
            let res = 0;
            if (num > 100000000) {
                res = num / 100000000;
                res = res.toFixed(2) + "亿";
            } else if (num > 10000) {
                res = num / 10000;
                res = res.toFixed(2) + "万";
            }
            return res;
        };
        return { changeValue };
    },
};
</script>

<style scoped lang='scss'>
.listVueTop {
    padding: 10px;
    .bg-box {
        position: fixed;
        overflow: hidden;
        top: 0;
        left: 0;
        width: 100%;
        height: 400px;
        z-index: -1;
        .bg {
            width: 100%;
            height: 100%;
            background-repeat: no-repeat;
            background-size: cover;
            filter: blur(30px);
            transform: scale(1.5);
            background-position: 50%;
        }
        .bg::after {
            content: "";
            display: block;
            width: 100%;
            height: 400px;
            background: rgba(17, 17, 17, 0.2);
            z-index: 1;
        }
    }
    .listViewTopNav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6px 0;
        color: #fff;
        .left {
            display: flex;
            align-items: center;
            font-size: 16px;
            .iconfont {
                margin-right: 16px;
                font-size: 22px;
            }
        }
        .right {
            display: flex;
            align-items: center;
            .icon-sousuo {
                margin-right: 20px;
            }
            .iconfont {
                font-size: 18px;
            }
        }
    }
    .content {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-top: 10px;
        .top {
            display: flex;
            margin: 10px 0 18px 0;
            padding-right: 30px;
            .top-left {
                position: relative;
                display: flex;
                align-items: center;
                margin-right: 10px;
                img {
                    width: 90px;
                    border-radius: 8px;
                }
                .count {
                    position: absolute;
                    display: flex;
                    align-items: center;
                    top: 4px;
                    right: 4px;
                    color: #fff;
                    font-size: 10px;
                    .iconfont {
                        margin-right: 4px;
                    }
                }
            }
            .top-right {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .title {
                    color: #fff;
                    font-size: 14px;
                    font-weight: 700;
                }
                .author {
                    display: flex;
                    align-items: center;
                    color: rgb(235, 233, 233);
                    font-size: 12px;
                    font-weight: 700;
                    .header {
                        width: 24px;
                        height: 24px;
                        margin: 4px 0;
                        border-radius: 50%;
                    }
                    .nickname {
                        margin: 0 4px 0 8px;
                    }
                    .iconfont {
                        font-size: 10px;
                    }
                }
                .description {
                    overflow: hidden;
                    color: rgb(233, 231, 231);
                    font-size: 10px;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }
        }
        .bottom {
            display: flex;
            justify-content: space-around;
            color: rgb(235, 232, 232);
            text-align: center;
            .bottomItem {
                display: flex;
                flex-direction: column;
                font-size: 12px;
                .iconfont {
                    margin-bottom: 4px;
                    font-size: 18px;
                }
            }
        }
    }
}
</style>