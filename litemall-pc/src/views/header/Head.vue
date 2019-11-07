<template>
    <div class="nav-bar">
        <div class="container navBar-content">
            <div class="nav-item"><router-link to="/">首页</router-link></div>
            <div class="nav-item login">
                <router-link v-if="!isLogin" to="/login">登录</router-link>
                <router-link v-if="isLogin" to="/user">{{nickName}}</router-link>
            </div>
            <div class="nav-item register">
                <router-link v-if="!isLogin" to="/login/register">注册</router-link>
                <div v-if="isLogin" @click="loginOut">退出</div>
            </div>
            <div class="nav-item shoppingCart"><router-link to="/order"><i class="iconfont icon-shopping-cart"></i>&nbsp;购物车&nbsp;<i class="iconfont icon-arrow"></i></router-link></div>
            <div class="nav-item collect"><router-link to="/user/collect">收藏夹&nbsp;<i class="iconfont icon-arrow"></i></router-link></div>
            <div class="nav-item opinion"><router-link to="/user/feedback">意见反馈&nbsp;<i class="iconfont icon-arrow"></i></router-link></div>
            <div class="nav-item problem"><router-link to="/user/help">常见问题&nbsp;<i class="iconfont icon-arrow"></i></router-link></div>
            <div class="nav-item problem"><router-link to="/user">个人中心&nbsp;<i class="iconfont icon-arrow"></i></router-link></div>
        </div>
    </div>
</template>

<script>
import { getLocalStorage,setLocalStorage } from '@/utils/local-storage';
import { authInfo, authLogout, authProfile , storageUploadBase64} from '@/api/api';
    export default {
        name: "head",
        data() {
            return {
                isLogin: false,
                nickName:""
            };
        },
        provide () {
            return {
                reload: this.reload()
            }
        },
        created() {
            this.getLoginStatus();

        },
        methods: {
            reload () {
                console.log("shuaxin")
                this.isRouteAlive = false
                this.$nextTick (() => {
                    this.isRouteAlive = true
                })
            },
            getLoginStatus() {
                this.nickName = getLocalStorage("nickName").nickName
                console.log(getLocalStorage("nickName").nickName)
                console.log(getLocalStorage("Authorization"))
                if(getLocalStorage('Authorization').Authorization!='null'){
                    this.isLogin = true
                }
                console.log(this.isLogin)
            },
            loginOut() {
                authLogout();
                setLocalStorage({
                    Authorization: null,
                    avatar: null,
                    nickName: null
                });
                this.$router.push({ name: 'login' });
                window.location.reload()
            },
        },
    }
</script>

<style scoped>
    /*导航栏*/
    .nav-bar {
        width: 100%;
        height: 40px;
        background-color: #F1F3F4;
        font-size: 14px;
        color: #333;

    }

    .navBar-content {
        display: flex;
        width: 100%;
    }

    .nav-item {
        padding: 5px 5px;
        height: 40px;
        line-height: 30px;
        cursor: pointer;
    }

    .login {
        color: #DB3D3C !important;
        margin-left: 20px;
    }

    .register {
        margin-left: 20px;
    }

    ul li {
        float: left;
        list-style: none;
        padding: 5px 5px;
        margin: 0;
        height: 40px;
        line-height: 30px;
    }

    .shoppingCart{
        margin-left: 470px;
    }

    .collect{
        margin-left: 10px;
    }

    .opinion{
        margin-left: 10px;
    }

    .problem{
        margin-left: 10px;
    }

    .icon-shopping-cart{
        font-size: 14px;
        color: #DB3D3C;
    }

    .icon-arrow{
        font-size: 10px;
        color: #333;
    }

    a{
        text-decoration: none;
        color:inherit;
    }

    a:hover{
        color: #DB3D3C;
    }
</style>