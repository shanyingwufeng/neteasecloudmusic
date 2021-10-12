<!-- 首页-新歌/新碟/数字专辑 -->
<template>
    <div class="homeNewSongAndNewAlbum">
        <van-tabs v-model:active="active">
            <van-tab title="新歌">
                <NewSong :data="newSong" />
            </van-tab>
            <van-tab title="新碟">
                <NewAlbum :data="newAlbum" />
            </van-tab>
            <van-tab title="数字专辑">
                <DigtalAlbum :data="digtalAlbum" />
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { reactive, watch, toRefs, onUpdated } from "vue";
import NewSong from "./NewSong.vue";
import NewAlbum from "./NewAlbum.vue";
import DigtalAlbum from "./DigtalAlbum.vue";

export default {
    name: "HomeNewSongAndNewAlbum",
    components: { NewSong, NewAlbum, DigtalAlbum },
    props: ["data"],
    setup(props) {
        const state = reactive({
            newSongAndNewAlbum: [],
            newSong: [],
            newAlbum: [],
            digtalAlbum: [],
            active: 0,
        });

        watch(
            () => props.data,
            (newValue) => {
                state.newSongAndNewAlbum = newValue.creatives;
            }
        );

        onUpdated(() => {
            state.newSong = state.newSongAndNewAlbum.filter(
                (item) => item.creativeType === "NEW_SONG_HOMEPAGE"
            );
            state.newAlbum = state.newSongAndNewAlbum.filter(
                (item) => item.creativeType === "NEW_ALBUM_HOMEPAGE"
            );
            state.digtalAlbum = state.newSongAndNewAlbum.filter(
                (item) => item.creativeType === "DIGITAL_ALBUM_HOMEPAGE"
            );
        });

        return { ...toRefs(state) };
    },
};
</script>

<style lang='scss'>
.homeNewSongAndNewAlbum {
    margin-bottom: 10px;
    padding-bottom: 2px;
    .van-tabs__nav {
        display: flex;
        align-items: center;
        padding-left: $padding;
        padding-top: 6px;
        padding-bottom: 0;
        border-radius: 10px;
        .van-tab {
            display: block;
            flex: 0.14;
            font-size: 18px;
            &::before {
                content: "";
                position: absolute;
                top: 50%;
                right: 5px;
                transform: translateY(-50%);
                width: 1px;
                height: 80%;
                background-color: rgb(201, 201, 201);
            }
            &:nth-last-child(2) {
                flex: 0.24;
            }
            &:nth-last-child(2)::before {
                width: 0;
            }
        }

        .van-tab--active {
            color: #000;
            font-weight: 700;
        }

        .van-tabs__line {
            display: none;
        }
    }
}
</style>
