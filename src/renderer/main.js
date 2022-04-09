import Vue from 'vue'

import App from './App'
import router from './router'

import './plugins/element.js'
//基于 ElementUI 先引入 ElementUI
import './plugins/TalexComponent.js'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.config.productionTip = false

import TMusic from './plugins/TMusic.js'

Vue.prototype["$tmusic"] = TMusic

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  // store,
  template: '<App/>'
}).$mount('#app')
