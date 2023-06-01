import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import ShopHome from '@/views/demo/shop-admin/home/Home.vue';
import ShopOrder from '@/views/demo/shop-admin/order/ShopOrder.vue';
import ShopGoods from '@/views/demo/shop-admin/goods/ShopGoods.vue';
import GoodCategory from '@/views/demo/shop-admin/goods/GoodCategory.vue';
import AddGoods from '@/views/demo/shop-admin/goods/AddGoods.vue';
import ManagerList from '@/views/demo/shop-admin/manager/ManagerList.vue';
import ManagerReqList from '@/views/demo/shop-admin/manager/ManagerReqList.vue';
import ManagerOrder from '@/views/demo/shop-admin/manager/ManagerOrder.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/shophome',
    component: ShopHome,
    name: 'ShopHome',
    children: [
      {
        path: 'order/:type', // 0是普通订单，1是秒杀订单
        component: ShopOrder,
        name: 'Order',
      },
      {
        path: 'goods/:type', // 0是普通商品，1是秒杀商品 2是今日推荐
        component: ShopGoods,
        name: 'Goods',
      },
      {
        path: 'addGood/:type', // 0是普通商品，1是秒杀商品 2是今日推荐
        component: AddGoods,
        name: 'AddGoods',
      },
      {
        path: 'goodCategory',
        component: GoodCategory,
        name: 'category',
      },
      {
        path: 'ownerlist',
        component: ManagerList,
        name: 'ManangerList',
      },
      {
        path: 'ownerreq',
        component: ManagerReqList,
        name: 'ManangerReqList',
      },
      {
        path: 'ownerorder',
        component: ManagerOrder,
        name: 'ManangerOrder',
      },
    ],
  },
  {
    path: '/',
    redirect: '/shophome/order/0',
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
