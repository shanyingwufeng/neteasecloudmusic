<!-- 登录-手机号登录 -->
<template>
    <div class="phone-login">
        <div class="top">
            <span class="iconfont icon-cha-copy" @click="$router.go(-1)"></span>
            <span class="title">手机号登录</span>
        </div>
        <div class="center">
            <span class="title">登录体验更多精彩</span>
            <span class="desc">未注册手机号登录后将自动创建账号</span>
        </div>
        <div class="input-box">
            <input
                ref="getFocus"
                type="text"
                placeholder="请输入手机号"
                v-model="phone"
            />
            <van-button round block type="primary" @click="submit()">
                下一步
            </van-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "PhoneLogin",
    components: {},
    data() {
        return {
            phone: "",
        };
    },
    methods: {
        // async loginEvent() {
        //     let result = await this.$store.dispatch("login", {
        //         username: this.phone,
        //     });
        //     if (result.data.code == 200) {
        //         this.$router.push("/me");
        //     }
        // },
        submit() {
            if (this.phone == "") {
                this.$toast("请输入手机号");
                this.$refs.getFocus.focus();
            }
        },
    },
    mounted() {
        this.$refs.getFocus.focus();
    },
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
.phone-login {
    position: fixed;
    width: 100%;
    height: 100vh;
    padding: 10px;
    background-color: #fff;
    z-index: 999;
    .top {
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
    .center {
        display: flex;
        flex-direction: column;
        margin: 24px 0;
        .title {
            margin-bottom: 4px;
            font-size: 18px;
        }
        .desc {
            color: grey;
            font-size: 12px;
        }
    }
    .input-box {
        input {
            width: 100%;
            margin-bottom: 30px;
            padding-bottom: 8px;
            border: 0;
            border-bottom: 1px solid rgb(182, 180, 180);
            font-size: 14px;
            caret-color: red;
        }
        .van-button {
            height: 40px;
            background-color: red;
            border: 0;
            font-size: 16px;
        }
    }
}
</style>