<script setup lang="ts">
  import { RouterView } from "vue-router"
  import { ref } from "vue"
  import Bar from "@/components/bar.vue"
  //菜单
  //制作目录数组
  let bar = [
    {
      title: "通用",
      list: [
        {
          name: "Button 按钮",
          src: "button",
        },
        {
          name: "Icon 图标",
          src: "icon",
        },
        {
          name: "Typegraphy 排版",
          src: "typegraphy",
        },
      ],
    },
    {
      title: "布局",
      list: [
        {
          name: "Space 间距",
          src: "space",
        },
      ],
    },
    {
      title: "导航",
      list: [
        {
          name: "Breadcrumb 面包屑",
          src: "breadcrumb",
        },
        {
          name: "Dropdown 下拉菜单",
          src: "dropdown",
        },
        {
          name: "Pagination 分页",
          src: "pagination",
        },
      ],
    },
    {
      title: "数据输入",
      list: [
        {
          name: "Checkbox 复选框",
          src: "checkbox",
        },
        {
          name: "Input 输入框",
          src: "input",
        },
        {
          name: "InputNumber 数字输入框",
          src: "inputnumber",
        },
        {
          name: "InputTag 标签输入框",
          src: "inputtag",
        },
        {
          name: "Radio 单选框",
          src: "radio",
        },
        {
          name: "Rate 评分",
          src: "rate",
        },
        {
          name: "Stepper 步进器",
          src: "stepper",
        },
        {
          name: "Switch 开关",
          src: "switch",
        },
        {
          name: "Textarea 文本域",
          src: "textarea",
        },
        {
          name: "Upload 文件上传",
          src: "upload",
        },
      ],
    },
    {
      title: "数据展示",
      list: [
        {
          name: "Avatar 头像",
          src: "avatar",
        },
        {
          name: "Badge 徽标数",
          src: "badge",
        },
      ],
    },
  ]
</script>
<template>
  <div class="module-b">
    <Bar :bar="bar" />
    <div class="main">
      <RouterView />
    </div>
  </div>
</template>
<style scoped lang="less">
  .main {
    padding: 24px 56px 56px 324px;

    .module {
      max-width: 1200px;
    }
  }

  .mmain {
    padding: 24px;
  }
</style>
