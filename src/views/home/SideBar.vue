<!-- 首页-侧边栏 -->
<template>
    <div class="side-bar">
        <router-link class="side-bar-top" to="/login">
            <div class="user">
                <span class="iconfont icon-user"></span>
                <span class="username">{{
                    $store.state.user.nickName
                        ? $store.state.user.nickName
                        : "立即登录"
                }}</span>
                <span class="iconfont icon-youjiantou"></span>
            </div>
            <span class="qrcode iconfont icon-richscan_icon"></span>
        </router-link>
        <div class="vip-page">
            <div class="vip-page-top">
                <div class="left">
                    <span class="title">开通黑胶VIP</span>
                    <div class="message">
                        <swiper
                            :autoplay="swiper_options.autoplay"
                            :loop="swiper_options.loop"
                            :speed="swiper_options.speed"
                            direction="vertical"
                        >
                            <swiper-slide
                                v-for="(item, i) in messages"
                                :key="i"
                            >
                                <span class="text">{{ item.text }}</span>
                            </swiper-slide>
                        </swiper>
                    </div>
                </div>
                <span class="right">会员中心</span>
            </div>
            <div class="bottom">
                <span>立享特惠，黑胶首月仅0.01元！</span>
                <img src="@/assets/logo.png" class="logo" />
            </div>
        </div>
        <van-cell-group inset>
            <van-cell title="我的消息" is-link icon="envelop-o" />
            <van-cell
                title="云贝中心"
                is-link
                value="做任务赚云贝"
                icon="after-sale"
            />
        </van-cell-group>
        <van-cell-group inset>
            <van-cell title="设置" is-link icon="setting-o" />
            <van-cell title="夜间模式" is-link icon="underway-o" />
            <van-cell title="定时关闭" is-link icon="clock-o" />
            <van-cell title="个性装扮" is-link icon="bag-o" />
            <van-cell title="边听边存" is-link value="未开启" icon="music-o" />
            <van-cell title="音乐黑名单" is-link icon="close" />
            <van-cell
                title="青少年模式"
                is-link
                value="未开启"
                icon="shield-o"
            />
        </van-cell-group>
        <van-cell-group inset>
            <van-cell title="我的客服" is-link icon="service-o" />
            <van-cell title="分享网易云音乐" is-link icon="share-o" />
            <van-cell title="关于" is-link icon="info-o" />
        </van-cell-group>
        <van-cell-group inset class="close">
            <van-cell
                v-if="$store.state.user.isLogin"
                title="退出登录/关闭"
                center
                @click="showPopup"
            />
            <van-cell v-else title="关闭云音乐" center />
            <van-popup
                v-model:show="show"
                round
                position="bottom"
                :style="{ height: '20%' }"
                teleport="#app"
                class="logout-close"
            >
                <div class="top">
                    <span>退出登录/关闭</span>
                </div>
                <div class="bottom">
                    <span>关闭云音乐</span>
                    <span @click="logoutAccount()">退出登录</span>
                </div>
            </van-popup>
        </van-cell-group>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { logout } from "@/api/login/index.js";

export default {
    name: "SideBar",
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        let messages = ref([
            { text: "开团享6折，邀好友赠送天数" },
            { text: "加入黑胶，彰显与众不同" },
            { text: "支付宝专享，黑胶0.01元起" },
            { text: "体验乐花卡，领黑胶vip" },
            { text: "立享21项专属特权" },
        ]);

        const show = ref(false);

        const logoutAccount = () => {
            logout().then((res) => {
                if (res.data.code == 200) {
                    localStorage.removeItem("userLoginInfo");
                    localStorage.removeItem("cookie");
                }
                location.reload();
            });
        };

        const showPopup = () => {
            show.value = true;
        };

        // swiper相关配置属性放在swiper_options这个变量里
        let swiper_options = reactive({
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            loop: true,
            speed: 400,
        });
        // 将swiper_options返回给模板中的swiper组件使用
        return { swiper_options, messages, show, logoutAccount, showPopup };
    },
};
</script>

<style lang='scss'>
.side-bar {
    .side-bar-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px 0;
        .user {
            display: flex;
            align-items: center;
            .icon-user {
                margin-right: 8px;
                color: red;
                font-size: 20px;
            }
            .username {
                font-size: 14px;
            }
            .icon-youjiantou {
                font-size: 12px;
            }
        }
        .qrcode {
            font-size: 16px;
        }
    }
    .vip-page {
        margin: 10px 0;
        padding: 10px;
        background: linear-gradient(to right, #333, #444, #555);
        border-radius: 10px;
        .vip-page-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 1px solid #635f5c;
            .left {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                .title {
                    color: #dfb78f;
                    font-size: 16px;
                }
                .message {
                    overflow: hidden;
                    height: 20px;
                    margin: 6px 0 4px 0;
                    .swiper-container {
                        .swiper-slide {
                            color: #ac8d6e;
                            font-size: 12px;
                        }
                    }
                }
            }
            .right {
                padding: 2px 4px;
                border: 1px solid #797169;
                border-radius: 10px;
                color: #ddc9b5;
                font-size: 12px;
            }
        }
        .bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 8px;
            color: #8a8076;
            font-size: 12px;
            .logo {
                width: 6%;
            }
        }
    }
    .van-cell-group {
        margin: 0;
        margin-bottom: 10px;
        .van-cell {
            padding: 10px;
            background-color: #fff;
        }
        .van-cell__value {
            font-size: 12px;
        }
    }
    .close {
        margin-bottom: 0;
        .van-cell {
            color: red;
            font-size: 16px;
            text-align: center;
        }
    }
}
</style>