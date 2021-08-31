<!-- 登录 -->
<template>
    <div class="login">
        <div class="top">
            <span
                class="iconfont icon-jiantoujinggao"
                @click="$router.push('/')"
            ></span>
            <span class="title">手机号码登录</span>
        </div>
        <div class="content">
            <input
                ref="getFocus"
                type="text"
                placeholder="请输入手机号码"
                v-model="username"
            />
            <input
                type="password"
                placeholder="请输入密码"
                v-model="password"
            />
            <button @click="loginEvent">登录</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    components: {},
    data() {
        return {
            username: "",
            password: "",
        };
    },
    methods: {
        async loginEvent() {
            let result = await this.$store.dispatch("login", {
                username: this.username,
                password: this.password,
            });
            if (result.data.code == 200) {
                this.$router.push("/me");
            }
        },
    },
    // mounted() {
    //     // this.$refs.getFocus.focus();
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
.login {
    .top {
        padding: 0 10px;
        .iconfont {
            margin-right: 10px;
            font-size: 20px;
        }
        .title {
            font-size: 18px;
        }
    }

    .content {
        padding: 0 10px;
        input {
            width: 100%;
            margin-bottom: 6px;
            padding-bottom: 4px;
            border: 0;
            border-bottom: 1px solid rgb(182, 180, 180);
            font-size: 14px;
            caret-color: red;
        }
        button {
            width: 100%;
            margin-top: 24px;
            padding: 6px 0;
            background-color: red;
            border: 0;
            border-radius: 6px;
            color: #fff;
            font-size: 22px;
        }
    }
}
</style>