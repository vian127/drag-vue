// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import './assets/style/rest.css'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import store from '@/store/store'
import router from './router'

Vue.use(ElementUI);
Vue.config.productionTip = false

import axios from 'axios'
Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
