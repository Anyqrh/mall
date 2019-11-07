<template>
    <div style="background-color: #fff">
        <div class="info-form">
            <div class="info-title">性别修改</div>
            <div class="info-content">
                <div class="sex">
                    <label>性别：</label>&nbsp;&nbsp;
                    <input type="radio" name="sex" value="0" v-model="sexColumns" checked/>保密&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="radio" name="sex" value="1" v-model="sexColumns"/>男&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="radio" name="sex" value="2" v-model="sexColumns"/>女
                </div>
                <div class="button" @click="onSexConfirm">保存</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { authInfo,authProfile} from '@/api/api';
    import {Toast} from 'vant';
    export default {
        name: "index",
        data() {
            return {
                sexColumns: '0'
            };
        },
        created() {
            this.getUserInfo();
            this.sexColumns = this.$route.params.gender;
        },
        methods:{
            getUserInfo() {
                authInfo().then(res => {
                    this.gender = res.data.data.gender;
                })
            },
            onSexConfirm() {
                let data = {
                    'gender': this.sexColumns
                };
                authProfile(data).then(res => {
                    Toast.success("修改成功");
                    setTimeout(() => {
                        this.$router.go(-1);
                    }, 1500)


                });
            },
        }
    }
</script>

<style scoped>
    .info-form{
        width: 600px;
        height: 500px;
        border: 1px solid #eee;
        margin: 50px auto;
    }

    .info-title{
        width: 120px;
        height: 40px;
        position: relative;
        z-index: 99;
        left: 240px;
        top: -20px;
        text-align: center;
        line-height: 40px;
        background-color: #fff;
        font-size: 18px;
    }

    .info-content{
        width: 100%;
        padding: 0 20px;
    }

    .sex{
        width: 100%;
        height: 40px;
        /*border: 1px solid #ccc;*/
        margin-top: 20px;
    }

    /*input{*/
        /*width: 500px;*/
        /*height: 40px;*/
        /*padding-left: 10px;*/
        /*border: 1px solid #eee;*/
    /*}*/

    .button{
        width: 300px;
        height: 50px;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        line-height: 50px;
        color: #fff;
        background-color: #DB3D3C;
        margin-left: 130px;
        margin-top: 150px;
    }
</style>