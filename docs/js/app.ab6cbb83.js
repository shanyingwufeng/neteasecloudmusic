(function(e){function t(t){for(var a,c,u=t[0],i=t[1],s=t[2],l=0,d=[];l<u.length;l++)c=u[l],Object.prototype.hasOwnProperty.call(r,c)&&r[c]&&d.push(r[c][0]),r[c]=0;for(a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a]);b&&b(t);while(d.length)d.shift()();return o.push.apply(o,s||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,c=1;c<n.length;c++){var u=n[c];0!==r[u]&&(a=!1)}a&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var a={},c={app:0},r={app:0},o=[];function u(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-0067600c":"cc85ff70","chunk-063a7d30":"9c1b4983","chunk-206854ec":"895483a4","chunk-3515a1c4":"9e14fdb7","chunk-3f84be02":"ca070b80","chunk-43e15636":"b31f1de8","chunk-5971e081":"84bb9fe1","chunk-63524b78":"026b00df","chunk-86ea940e":"ceb36af9","chunk-93762d0a":"1a1a4959","chunk-9730bd48":"72c12bc3","chunk-b249dd22":"7e4b7833","chunk-bf53d6f0":"baaeee9e","chunk-c7e6bc0e":"2de3e844","chunk-2b209d6f":"7d102b03","chunk-72a15352":"c0822233"}[e]+".js"}function i(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-0067600c":1,"chunk-063a7d30":1,"chunk-206854ec":1,"chunk-3515a1c4":1,"chunk-3f84be02":1,"chunk-43e15636":1,"chunk-5971e081":1,"chunk-63524b78":1,"chunk-86ea940e":1,"chunk-93762d0a":1,"chunk-9730bd48":1,"chunk-b249dd22":1,"chunk-bf53d6f0":1,"chunk-c7e6bc0e":1,"chunk-2b209d6f":1,"chunk-72a15352":1};c[e]?t.push(c[e]):0!==c[e]&&n[e]&&t.push(c[e]=new Promise((function(t,n){for(var a="css/"+({}[e]||e)+"."+{"chunk-0067600c":"dd625ae3","chunk-063a7d30":"60248601","chunk-206854ec":"6942bfa1","chunk-3515a1c4":"6c69a396","chunk-3f84be02":"4777c5aa","chunk-43e15636":"d31af94d","chunk-5971e081":"c901948b","chunk-63524b78":"d31af94d","chunk-86ea940e":"191d0c99","chunk-93762d0a":"8555aeb6","chunk-9730bd48":"fb176805","chunk-b249dd22":"d31af94d","chunk-bf53d6f0":"ddbf348d","chunk-c7e6bc0e":"e6af7727","chunk-2b209d6f":"301a8847","chunk-72a15352":"221faee3"}[e]+".css",r=i.p+a,o=document.getElementsByTagName("link"),u=0;u<o.length;u++){var s=o[u],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===a||l===r))return t()}var d=document.getElementsByTagName("style");for(u=0;u<d.length;u++){s=d[u],l=s.getAttribute("data-href");if(l===a||l===r)return t()}var b=document.createElement("link");b.rel="stylesheet",b.type="text/css",b.onload=t,b.onerror=function(t){var a=t&&t.target&&t.target.src||r,o=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=a,delete c[e],b.parentNode.removeChild(b),n(o)},b.href=r;var f=document.getElementsByTagName("head")[0];f.appendChild(b)})).then((function(){c[e]=0})));var a=r[e];if(0!==a)if(a)t.push(a[2]);else{var o=new Promise((function(t,n){a=r[e]=[t,n]}));t.push(a[2]=o);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=u(e);var d=new Error;s=function(t){l.onerror=l.onload=null,clearTimeout(b);var n=r[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),c=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+a+": "+c+")",d.name="ChunkLoadError",d.type=a,d.request=c,n[1](d)}r[e]=void 0}};var b=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},i.m=e,i.c=a,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var d=0;d<s.length;d++)t(s[d]);var b=l;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"053b":function(e,t,n){"use strict";n.d(t,"d",(function(){return o})),n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return i})),n.d(t,"e",(function(){return s})),n.d(t,"a",(function(){return l}));n("e7e5");var a=n("d399"),c=(n("99af"),n("0c6d")),r=localStorage.getItem("cookie");function o(e){return Object(c["a"])({url:"/song/detail?ids="+e}).catch((function(){Object(a["a"])("获取歌曲失败！")}))}function u(e){return Object(c["a"])({url:"/lyric?id="+e})}function i(e){return Object(c["a"])({url:"/comment/music?id=".concat(e)})}function s(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return Object(c["a"])({url:"/like?id=".concat(e,"&like=").concat(t,"&cookie=").concat(r)})}function l(e){return Object(c["a"])({url:"/likelist?uid=".concat(e,"&cookie=").concat(r,"&timestamp=").concat(Date.parse(new Date))})}},"0c6d":function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var a=n("bc3a"),c=n.n(a);function r(e){var t=c.a.create({baseURL:"https://cloudmusicapi.shanyingwufeng.com",timeout:3e4});return t(e)}},"183b":function(e,t,n){e.exports=n.p+"img/disc.2aa9bb90.png"},"23a1":function(e,t,n){"use strict";n("3abf")},"2f3b":function(e,t,n){"use strict";n.d(t,"c",(function(){return c})),n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return o}));var a=n("0c6d");function c(){return Object(a["a"])({url:"/homepage/block/page"})}function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return Object(a["a"])({url:"/banner?type="+e})}function o(){return Object(a["a"])({url:"/homepage/dragon/ball"})}},"3abf":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("5f1a");var a=n("a3e2"),c=(n("e7e5"),n("d399")),r=(n("537a"),n("ac28")),o=(n("a52c"),n("2ed4")),u=(n("8a58"),n("e41f")),i=(n("c194"),n("7744")),s=(n("0653"),n("34e9")),l=(n("e17f"),n("2241")),d=(n("ac1e"),n("543e")),b=(n("66b9"),n("b650")),f=(n("da3c"),n("0b33")),p=(n("bda7"),n("5e46")),h=(n("be7f"),n("565f")),m=(n("7844"),n("5596")),g=(n("4b0a"),n("2bb1")),y=(n("ab71"),n("58e6")),O=(n("2b28"),n("9ed2")),k=(n("0cc8"),n("3104")),j=(n("1075"),n("f600")),v=(n("414a"),n("7a82")),S=(n("0209"),n("7d5e")),w=(n("2994"),n("2bdd")),P=(n("c3a6"),n("ad06")),L=(n("66cf"),n("343b")),I=(n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("7a23"));function A(e,t,n,a,c,r){var o=Object(I["I"])("router-view"),u=Object(I["I"])("Bottom"),i=Object(I["I"])("Audio");return Object(I["A"])(),Object(I["g"])(I["a"],null,[Object(I["k"])(o,null,{default:Object(I["S"])((function(t){var n=t.Component;return[(Object(I["A"])(),Object(I["g"])(I["b"],null,[e.$route.meta.keepAlive?(Object(I["A"])(),Object(I["g"])(Object(I["K"])(n),{key:e.$route.path})):Object(I["h"])("",!0)],1024)),e.$route.meta.keepAlive?Object(I["h"])("",!0):(Object(I["A"])(),Object(I["g"])(Object(I["K"])(n),{key:0}))]})),_:1}),Object(I["k"])(u),Object(I["k"])(i)],64)}n("b0c0");var B=n("183b"),R=n.n(B),x=Object(I["W"])("data-v-7147b1d9");Object(I["D"])("data-v-7147b1d9");var H={key:0,class:"bottom"},T={key:0,class:"playControl"},D={class:"recode"},_=Object(I["k"])("img",{src:R.a,class:"cd"},null,-1),N={class:"songAndAuthor"},C={class:"title"},E={class:"author"},U={class:"right"},J=Object(I["k"])("span",{class:"iconfont icon-bofangliebiao more"},null,-1),K={key:1,class:"tabBar"},q=Object(I["k"])("span",{class:"iconfont icon-home"},null,-1),z=Object(I["k"])("span",{class:"title"},"发现",-1),M=Object(I["k"])("span",{class:"iconfont icon-wangluobokeneironghezuo"},null,-1),$=Object(I["k"])("span",{class:"title"},"播客",-1),F=Object(I["k"])("span",{class:"iconfont icon-yinle1"},null,-1),W=Object(I["k"])("span",{class:"title"},"我的",-1),V=Object(I["k"])("span",{class:"iconfont icon-dilanxianxingiconyihuifu_huabanfuben"},null,-1),G=Object(I["k"])("span",{class:"title"},"关注",-1),Q=Object(I["k"])("span",{class:"iconfont icon-cunzhuangshenbao"},null,-1),X=Object(I["k"])("span",{class:"title"},"云村",-1);Object(I["B"])();var Y=x((function(e,t,n,a,c,r){var o=Object(I["I"])("router-link"),u=Object(I["J"])("lazy");return e.$route.meta.hiddenBottom?Object(I["h"])("",!0):(Object(I["A"])(),Object(I["g"])("div",H,[a.playSong.id?(Object(I["A"])(),Object(I["g"])("div",T,[Object(I["k"])(o,{class:"left",to:{path:"/playpage",query:{id:a.playSong.id,from:"bottom"}}},{default:x((function(){return[Object(I["k"])("div",D,[_,Object(I["T"])(Object(I["k"])("img",{class:["songImg",{songImgRoute:a.play,pause:!a.playState}]},null,2),[[u,a.playSong.imgUrl]])]),Object(I["k"])("div",N,[Object(I["k"])("span",C,Object(I["M"])(a.playSong.name)+" - ",1),Object(I["k"])("span",E,Object(I["M"])(a.playSong.author),1)])]})),_:1},8,["to"]),Object(I["k"])("div",U,[a.playState?(Object(I["A"])(),Object(I["g"])("span",{key:1,class:"iconfont icon-zantingtingzhi bofang",onClick:t[2]||(t[2]=function(e){return a.play(a.playState)})})):(Object(I["A"])(),Object(I["g"])("span",{key:0,class:"iconfont icon-bofang6 bofang",onClick:t[1]||(t[1]=function(e){return a.play(a.playState)})})),J])])):Object(I["h"])("",!0),e.$route.meta.hiddenBottomTabBar?Object(I["h"])("",!0):(Object(I["A"])(),Object(I["g"])("div",K,[Object(I["k"])(o,{class:"item",to:"/"},{default:x((function(){return[q,z]})),_:1}),Object(I["k"])(o,{class:"item",to:"/podcast"},{default:x((function(){return[M,$]})),_:1}),Object(I["k"])(o,{class:"item",to:"/me"},{default:x((function(){return[F,W]})),_:1}),Object(I["k"])(o,{class:"item",to:"/follow"},{default:x((function(){return[V,G]})),_:1}),Object(I["k"])(o,{class:"item",to:"/village"},{default:x((function(){return[Q,X]})),_:1})]))]))})),Z=n("5530"),ee=n("5502"),te={name:"Bottom",setup:function(){var e=Object(I["E"])({play:!0}),t=Object(ee["b"])(),n=function(e){e?t.commit("play/setPlayState",!1):t.commit("play/setPlayState",!0)};return Object(Z["a"])(Object(Z["a"])({},Object(I["N"])(e)),{},{play:n,playState:Object(I["e"])((function(){return t.state.play.playState})),bottomShow:Object(I["e"])((function(){return t.state.bottom.visible})),playSong:Object(I["e"])((function(){return t.getters["play/getPlaySong"]}))})}},ne=(n("bacf"),n("d959")),ae=n.n(ne);const ce=ae()(te,[["render",Y],["__scopeId","data-v-7147b1d9"]]);var re=ce,oe=Object(I["W"])("data-v-b0d7d546");Object(I["D"])("data-v-b0d7d546");var ue={key:0,class:"audio"};Object(I["B"])();var ie=oe((function(e,t,n,a,c,r){return a.id?(Object(I["A"])(),Object(I["g"])("div",ue,[Object(I["k"])("audio",{ref:"audio",src:"https://music.163.com/song/media/outer/url?id=".concat(a.id,".mp3")},null,8,["src"])])):Object(I["h"])("",!0)})),se={name:"Audio",setup:function(){var e=Object(ee["b"])(),t=Object(I["F"])(null),n=Object(I["F"])(0),a=Object(I["e"])((function(){return e.state.play.playState}));Object(I["R"])(a,(function(){a.value?(t.value.play(),c()):(t.value.pause(),clearInterval(n.value))}));var c=function(){e.commit("play/setPlayCurrentTime",0),n.value=setInterval((function(){e.commit("play/setPlayCurrentTime",t._value.currentTime)}),1e3)};return{audio:t,id:Object(I["e"])((function(){return e.state.play.playSong.id}))}}};const le=ae()(se,[["render",ie],["__scopeId","data-v-b0d7d546"]]);var de=le,be=n("5c40"),fe={name:"App",components:{Bottom:re,Audio:de},setup:function(){Object(be["D"])((function(){document.addEventListener("plusready",(function(){var e=plus.webview.currentWebview();plus.key.addEventListener("backbutton",(function(){e.canBack((function(t){if(t.canBack)e.back();else{var n=null;plus.key.addEventListener("backbutton",(function(){n?(new Date).getTime()-n<1500&&plus.runtime.quit():(n=(new Date).getTime(),Object(c["a"])("再按一次退出"),setTimeout((function(){n=null}),1e3))}),!1)}}))}))}))}))}};n("23a1");const pe=ae()(fe,[["render",A]]);var he=pe,me=(n("d3b7"),n("3ca3"),n("ddb0"),n("6c02")),ge=n("2f3b"),ye=function(){return{homeData:"",homePageRefresh:!1}},Oe={},ke={setHomeData:function(e,t){e.homeData=t},setHomePageRefresh:function(e,t){e.homePageRefresh=t}},je={getHomeData:function(e){var t=e.commit;Object(ge["c"])().then((function(e){t("setHomeData",e.data.data.blocks)}))}},ve={namespaced:!0,state:ye,getters:Oe,mutations:ke,actions:je},Se=n("1da1"),we=(n("d81d"),n("96cf"),n("053b")),Pe=n("c32a"),Le=n("0c6d");function Ie(e){return Object(Le["a"])({url:"/album/?id=".concat(e)})}var Ae=function(){return{playState:!1,playCurrentTime:0,playSong:{id:0,name:"",author:"",imgUrl:"",lyric:""},playList:"",album:"",songList:"",songIds:""}},Be={getPlaySong:function(e){return localStorage.getItem("playSong")&&(e.playSong=JSON.parse(localStorage.getItem("playSong"))),e.playSong},getPlayList:function(e){return localStorage.getItem("playList")&&(e.playList=JSON.parse(localStorage.getItem("playList"))),e.playList},getPlayState:function(e){return e.playState},getSongIds:function(e){return e.songIds}},Re={setPlayState:function(e,t){e.playState=t},setPlaySongLyric:function(e,t){e.playSong.lyric=t},setPlaySong:function(e,t){localStorage.setItem("playSong",JSON.stringify(t)),e.playSong=t},setPlayCurrentTime:function(e,t){e.playCurrentTime=t},setPlayList:function(e,t){e.playList=t},setAlbum:function(e,t){e.album=t},setSongList:function(e,t){e.songList=t},setSongIds:function(e,t){e.songIds=t}},xe={getLyric:function(e,t){return Object(Se["a"])(regeneratorRuntime.mark((function n(){var a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=e.commit,n.next=3,Object(we["b"])(t).then((function(e){a("setPlaySongLyric",e.data.lrc.lyric)}));case 3:case"end":return n.stop()}}),n)})))()},setPlayList:function(e,t){return Object(Se["a"])(regeneratorRuntime.mark((function n(){var a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=e.commit,n.next=3,Object(Pe["b"])(t).then((function(e){a("setPlayList",e.data.playlist),a("setSongIds",e.data.playlist.trackIds.map((function(e){return e.id})))}));case 3:case"end":return n.stop()}}),n)})))()},setAlbum:function(e,t){return Object(Se["a"])(regeneratorRuntime.mark((function n(){var a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=e.commit,n.next=3,Ie(t).then((function(e){a("setAlbum",e.data.album),a("setSongIds",e.data.songs.map((function(e){return e.id})))}));case 3:case"end":return n.stop()}}),n)})))()},setPlaySongInfo:function(e,t){return Object(Se["a"])(regeneratorRuntime.mark((function n(){var a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=e.commit,n.next=3,Object(we["d"])(t).then(function(){var e=Object(Se["a"])(regeneratorRuntime.mark((function e(n){var c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return c={id:0,name:"",author:"",imgUrl:"",lyric:"",comments:0},c.id=n.data.songs[0].id,c.name=n.data.songs[0].name,c.author=n.data.songs[0].ar[0].name,c.imgUrl=n.data.songs[0].al.picUrl,e.next=7,Object(we["b"])(t).then((function(e){return e.data.lrc?e.data.lrc.lyric:""}));case 7:return c.lyric=e.sent,e.next=10,Object(we["c"])(t).then((function(e){return e.data.total}));case 10:c.comments=e.sent,a("setPlaySong",c);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 3:case"end":return n.stop()}}),n)})))()}},He={namespaced:!0,state:Ae,getters:Be,mutations:Re,actions:xe},Te=function(){return{visible:!0}},De={},_e={setVisible:function(e,t){e.visible=t}},Ne={},Ce={namespaced:!0,state:Te,getters:De,mutations:_e,actions:Ne},Ee=(n("a630"),n("6062"),n("7555")),Ue=n("fab2"),Je=function(){return{user:{isLogin:!1,id:0,nickName:"",picUrl:"",allPlaylistIds:[],userDetail:""}}},Ke={getAllPlaylistIds:function(e){return 0===e.user.allPlaylistIds.length&&Object(Ue["a"])(e.user.id).then((function(t){var n=[];t.data.playlist.map((function(t){n.push(t.id),e.user.allPlaylistIds=Array.from(new Set(n))}))})),e.user.allPlaylistIds}},qe={setUser:function(e,t){e.user.isLogin=t.isLogin,e.user.id=t.id,e.user.nickName=t.nickName,e.user.picUrl=t.picUrl,e.user.userDetail=t.userDetail}},ze={login:function(e,t){return Object(Se["a"])(regeneratorRuntime.mark((function n(){var a,c;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.commit,a=e.state,n.next=3,Object(Ee["b"])(t);case 3:return c=n.sent,200==c.data.code&&(localStorage.cookie=encodeURIComponent(c.data.cookie),a.user.isLogin=!0,a.user.id=c.data.profile.userId,a.user.nickName=c.data.profile.nickname,a.user.picUrl=c.data.profile.avatarUrl,a.user.userDetail=c.data.profile,a.user,localStorage.userLoginInfo=JSON.stringify(a.user)),n.abrupt("return",c);case 6:case"end":return n.stop()}}),n)})))()}},Me={namespaced:!0,state:Je,getters:Ke,mutations:qe,actions:ze},$e=(n("caad"),n("2532"),n("a434"),n("986b")),Fe=function(){return{searchKeyword:"",searchResult:"",searchHistory:[]}},We={},Ve={setSearchKeyword:function(e,t){e.searchKeyword=t},setSearchResult:function(e,t){e.searchResult=t},setSearchHistory:function(e,t){e.searchHistory=t}},Ge={getSearchResult:function(e,t){return Object(Se["a"])(regeneratorRuntime.mark((function n(){var a,c,r,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=e.commit,c=e.state,a("setSearchKeyword",t),a("setLoading",!0,{root:!0}),n.next=5,Object($e["f"])(1018,t);case 5:r=n.sent,"{}"!==JSON.stringify(r.data.result)?(a("setSearchResult",r.data.result),localStorage.getItem("searchHistory")?(c.searchHistory=JSON.parse(localStorage.getItem("searchHistory")),c.searchHistory.includes(c.searchKeyword)&&(o=c.searchHistory.indexOf(c.searchKeyword),c.searchHistory.splice(o,1)),c.searchHistory.reverse(),c.searchHistory.push(c.searchKeyword),c.searchHistory.reverse(),localStorage.searchHistory=JSON.stringify(c.searchHistory)):(c.searchHistory=[],c.searchHistory.push(c.searchKeyword),localStorage.setItem("searchHistory",JSON.stringify(c.searchHistory))),a("setSearchHistory",JSON.parse(localStorage.getItem("searchHistory")))):a("setSearchResult",{}),a("setLoading",!1,{root:!0});case 8:case"end":return n.stop()}}),n)})))()}},Qe={namespaced:!0,state:Fe,getters:We,mutations:Ve,actions:Ge},Xe=Object(ee["a"])({modules:{home:ve,play:He,bottom:Ce,user:Me,search:Qe},state:{loading:!1,playListLoading:!1},getters:{},mutations:{setLoading:function(e,t){e.loading=t},setPlayListLoading:function(e,t){e.playListLoading=t}},actions:{}}),Ye=[{path:"/",name:"Home",component:function(){return Promise.all([n.e("chunk-c7e6bc0e"),n.e("chunk-72a15352")]).then(n.bind(null,"7abe"))},meta:{keepAlive:!0}},{path:"/home",redirect:"/"},{path:"/searchpage",name:"SearchPage",component:function(){return n.e("chunk-bf53d6f0").then(n.bind(null,"efe3"))},meta:{keepAlive:!0,isBack:!0,hiddenBottomTabBar:!0}},{path:"/search",name:"Search",component:function(){return n.e("chunk-3f84be02").then(n.bind(null,"f4a0"))},meta:{hiddenBottomTabBar:!0}},{path:"/playlist",name:"PlayList",component:function(){return n.e("chunk-063a7d30").then(n.bind(null,"b887"))},meta:{hiddenBottomTabBar:!0}},{path:"/album",name:"Album",component:function(){return n.e("chunk-3515a1c4").then(n.bind(null,"dbea"))},meta:{hiddenBottomTabBar:!0}},{path:"/playpage",name:"PlayPage",component:function(){return n.e("chunk-0067600c").then(n.bind(null,"413a"))},meta:{hiddenBottom:!0}},{path:"/me",name:"Me",component:function(){return Promise.all([n.e("chunk-c7e6bc0e"),n.e("chunk-2b209d6f")]).then(n.bind(null,"ecac"))}},{path:"/login",name:"Login",component:function(){return n.e("chunk-86ea940e").then(n.bind(null,"9ed6"))},meta:{hiddenBottom:!0}},{path:"/phonelogin",name:"PhoneLogin",component:function(){return n.e("chunk-93762d0a").then(n.bind(null,"45cf"))},meta:{hiddenBottom:!0}},{path:"/emailLogin",name:"EmailLogin",component:function(){return n.e("chunk-5971e081").then(n.bind(null,"875a"))},meta:{hiddenBottom:!0}},{path:"/podcast",name:"Podcast",component:function(){return n.e("chunk-63524b78").then(n.bind(null,"e357"))}},{path:"/follow",name:"Follow",component:function(){return n.e("chunk-b249dd22").then(n.bind(null,"ceb8"))}},{path:"/village",name:"Village",component:function(){return n.e("chunk-43e15636").then(n.bind(null,"8237"))}},{path:"/recommendeddaily",name:"RecommendedDaily",component:function(){return n.e("chunk-206854ec").then(n.bind(null,"31f5"))},meta:{hiddenBottomTabBar:!0}},{path:"/playlistsquare",name:"PlayListSquare",component:function(){return n.e("chunk-9730bd48").then(n.bind(null,"fb02"))},meta:{hiddenBottomTabBar:!0}}],Ze=Object(me["a"])({history:Object(me["b"])(""),routes:Ye}),et=Ze;n("a41b"),n("41fa"),n("5cfb");Object(I["f"])(he).use(a["a"]).use(c["a"]).use(r["a"]).use(o["a"]).use(u["b"]).use(i["b"]).use(s["a"]).use(l["a"]).use(d["b"]).use(b["b"]).use(f["a"]).use(p["a"]).use(h["a"]).use(m["b"]).use(g["b"]).use(y["a"]).use(O["a"]).use(k["b"]).use(j["a"]).use(v["a"]).use(S["a"]).use(w["a"]).use(P["b"]).use(L["a"],{lazyComponent:!0}).use(Xe).use(et).mount("#app")},"672c":function(e,t,n){},7555:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"a",(function(){return u})),n.d(t,"d",(function(){return i})),n.d(t,"c",(function(){return s}));var a=n("53ca"),c=(n("e7e5"),n("d399")),r=(n("99af"),n("a9e3"),n("0c6d"));function o(e){var t=e.account,n=e.password,o=e.loginWay;return"phonePassword"==o?Object(r["a"])({url:"/login/cellphone?phone=".concat(t,"&password=").concat(n),timeout:1e3}).catch((function(){Object(c["a"])("登录失败！")})):"phoneCaptcha"==o?(console.log(t+" "+n),console.log("账号数据类型为："+Object(a["a"])(t)),console.log("密码数据类型为："+Object(a["a"])(n)),t=Number(t),n=Number(n),Object(r["a"])({url:"/login/cellphone?phone=".concat(t,"&captcha=").concat(n),timeout:1e3,methods:"POST"}).catch((function(){Object(c["a"])("登录失败！")}))):"email"==o?Object(r["a"])({url:"/login?email=".concat(t,"&password=").concat(n),timeout:1e3}):(Object(c["a"])("登录失败！"),!1)}function u(e){return Object(r["a"])({url:"/captcha/sent?phone="+e,timeout:4e3})}function i(e,t){return Object(r["a"])({url:"/captcha/verify?phone=".concat(e,"&captcha=").concat(t)})}function s(){return Object(r["a"])({url:"/logout"})}},"986b":function(e,t,n){"use strict";n.d(t,"c",(function(){return c})),n.d(t,"d",(function(){return r})),n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return u})),n.d(t,"f",(function(){return i})),n.d(t,"e",(function(){return s}));n("99af");var a=n("0c6d");function c(){return Object(a["a"])({url:"/search/default"})}function r(){return Object(a["a"])({url:"/search/hot"})}function o(){return Object(a["a"])({url:"/search/hot/detail"})}function u(){return Object(a["a"])({url:"/top/mv?limit=20"})}function i(e,t){return Object(a["a"])({url:"/search?type=".concat(e,"&keywords=").concat(t)})}function s(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"mobile";return Object(a["a"])({url:"/search/suggest?keywords=".concat(e,"&type=").concat(t)})}},a41b:function(e,t,n){},bacf:function(e,t,n){"use strict";n("672c")},c32a:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return u})),n.d(t,"d",(function(){return i})),n.d(t,"a",(function(){return s})),n.d(t,"e",(function(){return l})),n.d(t,"f",(function(){return d})),n.d(t,"g",(function(){return b}));n("e7e5");var a=n("d399"),c=(n("99af"),n("0c6d")),r=localStorage.getItem("cookie");function o(e){return Object(c["a"])({url:"/playlist/detail?id=".concat(e,"&cookie=").concat(r||"","&timestamp=").concat(Date.parse(new Date))}).catch((function(){Object(a["a"])("歌单加载失败")}))}function u(e,t){return Object(c["a"])({url:"/top/playlist?limit=51&cat=".concat(e,"&before=").concat(t)})}function i(){return Object(c["a"])({url:"/personalized"})}function s(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:6;return Object(c["a"])({url:"/top/playlist/highquality?limit=".concat(e)})}function l(){return Object(c["a"])({url:"/toplist"})}function d(){return Object(c["a"])({url:"/toplist/detail"})}function b(e,t){return Object(c["a"])({url:"/playlist/subscribe?t=".concat(e,"&id=").concat(t,"&cookie=").concat(r)})}},fab2:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));n("99af");var a=n("0c6d"),c=localStorage.getItem("cookie");function r(e){return Object(a["a"])({url:"/user/playlist?uid=".concat(e,"&cookie=").concat(c,"&timestamp=").concat(Date.parse(new Date))})}}});
//# sourceMappingURL=app.ab6cbb83.js.map