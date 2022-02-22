import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
// import VueAxios from 'vue-axios'
import qstring from 'querystring'
import * as VueGoogleMaps from 'vue2-google-maps';

// 全域啟用
// Vue.use(VueAxios,axios)
Vue.prototype.$qstring = qstring;
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC9SHVbUvcgNbFxf-DDik0NcORZmZ0cMxA',
  }
});
// Vue.use(VueGeolocation)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
