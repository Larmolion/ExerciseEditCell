<template>
  <el-container id="container" style="height: 100%">
    <el-aside width="250px" style="height: 100%; background-color: #545c64">
      <el-container id="top">
        <img
          style="width: 25px; height: 25px; margin: auto 0 auto auto"
          src="~@/assets/logo.png"
          alt="1"
        />
        <div
          style="margin: auto auto auto 10px; color: #ffffff; font-size: 17px"
        >
          可更新和编辑的HTML练习
        </div>
      </el-container>
      <!--边框对齐，设置：border-right: none-->

      <el-menu
        :default-active="$route.path"
        style="border-right: none"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-sub-menu index="1">
          <template #title>
            <i class="el-icon-s-order"></i>
            <span>订单管理</span>
          </template>
          <el-menu-item index="/shophome/order/0">普通订单</el-menu-item>
          <el-menu-item index="/shophome/order/1">秒杀订单</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <i class="el-icon-s-shop"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item index="/shophome/goods/0">普通商品</el-menu-item>
          <el-menu-item index="/shophome/goods/1">秒杀商品</el-menu-item>
          <el-menu-item index="/shophome/goods/2">今日推荐</el-menu-item>
          <el-menu-item index="/shophome/goodCategory">商品分类</el-menu-item>
        </el-sub-menu>
        <!-- <el-sub-menu index="3">
          <template #title>
            <i class="el-icon-s-custom"></i>
            <span>店长管理</span>
          </template>
          <el-menu-item index="/shophome/ownerlist">店长列表</el-menu-item>
          <el-menu-item index="/shophome/ownerreq"
            >店长申请审批列表</el-menu-item
          >
          <el-menu-item index="/shophome/ownerorder">店长订单</el-menu-item>
        </el-sub-menu> -->
        <!-- <el-sub-menu index="4">
          <template #title>
            <i class="el-icon-s-ticket"></i>
            <span>财务管理</span>
          </template>
          <el-menu-item index="/shophome/tradeinfo">交易明细</el-menu-item>
          <el-menu-item index="/shophome/tradelist">财务对账单</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="5">
          <template #title>
            <i class="el-icon-s-tools"></i>
            <span>基础管理</span>
          </template>
          <el-menu-item index="/home/data">数据统计</el-menu-item>
        </el-sub-menu> -->
      </el-menu>
    </el-aside>
    <el-main style="padding: 0; height: 100%">
      <!-- 添加一个通用的头部 -->
      <el-header style="margin: 0; padding: 0" height="80px">
        <el-container
          style="
            background-color: blanchedalmond;
            margin: 0;
            padding: 0;
            height: 80px;
          "
        >
          <div style="margin: auto auto auto 100px">
            <h1>欢迎您登录管理系统，管理员用户！</h1>
          </div>
          <!-- <div style="margin: auto 50px auto auto">
            <el-button type="primary" @click="logout">注销</el-button>
          </div> -->
        </el-container>
      </el-header>
      <!--这里用来渲染具体的功能模块-->
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script lang="ts">
export default {
  name: 'ShopHome',
};
</script>

<script setup lang="ts">
// function logout() {
//   ElMessage.success('注销成功');
// }
</script>

<style scoped></style>
