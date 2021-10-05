<!-- 登录-手机号登录 -->
<template>
    <div class="phoneLogin">
        <div class="topBar">
            <div class="left">
                <span
                    v-if="isShowPhonePasswordInput"
                    class="iconfont icon-70BasicIcons-all-24"
                    @click="clickLeftJiantou()"
                ></span>
                <span
                    v-else
                    class="iconfont icon-cha-copy"
                    @click="$router.go(-1)"
                ></span>
                <span class="title">手机号登录</span>
            </div>
            <span
                class="right"
                v-if="hasVerificationCode"
                @click="showPhonePasswordInput()"
                >密码登录</span
            >
        </div>
        <div class="phoneNumberInput" v-if="!isShowPhonePasswordInput">
            <div class="title" v-if="!hasVerificationCode">
                <span class="name">登录体验更多精彩</span>
                <span class="desc">未注册手机号登录后将自动创建账号</span>
            </div>
            <div class="title" v-if="hasVerificationCode">
                <span class="name">请输入验证码</span>
                <div class="countDown">
                    <span class="desc">已发送至 {{ phoneNumber }}</span>
                    <span class="count" v-if="!sendCode">{{ count }}s</span>
                    <span
                        class="sendCodeAgain"
                        v-if="sendCode"
                        @click="submitAgain()"
                        >重新获取</span
                    >
                </div>
            </div>
            <div class="inputBox" v-if="!hasVerificationCode">
                <input
                    ref="phoneInput"
                    type="number"
                    placeholder="请输入手机号"
                    v-model="phoneNumber"
                    pattern="[0-9]*"
                />
                <van-button round block type="primary" @click="submit()">
                    下一步
                </van-button>
            </div>
            <div class="codeInputBox" v-if="hasVerificationCode">
                <CaptchaInputBox @input="input" />
                <!-- <div class="bottom">
                    <span class="name">手机号码已停用</span>
                    <div>
                        <span class="iconfont icon-youjiantou"></span>
                    </div>
                </div> -->
            </div>
        </div>
        <div class="phonePasswordInput" v-if="isShowPhonePasswordInput">
            <div class="inputBox">
                <input
                    ref="passwordInput"
                    type="password"
                    placeholder="请输入密码"
                    v-model="password"
                />
                <div class="forgetPassword">
                    <span class="text">忘记密码</span>
                    <span class="iconfont icon-qm"></span>
                </div>
                <van-button
                    round
                    block
                    :disabled="disabled"
                    type="primary"
                    @click="submitPassword()"
                >
                    登录
                </van-button>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive, toRefs, watch } from "vue";
