<template>
  <div id="wangeditor">
    <div ref="editorElem" style="text-align: left"></div>
  </div>
</template>

<script>
import E from 'wangeditor';
export default {
  data() {
    return {
      editor: null,
      deitorContent: '',
    };
  },

  mounted() {
    this.editor = new E(this.$refs.editorElem);
    // 编辑器的事件，每次改变会获取HTML内容
    this.editor.config.onchange = this.contentChange;
    this.editor.config.menus = [
      // 菜单配置
      'head',
      'bold',
      'fontSize',
      'fontName',
      'italic',
      'underline',
      'strikeThrough',
      'foreColor',
      'backColor',
      'link',
      'list',
      'justify',
      'quote',
      'emoticon',
      'image',
      'table',
      'code',
      'undo',
      'redo',
    ];
    // 创建富文本实例
    this.editor.create();
  },

  methods: {
    contentChange(html) {
      this.editorContent = html;
      this.$emit('contentChange', this.editorContent);
    },
  },
};
</script>

<style lang="scss" scoped></style>
