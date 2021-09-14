<!-- 邮箱登录 -->
<template>
    <div class="email-login">
        <div class="top">
            <span
                class="iconfont icon-jiantoujinggao"
                @click="$router.go(-1)"
            ></span>
            <span class="title">网易邮箱登录</span>
        </div>
        <div class="content">
            <input
                ref="getFocus"
                type="text"
                placeholder="请输入邮箱地址"
                v-model="username"
                @click="add()"
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
    name: "EmailLogin",
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
.email-login {
    position: fixed;
    width: 100%;
    height: 100vh;
    padding: 10px;
    background-color: #fff;
    z-index: 999;
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
        margin-top: 10px;
        padding: 0 10px;
        input {
            width: 100%;
            margin-bottom: 6px;
            padding-bottom: 8px;
            border: 0;
            border-bottom: 1px solid rgb(182, 180, 180);
            font-size: 14px;
            caret-color: red;
        }
        button {
            width: 100%;
            margin-top: 24px;
            padding: 4px 0;
            background-color: red;
            border: 0;
            border-radius: 6px;
            color: #fff;
            font-size: 22px;
        }
    }
}
</style>