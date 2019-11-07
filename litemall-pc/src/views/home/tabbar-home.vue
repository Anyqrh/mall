<template>
    <div class="tab_home" style="background-color: #F1F3F4">
        <!--搜索框-->
        <div class="second">
            <div class="container second-content">
                <div class="logo"><img src="http://129.204.126.160:8080/wx/storage/fetch/xm5r2b4n5ap5fwrdte2p.jpg"/></div>
                <div class="search">
                    <div class="search-icon"><i class="iconfont icon-search"></i></div>
                    <div class="search-input">
                        <input type="text" v-model="searchValue" placeholder="搜索喜欢的物品"/>
                    </div>
                    <div class="search-text" @click="search()">搜索</div>
                </div>
            </div>
        </div>

        <!--分类和轮播图-->
        <div class="third container">

            <!--产品分类-->
            <div class="third-left">
                <div class="class-title">商品分类</div>
                <div class="class-item">
                    <div class="items" @click="changeTabbar(channel)"
                         v-for="(channel, index) in shopInfos.channel"
                         :key="index">{{channel.name}}
                    </div>
                </div>
            </div>

            <!--轮播图-->
            <div class="third-right">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(banner, index) in shopInfos.banner" :key="index">
                            <a :href="banner.link"><img class="lunboImg" :src="banner.url"></a>
                        </div>
                    </div>

                    <!--分页器-->
                    <div class="swiper-pagination"></div>

                    <!--前进后退按钮-->
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                </div>
            </div>
        </div>


        <div class="fourth container">
            <!--人气推荐-->
            <div class="fourth-left">
                <div class="recommend-title">
                    <div class="title-text"><i class="iconfont icon-huo"></i>&nbsp;人气推荐</div>
                    <div class="title-change" @click="randomHot()"><i class="iconfont icon-huanyipi"></i>&nbsp;&nbsp;换一批</div>
                </div>
                <div class="recommend-items">
                    <div class="goods-item" v-for="(groupGood ,index) in shopInfos.hotGoodsList" :key="index"
                         @click="goDetail(groupGood.id)">
                        <div class="goods-img">
                            <img :src="groupGood.picUrl"/>
                        </div>
                        <div class="goods-name">{{groupGood.name}}</div>
                        <div class="goods-info">{{groupGood.brief}}</div>
                        <div class="goods-price">
                            <span class="yuanjia">￥{{groupGood.retailPrice}}</span>
