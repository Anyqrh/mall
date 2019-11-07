<template>
    <div class="user_collect">
        <div class="container">
            <div class="goods-item" v-for="(item, i) in items" @click="itemClick(i,item)">
                <div class="goods-img">
                    <img :src="item.picUrl" />
                </div>
                <div class="goods-text">
                    <div class="goods-name">{{item.name}}</div>
                    <div class="goods-info">{{item.brief}}</div>
                    <div class="goods-price">￥{{item.retailPrice}}</div>
                </div>
                <div class="goods-delete">
                    <div class="delete-button" @click.stop="cancelCollect($event, i,item)">取消</div>
                </div>
            </div>
            <is-empty v-if="items.length === 0">没有商品收藏</is-empty>


            <!--<van-list-->
                    <!--v-model="loading"-->
                    <!--:finished="finished"-->
                    <!--:immediate-check="false"-->
                    <!--:offset="100"-->
                    <!--@load="loadMore"-->
            <!--&gt;-->
                <!--<item-group>-->
                    <!--<item-card-hori-->
                            <!--v-for="(item, i) in items"-->
                            <!--:style="{backgroundColor: !item.goods_status && '#fcfcfc'}"-->
                            <!--:key="i"-->
                            <!--:goods="item"-->
                            <!--@click="itemClick(i,item)"-->
                    <!--&gt;-->
                        <!--<van-icon-->
                                <!--name="lajitong"-->
                                <!--slot="footer"-->
                                <!--@click.stop="cancelCollect($event, i,item)"-->
                                <!--style="float: right;"-->
                        <!--/>-->
                    <!--</item-card-hori>-->
                <!--</item-group>-->
            <!--</van-list>-->

            <!--<is-empty v-if="items.length === 0">没有商品收藏</is-empty>-->
        </div>
    </div>
</template>

<script>
    import {collectList, collectAddOrDelete} from '@/api/api';

    import ItemGroup from '@/components/item-group/';
    import ItemCardHori from '@/components/item-card-hori/';
    import IsEmpty from '@/components/is-empty/';
    import {Search, List} from 'vant';

    import loadMore from '@/mixin/list-load-more';
    import scrollFixed from '@/mixin/scroll-fixed';

    export default {
        mixins: [loadMore, scrollFixed],

        data() {
            return {
                page: 1,
                limit: 10,
                total: 0,
                items: []
            };
        },

        created() {
            this.init();
        },

        methods: {
            init() {
                collectList({type: 0, page: this.page, limit: this.limit}).then(res => {
                    this.page = res.data.data.page;
                    this.limit = res.data.data.limit;
                    this.total = res.data.data.total;
                    this.items.push(...res.data.data.list);
                    console.log(res.data.data.list)
                });
            },
            cancelCollect(event, i, item) {
                if (confirm("是否取消收藏该产品")) {
                    collectAddOrDelete({valueId: item.valueId, type: 0}).then(res => {
                                this.items.splice(i, 1);
                           });

                }else {

                }
            },
            itemClick(i, item) {
                this.$router.push(`/items/detail/${item.valueId}`);
            }
        },

        components: {
            [ItemGroup.name]: ItemGroup,
            [ItemCardHori.name]: ItemCardHori,
            [Search.name]: Search,
            [IsEmpty.name]: IsEmpty,
            [List.name]: List
        }
    };
</script>

<style lang="scss" scoped>

    .goods-item{
        width: 100%;
        height: 150px;
        border-bottom: 1px solid #eee;
        display: flex;
    }

    .goods-img{
        width: 110px;
        height: 110px;
        /*border: 1px solid #ddd;*/
        margin: 20px 20px;
    }

    .goods-img img{
        width: 100%;
        height: 100%;
    }

    .goods-text{
        width: 800px;
        height: 100%;
        /*border: 1px solid #ccc;*/
    }

    .goods-delete{
        width: 200px;
        height: 100%;
        /*border: 1px solid #ccc;*/
    }

    .goods-name{
        width: 100%;
        height: 40px;
        /*border: 1px solid #ccc;*/
        line-height: 40px;
        font-size: 16px;
        margin-top: 15px;
    }

    .goods-info{
        width: 100%;
        height: 40px;
        /*border: 1px solid #ccc;*/
        font-size: 14px;
        line-height: 40px;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .goods-price{
        width: 100%;
        height: 40px;
        /*border: 1px solid #ccc;*/
        line-height: 40px;
        font-size: 16px;
        color: #db3d3c;
    }

    .delete-button{
        width: 80px;
        height: 30px;
        /*border: 1px solid #ccc;*/
        margin-top: 100px;
        margin-left: 80px;
        background-color: #F45353;
        color: #fff;
        text-align: center;
        line-height: 30px;
    }


    .user_collect{
        background-color: #fff;
    }

    .clear_invalid {
        width: 120px;
        color: $font-color-gray;
        border: 1px solid $font-color-gray;
        margin: 0 auto;
        text-align: center;
        padding: 5px 3px;
        margin-top: 20px;
        border-radius: 3px;
    }
</style>
