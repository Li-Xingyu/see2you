import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// import VueDPlayer from "vue-dplayer";
// import "vue-dplayer/dist/vue-dplayer.css";
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

// 新增代码：注册全部组件
Vue.use(Antd)
// Vue.use(VueDPlayer);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
