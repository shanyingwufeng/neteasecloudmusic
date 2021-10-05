module.exports = {
    publicPath: "./",
    outputDir: "docs",

    css: {
        loaderOptions: {
            sass: {
                prependData: `
                    @import "@/assets/scss/variable.scss";
                    @import "@/assets/scss/mixin.scss";
                `,
            },
        },
    },

    // // 跨域
    // devServer: {
    //     open: true, // 自动启动浏览器
    //     host: "0.0.0.0",
    //     port: 8080,
    //     https: false,
    //     hotOnly: false, // webpack已经默认开启，这里false
    //     proxy: {
    //         // 配置跨域
    //         "/api": {
    //             target: "https://cloudmusicapi.shanyingwufeng.com", // 打包后接口地址
    //             ws: true,
    //             // 允许跨域
    //             changOrigin: true,
    //             // 重写路径
    //             pathRewrite: {
    //                 "^/api": "",
    //             },
    //         },
    //     },
    //     before: (app) => {},
    // },
};
