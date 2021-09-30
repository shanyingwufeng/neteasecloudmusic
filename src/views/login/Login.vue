<!-- 登录页面 -->
<template>
    <div class="login">
        <img src="@/assets/login-wangyilogo.jpg" />
        <!-- 向周围扩散的圆圈 -->
        <div class="circle">
            <div class="pulse1"></div>
            <div class="pulse2"></div>
        </div>
        <div class="content">
            <van-button
                type="primary"
                size="large"
                class="login-button"
                @click="$router.push('/phonelogin')"
                >手机号登录</van-button
            >
            <van-button
                type="primary"
                size="large"
                class="experience"
                @click="$router.push('/')"
                >立即体验</van-button
            >
            <div class="more-login">
                <div class="item" v-for="(item, id) in moreLogin" :key="id">
                    <span
                        class="iconfont"
                        :class="item.className"
                        @click="$router.push(`/${item.loginPath}`)"
                    ></span>
                </div>
            </div>
            <div class="info">
                <span>登录即已同意</span>
                <a href="#">《用户协议》</a>
                <a href="#">《隐私政策》</a>
                <a href="#">《儿童隐私政策》</a>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted } from "vue";
import { useStore } from 'vuex';

export default {
    name: "Login",
    setup() {
        const moreLogin = [
            { className: "icon-weixin1", loginPath: "wxlogin" },
            { className: "icon-dengluqqhover59a6de", loginPath: "qqlogin" },
            { className: "icon-weibo2", loginPath: "wblogin" },
            { className: "icon-wangyi", loginPath: "emaillogin" },
        ];

        const store = useStore();

        onMounted(() => {
            store.commit("bottom/setIsShow", false);
        });
        return { moreLogin };
    },
};
</script>

<style scoped lang='scss'>
@keyframes warn {
    0% {
        transform: scale(0);
        opacity: 0;
    }
    // 25% {
    //     transform: scale(1.4);
    //     opacity: 0.1;
    // }
    50% {
        transform: scale(1.5);
        opacity: 0.15;
    }
    // 75% {
    //     transform: scale(2.2);
    //     opacity: 0.1;
    // }
    100% {
        transform: scale(3);
        opacity: 0;
    }
}
.login {
    position: absolute;
    width: 100%;
    height: 100vh;
    background-color: #db2c19;
    z-index: 999;
    img {
        position: absolute;
        top: 34%;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    .circle {
        position: absolute;
        top: 34%;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 60px;
        /* 产生动画（向外扩散变大）的圆圈  */
        .pulse1 {
            position: absolute;
            width: 60px;
            height: 60px;
            border: 1px solid rgb(248, 189, 189);
            border-radius: 30px;
            z-index: 1;
            opacity: 0;
            animation: warn 3s linear 2s;
            animation-iteration-count: infinite;
        }
        .pulse2 {
            position: absolute;
            width: 60px;
            height: 60px;
            border: 1px solid rgb(248, 189, 189);
            border-radius: 30px;
            z-index: 1;
            opacity: 0;
            animation: warn 3s linear 6s;
            animation-iteration-count: infinite;
        }
    }
    .content {
        display: flex;
        flex-direction: column;
        position: absolute;
        width: 100%;
        bottom: 40px;
        padding: 0 40px;
        text-align: center;
        .login-button {
            height: 36px;
            margin-bottom: 14px;
            background-color: #fff;
            border: 0;
            border-radius: 20px;
            color: #db2c19;
            font-size: 14px;
        }
        .experience {
            height: 36px;
            border: 1px solid rgb(189, 189, 189);
            background-color: #db2c19;
            border-radius: 20px;
            color: #fff;
            font-size: 14px;
        }
        .more-login {
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin: 30px 0;
            .item {
                display: flex;
                .iconfont {
                    color: #fff;
                    font-size: 22px;
                }
            }
        }
        .info {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            color: #de6a5e;
            font-size: 6px;
            a {
                color: #fabab3;
            }
        }
    }
}
</style>