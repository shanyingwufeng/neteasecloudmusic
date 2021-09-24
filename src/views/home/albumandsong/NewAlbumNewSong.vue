<!-- 首页-新歌/新碟/数字专辑 -->
<template>
    <div class="album-song">
        <van-tabs v-model:active="active">
            <van-tab title="新歌">
                <NewSong :newSong="newSong" />
            </van-tab>
            <van-tab title="新碟">
                <NewAlbum :newAlbum="newAlbum" />
            </van-tab>
            <van-tab title="数字专辑">
                <DigtalAlbum :digtalAlbum="digtalAlbum" />
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { onUpdated, watch, ref } from "vue";
import NewSong from "./NewSong.vue";
import NewAlbum from "./NewAlbum.vue";
import DigtalAlbum from "./DigtalAlbum.vue";

export default {
    name: "AlbumAndSong",
    components: { NewSong, NewAlbum, DigtalAlbum },
    props: ["data"],
    setup(props) {
        const newAlbumNewSong = ref([]);
        const newSong = ref([]);
        const newAlbum = ref([]);
        const digtalAlbum = ref([]);

        const active = ref(0);

        watch(newAlbumNewSong, () => {
            newSong.value = newAlbumNewSong.value.filter(
                (item) => item.creativeType === "NEW_SONG_HOMEPAGE"
            );
            newAlbum.value = newAlbumNewSong.value.filter(
                (item) => item.creativeType === "NEW_ALBUM_HOMEPAGE"
            );
            digtalAlbum.value = newAlbumNewSong.value.filter(
                (item) => item.creativeType === "DIGITAL_ALBUM_HOMEPAGE"
            );
        });

        onUpdated(() => {
            newAlbumNewSong.value = props.data.creatives;
        });
        return {
            newAlbumNewSong,
            newSong,
            newAlbum,
            digtalAlbum,
            active,
        };
    },
};
</script>

<style lang='scss'>
.album-song {
    margin-bottom: 10px;
    padding-bottom: 2px;
    .van-tabs__nav {
        display: flex;
        align-items: center;
        padding-left: var(--padding);
        padding-top: 6px;
        padding-bottom: 0;
        border-radius: 10px;
        .van-tab {
            display: block;
            flex: 0.14;
            font-size: 16px;
            &::before {
                content: "";
                position: absolute;
                top: 50%;
                right: 10px;
                transform: translateY(-50%);
                width: 1px;
                height: 80%;
                background-color: rgb(204, 201, 201);
            }
            &:nth-last-child(2) {
                flex: 0.2;
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
