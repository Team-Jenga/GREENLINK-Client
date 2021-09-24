import instance from "./axoisInstance";

// 로그인
export const postSignIn = (req) => {
    return instance({
        url: "/api/signin",
        method: "post",
        data: req
    });
};

// 회원가입
export const postSignUp = (req) => {
    return instance({
        url: "api/signup",
        method: "post",
        data: req
    });
};

// ID 중복체크
export const postCheckId = (req) => {
    return instance({
        url: "api/checkid",
        method: "post",
        data: req
    });
};


// 닉네임 중복체크
export const postCheckNickname = (req) => {
    return instance({
        url: "api/checknick",
        method: "post",
        data: req
    });
};