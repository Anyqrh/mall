<template>
  <div class="user_information container" style="background-color: #fff">

    <div class="info-form">
      <div class="info-title">个人信息</div>
      <div class="info-content">
        <van-cell-group>
          <van-cell title="头像" class="cell_middle">
            <van-uploader :afterRead="avatarAfterRead">
              <div class="user_avatar_upload">
                <img
                        :src="avatar + '?x-oss-process=image/resize,m_fill,h_50,w_50'"
                        alt="你的头像"
                        v-if="avatar"
                >
                <van-icon name="camera_full" v-else></van-icon>
              </div>
            </van-uploader>
          </van-cell>

          <van-cell title="手机号码" to="/user/information/setNickname" :value="nickName" isLink/>
<!--          <van-cell title="性别" @click="sexSetting" :value="genderText" isLink/>-->
          <van-cell title="密码设置" to="/user/information/setPassword" isLink/>
<!--          <van-cell title="手机号" to="/user/information/setMobile" :value="mobile" isLink></van-cell>-->
        </van-cell-group>
        <van-button class="bottom_btn" @click="loginOut" type="primary" bottomAction>退出登录</van-button>
        <!--<van-popup v-model="showSex" position="bottom">-->
          <!--<van-picker-->
                  <!--showToolbar-->
                  <!--:columns="sexColumns"-->
                  <!--title="选择性别"-->
                  <!--@cancel="showSex = false"-->
                  <!--@confirm="onSexConfirm"-->
          <!--/>-->
        <!--</van-popup>-->
      </div>
    </div>


    <!--<van-cell-group>-->
      <!--<van-cell title="头像" class="cell_middle">-->
        <!--<van-uploader :afterRead="avatarAfterRead">-->
          <!--<div class="user_avatar_upload">-->
            <!--<img-->
                    <!--:src="avatar + '?x-oss-process=image/resize,m_fill,h_50,w_50'"-->
                    <!--alt="你的头像"-->
                    <!--v-if="avatar"-->
            <!--&gt;-->
            <!--<van-icon name="camera_full" v-else></van-icon>-->
          <!--</div>-->
        <!--</van-uploader>-->
      <!--</van-cell>-->

      <!--<van-cell title="昵称" to="/user/information/setNickname" :value="nickName" isLink/>-->
      <!--<van-cell title="性别" :value="genderText" @click="showSex = true" isLink/>-->
      <!--<van-cell title="密码设置" to="/user/information/setPassword" isLink/>-->
      <!--<van-cell title="手机号" to="/user/information/setMobile" :value="mobile" isLink></van-cell>-->
    <!--</van-cell-group>-->
    <!--<van-button class="bottom_btn" @click="loginOut" type="primary" bottomAction>退出登录</van-button>-->
    <!--<van-popup v-model="showSex" position="bottom">-->
      <!--<van-picker-->
              <!--showToolbar-->
              <!--:columns="sexColumns"-->
              <!--title="选择性别"-->
              <!--@cancel="showSex = false"-->
              <!--@confirm="onSexConfirm"-->
      <!--/>-->
    <!--</van-popup>-->
  </div>
</template>

<script>
    import { Uploader, Picker, Popup, Button } from 'vant';
    import { removeLocalStorage } from '@/utils/local-storage';
    import { getLocalStorage,setLocalStorage } from '@/utils/local-storage';
    import { authInfo, authLogout, authProfile , storageUploadBase64} from '@/api/api';
    export default {
        data() {
            return {
                sexColumns: [
                    {
                        values: ['保密', '男', '女'],
                        defaultIndex: 0
                    }
                ],
                showSex: false,
                avatar: '',
                nickName: '',
                gender: 0,
                mobile: ''
            };
        },
        computed: {
            genderText() {
                const text = ['保密', '男', '女'];
                return text[this.gender] || '';
            }
        },
        created() {
            this.getUserInfo();
        },
        methods: {
            avatarAfterRead(file) {
                let data = {
                    'file': file.content
                };
                storageUploadBase64(data).then(res => {
                    this.avatar = res.data.data.url;
                    let data1 = {
                        'avatar': res.data.data.url
                    };
                    authProfile(data1).then(res => {
                        console.log("修改成功");
                    });
                });
            },
            onSexConfirm(value, index) {
                this.showSex = false;
                let data = {
                    'gender': index[0]
                };
                authProfile(data).then(res => {
                    this.gender = index[0];
                });
            },
            getUserInfo() {
                authInfo().then(res => {
                    this.avatar = res.data.data.avatar;
                    this.nickName = res.data.data.nickName;
                    this.gender = res.data.data.gender;
                    this.mobile = res.data.data.mobile;
                })
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
            sexSetting(){
                this.$router.push({
                    name: 'user-info-setSex',
                    params: {
                        gender: this.gender,
                    }
                });
            }
        },
        components: {
            [Button.name]: Button,
            [Uploader.name]: Uploader,
            [Picker.name]: Picker,
            [Popup.name]: Popup
        }
    };
</script>


<style lang="scss" scoped>

  .info-form{
    width: 600px;
    height: 400px;
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

  .bottom_btn{
    width: 300px;
    margin-left: 130px;
    margin-top: 100px;
  }

  .sex{
    width: 100%;
    height: 100px;
    background-color: #999999;
    position: absolute;
    z-index: 100;
  }


  .user_information {
    .user_avatar_upload {
      position: relative;
      width: 50px;
      height: 50px;
      border: 1px solid $border-color;
      img {
        max-width: 100%;
        max-height: 100%;
      }
      i {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 20px;
        color: $border-color;
      }
    }
  }


</style>