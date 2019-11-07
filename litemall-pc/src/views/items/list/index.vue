<template>

    <div class="list">
        <div v-model="navActive">
            <div class="list-title">
                <div class="title-container">
                    <div class="big-title">{{currentCategory.name}}</div>
                    <div class="small-title">{{currentCategory.desc}}</div>
                </div>
            </div>
            <div class="list-content container">
                <div class="list-name">
                    <div class="name-title">商品分类</div>
                    <div class="name-items">
                        <div class="name-item" v-for="(nav, index) in navList" :key="index" @click="changeGoods(nav.id)">
                            <div class="name-left">{{nav.name}}</div>
                            <div class="name-right"><i class="iconfont icon-right"></i></div>
                        </div>
                    </div>
                </div>
                <div class="list-item">
                    <div class="goods-item" v-for="(item, i) in goodsList" :key="i" @click="itemClick(item.id)">
                        <div class="goods-img">
                            <div class="img">
                                <img :src="item.picUrl"/>
                            </div>
                        </div>
                        <div class="goods-text">
                            <div class="goods-name">{{item.name}}</div>
                            <div class="goods-info">{{item.brief}}</div>
                            <div class="goods-price">￥{{item.retailPrice}}</div>
                        </div>
                    </div>
                    <is-empty style="height: 600px;" v-if="goodsList.length === 0">该分类下暂无商品</is-empty>
                </div>
            </div>
        </div>
    </div>

    <!--<div class="item_list over-hide">-->
    <!--<van-tabs v-model="navActive" @click="handleTabClick">-->
    <!--<van-tab v-for="(nav, index) in navList" :title="nav.name" :key="index">-->
    <!--&lt;!&ndash; <InfinityScroll-->
    <!--:ref="'tabScrolls' + tabIndex"-->
    <!--class="full-page scroll-wrap fix-height"-->
    <!--:beforeRequest="beforeRequest"-->
    <!--:apiUrl="listApi"-->
    <!--@onLoad="onLoad(tabIndex, $event)"-->
    <!--&gt; &ndash;&gt;-->
    <!--<div class="h">-->
    <!--<div class="name">{{currentCategory.name}}</div>-->
    <!--<div class="desc">{{currentCategory.desc}}</div>-->
    <!--</div>-->
    <!--<div class="container">-->
    <!--<item-group>-->
    <!--<item-card-hori-->
    <!--v-for="(item, i) in goodsList"-->
    <!--:key="i"-->
    <!--:goods="item"-->
    <!--@click="itemClick(item.id)"-->
    <!--/>-->
    <!--</item-group>-->
    <!--</div>-->
    <!--&lt;!&ndash; </InfinityScroll> &ndash;&gt;-->
    <!--</van-tab>-->
    <!--</van-tabs>-->
    <!--</div>-->
</template>

<script>
    import {goodsCategory, goodsList, GoodsList} from '@/api/api';

    import ItemGroup from '@/components/item-group';
    import IsEmpty from '@/components/is-empty/';
    import ItemCardHori from '@/components/item-card-hori/';
    import {Search, Tab, Tabs, Popup} from 'vant';
    import InfinityScroll from '@/components/infinity-scroll';

    export default {
        name: 'Item-list',
        props: {
            itemClass: {
                type: [String, Number],
                default: ''
            }
        },

        data() {
            return {
                categoryId: this.itemClass,
                listApi: GoodsList,
                goodsList: [],
                currentCategory: {},
                navList: [],
                navActive: 0
            };
        },

        created() {
            this.init();
        },

        methods: {
            handleTabClick(index) {
                this.categoryId = this.navList[index].id;
                this.$router.replace({
                    name: 'list',
                    query: {itemClass: this.categoryId}
                });
                this.init();
            },
            changeGoods(id){
                this.categoryId = id;
                this.getGoodsList();
                goodsCategory({id: this.categoryId}).then(res => {
                    this.currentCategory = res.data.data.currentCategory;
                });
            },

            init() {
                goodsCategory({id: this.categoryId}).then(res => {
                    this.navList = res.data.data.brotherCategory;
                    this.currentCategory = res.data.data.currentCategory;

                    // 当id是L1分类id时，这里需要重新设置成L1分类的一个子分类的id
                    if (res.data.data.parentCategory.id == this.categoryId) {
                        this.categoryId = res.data.data.currentCategory.id;
                    }

                    for (let i = 0; i < this.navList.length; i++) {
                        if (this.navList[i].id == this.categoryId) {
                            this.navActive = i
                            break;
                        }
                    }
                    this.getGoodsList();
                });
            },
            itemClick(itemId) {
                this.$router.push(`/items/detail/${itemId}`);
            },
            getGoodsList() {
                goodsList({categoryId: this.categoryId}).then(res => {
                    this.goodsList = res.data.data.list
                });
                // console.log(res.data.data.list)
            },
        },

        components: {
            InfinityScroll,
            [ItemGroup.name]: ItemGroup,
            [ItemCardHori.name]: ItemCardHori,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [IsEmpty.name]: IsEmpty,
            [Search.name]: Search,
            [Popup.name]: Popup
        }
    };
