const { createProxyMiddleware } = require('http-proxy-middleware');

// 한국환경공단 크롤링 proxy 설정
module.exports = function (app) {
    app.use(
        "/gethtml",
        createProxyMiddleware({
            target: "https://blog.naver.com/PostList.nhn?isHttpsRedirect=true&blogId=kecoprumy&from=postList&categoryNo=14",
            changeOrigin: true
        })
    );
}