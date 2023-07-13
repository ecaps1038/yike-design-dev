<script setup lang="ts">
import { reactive } from "vue";
import CaseCard from "@/components/CaseCard.vue";
import "@/yike-design/assets/font/line/iconfont.js";
import "@/yike-design/assets/font/surface/iconfont.js";

//说明部分
let datas = [
  {
    title: "基本用法 name",
    note: '通过<Icon name="XX-XXX"/>的形式即可使用icon。直接使用字体样式设置图标，例如使用font-size控制大小,color设置颜色',
    code: `<Space>
  <Icon name="yk-yike1" style="fontSize:32px"/>
  <Icon name="yk-xin" style="color:#999" />
  <Icon name="yike-xin" style="color:#F5AC08" />
  <Button shape="circle">
    <Icon name="yk-jiahao"/>
  </Button>
</Space>`,
  },
];

//api部分
const columns = [
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
];
const data = reactive([
  {
    key: "1",
    name: "name",
    expl: "图标名称",
    type: `string`,
    normal: "-",
  },
]);
</script>
<template>
  <div class="icons">
    <div class="top-title">
      <Title :level="2">Icon 图标</Title>
      <Paragraph>在这汇总Yike Design 内置的图标，将不定期更新。</Paragraph>
    </div>
    <Title :level="3">线性图标展示</Title>
    <Paragraph>复制对应图标下的名称获取该图标。</Paragraph>
    <div class="main">
      <div class="tab-container">
        <div class="content symbol">
          <ul class="icon_lists dib-box">
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-jingbao"></use>
              </svg>
              <div class="code-name">yk-jingbao</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-yifu"></use>
              </svg>
              <div class="code-name">yk-yifu</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-jiangbei"></use>
              </svg>
              <div class="code-name">yk-jiangbei</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-shuju"></use>
              </svg>
              <div class="code-name">yk-shuju</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-paihang"></use>
              </svg>
              <div class="code-name">yk-paihang</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-huangguan"></use>
              </svg>
              <div class="code-name">yk-huangguan</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-vip"></use>
              </svg>
              <div class="code-name">yk-vip</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-geshishua"></use>
              </svg>
              <div class="code-name">yk-geshishua</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-dengpao"></use>
              </svg>
              <div class="code-name">yk-dengpao</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-yuedu"></use>
              </svg>
              <div class="code-name">yk-yuedu</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-anquan"></use>
              </svg>
              <div class="code-name">yk-anquan</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-daiban"></use>
              </svg>
              <div class="code-name">yk-daiban</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-biaoqian"></use>
              </svg>
              <div class="code-name">yk-biaoqian</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-anquan1"></use>
              </svg>
              <div class="code-name">yk-anquan1</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-guangbo"></use>
              </svg>
              <div class="code-name">yk-guangbo</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-kapian"></use>
              </svg>
              <div class="code-name">yk-kapian</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-gouwudai"></use>
              </svg>
              <div class="code-name">yk-gouwudai</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-gouwuche"></use>
              </svg>
              <div class="code-name">yk-gouwuche</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-qianbao"></use>
              </svg>
              <div class="code-name">yk-qianbao</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-liwu"></use>
              </svg>
              <div class="code-name">yk-liwu</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-shuqian"></use>
              </svg>
              <div class="code-name">yk-shuqian</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-nan"></use>
              </svg>
              <div class="code-name">yk-nan</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-nv"></use>
              </svg>
              <div class="code-name">yk-nv</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-riqi"></use>
              </svg>
              <div class="code-name">yk-riqi</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-renyuanxinxi"></use>
              </svg>
              <div class="code-name">yk-renyuanxinxi</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-zuoxuanzhuan"></use>
              </svg>
              <div class="name">斜线</div>
              <div class="code-name">yk-zuoxuanzhuan</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-caidan"></use>
              </svg>
              <div class="name">斜线</div>
              <div class="code-name">yk-caidan</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-zhankai"></use>
              </svg>
              <div class="name">斜线</div>
              <div class="code-name">yk-zhankai</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-shouqi"></use>
              </svg>
              <div class="name">斜线</div>
              <div class="code-name">yk-shouqi</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-xiexian"></use>
              </svg>
              <div class="name">斜线</div>
              <div class="code-name">yk-xiexian</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-daima"></use>
              </svg>
              <div class="name">代码</div>
              <div class="code-name">yk-daima</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-kaobei"></use>
              </svg>
              <div class="name">拷贝</div>
              <div class="code-name">yk-kaobei</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-biaoqing"></use>
              </svg>
              <div class="name">表情</div>
              <div class="code-name">yk-biaoqing</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-fanhui"></use>
              </svg>
              <div class="name">返回</div>
              <div class="code-name">yk-fanhui</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-dingwei"></use>
              </svg>
              <div class="name">定位</div>
              <div class="code-name">yk-dingwei</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-cha"></use>
              </svg>
              <div class="name">叉</div>
              <div class="code-name">yk-cha</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-gengduo"></use>
              </svg>
              <div class="name">更多</div>
              <div class="code-name">yk-gengduo</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-bofang"></use>
              </svg>
              <div class="name">播放</div>
              <div class="code-name">yk-bofang</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-fenxiang"></use>
              </svg>
              <div class="name">分享</div>
              <div class="code-name">yk-fenxiang</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-gou1"></use>
              </svg>
              <div class="name">勾1</div>
              <div class="code-name">yk-gou1</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-jiahao"></use>
              </svg>
              <div class="name">加号</div>
              <div class="code-name">yk-jiahao</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-jianhao"></use>
              </svg>
              <div class="name">加号</div>
              <div class="code-name">yk-jianhao</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-gou2"></use>
              </svg>
              <div class="name">勾2</div>
              <div class="code-name">yk-gou2</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-jiantouxiangxia"></use>
              </svg>
              <div class="name">箭头向下</div>
              <div class="code-name">yk-jiantouxiangxia</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-guanji"></use>
              </svg>
              <div class="name">关机</div>
              <div class="code-name">yk-guanji</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-biyan"></use>
              </svg>
              <div class="name">闭眼</div>
              <div class="code-name">yk-biyan</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-jiazai"></use>
              </svg>
              <div class="name">加载</div>
              <div class="code-name">yk-jiazai</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-lingdang"></use>
              </svg>
              <div class="name">铃铛</div>
              <div class="code-name">yk-lingdang</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-mubiao"></use>
              </svg>
              <div class="name">目标</div>
              <div class="code-name">yk-mubiao</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-jinggao"></use>
              </svg>
              <div class="name">警告</div>
              <div class="code-name">yk-jinggao</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-quanjia"></use>
              </svg>
              <div class="code-name">yk-quanjia</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-quancha"></use>
              </svg>
              <div class="name">圈叉</div>
              <div class="code-name">yk-quancha</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-quanxiangyou"></use>
              </svg>
              <div class="name">圈向右</div>
              <div class="code-name">yk-quanxiangyou</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-quanxiangzuo"></use>
              </svg>
              <div class="name">圈向左</div>
              <div class="code-name">yk-quanxiangzuo</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-quangou"></use>
              </svg>
              <div class="name">圈勾</div>
              <div class="code-name">yk-quangou</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-pinglun"></use>
              </svg>
              <div class="name">评论</div>
              <div class="code-name">yk-pinglun</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-saoma"></use>
              </svg>
              <div class="name">扫码</div>
              <div class="code-name">yk-saoma</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-qian"></use>
              </svg>
              <div class="name">钱</div>
              <div class="code-name">yk-qian</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-shanchu"></use>
              </svg>
              <div class="name">删除</div>
              <div class="code-name">yk-shanchu</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-qun"></use>
              </svg>
              <div class="name">群</div>
              <div class="code-name">yk-qun</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-shezhi"></use>
              </svg>
              <div class="name">设置</div>
              <div class="code-name">yk-shezhi</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-shijian"></use>
              </svg>
              <div class="name">时间</div>
              <div class="code-name">yk-shijian</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-sousuo"></use>
              </svg>
              <div class="name">搜索</div>
              <div class="code-name">yk-sousuo</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-shangchuan"></use>
              </svg>
              <div class="name">上传</div>
              <div class="code-name">yk-shangchuan</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-shangchuan1"></use>
              </svg>
              <div class="name">上传1</div>
              <div class="code-name">yk-shangchuan1</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-taiyang"></use>
              </svg>
              <div class="name">太阳</div>
              <div class="code-name">yk-taiyang</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-tupian"></use>
              </svg>
              <div class="name">图片</div>
              <div class="code-name">yk-tupian</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-tishi"></use>
              </svg>
              <div class="name">提示</div>
              <div class="code-name">yk-tishi</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-tianxie"></use>
              </svg>
              <div class="name">填写</div>
              <div class="code-name">yk-tianxie</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-touxiang1"></use>
              </svg>
              <div class="name">头像1</div>
              <div class="code-name">yk-touxiang1</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-shuaxin1"></use>
              </svg>
              <div class="name">刷新1</div>
              <div class="code-name">yk-shuaxin1</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-touxiang2"></use>
              </svg>
              <div class="name">头像2</div>
              <div class="code-name">yk-touxiang2</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-tongji"></use>
              </svg>
              <div class="name">统计</div>
              <div class="code-name">yk-tongji</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-wenjianjiajia"></use>
              </svg>
              <div class="code-name">yk-wenjianjiajia</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-wenjianjiaguan"></use>
              </svg>
              <div class="name">文件夹关</div>
              <div class="code-name">yk-wenjianjiaguan</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-wenjian"></use>
              </svg>
              <div class="name">文件</div>
              <div class="code-name">yk-wenjian</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-fangda1"></use>
              </svg>
              <div class="name">放大</div>
              <div class="code-name">yk-fangda1</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-suoxiao1"></use>
              </svg>
              <div class="name">缩小</div>
              <div class="code-name">yk-suoxiao1</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-fangda"></use>
              </svg>
              <div class="name">放大</div>
              <div class="code-name">yk-fangda</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-suoxiao"></use>
              </svg>
              <div class="name">缩小</div>
              <div class="code-name">yk-suoxiao</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-xiangshang"></use>
              </svg>
              <div class="name">向上</div>
              <div class="code-name">yk-xiangshang</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-wenjianjiakai"></use>
              </svg>
              <div class="name">文件夹开</div>
              <div class="code-name">yk-wenjianjiakai</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-shuaxin"></use>
              </svg>
              <div class="name">刷新</div>
              <div class="code-name">yk-shuaxin</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-xiangzuo"></use>
              </svg>
              <div class="name">向左</div>
              <div class="code-name">yk-xiangzuo</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-xiangxia"></use>
              </svg>
              <div class="name">向下</div>
              <div class="code-name">yk-xiangxia</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-xiazai1"></use>
              </svg>
              <div class="name">下载1</div>
              <div class="code-name">yk-xiazai1</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-suo"></use>
              </svg>
              <div class="name">锁</div>
              <div class="code-name">yk-suo</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-xiazai"></use>
              </svg>
              <div class="name">下载</div>
              <div class="code-name">yk-xiazai</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-a-xiangxia2"></use>
              </svg>
              <div class="name">向下 2</div>
              <div class="code-name">yk-a-xiangxia2</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-wujiaoxing"></use>
              </svg>
              <div class="name">五角星</div>
              <div class="code-name">yk-wujiaoxing</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-xin"></use>
              </svg>
              <div class="name">心</div>
              <div class="code-name">yk-xin</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-a-xiangshang2"></use>
              </svg>
              <div class="name">向上 2</div>
              <div class="code-name">yk-a-xiangshang2</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-xinxi"></use>
              </svg>
              <div class="name">信息</div>
              <div class="code-name">yk-xinxi</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-xiangyou"></use>
              </svg>
              <div class="name">向右</div>
              <div class="code-name">yk-xiangyou</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-tuichu"></use>
              </svg>
              <div class="name">退出</div>
              <div class="code-name">yk-tuichu</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-yanjing"></use>
              </svg>
              <div class="name">眼睛</div>
              <div class="code-name">yk-yanjing</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-yingyong"></use>
              </svg>
              <div class="name">应用</div>
              <div class="code-name">yk-yingyong</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-xiangji"></use>
              </svg>
              <div class="name">相机</div>
              <div class="code-name">yk-xiangji</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-xiugai"></use>
              </svg>
              <div class="name">修改</div>
              <div class="code-name">yk-xiugai</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-youxuanzhuan"></use>
              </svg>
              <div class="name">右旋转</div>
              <div class="code-name">yk-youxuanzhuan</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-zan"></use>
              </svg>
              <div class="name">赞</div>
              <div class="code-name">yk-zan</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-youjian"></use>
              </svg>
              <div class="name">邮件</div>
              <div class="code-name">yk-youjian</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-zhuce"></use>
              </svg>
              <div class="name">注册</div>
              <div class="code-name">yk-zhuce</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-yueliang"></use>
              </svg>
              <div class="name">月亮</div>
              <div class="code-name">yk-yueliang</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-zhuce2"></use>
              </svg>
              <div class="name">注册2</div>
              <div class="code-name">yk-zhuce2</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-zanting"></use>
              </svg>
              <div class="name">暂停</div>
              <div class="code-name">yk-zanting</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-yiwen"></use>
              </svg>
              <div class="name">疑问</div>
              <div class="code-name">yk-yiwen</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-zhuye"></use>
              </svg>
              <div class="name">主页</div>
              <div class="code-name">yk-zhuye</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-yike2"></use>
              </svg>
              <div class="name">yike2</div>
              <div class="code-name">yk-yike2</div>
            </li>

            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yk-yike1"></use>
              </svg>
              <div class="name">yike1</div>
              <div class="code-name">yk-yike1</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Title :level="3">面性图标展示</Title>
    <Paragraph>复制对应图标下的名称获取该图标。</Paragraph>
    <div class="main">
      <div class="content symbol">
        <ul class="icon_lists dib-box">
          <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yike-paihang"></use>
              </svg>
              <div class="code-name">yike-paihang</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yike-geshishua"></use>
              </svg>
              <div class="code-name">yike-geshishua</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yike-jingbao"></use>
              </svg>
              <div class="code-name">yike-jingbao</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yike-huangguan"></use>
              </svg>
              <div class="code-name">yike-huangguan</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yike-vip"></use>
              </svg>
              <div class="code-name">yike-vip</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yike-renzheng"></use>
              </svg>
              <div class="code-name">yike-renzheng</div>
            </li>
            <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yike-jiangbei"></use>
              </svg>
              <div class="code-name">yike-jiangbei</div>
            </li>
          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-yuedu"></use>
            </svg>
            <div class="code-name">yike-yuedu</div>
          </li>
          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-anquan"></use>
            </svg>
            <div class="code-name">yike-anquan</div>
          </li>
          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-anquan1"></use>
            </svg>
            <div class="code-name">yike-anquan1</div>
          </li>
          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-daiban"></use>
            </svg>
            <div class="code-name">yike-daiban</div>
          </li>
          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-biaoqian"></use>
            </svg>
            <div class="code-name">yike-biaoqian</div>
          </li>
          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-dengpao"></use>
            </svg>
            <div class="code-name">yike-dengpao</div>
          </li>
          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-gouwudai"></use>
            </svg>
            <div class="code-name">yike-gouwudai</div>
          </li>
          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-guangbo"></use>
            </svg>
            <div class="code-name">yike-guangbo</div>
          </li>
          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-kapian"></use>
            </svg>
            <div class="code-name">yike-kapian</div>
          </li>
          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-gouwuche"></use>
            </svg>
            <div class="code-name">yike-gouwuche</div>
          </li>
          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-qianbao"></use>
            </svg>
            <div class="code-name">yike-qianbao</div>
          </li>
          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-renyuanxinxi"></use>
            </svg>
            <div class="code-name">yike-renyuanxinxi</div>
          </li>
          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-liwu"></use>
            </svg>
            <div class="code-name">yike-liwu</div>
          </li>
          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-shuqian"></use>
            </svg>
            <div class="code-name">yike-shuqian</div>
          </li>
          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-riqi"></use>
            </svg>
            <div class="code-name">yike-riqi</div>
          </li>
          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-github"></use>
            </svg>
            <div class="name">github</div>
            <div class="code-name">yike-github</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-yikedesign"></use>
            </svg>
            <div class="name">yikedesign</div>
            <div class="code-name">yike-yikedesign</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-gou"></use>
            </svg>
            <div class="name">勾</div>
            <div class="code-name">yike-gou</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-shangchuan"></use>
            </svg>
            <div class="name">上传</div>
            <div class="code-name">yike-shangchuan</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-bofang"></use>
            </svg>
            <div class="name">播放</div>
            <div class="code-name">yike-bofang</div>
          </li>

          <li class="dib">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#yike-quanjia"></use>
              </svg>
              <div class="code-name">yike-quanjia</div>
            </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-cha"></use>
            </svg>
            <div class="name">叉</div>
            <div class="code-name">yike-cha</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-zanting"></use>
            </svg>
            <div class="name">暂停</div>
            <div class="code-name">yike-zanting</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-jinggao"></use>
            </svg>
            <div class="name">警告</div>
            <div class="code-name">yike-jinggao</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-tixing"></use>
            </svg>
            <div class="name">提醒</div>
            <div class="code-name">yike-tixing</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-biaoqing"></use>
            </svg>
            <div class="name">表情</div>
            <div class="code-name">yike-biaoqing</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-biyan"></use>
            </svg>
            <div class="name">闭眼</div>
            <div class="code-name">yike-biyan</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-dianzan"></use>
            </svg>
            <div class="name">点赞</div>
            <div class="code-name">yike-dianzan</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-dingwei"></use>
            </svg>
            <div class="name">定位</div>
            <div class="code-name">yike-dingwei</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-fanhui1"></use>
            </svg>
            <div class="name">返回1</div>
            <div class="code-name">yike-fanhui1</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-gengduo"></use>
            </svg>
            <div class="name">更多</div>
            <div class="code-name">yike-gengduo</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-fenxiang"></use>
            </svg>
            <div class="name">分享</div>
            <div class="code-name">yike-fenxiang</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-jiantouxiangxia"></use>
            </svg>
            <div class="name">箭头向下</div>
            <div class="code-name">yike-jiantouxiangxia</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-lingdang"></use>
            </svg>
            <div class="name">铃铛</div>
            <div class="code-name">yike-lingdang</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-fanhui"></use>
            </svg>
            <div class="name">返回</div>
            <div class="code-name">yike-fanhui</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-shijian"></use>
            </svg>
            <div class="name">时间</div>
            <div class="code-name">yike-shijian</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-qian"></use>
            </svg>
            <div class="name">钱</div>
            <div class="code-name">yike-qian</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-suo"></use>
            </svg>
            <div class="name">锁</div>
            <div class="code-name">yike-suo</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-saoma"></use>
            </svg>
            <div class="name">扫码</div>
            <div class="code-name">yike-saoma</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-shezhi"></use>
            </svg>
            <div class="name">设置</div>
            <div class="code-name">yike-shezhi</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-qun"></use>
            </svg>
            <div class="name">群</div>
            <div class="code-name">yike-qun</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-taiyang"></use>
            </svg>
            <div class="name">太阳</div>
            <div class="code-name">yike-taiyang</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-wenjian"></use>
            </svg>
            <div class="name">文件</div>
            <div class="code-name">yike-wenjian</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-touxiang"></use>
            </svg>
            <div class="name">头像</div>
            <div class="code-name">yike-touxiang</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-tongji"></use>
            </svg>
            <div class="name">统计</div>
            <div class="code-name">yike-tongji</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-xiazai"></use>
            </svg>
            <div class="name">下载</div>
            <div class="code-name">yike-xiazai</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-xiangyou"></use>
            </svg>
            <div class="name">向右</div>
            <div class="code-name">yike-xiangyou</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-mubiao"></use>
            </svg>
            <div class="name">目标</div>
            <div class="code-name">yike-mubiao</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-xiangxia"></use>
            </svg>
            <div class="name">向下</div>
            <div class="code-name">yike-xiangxia</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-xiangji"></use>
            </svg>
            <div class="name">相机</div>
            <div class="code-name">yike-xiangji</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-youjian"></use>
            </svg>
            <div class="name">邮件</div>
            <div class="code-name">yike-youjian</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-yanjing"></use>
            </svg>
            <div class="name">眼睛</div>
            <div class="code-name">yike-yanjing</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-tianxie"></use>
            </svg>
            <div class="name">填写</div>
            <div class="code-name">yike-tianxie</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-xin"></use>
            </svg>
            <div class="name">心</div>
            <div class="code-name">yike-xin</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-tuichu"></use>
            </svg>
            <div class="name">退出</div>
            <div class="code-name">yike-tuichu</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-wenjianjiakai"></use>
            </svg>
            <div class="name">文件夹开</div>
            <div class="code-name">yike-wenjianjiakai</div>
          </li>
          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-wenjianjiaguan"></use>
            </svg>
            <div class="name">文件夹关</div>
            <div class="code-name">yike-wenjianjiaguan</div>
          </li>
          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-wenjianjiajia"></use>
            </svg>
            <div class="name">文件夹关</div>
            <div class="code-name">yike-wenjianjiajia</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-xiangzuo"></use>
            </svg>
            <div class="name">向左</div>
            <div class="code-name">yike-xiangzuo</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-yiwen"></use>
            </svg>
            <div class="name">疑问</div>
            <div class="code-name">yike-yiwen</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-huohuo"></use>
            </svg>
            <div class="name">火火</div>
            <div class="code-name">yike-huohuo</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-wujiaoxing"></use>
            </svg>
            <div class="name">五角星</div>
            <div class="code-name">yike-wujiaoxing</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-yueliang"></use>
            </svg>
            <div class="name">月亮</div>
            <div class="code-name">yike-yueliang</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-yingyong"></use>
            </svg>
            <div class="name">应用</div>
            <div class="code-name">yike-yingyong</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-xiangshang"></use>
            </svg>
            <div class="name">向上</div>
            <div class="code-name">yike-xiangshang</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-xiugai"></use>
            </svg>
            <div class="name">修改</div>
            <div class="code-name">yike-xiugai</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-zhuye"></use>
            </svg>
            <div class="name">主页</div>
            <div class="code-name">yike-zhuye</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-yike2"></use>
            </svg>
            <div class="name">yike2</div>
            <div class="code-name">yike-yike2</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-yike1"></use>
            </svg>
            <div class="name">yike1</div>
            <div class="code-name">yike-yike1</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-tupian"></use>
            </svg>
            <div class="name">图片</div>
            <div class="code-name">yike-tupian</div>
          </li>

          <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yike-zhuce"></use>
            </svg>
            <div class="name">注册</div>
            <div class="code-name">yike-zhuce</div>
          </li>
        </ul>
      </div>
    </div>
    <CaseCard :title="datas[0].title" :note="datas[0].note" :code="datas[0].code">
      <Space aline="center">
        <Icon name="yk-yike1" style="fontsize: 32px" />
        <Icon name="yk-xin" style="color: #999" />
        <Icon name="yike-xin" style="color: #f5ac08" />
        <Button shape="circle">
          <Icon name="yk-jiahao" />
        </Button>
      </Space>
    </CaseCard>
    <Title :level="3">自定义图标</Title>
    <Paragraph type="secondary">本组件使用了confront打包的字体图标库，在项目中建议项目图标也同样经由confront打包为字体图标。其中在
      <Text type="pcolor">yike-design</Text> ->
      <Text type="pcolor">components</Text> ->
      <Text type="pcolor">icon</Text>中可以查阅到图标引入方法，可自己自由增减图标库。
    </Paragraph>
    <div class="api">
      <Title :level="3">API</Title>
      <Text type="secondary">只有一个简单的 name</Text>
      <div class="unit-table">
        <Table :data="data" :columns="columns"></Table>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
