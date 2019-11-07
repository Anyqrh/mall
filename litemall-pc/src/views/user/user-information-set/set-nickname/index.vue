<template>
  <div class="set_nickname" style="background-color: #fff">
    <div class="info-form">
      <div class="info-title">昵称修改</div>
      <div class="info-content">
        <div class="nick">
          <label>昵称：</label>
          <input v-model="nickName"/>
        </div>
        <div class="button" @click="saveNick">保存</div>
      </div>
    </div>
    <!--<van-cell-group>-->
      <!--<van-field v-model="nickName" label="昵称"/>-->
    <!--</van-cell-group>-->

    <!--<div class="bottom_btn">-->
      <!--<van-button size="large" type="danger" @click="saveNick">保存</van-button>-->
    <!--</div>-->
  </div>
</template>


<script>
import { authProfile } from '@/api/api';
import { Field } from 'vant';

export default {
  data() {
    return {
      nickName: ''
    };
  },

  created() {
    this.getNick();
  },

  methods: {
    getNick() {
      this.nickName = localStorage.getItem('nickName') || '';
    },
    saveNick() {
      if (true) {
        authProfile({ nickName: this.nickName })
          .then(res => {
            localStorage.setItem('nickName', res.data.data.nickName);
            return this.$dialog.alert({ message: '保存成功' });
          })
          .then(() => {
            this.$router.go(-1);
          });
      }
    }
  },

  components: {
    [Field.name]: Field
  }
};
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

  .nick{
    width: 100%;
    height: 40px;
    /*border: 1px solid #ccc;*/
    margin-top: 20px;
  }

  input{
    width: 500px;
    height: 40px;
    padding-left: 10px;
    border: 1px solid #eee;
  }

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

/*.bottom_btn {*/
  /*padding: 30px 15px 0 15px;*/
/*}*/
</style>
