import { request } from "@/api/request";

// 调用此接口，传入手机号码，可发送验证码
export function getPhoneVerificationCode(phoneNumber) {
    return request({
        url: "/captcha/sent?phone=" + phoneNumber,
    });
}

// 调用此接口 ,传入手机号码和验证码, 可校验验证码是否正确
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
