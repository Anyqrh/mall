<template>
    <div>
        <van-nav-bar title="常见问题" left-text="返回" left-arrow @click-left="goback"/>
        <van-collapse :accordion="true" v-model="activeNames">
            <van-collapse-item :title="issue.question" :name="index" v-for="(issue, index) in issueList" :key="index">
                {{issue.answer}}
            </van-collapse-item>
        </van-collapse>
    </div>
</template>

<script>
    import {Collapse, CollapseItem, NavBar} from 'vant';
    import {issueList} from '@/api/api';

    export default {
        data() {
            return {
                activeNames: [-1],
                issueList: []
            };
        },
        created() {
            this.getIssueList();
        },
        methods: {
            goback() {
                this.$router.go(-1);
            },
            getIssueList() {
                issueList().then(res => {
                    this.issueList = res.data.data.list
                })
            }
        },

        components: {
            [Collapse.name]: Collapse,
            [NavBar.name]: NavBar,
            [CollapseItem.name]: CollapseItem
        }
    };
</script>