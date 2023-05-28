<!-- 
  可编辑单元格组件：<EditCellDemo v-model:data="" />
 -->
<template>
  <div @click="beginEdit">
    <div v-if="editStatus">
      <el-input
        v-model="value"
        ref="input"
        maxlength="300"
        size="default"
        @blur="loseFocus"
        @keydown.enter="loseFocus"
      />
    </div>
    <div v-else>{{ value }}</div>
  </div>
</template>

<script>
export default {
  name: 'EditCellDemo',
  // 展示的数据及可编辑的数据
  props: ['data'],
  emits: ['update:data'],
  data() {
    return {
      // 编辑状态
      editStatus: false,
    };
  },
  computed: {
    // 实现组件上的v-model
    value: {
      get() {
        return this.data;
      },
      set(value) {
        this.$emit('update:data', value);
      },
    },
  },
  methods: {
    // 鼠标点击事件，开始编辑单元格
    beginEdit() {
      this.editStatus = true;
      // 点击时使输入框获得焦点
      setTimeout(() => {
        this.$refs.input.focus();
      }, 1);
    },
    // 失去焦点，结束编辑
    loseFocus() {
      this.editStatus = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
