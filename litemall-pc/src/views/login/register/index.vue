<template>
    <div class="register">
        <div class="register-form">
            <div class="form-title">用户注册</div>
            <div class="form-content">
                <form>
                    <div class="user">
                        <div class="input-icon"><i class="iconfont icon-ren"></i></div>
                        <div class="input-text"><input v-model="username" type="text" name="username" placeholder="请输入手机号码"/></div>
                    </div>
<!--                    <div class="phone">-->
<!--                        <div class="input-icon"><i class="iconfont icon-shouji"></i></div>-->
<!--                        <div class="input-text"><input v-model="mobile" type="text" name="phone" placeholder="请输入手机号码"/></div>-->
<!--                    </div>-->
                    <div class="password">
                        <div class="input-icon"><i class="iconfont icon-suo1"></i></div>
                        <div class="input-text"><input v-model="password" type="password" name="password" placeholder="请输入密码"/></div>
                    </div>
                    <div class="rePassword">
                        <div class="input-icon"><i class="iconfont icon-suo1"></i></div>
                        <div class="input-text"><input v-model="repeatPassword" type="password" name="rePassword" placeholder="请再次确认密码"/></div>
                    </div>
                    <div class="login">
                        <span class="login-text1">已有账号？</span>&nbsp;&nbsp;
                        <span class="login-text2" @click="login">登录</span>
                    </div>
                    <div class="submit" @click="registerSubmit">确认</div>
                </form>
            </div>
        </div>



        <!--<md-field-group class="register_view">-->
            <!--<md-field-->
                    <!--v-model="username"-->
                    <!--icon="username"-->
                    <!--placeholder="请输入账号"/>-->

            <!--<md-field v-model="mobile" icon="mobile" placeholder="请输入手机号码"/>-->
            <!--<md-field v-model="password" type="password" icon="lock" placeholder="请输入密码" />-->
            <!--<md-field v-model="repeatPassword" type="password" icon="lock" placeholder="请再次确认密码"/>-->

            <!--<div class="register_submit">-->
                <!--<van-button size="large" type="danger" @click="registerSubmit">确定</van-button>-->
            <!--</div>-->

            <!--<div class="register_footer">-->
                <!--已有账号?-->
                <!--<router-link to="/login" class="red">登录</router-link>-->
            <!--</div>-->
        <!--</md-field-group>-->


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
    </div>
</template>

<script>
    import field from '@/components/field/';
    import fieldGroup from '@/components/field-group/';
    import { authRegister } from '@/api/api';
    import { Dialog, Toast } from 'vant';
    export default {
        data() {
            return {
                username: '',
                password: '',
                repeatPassword: '',
                mobile:''
            };
        },
        methods: {
            registerSubmit() {
                this.register();
            },
            register() {
                let formData = this.getFormData();
                console.log(formData);
                authRegister(formData).then(res=>{
                    console.log(res.data.data)
                    if (res.data.data.status === 200) {
                        Toast.success('注册成功');
                        setTimeout(() => {
                            window.location = '#/login/'
                        }, 1500)
                    }else {
                        Toast.fail(res.data.data.message);
                    }
                });
            },
            login(){
                this.$router.push({
                    path: "/login"
                });
            },
            getFormData(){
                const username = this.username;
                // const mobile = this.mobile;
                const password = this.password;
                return{
                    username:username,
                    // mobile:mobile,
                    password:password
                };
            }
        },
        components: {
            [field.name]: field,
            [fieldGroup.name]: fieldGroup
        }
    };
</script>

<style lang="scss" scoped>

    .register{
        background-color: #fff;
    }

    .register-form{
        width: 400px;
        height: 400px;
        border: 3px solid #DB3D3C;
        margin: 0 auto;
        position: relative;
        top: 160px;
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
        width: 350px;
        height: 400px;
        /*border: 1px solid #ccc;*/
        margin: 20px auto;
    }

    .user{
        width: 100%;
        height: 40px;
        margin-top: 10px;
        border: 1px solid #ccc;
        display: flex;
    }

    .input-icon{
        width: 50px;
        height: 100%;
        /*border: 1px solid #ccc;*/
        background-color: #eee;
    }

    .input-text{
        width: 300px;
        height: 100%;
        /*border: 1px solid #ccc;*/
    }

    .icon-ren{
        font-size: 20px;
        text-align: center;
        line-height: 40px;
        margin-left: 15px;
        color: #999;
    }

    .input-text input{
        height: 100%;
        width: 100%;
        font-size: 16px;
        border: none;
        padding-left: 5px;
    }

    .phone{
        width: 100%;
        height: 40px;
        margin-top: 30px;
        border: 1px solid #ccc;
        display: flex;
    }

    .icon-shouji{
        font-size: 20px;
        text-align: center;
        line-height: 40px;
        margin-left: 15px;
        color: #999;
    }

    .password{
        width: 100%;
        height: 40px;
        margin-top: 30px;
        border: 1px solid #ccc;
        display: flex;
    }

    .rePassword{
        width: 100%;
        height: 40px;
        margin-top: 30px;
        border: 1px solid #ccc;
        display: flex;
    }

    .icon-suo1{
        font-size: 20px;
        text-align: center;
        line-height: 40px;
        margin-left: 15px;
        color: #999;
    }

    .login{
        width: 150px;
        height: 30px;
        /*border: 1px solid #ccc;*/
        margin-left: 190px;
        margin-top: 20px;
        line-height: 30px;
    }

    .login-text1{
        color: #999;
    }

    .login-text2{
        color: red;
        cursor: pointer;
    }

    .submit{
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: #F45353;
        color: #fff;
        cursor: pointer;
        margin-top: 30px;
        border-radius: 10px;
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

</style>