<template>
    <div class="menu-cart">
        <div class="menu-name">
            {{menu.name}}
        </div>
        <div class="menu-operation">
            <el-button-group>
                <el-button @click="handleModify" type="primary">修改</el-button>
                <el-button @click="handleDelete" type="danger">删除</el-button>
            </el-button-group>
        </div>
    </div>
</template>

<script setup>
import {computed, ref} from 'vue'
import {deleteMenu, updateMenu} from '@/api/menu.js'
import {ElMessageBox} from 'element-plus'
import {deleteGoods} from '@/api/goods.js'

const props = defineProps({
    menu: {
        type: Object,
        default: () => ({})
    },
    modify: {
        type: Function,
        default: () => {}
    },
    refresh: {
        type: Function,
        default: () => {}
    }
})
const menu = ref(props.menu);

function handleModify() {
    props.modify(menu.value)
}

function handleDelete() {
    ElMessageBox.confirm("是否确认删除", '提示', {
        type: 'warning'
    }).then(() => {
        deleteMenu(menu.value).then(props.refresh)
    })
}
</script>

<style lang="scss" scoped>
.menu-cart {
    margin: 4px;
    padding: 12px;
    border-radius: 12px;
    background-color: #fff;
}
.menu-name {
    font-size: 32px;
    font-weight: bolder;
    text-align: center;
    margin-bottom: 12px;
}
</style>
