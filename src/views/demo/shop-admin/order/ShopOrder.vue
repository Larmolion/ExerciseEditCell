<template>
  <div class="content-container" direction="vertical">
    <!--  筛选检索项  -->
    <div>
      <el-container class="content-row">
        <div class="input-tip">商品名称：</div>
        <div class="input-field">
          <el-input v-model="queryParam.name"></el-input>
        </div>
        <div class="input-tip">商品价格：</div>
        <div class="input-field">
          <el-input v-model="queryParam.price"></el-input>
        </div>
        <div class="input-tip">买家信息：</div>
        <div class="input-field">
          <el-input v-model="queryParam.buyer"></el-input>
        </div>
        <div class="input-tip">交易时间：</div>
        <div class="input-field">
          <el-date-picker
            v-model="queryParam.time"
            type="datetime"
            format="YYYY/MM/DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
          >
          </el-date-picker>
        </div>
      </el-container>
      <el-container class="content-row">
        <div class="input-tip">分销信息：</div>
        <div class="input-field">
          <el-select v-model="queryParam.role" clearable>
            <el-option label="经理" value="true"></el-option>
            <el-option label="分销员" value="false"></el-option>
          </el-select>
        </div>
        <div class="input-tip">支付方式：</div>
        <div class="input-field">
          <el-select v-model="queryParam.payType" clearable>
            <el-option label="支付宝" value="true"></el-option>
            <el-option label="微信" value="false"></el-option>
          </el-select>
        </div>
        <div class="input-tip">电话号码：</div>
        <div class="input-field">
          <el-input v-model="queryParam.phone"></el-input>
        </div>
        <div class="input-tip">交易状态：</div>
        <div class="input-field">
          <el-select v-model="queryParam.state" clearable>
            <el-option label="已完成" value="true"></el-option>
            <el-option label="未完成" value="false"></el-option>
          </el-select>
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
    <!--标签分类-->
    <div>
      <el-tabs type="card" @tab-change="handleClick" v-model="activeName">
        <el-tab-pane label="全部" name="first"></el-tab-pane>
        <el-tab-pane label="未完成" name="second"></el-tab-pane>
        <el-tab-pane label="已完成" name="third"></el-tab-pane>
      </el-tabs>
      <!-- 主要操作的表单，基本可编辑和更新的练习都在此表单上进行 -->
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
        <el-table-column label="商品名称" width="100">
          <template #default="scope">
            <!-- 最初版本可编辑单元格，高耦合 -->
            <edit-cell-demo v-model:data="scope.row.name"></edit-cell-demo>
          </template>
        </el-table-column>
        <el-table-column label="商品价格" width="100">
          <template #default="scope">
            <!-- 可编辑单元格，优化版本 -->
            <!-- 目前存在问题，会导致table点击事件第一次不生效 -->
            <edit-cell-demo v-model:data="scope.row.price"></edit-cell-demo>
          </template>
        </el-table-column>
        <el-table-column label="买家信息" width="100" prop="buyer">
        </el-table-column>
        <el-table-column label="交易时间" width="200" prop="time">
          <template #header="scope">
            {{ scope.column.label }}
            <el-tag
              v-if="columnSwitch.time"
              type="info"
              @click="() => (columnSwitch.time = false)"
              >关闭修改</el-tag
            >
            <el-tag
              v-else
              type="success"
              @click="() => (columnSwitch.time = true)"
              >开始修改</el-tag
            >
          </template>
          <template #default="scope">
            <div v-if="columnSwitch.time">
              <el-date-picker
                v-model="scope.row.time"
                type="datetime"
                format="YYYY/MM/DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
                size="small"
              >
              </el-date-picker>
            </div>
            <div v-else>{{ scope.row.time }}</div>
          </template>
        </el-table-column>
        <el-table-column label="分销信息" width="100">
          <template #default="scope">
            <span>{{ scope.row.role ? '经理' : '分销员' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付方式" width="100">
          <template #default="scope">
            <span>{{ scope.row.payType ? '微信' : '支付宝' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="电话号码" width="150">
          <template #default="scope">
            <edit-cell-demo v-model:data="scope.row.phone"></edit-cell-demo>
          </template>
        </el-table-column>
        <el-table-column label="交易状态" width="100">
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
            <!-- <el-button size="small" type="primary" @click="callUser(scope.row)"
              >联系客户</el-button
            > -->
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

    <!-- 每行的表单修改 -->
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
        <el-form-item label="商品价格：" prop="price">
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
          <el-date-picker
            v-model="fromData.time"
            type="datetime"
            format="YYYY/MM/DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="分销信息：" prop="role">
          <el-radio-group v-model="fromData.role">
            <el-radio :label="true">经理</el-radio>
            <el-radio :label="false">分销员</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="支付方式：" prop="payType">
          <el-radio-group v-model="fromData.payType">
            <el-radio :label="true">微信</el-radio>
            <el-radio :label="false">支付宝</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话：" prop="phone">
          <el-input
            v-model="fromData.phone"
            placeholder="请输入商品名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="state">
          <el-radio-group v-model="fromData.state">
            <el-radio :label="true">已完成</el-radio>
            <el-radio :label="false">未完成</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 分页器 -->
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageTotal"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30]"
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
const orderAllList = ref([]);
const orderTrueList = ref([]);
const orderFalseList = ref([]);
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
  name: '',
  price: '',
  buyer: '',
  time: '',
  role: '',
  state: '',
  payType: '',
  phone: '',
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
const columnSwitch = ref({
  name: false,
  price: false,
  buyer: false,
  time: false,
  role: false,
  state: false,
  payType: false,
  phone: false,
});
// tabs刷新数据
const activeName = ref();
// 分页计数器
const pageTotal = computed(() => {
  return orderList.value.length * 10;
});
// 当前页码
const currentPage = ref(1);
// 每页数据量
const pageSize = ref(10);
// 监听当前页码的变化，刷新页面
watch(currentPage, (newValue) => {
  orderList.value = Mock.getOrder(route.params.type, pageSize.value);
});
// 监听每页数据量的变化，刷新页面
watch(pageSize, (newValue) => {
  orderList.value = Mock.getOrder(route.params.type, pageSize.value);
});

// 筛选模拟请求数据
function requestData() {
  ElMessage.success('筛选请求数据:' + JSON.stringify(queryParam));
  orderList.value = Mock.getOrder(route.params.type, pageSize.value);
}
// 切换tab刷新数据
function handleClick() {
  ElMessage.success('切换tab刷新数据:' + route.params.type);
  switch (activeName.value) {
    case 'first':
      //orderAllList.value = Mock.getOrder(route.params.type);
      orderList.value = orderAllList.value;
      break;
    case 'second':
      orderTrueList.value = orderAllList.value.filter(
        (data) => data.state === true
      );
      orderList.value = orderTrueList.value;
      break;
    case 'third':
      orderFalseList.value = orderAllList.value.filter(
        (data) => data.state === false
      );
      orderList.value = orderFalseList.value;
      break;
    default:
      orderAllList.value = Mock.getOrder(route.params.type, pageSize.value);
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

  orderList.value = Mock.getOrder(route.params.type, pageSize.value);
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
  orderAllList.value = Mock.getOrder(to.params.type, pageSize.value);
  orderList.value = orderAllList.value;
});

// 组件加载时更新数据
onMounted(() => {
  orderAllList.value = Mock.getOrder(route.params.type, pageSize.value);
  orderList.value = orderAllList.value;
});
</script>

<style scoped></style>
