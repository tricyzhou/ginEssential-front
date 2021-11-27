import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import userRoutes from './module/user';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  ...userRoutes,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    // 判断是否需要登陆
    if (store.state.userModule.token) {
      // 这里还要判断token的有效性，比如有没有过期，需要后台发放时候带有效期
      // token无效要请求token
      next();
    } else {
      // 跳转登陆
      router.push({ name: 'login' });
    }
  } else {
    next();
  }
});

export default router;
