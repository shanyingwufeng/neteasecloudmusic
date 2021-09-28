<template>
    <div class="captchaInputBox">
        <div class="confirm-warpper">
            <input ref="input" v-model="code" @blur="lose" type="number" />
            <div @click="focus" class="box">
                <div
                    v-for="(item, index) in loopDiv"
                    :key="index"
                    class="item"
                    :class="{ active: current == index }"
                >
                    {{ code[index] }}
                </div>
            </div>
        </div>
    </div>
</template>
 
<script>
export default {
    props: {
        size: {
            type: [String, Number],
            default: 4,
        },
    },
    data() {
        return {
            code: "",
            current: 0,
        };
    },
    watch: {
        code() {
            this.code = this.code.toString().slice(0, 4);
            this.current = this.code.length;
            this.$emit("input", this.code);
        },
    },
    computed: {
        maxLength() {
            return typeof this.size == "number" ? this.size : Number(this.size);
        },
        loopDiv() {
            return new Array(4);
        },
    },
    methods: {
        focus() {
            this.$refs.input.focus();
            var len = this.code.length;
            // 如果已经输满，点击则聚焦在最后一个字符
            if (len == 6) {
                this.current = this.code.length - 1;
            } else {
                this.current = this.code.length;
            }
        },
        //input失焦触发，等于-1防止出现size符合偶然情况，失焦后又聚焦某一div
        lose() {
            this.current = -1;
        },
    },
    mounted() {
        this.focus();
    },
};
</script>
 
<style scoped lang='scss'>
@keyframes cursor {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

.captchaInputBox {
    padding: 0 10px;
    .confirm-warpper {
        input {
            position: absolute;
            transform: scale(0);
        }
        .box {
            display: flex;
            justify-content: space-between;
            cursor: text;
            .item {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 50px;
                height: 50px;
                margin-right: 16px;
                border-bottom: 1px solid rgb(218, 218, 218);
                color: #444;
                font-size: 24px;
                &:last-child {
                    margin-right: 0;
                }
            }
            .item.active {
                border-bottom: 1px solid #333;
            }
            .item.active::before {
                content: "";
                position: absolute;
                top: 50%;
                left: 70%;
                transform: translate(-50%, -50%);
                height: 40px;
                width: 2px;
                background: #fff;
                animation: cursor 1s infinite;
            }
        }
    }
}
</style>
