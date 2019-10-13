import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui';
Vue.use(Element, { size: 'small'});
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
