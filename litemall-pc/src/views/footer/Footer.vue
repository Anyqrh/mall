<template>
    <div class="footer">
        <div class="footer-container container">
            <div class="footer-text">
                <div class="company-name"><span class="text-title">公司名称：</span><span>福州新达厨具</span></div>
                <div class="company-address"><span class="text-title">公司地址：</span><span>福州市晋安区新店镇义井工业区21号</span></div>
                <div class="company-phone"><span class="text-title">公司电话：</span><span>18059021050</span></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "footer"
    }
</script>

<style scoped>
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
</style>