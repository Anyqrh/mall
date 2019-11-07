export default [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/login')
  },
  {
    path: '/login/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '@/views/login/register')
  },
  {
    path: '/login/registerStatus/:status',
    name: 'registerStatus',
    props: true,
    component: () => import(/* webpackChunkName: "registerStatus" */ '@/views/login/register-status')
  },
  {
    path: '/login/forget',
    name: 'forget',
    component: () => import(/* webpackChunkName: "forget" */ '@/views/login/forget')
  },
  {
    path: '/login/forget/reset',
    name: 'forgetReset',
    component: () => import(/* webpackChunkName: "forgetReset" */ '@/views/login/forget-reset')
  },
  {
    path: '/login/forget/reset/:status',
    name: 'forgetStatus',
    props: true,
    component: () => import(/* webpackChunkName: "forgetStatus" */ '@/views/login/forget-status')
  }
];
