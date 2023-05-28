<!-- 
  可编辑单元格组件：<EditCellDialog v-model:data="" />
 -->
<template>
  <el-dialog
    v-model="view"
    @open="newData = data"
    :title="'修改数据：' + lable"
    width="30%"
    center
  >
    <el-descriptions title="历史修改数据：" column="1">
      <el-descriptions-item
        v-for="item in oldData[index]"
        :key="item.index"
        :label="item[0]"
        >{{ item[1] }}</el-descriptions-item
      >
    </el-descriptions>
    <el-descriptions title="原始数据：">
      <el-descriptions-item label="">{{ data }}</el-descriptions-item>
    </el-descriptions>
    <el-form label-position="top">
      <el-form-item label="修改后数据：">
        <el-input v-model="newData" :placeholder="data"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button
          type="primary"
          @click="
            handleSubmit();
            $emit('submit', index, prop, newData, oldData);
          "
          >确 定</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'EditCellDialog',
  // 展示的数据及可编辑的数据
  props: ['data', 'status', 'lable', 'index', 'prop'],
  emits: ['update:data', 'update:status', 'submit'],
  data() {
    return {
      oldData: [],
      ooldData: [],
      newData: '',
    };
  },
  computed: {
    view: {
      get() {
        return this.status;
      },
      set(value) {
        this.$emit('update:status', value);
      },
    },
  },
  methods: {
    // 关闭弹窗
    closeDialog() {
      this.view = false;
    },
    // 提交数据，目前只有效果展示，没有实际数据交互
    handleSubmit() {
      console.log(this.ooldData.length - 1);
      //console.log(this.ooldData[this.ooldData.length - 1][1]);
      if (
        (this.ooldData.length - 1 >= 0 &&
          this.ooldData[this.ooldData.length - 1][1] !== this.data) ||
        this.ooldData.length - 1 === -1
      ) {
        this.ooldData.push([new Date().toLocaleString(), this.data]);
      }
      this.oldData[this.index] = this.ooldData;
      this.closeDialog();
      //console.log(this.ooldData);

      //console.log(this.oldData);
    },
  },
};
</script>

<style lang="scss" scoped></style>
