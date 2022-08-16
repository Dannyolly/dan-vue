import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
/* import store from './store' */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
/* import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css' */
import './var.less'
import { createPinia } from 'pinia'
const pinia = createPinia()
createApp(App)
    .use(router)
    .use(ElementPlus)
    .use(pinia)
    .mount('#app')
