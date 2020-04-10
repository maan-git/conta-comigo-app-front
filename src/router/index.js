import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/create-account',
    name: 'CreateAccount',
    component: () => import('../views/CreateAccount.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/create-help',
    name: 'CreateHelp',
    component: () => import('../views/CreateHelp.vue'),
  },
  {
    path: '/how-to',
    name: 'HowTo',
    component: () => import('../views/HowTo.vue'),
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

router.beforeEach((to, from, next) => {
  const userInfo = localStorage.getItem('userInfo');
  console.log('beforeEach', userInfo);
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (userInfo) {
      next();
      return;
    }
    next('/login');
  }
  next();
});

// const protectedRoutes = [
//   '/', '/about', '/create-help', '/how-to',
// ];

// const userInfo = localStorage.getItem('userInfo');

// router.beforeResolve((to, from, next) => {
//   if (protectedRoutes.includes(to.path) && !userInfo) {
//     next({ path: '/login' });
//   } else if (userInfo && (to.path === '/login' || to.path === '/create-account')) {
//     next({ path: '/' });
//   }
//   next();
// });
export default router;
