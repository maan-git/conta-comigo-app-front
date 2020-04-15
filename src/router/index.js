import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const guard = (to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('userInfo');
  if (isAuthenticated) {
    next();
  } else next('/login');
};
const notGuard = (to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('userInfo');
  if (!isAuthenticated) next();
  else next('/');
};

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    beforeEnter: notGuard,
  },
  {
    path: '/create-account',
    name: 'CreateAccount',
    component: () => import('../views/CreateAccount.vue'),
    beforeEnter: notGuard,
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    beforeEnter: guard,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    beforeEnter: guard,
  },
  {
    path: '/create-help',
    name: 'CreateHelp',
    component: () => import('../views/CreateHelp.vue'),
    beforeEnter: guard,
  },
  {
    path: '/how-to',
    name: 'HowTo',
    component: () => import('../views/HowTo.vue'),
    beforeEnter: guard,
  },
  {
    path: '/help-details',
    name: 'HelpDetails',
    component: () => import('../views/HelpDetails.vue'),
    beforeEnter: guard,
  },
  {
    path: '/volunteer-details',
    name: 'VolunteerDetails',
    component: () => import('../views/VolunteerDetails.vue'),
    beforeEnter: guard,
  },
  {
    path: '*',
    redirect: '/login',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
