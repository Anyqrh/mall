<template>
    <div class="login">
        <div class="login-form">
            <div class="form-title">账号登录</div>
            <div class="form-content">
                <form>
                    <div class="user">
                        <div class="input-icon"><i class="iconfont icon-ren"></i></div>
                        <div class="input-text"><input name="user"  v-model="account" type="text" placeholder="请输入手机号码"/></div>
                    </div>
                    <div class="password">
                        <div class="input-icon"><i class="iconfont icon-suo1"></i></div>
                        <div class="input-text"><input name="password" v-model="password" type="password" placeholder="请输入密码"/></div>
                    </div>
                    <div class="register" @click="register">免费注册</div>
                    <div class="submit" @click="loginSubmit">登录</div>
                </form>
            </div>
        </div>


        <!--底部-->
        <div class="footer">
            <div class="footer-container container">
                <div class="footer-text">
                    <div class="company-name"><span class="text-title">公司名称：</span><span>福州新达厨具</span></div>
                    <div class="company-address"><span class="text-title">公司地址：</span><span>福州市晋安区新店镇义井工业区21号</span></div>
                    <div class="company-phone"><span class="text-title">公司电话：</span><span>18059021050</span></div>
                </div>
            </div>
        </div>

        <!--<div class="store_header">-->
            <!--<div class="store_avatar">-->
                <!--<img src="../../assets/images/avatar_default.png" alt="头像" width="55" height="55">-->
            <!--</div>-->
            <!--<div class="store_name"></div>-->
        <!--</div>-->

        <!--<md-field-group>-->
            <!--<md-field-->
                    <!--v-model="account"-->
                    <!--icon="username"-->
                    <!--placeholder="请输入账号"-->
                    <!--right-icon="clear-full"-->
                    <!--name="user"-->
                    <!--data-vv-as="帐号"-->
                    <!--@right-click="clearText"-->
            <!--/>-->

            <!--<md-field-->
                    <!--v-model="password"-->
                    <!--icon="lock"-->

                    <!--placeholder="请输入密码"-->
                    <!--:type="visiblePass ? 'text' : 'password'"-->
                    <!--:right-icon="visiblePass ? 'eye-open' : 'eye-close'"-->
                    <!--data-vv-as="密码"-->
                    <!--name="password"-->
                    <!--@right-click="visiblePass = !visiblePass"-->
            <!--/>-->

            <!--<div class="clearfix">-->
                <!--<div class="float-l">-->
                    <!--<router-link to="/login/register">免费注册</router-link>-->
                <!--</div>-->
                <!--&lt;!&ndash;        <div class="float-r">&ndash;&gt;-->
                <!--&lt;!&ndash;          <router-link to="/login/forget">忘记密码</router-link>&ndash;&gt;-->
                <!--&lt;!&ndash;        </div>&ndash;&gt;-->
            <!--</div>-->

            <!--<van-button size="large" type="danger" :loading="isLogining" @click="loginSubmit">登录</van-button>-->
        <!--</md-field-group>-->

    </div>
</template>

<script>
    import field from '@/components/field/';
    import fieldGroup from '@/components/field-group/';

    import {authLoginByAccount} from '@/api/api';
    import {setLocalStorage} from '@/utils/local-storage';
    import {emailReg, mobileReg} from '@/utils/validate';

    import {Toast} from 'vant';


    export default {
        name: 'login-request',
        components: {
            [field.name]: field,
            [fieldGroup.name]: fieldGroup,
            Toast
        },
        data() {
            return {
                account: '',
                password: '',
                visiblePass: false,
                isLogining: false,
                userInfo: {}
            };
        },

        methods: {
            clearText() {
                this.account = '';
            },
            register(){
                this.$router.push({
                    path: "/login/register"
                });
            },

            validate() {

            },

            login() {
                let loginData = this.getLoginData();
                authLoginByAccount(loginData).then(res => {
                    this.userInfo = res.data.data.userInfo;
                    setLocalStorage({
                        Authorization: res.data.data.token,
                        avatar: this.userInfo.avatarUrl,
                        nickName: this.userInfo.nickName
                    });

                    this.routerRedirect();
                    window.location.reload()
                }).catch(error => {
                    Toast.fail(error.data.errmsg);
                });
            },

            loginSubmit() {
                this.isLogining = true;
                try {
                    this.validate();
                    this.login();
                    this.isLogining = false;
                } catch (err) {
                    console.log(err.message);
                    this.isLogining = false;
                }
            },

            routerRedirect() {
                // const { query } = this.$route;
                // this.$router.replace({
                //   name: query.redirect || 'home',
                //   query: query
                // });
                window.location = '#/user/';
            },

            getLoginData() {
                const password = this.password;
                const account = this.getUserType(this.account);
                return {
                    [account]: this.account,
                    password: password
                };
            },

            getUserType(account) {
                const accountType = mobileReg.test(account)
                    ? 'username'
                    : emailReg.test(account)
                        ? 'username'
                        : 'username';
                return accountType;
            }
        }
    };
