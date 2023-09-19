import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/style/index.less'
import 'element-ui/lib/theme-chalk/index.css'
import useElementUI from './plugins/useElementUI'
import useMd5 from './plugins/useMd5'
import useMsg from './plugins/useMsg'
import useMsgBox from './plugins/useMsgBox'

Vue.config.productionTip = false
useElementUI(Vue)
useMd5(Vue)
useMsg(Vue)
useMsgBox(Vue)

window.Vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