<!--                            <span class="xianjia">￥{{groupGood.counterPrice}}</span>-->
                        </div>
                    </div>
                </div>
            </div>
            <div class="fourth-right">
                <div class="new-title">
                    <div class="title-text"><i class="iconfont icon-xin"></i>&nbsp;新品首发</div>
                    <div class="title-change" @click="randomNew()"><i class="iconfont icon-huanyipi"></i>&nbsp;&nbsp;换一批</div>
                </div>
                <div class="new-items">
                    <div class="new-goods" v-for="(newGood ,index) in shopInfos.newGoodsList" :key="index"
                         @click="goNewDetail(newGood.id)">
                        <div class="newG-img">
                            <img :src="newGood.picUrl"/>
                        </div>
                        <div class="newG-text">
                            <div class="newG-name">{{newGood.name}}</div>
                            <div class="newG-info">{{newGood.brief}}</div>
                            <div class="newG-price">￥{{newGood.retailPrice}}</div>
                        </div>
                    </div>
                </div>
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
        <!--<div class="tal_class_searchBox container">-->
        <!--<van-search placeholder="点击前往搜索" @click="$router.push({ name: 'search' })"/>-->
        <!--<div class="tal_class_searchMask"></div>-->
        <!--</div>-->


        <!--轮播图-->
        <!--<van-swipe :autoplay="3000" indicator-color="white">-->
        <!--<van-swipe-item v-for="(banner, index) in shopInfos.banner" :key="index">-->
        <!--<a :href="banner.link"><img :src="banner.url" style="height:230px"></a>-->
        <!--</van-swipe-item>-->
        <!--</van-swipe>-->

        <!--<div class="goods-channel">-->
        <!--<div class="item"-->
        <!--@click="changeTabbar(channel)"-->
        <!--v-for="(channel, index) in shopInfos.channel"-->
        <!--:key="index">-->
        <!--<img :src="channel.iconUrl" background-size="cover"/>-->
        <!--<span>{{channel.name}}</span>-->
        <!--</div>-->
        <!--</div>-->


        <!--<van-panel title="新品首发">-->
        <!--<van-row gutter>-->
        <!--<van-col span="12" v-for="(newGood ,index) in shopInfos.newGoodsList" :key="index">-->
        <!--<router-link :to="{ path: `/items/detail/${newGood.id}`}">-->
        <!--<img :src="newGood.picUrl" style="width:180px;height:180px;">-->
        <!--<span-->
        <!--style="padding-left: 20px;position: relative;bottom: 10px; color: rgb(123, 116, 116);white-space: nowrap;"-->
        <!--&gt;{{newGood.name}}</span>-->
        <!--<span-->
        <!--style="padding-left: 80px;position: relative;bottom: 10px; color:#ab956d"-->
        <!--&gt;￥ {{newGood.retailPrice}}</span>-->
        <!--</router-link>-->
        <!--</van-col>-->
        <!--</van-row>-->
        <!--</van-panel>-->

        <!--<van-panel title="人气推荐">-->
        <!--<van-card-->
        <!--:thumb-link="goDetail(groupGood.id)"-->
        <!--v-for="(groupGood ,index) in shopInfos.hotGoodsList"-->
        <!--:key="index"-->
        <!--:title="groupGood.name"-->
        <!--:desc="groupGood.brief"-->
        <!--:origin-price="groupGood.counterPrice"-->
        <!--:price="groupGood.retailPrice +'.00'"-->
        <!--:thumb="groupGood.picUrl"-->
        <!--@native-click="goDetail(groupGood.id)"-->
        <!--&gt;-->
        <!--</van-card>-->
        <!--</van-panel>-->

    </div>
</template>


<script>
    import {getHome, goodsCategory, getNew, getHot} from '@/api/api';
    import loadMore from '@/mixin/list-load-more';
    import scrollFixed from '@/mixin/scroll-fixed';
    import _ from 'lodash';

    import {
        List,
        Swipe,
        SwipeItem,
        Tabbar,
        TabbarItem,
        Search,
        Panel,
        CouponCell,
        CouponList,
        Toast,
        Card,
        Row,
        Col,
        Tag
    } from 'vant';

    export default {
        mixins: [loadMore, scrollFixed],

        data() {
            return {
                shopInfos: {
                    banner: [],
                    channel: [],
                    floorGoodsList: [],
                    hotGoodsList: [],
                    newGoodsList: [],
                    topicList: []

                },
                isLoading: true,
                searchValue: "",
                height: 0,
                width: 0,
            };
        },

        created() {
            this.initViews();
        },
        beforeMount() {

        },
        mounted() {

        },
        updated() {
            let mySwiper = new Swiper(".swiper-container", {
                autoplay: true,

                // 分页器
                pagination: {
                    el: '.swiper-pagination',
                },

                // 前进后退按钮
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },

                // 滚动条
                scrollbar: {
                    el: '.swiper-scrollbar',
                },
            });
            this.lunbo();

        },

        methods: {
            goDetail(id) {
                // return `#/items/detail/${id}`;
                this.$router.push({
                    path: "items/detail/" + id
                });
            },
            randomNew() {
                getNew().then(res => {
                    this.shopInfos.newGoodsList = res.data.data.newGoodsList;
                    // console.log(res.data.data.newGoodsList);
                });
            },
            randomHot() {
                getHot().then(res => {
                    this.shopInfos.hotGoodsList = res.data.data.hotGoodsList;
                    console.log(res.data.data.hotGoodsList);
                });
            },
            goNewDetail(id) {
                this.$router.push({
                    path: "/items/detail/" + id
                });
            },
            // 计算轮播图高度
            lunbo() {
                console.log();
                this.height = $(".third-left").height();
                $('.third').css("height", this.height + "px");
                $('.swiper-container').css("height", this.height + "px");
                console.log($('.swiper-container').height());
                $(".lunboImg,.swiper-slide").css({
                    'height': '100%',
                    'width': '100%'
                });
            },
            search() {
                this.$router.push({
                    name: 'search',
                    params: {
                        searchValue: this.searchValue
                    }
                });
                console.log(this.searchValue);
            },
            changeTabbar(o) {
                goodsCategory({id: o.id}).then(res => {
                    let categoryId = res.data.data.currentCategory.id;
                    this.$router.replace({
                        name: 'list',
                        query: {itemClass: categoryId}
                    });
                })
            },
            initViews() {
                getHome().then(res => {
                    this.shopInfos = res.data.data;
                });
            }

        },

        components: {
            // Vue.use(Tabbar).use(TabbarItem);,
            [Row.name]: Row,
            [Col.name]: Col,
            [Card.name]: Card,
            [Toast.name]: Toast,
            [CouponCell.name]: CouponCell,
            [CouponList.name]: CouponList,
            [Search.name]: Search,
            [Panel.name]: Panel,
            [List.name]: List,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem,
            [Tag.name]: Tag
        }
    };
