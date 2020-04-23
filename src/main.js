import Vue from 'vue';
import App from './App.vue';
import Element from 'element-ui';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题

Vue.use(Element, { size: 'small' });


Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    next();
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
