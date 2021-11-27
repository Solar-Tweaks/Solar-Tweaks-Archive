import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import vuex from './plugins/vuex';

Vue.config.productionTip = false;

new Vue({
  vuetify,
  store: vuex,
  render: (h) => h(App),
}).$mount('#app');