/* 页面布局 */
.main {
  margin-bottom: 40px;
  max-width: 957px;
}

.icon_lists {
  width: 100% !important;
  overflow: hidden;
  *zoom: 1;
  display: flex;
  flex-wrap: wrap;
  /* justify-content:space-between; */
  // border: 1px solid @line-color-s;
  padding-inline-start: 0px;
}

.icon_lists li {
  width: 160px;
  padding: 16px;
  margin-bottom: -1px;
  margin-right: -1px;
  text-align: center;
  list-style: none !important;
  cursor: default;
  border: 1px solid @line-color-s;
}

.icon_lists li .code-name {
  line-height: 1.2;
}

.icon_lists .icon {
  display: block;
  height: 64px;
  line-height: 64px;
  font-size: 32px;
  margin: 0px auto 10px;
  color: @font-color-l;
  transition: font-size @animatf linear, width @animatf linear;
}

.icon_lists .icon:hover {
  font-size: 42px;
}

.icon_lists .svg-icon {
  /* 通过设置 font-size 来改变图标大小 */
  width: 1em;
  /* 图标和文字相邻时，垂直对齐 */
  vertical-align: -0.15em;
  /* 通过设置 color 来改变 SVG 的颜色/fill */
  fill: currentColor;
  /* path 和 stroke 溢出 viewBox 部分在 IE 下会显示
      normalize.css 中也包含这行 */
  overflow: hidden;
}

.icon_lists li .name {
  display: none;
}

.icon_lists li .code-name {
  color: @font-color-m;
}

.unit-table {
  width: 100%;
  // overflow: hidden;
  overflow-x: auto;
}
</style>