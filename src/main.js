import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.sass'
import './styles/index.css'
import 'amfe-flexible'
import { Toast, Tabbar, TabbarItem, Popup, Cell, CellGroup, Dialog, Loading, Lazyload, Button } from 'vant';

// 使用swiper的compositon API
import SwiperCore, { Autoplay, Pagination } from "swiper";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.scss";
SwiperCore.use([Autoplay, Pagination]);

createApp(App)
    .use(Toast).use(Tabbar).use(TabbarItem).use(Popup).use(Cell).use(CellGroup)
    .use(Dialog).use(Loading).use(Lazyload).use(Button)
    .use(store).use(router).mount('#app')
