<template>
    <div class="goods-item-card" @click="emits('click')">
        <div class="goods-item-image">
            <el-image :src="`/api/file/${goods.image}`"></el-image>
        </div>
        <div class="goods-item-detail">
            <div class="goods-item-name">{{goods.name}}</div>
            <div class="goods-item-tags">
                <template v-for="item in goods.tags">
                    <el-tag type="info" size="small" style="margin-right: 4px">{{item}}</el-tag>
                </template>
            </div>
            <div class="goods-item-sales">月售: {{goods.sales}}</div>
            <div class="goods-item-price">¥{{goods.price}}</div>
            <div v-if="props.showDelete">
                <el-button type="danger" @click.stop="handleDelete">删除</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {ElMessageBox} from 'element-plus'
import {deleteGoods} from '@/api/goods.js'

const props = defineProps({
    goods: {
        type: Object
    },
    reload: {
        type: Function
    },
    showDelete: {
        type: Boolean,
        default: false
    }
})
const goods = ref(props.goods)
const emits = defineEmits(['click'])

const handleDelete = () => {
    ElMessageBox.confirm("是否确认删除", '提示', {
        type: 'warning'
    }).then(() => {
        deleteGoods(goods.value.id).then(props.reload)
    })
}
</script>

<style lang="scss" scoped>

.goods-item-card {
    box-sizing: border-box;
    border-radius: 12px;
    background-color: #fff;
    padding: 12px;
    margin: 8px;
    display: flex;
    cursor: pointer;
}

.goods-item-detail {
    padding: 0 12px;
    font-size: 12px;
}

.goods-item-name {
    font-size: 24px;
    font-weight: bolder;
}

.goods-item-image {
    height: 100px;
    width: 100px;
}
</style>
