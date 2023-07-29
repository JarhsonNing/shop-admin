<template>
    <div class="editMenuDialog">
        <el-dialog width="70vw" v-model="dialogVisible" title="编辑菜单">
            <div style="height: 50vh; overflow: auto">
                <el-form label-width="100px" :model="formData">
                    <el-form-item label="名称">
                        <el-input v-model="formData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="排序">
                        <el-input-number v-model="formData.sort"></el-input-number>
                    </el-form-item>
                    <el-form-item label="商品">
                        <el-button type="primary" @click="handleSelectGoods">选择</el-button>
                    </el-form-item>
                    <el-form-item>
                        <template v-for="goods in formData.items">
                            <goods-card :goods="goods"></goods-card>
                        </template>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <div>
                    <el-button type="primary" @click="handleSubmit">保存</el-button>
                </div>
            </template>
        </el-dialog>
        <select-goods-dialog ref="selectGoodsDialog" />
    </div>
</template>

<script setup>
import {reactive, ref} from 'vue'
import {createMenu, updateMenu} from '@/api/menu.js'
import SelectGoodsDialog from '@/views/menu/components/selectGoodsDialog.vue'
import GoodsCard from '@/views/goods/components/goodsCard.vue'

const dialogVisible = ref(false);
const formData = reactive({
    id: '',
    name: '',
    sort: '',
    items: []
})
const selectGoodsDialog = ref()

const handleSelectGoods = () => {
    selectGoodsDialog.value.open(formData.items).then(selected => {
        formData.items = selected
    })
}

const handleSubmit = () => {
    formData.items = formData.items.map(item => item.id)
    if (mode.value === 'addNew') {
        return createMenu(formData).then(() => {
            dialogResolve();
            dialogVisible.value = false;
        })
    } else {
        return updateMenu(formData).then(() => {
            dialogResolve();
            dialogVisible.value = false;
        })
    }
}

const mode = ref('addNew')
let dialogResolve;
let dialogReject;

function open(openMode, data) {
    if (openMode === 'addNew') {
        Object.assign(formData, {
            id: '',
            name: '',
            sort: '',
            items: []
        })
    } else {
        console.log(data)
        Object.assign(formData, {
            ...data,
        })
    }
    mode.value = openMode;
    dialogVisible.value = true
    return new Promise((resolve, reject) => {
        dialogReject = reject;
        dialogResolve = resolve;

    })
}

defineExpose({
    open
})
</script>

<style scoped>

</style>
