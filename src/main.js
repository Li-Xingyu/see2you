import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// import VueDPlayer from "vue-dplayer";
// import "vue-dplayer/dist/vue-dplayer.css";
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import axios from 'axios'; 
Vue.use(axios);     
// 新增代码：注册全部组件
Vue.use(Antd)
// Vue.use(VueDPlayer);
Vue.config.productionTip = false


var instance = axios.create({
  //请求根目录
baseURL: window.location.origin,     
// withCredentials : true,
timeout: 10000*30,
// headers: {'X-Custom-Header': 'foobar'},
});

instance.interceptors.response.use(response=>{
  return response;
},(error)=>{
  return error.response;
})



Vue.prototype.$axios = instance; 


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
