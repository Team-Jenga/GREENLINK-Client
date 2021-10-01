import instance from "./axoisInstance";

// 로그인- Login.js
export const postSignIn = (req) => {
    return instance({
        url: "/api/signin",
        method: "post",
        data: req
    });
};

// 회원가입 - Register.js
export const postSignUp = (req) => {
    return instance({
        url: "api/signup",
        method: "post",
        data: req
    });
};

// ID 중복체크 - Register.js
export const postCheckId = (req) => {
    return instance({
        url: "api/checkid",
        method: "post",
        data: req
    });
};

// 닉네임 중복체크 - Register.js
export const postCheckNickname = (req) => {
    return instance({
        url: "api/checknick",
        method: "post",
        data: req
    });
};

// 인증번호 메일 전송 - Register.js
export const postSendAuthNum = (req) => {
    return instance({
        url: "api/sendauth",
        method: "post",
        data: req
    })
}

export const postFindId = (req) => {
    return instance({
        url: "api/findid",
        method: "post",
        data: req
    })
}

export const postFindPw = (req) => {
    return instance({
        url: "api/findpw",
        method: "post",
        data: req
    })
}