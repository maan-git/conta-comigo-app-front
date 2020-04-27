import VueMask from 'v-mask';
import VueCarousel from 'vue-carousel';
import Vue from 'vue';
import * as validation from './utils/validation';
import * as filters from './utils/filters';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import '@babel/polyfill';
import notificationClient from './plugins/NotificationClient';

Vue.config.productionTip = false;
Vue.use(VueMask);
Vue.use(VueCarousel);
Vue.prototype.$vln = validation;
Vue.prototype.$filters = filters;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');

notificationClient.startListening();
