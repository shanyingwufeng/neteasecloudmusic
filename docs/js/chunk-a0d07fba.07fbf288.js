(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a0d07fba"],{"03e9":function(n,t,a){},"175e":function(n,t,a){n.exports=a.p+"img/needle-ab.4b81da04.png"},"183b":function(n,t,a){n.exports=a.p+"img/disc.2aa9bb90.png"},"62b9":function(n,t,a){"use strict";a.r(t);var c=a("7a23"),e=a("175e"),s=a.n(e),o=a("183b"),i=a.n(o),l=Object(c["V"])("data-v-60d26d17");Object(c["D"])("data-v-60d26d17");var u={class:"playPage"},b={class:"bg"},r={class:"top"},d={class:"songName"},p=Object(c["k"])("span",{class:"iconfont icon-fenxiang"},null,-1),g={class:"center"},j=Object(c["k"])("img",{src:i.a,class:"cd"},null,-1),O={class:"bottom"},f=Object(c["i"])('<div class="btnList" data-v-60d26d17><span class="iconfont icon-shoucang" data-v-60d26d17></span><span class="iconfont icon-iconset0425" data-v-60d26d17></span><span class="iconfont icon-changpian" data-v-60d26d17></span><span class="iconfont icon-58pinglun" data-v-60d26d17></span><span class="iconfont icon-gengduo" data-v-60d26d17></span></div>',1),m={class:"playControl"},y=Object(c["k"])("span",{class:"iconfont icon-suijibofang"},null,-1),k=Object(c["k"])("span",{class:"iconfont icon-shangyiqu"},null,-1),v=Object(c["k"])("span",{class:"iconfont icon-xiayiqu"},null,-1),P=Object(c["k"])("span",{class:"iconfont icon-bofangliebiao"},null,-1);Object(c["B"])();var S=l((function(n,t,a,e,o,i){var l=Object(c["I"])("lazy");return Object(c["A"])(),Object(c["g"])("div",u,[Object(c["S"])(Object(c["k"])("img",b,null,512),[[l,n.$store.getters.songImgUrl]]),Object(c["k"])("div",r,[Object(c["k"])("span",{class:"iconfont icon-jiantou9",onClick:t[1]||(t[1]=function(t){return n.$router.go(-1)})}),Object(c["k"])("span",d,Object(c["L"])(n.$store.getters.songName),1),p]),Object(c["k"])("div",g,[Object(c["k"])("img",{src:s.a,class:["controlLever",{active:!e.playState}]},null,2),j,Object(c["S"])(Object(c["k"])("img",{class:["songImg",{songImgRoute:n.play,pause:!e.playState}]},null,2),[[l,n.$store.getters.songImgUrl]])]),Object(c["k"])("div",O,[f,Object(c["k"])("div",m,[y,k,e.playState?(Object(c["A"])(),Object(c["g"])("span",{key:1,class:"iconfont icon-zantingtingzhi21 playandstop",onClick:t[3]||(t[3]=function(n){return e.musicPause()})})):(Object(c["A"])(),Object(c["g"])("span",{key:0,class:"iconfont icon-bofang playandstop",onClick:t[2]||(t[2]=function(n){return e.musicPlay()})})),v,P])])])})),h=a("5530"),w=a("1da1"),x=(a("96cf"),a("5502")),I=a("6c02"),C=a("365c"),$={name:"PlayPage",setup:function(){var n=Object(x["c"])(),t=Object(I["c"])(),a=t.query.id,e=Object(c["E"])({play:!0,isPaused:!1}),s=function(){e.play=!0,e.isPaused=!1,n.commit("setPlayState",!0)},o=function(){e.isPaused=!0,n.commit("setPlayState",!1)};return Object(c["x"])(Object(w["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!a){t.next=5;break}return n.commit("setPlayState",!1),t.next=4,Object(C["b"])(a).then((function(t){n.commit("setPlayControl",t.data.songs[0])}));case 4:n.commit("setPlayState",!0);case 5:case"end":return t.stop()}}),t)})))),Object(h["a"])(Object(h["a"])({},Object(c["M"])(e)),{},{musicPause:o,musicPlay:s,playState:Object(c["e"])((function(){return n.state.playState}))})}};a("8a5b");$.render=S,$.__scopeId="data-v-60d26d17";t["default"]=$},"8a5b":function(n,t,a){"use strict";a("03e9")}}]);
//# sourceMappingURL=chunk-a0d07fba.07fbf288.js.map