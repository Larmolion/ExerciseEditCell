<template>
  <div class="content-container" direction="vertical">
    <div>
      <el-container class="content-row">
        <div class="input-tip">商品名称：</div>
        <div class="input-field">
          <el-input v-model="queryParams.name"></el-input>
        </div>
        <div class="input-tip">商品编号：</div>
        <div class="input-field">
          <el-input v-model="queryParams.id"></el-input>
        </div>
        <div class="input-tip">商品分类：</div>
        <div class="input-field">
          <el-select v-model="queryParams.category" placeholder="请选择分类">
            <el-option
              v-for="item in categories"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </div>
      </el-container>
      <el-container class="cotent-row">
        <div class="input-tip">是否上架:</div>
        <div class="input-field">
          <el-select v-model="sellModesString">
            <el-option key="0" label="否" :value="0"></el-option>
            <el-option key="1" label="是" :value="1"></el-option>
            <el-option key="2" label="全部" :value="2"></el-option>
          </el-select>
        </div>
        <div class="input-tip">是否过期:</div>
        <div class="input-field">
          <el-select v-model="expModeString">
            <el-option key="0" label="否" :value="0"></el-option>
            <el-option key="1" label="是" :value="1"></el-option>
            <el-option key="2" label="全部" :value="2"></el-option>
          </el-select>
        </div>
      </el-container>
    </div>
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
      <el-table :data="goodsData" tooltip-effect="dark" style="width: 100%">
        <el-table-column label="商品" width="100">
          <template #default="scope">
            <div style="text-align: center">
              <el-image
                :src="scope.row.img"
                style="width: 60px; height: 100px"
              />
            </div>
            <div style="text-align: center">{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="价格"
          width="100"
          prop="price"
        ></el-table-column>
        <el-table-column
          label="销量"
          width="100"
          prop="sellCount"
        ></el-table-column>
        <el-table-column
          label="库存"
          width="100"
          prop="count"
        ></el-table-column>
        <el-table-column
          label="退款数量"
          width="100"
          prop="back"
        ></el-table-column>
        <el-table-column
          label="退款金额"
          width="100"
          prop="backPrice"
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
        <el-table-column
          label="管理员"
          width="200"
          prop="time"
        ></el-table-column>
        <el-table-column
          label="更新时间"
          width="200"
          prop="time"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Mock from '@/mock/Mock';

export default {
  name: 'ShopGoods',
  data() {
    return {
      goodsData: [],
      // 模拟分类数据
      categories: ['全部', '男装', '女装'],
      queryParams: {
        name: '',
        id: '',
        category: '',
        sellMode: 2,
        expMode: 2,
      },
    };
  },

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
  // 组件挂载时获取数据
  mounted() {
    this.goodsData = Mock.getGoods(this.$route.params.type);
  },
  // 路由更新时刷新数据
  beforeRouteUpdate(to) {
    this.goodsData = Mock.getGoods(to.params.type);
  },

  methods: {
    // 获取数据的方法
    requestData() {
      this.$message({
        type: 'success',
        message: '筛选请求参数：' + JSON.stringify(this.queryParams),
      });
      this.goodsData = Mock.getGoods(this.$route.params.type);
    },
    // 进行上架下架操作
    operate(item) {
      item.state = !item.state;
    },
    // 清空筛选项
    clear() {
      this.queryParams = {
        name: '',
        id: '',
        category: '',
        sellMode: 2,
        expMode: 2,
      };
      this.goodsData = Mock.getGoods(this.$route.params.type);
    },
    // 新增商品
    addGood() {
      this.$router.push({
        name: 'AddGoods',
        params: { type: this.$route.params.type },
      });
    },
  },
};
</script>

<style scoped></style>