import { Toast } from "vant";
import { getPhoneCaptcha, verifyPhoneCaptcha } from "@/api/login/index.js";
import CaptchaInputBox from "@/components/CaptchaInputBox.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
    name: "PhoneLogin",
    components: { CaptchaInputBox },
    setup() {
        const state = reactive({
            phoneNumber: "",
            phoneInput: "",
            hasVerificationCode: false,
            count: 60,
            sendCode: false,
            verificationCode: 0,
            isShowPhonePasswordInput: false,
            passwordInput: "",
            password: "",
            disabled: true,
        });
        const store = useStore();
        const router = useRouter();

        const input = (code) => {
            if (code.length >= 4) {
                code = code.slice(0, 4);
                verifyPhoneCaptcha(state.phoneNumber, code)
                    .then(async (res) => {
                        console.log(res.data);
                        if (res.data.data) {
                            const result = await store.dispatch("user/login", {
                                account: state.phoneNumber,
                                password: code,
                                loginWay: "phoneCaptcha",
                            });
                            if (result.data.code == 200) {
                                router.push("/me");
                            }
                        }
                    })
                    .catch(() => {
                        // Toast("登录失败");
                    });
            }
        };

        const startTimer = () => {
            const timer = setInterval(() => {
                if (state.count > 1) {
                    state.count--;
                } else {
                    state.sendCode = true;
                    clearInterval(timer);
                }
            }, 1000);
        };

        const submit = () => {
            state.hasVerificationCode = true; // 测试
            startTimer(); // 测试
            if (state.phoneNumber == "") {
                Toast("请输入手机号");
                state.phoneInput.focus();
                return false;
            } else if (state.phoneNumber.length !== 11) {
                Toast("请输入11位手机号");
                state.phoneInput.focus();
                return false;
            } else {
                // console.log("获取手机验证码-----");
                // getPhoneCaptcha(state.phoneNumber);
                // .then((res) => {
                //     if (res.data.data) {
                //         state.hasVerificationCode = true;
                //         startTimer();
                //     } else {
                //         Toast("每个手机号码一天只能获取5次验证码！");
                //         setTimeout(() => {
                //             location.reload();
                //         }, 3000);
                //     }
                // })
                // .catch((res) => {
                //     console.log(res);
                // });
            }
        };

        const submitAgain = () => {
            getPhoneVerificationCode(state.phoneNumber).then((res) => {
                if (res.data.data) {
                    startTimer();
                } else {
                    Toast("每个手机号码一天只能获取5次验证码！");
                    setInterval(() => {
                        location.reload();
                    }, 3000);
                }
            });
            state.sendCode = false;
            state.count = 60;
        };

        const submitPassword = async () => {
            const result = await store.dispatch("user/login", {
                account: state.phoneNumber,
                password: state.password,
                loginWay: "phonePassword",
            });
            if (result.data.code == 200) {
                router.push("/me");
            }
        };

        const showPhonePasswordInput = () => {
            state.isShowPhonePasswordInput = true;
            state.hasVerificationCode = false;
            setTimeout(() => {
                state.passwordInput.focus();
            }, 100);
        };

        const clickLeftJiantou = () => {
            state.isShowPhonePasswordInput = false;
            state.hasVerificationCode = true;
        };

        watch(
            () => state.password,
            (newValue) => {
                if (newValue == "") {
                    state.disabled = true;
                } else {
                    state.disabled = false;
                }
            }
        );

        onMounted(() => {
            state.phoneInput.focus();
        });

        return {
            ...toRefs(state),
            submit,
            submitAgain,
            input,
            showPhonePasswordInput,
            clickLeftJiantou,
            submitPassword,
        };
    },
};
</script>

<style scoped lang='scss'>
.phoneLogin {
    position: fixed;
    width: 100%;
    height: 100vh;
    padding: $padding;
    padding-top: 20px;
    background-color: $color-white-background;
    z-index: 999;
    .topBar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
            display: flex;
            align-items: center;
            width: 60%;
            .iconfont {
                width: 34px;
                margin-top: 2px;
                font-size: 18px;
            }
            .title {
                font-size: 18px;
            }
        }
        .right {
            padding: 4px 10px;
            border: 1px solid rgba($color: rgb(211, 211, 211), $alpha: 0.7);
            border-radius: 16px;
            color: #444;
            font-size: 10px;
        }
    }

    .phoneNumberInput {
        margin-top: 40px;
        .title {
            display: flex;
            flex-direction: column;
            margin-bottom: 30px;
            .name {
                margin-bottom: 8px;
                font-size: 18px;
            }
            .desc {
                color: rgb(155, 155, 155);
                font-size: 14px;
            }
            .countDown {
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: grey;
                font-size: 14px;
                .sendCodeAgain {
                    color: rgb(0, 153, 255);
                }
            }
        }
        .inputBox {
            input {
                width: 100%;
                margin-bottom: 34px;
                padding-bottom: 8px;
                border: 0;
                border-bottom: 1px solid rgb(180, 180, 180);
                font-size: 16px;
                caret-color: red;
            }
            .van-button {
                height: 40px;
                background-color: red;
                border: 0;
                font-size: 16px;
            }
        }
        .bottom {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 34px;
            color: grey;
        }
    }

    .phonePasswordInput {
        margin-top: 40px;
        .inputBox {
            position: relative;
            input {
                width: 100%;
                margin-bottom: 34px;
                padding-bottom: 8px;
                border: 0;
                border-bottom: 1px solid rgb(180, 180, 180);
                font-size: 16px;
                caret-color: red;
            }
            .forgetPassword {
                display: flex;
                position: absolute;
                top: 6px;
                right: 0;
                color: rgb(0, 153, 255);
                .text {
                    font-size: 14px;
                }
                .iconfont {
                    margin-top: -2px;
                    font-size: 16px;
                }
            }
            .van-button {
                height: 40px;
                background-color: red;
                border: 0;
                font-size: 16px;
            }
        }
    }
}
</style>