</script>


<style lang="scss" scoped>
    @import '../../assets/scss/mixin';

    .login{
        width: 100%;
        background: #fff;
    }

    .login-form{
        width: 400px;
        height: 420px;
        border: 3px solid #DB3D3C;
        margin: 0 auto;
        position: relative;
        top:160px;
        border-radius: 10px;
    }

    .form-title{
        width: 100%;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 20px;
        background-color: #F45353;
        color: #fff;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
    }

    .form-content{
        width: 300px;
        height: 300px;
        margin: 60px auto;
    }

    .user{
        width: 100%;
        height: 50px;
        border: 1px solid #ccc;
        display: flex;
    }

    .input-icon{
        width: 50px;
        height: 100%;
        background-color: #eee;
    }

    .input-text{
        width: 250px;
        height: 100%;
    }

    .input-text input{
        height: 100%;
        width: 100%;
        font-size: 16px;
        border: none;
        padding-left: 5px;
    }

    .icon-ren{
        line-height: 50px;
        text-align: center;
        font-size: 25px;
        margin-left: 10px;
        color: #999;
    }

    .password{
        width: 100%;
        height: 50px;
        border: 1px solid #ccc;
        display: flex;
        margin-top: 30px;
    }

    .icon-suo1{
        line-height: 50px;
        text-align: center;
        font-size: 25px;
        margin-left: 10px;
        color: #999;
    }

    .register{
        width: 60px;
        height: 30px;
        margin-top: 10px;
        text-align: center;
        line-height: 30px;
        font-size: 14px;
        color: #999999;
    }

    .register:hover{
        color: red;
        cursor: pointer;
    }

    .submit{
        width: 100%;
        height: 40px;
        /*border: 1px solid #ccc;*/
        font-size: 14px;
        text-align: center;
        line-height: 40px;
        background-color: #F45353;
        color: #fff;
        margin: 30px auto;
        border-radius: 10px;
        cursor: pointer;
        letter-spacing: 5px;
    }




    /*底部*/
    .footer {
        width: 100%;
        background-color: #ddd;
        position: absolute;
        bottom: 0;
    }

    .footer-container {
        width: 80%;
        margin: 0 auto;
        padding-top: 10px;

    }

    .footer-text{
        width: 100%;
        height: 40px;
        margin: 0 auto;
        display: flex;
        padding-bottom: 10px;
    }

    .company-name{
        width: 300px;
        line-height: 30px;
        font-size: 14px;
        margin-left: 80px;
    }

    .company-address{
        width: 400px;
        line-height: 30px;
        font-size: 14px;
        margin-left: 50px;
    }

    .company-phone{
        width: 300px;
        line-height: 30px;
        font-size: 14px;
        margin-left: 50px;
    }

    .text-title{
        font-weight: bold;
    }

    /*.login {*/
        /*position: relative;*/
        /*background-color: #fff;*/
    /*}*/

    /*.store_header {*/
        /*text-align: center;*/
        /*padding: 30px 0;*/

    /*}*/
    /*.store_avatar img {*/
        /*border-radius: 50%;*/
    /*}*/
    /*.store_name {*/
        /*padding-top: 5px;*/
        /*font-size: 16px;*/
    /*}*/

    /*<!--.register {-->*/
        /*<!--padding-top: 40px;-->*/
        /*<!--color: $font-color-gray;-->*/
        /*<!--a {-->*/
            /*<!--color: $font-color-gray;-->*/
        /*<!--}-->*/
        /*<!--&gt; div {-->*/
            /*<!--width: 50%;-->*/
            /*<!--box-sizing: border-box;-->*/
            /*<!--padding: 0 20px;-->*/
        /*<!--}-->*/
        /*<!--.connect {-->*/
            /*<!--@include one-border(right);-->*/
            /*<!--text-align: right;-->*/
        /*<!--}-->*/
    /*<!--}-->*/

    /*.bottom_positon {*/
        /*position: absolute;*/
        /*bottom: 30px;*/
        /*width: 100%;*/
    /*}*/
</style>