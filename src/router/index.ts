import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import ShopHome from '@/views/demo/shop-admin/home/Home.vue';
import ShopOrder from '@/views/demo/shop-admin/order/ShopOrder.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/shophome',
    component: ShopHome,
    name: 'ShopHome',
    children: [
      {
        path: 'order/:type', // 0是普通订单，1是秒杀订单 2是今日推荐
        component: ShopOrder,
        name: 'Order',
      },
    ],
  },
  {
    path: '/',
    redirect: '/shophome',
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
