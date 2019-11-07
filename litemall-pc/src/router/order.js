const Tabbar = () => import('@/components/Tabbar/');

export default [
  {
    path: '/order',
    name: 'cart',
    meta: {
      login: true
    },
    components: { 
      default: () => import(/* webpackChunkName: "cart" */ '@/views/order/tabbar-cart'),
      tabbar: Tabbar 
    }
  },
  {
    path: '/order/placeOrderEntity',
    name: 'placeOrderEntity',
    component: () => import(/* webpackChunkName: "placeOrderEntity" */ '@/views/order/place-order-entity')
  },
  {
    path: '/order/orderDetail',
    name: 'orderDetail',
    component: () => import(/* webpackChunkName: "orderDetail" */ '@/views/order/orderDetail')
  },
  {
    path: '/order/payment',
    name: 'payment',
    component: () => import(/* webpackChunkName: "payment" */ '@/views/order/payment')
  },
  {
    path: '/order/payQR',
    name: 'payQR',
    component: () => import(/* webpackChunkName: "payQR" */ '@/views/order/payQR')
  },
  {
    path: '/order/payment/:status',
    name: 'paymentStatus',
    component: () => import(/* webpackChunkName: "paymentStatus" */ '@/views/order/payment-status'),
    props: true
  }
];
