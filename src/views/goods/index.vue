<script setup>
 import {ref} from 'vue'
 import {listGoods} from '@/api/goods.js'
 import EditGoodsDialog from '@/views/goods/components/editGoodsDialog.vue'
 import GoodsCard from '@/views/goods/components/goodsCard.vue'

 const goodsList = ref([]);
 const editGoodsDialog = ref();
 function fetchTableData() {
     return listGoods().then(res => {
         console.log(res)
         goodsList.value = res || []
     })
 }
 fetchTableData()

 function handleAddNew() {
     editGoodsDialog.value.open('addNew').then(() => {
         fetchTableData()
     })
 }

 function handleModify(goods) {
     editGoodsDialog.value.open('modify', goods).then(() => {
         fetchTableData()
     })
 }
</script>

<template>
    <div class="goods-list">
        <div class="goods-list-operation">
            <el-button type="primary" @click="handleAddNew">新增</el-button>
            <edit-goods-dialog ref="editGoodsDialog" />
        </div>
        <template v-for="goods in goodsList" :key="goods.name">
            <goods-card :goods="goods" :reload="fetchTableData" show-delete @click="handleModify(goods)"></goods-card>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.goods-list {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    padding: 4px;
    background-color: #eee;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    overflow-y: scroll;
}

.goods-list-operation {
    width: 100%;
    padding: 12px;
    border-radius: 12px;
    background-color: #fff;
    position: sticky;
    top: 0;
    z-index: 10000;
}

</style>
