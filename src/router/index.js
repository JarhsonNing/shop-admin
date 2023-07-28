import {createRouter, createWebHashHistory} from 'vue-router'
/* Layout */
import Layout from '@/layout'

// 公共路由
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login'),
        hidden: true
    },
    {
        path: "/:pathMatch(.*)*",
        component: () => import('@/views/error/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/error/401'),
        hidden: true
    },
    {
        path: '',
        component: Layout,
        redirect: '/index',
        children: [
            {
                path: '/index',
                component: () => import('@/views/index'),
                name: 'Index',
                meta: {title: '所有订单', icon: 'dashboard', affix: true}
            },
            {
                path: '/goods',
                component: () => import('@/views/goods'),
                name: 'Goods',
                meta: {title: '商品管理', icon: 'dashboard', affix: true}
            }
        ]
    },
    {
        path: '/404',
        component: () => import('@/views/error/404'),
        hidden: true
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {top: 0}
        }
    },
});

export default router;