</script>

<style lang="scss" scoped>

    .list {
        height: 100%;
    }

    .list-title {
        width: 100%;
        height: 120px;
        /*border: 1px solid #ccc;*/
        background-color: #fff;
    }

    .list-content {
        width: 100%;
        /*height: 100%;*/
        /*height: 500px;*/
        /*background-color: #fff;*/
        margin-top: 10px;
        display: flex;
        align-items: start;
        /*margin-bottom: 10px;*/
    }

    .list-name {
        width: 25%;
        /*height: 500px;*/
        background-color: #fff;
        margin-bottom: 10px;
    }

    .list-item {
        width: 74%;
        /*height: 500px;*/
        background-color: #fff;
        margin-left: 10px;
        margin-bottom: 10PX;
    }

    .title-container {
        width: 600px;
        height: 80px;
        /*border: 1px solid #ccc;*/
        margin: 20px auto;
    }

    .big-title {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 20px;
        color: #333;
        text-align: center;
    }

    .small-title {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        text-align: center;
        color: #999999;
    }

    .name-title {
        width: 100%;
        height: 40px;
        border-left: 3px solid #DB3D3C;
        padding-left: 20px;
        line-height: 40px;
        font-size: 18px;
        color: #333;
        /*border-bottom: 1px solid #eee;*/
    }

    .name-items {
        width: 100%;
        /*height: 300px;*/
        /*border: 1px solid #ccc;*/
        margin-top: 10px;
        padding-bottom: 10px;
    }

    .name-item {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        color: #999;
    }

    .name-item:hover {
        background-color: #f9c7c7;
        color: #333;
    }

    .name-left {
        width: 80%;
        height: 100%;
        padding: 5px 20px;
        line-height: 30px;
        font-size: 14px;
    }

    .name-right {
        width: 20%;
        height: 100%;
    }

    .icon-right {
        font-size: 12px;
        line-height: 40px;
        margin-left: 20px;
    }

    .goods-item {
        width: 100%;
        height: 180px;
        border-bottom: 1px solid #eee;
        display: flex;
    }

    .goods-img {
        width: 25%;
        height: 100%;
        /*border: 1px solid #ccc;*/
    }

    .img {
        width: 80%;
        height: 80%;
        /*border: 1px solid #ccc;*/
        margin: 10% auto;
    }

    .img img {
        width: 100%;
        height: 100%;
    }

    .goods-text {
        width: 75%;
        height: 80%;
        margin-top: 20px;
        /*border: 1px solid #ccc;*/
    }

    .goods-name {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        color: #333;
        margin-top: 10px;
    }

    .goods-info {
        width: 100%;
        height: 40px;
        line-height: 40px;
        color: #999;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .goods-price {
        width: 100%;
        height: 40px;
        font-size: 16px;
        line-height: 40px;
        color: #db3d3c;
    }

    /*.fade-enter,*/
    /*.fade-leave-to {*/
    /*opacity: 0;*/
    /*}*/

    /*.fade-enter-active,*/
    /*.fade-leave-active {*/
    /*transition: all 0.5s;*/
    /*}*/

    /*.fix-height {*/
    /*padding-bottom: 88px;*/
    /*}*/

    /*.over-hide {*/
    /*overflow: hidden;*/
    /*}*/

    /*.item_list {*/
    /*background-color: #fff;*/
    /*padding-bottom: 0;*/
    /*}*/

    /*.fixedTop {*/
    /*position: fixed;*/
    /*width: 100%;*/
    /*top: 0;*/
    /*z-index: 999;*/
    /*}*/

    /*.items_loading {*/
    /*margin: 0 auto;*/
    /*}*/

    /*.h {*/
    /*height: 100px;*/
    /*width: 100%;*/
    /*display: flex;*/
    /*flex-direction: column;*/
    /*align-items: center;*/
    /*}*/

    /*.h .name {*/
    /*display: block;*/
    /*height: 30px;*/
    /*margin-bottom: 10px;*/
    /*font-size: 20px;*/
    /*color: #333;*/
    /*}*/

    /*.h .desc {*/
    /*display: block;*/
    /*height: 24px;*/
    /*font-size: 16px;*/
    /*color: #999;*/
    /*}*/

</style>
