import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Vuelidate from 'vuelidate';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';

// scss style
import './assets/scss/index.scss';

// app.js

Vue.config.productionTip = false;
// vuelidate
Vue.use(Vuelidate);
// install bootstrapVue
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
// axios
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
