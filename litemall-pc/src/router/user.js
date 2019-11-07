const tab_user = () => import(/* webpackChunkName: "user" */ '@/views/user/tabbar-user');
const UserCollect = () => import(/* webpackChunkName: "collect" */ '@/views/user/module-collect');
const UserAddress = () => import(/* webpackChunkName: "address" */ '@/views/user/module-address');
const UserAddressEdit = () => import(/* webpackChunkName: "address-edit" */ '@/views/user/module-address-edit');
const UserServer = () => import(/* webpackChunkName: "user-server" */ '@/views/user/module-server');
const UserHelp = () => import(/* webpackChunkName: "user-help" */ '@/views/user/module-help');
const UserFeedback = () => import(/* webpackChunkName: "user-feedback" */ '@/views/user/module-feedback');

const UserInformation = () => import(/* webpackChunkName: "user-information" */ '@/views/user/user-information-set');
const UserInfo_SetMobile = () => import(/* webpackChunkName: "user-info-setMobile" */ '@/views/user/user-information-set/set-mobile');
const UserInfo_SetNickname = () => import(/* webpackChunkName: "user-info-setNickname" */ '@/views/user/user-information-set/set-nickname');
const UserInfo_SetPassword = () => import(/* webpackChunkName: "user-info-setPassword" */ '@/views/user/user-information-set/set-password');
const UserInfo_SetSex = () => import(/* webpackChunkName: "user-info-setSex" */ '@/views/user/user-information-set/set-sex');

const UserOrderEntityList = () => import(/* webpackChunkName: "user-order-list" */ '@/views/user/order-entity-list');
// const UserCouponList = () => import(/* webpackChunkName: "user-coupon-list" */ '@/views/user/coupon-list');
const UserRefundList = () => import(/* webpackChunkName: "user-refund-list" */ '@/views/user/refund-list');

const Tabbar = () => import('@/components/Tabbar/');

export default [
    {
        path: '/user',
        name: 'user',
        meta: {
            keepAlive: true
        },
        components: {default: tab_user, tabbar: Tabbar}
    },
    {
        path: '/user/collect',
        name: 'collect',
        meta: {
            login: true
        },
        component: UserCollect
    },
    {
        path: '/user/address',
        name: 'address',
        meta: {
            login: true
        },
        component: UserAddress
    },
    {
        path: '/user/address/edit',
        name: 'address-edit',
        props: true,
        meta: {
            login: true
        },
        component: UserAddressEdit
    },
    {
        path: '/user/server',
        name: 'user-server',
        component: UserServer
    },
    {
        path: '/user/help',
        name: 'user-help',
        component: UserHelp
    },
    {
        path: '/user/feedback',
        name: 'user-feedback',
        component: UserFeedback
    },
    {
        path: '/user/information',
        name: 'user-information',
        meta: {
            login: true
        },
        component: UserInformation
    },
    {
        path: '/user/information/setMobile',
        name: 'user-info-setMobile',
        component: UserInfo_SetMobile
    },
    {
        path: '/user/information/setNickname',
        name: 'user-info-setNickname',
        component: UserInfo_SetNickname
    },
    {
        path: '/user/information/setPassword',
        name: 'user-info-setPassword',
        component: UserInfo_SetPassword
    },
    {
        path: '/user/information/setSex',
        name: 'user-info-setSex',
        component: UserInfo_SetSex
    },
    {
        path: '/user/order/list/:active',
        name: 'user-order-list',
        props: true,
        component: UserOrderEntityList
    },
    // {
    //   path: '/user/coupon/list/:active',
    //   name: 'user-coupon-list',
    //   props: true,
    //   component: UserCouponList
    // },
    {
        path: '/user/refund/list',
        name: 'user-refund-list',
        component: UserRefundList
    }
];
