<template>
    <div class="searchTop">
        <div class="search-input">
            <span
                class="iconfont icon-arrowLeft-fill"
                @click="$router.go('-1')"
            ></span>
            <input
                type="text"
                :placeholder="placeholder"
                @keydown.enter="saveKeyWord"
                v-model="searchKeyword"
            />
        </div>
        <div class="history" v-if="isHistoryShow">
            <span class="left">历史</span>
            <div class="center">
                <span
                    class="historyItem"
                    v-for="(item, i) in keywordList"
                    :key="i"
                    @click="historySearch(item)"
                >
                    {{ item }}
                </span>
            </div>
            <span
                class="iconfont icon-shanchu1 right"
                @click="deleteHistory"
            ></span>
        </div>
        <div class="playList">
            <div class="top" v-show="searchSongs.length !== 0">
                <div class="top-left">
                    <span class="iconfont icon-bofang"></span>
                    <span class="playAll">播放全部</span>
                    <span class="playListCount">(共{{ songsCount }}首)</span>
                </div>
            </div>
            <div class="detail">
                <div class="item" v-for="(item, i) in searchSongs" :key="i">
                    <div class="left">
                        <span class="id">{{ i + 1 }}</span>
                        <div class="content">
                            <div class="title">{{ item.name }}</div>
                            <div class="bottom">
                                <span class="author">
                                    <span>{{ item.artists[0].name }}</span>
                                </span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <span
                            class="iconfont icon-bofang"
                            @click="setPlayCurrentIndex(i)"
                        ></span>
                        <span class="iconfont icon-gengduo"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { search } from "@/api/index.js";
export default {
    name: "SearchTop",
    components: {},
    data() {
        return {
            placeholder: "陈奕迅",
            keywordList: [],
            searchKeyword: "",
            isHistoryShow: false,
            searchSongs: [],
            songsCount: 0,
        };
    },
    beforeMount() {
        this.keywordList = localStorage.keywordList
            ? JSON.parse(localStorage.keywordList)
            : [];
    },
    mounted() {
        if (localStorage.keywordList == "") {
            this.isHistoryShow = false;
        } else {
            this.isHistoryShow = true;
        }
    },
    methods: {
        async saveKeyWord() {
            let result = await search(this.searchKeyword);
            this.songsCount = result.data.result.songCount;
            this.searchSongs = result.data.result.songs;
            this.keywordList.push(this.searchKeyword);
            this.keywordList = Array.from(new Set(this.keywordList));
            localStorage.keywordList = JSON.stringify(this.keywordList);
            this.isHistoryShow = true;
        },
        deleteHistory() {
            this.$dialog
                .confirm({
                    message: "确定清除全部历史记录？",
                })
                .then(() => {
                    this.keywordList = [];
                    localStorage.keywordList = [];
                    this.isHistoryShow = false;
                    location.reload();
                })
                .catch(() => {});
        },
        historySearch(keyword) {
            this.searchKeyword = keyword;
            this.saveKeyWord();
        },
    },
};
</script>

<style scoped lang='scss'>
.searchTop {
    padding: 14px 10px 10px 10px;
    .search-input {
        display: flex;
        align-items: center;
        margin-bottom: 14px;
        .iconfont {
            margin-right: 10px;
            margin-top: 4px;
            color: #555;
            font-size: 20px;
        }
        input {
            width: 100%;
            outline: none;
            border: 0;
            border-bottom: 1px solid #333;
            font-size: 18px;
        }
    }
    .history {
        position: relative;
        display: flex;
        align-items: center;
        margin: 20px 0 10px 0;
        .left {
            width: 34px;
            margin-right: 4px;
            font-size: 14px;
            font-weight: 700;
        }
        .center {
            display: flex;
            flex-wrap: wrap;
            margin-top: 8px;
            margin-right: 20px;
            .historyItem {
                margin: 0 4px 8px 4px;
                padding: 2px 8px;
                background-color: rgb(222, 222, 222);
                color: #555;
                font-size: 12px;
                border-radius: 4px;
            }
        }
        .right {
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            color: grey;
            .iconfont {
                font-size: 12px;
            }
        }
    }
    .playList {
        .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 4px 0;
            .top-left {
                display: flex;
                align-items: center;
                .iconfont {
                    margin-right: 14px;
                    font-size: 18px;
                }
                .playAll {
                    font-size: 16px;
                    font-weight: 700;
                }
                .playListCount {
                    color: grey;
                    font-size: 12px;
                }
            }
        }
        .detail {
            margin-bottom: 50px;
            .item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 10px;
                padding: 4px 0;
                color: grey;
                .left {
                    display: flex;
                    align-items: center;
                    .id {
                        width: 14px;
                        margin-right: 18px;
                        color: grey;
                        font-size: 20px;
                    }
                    .content {
                        color: #333;
                        font-size: 14px;
                        .bottom {
                            color: #999;
                            font-size: 12px;
                        }
                    }
                }
                .right {
                    display: flex;
                    .iconfont {
                        margin-left: 6px;
                        font-size: 18px;
                    }
                }
            }
        }
    }
}
</style>