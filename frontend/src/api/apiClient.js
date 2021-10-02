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

// 이메일을 통한 아이디 찾기 - FindIdPw.js
export const postFindId = (req) => {
    return instance({
        url: "api/findid",
        method: "post",
        data: req
    })
}

// 아이디를 통한 임시 비밀번호 전송 - FindIdPw.js
export const postFindPw = (req) => {
    return instance({
        url: "api/findpw",
        method: "post",
        data: req
    })
}

// 회원정보 가져오기 - MyPage.js, ModifyMyInfo.js
export const getUserInfo = (id) => {
    return instance({
        url: `api/member/${id}`,
        method: "get"
    })
}

// 회원정보 수정 - MofifyMyInfo.js
export const putModifyUserInfo = (req, id) => {
    return instance({
        url: `api/member/${id}`,
        method: "put",
        data: req
    })
}

// 비밀번호 변경 - ModifyPw.js
export const putModifyPw = (req, id) => {
    return instance({
        url: `api/member/${id}/changepw`,
        method: "put",
        data: req
    })
}

// 캠페인 리스트 조회순으로 가져오기 - Home.js
export const getCampaignList = (order) => {
    return instance({
        url: "api/event",
        method: "get",
        params: order
    })
}

// 공지사항 조회 - Home.js
export const getNoticeList = () => {
    return instance({
        url: "api/notice",
        method: "get"
    })
}