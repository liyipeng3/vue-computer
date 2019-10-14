import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/computer.vue'),
            meta: { title: 'Online Computer' }
        }
        ]
});