</script>


<style lang="scss" scoped>

    /*搜索框*/
    .second {
        background-color: #fff;
        width: 100%;
    }

    .second-content {
        height: 120px;
        display: flex;
        background-color: #fff;
    }

    .logo {
        width: 120px;
        height: 100px;
        margin-left: 90px;
        margin-top: 10px;
    }

    .logo img {
        width: 100%;
        height: 100%;
    }

    .search {
        width: 500px;
        height: 48px;
        margin-left: 200px;
        margin-top: 40px;
        border: 3px solid #DB3D3C;
        border-radius: 20px;
        display: flex;
    }

    .search input {
        width: 100%;
        height: 40px;
        line-height: 30px;
        padding: 5px;
        border: none;
    }

    .search-icon {
        width: 40px;
        height: 40px;
        margin-left: 5px;
        margin-top: 2px;
    }

    .search-input {
        width: 380px;
        height: 40px;
    }

    .icon-search {
        font-size: 25px;
        margin-left: 10px;
        line-height: 40px;
    }

    .search-text {
        width: 70px;
        height: 100%;
        text-align: center;
        line-height: 40px;
        font-size: 18px;
        color: #fff;
        font-weight: bold;
        background-color: #DB3D3C;
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
        cursor: pointer;
    }

    //分类部分和轮播图
    .third {
        margin-top: 10px;
        display: flex;
        align-items: flex-end;
    }

    .third-left {
        width: 25%;
        margin-right: 10px;
        display: inline-block;
        background-color: #fff;
    }

    .third-right {
        width: 75%;
        background-color: #fff;
        display: inline-block;
    }

    .class-title {
        width: 100%;
        height: 40px;
        background-color: #f45353;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
        color: #fff;
        font-weight: bolder;
    }

    .class-item {
        display: flex;
        flex-wrap: wrap;
        border: 1px solid #f45353;
        padding-bottom: 10px;
    }

    .items {
        width: 45%;
        height: 30px;
        margin-top: 5px;
        margin-left: 10px;
        text-align: left;
        line-height: 20px;
        color: #333;
        padding: 5px;
    }

    .items:hover {
        color: #DB3D3C;
    }

    .swiper-container {
        width: 100%;
        height: 100%;
    }

    .lunboImg {
        width: 100%;
    }

    //人气和新品

    .fourth {
        margin-top: 10px;
        display: flex;
        padding-bottom: 20px;
    }

    .fourth-left {
        width: 50%;
        height: 957px;
        background-color: #fff;
        margin-right: 5px;
    }

    .fourth-right {
        width: 50%;
        height: 957px;
        background-color: #fff;
        margin-left: 5px;
    }

    .recommend-title {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
    }

    .title-text {
        width: 150px;
        height: 100%;
        text-align: center;
        line-height: 50px;
        font-size: 22px;
        color: #222;
    }

    .icon-huo {
        font-size: 24px;
        line-height: 50px;
        color: red;
    }

    .title-change {
        width: 80px;
        height: 100%;
        line-height: 50px;
        font-size: 12px;
        color: #ccc;
        cursor: pointer;
    }

    .title-change:hover {
        color: #1E9FFF;
    }

    .icon-huanyipi {
        font-size: 12px;
        line-height: 50px;
    }

    /*人气*/
    .recommend-items {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }

    .goods-item {
        width: 45%;
        margin-left: 18px;
        margin-top: 18px;
        border: 1px solid #eee;
        padding: 10px 10px;
    }

    .goods-item:hover {
        box-shadow: 0px 0px 5px #ccc;
    }

    .goods-img {
        width: 120px;
        height: 120px;
        margin: 10px auto;
    }

    .goods-img img {
        width: 100%;
        height: 100%;
    }

    .goods-img img:hover {
        transform: scale(1.2);
        -webkit-transform: scale(1.2);
        -moz-transform: scale(1.2);
        -o-transform: scale(1.2);
        -ms-transform: scale(1.2);
    }

    .goods-name {
        width: 100%;
        text-align: center;
        font-size: 14px;
        line-height: 30px;
    }

    .goods-info {
        width: 100%;
        height: 50px;
        padding: 0 5px;
        color: #787878;
        text-indent: 2em;
        font-size: 14px;
        line-height: 25px;
        margin-top: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .goods-price {
        width: 100%;
        height: 30px;
        /*margin-top: 10px;*/
    }

    .yuanjia {
        font-size: 20px;
        color: #db3d3c;
        margin-left: 50px;
    }

    .xianjia {
        font-size: 14px;
        color: #999;
        margin-left: 15px;
        text-decoration: line-through
    }

    /*新品*/
    .new-title {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
    }

    .icon-xin {
        color: red;
        font-size: 24px;
        line-height: 50px;
    }

    .new-items {
        width: 100%;
    }

    .new-goods {
        width: 96%;
        height: 129px;
        border: 1px solid #eee;
        margin-top: 18px;
        margin-left: 10px;
        margin-right: 10px;
        display: flex;
    }

    .new-goods:hover {
        box-shadow: 0px 0px 5px #ccc;
    }

    .newG-img {
        width: 100px;
        height: 100px;
        margin: 10px 10px;
    }

    .newG-img img {
        width: 100%;
        height: 100%;
    }

    .newG-img img:hover {
        transform: scale(1.2);
        -webkit-transform: scale(1.2);
        -moz-transform: scale(1.2);
        -o-transform: scale(1.2);
        -ms-transform: scale(1.2);
    }

    .newG-text {
        width: 400px;
        height: 100%;
    }

    .newG-name {
        width: 100%;
        font-size: 14px;
        line-height: 30px;
        margin-top: 10px;
    }

    .newG-info {
        width: 100%;
        color: #787878;
        font-size: 14px;
        line-height: 25px;
        margin-top: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .newG-price {
        width: 100%;
        height: 30px;
        margin-top: 10px;
        font-size: 20px;
        line-height: 30px;
        color: #db3d3c;
    }

    /*底部*/

    .footer {
        width: 100%;
        background-color: #ddd;
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

    /*.interval_bot {*/
    /*margin-bottom: 10px;*/
    /*}*/

    /*.goods-channel {*/
    /*background: #fff;*/
    /*display: flex;*/
    /*align-items: center;*/
    /*flex-wrap: wrap;*/
    /*padding-bottom: 0px;*/
    /*padding-top: 10px;*/
    /*}*/

    /*.goods-channel .item {*/
    /*width: 80px;*/
    /*height: 60px;*/
    /*margin-left: 10px;*/
    /*}*/

    /*.goods-channel img {*/
    /*display: block;*/
    /*width: 30px;*/
    /*height: 30px;*/
    /*margin: 0 auto;*/
    /*}*/

    /*.goods-channel span {*/
    /*display: block;*/
    /*font-size: 15px;*/
    /*text-align: center;*/
    /*margin: 0 auto;*/
    /*line-height: 1;*/
    /*color: #333;*/
    /*}*/

    /*.van-coupon-cell--selected {*/
    /*color: #323233;*/
    /*}*/

    /*.van-coupon-list {*/
    /*height: 100%;*/
    /*position: relative;*/
    /*background-color: #f8f8f8;*/
    /*}*/

    /*.van-coupon-list__field {*/
    /*padding: 7px 15px;*/
    /*}*/

    /*.van-coupon-list__exchange {*/
    /*height: 32px;*/
    /*line-height: 30px;*/
    /*}*/

    /*.van-coupon-list__list {*/
    /*overflow-y: auto;*/
    /*padding: 15px 0;*/
    /*-webkit-box-sizing: border-box;*/
    /*box-sizing: border-box;*/
    /*-webkit-overflow-scrolling: touch;*/
    /*}*/

    /*.van-coupon-list__close {*/
    /*left: 0;*/
    /*bottom: 0;*/
    /*position: absolute;*/
    /*font-weight: 500;*/
    /*}*/

    /*.van-coupon-list__empty {*/
    /*padding-top: 100px;*/
    /*text-align: center;*/
    /*}*/

    /*.van-coupon-list__empty p {*/
    /*color: #969799;*/
    /*margin: 15px 0;*/
    /*font-size: 14px;*/
    /*line-height: 20px;*/
    /*}*/

    /*.van-coupon-list__empty img {*/
    /*width: 80px;*/
    /*height: 84px;*/
    /*}*/

    /*.van-coupon-item {*/
    /*overflow: hidden;*/
    /*border-radius: 4px;*/
    /*margin: 0 15px 15px;*/
    /*background-color: #fff;*/
    /*-webkit-box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);*/
    /*box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);*/
    /*}*/

    /*.van-coupon-item:active {*/
    /*background-color: #e8e8e8;*/
    /*}*/

    /*.van-coupon-item__content {*/
    /*display: -webkit-box;*/
    /*display: -ms-flexbox;*/
    /*display: flex;*/
    /*height: 100px;*/
    /*padding: 24px 0 0 15px;*/
    /*-webkit-box-sizing: border-box;*/
    /*box-sizing: border-box;*/
    /*border: 1px solid red;*/

    /*}*/

    /*.van-coupon-item h2,*/
    /*.van-coupon-item p {*/
    /*margin: 0;*/
    /*overflow: hidden;*/
    /*white-space: nowrap;*/
    /*text-overflow: ellipsis;*/
    /*}*/

    /*.van-coupon-item h2 {*/
    /*height: 34px;*/
    /*font-weight: 500;*/
    /*line-height: 34px;*/
    /*}*/

    /*.van-coupon-item p {*/
    /*font-size: 12px;*/
    /*line-height: 16px;*/
    /*color: #969799;*/
    /*}*/

    /*.van-coupon-item__head {*/
    /*min-width: 90px;*/
    /*}*/

    /*.van-coupon-item__head h2 {*/
    /*color: #f44;*/
    /*font-size: 24px;*/
    /*}*/

    /*.van-coupon-item__head h2 span {*/
    /*font-size: 50%;*/
    /*}*/

    /*.van-coupon-item__body {*/
    /*-webkit-box-flex: 1;*/
    /*-ms-flex: 1;*/
    /*flex: 1;*/
    /*position: relative;*/
    /*border-radius: 0 4px 4px 0;*/
    /*}*/

    /*.van-coupon-item__body h2 {*/
    /*font-size: 16px;*/
    /*}*/

    /*.van-coupon-item__corner {*/
    /*top: 16px;*/
    /*right: 15px;*/
    /*position: absolute;*/
    /*}*/

    /*.van-coupon-item__corner .van-icon {*/
    /*border-color: #f44;*/
    /*background-color: #f44;*/
    /*}*/

    /*.van-coupon-item__reason {*/
    /*padding: 7px 15px;*/
    /*border-top: 1px dashed #ebedf0;*/
    /*background-color: #fafafa;*/
    /*}*/

    /*.van-coupon-item--disabled:active {*/
    /*background-color: #fff;*/
    /*}*/

    /*.van-coupon-item--disabled .van-coupon-item__content {*/
    /*height: 90px;*/
    /*}*/

    /*.van-coupon-item--disabled h2,*/
    /*.van-coupon-item--disabled p,*/
    /*.van-coupon-item--disabled span {*/
    /*color: #969799;*/
    /*}*/
</style>
