<template>
    <div class="selectGoodsDialog">
        <el-dialog  style="width: 70vw" v-model="dialogVisible" title="选择商品">
            <el-form @submit.prevent>
                <el-form-item label="商品名">
                    <el-input v-model="filterText"></el-input>
                </el-form-item>
            </el-form>
            <div class="select-goods-list">
                <template v-for="goods in filterGoodsList">
                    <div
                        :class="{
                            'select-goods-item': true,
                            'selected': selected(goods)
                        }"
                        @click="handleToggleGoods(goods)"
                    >
                        <div>
                            {{selected(goods) ? '已选择' : ''}}
                        </div>
                        <goods-card :goods="goods"></goods-card>
                    </div>
                </template>
            </div>
            <template #footer>
                <div>
                    <el-button type="primary" @click="handleConfirm">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import {computed, reactive, ref} from 'vue'
import GoodsCard from '@/views/goods/components/goodsCard.vue'
import {listGoods} from '@/api/goods.js'
import {cloneDeep} from 'lodash-es'

const dialogVisible = ref(false);
const goodsList = ref([]);
const selectedList = ref([]);
const filterText = ref('');
const filterGoodsList = computed(() => {
    return goodsList.value.filter(item => item.name.includes(filterText.value))
})
function fetchGoodsList() {
    listGoods().then(res => {
        goodsList.value = res || []
    })
}

function selected(goods) {
    return selectedList.value.some(item => item.id == goods.id)
}

let dialogResolve;
let dialogReject;

function handleToggleGoods(goods) {
    if (selected(goods)) {
        const foundGoods = selectedList.value.find(item => item.id == goods.id);
        const index = selectedList.value.indexOf(foundGoods);
        selectedList.value.splice(index, 1)
    } else {
        selectedList.value.push(goods)
    }
}

function handleConfirm() {
    dialogVisible.value = false;
    dialogResolve(selectedList.value)
}

function open(data) {
    dialogVisible.value = true;
    selectedList.value = cloneDeep(data || [])
    fetchGoodsList()
    return new Promise((resolve, reject) => {
        dialogReject = reject;
        dialogResolve = resolve;

    })
}

defineExpose({
    open
})
</script>

<style lang="scss" scoped>
.select-goods-list {
    display: flex;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    max-height: 50vh;
    overflow: auto;
}
.select-goods-item {
    padding: 4px;
    margin-right: 8px;

    &.selected {
        background-color: deepskyblue;
    }
}
</style>
