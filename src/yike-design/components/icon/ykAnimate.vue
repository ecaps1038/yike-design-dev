<template>
	<div>
	<svg viewBox="25 25 50 50" v-show="name == 'loading'" :class="[type,size]" :style="{width:getSize(size)+'px'}">
		<circle r="20" cy="50" cx="50" ></circle>
	</svg>
</div>
</template>
<script setup lang="ts">
const props = defineProps({
	name: {
		type: String,
		default: 'loading',
	},
	type:{
		type: String,
		default: 'default',
	},
	size:{
		type:[String,Number]
	}
})
//间距大小
const getSize = (size: number | string) => {
  if (typeof size === "number") {
    return size;
  }
  switch (size) {
    case "s":
      return 14;
    case "m":
      return 16;
    case "l":
      return 16;
    case "xl":
      return 18;
    default:
      return 14;
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/style/yk-index.less';

.icon {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
	// vertical-align: text-bottom;
}

//loading动画
svg {
 
 transform-origin: center;
 animation: rotate4 2s linear infinite;
 vertical-align: middle;
}

circle {
 fill: none;
//  stroke: @bg-color-l;
 stroke-width: 3;
 stroke-dasharray: 1, 200;
 stroke-dashoffset: 0;
 stroke-linecap: round;
 animation: dash4 1.5s ease-in-out infinite;
}
//颜色
.primary{
	circle{
		stroke: @pcolor;
	}
}
.success{
	circle{
		stroke: @scolor;
	}
}
.warning{
	circle{
		stroke: @wcolor;
	}
}
.danger{
	circle{
		stroke: @ecolor;
	}
}
.default{
	circle{
		stroke: @font-color-m;
	}
}
.white{
	circle{
		stroke: #fff;
	}
}

//大小


@keyframes rotate4 {
 100% {
  transform: rotate(360deg);
 }
}

@keyframes dash4 {
 0% {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
 }

 50% {
  stroke-dasharray: 90, 200;
  stroke-dashoffset: -35px;
 }

 100% {
  stroke-dashoffset: -125px;
 }
}

</style>