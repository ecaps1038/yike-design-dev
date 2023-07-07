<script setup lang="ts">
import { reactive } from 'vue';
import CaseCard from "@/components/CaseCard.vue";

let doc_datas = [
    {
        title: '基本用法',
        note: '',
        code: ``,
    },
]

let API_carousel_parameter = [
    {
        title: "参数名",
        dataIndex: "name",
        light: false,
    },
    {
        title: "描述",
        dataIndex: "expl",
        light: false,
    },
    {
        title: "类型",
        dataIndex: "type",
        light: true,
    },
    {
        title: "默认值",
        dataIndex: "normal",
        light: false,
    },
]

let API_carousel_datas = reactive([
    {
        key: "1",
        name: "images",
        expl: "轮播图片数组",
        type: `array`,
        normal: "-",
    },
    {
        key: "2",
        name: "current",
        expl: "当前轮播图片索引，修改索引可以改变首张播放图片",
        type: `number`,
        normal: "0",
    },
    {
        key: "3",
        name: "width",
        expl: "组件宽度",
        type: `string`,
        normal: "auto",
    },
    {
        key: "4",
        name: "height",
        expl: "组件高度",
        type: `string`,
        normal: "auto",
    },
    {
        key: "5",
        name: "direction",
        expl: "组件的轮播方向",
        type: `'horizontal' | 'vertical'`,
        normal: "horizontal",
    },
    {
        key: "6",
        name: "showtype",
        expl: "组件显示类型",
        type: `'slide' | 'fade' | 'multiSlide'`,
        normal: "slide",
    },
    {
        key: "7",
        name: "autoplay",
        expl: "是否自动播放",
        type: `boolean`,
        normal: "true",
    },
    {
        key: "8",
        name: "movetime",
        expl: "等待时间",
        type: `number`,
        normal: "2000",
    },
    {
        key: "9",
        name: "arrowshow",
        expl: "箭头显示方式",
        type: `'always' | 'hover' | 'never'`,
        normal: "always",
    },
    {
        key: "10",
        name: "arrowstyle",
        expl: "箭头显示样式",
        type: `string`,
        normal: "-",
    },
    {
        key: "11",
        name: "indicatortype",
        expl: "指示器显示类型",
        type: `'line' | 'dot' | 'slider' | 'never'`,
        normal: "dot",
    },
    {
        key: "12",
        name: "indicatorshow",
        expl: "指示器显示方式",
        type: `'always' | 'hover' | 'never'`,
        normal: "always",
    },
    {
        key: "12",
        name: "indicatorpos",
        expl: "指示器显示位置",
        type: `'bottom' | 'top' | 'left' | 'right' | 'outer-bottom' | 'outer-top' | 'outer-left' | 'outer-right'`,
        normal: "bottom",
    },
    {
        key: "13",
        name: "indicatorstyle",
        expl: "指示器显示样式",
        type: `string`,
        normal: "-",
    },
    {
        key: "14",
        name: "transition",
        expl: "指示器显示样式",
        type: `string`,
        normal: "-",
    },

])

let API_carouselItem_parameter = [
    {
        title: "组件功能",
        dataIndex: "name",
        light: false,
    },
    {
        title: "描述",
        dataIndex: "expl",
        light: false,
    },
    {
        title: "必需",
        dataIndex: "necessary",
        light: false,
    },
]
let API_carouselItem_datas = reactive([
    {
        key: "1",
        name: "插槽",
        expl: "默认插入图片，循环构成轮播图效果",
        necessary: "非必需"
    },
])
</script>

<template>
    <main class="module">
        <div class="top-title">
            <Title :level="2">Carousel 图片轮播</Title>
            <Paragraph>用于展示多张图片、视频或内嵌框架等内容的循环播放，支持系统自动播放或用户手动切换。</Paragraph>
        </div>
        <CaseCard :title="doc_datas[0].title" :note="doc_datas[0].note" :code="doc_datas[0].code">
            <Space>
                <Carousel width="542" height="240"></Carousel>
            </Space>
        </CaseCard>
        <CaseCard :title="doc_datas[0].title" :note="doc_datas[0].note" :code="doc_datas[0].code">
            <Space>
                <Carousel width="542" height="240" indicatortype="line" arrowshow="hover" indicatorpos="bottom">
                    <CarouselItem>
                        <img src="" alt="">
                    </CarouselItem>
                    <CarouselItem>
                        <img src="" alt="">
                    </CarouselItem>
                    <CarouselItem>
                        <img src="" alt="">
                    </CarouselItem>
                    <CarouselItem>
                        <img src="" alt="">
                    </CarouselItem>
                    <CarouselItem>
                        <img src="" alt="">
                    </CarouselItem>
                </Carousel>
            </Space>
        </CaseCard>

        <CaseCard :title="doc_datas[0].title" :note="doc_datas[0].note" :code="doc_datas[0].code">
            <Space>
                <Carousel width="542" height="240" direction="vertical" indicatorshow="hover" indicatorpos="outer-right">
                    <CarouselItem>
                        <img src="" alt="">
                    </CarouselItem>
                    <CarouselItem>
                        <img src="" alt="">
                    </CarouselItem>
                    <CarouselItem>
                        <img src="" alt="">
                    </CarouselItem>
                </Carousel>
            </Space>
        </CaseCard>


        <div class="api">
            <Title :level="3">API</Title>
            <Title :level="4">Carousel</Title>
            <!-- <Text type="secondary">只有一个简单的 name</Text> -->
            <div class="unit-table">
                <Table :data="API_carousel_datas" :columns="API_carousel_parameter"></Table>
            </div>
            <Title :level="4">CarouselItem</Title>
            <!-- <Text type="secondary">只有一个简单的 name</Text> -->
            <div class="unit-table">
                <Table :data="API_carouselItem_datas" :columns="API_carouselItem_parameter"></Table>
            </div>
        </div>
    </main>
</template>



<style lang="less" scoped>
.unit-table {
    width: 100%;
    // overflow: hidden;
    overflow-x: auto;
}
</style>