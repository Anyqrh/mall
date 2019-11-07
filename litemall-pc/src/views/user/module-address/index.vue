<template>
  <div class="container" style="background-color: #fff">
    <div class="address">
      <div class="title">我的收货地址</div>
      <div class="add" @click="onAdd">新增地址</div>
      <table class="address-table">
        <tr class="th">
          <td>收货人</td>
          <td>收货地址</td>
          <td>电话、手机</td>
          <td>编辑</td>
        </tr>
        <tr v-model="chosenAddressId" v-for="(item,index) in addressList" :key="index">
          <td @click="onSelect">{{item.name}}</td>
          <td @click="onSelect">{{item.address}}</td>
          <td @click="onSelect">{{item.tel}}</td>
          <td>
            <div class="edit-button" @click="onEdit(item)">
            <i class="iconfont icon-bianji"></i>
            </div>
          </td>
        </tr>
      </table>

    </div>

    <!--<van-nav-bar title="收货地址"/>-->
    <!--<div v-model="chosenAddressId" v-for="item in addressList">{{item.name}}</div>-->
    <!--<div class="add-button" @click="onAdd">新增地址</div>-->
    <!--<van-address-list v-model="chosenAddressId" :list="addressList"  @edit="onEdit" @select="onSelect"/>-->
  </div>
</template>

<script>
import { addressList, addressDetail, addressSave, addressDelete } from '@/api/api';
import { AddressList, NavBar } from 'vant';
import { setLocalStorage } from '@/utils/local-storage';

export default {
  data() {
    return {
      chosenAddressId: -1,
      addressList: []
    };
  },

  created() {
    this.loadAddress();
  },
  methods: {
    onAdd() {
      this.$router.push({ name: 'address-edit', query: { addressId: -1 } });
    },
    onEdit(item, index) {
      this.$router.push({ name: 'address-edit', query: { addressId: item.id } });
    },
    onSelect(item, index) {
      setLocalStorage({ AddressId: item.id });
      this.$router.go(-1);
    },         
    goback() {
      this.$router.go(-1);
    },
    loadAddress() {
      addressList().then(res => {
        var list = res.data.data.list;
        for(var i = 0; i < list.length; i++ ){
          var item = list[i]
          this.addressList.push({
            id: item.id,
            name: item.name,
            tel: item.tel,
            address: item.province + item.city + item.county + " " + item.addressDetail
          })
        }
      })
    }
  },

  components: {
    [NavBar.name]: NavBar,
    [AddressList.name]: AddressList 
  }
};
</script>


<style lang="scss" scoped>

  .address{
    width: 100%;
    height: 500px;
    /*border: 1px solid #ccc;*/
  }

  .address-table{
    width: 80%;
    margin: 20px auto;
    border: 1px solid #ccc;
  }

  .address-table tr{
    border: 1px solid #ccc;
    height: 40px;
    line-height: 40px;
  }

  tr:hover{
    background-color:#EBECF0;
  }

  .th{
    background-color: #EBECF0;
  }

  .address-table td{
    border: 1px solid #ccc;
    padding-left: 10px;
  }

  .icon-bianji{
    margin-left: 10px;
  }

  .title{
    width: 20%;
    margin: 20px auto;
    height: 40px;
    border-bottom: 1px solid #eee;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
    font-family: "华文新魏";
  }

  .add{
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #F45353;
    color: #fff;
    margin-left: 81%;
    cursor: pointer;
  }

  .edit-button{
    width: 50px;
    height: 100%;
    cursor: pointer;
  }


/*.addressGroup {*/
  /*margin-bottom: 10px;*/
  /*&:last-child {*/
    /*margin-bottom: 0;*/
  /*}*/
/*}*/

/*.bottom_btn {*/
  /*position: fixed;*/
  /*bottom: 0;*/
/*}*/
</style>
