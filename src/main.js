import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/scss/index.scss";
import "swiper/swiper.min.css";
import "amfe-flexible";

import {
    Tag,
    Toast,
    Tabbar,
    TabbarItem,
    Popup,
    Cell,
    CellGroup,
    Dialog,
    Loading,
    Lazyload,
    Button,
    Tab,
    Tabs,
    Field,
    Swipe,
    SwipeItem,
    PullRefresh,
    Divider,
    Sticky,
    Progress,
    CountDown,
    Skeleton,
    List,
    Icon,
} from "vant";

// 使用swiper的compositon API
// import SwiperCore, { Autoplay, Pagination } from "swiper";
// import "swiper/swiper.min.css";
// import "swiper/components/pagination/pagination.scss";
// SwiperCore.use([Autoplay, Pagination]);

createApp(App)
    .use(Tag)
    .use(Toast)
    .use(Tabbar)
    .use(TabbarItem)
    .use(Popup)
    .use(Cell)
    .use(CellGroup)
    .use(Dialog)
    .use(Loading)
    .use(Button)
    .use(Tab)
    .use(Tabs)
    .use(Field)
    .use(Swipe)
    .use(SwipeItem)
    .use(PullRefresh)
    .use(Divider)
    .use(Sticky)
    .use(Progress)
    .use(CountDown)
    .use(Skeleton)
    .use(List)
    .use(Icon)
    .use(Lazyload, {
        lazyComponent: true,
    })
    .use(store)
    .use(router)
    .mount("#app");
