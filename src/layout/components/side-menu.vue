<script setup>
const props = defineProps({
    isCollapse: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <el-menu router :collapse-transition="false" default-active="/" class="side-menu" :collapse="props.isCollapse">
        <el-menu-item index="/">
            <el-icon><Menu /></el-icon>
            <template #title>
                <span>订单管理</span>
            </template>
        </el-menu-item>
        <el-menu-item index="/goods">
            <el-icon><Menu /></el-icon>
            <template #title>
                <span>商品管理</span>
            </template>
        </el-menu-item>
        <el-menu-item index="/menu">
            <el-icon><Menu /></el-icon>
            <template #title>
                <span>菜单管理</span>
            </template>
        </el-menu-item>
    </el-menu>
</template>

<style lang="scss" scoped>
.side-menu {
    height: 100%;
}
</style>
