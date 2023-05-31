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

<script setup>
defineOptions({
  name: 'EditCellDemo',
});
// 展示的数据及可编辑的数据
const props = defineProps(['data']);
const emits = defineEmits(['update:data', 'endEidt']);
// 编辑状态
const editStatus = ref(false);
// 声明一个 ref 来存放该元素的引用
// 必须和模板里的 ref 同名
const input = ref();

// 实现组件上的v-model
const value = computed({
  get() {
    return props.data;
  },
  set(value) {
    emits('update:data', value);
  },
});
// 鼠标点击事件，开始编辑单元格
function beginEdit() {
  editStatus.value = true;
  // 点击时使输入框获得焦点
  setTimeout(() => {
    input.value.focus();
  }, 1);
}
// 失去焦点，结束编辑
function loseFocus() {
  emits('endEidt', props.data);
  editStatus.value = false;
}
</script>

<style lang="scss" scoped></style>
