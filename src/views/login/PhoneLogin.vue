<!-- 登录-手机号登录 -->
<template>
    <div class="phoneLogin">
        <div class="topBar">
            <div class="left">
                <span
                    class="iconfont icon-cha-copy"
                    @click="$router.go(-1)"
                ></span>
                <span class="title">手机号登录</span>
            </div>
            <span class="right" v-if="hasVerificationCode">密码登录</span>
        </div>
        <div class="phoneNumberInput">
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
                <div class="bottom">
                    <span class="name">手机号码已停用</span>
                    <div>
                        <span class="iconfont icon-youjiantou"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import { Toast } from "vant";
import {
    getPhoneVerificationCode,
    verifyPhoneCaptcha,
} from "@/api/login/index.js";
import CaptchaInputBox from "@/components/CaptchaInputBox.vue";

export default {
    name: "PhoneLogin",
    components: { CaptchaInputBox },
    setup() {
        const state = reactive({
            phoneNumber: "",
            phoneInput: "",
            hasVerificationCode: false,
            count: 10,
            sendCode: false,
            verificationCode: 0,
        });

        const input = (code) => {
            if (code.length >= 6) {
                state.verificationCode = code.slice(0, 6);
                verifyPhoneCaptcha(state.phoneNumber, verifyPhoneCaptcha).then(
                    (res) => {
                        console.log(res.data);
                    }
                );
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
            if (state.phoneNumber == "") {
                Toast("请输入手机号");
                state.phoneInput.focus();
                return false;
            } else if (state.phoneNumber.length !== 11) {
                Toast("请输入11位手机号");
                state.phoneInput.focus();
                return false;
            } else {
                getPhoneVerificationCode(state.phoneNumber).then((res) => {
                    console.log(res.data);
                    if (res.data.data) {
                        // state.phoneInput.focus();
                        state.hasVerificationCode = true;
                        startTimer();
                    }
                });
            }
        };

        const submitAgain = () => {
            getPhoneVerificationCode(state.phoneNumber).then((res) => {
                if (res.data.data) {
                    startTimer();
                }
            });
            state.sendCode = false;
            state.count = 10;
        };

        onMounted(() => {
            state.phoneInput.focus();
        });

        return {
            ...toRefs(state),
            submit,
            submitAgain,
            input,
        };
    },
};
</script>

<style scoped lang='scss'>
.phoneLogin {
    position: fixed;
    width: 100%;
    height: 100vh;
    padding: var(--padding);
    padding-top: 20px;
    background-color: #fff;
    z-index: 999;
    .topBar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
            .iconfont {
                margin-right: 14px;
                font-size: 16px;
                vertical-align: middle;
            }
            .title {
                font-size: 18px;
                vertical-align: middle;
            }
        }
        .right {
            padding: 4px 6px;
            border: 1px solid rgba($color: rgb(211, 211, 211), $alpha: 0.5);
            border-radius: 14px;
            color: #444;
            font-size: 10px;
        }
    }
    .phoneNumberInput {
        .title {
            display: flex;
            flex-direction: column;
            margin: 40px 0;
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
}
</style>