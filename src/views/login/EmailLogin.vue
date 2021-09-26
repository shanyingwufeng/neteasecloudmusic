<!-- 邮箱登录 -->
<template>
    <div class="emailLogin">
        <div class="topBar">
            <span
                class="iconfont icon-zuojiantou"
                @click="$router.go(-1)"
            ></span>
            <span class="title">网易邮箱登录</span>
        </div>
        <div class="content">
            <input
                ref="emailInput"
                type="text"
                placeholder="请输入邮箱账号"
                v-model="email"
                class="emailInput"
            />
            <input
                type="password"
                placeholder="请输入密码"
                v-model="password"
                class="passwordInput"
            />
            <van-button round block type="primary" @click="submit()">
                登录
            </van-button>
            <div class="resetPassword">
                <a
                    href="https://id.163.com/mail/retrievepassword#/verifyAccount"
                    >重设密码</a
                >
            </div>
        </div>
    </div>
</template>

<script>
import { nextTick, onMounted, reactive, toRefs } from "vue";

export default {
    name: "EmailLogin",
    components: {},

    setup() {
        const state = reactive({
            emailInput: "",
        });

        onMounted(() => {
            state.emailInput.focus();
        });

        return { ...toRefs(state) };
    },
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        async loginEvent() {
            let result = await this.$store.dispatch("login", {
                username: this.email,
                password: this.password,
            });
            if (result.data.code == 200) {
                this.$router.push("/me");
            }
        },
        // add() {
        //     console.log("111");
        // }
    },
    // mounted() {
    //     this.$refs.getFocus.click();
    // },
    // watch: {
    //     $route(to) {
    //         if (to.path === "/") {
    //             location.reload();
    //         }
    //     },
    // },
};
</script>

<style scoped lang='scss'>
.emailLogin {
    position: fixed;
    width: 100%;
    height: 100vh;
    padding: var(--padding);
    padding-top: 20px;
    background-color: #fff;
    z-index: 999;
    .topBar {
        display: flex;
        align-items: center;
        .iconfont {
            margin-right: 14px;
            font-size: 26px;
        }
        .title {
            font-size: 20px;
        }
    }

    .content {
        margin-top: 50px;
        input {
            width: 100%;
            padding-bottom: 8px;
            border: 0;
            border-bottom: 1px solid rgb(182, 180, 180);
            font-size: 16px;
            caret-color: red;
        }
        input.emailInput {
            margin-bottom: 46px;
        }
        .van-button {
            height: 40px;
            margin-top: 34px;
            background-color: red;
            border: 0;
            font-size: 18px;
        }
        .resetPassword {
            margin-top: 20px;
            font-size: 14px;
            text-align: center;
            a {
                color: rgb(13, 127, 202);
                &:active {
                    color: rgb(13, 127, 202);
                }
            }
        }
    }
}
</style>
