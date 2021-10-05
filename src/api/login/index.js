import { request } from "@/api/request";
import { Toast } from "vant";

// 说明：调用此接口，实现登录
export function login({ account, password, loginWay }) {
    // 手机号和密码登录
    if (loginWay == "phonePassword") {
        return request({
            url: `/login/cellphone?phone=${account}&password=${password}`,
            timeout: 1000,
        }).catch(() => {
            Toast("登录失败！");
        });
    }

    // 手机验证码登录
    else if (loginWay == "phoneCaptcha") {
        console.log(account + " " + password);
        console.log("账号数据类型为：" + typeof account);
        console.log("密码数据类型为：" + typeof password);
        account = Number(account);
        password = Number(password);
        return request({
            url: `/login/cellphone?phone=${account}&captcha=${password}`,
            timeout: 1000,
            methods: "POST",
        }).catch(() => {
            Toast("登录失败！");
        });
    }

    // 邮箱账号和密码登录
    else if (loginWay == "email") {
        return request({
            url: `/login?email=${account}&password=${password}`,
            timeout: 1000,
        });
    } else {
        Toast("登录失败！");
        return false;
    }
}

// 说明：调用此接口，传入手机号码，可获取验证码
export function getPhoneCaptcha(phoneNumber) {
    return request({
        url: "/captcha/sent?phone=" + phoneNumber,
        timeout: 1000,
    });
}

// 说明：调用此接口，传入手机号码和验证码，可校验验证码是否正确
export function verifyPhoneCaptcha(phoneNumber, captcha) {
    return request({
        url: `/captcha/verify?phone=${phoneNumber}&captcha=${captcha}`,
    });
}

// 说明 : 调用此接口 , 可退出登录
export function logout() {
    return request({
        url: `/logout`,
    });
}
