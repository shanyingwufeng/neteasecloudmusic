// function remSize() {
//     let deviceWidth = document.documentElement.clientWidth || window.innerWidth;
//     if (deviceWidth >= 750) {
//         deviceWidth = 750;
//     }
//     if (deviceWidth <= 320) {
//         deviceWidth = 320;
//     }
//     document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px';
//     document.querySelector('body').style.fontSize = 0.3 + 'rem';
// }

// remSize();

// window.onresize = function () {
//     remSize();
// }

// (function (document, window) {
//     var dom = document.documentElement,
//         resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//         recalc = function () {
//             var clientWidth = dom.clientWidth;
//             if (!clientWidth) return;
//             if (clientWidth >= 1920) {
//                 dom.style.fontSize = 100 * (clientWidth / 1920) + 'px';
//             } else if (clientWidth >= 1680) {
//                 dom.style.fontSize = 100 * (clientWidth / 1680) + 'px';
//             } else if (clientWidth >= 1440) {
//                 dom.style.fontSize = 100 * (clientWidth / 1440) + 'px';
//             } else if (clientWidth >= 1280) {
//                 dom.style.fontSize = 100 * (clientWidth / 1280) + 'px';
//             }
//             else if (clientWidth >= 1263) {
//                 dom.style.fontSize = 100 * (clientWidth / 1263) + 'px';
//             } else {
//                 dom.style.fontSize = 100 * (clientWidth / 750) + 'px';
//             }
//         };

//     if (!document.addEventListener) return;
//     window.addEventListener(resizeEvt, recalc, false);
//     document.addEventListener('DOMContentLoaded', recalc, false);
// })(document, window);

// const baseSize = 32
// // 设置 rem 函数
// function setRem() {
//     // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
//     const scale = document.documentElement.clientWidth / 750
//     // 设置页面根节点字体大小
//     document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
// }
// // 初始化
// setRem()
// // 改变窗口大小时重新设置 rem
// window.onresize = function () {
//     setRem()
// }
