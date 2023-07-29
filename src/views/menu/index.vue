<template>
    <div class="menu">
        <div class="menu-operation">
            <el-form inline @submit.prevent>
                <el-form-item>
                    <el-button type="primary" @click="handleAddMenu">新增菜单</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="menu-content">
            <template v-for="menu in menuList" :key="menu.name">
                <menu-cart :modify="handleModify" :refresh="fetchMenu" :menu="menu" />
            </template>
        </div>
        <edit-menu-dialog ref="editMenuDialog" />
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {detailMenu, listMenu} from '@/api/menu.js'
import MenuCart from '@/views/menu/components/menu-cart.vue'
import EditMenuDialog from '@/views/menu/components/editMenuDialog.vue'

const name = ref('');
const menuList = ref([]);
const editMenuDialog = ref()
function fetchMenu() {
    listMenu().then(res => {
        menuList.value = res || []
    })
}
fetchMenu()
const handleAddMenu = function () {
    editMenuDialog.value.open('addNew').then(fetchMenu)
}
const handleModify = function (menu) {
    detailMenu(menu).then(detailMenu => {
        editMenuDialog.value.open('modify', detailMenu).then(() => {
            console.log(123)
            fetchMenu()
        })
    })
}
</script>

<style lang="scss" scoped>
.menu {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    background-color: #eee;
    display: flex;
    flex-direction: column;
}
.menu-operation {
    box-sizing: border-box;
    margin: 4px;
    padding: 12px;
    border-radius: 12px;
    background-color: #fff;
}
.menu-content {
    flex: 1;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
}
</style>
