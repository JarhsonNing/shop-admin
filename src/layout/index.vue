<template>
    <div class="common-layout">
        <div class="common-layout-header">
            <div class="common-layout-header">胖崽寿司店管理后台</div>
        </div>
        <div class="common-layout-main">
            <div class="common-layout-side-menu">
                <div class="toggle">
                    <div @click="toggle" class="toggle-icon">
                        <el-icon size="24px">
                            <Expand v-if="isCollapse" />
                            <Fold v-else />
                        </el-icon>
                    </div>
                </div>
                <div class="menu">
                    <side-menu :is-collapse="isCollapse"></side-menu>
                </div>
            </div>
            <div class="common-layout-content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup>
import SideMenu from "@/layout/components/side-menu.vue";
import {ref} from "vue";

const isCollapse = ref(false);
const toggle = () => {
    isCollapse.value = !isCollapse.value;
}
</script>

<style lang="scss" scoped>
.common-layout {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    .common-layout-header {
        height: 80px;
        width: 100%;
    }

    .common-layout-main {
        width: 100%;
        flex: 1;
        overflow: hidden;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .common-layout-side-menu {
        height: 100%;
        display: flex;
        flex-direction: column;

        .toggle {
            width: 100%;
            text-align: center;
        }

        .menu {
            flex: 1;
            width: 100%;
            overflow: hidden;
        }
    }

    .common-layout-content {
        flex: 1;
        height: 100%;
        overflow: hidden;
    }
}
</style>