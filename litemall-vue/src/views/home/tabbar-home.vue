<template>
    <div class="tab_home">
        <div class="tal_class_searchBox">
            <van-search placeholder="点击前往搜索" @click="$router.push({ name: 'search' })"/>
            <div class="tal_class_searchMask"></div>
        </div>


        <!-- 轮播图 -->
        <van-swipe :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(banner, index) in shopInfos.banner" :key="index" style="height: 230px">
                <a :href="banner.link"><img class="image" :src="banner.url"></a>
            </van-swipe-item>
        </van-swipe>

        <div class="goods-channel">
            <div class="item"
                 @click="changeTabbar(channel)"
                 v-for="(channel, index) in shopInfos.channel"
                 :key="index">
                <img :src="channel.iconUrl" background-size="cover"/>
                <span>{{channel.name}}</span>
            </div>
        </div>


        <van-panel title="新品首发" style="margin-top: 5px">
            <div class="title-change" @click="randomNew()"><i class="iconfont icon-huanyipi"></i>&nbsp;&nbsp;换一批
            </div>
            <van-row gutter>
                <van-col span="12" v-for="(newGood ,index) in shopInfos.newGoodsList" :key="index">
                    <router-link :to="{ path: `/items/detail/${newGood.id}`}">
                        <img :src="newGood.picUrl" style="width:180px;height:180px;">
                        <div
                                style="width: 100%;height:40px;text-align: center;color: rgb(123, 116, 116);overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2; "
                        >{{newGood.name}}
                        </div>
                        <div
                                style="width: 100%;height:30px;line-height:30px;text-align: center;color:#ab956d"
                        >￥ {{newGood.retailPrice}}
                        </div>
                    </router-link>
                </van-col>
            </van-row>
        </van-panel>

        <van-panel title="人气推荐" style="margin-top: 5px">
            <div class="title-change" @click="randomHot()"><i class="iconfont icon-huanyipi"></i>&nbsp;&nbsp;换一批</div>
            <van-row gutter>
                <van-col span="12" v-for="(hotGood,index) in shopInfos.hotGoodsList" :key="index">
                    <router-link :to="{ path: `/items/detail/${hotGood.id}`}">
                        <img :src="hotGood.picUrl" style="width:180px;height:180px;">
                        <div
                                style="width: 100%;height:40px;text-align: center;color: rgb(123, 116, 116);overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;"
                        >{{hotGood.name}}</div>
                        <div
                                style="width: 100%;
                                height: 30px;line-height:30px;text-align: center;color:#ab956d"
                        >￥ {{hotGood.retailPrice}}</div>
                    </router-link>
                </van-col>
            </van-row>

        </van-panel>

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
                // brandList: [],
                shopInfos: {
                    banner: [],
                    channel: [],
                    floorGoodsList: [],
                    hotGoodsList: [],
                    newGoodsList: [],
                    topicList: []

                },
                isLoading: true,
                searchValue: ""
            };
        },

        created() {
            this.initViews();
        },

        methods: {
            search() {
                this.$router.push({
                    name: 'search',
                    params: {
                        searchValue: this.searchValue
                    }
                })
            },
            goDetail(id) {
                return `#/items/detail/${id}`;
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
                    // console.log(res.data.data.hotGoodsList);
                });
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
    .interval_bot {
        margin-bottom: 10px;
    }

    .image {
        width: 100%;
        height: 100%;
    }

    .goods-channel {
        background: #fff;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding-bottom: 0px;
        padding-top: 10px;
    }

    .goods-channel .item {
        width: 80px;
        height: 60px;
        margin-left: 10px;
    }

    .goods-channel img {
        display: block;
        width: 30px;
        height: 30px;
        margin: 0 auto;
    }

    .goods-channel span {
        display: block;
        font-size: 15px;
        text-align: center;
        margin: 0 auto;
        line-height: 1;
        color: #333;
    }

    .van-coupon-cell--selected {
        color: #323233;
    }

    .van-coupon-list {
        height: 100%;
        position: relative;
        background-color: #f8f8f8;
    }

    .van-coupon-list__field {
        padding: 7px 15px;
    }

    .van-coupon-list__exchange {
        height: 32px;
        line-height: 30px;
    }

    .van-coupon-list__list {
        overflow-y: auto;
        padding: 15px 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-overflow-scrolling: touch;
    }

    .van-coupon-list__close {
        left: 0;
        bottom: 0;
        position: absolute;
        font-weight: 500;
    }

    .van-coupon-list__empty {
        padding-top: 100px;
        text-align: center;
    }

    .van-coupon-list__empty p {
        color: #969799;
        margin: 15px 0;
        font-size: 14px;
        line-height: 20px;
    }

    .van-coupon-list__empty img {
        width: 80px;
        height: 84px;
    }

    .van-coupon-item {
        overflow: hidden;
        border-radius: 4px;
        margin: 0 15px 15px;
        background-color: #fff;
        -webkit-box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
    }

    .van-coupon-item:active {
        background-color: #e8e8e8;
    }

    .van-coupon-item__content {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        height: 100px;
        padding: 24px 0 0 15px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border: 1px solid red;

    }

    .van-coupon-item h2,
    .van-coupon-item p {
        margin: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .van-coupon-item h2 {
        height: 34px;
        font-weight: 500;
        line-height: 34px;
    }

    .van-coupon-item p {
        font-size: 12px;
        line-height: 16px;
        color: #969799;
    }

    .van-coupon-item__head {
        min-width: 90px;
    }

    .van-coupon-item__head h2 {
        color: #f44;
        font-size: 24px;
    }

    .van-coupon-item__head h2 span {
        font-size: 50%;
    }

    .van-coupon-item__body {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        position: relative;
        border-radius: 0 4px 4px 0;
    }

    .van-coupon-item__body h2 {
        font-size: 16px;
    }

    .van-coupon-item__corner {
        top: 16px;
        right: 15px;
        position: absolute;
    }

    .van-coupon-item__corner .van-icon {
        border-color: #f44;
        background-color: #f44;
    }

    .van-coupon-item__reason {
        padding: 7px 15px;
        border-top: 1px dashed #ebedf0;
        background-color: #fafafa;
    }

    .van-coupon-item--disabled:active {
        background-color: #fff;
    }

    .van-coupon-item--disabled .van-coupon-item__content {
        height: 90px;
    }

    .van-coupon-item--disabled h2,
    .van-coupon-item--disabled p,
    .van-coupon-item--disabled span {
        color: #969799;
    }

    .title-change {
        width: 80px;
        height: 100%;
        line-height: 50px;
        font-size: 12px;
        color: #ccc;
        cursor: pointer;
        margin-top: -10px;
        margin-left: auto;
    }

</style>
