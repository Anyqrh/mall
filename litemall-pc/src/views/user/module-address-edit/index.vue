<template>
  <div class="container" style="background-color: #fff">

    <div class="edit">
      <div class="title">编辑地址</div>
      <div class="edit-content">
        <van-address-edit
                style="background-color: #fff;"
                :areaList="areaList"
                :addressInfo="addressInfo"
                show-set-default
                show-delete
                @save="onSave"
                @delete="onDelete"
        />
      </div>
    </div>
    <!--<van-nav-bar title="编辑地址" left-text="返回" left-arrow @click-left="goback"/>-->
    <!--<van-address-edit-->
      <!--style="background-color: #fff;"-->
      <!--:areaList="areaList"-->
      <!--:addressInfo="addressInfo"-->
      <!--show-set-default-->
      <!--show-delete-->
      <!--@save="onSave"-->
      <!--@delete="onDelete"-->
    <!--/>-->
  </div>
</template>

<script>
import { AddressEdit, NavBar } from 'vant';
import areaList from './area.json';
import { addressDetail, addressSave, addressDelete } from '@/api/api';
import { removeLocalStorage } from '@/utils/local-storage';

export default {
  name: 'address-edit',

  data() {
    return {
      areaList,
      addressId: 0,
      addressInfo: {}
    };
  },
  created() {
    this.addressId = this.$route.query.addressId;
    if (this.addressId !== -1 && this.addressId !== 0) {
      this.init();
    }
  },

  methods: {
    init() {
      addressDetail({id: this.addressId}).then(res => {
        this.addressInfo = res.data.data;
      });
    },
    onSave(content) {
      addressSave(content).then(res => {
        this.$toast('成功');
        this.$router.push({ path: '/user/address' });
      });
    },
    onDelete(content) {
      addressDelete({ id: content.id });
      removeLocalStorage('AddressId')
      this.$router.go(-1);
    },
    goback() {
      this.$router.go(-1);
    }
  },

  components: {
    [NavBar.name]: NavBar,
    [AddressEdit.name]: AddressEdit
  }
};
</script>

<style scoped>
  .edit{
    width: 800px;
    height: 500px;
    border: 1px solid #ccc;
    margin: 30px auto;
  }

  .title{
    width: 150px;
    height: 40px;
    background-color: #fff;
    position: relative;
    top: -20px;
    left: 325px;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
  }

  .edit-content{
    width: 100%;
    padding: 20px 20px;
  }
</style>
