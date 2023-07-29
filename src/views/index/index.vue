<template>
<div class="order-list">
    <div class="order-list-filter">
        <el-form-item label="订单日期">
            <el-date-picker v-model="searchDate" @change="fetchOrderList"></el-date-picker>
        </el-form-item>
    </div>
    <div class="order-list-content">
        <template v-for="order in orderList">
            <div class="order-cart">
                <div class="order-cart-number">{{order.no}}号¥{{order.price}}</div>
                <div class="order-cart-name">
                    <div v-for="item in order.items">
                        {{item.name}} X {{item.number}}
                    </div>
                </div>
            </div>
        </template>
    </div>
</div>
</template>

<script setup>

import {ref} from 'vue'
import {listOrder} from '@/api/order.js'
import moment from 'moment'

const orderList = ref([]);
const searchDate = ref(moment().format('YYYY-MM-DD'))
function fetchOrderList() {
    return listOrder({
        date: searchDate.value
    }).then(res => {
        orderList.value = res || []
    })
}
fetchOrderList()

</script>

<style lang="scss" scoped>
.order-list {
    height: 100%;
    width: 100%;
    background-color: #eee;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
}
.order-list-filter {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 12px;
    margin: 4px;
    background-color: #fff;
}
.order-list-content {
    flex: 1;
    overflow-y: auto;
    width: 100%;
    background-color: #eee;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
}
.order-cart {
    background-color: #fff;
    margin: 4px;
    padding: 12px;
    border-radius: 8px;
    height: 100px;
    width: 250px;
}
.order-cart-number {
    font-size: 32px;
    font-weight: bolder;
    text-align: center;
}
</style>
