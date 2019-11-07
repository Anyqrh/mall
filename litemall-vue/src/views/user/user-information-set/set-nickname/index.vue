<template>
  <div class="set_nickname">
    <van-nav-bar title="设置昵称" left-text="返回" left-arrow @click-left="goback"/>
    <van-cell-group>
      <van-field v-model="nickName" label="昵称"/>
    </van-cell-group>

    <div class="bottom_btn">
      <van-button size="large" type="danger" @click="saveNick">保存</van-button>
    </div>
  </div>
</template>


<script>
import { authProfile } from '@/api/api';
import { Field,NavBar } from 'vant';

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
    goback() {
      this.$router.go(-1);
    },
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
    [Field.name]: Field,
    [NavBar.name]: NavBar
  }
};
</script>


<style scoped>
.bottom_btn {
  padding: 30px 15px 0 15px;
}
</style>
