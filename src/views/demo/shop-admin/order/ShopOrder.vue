<template>
  <div class="content-container" direction="vertical">
    <!--  input  -->
    <div>
      <el-container class="content-row">
        <div class="input-tip">商品名称：</div>
        <div class="input-field">
          <el-input v-model="queryParam.good"></el-input>
        </div>
        <div class="input-tip">收货人：</div>
        <div class="input-field">
          <el-input v-model="queryParam.consignee"></el-input>
        </div>
        <div class="input-tip">支付时间：</div>
        <div class="input-field">
          <el-date-picker
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            v-model="queryParam.payTime"
          ></el-date-picker>
        </div>
      </el-container>
      <el-container class="content-row">
        <div class="input-tip">用户名称：</div>
        <div class="input-field">
          <el-input v-model="queryParam.name"></el-input>
        </div>
        <div class="input-tip">手机号：</div>
        <div class="input-field">
          <el-input v-model="queryParam.phone"></el-input>
        </div>
        <div class="input-tip">发货时间：</div>
        <div class="input-field">
          <el-date-picker
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            v-model="queryParam.sendTime"
          ></el-date-picker>
        </div>
      </el-container>
    </div>
    <div class="content-row">
      <el-container>
        <el-button type="primary" @click="requestData">筛选</el-button>
        <el-button type="primary" @click="clear">清空筛选</el-button>
        <el-button type="primary" @click="exportData">导出</el-button>
        <el-button type="primary" @click="dispatchGoods">批量发货</el-button>
      </el-container>
    </div>
    <!--list-->
    <div>
      <el-tabs type="card" @tab-change="handleClick" v-model="activeName">
        <el-tab-pane label="全部" name="first"></el-tab-pane>
        <el-tab-pane label="未完成" name="second"></el-tab-pane>
        <el-tab-pane label="已完成" name="third"></el-tab-pane>
      </el-tabs>
      <el-table
        ref="multipleTable"
        :data="orderList"
        :row-class-name="tableRowClassName"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @cell-click="myCellClick"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="商品" width="100">
          <template #default="scope">
            <!-- 最初版本可编辑单元格，高耦合 -->
            <edit-cell-demo v-model:data="scope.row.name"></edit-cell-demo>
          </template>
        </el-table-column>
        <el-table-column label="总价/数量" width="100">
          <template #default="scope">
            <!-- 可编辑单元格，优化版本 -->
            <!-- 目前存在问题，会导致table点击事件第一次不生效 -->
            <edit-cell-demo v-model:data="scope.row.price"></edit-cell-demo>
          </template>
        </el-table-column>
        <el-table-column label="买家信息" width="100" prop="buyer">
        </el-table-column>
        <el-table-column
          label="交易时间"
          width="200"
          prop="time"
        ></el-table-column>
        <el-table-column label="分销信息" width="100">
          <template #default="scope">
            <el-tag size="default" :type="scope.row.role ? '' : 'info'">{{
              scope.row.role ? '经理' : '分销员'
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="支付方式" width="100">
          <template #default="scope">
            <el-tag size="default">{{
              scope.row.payType ? '微信' : '支付宝'
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="电话"
          width="150"
          prop="phone"
        ></el-table-column>
        <el-table-column label="状态" width="100">
          <template #default="scope">
            <el-tag
              size="default"
              :type="scope.row.state ? 'success' : 'danger'"
              @click="scope.row.state = !scope.row.state"
              >{{ scope.row.state ? '已完成' : '未完成' }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <el-button
              size="small"
              type="danger"
              @click="deleteItem(scope.$index)"
              >删除</el-button
            >
            <el-button size="small" type="primary" @click="callUser(scope.row)"
              >联系客户</el-button
            >
            <el-button size="small" type="primary" @click="editItem(scope.row)"
              >修改信息</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 单个单元格编辑弹窗 -->
    <edit-cell-dialog
      v-model:status="dialogView"
      :data="cellData"
      :lable="cellLable"
      :index="cellIndex"
      :prop="cellProperty"
      @submit="handleSubmit"
    ></edit-cell-dialog>

    <el-dialog
      v-model="mutilDialogView"
      title="商品信息修改"
      width="500px"
      @close="closeDialog"
    >
      <el-form :model="fromData">
        <el-form-item label="商品名称：" prop="name">
          <el-input
            v-model="fromData.name"
            placeholder="请输入商品名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="总价/数量：" prop="price">
          <el-input
            v-model="fromData.price"
            placeholder="请输入商品名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="买家信息：" prop="buyer">
          <el-input
            v-model="fromData.buyer"
            placeholder="请输入商品名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="交易时间：" prop="time">
          <el-date-picker v-model="fromData.time" type="datetime">
          </el-date-picker>
          <el-input
            v-model="fromData.time"
            placeholder="请输入商品名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="分销信息：" prop="role">
          <el-input
            v-model="fromData.role"
            placeholder="请输入商品名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="支付方式：" prop="payType">
          <el-input
            v-model="fromData.payType"
            placeholder="请输入商品名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话：" prop="phone">
          <el-input
            v-model="fromData.phone"
            placeholder="请输入商品名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="state">
          <el-input
            v-model="fromData.state"
            placeholder="请输入商品名称"
          ></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 分页 -->
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageTotal"
      v-model:current-page="currentPage"
      style="margin-top: 10px"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'ShopOrder',
};
</script>

<script setup>
import Mock from '@/mock/Mock';
import EditCellDemo from '../components/EditCellDemo.vue';
import EditCellDialog from '../components/EditCellDialog.vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { first } from 'lodash';

const route = useRoute();
const router = useRouter();

// 订单列表数据
const orderList = ref([]);
// 每行数据
const fromData = reactive({
  name: '',
  price: '',
  buyer: '',
  time: '',
  role: '',
  state: '',
  payType: '',
  phone: '',
});
// 筛选订单的参数
const queryParam = reactive({
  good: '',
  consignee: '',
  phone: '',
  name: '',
  payTime: '',
  sendTime: '',
});
// 对话框是否显示
const dialogView = ref(false);
const mutilDialogView = ref(false);
// 单元格数据
const cellData = ref();
// 单元格行的编号
const cellIndex = ref();
// 单元格列的标题名称
const cellLable = ref();
// 单元格列的属性
const cellProperty = ref();
// 当前选中的订单对象
const multipleSelection = ref();

const activeName = ref();

const pageTotal = computed(() => {
  return orderList.value.length * 10;
});

const currentPage = ref(1);

watch(currentPage, (newValue) => {
  orderList.value = Mock.getOrder(route.params.type);
});

// 模拟请求数据
function requestData() {
  ElMessage.success('筛选请求数据:' + JSON.stringify(queryParam));
  orderList.value = Mock.getOrder(route.params.type);
}
// 切换tab刷新数据
function handleClick() {
  ElMessage.success('切换tab刷新数据:' + activeName.value);
  switch (activeName.value) {
    case 'first':
      orderList.value = Mock.getOrder(route.params.type);
      break;
    case 'second':
      orderList.value = orderList.value.filter((data) => data.state === true);
      break;
    case 'third':
      orderList.value = orderList.value.filter((data) => data.state === false);
      break;
    default:
      orderList.value = Mock.getOrder(route.params.type);
      break;
  }
}
// 把每一行的索引放进row
function tableRowClassName({ row, rowIndex }) {
  row.index = rowIndex;
}
// 单元格点击事件
function myCellClick(row, column) {
  cellData.value = orderList.value[row.index][column.property];
  cellIndex.value = row.index;
  cellLable.value = column.label;
  cellProperty.value = column.property;

  if (column.label === '买家信息') {
    dialogView.value = true;
  }
}
// 弹窗提交修改
function handleSubmit(cellIndex, cellProperty, cellData) {
  orderList.value[cellIndex][cellProperty] = cellData;
  //console.log(cellIndex + cellProperty);
  ElMessage({
    type: 'success',
    message: '修改成功：' + cellData,
  });
}
// 清空筛选项
function clear() {
  queryParam.good = '';
  queryParam.consignee = '';
  queryParam.phone = '';
  queryParam.name = '';
  queryParam.payTime = '';
  queryParam.sendTime = '';

  orderList.value = Mock.getOrder(route.params.type);
}
// 导出订单
function exportData() {
  ElMessage({
    type: 'success',
    message: orderList.value[0],
  });
  // Tools.exportJson('订单.json', JSON.stringify(this.orderList));
}
// 导出选中的发货单
function exportDispachGoods() {
  // Tools.exportJson('发货单.json', JSON.stringify(this.multipleSelection));
}
// 处理多选
function handleSelectionChange(val) {
  multipleSelection.value = val;
}
// 进行发货
function dispatchGoods() {
  ElMessage({
    type: 'success',
    message: '发货商品：' + JSON.stringify(multipleSelection.value),
  });
}
// 删除订单
function deleteItem(item) {
  orderList.value.splice(item, 1);
}
// 联系用户
function callUser(item) {
  console.log(item);
  ElMessage({
    type: 'success',
    message: '联系客户：' + item.phone,
  });
}

// 编辑信息，硬编码，只为了练习，实际项目会从后端获得数据直接用，不需要这样硬编码
function editItem(item) {
  mutilDialogView.value = true;

  //用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
  Object.assign(fromData, item);
}

// 路由更新时刷新数据
onBeforeRouteUpdate((to) => {
  orderList.value = Mock.getOrder(to.params.type);
});

// 组件加载时更新数据
onMounted(() => {
  orderList.value = Mock.getOrder(route.params.type);
});
</script>

<style scoped></style>
