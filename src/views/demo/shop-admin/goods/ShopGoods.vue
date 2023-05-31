<template>
  <div class="content-container" direction="vertical">
    <!-- button -->
    <div class="content-row">
      <el-container>
        <el-button type="primary" @click="requestData">检索</el-button>
        <el-button type="primary" @click="clear">显示全部</el-button>
        <el-button type="success" @click="addGood">新增商品</el-button>
      </el-container>
    </div>
    <!-- list -->
    <div>
      <el-table
        ref="refTable"
        :data="goodsData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column label="商品" width="150">
          <template #default="scope">
            <div style="text-align: center">
              <el-image
                :src="scope.row.img"
                style="width: 100px; height: 60px"
              />
            </div>
            <div style="text-align: center">{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column label="价格" width="100">
          <template #default="scope">
            <edit-cell-demo
              @endEidt="
                (v) => {
                  endEidt(scope.row, v);
                }
              "
              v-model:data="scope.row.price"
            ></edit-cell-demo>
          </template>
        </el-table-column>
        <el-table-column label="库存" width="100">
          <template #default="scope">
            <edit-cell-demo
              @endEidt="
                (v) => {
                  endEidt(scope.row, v);
                }
              "
              v-model:data="scope.row.count"
            ></edit-cell-demo>
          </template>
        </el-table-column>
        <el-table-column
          label="销量"
          width="100"
          prop="sellCount"
        ></el-table-column>
        <el-table-column label="退款数量" width="100">
          <template #default="scope">
            <edit-cell-demo
              @endEidt="
                (v) => {
                  endEidtBack(scope.row, v);
                }
              "
              v-model:data="scope.row.back"
            ></edit-cell-demo>
          </template>
        </el-table-column>
        <el-table-column
          label="退款金额"
          width="100"
          prop="backPrice"
        ></el-table-column>
        <el-table-column
          label="管理员"
          width="100"
          prop="owner"
        ></el-table-column>
        <el-table-column
          label="更新时间"
          width="200"
          prop="updateTime"
        ></el-table-column>

        <el-table-column
          label="上架时间"
          width="200"
          prop="addTime"
        ></el-table-column>

        <el-table-column
          label="下架时间"
          width="200"
          prop="endTime"
        ></el-table-column>
        <el-table-column label="操作" width="100" prop="name">
          <template #default="scope">
            <el-button
              @click="operate(scope.row)"
              :type="scope.row.state ? 'danger' : 'success'"
              >{{ scope.row.state ? '下架' : '上架' }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<!-- <script>
export default {
  computed: {
    sellModesString: {
      get() {
        if (this.queryParams.sellMode == 2) {
          return '全部';
        }
        return this.queryParams.sellMode == 0 ? '否' : '是';
      },
      set(val) {
        this.queryParams.sellMode = val;
      },
    },
    expModeString: {
      get() {
        if (this.queryParams.expMode == 2) {
          return '全部';
        }
        return this.queryParams.expMode == 0 ? '否' : '是';
      },
      set(val) {
        this.queryParams.expMode = val;
      },
    },
  },
};
</script> -->

<script setup>
import Mock from '@/mock/Mock';
import EditCellDemo from '../components/EditCellDemo.vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';

defineOptions({
  name: 'ShopGoods',
});

const route = useRoute();
const router = useRouter();

const goodsData = ref([]);
const categories = reactive(['全部', '男装', '女装']);
const queryParams = reactive({
  name: '',
  id: '',
  category: '',
  sellMode: 2,
  expMode: 2,
});

function requestData() {
  goodsData.value = Mock.getGoods(route.params.type);
}
// 进行上架下架操作
function operate(item) {
  item.state = !item.state;
}
// 清空筛选项
function clear() {
  queryParams = {
    name: '',
    id: '',
    category: '',
    sellMode: 2,
    expMode: 2,
  };
  goodsData.value = Mock.getGoods(route.params.type);
}
// 新增商品
function addGood() {
  router.push({
    name: 'AddGoods',
    params: { type: route.params.type },
  });
}
// 结束单元格编辑，更新数据
function endEidt(row, value) {
  let time = new Date().toLocaleString();
  row.updateTime = time;
  ElMessage.success('更新值为：' + value + ' 更新时间为：' + time);
}
// 结束单元格编辑，更新数据
function endEidtBack(row, value) {
  console.log(row.price.slice(0, -1));
  row.backPrice = value * row.price.slice(0, -1) + '元';
  ElMessage.success('更新值为：' + value + ' 更新退款金额为：' + row.backPrice);
}

onMounted(() => {
  goodsData.value = Mock.getGoods(route.params.type);
});
onBeforeRouteUpdate((to) => {
  goodsData.value = Mock.getGoods(to.params.type);
});
</script>

<style scoped></style>
