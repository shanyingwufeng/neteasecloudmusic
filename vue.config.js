module.exports = {
    publicPath: "./",
    outputDir: 'docs',

    css: {
        loaderOptions: {
            sass: {
                prependData: `
                    @import "@/assets/scss/variable.scss";
                    @import "@/assets/scss/mixin.scss";
                `
            }
        }
    }
}
